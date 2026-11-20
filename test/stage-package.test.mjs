import assert from "node:assert/strict";
import { resolve } from "node:path";
import { test } from "node:test";
import { stagePackage } from "../scripts/stage-package.mjs";

const archive = resolve("npm-package.tgz");
const sha = "tested-commit";
const registry = "https://registry.npmjs.org";

function fixture({ head = sha, updatedHead = head, status = 404, name = "best-react-pagination", version = "0.2.0", stageError } = {}) {
  const submissions = [];
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
          submissions.push(args);
          if (stageError) {
            throw stageError;
          }
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
  return { options, submissions, requested };
}

test("submits the tested archive for approval when the version is absent from npm", async () => {
  const { options, submissions, requested } = fixture();
  await stagePackage(archive, options);
  assert.deepEqual(requested, [`${registry}/best-react-pagination/0.2.0`]);
  assert.deepEqual(submissions, [["stage", "publish", archive, "--access", "public", "--ignore-scripts", "--registry", registry]]);
});

test("skips a version already present in npm", async () => {
  const { options, submissions } = fixture({ status: 200 });
  await stagePackage(archive, options);
  assert.deepEqual(submissions, []);
});

test("does not stage from a stale main run", async () => {
  const { options, submissions, requested } = fixture({ head: "new-main-head" });
  await stagePackage(archive, options);
  assert.deepEqual(requested, []);
  assert.deepEqual(submissions, []);
});

test("does not stage if main moves during npm lookup", async () => {
  const { options, submissions, requested } = fixture({ updatedHead: "new-main-head" });
  await stagePackage(archive, options);
  assert.equal(requested.length, 1);
  assert.deepEqual(submissions, []);
});

test("fails without staging if the registry lookup fails", async () => {
  const { options, submissions } = fixture({ status: 503 });
  await assert.rejects(stagePackage(archive, options), /503/);
  assert.deepEqual(submissions, []);
});

test("stages prereleases with the next tag for approval", async () => {
  const { options, submissions } = fixture({ version: "1.0.0-rc.1" });
  await stagePackage(archive, options);
  assert.deepEqual(submissions, [["stage", "publish", archive, "--access", "public", "--tag", "next", "--ignore-scripts", "--registry", registry]]);
});

test("rejects an archive with a different package name", async () => {
  const { options, submissions, requested } = fixture({ name: "another-package" });
  await assert.rejects(stagePackage(archive, options), /unexpected package name/);
  assert.deepEqual(requested, []);
  assert.deepEqual(submissions, []);
});

test("reports an npm staging rejection without attempting another command", async () => {
  const stageError = new Error("This version is already staged");
  const { options, submissions } = fixture({ stageError });
  await assert.rejects(stagePackage(archive, options), stageError);
  assert.deepEqual(submissions.map((args) => args.slice(0, 2)), [["stage", "publish"]]);
});
