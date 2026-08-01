#!/usr/bin/env python3
"""Prepare the public educational disclosure PDF set for S3 upload."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen
from zipfile import ZipFile


SECTION_FOLDERS = {
    "01_": "common",
    "02_": "struct",
    "03_": "document",
    "04_": "education",
    "05_": "managers",
    "06_": "employees",
    "07_": "objects",
    "08_": "paid_edu",
    "09_": "budget",
    "10_": "vacant",
    "11_": "grants",
    "12_": "inter",
    "13_": "catering",
    "14_": "eduStandarts",
}

PROGRAM_FOLDERS = {
    "Дополнительные_общеразвивающие_программы": "general",
    "Дополнительные_профессиональные_программы": "professional",
}

LEGAL_FILES = {
    "Политика_обработки_персональных_данных.pdf": "privacy.pdf",
    "Согласие_на_обработку_персональных_данных.pdf": "consent.pdf",
    "Согласие_на_рекламную_и_информационную_рассылку.pdf": "advertising-consent.pdf",
}

TECHNICAL_FILES = {
    "software-operation-manual.pdf": "software-operation-manual.pdf",
    "functional-characteristics.pdf": "functional-characteristics.pdf",
}

EXPECTED_SECTION_PDFS = 89
EXPECTED_LEGAL_PDFS = 3
EXPECTED_TECHNICAL_PDFS = 2
EXPECTED_TOTAL_PDFS = 94
TECHNICAL_SOURCE_BASE_URL = "https://storage.yandexcloud.net/innoprog-documents/site-public/technical/"


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def public_href(relative_key: Path) -> str:
    return "/files/" + "/".join(quote(part) for part in relative_key.parts)


def write_pdf(
    output_root: Path,
    relative_key: Path,
    data: bytes,
    *,
    section: str | None,
    source_name: str,
    category: str,
) -> dict[str, object]:
    destination = output_root / "site-public" / relative_key
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(data)

    return {
        "id": sha256(data)[:16],
        "title": Path(source_name).stem.replace("_", " "),
        "sourceName": source_name,
        "section": section,
        "category": category,
        "storageKey": str(Path("site-public") / relative_key),
        "href": public_href(relative_key),
        "sizeBytes": len(data),
        "sha256": sha256(data),
    }


def section_destination(parts: list[str], section: str, filename: str) -> Path:
    if section == "education":
        for source_folder, public_folder in PROGRAM_FOLDERS.items():
            if source_folder in parts:
                return Path("sveden") / section / public_folder / filename
    return Path("sveden") / section / filename


def read_technical_pdf(source_name: str, technical_dir: Path | None) -> bytes:
    if technical_dir:
        source = technical_dir / source_name
        if not source.is_file():
            raise FileNotFoundError(f"Missing technical PDF: {source}")
        return source.read_bytes()

    with urlopen(TECHNICAL_SOURCE_BASE_URL + quote(source_name), timeout=60) as response:
        data = response.read()
    if not data.startswith(b"%PDF-"):
        raise RuntimeError(f"Technical source is not a PDF: {source_name}")
    return data


def prepare(archive: Path, technical_dir: Path | None, output_root: Path, manifest: Path) -> None:
    if output_root.exists():
        shutil.rmtree(output_root)
    output_root.mkdir(parents=True)

    entries: list[dict[str, object]] = []
    section_count = 0
    legal_count = 0

    with ZipFile(archive) as bundle:
        for member in bundle.infolist():
            if member.is_dir() or not member.filename.lower().endswith(".pdf"):
                continue

            parts = member.filename.split("/")
            parent = next(
                (part for part in parts if any(part.startswith(prefix) for prefix in SECTION_FOLDERS)),
                None,
            )

            if parent:
                prefix = parent[:3]
                section = SECTION_FOLDERS[prefix]
                data = bundle.read(member)
                key = section_destination(parts, section, Path(member.filename).name)
                category = "program" if section == "education" and any(
                    source_folder in parts for source_folder in PROGRAM_FOLDERS
                ) else "section"
                entries.append(
                    write_pdf(
                        output_root,
                        key,
                        data,
                        section=section,
                        source_name=Path(member.filename).name,
                        category=category,
                    )
                )
                section_count += 1
                continue

            if any(part.startswith("98_") for part in parts):
                filename = Path(member.filename).name
                public_name = LEGAL_FILES.get(filename)
                if not public_name:
                    raise RuntimeError(f"Unexpected legal PDF in folder 98: {filename}")
                entries.append(
                    write_pdf(
                        output_root,
                        Path("legal") / public_name,
                        bundle.read(member),
                        section=None,
                        source_name=filename,
                        category="legal",
                    )
                )
                legal_count += 1

    technical_count = 0
    for source_name, public_name in TECHNICAL_FILES.items():
        entries.append(
            write_pdf(
                output_root,
                Path("technical") / public_name,
                read_technical_pdf(source_name, technical_dir),
                section=None,
                source_name=source_name,
                category="technical",
            )
        )
        technical_count += 1

    counts = {
        "section": section_count,
        "legal": legal_count,
        "technical": technical_count,
        "total": len(entries),
    }
    expected = {
        "section": EXPECTED_SECTION_PDFS,
        "legal": EXPECTED_LEGAL_PDFS,
        "technical": EXPECTED_TECHNICAL_PDFS,
        "total": EXPECTED_TOTAL_PDFS,
    }
    if counts != expected:
        raise RuntimeError(f"Unexpected PDF counts: {counts}; expected {expected}")

    entries.sort(key=lambda item: (str(item["section"]), str(item["storageKey"])))
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(
        json.dumps({"generatedAt": "2026-08-01", "counts": counts, "documents": entries}, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )
    print(json.dumps(counts, ensure_ascii=False))
    print(f"Staged files: {output_root / 'site-public'}")
    print(f"Manifest: {manifest}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--technical-dir", type=Path, help="Optional directory containing the two technical source PDFs")
    parser.add_argument("--output", type=Path, default=Path("/tmp/innoprog-sveden-upload"))
    parser.add_argument(
        "--manifest",
        type=Path,
        default=Path("src/app/sveden/documents.generated.json"),
    )
    args = parser.parse_args()
    prepare(args.archive, args.technical_dir, args.output, args.manifest)


if __name__ == "__main__":
    main()
