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

from pdf_lossless import optimize_pdf_bytes


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

PROGRAM_UPDATE_FILES = {
    "C++ разработчик программа обучения.pdf": "cpp_developer.pdf",
    "Data Science программа обучения.pdf": "data_science.pdf",
    "Data-аналитик программа обучения.pdf": "data_analyst.pdf",
    "Frontend-разработчик программа обучения.pdf": "frontend_developer.pdf",
    "Java-разработчик программа обучения.pdf": "java_developer.pdf",
    "ML-инженер программа обучения.pdf": "ml_engineer.pdf",
    "Python-разработчик программа обучения.pdf": "python_developer.pdf",
    "Unreal Engine программа обучения.pdf": "unreal_engine.pdf",
    "Мобильный разработчик программа обучения.pdf": "mobile_developer.pdf",
}

CHILD_PROGRAM_FILES = {
    "Python_разработчик_для_детей.pdf": "Python-разработчик для детей программа обучения.pdf",
    "Frontend_разработчик_для_детей.pdf": "Frontend-разработчик для детей программа обучения.pdf",
    "C++_разработчик_для_детей.pdf": "C++-разработчик для детей программа обучения.pdf",
    "Java_разработчик_для_детей.pdf": "Java-разработчик для детей программа обучения.pdf",
    "Мобильный_разработчик_для_детей.pdf": "Мобильный разработчик для детей программа обучения.pdf",
    "Разработчик_игр_на_Unreal_Engine_для_детей.pdf": "Разработчик игр на Unreal Engine для детей программа обучения.pdf",
}

CHILD_PROGRAM_ORDER = "ПРИКАЗ_№_ОБР-13_ОБ_УТВЕРЖДЕНИИ_ДЕТСКИХ_ПРОГРАММ.pdf"
CHILD_VACANCY_ORDER = "ПРИКАЗ_№_ОБР-14_О_ВНЕСЕНИИ_ИЗМЕНЕНИЙ_В_ПРИКАЗ_№_ОБР-10_И_УСТАНОВЛЕНИИ_ВАКАНТНЫХ_МЕСТ_ПО_ДЕТСКИМ_ПРОГРАММАМ.pdf"

GENERAL_12PLUS_PROGRAM_FILES = {
    "cpp_developer_do_12plus.pdf": "C++ разработчик программа обучения для детей от 12 лет и взрослых.pdf",
    "data_science_do_12plus.pdf": "Data Science программа обучения для детей от 12 лет и взрослых.pdf",
    "data_analyst_do_12plus.pdf": "Data-аналитик программа обучения для детей от 12 лет и взрослых.pdf",
    "frontend_developer_do_12plus.pdf": "Frontend-разработчик программа обучения для детей от 12 лет и взрослых.pdf",
    "java_developer_do_12plus.pdf": "Java-разработчик программа обучения для детей от 12 лет и взрослых.pdf",
    "ml_engineer_do_12plus.pdf": "ML-инженер программа обучения для детей от 12 лет и взрослых.pdf",
    "python_development_do_12plus.pdf": "Python-разработчик программа обучения для детей от 12 лет и взрослых.pdf",
    "unreal_engine_do_12plus.pdf": "Unreal Engine программа обучения для детей от 12 лет и взрослых.pdf",
    "mobile_developer_do_12plus.pdf": "Мобильный разработчик программа обучения для детей от 12 лет и взрослых.pdf",
}
GENERAL_12PLUS_ORDER_PUBLIC_PATH = Path(
    "sveden/education/Приказ_№_ОБР-5_о_дополнении_перечня_образовательных_программ.pdf"
)

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
    "ПОЛОЖЕНИЕ_О_ПОРЯДКЕ_РАЗРАБОТКИ_И_УТВЕРЖДЕНИЯ_ДОПОЛНИТЕЛЬНЫХ_ПРОФЕССИОНАЛЬНЫХ_ПРОГРАММ.pdf":
        (
            "Положение_о_порядке_разработки_и_утверждения_дополнительных_профессиональных_программ.pdf",
            "Положение о порядке разработки и утверждения дополнительных профессиональных программ",
        ),
    "ПРИКАЗ_№_ОБР-9_ОБ_УТВЕРЖДЕНИИ_ПОЛОЖЕНИЯ_О_ПОРЯДКЕ_РАЗРАБОТКИ_И_УТВЕРЖДЕНИЯ_ДПП.pdf":
        (
            "Приказ_№_ОБР-9_об_утверждении_Положения_о_порядке_разработки_и_утверждения_ДПП.pdf",
            "Приказ № ОБР-9 об утверждении Положения о порядке разработки и утверждения дополнительных профессиональных программ",
        ),
    "ПРИКАЗ_№_ОБР-10_ОБ_УТВЕРЖДЕНИИ_КОЛИЧЕСТВА_ВАКАНТНЫХ_МЕСТ_С_ПРИЛОЖЕНИЕМ.pdf":
        (
            "Приказ_№_ОБР-10_об_утверждении_количества_вакантных_мест_с_приложением.pdf",
            "Приказ ООО «ИННОПРОГ» от 02.08.2026 № ОБР-10 «Об утверждении количества вакантных мест для приёма (перевода) обучающихся»",
        ),
    "ПРИКАЗ_№_ОБР-11_ОБ_УТВЕРЖДЕНИИ_НОВЫХ_РЕДАКЦИЙ_ДОПОЛНИТЕЛЬНЫХ_ПРОФЕССИОНАЛЬНЫХ_ПРОГРАММ.pdf":
        (
            "Приказ_№_ОБР-11_об_утверждении_новых_редакций_дополнительных_профессиональных_программ.pdf",
            "Приказ № ОБР-11 об утверждении новых редакций дополнительных профессиональных программ",
        ),
}

REPLACED_SECTION_FILES = {
    ("education", "Сведения_о_численности_обучающихся_по_реализуемым_образовательным_программам.pdf"),
    ("vacant", "СВЕДЕНИЯ_О_ВАКАНТНЫХ_МЕСТАХ_НА_01.08.2026.pdf"),
}

STUDENT_COUNT_PUBLIC_PATH = Path(
    "sveden/education/Сведения_о_численности_обучающихся_по_состоянию_на_05.08.2026.pdf"
)
STUDENT_COUNT_TITLE = "Сведения о численности обучающихся по состоянию на 05.08.2026"

UPDATE_FILES = {
    "ИНСТРУКЦИЯ_ПО_ЭКСПЛУАТАЦИИ_ПО_INNOPROG.pdf": [
        ("technical/software-operation-manual.pdf", None, "technical", "Инструкция по эксплуатации ПО INNOPROG"),
    ],
    "ПОЛИТИКА_ОПЕРАТОРА_В_ОТНОШЕНИИ_ОБРАБОТКИ_ПЕРСОНАЛЬНЫХ_ДАННЫХ.pdf": [
        ("legal/privacy.pdf", None, "legal", "Политика оператора в отношении обработки персональных данных"),
    ],
    "СОГЛАСИЕ_СОВЕРШЕННОЛЕТНЕГО_СУБЪЕКТА_НА_ОБРАБОТКУ_ПЕРСОНАЛЬНЫХ_ДАННЫХ.pdf": [
        (
            "legal/consent.pdf",
            None,
            "legal",
            "Согласие совершеннолетнего субъекта на обработку персональных данных",
        ),
    ],
    "СОГЛАСИЕ_ЗАКОННОГО_ПРЕДСТАВИТЕЛЯ_НА_ОБРАБОТКУ_ПЕРСОНАЛЬНЫХ_ДАННЫХ_НЕСОВЕРШЕННОЛЕТНЕГО_И_ПРЕДСТАВИТЕЛЯ.pdf": [
        (
            "legal/consent-representative.pdf",
            None,
            "legal",
            "Согласие законного представителя на обработку персональных данных несовершеннолетнего и представителя",
        ),
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
    "ОТЧЁТ_О_РЕЗУЛЬТАТАХ_САМООБСЛЕДОВАНИЯ_ЗА_2025_ГОД.pdf": [
        ("sveden/document/Отчет_о_результатах_самообследования_за_2025_год.pdf", "document", "section", "Отчет о результатах самообследования за 2025 год"),
    ],
    "ПРИКАЗ_ОБР-12_ОБ_ОРГАНИЗАЦИИ_ОБУЧЕНИЯ_С_ЭО_И_ДОТ.pdf": [
        ("sveden/document/Приказ_№_ОБР-12_об_организации_образовательной_деятельности_с_применением_электронного_обучения_и_ДОТ.pdf", "document", "section", "Приказ № ОБР-12 об организации образовательной деятельности с применением электронного обучения и дистанционных образовательных технологий"),
    ],
    "ПРИКАЗ_№_ОБР-8_ОБ_УТВЕРЖДЕНИИ_НОВЫХ_РЕДАКЦИЙ_ЛОКАЛЬНЫХ_НОРМАТИВНЫХ_АКТОВ.pdf": [
        ("sveden/document/Приказ_№_ОБР-8_об_утверждении_новых_редакций_локальных_нормативных_актов.pdf", "document", "section", "Приказ № ОБР-8 об утверждении новых редакций локальных нормативных актов"),
    ],
}

REPLACED_PUBLIC_KEYS = {
    "site-public/sveden/document/Приказ_об_организации_обучения_с_применением_электронного_обучения_и_ДОТ.pdf",
    "site-public/sveden/document/Приказ_об_организации_дистанционного_обучения.pdf",
    "site-public/sveden/document/ПРИКАЗ_ОБ_ОРГАНИЗАЦИИ_ДИСТАНЦИОННОГО_ОБУЧЕНИЯ.pdf",
    "site-public/sveden/archive/document/Приказ_об_организации_дистанционного_обучения.pdf",
}

EXPECTED_SECTION_PDFS = 113
EXPECTED_LEGAL_PDFS = 4
EXPECTED_TECHNICAL_PDFS = 2
EXPECTED_ARCHIVE_PDFS = 0
EXPECTED_TOTAL_PDFS = 119
TECHNICAL_SOURCE_BASE_URL = "https://storage.yandexcloud.net/innoprog-documents/site-public/technical/"
PUBLIC_SOURCE_BASE_URL = "https://storage.yandexcloud.net/innoprog-documents/site-public/"

PRESERVED_REMOTE_FILES = {
    "sveden/employees/СВЕДЕНИЯ_О_ПЕДАГОГИЧЕСКОМ_СОСТАВЕ.pdf": {
        "sha256": "552ccdb4a11d6ba5ccd1148f8fdc76a714c70c494dfe8520bcfb5c6983ff4a94",
        "section": "employees",
        "source_name": "СВЕДЕНИЯ_О_ПЕДАГОГИЧЕСКОМ_СОСТАВЕ.pdf",
        "category": "section",
    },
    "sveden/inter/СВЕДЕНИЯ_О_МЕЖДУНАРОДНОМ_СОТРУДНИЧЕСТВЕ.pdf": {
        "sha256": "749388dc2542428e31e44e7171f7ab28c9fa0ab786c216e46f54cc6821d539ee",
        "section": "inter",
        "source_name": "СВЕДЕНИЯ_О_МЕЖДУНАРОДНОМ_СОТРУДНИЧЕСТВЕ.pdf",
        "category": "section",
    },
    "sveden/objects/СВЕДЕНИЯ_О_МАТЕРИАЛЬНО-ТЕХНИЧЕСКОМ_ОБЕСПЕЧЕНИИ_И_ДОСТУПНОЙ_СРЕДЕ.pdf": {
        "sha256": "4b5dfc118136b3ffe0870420b939a396e1bf0139f9bfdec9ab06ed69907faaa6",
        "section": "objects",
        "source_name": "СВЕДЕНИЯ_О_МАТЕРИАЛЬНО-ТЕХНИЧЕСКОМ_ОБЕСПЕЧЕНИИ_И_ДОСТУПНОЙ_СРЕДЕ.pdf",
        "category": "section",
    },
}

OLD_OFFER_KEY = "site-public/sveden/paid_edu/Публичная_оферта_редакция_08.04.2026.pdf"
NEW_OFFER_PATH = Path("sveden/paid_edu/Публичная_оферта_INNOPROG_от_02.08.2026.pdf")
NEW_OFFER_TITLE = "Публичная оферта INNOPROG от 02.08.2026"


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
    source_sha256 = sha256(data)
    data = optimize_pdf_bytes(data)
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
        "sourceSha256": source_sha256,
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


def read_public_pdf(relative_key: str, expected_sha256: str) -> bytes:
    url = PUBLIC_SOURCE_BASE_URL + "/".join(quote(part) for part in Path(relative_key).parts)
    with urlopen(url, timeout=60) as response:
        data = response.read()
    actual_sha256 = sha256(data)
    if not data.startswith(b"%PDF-") or actual_sha256 != expected_sha256:
        raise RuntimeError(
            f"Published PDF differs from the approved version: {relative_key} "
            f"({actual_sha256} != {expected_sha256})"
        )
    return data


def prepare(
    archive: Path,
    technical_dir: Path | None,
    supplemental_dir: Path,
    updates_dir: Path,
    program_updates_dir: Path,
    child_programs_dir: Path,
    general_12plus_programs_dir: Path,
    general_12plus_order_file: Path,
    offer_file: Path,
    student_count_file: Path,
    output_root: Path,
    manifest: Path,
) -> None:
    if output_root.exists():
        shutil.rmtree(output_root)
    output_root.mkdir(parents=True)

    entries: list[dict[str, object]] = []
    section_count = 0
    legal_count = 0
    replaced_programs: set[str] = set()

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
                source_name = Path(member.filename).name
                if (section, source_name) in REPLACED_SECTION_FILES:
                    continue
                key = section_destination(parts, section, source_name)
                category = "program" if section == "education" and any(
                    source_folder in parts for source_folder in PROGRAM_FOLDERS
                ) else "section"
                is_professional_program = "Дополнительные_профессиональные_программы" in parts
                if is_professional_program and source_name in PROGRAM_UPDATE_FILES:
                    replacement = program_updates_dir / PROGRAM_UPDATE_FILES[source_name]
                    if not replacement.is_file():
                        raise FileNotFoundError(f"Missing approved program PDF: {replacement}")
                    data = replacement.read_bytes()
                    if not data.startswith(b"%PDF-"):
                        raise RuntimeError(f"Program source is not a PDF: {replacement}")
                    replaced_programs.add(source_name)
                else:
                    data = bundle.read(member)
                entries.append(
                    write_pdf(
                        output_root,
                        key,
                        data,
                        section=section,
                        source_name=source_name,
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

    missing_programs = set(PROGRAM_UPDATE_FILES) - replaced_programs
    if missing_programs:
        raise RuntimeError(f"Programs from the source ZIP were not replaced: {sorted(missing_programs)}")

    for source_name, public_name in CHILD_PROGRAM_FILES.items():
        source = child_programs_dir / source_name
        if not source.is_file():
            raise FileNotFoundError(f"Missing approved child program PDF: {source}")
        data = source.read_bytes()
        if not data.startswith(b"%PDF-"):
            raise RuntimeError(f"Child program source is not a PDF: {source}")
        entries.append(
            write_pdf(
                output_root,
                Path("sveden") / "education" / "general" / public_name,
                data,
                section="education",
                source_name=public_name,
                category="program",
            )
        )
        section_count += 1

    for source_name, public_name in GENERAL_12PLUS_PROGRAM_FILES.items():
        source = general_12plus_programs_dir / source_name
        if not source.is_file():
            raise FileNotFoundError(f"Missing approved general 12+ program PDF: {source}")
        data = source.read_bytes()
        if not data.startswith(b"%PDF-"):
            raise RuntimeError(f"General 12+ program source is not a PDF: {source}")
        entries.append(
            write_pdf(
                output_root,
                Path("sveden") / "education" / "general" / public_name,
                data,
                section="education",
                source_name=public_name,
                category="program",
            )
        )
        section_count += 1

    if not general_12plus_order_file.is_file():
        raise FileNotFoundError(f"Missing approved order No. OBR-5: {general_12plus_order_file}")
    general_12plus_order_entry = write_pdf(
        output_root,
        GENERAL_12PLUS_ORDER_PUBLIC_PATH,
        general_12plus_order_file.read_bytes(),
        section="education",
        source_name=GENERAL_12PLUS_ORDER_PUBLIC_PATH.name,
        category="section",
    )
    general_12plus_order_entry["title"] = "Приказ № ОБР-5 о дополнении перечня образовательных программ"
    entries.append(general_12plus_order_entry)

    order_source = child_programs_dir / CHILD_PROGRAM_ORDER
    if not order_source.is_file():
        raise FileNotFoundError(f"Missing child program approval order: {order_source}")
    order_entry = write_pdf(
        output_root,
        Path("sveden") / "education" / "Приказ_№_ОБР-13_об_утверждении_детских_программ.pdf",
        order_source.read_bytes(),
        section="education",
        source_name=CHILD_PROGRAM_ORDER,
        category="section",
    )
    order_entry["title"] = "Приказ № ОБР-13 об утверждении детских образовательных программ"
    entries.append(order_entry)
    section_count += 1

    vacancy_order_source = child_programs_dir / CHILD_VACANCY_ORDER
    if not vacancy_order_source.is_file():
        raise FileNotFoundError(f"Missing child vacancy order: {vacancy_order_source}")
    vacancy_order_entry = write_pdf(
        output_root,
        Path("sveden") / "document" / "Приказ_№_ОБР-14_о_внесении_изменений_в_приказ_№_ОБР-10_и_установлении_вакантных_мест_по_детским_программам.pdf",
        vacancy_order_source.read_bytes(),
        section="document",
        source_name=CHILD_VACANCY_ORDER,
        category="section",
    )
    vacancy_order_entry["title"] = "Приказ № ОБР-14 о внесении изменений в приказ № ОБР-10 и установлении вакантных мест по детским образовательным программам"
    entries.append(vacancy_order_entry)
    section_count += 1

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

    archive_count = 0

    entries_by_key = {str(entry["storageKey"]): entry for entry in entries}
    for replaced_key in REPLACED_PUBLIC_KEYS:
        entries_by_key.pop(replaced_key, None)

    # The source ZIP still contains older drafts of these three signed disclosures.
    # Preserve the approved public copies until a newer signed revision is supplied.
    for relative_key, metadata in PRESERVED_REMOTE_FILES.items():
        entry = write_pdf(
            output_root,
            Path(relative_key),
            read_public_pdf(relative_key, str(metadata["sha256"])),
            section=str(metadata["section"]),
            source_name=str(metadata["source_name"]),
            category=str(metadata["category"]),
        )
        entries_by_key[str(entry["storageKey"])] = entry

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

    if not offer_file.is_file():
        raise FileNotFoundError(f"Missing approved public offer PDF: {offer_file}")
    offer_data = offer_file.read_bytes()
    if not offer_data.startswith(b"%PDF-"):
        raise RuntimeError(f"Public offer source is not a PDF: {offer_file}")
    entries_by_key.pop(OLD_OFFER_KEY, None)
    old_offer_file = output_root / OLD_OFFER_KEY
    if old_offer_file.exists():
        old_offer_file.unlink()
    offer_entry = write_pdf(
        output_root,
        NEW_OFFER_PATH,
        offer_data,
        section="paid_edu",
        source_name=offer_file.name,
        category="section",
    )
    offer_entry["title"] = NEW_OFFER_TITLE
    entries_by_key[str(offer_entry["storageKey"])] = offer_entry

    if not student_count_file.is_file():
        raise FileNotFoundError(f"Missing approved student count PDF: {student_count_file}")
    student_count_data = student_count_file.read_bytes()
    if not student_count_data.startswith(b"%PDF-"):
        raise RuntimeError(f"Student count source is not a PDF: {student_count_file}")
    student_count_entry = write_pdf(
        output_root,
        STUDENT_COUNT_PUBLIC_PATH,
        student_count_data,
        section="education",
        source_name=student_count_file.name,
        category="section",
    )
    student_count_entry["title"] = STUDENT_COUNT_TITLE
    entries_by_key[str(student_count_entry["storageKey"])] = student_count_entry
    section_count += 1

    entries = list(entries_by_key.values())

    counts = {
        "section": section_count,
        "legal": legal_count,
        "technical": technical_count,
        "archive": archive_count,
        "total": len(entries),
    }
    expected = {
        "section": EXPECTED_SECTION_PDFS,
        "legal": EXPECTED_LEGAL_PDFS,
        "technical": EXPECTED_TECHNICAL_PDFS,
        "archive": EXPECTED_ARCHIVE_PDFS,
        "total": EXPECTED_TOTAL_PDFS,
    }
    if counts != expected:
        raise RuntimeError(f"Unexpected PDF counts: {counts}; expected {expected}")

    entries.sort(key=lambda item: (str(item["section"]), str(item["storageKey"])))
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(
        json.dumps({"generatedAt": "2026-08-26", "counts": counts, "documents": entries}, ensure_ascii=False, indent=2)
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
    parser.add_argument(
        "--program-updates-dir",
        type=Path,
        required=True,
        help="Directory containing the nine approved professional program PDFs",
    )
    parser.add_argument(
        "--child-programs-dir",
        type=Path,
        required=True,
        help="Directory containing the six child program PDFs and orders No. OBR-13 and OBR-14",
    )
    parser.add_argument(
        "--general-12plus-programs-dir",
        type=Path,
        required=True,
        help="Directory containing the nine general programs for children aged 12+ and adults",
    )
    parser.add_argument(
        "--general-12plus-order-file",
        type=Path,
        required=True,
        help="Approved order No. OBR-5 PDF",
    )
    parser.add_argument(
        "--offer-file",
        type=Path,
        required=True,
        help="Approved public offer PDF that replaces the previous revision",
    )
    parser.add_argument(
        "--student-count-file",
        type=Path,
        required=True,
        help="Approved student count PDF that replaces the previous revision",
    )
    parser.add_argument("--output", type=Path, default=Path("/tmp/innoprog-sveden-upload"))
    parser.add_argument(
        "--manifest",
        type=Path,
        default=Path("src/app/sveden/documents.generated.json"),
    )
    args = parser.parse_args()
    prepare(
        args.archive,
        args.technical_dir,
        args.supplemental_dir,
        args.updates_dir,
        args.program_updates_dir,
        args.child_programs_dir,
        args.general_12plus_programs_dir,
        args.general_12plus_order_file,
        args.offer_file,
        args.student_count_file,
        args.output,
        args.manifest,
    )


if __name__ == "__main__":
    main()
