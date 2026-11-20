import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const registry = "https://registry.npmjs.org";

export async function stagePackage(tarball, { sha, run = execFileSync, lookup = fetch }) {
  if (!tarball || !sha) {
    throw new Error("A verified npm archive and GITHUB_SHA are required.");
  }

  function isCurrentMain() {
    const [head] = run("git", ["ls-remote", "--exit-code", "origin", "refs/heads/main"], {
      encoding: "utf8",
    }).split(/\s+/, 1);
    if (head !== sha) {
      console.log("Skipping npm staging because this run is no longer the head of main.");
    }
    return head === sha;
  }

  if (!isCurrentMain()) {
    return;
  }

  const archive = resolve(tarball);
  const { name, version } = JSON.parse(run("tar", ["-xOzf", archive, "package/package.json"], {
    encoding: "utf8",
  }));
  if (name !== "best-react-pagination" || typeof version !== "string" || !version) {
    throw new Error("The verified archive has an unexpected package name or version.");
  }

  const url = new URL(`/${encodeURIComponent(name)}/${encodeURIComponent(version)}`, registry);
  const response = await lookup(url, { redirect: "error", signal: AbortSignal.timeout(15_000) });
  if (response.status === 200) {
    console.log(`${name}@${version} is already published.`);
    return;
  }
  if (response.status !== 404) {
    throw new Error(`Could not check ${name}@${version} in npm (HTTP ${response.status}).`);
  }

  if (!isCurrentMain()) {
    return;
  }

  // An explicit latest tag would bypass npm's protection against publishing an older stable version as latest.
  const tag = version.split("+", 1)[0].includes("-") ? ["--tag", "next"] : [];
  run("npm", ["stage", "publish", archive, "--access", "public", ...tag, "--ignore-scripts", "--registry", registry], {
    stdio: "inherit",
  });
}

if (import.meta.main) {
  await stagePackage(process.argv[2], { sha: process.env.GITHUB_SHA });
}
