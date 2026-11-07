# Portfolio maintenance

## Structure

The root `index.html` is the personal portfolio. Buildless projects are served from subdirectories; their HTML, scripts, styles and assets must retain their relative paths. There is no server-side application here.

| Content | Source |
| --- | --- |
| Profile, experience, skills, project cards and contact | `index.html` |
| Cyber Hygiene | `cyber-hygiene/` |
| Firefox companion | `cyber-hygiene-extension/` |
| Power simulator | `zesco-load-track/` |
| Space game | `games/starbound-drift/index.html` |
| Downloadable IMS snapshot | `downloads/ims.py` |

## Preview and checks

Serve the repository root using the command in [README](../README.md), then follow [TESTING](TESTING.md). The contact form opens a `mailto:` draft in the visitor's email application; the visitor must send it. There is no email-delivery backend.

## Deployment

The site is published through GitHub Pages. The password-manager update in PR #3 was merged and its Pages build completed successfully on 7 November 2026. Before changing publishing settings, inspect Settings → Pages rather than assuming a branch or folder.

1. Make a focused branch and run the documented checks.
2. Open a pull request describing behaviour, validation and limitations.
3. Merge after review and watch the **pages build and deployment** Actions run.
4. Check the public portfolio and changed project paths after it succeeds.

A browser can retain old assets. Bump query-string asset versions when changing the buildless Cyber Hygiene scripts, and use a hard refresh for verification. Never clear site data as a routine update step: it contains users' local records and vaults.

## Distribution copies

`downloads/ims.py` is a snapshot of the separate IMS repository, not an independent source of truth. Update it deliberately when the canonical IMS source changes. Regenerate `downloads/cyber-hygiene-extension.zip` when changing distributed extension files; compare its contents with the source before publishing.

## Project descriptions

Link project cards to their exact source, guide or demo. For work without public source, say so instead of using a generic profile link labelled GitHub. Keep completed work, working features and planned improvements distinct. Update public biography details only from the maintainer's information.

## Repository separation

Cyber Hygiene currently shares this repository and Pages origin. The requested standalone repository is being prepared from the app's Git history. Until that migration is published, this folder remains the live source. Preserve the working URL and do not remove its files before a verified replacement is deployed.

Separate repositories improve ownership, issue tracking and releases. They do not isolate browser storage on GitHub Pages: projects under the same `josephchitalu2.github.io` origin share its storage boundary. Moving domains would require a separate data-migration design.
