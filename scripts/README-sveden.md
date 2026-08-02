# Публичные документы раздела `/sveden`

Исходным комплектом служит ZIP, переданный образовательной организацией на дату 01.08.2026. Скрипт принимает архив явно, извлекает только разрешённые PDF из папок `01`–`14` и `98`, добавляет два опубликованных технических PDF, утверждённое Положение о порядке зачёта и приказ № ОБР-7 и формирует ровно 96 файлов вместе с manifest.

```bash
python3 -m venv .venv-sveden
.venv-sveden/bin/pip install -r scripts/requirements-sveden.txt
.venv-sveden/bin/python scripts/prepare-sveden-documents.py /path/to/source.zip \
  --supplemental-dir /path/to/approved-credit-policy-files
.venv-sveden/bin/python scripts/verify-sveden-documents.py
```

В `--supplemental-dir` должны находиться два исходных подписанных PDF с названиями, указанными в `SUPPLEMENTAL_DOCUMENT_FILES`. При необходимости два технических оригинала можно передать локально через `--technical-dir`. Без этого параметра они загружаются из публичного S3-префикса. Для проверки только локального комплекта используется `--skip-remote`; по умолчанию дополнительно проверяются все 96 URL на `innoprog.ru`, размер, PDF Content-Type, `X-Robots-Tag: noindex` и Range-ответ `206`.

ZIP, DOCX, RTF, матрица, техническое задание, подписи и иные служебные файлы в staging и S3 не попадают. Папки `00` и `99` не обрабатываются.
