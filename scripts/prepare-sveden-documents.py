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

SUPPLEMENTAL_DOCUMENT_FILES = {
    "ПОЛОЖЕНИЕ_О_ПОРЯДКЕ_ЗАЧЕТА_РЕЗУЛЬТАТОВ_РАНЕЕ_ОСВОЕННЫХ_ОБРАЗОВАТЕЛЬНЫХ_ПРОГРАММ_И_ИХ_КОМПОНЕНТОВ.pdf":
        (
            "Положение_о_порядке_зачета_результатов_ранее_освоенных_образовательных_программ_и_их_компонентов.pdf",
            "Положение о порядке зачёта результатов ранее освоенных образовательных программ и их компонентов",
        ),
    "ПРИКАЗ_№_ОБР-7_ОБ_УТВЕРЖДЕНИИ_ПОЛОЖЕНИЯ_О_ПОРЯДКЕ_ЗАЧЕТА.pdf":
        (
            "Приказ_№_ОБР-7_об_утверждении_Положения_о_порядке_зачета.pdf",
            "Приказ № ОБР-7 об утверждении Положения о порядке зачёта",
        ),
}

UPDATE_FILES = {
    "ИНСТРУКЦИЯ_ПО_ЭКСПЛУАТАЦИИ_ПО_INNOPROG.pdf": [
        ("technical/software-operation-manual.pdf", None, "technical", "Инструкция по эксплуатации ПО INNOPROG"),
    ],
    "ПОЛИТИКА_ОПЕРАТОРА_В_ОТНОШЕНИИ_ОБРАБОТКИ_ПЕРСОНАЛЬНЫХ_ДАННЫХ.pdf": [
        ("legal/privacy.pdf", None, "legal", "Политика оператора в отношении обработки персональных данных"),
    ],
    "СОГЛАСИЕ_НА_ОБРАБОТКУ_ПЕРСОНАЛЬНЫХ_ДАННЫХ.pdf": [
        ("legal/consent.pdf", None, "legal", "Согласие на обработку персональных данных"),
    ],
    "СОГЛАСИЕ_НА_ПОЛУЧЕНИЕ_РЕКЛАМНОЙ И_ИНФОРМАЦИОННОЙ_РАССЫЛКИ.pdf": [
        ("legal/advertising-consent.pdf", None, "legal", "Согласие на получение рекламной и информационной рассылки"),
    ],
    "ПОЛОЖЕНИЕ_ОБ_ОКАЗАНИИ_ПЛАТНЫХ_ОБРАЗОВАТЕЛЬНЫХ_УСЛУГ.pdf": [
        ("sveden/document/Положение_об_оказании_платных_образовательных_услуг.pdf", "document", "section", "Положение об оказании платных образовательных услуг"),
        ("sveden/paid_edu/Положение_об_оказании_платных_образовательных_услуг.pdf", "paid_edu", "section", "Положение об оказании платных образовательных услуг"),
    ],
    "ПОЛОЖЕНИЕ_ОБ_ОРГАНИЗАЦИИ_ОБРАЗОВАТЕЛЬНОГО_ПРОЦЕССА.pdf": [
        ("sveden/document/Положение_об_организации_образовательного_процесса.pdf", "document", "section", "Положение об организации образовательного процесса"),
    ],
    "ПОЛОЖЕНИЕ_ОБ_ЭЛЕКТРОННОМ_ОБУЧЕНИИ_И_ДИСТАНЦИОННЫХ_ОБРАЗОВАТЕЛЬНЫХ_ТЕХНОЛОГИЯХ.pdf": [
        ("sveden/document/Положение_об_электронном_обучении_и_ДОТ.pdf", "document", "section", "Положение об электронном обучении и дистанционных образовательных технологиях"),
        ("sveden/objects/Положение_об_электронном_обучении_и_ДОТ.pdf", "objects", "section", "Положение об электронном обучении и дистанционных образовательных технологиях"),
    ],
    "ПРАВИЛА_ВНУТРЕННЕГО_РАСПОРЯДКА_ОБУЧАЮЩИХСЯ.pdf": [
        ("sveden/document/Правила_внутреннего_распорядка_обучающихся.pdf", "document", "section", "Правила внутреннего распорядка обучающихся"),
    ],
    "ПРИКАЗ_ОБ_ОРГАНИЗАЦИИ_ДИСТАНЦИОННОГО_ОБУЧЕНИЯ.pdf": [
        ("sveden/document/Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf", "document", "section", "Приказ об организации обучения с применением электронного обучения и дистанционных образовательных технологий"),
    ],
    "ПРИКАЗ_№_ОБР-8_ОБ_УТВЕРЖДЕНИИ_НОВЫХ_РЕДАКЦИЙ_ЛОКАЛЬНЫХ_НОРМАТИВНЫХ_АКТОВ.pdf": [
        ("sveden/document/Приказ_№_ОБР-8_об_утверждении_новых_редакций_локальных_нормативных_актов.pdf", "document", "section", "Приказ № ОБР-8 об утверждении новых редакций локальных нормативных актов"),
    ],
}

EXPECTED_SECTION_PDFS = 93
EXPECTED_LEGAL_PDFS = 3
EXPECTED_TECHNICAL_PDFS = 2
EXPECTED_TOTAL_PDFS = 98
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


def prepare(
    archive: Path,
    technical_dir: Path | None,
    supplemental_dir: Path,
    updates_dir: Path,
    output_root: Path,
    manifest: Path,
) -> None:
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

    for source_name, (public_name, title) in SUPPLEMENTAL_DOCUMENT_FILES.items():
        source = supplemental_dir / source_name
        if not source.is_file():
            raise FileNotFoundError(f"Missing supplemental disclosure PDF: {source}")
        entry = write_pdf(
            output_root,
            Path("sveden") / "document" / public_name,
            source.read_bytes(),
            section="document",
            source_name=source_name,
            category="section",
        )
        entry["title"] = title
        entries.append(entry)
        section_count += 1

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

    entries_by_key = {str(entry["storageKey"]): entry for entry in entries}
    for source_name, destinations in UPDATE_FILES.items():
        source = updates_dir / source_name
        if not source.is_file():
            raise FileNotFoundError(f"Missing approved updated PDF: {source}")
        data = source.read_bytes()
        if not data.startswith(b"%PDF-"):
            raise RuntimeError(f"Updated source is not a PDF: {source}")

        for relative_key, section, category, title in destinations:
            entry = write_pdf(
                output_root,
                Path(relative_key),
                data,
                section=section,
                source_name=source_name,
                category=category,
            )
            entry["title"] = title
            storage_key = str(entry["storageKey"])
            if storage_key not in entries_by_key:
                if category == "section":
                    section_count += 1
                elif category == "legal":
                    legal_count += 1
                elif category == "technical":
                    technical_count += 1
            entries_by_key[storage_key] = entry

    entries = list(entries_by_key.values())

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
        json.dumps({"generatedAt": "2026-08-02", "counts": counts, "documents": entries}, ensure_ascii=False, indent=2)
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
    parser.add_argument(
        "--supplemental-dir",
        type=Path,
        required=True,
        help="Directory containing the approved credit-policy PDF and order No. OBR-7",
    )
    parser.add_argument(
        "--updates-dir",
        type=Path,
        required=True,
        help="Directory containing the approved PDF revisions published on 02.08.2026",
    )
    parser.add_argument("--output", type=Path, default=Path("/tmp/innoprog-sveden-upload"))
    parser.add_argument(
        "--manifest",
        type=Path,
        default=Path("src/app/sveden/documents.generated.json"),
    )
    args = parser.parse_args()
    prepare(args.archive, args.technical_dir, args.supplemental_dir, args.updates_dir, args.output, args.manifest)


if __name__ == "__main__":
    main()
