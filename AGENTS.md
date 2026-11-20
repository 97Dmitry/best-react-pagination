# best-react-pagination

## Development

- Use the Node.js version in `.nvmrc` and install with `npm ci`. `npm run dev` runs the local demo from `demo/` against `lib/`.
- Follow `.github/workflows/ci.yml` for release checks. Use `npm run test:a11y` for changes to interaction or styling and `npm run test:pack` for changes to the published package or its exports.
- Keep README focused on installation, usage, accessibility and the demo. Keep the npm badge and CodeSandbox link there and maintainer procedures here.

## Releases

1. Prepare the authorized version change in `package.json` and `package-lock.json`. The usual path is a topic branch into `develop`, then `develop` into `main`.
2. A push to `main` runs CI and `.github/workflows/publish.yml` stages the verified archive through npm Trusted Publishing. The maintainer approves it in npm **Staged Packages** with 2FA. The README on npm updates when a new version is published.
3. Verify that the version is public on npm and check its provenance for the exact source commit. Create the GitHub Release `v<version>` at that commit with a short summary of user-facing changes. Use Latest for a new stable release and mark prereleases as prereleases. The current workflow only stages npm packages, so creating the GitHub Release is a separate step.
4. After publishing a new stable version to npm `latest`, update the existing CodeSandbox demo and check the public preview.

## CodeSandbox demo

- Update [CodeSandbox VM `6f2gcv`](https://codesandbox.io/p/devbox/6f2gcv) in place. The [direct preview](https://6f2gcv-5173.csb.app/) runs on port 5173.
- Use `@codesandbox/sdk` from a separate tool directory. Resume `6f2gcv`, connect to it and work in `/project/workspace`. Keep `CSB_API_KEY` on the calling machine in the environment or a private file supplied for the session. When using `client.fs.batchWrite`, pass workspace-relative paths so the SDK extracts files into the correct directory.
- Pin `best-react-pagination` to the published version and regenerate the sandbox lockfile. Sync relevant files from `demo/` when examples change. In the VM, use the published `best-react-pagination` and `best-react-pagination/styles.css` imports in place of the local `lib/` imports.
- Run `npm ci` and `npm run build` in the VM. Check that the `demo` task is running and test Default, Compact, and Custom CSS in the direct preview, including keyboard input. The preview may ask visitors to confirm before opening.
