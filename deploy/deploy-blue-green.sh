#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/innoprog/apps/innoprog-website}"
ENV_FILE="${ENV_FILE:-${APP_DIR}/.env}"
IMAGE_REPOSITORY="${IMAGE_REPOSITORY:-innoprog-website}"
STABLE_CONTAINER="${STABLE_CONTAINER:-innoprog-website}"
CANDIDATE_CONTAINER="${CANDIDATE_CONTAINER:-innoprog-website-candidate}"
STABLE_PORT="${STABLE_PORT:-8082}"
CANDIDATE_PORT="${CANDIDATE_PORT:-18082}"
UPSTREAM_FILE="${UPSTREAM_FILE:-/etc/nginx/innoprog-upstreams/website-http.conf}"
STATIC_ROOT="${STATIC_ROOT:-/opt/innoprog/data/website-static}"
HEALTH_PATH="${HEALTH_PATH:-/healthz}"
HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-60}"
RELEASE="${1:-}"

if [[ -z "$RELEASE" ]]; then
  RELEASE="$(git -C "$APP_DIR" rev-parse HEAD)"
fi
if [[ ! "$RELEASE" =~ ^[0-9a-f]{12,64}$ ]]; then
  echo "release must be a 12-64 character hexadecimal Git revision" >&2
  exit 2
fi
if [[ ! -f "$ENV_FILE" ]]; then
  echo "environment file not found: $ENV_FILE" >&2
  exit 2
fi

IMAGE="${IMAGE_REPOSITORY}:${RELEASE}"
previous_image="$(docker inspect -f '{{.Config.Image}}' "$STABLE_CONTAINER" 2>/dev/null || true)"
switched=0
stable_replaced=0
asset_container=""
asset_temp=""

wait_healthy() {
  local container="$1"
  local port="$2"
  local attempt status
  for ((attempt = 1; attempt <= HEALTH_ATTEMPTS; attempt++)); do
    status="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container" 2>/dev/null || true)"
    # docker compose supplies a container healthcheck for the stable release,
    # while the isolated candidate is started with plain `docker run`. In both
    # cases the process must be running and its application health endpoint
    # must answer successfully before traffic can be switched.
    if [[ "$status" == "healthy" || "$status" == "running" ]] && \
      curl -fsS --max-time 3 "http://127.0.0.1:${port}${HEALTH_PATH}" >/dev/null; then
      return 0
    fi
    sleep 1
  done
  echo "$container did not become healthy" >&2
  docker logs --tail 100 "$container" >&2 || true
  return 1
}

wait_public_header() {
  local url="$1"
  local pattern="$2"
  local attempt headers
  for ((attempt = 1; attempt <= 15; attempt++)); do
    if headers="$(curl -fsSI --max-time 10 "$url" 2>/dev/null)" && grep -qi "$pattern" <<<"$headers"; then
      printf '%s' "$headers"
      return 0
    fi
    sleep 1
  done
  echo "public smoke failed for $url" >&2
  return 1
}

switch_upstream() {
  local port="$1"
  local temp
  temp="$(mktemp "${UPSTREAM_FILE}.XXXXXX")"
  printf 'proxy_pass http://127.0.0.1:%s;\n' "$port" >"$temp"
  chmod 0644 "$temp"
  mv -f "$temp" "$UPSTREAM_FILE"
  nginx -t
  systemctl reload nginx
}

cleanup() {
  local exit_code=$?
  local rollback_ok=0 previous_tag previous_revision
  trap - EXIT
  set +e
  if ((exit_code != 0)) && ((stable_replaced == 1)) && [[ "$previous_image" == "${IMAGE_REPOSITORY}:"* ]]; then
    # Keep serving the healthy candidate while the previous immutable image is
    # restored on the stable port, then atomically return traffic to stable.
    switch_upstream "$CANDIDATE_PORT"
    previous_tag="${previous_image#${IMAGE_REPOSITORY}:}"
    previous_revision="$(docker image inspect -f '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$previous_image" 2>/dev/null || true)"
    IMAGE_TAG="$previous_tag" IMAGE_REVISION="${previous_revision:-$previous_tag}" \
      CONTAINER_NAME="$STABLE_CONTAINER" HOST_PORT="$STABLE_PORT" \
      docker compose -f docker-compose.prod.yml up -d --no-build --force-recreate website
    if wait_healthy "$STABLE_CONTAINER" "$STABLE_PORT" && switch_upstream "$STABLE_PORT"; then
      rollback_ok=1
    fi
  elif ((exit_code != 0)) && ((switched == 1)); then
    if switch_upstream "$STABLE_PORT"; then
      rollback_ok=1
    fi
  fi
  if [[ -n "$asset_container" ]]; then
    docker rm -f "$asset_container" >/dev/null 2>&1 || true
  fi
  if [[ -n "$asset_temp" ]]; then
    rm -rf "$asset_temp"
  fi
  if ((exit_code == 0 || stable_replaced == 0 || rollback_ok == 1)); then
    docker rm -f "$CANDIDATE_CONTAINER" >/dev/null 2>&1 || true
  else
    echo "rollback failed; healthy candidate retained on port ${CANDIDATE_PORT}" >&2
  fi
  exit "$exit_code"
}
trap cleanup EXIT

cd "$APP_DIR"
docker build \
  --build-arg "NEXT_DEPLOYMENT_ID=${RELEASE}" \
  --label "org.opencontainers.image.revision=${RELEASE}" \
  -t "$IMAGE" .

# The edge rejects Next-Action because this website currently has no Server
# Actions. Fail deployment if that assumption ever becomes false so a future
# feature cannot be silently broken by the protective nginx rule.
docker run --rm --entrypoint node "$IMAGE" -e '
  const manifest = require("/app/.next/server/server-reference-manifest.json");
  const count = Object.keys(manifest.node || {}).length + Object.keys(manifest.edge || {}).length;
  if (count !== 0) {
    console.error(`release contains ${count} Server Actions; update release routing before deployment`);
    process.exit(1);
  }
'

docker rm -f "$CANDIDATE_CONTAINER" >/dev/null 2>&1 || true
docker run -d \
  --name "$CANDIDATE_CONTAINER" \
  --env-file "$ENV_FILE" \
  --restart no \
  --memory 768m \
  --cpus 1.0 \
  -p "127.0.0.1:${CANDIDATE_PORT}:3000" \
  "$IMAGE" >/dev/null
wait_healthy "$CANDIDATE_CONTAINER" "$CANDIDATE_PORT"

# Hashed chunks from earlier releases remain available to already-open pages.
# copy is additive: only an explicit maintenance job may remove old assets.
mkdir -p "$STATIC_ROOT"
asset_container="${CANDIDATE_CONTAINER}-assets"
docker rm -f "$asset_container" >/dev/null 2>&1 || true
docker create --name "$asset_container" "$IMAGE" >/dev/null
asset_temp="$(mktemp -d)"
docker cp "${asset_container}:/app/.next/static/." "$asset_temp/"
cp -a "$asset_temp/." "$STATIC_ROOT/"
rm -rf "$asset_temp"
docker rm "$asset_container" >/dev/null
asset_container=""
asset_temp=""

switch_upstream "$CANDIDATE_PORT"
switched=1
curl -fsS --max-time 10 -H 'Host: innoprog.ru' "http://127.0.0.1:${CANDIDATE_PORT}${HEALTH_PATH}" >/dev/null

IMAGE_TAG="$RELEASE" IMAGE_REVISION="$RELEASE" CONTAINER_NAME="$STABLE_CONTAINER" HOST_PORT="$STABLE_PORT" \
  docker compose -f docker-compose.prod.yml up -d --no-build --force-recreate website
stable_replaced=1
wait_healthy "$STABLE_CONTAINER" "$STABLE_PORT"

switch_upstream "$STABLE_PORT"
switched=0

wait_public_header 'https://innoprog.ru/healthz' '^HTTP/.* 200' >/dev/null
html_headers="$(wait_public_header 'https://innoprog.ru/' '^cache-control:.*no-store')"
asset_path="$(curl -fsS --retry 5 --retry-all-errors --retry-delay 1 --max-time 15 https://innoprog.ru/ | grep -o '/_next/static/[^\" ]*\.js[^\" ]*' | head -1)"
[[ -n "$asset_path" ]]
wait_public_header "https://innoprog.ru${asset_path}" '^cache-control:.*immutable' >/dev/null

docker rm -f "$CANDIDATE_CONTAINER" >/dev/null 2>&1 || true
trap - EXIT

printf 'Website release %s is healthy on stable port %s\n' "$RELEASE" "$STABLE_PORT"
if [[ -n "$previous_image" && "$previous_image" != "$IMAGE" ]]; then
  printf 'Rollback image retained: %s\n' "$previous_image"
fi
