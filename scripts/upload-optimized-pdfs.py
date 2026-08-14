#!/usr/bin/env python3
"""Upload optimized public PDFs from a Yandex Cloud VM service account."""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen


METADATA_TOKEN_URL = (
    "http://169.254.169.254/computeMetadata/v1/instance/"
    "service-accounts/default/token"
)
STORAGE_BASE_URL = "https://storage.yandexcloud.net"


def get_iam_token() -> str:
    request = Request(METADATA_TOKEN_URL, headers={"Metadata-Flavor": "Google"})
    with urlopen(request, timeout=10) as response:
        return str(json.load(response)["access_token"])


def object_url(bucket: str, key: str) -> str:
    return f"{STORAGE_BASE_URL}/{bucket}/" + "/".join(quote(part) for part in Path(key).parts)


def upload_and_verify(*, root: Path, bucket: str, token: str, item: dict[str, object]) -> str:
    key = str(item["storageKey"])
    data = (root / key).read_bytes()
    expected_sha256 = str(item["sha256"])
    if hashlib.sha256(data).hexdigest() != expected_sha256:
        raise RuntimeError(f"Local SHA-256 mismatch: {key}")

    upload = Request(
        object_url(bucket, key),
        data=data,
        method="PUT",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline",
            "Cache-Control": "public, max-age=3600",
            "x-amz-acl": "public-read",
            "x-amz-storage-class": "INTELLIGENT_TIERING",
        },
    )
    with urlopen(upload, timeout=180) as response:
        if response.status != 200:
            raise RuntimeError(f"Upload failed ({response.status}): {key}")

    verify = Request(object_url(bucket, key), headers={"Cache-Control": "no-cache"})
    with urlopen(verify, timeout=180) as response:
        remote = response.read()
    if hashlib.sha256(remote).hexdigest() != expected_sha256:
        raise RuntimeError(f"Remote SHA-256 mismatch: {key}")
    return key


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--bucket", default="innoprog-documents")
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    report = json.loads(args.report.read_text(encoding="utf-8"))
    changed = [item for item in report["documents"] if item["changed"]]
    token = get_iam_token()
    completed = 0
    with ThreadPoolExecutor(max_workers=max(1, args.workers)) as executor:
        futures = {
            executor.submit(
                upload_and_verify,
                root=args.root,
                bucket=args.bucket,
                token=token,
                item=item,
            ): item
            for item in changed
        }
        for future in as_completed(futures):
            future.result()
            completed += 1
            print(f"Uploaded and verified {completed}/{len(changed)}", flush=True)

    print(f"Uploaded and verified {completed} PDFs")


if __name__ == "__main__":
    main()
