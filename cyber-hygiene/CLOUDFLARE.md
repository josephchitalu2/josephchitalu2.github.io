# CHAP Platform on Cloudflare

The source stays in `josephchitalu2/josephchitalu2.github.io`, under `cyber-hygiene/`. CHAP is live at [chap-platform.chitalu-zm.workers.dev](https://chap-platform.chitalu-zm.workers.dev/), served by the static Worker `chap-platform`. GitHub Pages remains available during the transition.

## Deployment record — 19 November 2026

Wrangler reported a successful deployment of 31 assets, version `788126ee-3d9b-400c-af30-b8b72afb28c4`. The live sign-in page rendered, and browser checks confirmed guest access to the dashboard, the workspace menu with its green tagline, and navigation to the training hub. Sign-up, password sign-in, quizzes, progress persistence and vault flows have not yet been rechecked in the live Cloudflare browser session. Git integration for automatic deployments remains a separate setup step.

The portfolio launch link now uses Cloudflare. The original GitHub Pages app remains available for browser data saved on its origin.

## Deployment

Use Node.js 22 or newer. From the portfolio repository root, run:

```bash
git pull --ff-only
python3 scripts/check_repo.py
node --test cyber-hygiene/tests/*.test.cjs
npx wrangler@4 login
npx wrangler@4 whoami
npx wrangler@4 deploy --config wrangler.chap.jsonc
```

Skip login if `whoami` already confirms the intended Cloudflare account. Wrangler prints the actual HTTPS address after a successful deployment. The address has the form `https://chap-platform.<account-subdomain>.workers.dev`; it can later use a custom domain. Creating this Worker does not require renaming the account subdomain or changing the separate Papino Worker.

The app needs no npm dependencies. `npx` downloads Wrangler if needed. Wrangler runs `scripts/build-chap-cloudflare.mjs`, which copies only the required HTML, CSS, JavaScript and `assets/` into `dist/chap-platform/`. That generated directory is served at the new site's root. Documentation, tests, deployment configuration and local state are excluded from the published files. Hash routes such as `/#dashboard` work at that root; missing files return 404 rather than the app HTML.

To test Cloudflare's asset serving locally:

```bash
npx wrangler@4 dev --config wrangler.chap.jsonc
```

## Automatic deployment from GitHub

After the first deployment, connect the Worker to this GitHub repository in Cloudflare's build settings:

| Setting | Value |
| --- | --- |
| Worker name | `chap-platform` |
| Repository | `josephchitalu2/josephchitalu2.github.io` |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | `node scripts/build-chap-cloudflare.mjs` |
| Deploy command | `npx wrangler@4 deploy --config wrangler.chap.jsonc` |
| Build watch paths, if configured | `cyber-hygiene/**`, `scripts/build-chap-cloudflare.mjs`, `wrangler.chap.jsonc` |

Cloudflare then deploys relevant pushes after the Git integration is connected. This repository alone does not enable automatic deployments. Preview URLs are disabled in the configuration; leave non-production branch builds disabled unless deliberately setting them up.

## Browser data when moving

CHAP currently stores profiles, quiz progress, practice reports and the encrypted practice vault in browser storage. A new Cloudflare address is a different origin, so it starts with separate storage. Moving hosting does not move existing profiles or enable shared accounts, password recovery, reporting to a central service or an AI chatbot.

Before switching links, use the old site's progress and practice-report exports for reference. There is no import flow for those exports and no supported vault export/restore UI. Keep the old address available for existing browser data, and create a fresh profile on the new address. Clearing browser data can still remove the old records. Use fictional credentials in the practice vault.

## Verify before switching the public link

1. Open the exact HTTPS URL Wrangler prints in a fresh browser session. Check sign-up, sign-in, logout and guest access.
2. Open the workspace menu, lessons and quizzes; verify progress persists after a reload. Open `/#dashboard` directly and refresh it.
3. Create a practice vault, add a fictional entry, lock and unlock it, then check the entry survives a reload.
4. Verify the shield, CHAP wordmark, green tagline, fonts and illustrations load on mobile and desktop.
5. Check `/README.md`, `/tests/navigation.test.cjs`, `/wrangler.chap.jsonc` and a nonexistent `.js` path return 404 on Cloudflare.
6. Confirm the portfolio home and the original GitHub Pages app still open. Update portfolio and shared links only after the Cloudflare checks pass.

If the Cloudflare deployment has a problem, keep sharing the existing [GitHub Pages app](https://josephchitalu2.github.io/cyber-hygiene/) while correcting the Worker deployment. No redirect or removal of the Pages app is included in this change.

## Hosting cost and future server features

Cloudflare currently serves static assets without a request charge or an asset-storage charge. This deployment uses static assets only and needs no D1 database, R2 bucket or paid Worker plan. A custom domain has its own registration and renewal costs. Future server APIs, shared authentication and an AI provider must be designed and budgeted separately.

References: [static deployment](https://developers.cloudflare.com/workers/static-assets/get-started/), [asset configuration](https://developers.cloudflare.com/workers/static-assets/binding/), [static asset pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [Git build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), and [browser storage origins](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
