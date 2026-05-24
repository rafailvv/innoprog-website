#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-innoprog.ru}"
EMAIL="${EMAIL:-education@innoprog.ru}"
REPO_URL="${REPO_URL:-git@github.com:rafailvv/innoprog-website.git}"
APP_DIR="${APP_DIR:-/root/website}"
APP_PORT="${APP_PORT:-8082}"

if [[ "$(id -u)" != "0" ]]; then
  echo "Run as root."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  apt-get update
  apt-get install -y ca-certificates curl gnupg
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" > /etc/apt/sources.list.d/docker.list
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

if ! command -v git >/dev/null 2>&1; then
  apt-get update
  apt-get install -y git
fi

if ! command -v certbot >/dev/null 2>&1; then
  apt-get update
  apt-get install -y certbot python3-certbot-nginx
fi

mkdir -p "$APP_DIR"

if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch origin main
  git -C "$APP_DIR" reset --hard origin/main
else
  rm -rf "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
docker compose -f docker-compose.prod.yml up -d --build

cat > /etc/nginx/sites-available/${DOMAIN} <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
nginx -t
systemctl reload nginx

server_ip="$(curl -fsS4 https://ifconfig.me || hostname -I | awk '{print $1}')"
domain_ip="$(getent ahostsv4 "$DOMAIN" | awk '{print $1; exit}')"

if [[ -z "$domain_ip" || "$domain_ip" != "$server_ip" ]]; then
  echo "DNS for ${DOMAIN} points to '${domain_ip:-empty}', but this server is '${server_ip}'."
  echo "Update the A record first, then rerun:"
  echo "  DOMAIN=${DOMAIN} EMAIL=${EMAIL} bash ${APP_DIR}/deploy/install-prod.sh"
  exit 2
fi

certbot --nginx \
  --non-interactive \
  --agree-tos \
  --redirect \
  --email "$EMAIL" \
  -d "$DOMAIN"

nginx -t
systemctl reload nginx

echo "Done: https://${DOMAIN}"
