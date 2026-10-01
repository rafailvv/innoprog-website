import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const read = (path) => readFileSync(resolve(path), "utf8");

const nextConfig = read("next.config.mjs");
assert.match(nextConfig, /NEXT_DEPLOYMENT_ID/);
assert.match(nextConfig, /generateBuildId:\s*async \(\) => deploymentId/);
assert.match(nextConfig, /useSkewCookie:\s*true/);
assert.match(nextConfig, /isrFlushToDisk:\s*false/);
assert.match(nextConfig, /no-store, max-age=0/);

const dockerfile = read("Dockerfile");
assert.match(dockerfile, /ARG NEXT_DEPLOYMENT_ID=local/);
assert.match(dockerfile, /ENV NEXT_DEPLOYMENT_ID=\$\{NEXT_DEPLOYMENT_ID\}/);
assert.match(dockerfile, /COPY --from=build --chown=0:0 \/app\/\.next\/standalone \.\//);
assert.match(dockerfile, /USER node/);

const compose = read("docker-compose.prod.yml");
assert.match(compose, /NEXT_DEPLOYMENT_ID: \$\{IMAGE_REVISION:-local\}/);
assert.match(compose, /HOST_PORT:-8082/);
assert.match(compose, /user: "1000:1000"/);
assert.match(compose, /read_only: true/);
assert.match(compose, /cap_drop:[\s\S]*- ALL/);
assert.match(compose, /no-new-privileges=true/);
assert.match(compose, /pids_limit: 256/);
assert.match(compose, /\/tmp:rw,noexec,nosuid,size=64m,uid=1000,gid=1000,mode=1777/);
assert.match(compose, /\/app\/\.next\/cache:rw,noexec,nosuid,size=256m,uid=1000,gid=1000,mode=0755/);

const nginx = read("deploy/nginx/website-release-routing.conf");
assert.match(nginx, /location \^~ \/_next\/static\//);
assert.doesNotMatch(nginx, /try_files \$uri/);
assert.match(nginx, /max-age=31536000, immutable/);
assert.match(nginx, /resolver 127\.0\.0\.53 valid=300s ipv6=off/);
assert.match(nginx, /proxy_next_upstream_tries 2/);
assert.match(nginx, /\$http_next_action != ""/);
assert.match(nginx, /website-http\.conf/);

const deploy = read("deploy/deploy-blue-green.sh");
assert.match(deploy, /production-maintenance\.lock/);
assert.match(deploy, /flock -n 8/);
assert.match(deploy, /INNOPROG_DEPLOYMENT_ID/);
assert.match(deploy, /post-deploy-maintenance\.requested/);
assert.match(deploy, /printf '%s\\n' "\$DEPLOYMENT_ID" >"\$POST_DEPLOY_MAINTENANCE_REQUEST"/);
assert.match(deploy, /wait_healthy "\$CANDIDATE_CONTAINER"/);
assert.match(deploy, /assert_runtime_hardening "\$CANDIDATE_CONTAINER"/);
assert.match(deploy, /assert_runtime_hardening "\$STABLE_CONTAINER"/);
assert.match(deploy, /"\$\{WEBSITE_RUNTIME_DOCKER_ARGS\[@\]\}"/);
assert.match(deploy, /--read-only[\s\S]*--cap-drop ALL[\s\S]*--security-opt no-new-privileges=true[\s\S]*--pids-limit 256/);
const runtimeAssertion = deploy.match(/^assert_runtime_hardening\(\) \{[\s\S]*?^\}/m)?.[0];
assert.ok(runtimeAssertion, "deployment must inspect actual container hardening");
for (const [securityOpt, expectedStatus] of [
  ["no-new-privileges=true", 0],
  ["no-new-privileges:true", 0],
  ["no-new-privileges=false", 1],
  ["no-new-privileges:false", 1],
  ["no-new-privileges:true-invalid", 1],
  ["prefix-no-new-privileges:true", 1],
  ["", 1],
]) {
  const result = spawnSync("bash", ["-c", `
    docker() {
      case "$3" in
        '{{.Config.User}}') printf '%s' '1000:1000' ;;
        '{{.HostConfig.ReadonlyRootfs}}') printf '%s' 'true' ;;
        '{{json .HostConfig.CapDrop}}') printf '%s' '["ALL"]' ;;
        '{{json .HostConfig.SecurityOpt}}') printf '%s' "$TEST_SECURITY_OPTS" ;;
        '{{.HostConfig.PidsLimit}}') printf '%s' '256' ;;
        '{{json .HostConfig.Tmpfs}}') printf '%s' '{"/tmp":"rw","/app/.next/cache":"rw"}' ;;
        *) return 2 ;;
      esac
    }
    ${runtimeAssertion}
    assert_runtime_hardening test-container
  `], { env: { ...process.env, TEST_SECURITY_OPTS: JSON.stringify([securityOpt]) }, encoding: "utf8" });
  assert.equal(result.status, expectedStatus, `runtime assertion for ${securityOpt}: ${result.stderr}`);
}
assert.match(deploy, /smoke_sveden_routes "\$CANDIDATE_CONTAINER"/);
assert.match(deploy, /smoke_sveden_routes "\$STABLE_CONTAINER"/);
assert.match(deploy, /scripts\/test-sveden-routing\.mjs/);
assert.match(deploy, /docker logs --since/);
assert.match(deploy, /NoFallbackError/);
assert.match(deploy, /"\$status" == "healthy" \|\| "\$status" == "running"/);
assert.match(deploy, /switch_upstream "\$CANDIDATE_PORT"/);
assert.match(deploy, /switch_upstream "\$STABLE_PORT"/);
assert.match(deploy, /wait_public_header/);
assert.match(deploy, /stable_replaced=1/);
assert.match(deploy, /resolved_release.*head_release/s);
assert.match(deploy, /status --porcelain --untracked-files=normal/);
assert.match(deploy, /working tree changes must be committed/);
assert.match(deploy, /git archive --format=tar "\$RELEASE" \| tar -xf - -C "\$build_context"/);
assert.match(deploy, /-t "\$IMAGE" "\$build_context"/);
assert.doesNotMatch(deploy, /-t "\$IMAGE" \./);
assert.match(deploy, /docker image tag "\$previous_image_id" "\$previous_rollback_image"/);
assert.match(deploy, /wait_healthy "\$CANDIDATE_CONTAINER" "\$CANDIDATE_PORT" && switch_upstream "\$CANDIDATE_PORT"/);
assert.match(deploy, /capture_release_assets "\$\{previous_rollback_image:-\$previous_image_id\}" "\$previous_release" 1/);
assert.match(deploy, /docker cp .*\.next\/static/);
assert.match(deploy, /install -d -o root -g root -m 0755 "\$STATIC_ROOT"/);
assert.match(deploy, /cp -a "\$asset_temp\/\." "\$STATIC_ROOT\/"[\s\S]*chmod 0755 "\$STATIC_ROOT"/);
assert.match(deploy, /server-reference-manifest\.json/);
assert.match(deploy, /cache-control:\.\*no-store/i);
assert.match(deploy, /cache-control:\.\*immutable/i);
assert.match(deploy, /capture_release_html "\$previous_release"/);
assert.match(deploy, /smoke_release_html "\$previous_release"/);
assert.match(deploy, /s\/\\\\\$\//);
assert.match(deploy, /deploy\/prune-static-assets\.sh/);
await import("./test-website-rollback.mjs");

const prune = read("deploy/prune-static-assets.sh");
assert.match(prune, /CURRENT_RELEASE/);
assert.match(prune, /PREVIOUS_RELEASE/);
assert.match(prune, /STATIC_TTL_DAYS/);
assert.match(prune, /unsafe asset path/);

console.log("innoprog-website deployment contracts ok");
