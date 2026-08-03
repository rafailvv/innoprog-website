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
    "fb6ddbecbb0366d6ca6820c41d54e3cea3197ef48a92cccd825d942e84c9fee5",
    "064e706894b6350d0bfaf2d2eedb24648370f4d2ca19cda1f6b0f33802e43fc9",
    "8dc92527cb1263b6d0cfe391f882b49353b766f7d9e99aa20e89808fe55e0967",
    "0fb557b72876f25cf7785a5360058e2033a86cc91a5691f57a104bda59578105",
    "104f82eb6d39d9447ec32a6bca6f7f8c5135fbee9e038e71c29bb2c2140ae7fc",
    "c020b916ed3c83856b1f62c3cbbe1de7ab58dd38652414bab7dac5f7165f3d81",
    "33a4aff0305640172f0b838a376e5d715e132b45652d0139091463e799d5548c",
    "de60a1be04dddbeaf9db5f0bde9bfa13550a79d5f7f7ce6be857f09e4f6e9f62",
    "a4a38f50ca577402f9d11697843e50d7394965634d2279cbd95806e0258bc16e",
    "9252ab9848f95778a2b70ceca9bc95741b9afbc4541db12659ada31100c35888",
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
    if manifest["counts"] != {"section": 96, "legal": 3, "technical": 2, "archive": 1, "total": 102}:
        raise RuntimeError(f"Unexpected counts: {manifest['counts']}")

    staged = sorted((args.root / "site-public").rglob("*.pdf"))
    if len(staged) != 102:
        raise RuntimeError(f"Expected 102 staged PDFs, found {len(staged)}")

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
