#!/usr/bin/env python3
"""Download and losslessly optimize the PDFs listed in the public manifest."""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

from pdf_lossless import has_embedded_signature, optimize_pdf_bytes


PUBLIC_BASE_URL = "https://storage.yandexcloud.net/innoprog-documents/"


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def public_url(storage_key: str) -> str:
    return PUBLIC_BASE_URL + "/".join(quote(part) for part in Path(storage_key).parts)


def download(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "INNOPROG PDF lossless optimizer/1.0"})
    with urlopen(request, timeout=120) as response:
        data = response.read()
    if not data.startswith(b"%PDF-"):
        raise RuntimeError(f"Downloaded object is not a PDF: {url}")
    return data


def optimize_document(document: dict[str, object]) -> tuple[bytes, bytes, bool]:
    source = download(public_url(str(document["storageKey"])))
    return source, optimize_pdf_bytes(source), has_embedded_signature(source)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--manifest",
        type=Path,
        default=Path("src/app/sveden/documents.generated.json"),
    )
    parser.add_argument("--output", type=Path, default=Path("tmp/optimized-public-pdfs"))
    parser.add_argument("--report", type=Path, default=Path("tmp/optimized-public-pdfs-report.json"))
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    args.output.mkdir(parents=True, exist_ok=True)
    report: list[dict[str, object]] = []
    changed = 0
    before_total = 0
    after_total = 0

    documents = manifest["documents"]
    completed: dict[int, tuple[bytes, bytes, bool]] = {}
    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
        futures = {
            executor.submit(optimize_document, document): index
            for index, document in enumerate(documents)
        }
        for future in as_completed(futures):
            index = futures[future]
            completed[index] = future.result()
            print(f"Processed {len(completed)}/{len(documents)}", flush=True)

    for index, document in enumerate(documents):
        storage_key = str(document["storageKey"])
        source, optimized, signature_skipped = completed[index]
        is_changed = optimized != source
        before_total += len(source)
        after_total += len(optimized)

        if is_changed:
            destination = args.output / storage_key
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(optimized)
            changed += 1

        document.setdefault("sourceSha256", sha256(source))
        document["sizeBytes"] = len(optimized)
        document["sha256"] = sha256(optimized)
        document["id"] = document["sha256"][:16]
        report.append(
            {
                "storageKey": storage_key,
                "beforeBytes": len(source),
                "afterBytes": len(optimized),
                "changed": is_changed,
                "embeddedSignatureSkipped": signature_skipped,
                "sha256": document["sha256"],
            }
        )

    manifest["counts"]["total"] = len(manifest["documents"])
    args.manifest.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(
        json.dumps(
            {
                "changed": changed,
                "beforeBytes": before_total,
                "afterBytes": after_total,
                "savedBytes": before_total - after_total,
                "documents": report,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(
        f"Optimized {changed}/{len(report)} PDFs: "
        f"{before_total / 1024 / 1024:.2f} MiB -> {after_total / 1024 / 1024:.2f} MiB"
    )


if __name__ == "__main__":
    main()
