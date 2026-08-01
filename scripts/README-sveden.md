# Публичные документы раздела `/sveden`

Исходным комплектом служит ZIP, переданный образовательной организацией на дату 01.08.2026. Скрипт принимает архив явно, извлекает только разрешённые PDF из папок `01`–`14` и `98`, добавляет два опубликованных технических PDF и формирует ровно 94 файла вместе с manifest.

```bash
python3 -m venv .venv-sveden
.venv-sveden/bin/pip install -r scripts/requirements-sveden.txt
.venv-sveden/bin/python scripts/prepare-sveden-documents.py /path/to/source.zip
.venv-sveden/bin/python scripts/verify-sveden-documents.py
```

При необходимости два технических оригинала можно передать локально через `--technical-dir`. Без этого параметра они загружаются из публичного S3-префикса. Для проверки только локального комплекта используется `--skip-remote`; по умолчанию дополнительно проверяются все 94 URL на `innoprog.ru`, размер, PDF Content-Type, `X-Robots-Tag: noindex` и Range-ответ `206`.

ZIP, DOCX, RTF, матрица, техническое задание, подписи и иные служебные файлы в staging и S3 не попадают. Папки `00` и `99` не обрабатываются.
