#!/usr/bin/env bash
set -Eeuo pipefail

STATIC_ROOT="${STATIC_ROOT:-/opt/innoprog/data/website-static}"
RELEASE_ROOT="${RELEASE_ROOT:-/opt/innoprog/data/website-releases}"
CURRENT_RELEASE="${CURRENT_RELEASE:?CURRENT_RELEASE is required}"
PREVIOUS_RELEASE="${PREVIOUS_RELEASE:-}"
STATIC_TTL_DAYS="${STATIC_TTL_DAYS:-7}"

if [[ ! "$CURRENT_RELEASE" =~ ^[0-9a-f]{12,64}$ ]] ||
  { [[ -n "$PREVIOUS_RELEASE" ]] && [[ ! "$PREVIOUS_RELEASE" =~ ^[0-9a-f]{12,64}$ ]]; } ||
  [[ ! "$STATIC_TTL_DAYS" =~ ^[1-9][0-9]*$ ]]; then
  echo "invalid release or TTL" >&2
  exit 2
fi

install -d -m 0755 "$STATIC_ROOT" "$RELEASE_ROOT"
lock_dir="${RELEASE_ROOT}/.asset-prune.lock"
keep_file="$(mktemp "${RELEASE_ROOT}/.asset-keep.XXXXXX")"
lock_acquired=0
cleanup() {
  rm -f "$keep_file"
  if (( lock_acquired == 1 )); then
    rmdir "$lock_dir" 2>/dev/null || true
  fi
}
trap cleanup EXIT
for _ in $(seq 1 30); do
  if mkdir "$lock_dir" 2>/dev/null; then
    lock_acquired=1
    break
  fi
  sleep 1
done
(( lock_acquired == 1 )) || {
  echo "could not acquire asset prune lock" >&2
  exit 1
}

load_manifest() {
  local release="$1" manifest path
  [[ -n "$release" ]] || return 0
  manifest="${RELEASE_ROOT}/${release}.assets"
  [[ -f "$manifest" ]] || {
    echo "release manifest is missing: $manifest" >&2
    exit 1
  }
  while IFS= read -r path; do
    [[ -n "$path" ]] || continue
    if [[ "$path" == /* || "$path" == "../"* || "$path" == *"/../"* || "$path" == *"/.." || "$path" == ".." ]]; then
      echo "unsafe asset path in $manifest" >&2
      exit 1
    fi
    printf '%s\n' "$path" >>"$keep_file"
  done <"$manifest"
}

load_manifest "$CURRENT_RELEASE"
if [[ "$PREVIOUS_RELEASE" != "$CURRENT_RELEASE" ]]; then
  load_manifest "$PREVIOUS_RELEASE"
fi

LC_ALL=C sort -u -o "$keep_file" "$keep_file"
while IFS= read -r -d '' file; do
  relative="${file#${STATIC_ROOT}/}"
  grep -Fqx -- "$relative" "$keep_file" && continue
  if [[ -n "$(find "$file" -prune -mtime "+${STATIC_TTL_DAYS}" -print -quit)" ]]; then
    rm -f -- "$file"
  fi
done < <(find "$STATIC_ROOT" -type f -print0)

find "$STATIC_ROOT" -depth -type d -empty ! -path "$STATIC_ROOT" -delete

while IFS= read -r -d '' metadata; do
  name="$(basename "$metadata")"
  release="${name%%.*}"
  [[ "$release" == "$CURRENT_RELEASE" || "$release" == "$PREVIOUS_RELEASE" ]] && continue
  if [[ -n "$(find "$metadata" -prune -mtime "+${STATIC_TTL_DAYS}" -print -quit)" ]]; then
    rm -f -- "$metadata"
  fi
done < <(find "$RELEASE_ROOT" -maxdepth 1 -type f \( -name '*.assets' -o -name '*.html' \) -print0)
