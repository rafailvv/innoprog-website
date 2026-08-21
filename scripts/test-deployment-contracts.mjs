import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) => readFileSync(resolve(path), "utf8");

const nextConfig = read("next.config.mjs");
assert.match(nextConfig, /NEXT_DEPLOYMENT_ID/);
assert.match(nextConfig, /generateBuildId:\s*async \(\) => deploymentId/);
assert.match(nextConfig, /useSkewCookie:\s*true/);
assert.match(nextConfig, /no-store, max-age=0/);

const dockerfile = read("Dockerfile");
assert.match(dockerfile, /ARG NEXT_DEPLOYMENT_ID=local/);
assert.match(dockerfile, /ENV NEXT_DEPLOYMENT_ID=\$\{NEXT_DEPLOYMENT_ID\}/);

const compose = read("docker-compose.prod.yml");
assert.match(compose, /NEXT_DEPLOYMENT_ID: \$\{IMAGE_REVISION:-local\}/);
assert.match(compose, /HOST_PORT:-8082/);

const nginx = read("deploy/nginx/website-release-routing.conf");
assert.match(nginx, /location \^~ \/_next\/static\//);
assert.match(nginx, /max-age=31536000, immutable/);
assert.match(nginx, /\$http_next_action != ""/);
assert.match(nginx, /website-http\.conf/);

const deploy = read("deploy/deploy-blue-green.sh");
assert.match(deploy, /wait_healthy "\$CANDIDATE_CONTAINER"/);
assert.match(deploy, /switch_upstream "\$CANDIDATE_PORT"/);
assert.match(deploy, /switch_upstream "\$STABLE_PORT"/);
assert.match(deploy, /docker cp .*\.next\/static/);
assert.match(deploy, /server-reference-manifest\.json/);
assert.match(deploy, /cache-control:\.\*no-store/i);
assert.match(deploy, /cache-control:\.\*immutable/i);

console.log("innoprog-website deployment contracts ok");
