import assert from "node:assert/strict";
import { resolve } from "node:path";
import { test } from "node:test";
import { publishPackage } from "../scripts/publish-package.mjs";

const archive = resolve("npm-package.tgz");
const sha = "tested-commit";
const registry = "https://registry.npmjs.org";

function fixture({ head = sha, updatedHead = head, status = 404, name = "best-react-pagination", version = "0.2.0" } = {}) {
  const published = [];
  const requested = [];
  let mainHead = head;
  const options = {
    sha,
    run(command, args) {
      switch (command) {
        case "git":
          assert.deepEqual(args, ["ls-remote", "--exit-code", "origin", "refs/heads/main"]);
          return `${mainHead}\trefs/heads/main\n`;
        case "tar":
          assert.deepEqual(args, ["-xOzf", archive, "package/package.json"]);
          return JSON.stringify({ name, version });
        case "npm":
          published.push(args);
          return;
        default:
          assert.fail(`Unexpected command ${command}`);
      }
    },
    async lookup(url) {
      requested.push(url.href);
      mainHead = updatedHead;
      return new Response(null, { status });
    },
  };
  return { options, published, requested };
}

test("publishes the tested archive when the current version is absent from npm", async () => {
  const { options, published, requested } = fixture();
  await publishPackage(archive, options);
  assert.deepEqual(requested, [`${registry}/best-react-pagination/0.2.0`]);
  assert.deepEqual(published, [["publish", archive, "--access", "public", "--ignore-scripts", "--registry", registry]]);
});

test("skips a version already present in npm", async () => {
  const { options, published } = fixture({ status: 200 });
  await publishPackage(archive, options);
  assert.deepEqual(published, []);
});

test("does not publish from a stale main run", async () => {
  const { options, published, requested } = fixture({ head: "new-main-head" });
  await publishPackage(archive, options);
  assert.deepEqual(requested, []);
  assert.deepEqual(published, []);
});

test("does not publish if main moves during npm lookup", async () => {
  const { options, published, requested } = fixture({ updatedHead: "new-main-head" });
  await publishPackage(archive, options);
  assert.equal(requested.length, 1);
  assert.deepEqual(published, []);
});

test("fails without publishing if the registry lookup fails", async () => {
  const { options, published } = fixture({ status: 503 });
  await assert.rejects(publishPackage(archive, options), /503/);
  assert.deepEqual(published, []);
});

test("publishes prereleases under next", async () => {
  const { options, published } = fixture({ version: "1.0.0-rc.1" });
  await publishPackage(archive, options);
  assert.deepEqual(published, [["publish", archive, "--access", "public", "--tag", "next", "--ignore-scripts", "--registry", registry]]);
});

test("rejects an archive with a different package name", async () => {
  const { options, published, requested } = fixture({ name: "another-package" });
  await assert.rejects(publishPackage(archive, options), /unexpected package name/);
  assert.deepEqual(requested, []);
  assert.deepEqual(published, []);
});
