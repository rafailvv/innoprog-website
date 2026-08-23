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

## Atomic production updates

Production updates use `deploy/deploy-blue-green.sh <git-sha>` rather than a
direct `docker compose up --build`. The script builds an immutable release,
starts it on port `18082`, waits for health, switches nginx to that candidate,
recreates the stable container on `8082`, verifies it, and switches nginx back.
Any failure restores the stable upstream and removes the candidate container.

Nginx must include `deploy/nginx/website-release-routing.conf` inside the
`innoprog.ru` HTTPS server. The active `proxy_pass` lives in
`/etc/nginx/innoprog-upstreams/website-http.conf` and is replaced atomically by
the deployment script.

Hashed files from deployed releases are copied additively to
`/opt/innoprog/data/website-static` and served directly by nginx with an
immutable one-year cache. HTML is always returned with `Cache-Control:
no-store`, so a browser or intermediary cannot pair an old document with a new
backend. The current and previous release manifests are always retained. Assets
not referenced by either release are removed only after seven days, and the
post-deploy smoke validates both the new HTML and the saved previous HTML.
Next.js also receives the Git SHA as its build/deployment ID.

The `/files/` Object Storage proxy resolves only IPv4 addresses because the
edge host does not have an IPv6 route. DNS is resolved at request time, with a
short connect timeout and a retry on another IPv4 endpoint.
