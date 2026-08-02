#!/usr/bin/env python3
"""Verify staged educational disclosure PDFs against the generated manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urljoin
from urllib.request import Request, urlopen

IMAGE_ONLY_SIGNED_DOCUMENTS = {
    "e24c8086bf6d7d9586b3efc52be197fd842d4eeb2dc00539cadc0c881bcc6ca3",
    "b8b6c6961fca3404604a47671f893d7d6bf3760ba0500e4a585d2508c0adafe3",
}


def verify_remote_document(origin: str, document: dict[str, object]) -> None:
    url = urljoin(origin, str(document["href"]))
    expected_size = int(document["sizeBytes"])
    try:
        with urlopen(Request(url, method="HEAD"), timeout=30) as response:
            if response.status != 200:
                raise RuntimeError(f"HEAD {url} returned {response.status}")
            if response.headers.get_content_type() != "application/pdf":
                raise RuntimeError(f"Unexpected Content-Type for {url}: {response.headers.get('Content-Type')}")
            if int(response.headers.get("Content-Length", "-1")) != expected_size:
                raise RuntimeError(f"Remote size mismatch: {url}")
            if "noindex" not in response.headers.get("X-Robots-Tag", ""):
                raise RuntimeError(f"Missing X-Robots-Tag noindex: {url}")

        with urlopen(Request(url, headers={"Range": "bytes=0-0"}), timeout=30) as response:
            if response.status != 206 or response.read() != b"%":
                raise RuntimeError(f"Range request failed: {url}")
    except HTTPError as error:
        raise RuntimeError(f"Remote verification failed for {url}: HTTP {error.code}") from error


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("/tmp/innoprog-sveden-upload"))
    parser.add_argument("--manifest", type=Path, default=Path("src/app/sveden/documents.generated.json"))
    parser.add_argument("--remote-origin", default="https://innoprog.ru")
    parser.add_argument("--skip-remote", action="store_true")
    args = parser.parse_args()

    try:
        from pypdf import PdfReader
    except ImportError as error:
        raise SystemExit("Install PDF dependencies: python3 -m pip install -r scripts/requirements-sveden.txt") from error

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    documents = manifest["documents"]
    if manifest["counts"] != {"section": 91, "legal": 3, "technical": 2, "total": 96}:
        raise RuntimeError(f"Unexpected counts: {manifest['counts']}")

    staged = sorted((args.root / "site-public").rglob("*.pdf"))
    if len(staged) != 96:
        raise RuntimeError(f"Expected 96 staged PDFs, found {len(staged)}")

    by_key = {document["storageKey"]: document for document in documents}
    missing_text: list[str] = []
    for path in staged:
        key = path.relative_to(args.root).as_posix()
        document = by_key.get(key)
        if not document:
            raise RuntimeError(f"Staged file is absent from manifest: {key}")
        data = path.read_bytes()
        if len(data) != document["sizeBytes"]:
            raise RuntimeError(f"Size mismatch: {key}")
        if hashlib.sha256(data).hexdigest() != document["sha256"]:
            raise RuntimeError(f"SHA-256 mismatch: {key}")
        reader = PdfReader(path, strict=True)
        if not reader.pages:
            raise RuntimeError(f"PDF has no pages: {key}")
        text = "".join((page.extract_text() or "") for page in reader.pages[:5]).strip()
        if not text and document["sha256"] not in IMAGE_ONLY_SIGNED_DOCUMENTS:
            missing_text.append(key)

    if missing_text:
        raise RuntimeError("PDFs without a text layer: " + ", ".join(missing_text))

    remote_verified = 0
    if not args.skip_remote:
        with ThreadPoolExecutor(max_workers=12) as executor:
            list(executor.map(lambda document: verify_remote_document(args.remote_origin, document), documents))
        remote_verified = len(documents)

    print(json.dumps({
        "verified": len(staged),
        "textLayerOrApprovedScan": len(staged),
        "sha256": len(staged),
        "remote": remote_verified,
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
