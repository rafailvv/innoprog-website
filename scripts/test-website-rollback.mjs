import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const deploy = readFileSync("deploy/deploy-blue-green.sh", "utf8");
const fn = (name) => {
  const source = deploy.match(new RegExp(`^${name}\\(\\) \\{[\\s\\S]*?^\\}`, "m"))?.[0];
  assert.ok(source, `missing ${name}`);
  return source;
};

// Execute the real cleanup branch with external effects stubbed. Both legacy
// and hardened releases must use the snapshot, never today's default flags.
for (const runtime of ["legacy-root-writable", "hardened-nonroot-readonly"]) {
  for (const failure of ["none", "compose", "runtime", "image", "health", "smoke"]) {
    const result = spawnSync("bash", ["-c", `
      exec 3>&2
      STABLE_CONTAINER=stable CANDIDATE_CONTAINER=candidate
      STABLE_PORT=8082 CANDIDATE_PORT=18082
      IMAGE_REPOSITORY=website previous_rollback_image=website:rollback
      previous_release=old previous_image_id=sha256:old
      previous_runtime="$TEST_RUNTIME" rollback_override=/snapshot/runtime.yml
      stable_replaced=1 switched=1 asset_container= asset_temp= build_context=
      docker() {
        case "$1" in
          image) printf '%s' old ;;
          inspect)
            if [[ "$3" == '{{.Image}}' ]]; then
              [[ "$TEST_FAILURE" == image ]] && printf '%s' sha256:wrong || printf '%s' sha256:old
            else
              [[ "$TEST_FAILURE" == runtime ]] && printf '%s' wrong-runtime || printf '%s' "$TEST_RUNTIME"
            fi ;;
          compose)
            printf 'compose %s\\n' "$*" >&2
            [[ "$TEST_FAILURE" != compose ]] ;;
          rm) printf 'remove %s\\n' "$3" >&3 ;;
          *) return 2 ;;
        esac
      }
      wait_healthy() {
        printf 'health %s\\n' "$1" >&2
        [[ "$1" != stable || "$TEST_FAILURE" != health ]]
      }
      switch_upstream() { printf 'switch %s\\n' "$1" >&2; }
      smoke_sveden_routes() {
        printf 'smoke %s\\n' "$1" >&2
        [[ "$TEST_FAILURE" != smoke ]]
      }
      rm() { printf 'cleanup %s\\n' "$*" >&2; }
      ${fn("runtime_compose_override")}
      ${fn("assert_previous_runtime")}
      ${fn("cleanup")}
      false
      cleanup
    `], { encoding: "utf8", env: { ...process.env, TEST_RUNTIME: runtime, TEST_FAILURE: failure } });
    assert.equal(result.status, 1, `original deployment failure must remain visible: ${runtime}/${failure}`);
    assert.match(result.stderr, /compose compose -f docker-compose.prod.yml -f \/snapshot\/runtime.yml up/);
    assert.match(result.stderr, /cleanup -f \/snapshot\/runtime.yml/);
    if (failure === "none") {
      assert.match(result.stderr, /health stable\nsmoke stable\nswitch 8082\n/);
      assert.match(result.stderr, /remove candidate/);
    } else {
      assert.doesNotMatch(result.stderr, /switch 8082|remove candidate/);
      assert.match(result.stderr, /healthy candidate retained/);
    }
  }
}

// Exercise the actual forward replacement and EXIT trap: Compose may remove
// stable and then fail before returning. Candidate traffic must remain until
// restoration passes, including when no previous rollback image is available.
const replacementStart = deploy.indexOf('switch_upstream "$CANDIDATE_PORT"\nswitched=1');
const replacementEnd = deploy.indexOf('assert_runtime_hardening "$STABLE_CONTAINER"', replacementStart);
assert.ok(replacementStart >= 0 && replacementEnd > replacementStart);
const replacement = deploy.slice(replacementStart, replacementEnd);
for (const recovery of ["restored", "compose-fails", "no-previous-image"]) {
  const result = spawnSync("bash", ["-c", `
    set -Eeuo pipefail
    exec 3>&2
    STABLE_CONTAINER=stable CANDIDATE_CONTAINER=candidate
    STABLE_PORT=8082 CANDIDATE_PORT=18082 HEALTH_PATH=/healthz
    IMAGE_REPOSITORY=website previous_rollback_image=website:rollback
    previous_release=old previous_image_id=sha256:old
    previous_runtime=old-runtime rollback_override=/snapshot/runtime.yml
    stable_replaced=0 switched=0 asset_container= asset_temp= build_context=
    RELEASE=new stable_available=1
    if [[ "$TEST_RECOVERY" == no-previous-image ]]; then previous_rollback_image=; fi
    docker() {
      case "$1" in
        image) printf '%s' old ;;
        inspect)
          [[ "$3" == '{{.Image}}' ]] && printf '%s' sha256:old || printf '%s' old-runtime ;;
        compose)
          if [[ "$IMAGE_TAG" == new ]]; then
            stable_available=0
            printf 'forward-compose-removed-stable\\n' >&2
            return 42
          fi
          printf 'rollback-compose\\n' >&2
          [[ "$TEST_RECOVERY" != compose-fails ]] || return 43
          stable_available=1 ;;
        rm) printf 'remove %s\\n' "$3" >&3 ;;
        *) return 2 ;;
      esac
    }
    wait_healthy() {
      printf 'health %s\\n' "$1" >&2
      [[ "$1" != stable || "$stable_available" == 1 ]]
    }
    switch_upstream() {
      printf 'switch %s\\n' "$1" >&2
      [[ "$1" != 8082 || "$stable_available" == 1 ]]
    }
    smoke_sveden_routes() { printf 'smoke %s\\n' "$1" >&2; }
    curl() { return 0; }
    rm() { return 0; }
    ${fn("runtime_compose_override")}
    ${fn("assert_previous_runtime")}
    ${fn("cleanup")}
    trap cleanup EXIT
    ${replacement}
  `], { encoding: "utf8", env: { ...process.env, TEST_RECOVERY: recovery } });
  assert.equal(result.status, 42, `partial replacement retains original error: ${recovery}`);
  assert.match(result.stderr, /switch 18082\nforward-compose-removed-stable\n/);
  if (recovery === "restored") {
    assert.match(result.stderr, /rollback-compose\nhealth stable\nsmoke stable\nswitch 8082\nremove candidate/);
  } else {
    assert.doesNotMatch(result.stderr, /switch 8082|remove candidate/);
    assert.match(result.stderr, /healthy candidate retained/);
  }
}

// A smoke called inside an && rollback chain cannot rely on Bash errexit.
for (const failure of ["none", "http", "logs", "server-error"]) {
  const result = spawnSync("bash", ["-c", `
    docker() {
      if [[ "$1" == exec ]]; then
        [[ "$TEST_FAILURE" != http ]]
      elif [[ "$1" == logs ]]; then
        [[ "$TEST_FAILURE" == server-error ]] && printf '%s' 'Error: EROFS'
        [[ "$TEST_FAILURE" != logs ]]
      else return 2; fi
    }
    ${fn("smoke_sveden_routes")}
    if smoke_sveden_routes stable; then exit 0; else exit 1; fi
  `], { encoding: "utf8", env: { ...process.env, TEST_FAILURE: failure } });
  assert.equal(result.status, failure === "none" ? 0 : 1, `rollback smoke: ${failure}`);
}

console.log("Website rollback runtime, traffic ordering and failure retention verified");

// Optional local integration: the prebuilt candidate image is supplied explicitly.
// No production env files, published ports or existing containers are used.
const imageArg = process.argv.find((arg) => arg.startsWith("--docker-image="));
if (imageArg) {
  const image = imageArg.slice("--docker-image=".length);
  const dir = mkdtempSync(join(tmpdir(), "website-rollback-test-"));
  const run = (command, args, options = {}) => {
    const result = spawnSync(command, args, { encoding: "utf8", ...options });
    assert.equal(result.status, 0, `${command} ${args.join(" ")}: ${result.stderr}`);
    return result.stdout.trim();
  };
  try {
    for (const legacy of [true, false]) {
      const project = `website-rollback-test-${process.pid}-${legacy ? "legacy" : "hardened"}`;
      const previous = `${project}-previous`;
      const restored = `${project}-restored`;
      const snapshot = join(dir, `${project}.yml`);
      const local = join(dir, `${project}-local.yml`);
      const composeArgs = ["compose", "--env-file", "/dev/null", "-p", project,
        "-f", "docker-compose.prod.yml", "-f", snapshot, "-f", local];
      // Use identical image contents while exercising the former on-disk cache
      // setting and root/writable runtime for the first hardening rollout.
      const boot = `const fs=require('fs'),Module=require('module');
        let code=fs.readFileSync('/app/server.js','utf8');
        code=code.replace('"isrFlushToDisk":false','"isrFlushToDisk":${legacy}');
        const m=new Module('/app/server.js',module);m.filename='/app/server.js';
        m.paths=Module._nodeModulePaths('/app');m._compile(code,'/app/server.js');`;
      const restrictions = legacy ? ["--user", "0:0"] : [
        "--user", "1000:1000", "--read-only", "--cap-drop", "ALL",
        "--security-opt", "no-new-privileges=true", "--pids-limit", "256",
        "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m,uid=1000,gid=1000,mode=1777",
        "--tmpfs", "/app/.next/cache:rw,noexec,nosuid,size=256m,uid=1000,gid=1000,mode=0755",
      ];
      try {
        run("docker", ["run", "-d", "--name", previous, ...restrictions, "--entrypoint", "node", image, "-e", boot]);
        const capture = (container) => run("bash", ["-c", `${fn("runtime_compose_override")}\nruntime_compose_override "$1"`, "bash", container]);
        const expected = capture(previous);
        writeFileSync(snapshot, expected);
        writeFileSync(local, `services:\n  website:\n    image: ${JSON.stringify(image)}\n    container_name: ${restored}\n    ports: !override []\n    entrypoint: ${JSON.stringify(["node", "-e", boot])}\n    command: []\n    environment:\n      SMARTCAPTCHA_SERVER_KEY: ""\n`);
        run("docker", [...composeArgs, "up", "-d", "--no-build"]);
        assert.equal(capture(restored), expected, `restored ${project} runtime`);
        run("docker", ["exec", restored, "node", "-e", "(async()=>{for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:3000/healthz')).ok)return;}catch{}await new Promise(r=>setTimeout(r,100));}process.exit(1)})()"]);
        run("docker", ["exec", "-i", restored, "node", "--input-type=module", "-", "--base-url=http://127.0.0.1:3000"], { input: readFileSync("scripts/test-sveden-routing.mjs", "utf8") });
        const logs = spawnSync("docker", ["logs", restored], { encoding: "utf8" });
        assert.equal(logs.status, 0);
        assert.doesNotMatch(logs.stdout + logs.stderr, /Error:|EROFS|EACCES|unhandledRejection|uncaughtException/i);
        console.log(`${project}: runtime preserved, routes and logs clean`);
      } finally {
        spawnSync("docker", [...composeArgs, "down", "--remove-orphans"], { encoding: "utf8" });
        spawnSync("docker", ["rm", "-f", previous, restored], { encoding: "utf8" });
      }
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
