"""Enable text compression only in the discovered website static location.

The legacy edge config inlines the tracked routing snippet. Preserve its other
hosts and security rules; validate and restore the original on any failure.
Called under deploy-blue-green.sh's production maintenance lease.
"""
import argparse
import os
from pathlib import Path
import re
import subprocess
import tempfile


def patch_configuration(source: str, directives: str) -> str:
    begin = "# BEGIN INNOPROG website static compression"
    end = "# END INNOPROG website static compression"
    pattern = re.compile(r"location\s+\^~\s+/_next/static/\s*\{[^{}]*\}")
    blocks = [m for m in pattern.finditer(source)
              if re.search(r"alias\s+/opt/innoprog/data/website-static/\s*;", m.group())]
    if len(blocks) != 1:
        raise ValueError("Expected exactly one known website static location; refusing ambiguous config")
    block = blocks[0]
    text = block.group()
    alias = re.search(r"(^[ \t]*alias[^\n]+\n)", text, re.MULTILINE)
    if not alias:
        raise ValueError("Static alias line cannot be patched safely")
    indent = re.match(r"[ \t]*", alias.group()).group()
    managed = "\n".join(indent + line for line in [begin, *directives.strip().splitlines(), end]) + "\n"
    if begin in text or end in text:
        if text.count(begin) != 1 or text.count(end) != 1:
            raise ValueError("Invalid managed compression markers")
        text, count = re.subn(r"^[ \t]*" + re.escape(begin) + r".*?" + re.escape(end) + r"\n", managed, text, flags=re.MULTILINE | re.DOTALL)
        if count != 1:
            raise ValueError("Invalid managed compression block")
    elif re.search(r"^\s*gzip(?:_\w+)?\s", text, re.MULTILINE):
        raise ValueError("Existing location compression settings require explicit reconciliation")
    else:
        text = text[:alias.end()] + managed + text[alias.end():]
    return source[:block.start()] + text + source[block.end():]


def atomic_write(path: Path, data: bytes, stat):
    fd, temporary = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as output:
            output.write(data)
            output.flush()
            os.fsync(output.fileno())
            os.fchmod(output.fileno(), stat.st_mode & 0o7777)
            os.fchown(output.fileno(), stat.st_uid, stat.st_gid)
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def configure(path: Path, snippet: Path, validate, reload, routing_config=None, routing_template=None):
    path = path.resolve(strict=True)
    snippet = snippet.resolve(strict=True)
    previous = path.read_bytes()
    # Support the documented include layout as well as the legacy inline one.
    # Follow only the explicit tracked routing file, never arbitrary includes.
    if routing_config is not None and re.search(r"include\s+" + re.escape(str(routing_config)) + r"\s*;", previous.decode("utf-8")):
        if len(re.findall(r"include\s+" + re.escape(str(routing_config)) + r"\s*;", previous.decode("utf-8"))) != 1:
            raise ValueError("Ambiguous website routing include")
        path = routing_config.resolve(strict=True)
        previous = path.read_bytes()
        if routing_template is None or previous != routing_template.read_bytes():
            raise ValueError("Included routing differs from frozen release; refusing checkout drift")
    replacement = patch_configuration(previous.decode("utf-8"), snippet.read_text()).encode("utf-8")
    if previous == replacement:
        validate()
        reload()
        return False
    stat = path.stat()
    atomic_write(path, replacement, stat)
    try:
        validate()
        reload()
    except BaseException:
        atomic_write(path, previous, stat)
        validate()
        reload()
        raise
    return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-config", type=Path, required=True)
    parser.add_argument("--snippet", type=Path, required=True)
    parser.add_argument("--routing-config", type=Path)
    parser.add_argument("--routing-template", type=Path)
    args = parser.parse_args()
    changed = configure(args.site_config, args.snippet,
                        lambda: subprocess.run(["nginx", "-t"], check=True),
                        lambda: subprocess.run(["systemctl", "reload", "nginx"], check=True),
                        args.routing_config, args.routing_template)
    print("Website static text compression " + ("installed" if changed else "already configured"))
