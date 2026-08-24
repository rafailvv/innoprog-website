import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = mkdtempSync(join(tmpdir(), "website-assets-"));
const staticRoot = join(root, "static");
const releaseRoot = join(root, "releases");
const current = "aaaaaaaaaaaa";
const previous = "bbbbbbbbbbbb";
const expired = "cccccccccccc";
const oldDate = new Date(Date.now() - 10 * 86400 * 1000);

// The deployment exports the validated commit before Docker builds it. Prove
// that a concurrent worktree mutation cannot alter that isolated build input.
const archiveRepo = join(root, "archive-repo");
const archiveContext = join(root, "archive-context");
mkdirSync(archiveRepo, { recursive: true });
mkdirSync(archiveContext, { recursive: true });
execFileSync("git", ["init", "-q"], { cwd: archiveRepo });
execFileSync("git", ["config", "user.email", "deploy-test@innoprog.test"], { cwd: archiveRepo });
execFileSync("git", ["config", "user.name", "Deploy Test"], { cwd: archiveRepo });
writeFileSync(join(archiveRepo, "release.txt"), "committed\n");
execFileSync("git", ["add", "release.txt"], { cwd: archiveRepo });
execFileSync("git", ["commit", "-qm", "release"], { cwd: archiveRepo });
const releaseSha = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: archiveRepo,
  encoding: "utf8",
}).trim();
writeFileSync(join(archiveRepo, "release.txt"), "mutated\n");
execFileSync(
  "bash",
  ["-lc", `git archive --format=tar ${releaseSha} | tar -xf - -C ${JSON.stringify(archiveContext)}`],
  { cwd: archiveRepo },
);
assert.equal(readFileSync(join(archiveContext, "release.txt"), "utf8"), "committed\n");

const asset = (path, old = true) => {
  const absolute = join(staticRoot, path);
  mkdirSync(join(absolute, ".."), { recursive: true });
  writeFileSync(absolute, path);
  if (old) utimesSync(absolute, oldDate, oldDate);
};

try {
  mkdirSync(releaseRoot, { recursive: true });
  asset("css/current.css");
  asset("chunks/previous.js");
  asset("chunks/expired.js");
  asset("chunks/recent.js", false);
  writeFileSync(join(releaseRoot, `${current}.assets`), "css/current.css\n");
  writeFileSync(join(releaseRoot, `${previous}.assets`), "chunks/previous.js\n");
  writeFileSync(join(releaseRoot, `${expired}.assets`), "chunks/expired.js\n");
  writeFileSync(join(releaseRoot, `${current}.html`), "current");
  writeFileSync(join(releaseRoot, `${previous}.html`), "previous");
  writeFileSync(join(releaseRoot, `${expired}.html`), "expired");
  for (const suffix of ["assets", "html"]) {
    utimesSync(join(releaseRoot, `${expired}.${suffix}`), oldDate, oldDate);
  }

  execFileSync("bash", ["deploy/prune-static-assets.sh"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      STATIC_ROOT: staticRoot,
      RELEASE_ROOT: releaseRoot,
      CURRENT_RELEASE: current,
      PREVIOUS_RELEASE: previous,
      STATIC_TTL_DAYS: "7",
    },
  });

  assert.equal(existsSync(join(staticRoot, "css/current.css")), true);
  assert.equal(existsSync(join(staticRoot, "chunks/previous.js")), true);
  assert.equal(existsSync(join(staticRoot, "chunks/recent.js")), true);
  assert.equal(existsSync(join(staticRoot, "chunks/expired.js")), false);
  assert.equal(existsSync(join(releaseRoot, `${current}.assets`)), true);
  assert.equal(existsSync(join(releaseRoot, `${previous}.html`)), true);
  assert.equal(existsSync(join(releaseRoot, `${expired}.assets`)), false);
  assert.equal(existsSync(join(releaseRoot, `${expired}.html`)), false);

  writeFileSync(join(releaseRoot, `${current}.assets`), "../outside.css\n");
  const unsafe = spawnSync("bash", ["deploy/prune-static-assets.sh"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      STATIC_ROOT: staticRoot,
      RELEASE_ROOT: releaseRoot,
      CURRENT_RELEASE: current,
      PREVIOUS_RELEASE: previous,
      STATIC_TTL_DAYS: "7",
    },
  });
  assert.notEqual(unsafe.status, 0);
} finally {
  rmSync(root, { recursive: true, force: true });
}

console.log("innoprog-website static asset retention contracts ok");
