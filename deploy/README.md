# Production deploy

Текущий сервер `app.innoprog.ru` уже использует системный nginx на портах `80/443`.
Поэтому production-схема не поднимает второй nginx в Docker, а запускает сайт на
`127.0.0.1:8082` и подключает его через существующий nginx.

## DNS

Перед выпуском SSL домен должен указывать на сервер:

```txt
innoprog.ru A 94.103.86.177
```

Сейчас, если A-запись указывает в другое место, `certbot` не сможет выпустить
сертификат Let's Encrypt для этого сервера.

## First deploy

```bash
ssh root@app.innoprog.ru
DOMAIN=innoprog.ru EMAIL=education@innoprog.ru bash /root/website/deploy/install-prod.sh
```

Если папки `/root/website` ещё нет, можно сначала выполнить:

```bash
git clone git@github.com:rafailvv/innoprog-website.git /root/website
DOMAIN=innoprog.ru EMAIL=education@innoprog.ru bash /root/website/deploy/install-prod.sh
```

Скрипт:

- обновляет `/root/website` из `origin/main`;
- запускает `docker compose -f docker-compose.prod.yml up -d --build`;
- создаёт nginx server block для `innoprog.ru`;
- проверяет, что DNS домена указывает на текущий сервер;
- выпускает SSL через `certbot --nginx` с почтой `education@innoprog.ru`;
- включает HTTPS redirect.

## App only

Если nginx уже настроен вручную:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Приложение будет доступно локально на сервере:

```txt
http://127.0.0.1:8082
```
