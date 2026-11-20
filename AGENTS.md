# best-react-pagination

## Development

- Use the Node.js version in `.nvmrc` and install with `npm ci`. `npm run dev` runs the local demo from `demo/` against `lib/`.
- Follow `.github/workflows/ci.yml` for release checks. Use `npm run test:a11y` for changes to interaction or styling and `npm run test:pack` for changes to the published package or its exports.
- Keep README focused on installation, usage, accessibility and the demo. Keep the npm badge and public demo link there and maintainer procedures here.

## Releases

1. Prepare the authorized version change in `package.json` and `package-lock.json`. The usual path is a topic branch into `develop`, then `develop` into `main`.
2. A push to `main` runs CI and `.github/workflows/publish.yml` stages the verified archive through npm Trusted Publishing. The maintainer approves it in npm **Staged Packages** with 2FA. The README on npm updates when a new version is published.
3. Verify that the version is public on npm and check its provenance for the exact source commit. Create the GitHub Release `v<version>` at that commit with a short summary of user-facing changes. Use Latest for a new stable release and mark prereleases as prereleases. The current workflow only stages npm packages, so creating the GitHub Release is a separate step.

## Public demo

- Make demo changes in `demo/`. `.github/workflows/pages.yml` builds and deploys the [public demo](https://97dmitry.github.io/best-react-pagination/) on pushes to `main`, independently of npm approval. The repository's Pages source is **GitHub Actions**.
- GitHub Pages serves this project under `/best-react-pagination/`. The workflow sets Vite's base path from the Pages configuration. To reproduce the production build locally, run `npm run build:demo -- --base /best-react-pagination/`.
- After a demo deployment, open the public URL and check Default, Compact, and Custom CSS, including keyboard input.
