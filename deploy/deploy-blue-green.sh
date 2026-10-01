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
RELEASE_ROOT="${RELEASE_ROOT:-/opt/innoprog/data/website-releases}"
STATIC_TTL_DAYS="${STATIC_TTL_DAYS:-7}"
HEALTH_PATH="${HEALTH_PATH:-/healthz}"
HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-60}"
RELEASE="${1:-}"
MAINTENANCE_LOCK="/run/lock/innoprog/production-maintenance.lock"
POST_DEPLOY_MAINTENANCE_REQUEST="/run/lock/innoprog/post-deploy-maintenance.requested"
WEBSITE_RUNTIME_DOCKER_ARGS=(
  --user 1000:1000
  --read-only
  --cap-drop ALL
  --security-opt no-new-privileges=true
  --pids-limit 256
  --tmpfs /tmp:rw,noexec,nosuid,size=64m,uid=1000,gid=1000,mode=1777
  --tmpfs /app/.next/cache:rw,noexec,nosuid,size=256m,uid=1000,gid=1000,mode=0755
)

exec 8>"$MAINTENANCE_LOCK"
if ! flock -n 8; then
  echo "Production maintenance or another deployment is running" >&2
  exit 75
fi
DEPLOYMENT_ID="${INNOPROG_DEPLOYMENT_ID:-website-$(date -u +%Y%m%dT%H%M%SZ)-$$}"
export INNOPROG_DEPLOYMENT_ID="$DEPLOYMENT_ID"
echo "deployment_id=$DEPLOYMENT_ID service=website stage=started"

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

head_release="$(git -C "$APP_DIR" rev-parse HEAD)"
resolved_release="$(git -C "$APP_DIR" rev-parse "${RELEASE}^{commit}" 2>/dev/null || true)"
if [[ -z "$resolved_release" || "$resolved_release" != "$head_release" ]]; then
  echo "release must resolve to the checked-out Git commit ${head_release}" >&2
  exit 2
fi
if [[ -n "$(git -C "$APP_DIR" status --porcelain --untracked-files=normal)" ]]; then
  echo "working tree changes must be committed before deployment" >&2
  exit 2
fi
RELEASE="$head_release"

IMAGE="${IMAGE_REPOSITORY}:${RELEASE}"
previous_image_id="$(docker inspect -f '{{.Image}}' "$STABLE_CONTAINER" 2>/dev/null || true)"
previous_release="$(docker inspect -f '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$STABLE_CONTAINER" 2>/dev/null || true)"
previous_rollback_image=""
previous_runtime=""
rollback_override=""
switched=0
stable_replaced=0
asset_container=""
asset_temp=""
build_context=""

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

assert_runtime_hardening() {
  local container="$1" user readonly cap_drop security_opts pids_limit tmpfs
  user="$(docker inspect -f '{{.Config.User}}' "$container")"
  readonly="$(docker inspect -f '{{.HostConfig.ReadonlyRootfs}}' "$container")"
  cap_drop="$(docker inspect -f '{{json .HostConfig.CapDrop}}' "$container")"
  security_opts="$(docker inspect -f '{{json .HostConfig.SecurityOpt}}' "$container")"
  pids_limit="$(docker inspect -f '{{.HostConfig.PidsLimit}}' "$container")"
  tmpfs="$(docker inspect -f '{{json .HostConfig.Tmpfs}}' "$container")"
  if [[ "$user" != "1000:1000" || "$readonly" != "true" || "$cap_drop" != *ALL* || \
    ! "$security_opts" =~ \"no-new-privileges[:=]true\" || "$pids_limit" != "256" || \
    "$tmpfs" != *"/tmp"* || "$tmpfs" != *"/app/.next/cache"* ]]; then
    echo "$container is missing required Website runtime hardening" >&2
    echo "user=$user readonly=$readonly cap_drop=$cap_drop security_opts=$security_opts pids_limit=$pids_limit tmpfs=$tmpfs" >&2
    return 1
  fi
}

runtime_compose_override() {
  # Capture only the runtime settings changed by hardening, never container Env.
  # !override replaces lists, including empty legacy lists, instead of merging
  # the new release's restrictions into the previous immutable image.
  docker inspect -f 'services:
  website:
    user: {{json .Config.User}}
    read_only: {{.HostConfig.ReadonlyRootfs}}
    cap_drop: !override {{if .HostConfig.CapDrop}}{{json .HostConfig.CapDrop}}{{else}}[]{{end}}
    cap_add: !override {{if .HostConfig.CapAdd}}{{json .HostConfig.CapAdd}}{{else}}[]{{end}}
    security_opt: !override {{if .HostConfig.SecurityOpt}}{{json .HostConfig.SecurityOpt}}{{else}}[]{{end}}
    pids_limit: {{if .HostConfig.PidsLimit}}{{.HostConfig.PidsLimit}}{{else}}-1{{end}}
    tmpfs: !override {{if .HostConfig.Tmpfs}}{{range $path, $options := .HostConfig.Tmpfs}}
      - {{json (printf "%s:%s" $path $options)}}{{end}}{{else}}[]{{end}}' "$1"
}

assert_previous_runtime() {
  local runtime image_id
  runtime="$(runtime_compose_override "$STABLE_CONTAINER")" || return 1
  image_id="$(docker inspect -f '{{.Image}}' "$STABLE_CONTAINER")" || return 1
  if [[ "$runtime" != "$previous_runtime" || "$image_id" != "$previous_image_id" ]]; then
    echo "Rollback container does not match the previous image and runtime settings" >&2
    return 1
  fi
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

smoke_sveden_routes() {
  local container="$1" since logs
  since="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  docker exec -i "$container" node --input-type=module - \
    --base-url=http://127.0.0.1:3000 < scripts/test-sveden-routing.mjs || return 1
  logs="$(docker logs --since "$since" "$container" 2>&1)" || return 1
  if grep -Eq 'NoFallbackError|Error:|unhandledRejection|uncaughtException' <<<"$logs"; then
    echo "Sveden routing smoke emitted a server error in $container" >&2
    return 1
  fi
}

capture_release_assets() {
  local image="$1" release="$2" copy_assets="$3" manifest_temp
  [[ "$release" =~ ^[0-9a-f]{12,64}$ ]] || return 0
  install -d -o root -g root -m 0755 "$STATIC_ROOT" "$RELEASE_ROOT"
  asset_container="${CANDIDATE_CONTAINER}-assets"
  docker rm -f "$asset_container" >/dev/null 2>&1 || true
  docker create --name "$asset_container" "$image" >/dev/null
  asset_temp="$(mktemp -d)"
  docker cp "${asset_container}:/app/.next/static/." "$asset_temp/"
  manifest_temp="$(mktemp "${RELEASE_ROOT}/${release}.assets.XXXXXX")"
  find "$asset_temp" -type f -printf '%P\n' | LC_ALL=C sort >"$manifest_temp"
  [[ -s "$manifest_temp" ]]
  chmod 0644 "$manifest_temp"
  mv -f "$manifest_temp" "${RELEASE_ROOT}/${release}.assets"
  if [[ "$copy_assets" == "1" ]]; then
    cp -a "$asset_temp/." "$STATIC_ROOT/"
    chmod 0755 "$STATIC_ROOT"
  fi
  rm -rf "$asset_temp"
  docker rm "$asset_container" >/dev/null
  asset_container=""
  asset_temp=""
}

capture_release_html() {
  local release="$1" port="$2" html_temp
  [[ "$release" =~ ^[0-9a-f]{12,64}$ ]] || return 0
  html_temp="$(mktemp "${RELEASE_ROOT}/${release}.html.XXXXXX")"
  curl -fsS --max-time 15 -H 'Host: innoprog.ru' "http://127.0.0.1:${port}/" >"$html_temp"
  grep -q '/_next/static/' "$html_temp"
  chmod 0644 "$html_temp"
  mv -f "$html_temp" "${RELEASE_ROOT}/${release}.html"
}

smoke_release_html() {
  local release="$1" html asset count=0
  [[ -n "$release" ]] || return 0
  html="${RELEASE_ROOT}/${release}.html"
  [[ -s "$html" ]] || {
    echo "release HTML is missing: $html" >&2
    return 1
  }
  while IFS= read -r asset; do
    [[ -n "$asset" ]] || continue
    wait_public_header "https://innoprog.ru${asset}" '^cache-control:.*immutable' >/dev/null
    count=$((count + 1))
  done < <(
    grep -oE '/_next/static/[^"'"'"'<> ]+' "$html" |
      sed -e 's/\\$//' -e 's/&amp;/\&/g' |
      LC_ALL=C sort -u
  )
  (( count > 0 )) || {
    echo "no static assets found in release HTML: $html" >&2
    return 1
  }
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
  local rollback_ok=0 previous_revision
  trap - EXIT
  set +e
  if ((exit_code != 0)) && ((stable_replaced == 1)) && [[ -n "$previous_rollback_image" ]]; then
    # Keep serving the healthy candidate while the previous immutable image is
    # restored on the stable port, then atomically return traffic to stable.
    if wait_healthy "$CANDIDATE_CONTAINER" "$CANDIDATE_PORT" && switch_upstream "$CANDIDATE_PORT"; then
      previous_revision="$(docker image inspect -f '{{index .Config.Labels "org.opencontainers.image.revision"}}' "$previous_rollback_image" 2>/dev/null || true)"
      if IMAGE_TAG="${previous_rollback_image#${IMAGE_REPOSITORY}:}" \
        IMAGE_REVISION="${previous_revision:-$previous_release}" \
        CONTAINER_NAME="$STABLE_CONTAINER" HOST_PORT="$STABLE_PORT" \
        docker compose -f docker-compose.prod.yml -f "$rollback_override" up -d --no-build --force-recreate website && \
        assert_previous_runtime && wait_healthy "$STABLE_CONTAINER" "$STABLE_PORT" && \
        smoke_sveden_routes "$STABLE_CONTAINER" && switch_upstream "$STABLE_PORT"; then
        rollback_ok=1
      fi
    else
      echo "rollback did not replace stable because candidate traffic switch failed" >&2
    fi
  elif ((exit_code != 0)) && ((switched == 1)) && ((stable_replaced == 0)); then
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
  if [[ -n "$build_context" ]]; then
    rm -rf "$build_context"
  fi
  if [[ -n "$rollback_override" ]]; then
    rm -f "$rollback_override"
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

# Docker must never read a mutable checkout after release validation. Export
# the exact commit into an isolated context so concurrent edits or pulls cannot
# change bytes published under this immutable release ID.
build_context="$(mktemp -d)"
git archive --format=tar "$RELEASE" | tar -xf - -C "$build_context"

# Pin rollback to the exact image ID before the new build can move a mutable
# release tag. The unique local tag is intentionally retained for rollback.
if [[ "$previous_release" =~ ^[0-9a-f]{12,64}$ && "$previous_image_id" =~ ^sha256:[0-9a-f]{64}$ ]]; then
  previous_digest="${previous_image_id#sha256:}"
  previous_rollback_image="${IMAGE_REPOSITORY}:rollback-${previous_release:0:12}-${previous_digest:0:12}"
  docker image tag "$previous_image_id" "$previous_rollback_image"
  previous_runtime="$(runtime_compose_override "$STABLE_CONTAINER")"
  rollback_override="$(mktemp)"
  printf '%s\n' "$previous_runtime" >"$rollback_override"
  # Validate !override support and the captured configuration before replacing
  # either running container or switching traffic.
  docker compose -f docker-compose.prod.yml -f "$rollback_override" config --quiet
fi

# Capture the currently served release before building the replacement. Its
# complete asset manifest and HTML are used by the post-deploy compatibility
# smoke and remain protected from TTL cleanup as the rollback release.
if [[ "$previous_release" =~ ^[0-9a-f]{12,64}$ && -n "${previous_rollback_image:-$previous_image_id}" ]]; then
  capture_release_assets "${previous_rollback_image:-$previous_image_id}" "$previous_release" 1
  capture_release_html "$previous_release" "$STABLE_PORT"
else
  previous_release=""
fi

docker build \
  --build-arg "NEXT_DEPLOYMENT_ID=${RELEASE}" \
  --label "org.opencontainers.image.revision=${RELEASE}" \
  -t "$IMAGE" "$build_context"
rm -rf "$build_context"
build_context=""

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
  "${WEBSITE_RUNTIME_DOCKER_ARGS[@]}" \
  --env-file "$ENV_FILE" \
  --restart no \
  --memory 768m \
  --cpus 1.0 \
  -p "127.0.0.1:${CANDIDATE_PORT}:3000" \
  "$IMAGE" >/dev/null
assert_runtime_hardening "$CANDIDATE_CONTAINER"
wait_healthy "$CANDIDATE_CONTAINER" "$CANDIDATE_PORT"
smoke_sveden_routes "$CANDIDATE_CONTAINER"

# Hashed chunks are copied additively. A per-release manifest allows the
# maintenance step to retain current and rollback assets while pruning only
# unreferenced files after the compatibility TTL.
capture_release_assets "$IMAGE" "$RELEASE" 1
capture_release_html "$RELEASE" "$CANDIDATE_PORT"

switch_upstream "$CANDIDATE_PORT"
switched=1
curl -fsS --max-time 10 -H 'Host: innoprog.ru' "http://127.0.0.1:${CANDIDATE_PORT}${HEALTH_PATH}" >/dev/null

# Compose can stop or remove stable before returning an error. From this point
# cleanup must restore and verify it, or keep traffic on the healthy candidate.
stable_replaced=1
IMAGE_TAG="$RELEASE" IMAGE_REVISION="$RELEASE" CONTAINER_NAME="$STABLE_CONTAINER" HOST_PORT="$STABLE_PORT" \
  docker compose -f docker-compose.prod.yml up -d --no-build --force-recreate website
assert_runtime_hardening "$STABLE_CONTAINER"
wait_healthy "$STABLE_CONTAINER" "$STABLE_PORT"
smoke_sveden_routes "$STABLE_CONTAINER"

switch_upstream "$STABLE_PORT"
switched=0

wait_public_header 'https://innoprog.ru/healthz' '^HTTP/.* 200' >/dev/null
html_headers="$(wait_public_header 'https://innoprog.ru/' '^cache-control:.*no-store')"
asset_path="$(curl -fsS --retry 5 --retry-all-errors --retry-delay 1 --max-time 15 https://innoprog.ru/ | grep -o '/_next/static/[^\" ]*\.js[^\" ]*' | head -1)"
[[ -n "$asset_path" ]]
wait_public_header "https://innoprog.ru${asset_path}" '^cache-control:.*immutable' >/dev/null
smoke_release_html "$RELEASE"
smoke_release_html "$previous_release"

CURRENT_RELEASE="$RELEASE" PREVIOUS_RELEASE="$previous_release" \
  STATIC_ROOT="$STATIC_ROOT" RELEASE_ROOT="$RELEASE_ROOT" \
  STATIC_TTL_DAYS="$STATIC_TTL_DAYS" \
  bash deploy/prune-static-assets.sh

docker rm -f "$CANDIDATE_CONTAINER" >/dev/null 2>&1 || true
if [[ -n "$rollback_override" ]]; then
  rm -f "$rollback_override"
fi
trap - EXIT

printf 'Website release %s is healthy on stable port %s\n' "$RELEASE" "$STABLE_PORT"
if [[ -n "$previous_rollback_image" ]]; then
  printf 'Rollback image retained: %s\n' "$previous_rollback_image"
fi
printf '%s\n' "$DEPLOYMENT_ID" >"$POST_DEPLOY_MAINTENANCE_REQUEST"
echo "deployment_id=$DEPLOYMENT_ID service=website stage=completed cleanup=requested"
