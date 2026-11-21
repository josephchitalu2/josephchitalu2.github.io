# Project repository map and migration plan

## Public project repositories

| Repository | Current scope |
| --- | --- |
| [josephchitalu2.github.io](../README.md) | Live portfolio and existing GitHub Pages project paths |
| [INVENTORY-MANAGEMENT-SYSTEM-](https://github.com/josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-) | v5.0 SQLite CLI, Flask browser demo and regression tests on `main`. See the [demo setup](https://github.com/josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-#browser-demo). |
| [chitalu-business-automation](https://github.com/josephchitalu2/chitalu-business-automation) | Operations architecture and API design |
| [chitalu-security-operations](https://github.com/josephchitalu2/chitalu-security-operations) | Synthetic sign-in replay, local MCP server and telemetry design |
| [chitalu-analysis-lab](https://github.com/josephchitalu2/chitalu-analysis-lab) | Tested static triage, benign exercises and isolated-lab documentation |

This map covers the public portfolio projects and their source. The status column describes what each repository contains today.

## Existing live projects awaiting extraction

| Intended repository | Current source |
| --- | --- |
| cyber-hygiene-platform | cyber-hygiene/ |
| cyber-hygiene-firefox-extension | cyber-hygiene-extension/ |
| zesco-load-track | zesco-load-track/ |
| starbound-drift | games/starbound-drift/ |

These extractions are not complete. Preserve the working Pages paths, test relative assets and links, and verify replacement deployments before replacing old code with compatibility pages or redirects. Shared GitHub Pages origins still share a browser storage boundary; separate repositories alone do not isolate storage.

CHAP Platform is [live on Cloudflare Workers](https://chap-platform.chitalu-zm.workers.dev/); its [deployment and transition guide](../cyber-hygiene/CLOUDFLARE.md) records the first deployment on 19 November 2026. Its source remains in `cyber-hygiene/` until extraction is completed. The portfolio now launches the Cloudflare app. The original Pages app stays available for browser-local data saved there; records do not transfer automatically between origins. Automatic deployment from GitHub still requires connecting the Worker to this repository.

The separate local Flask POS and UNILUS Connect browser workspace are not implemented by this portfolio repository. They need their own verified source and release workflow.

## Migration procedure

Create the destination, preserve the relevant source/history where practical, copy tests and synthetic assets, document setup and deployment, review privacy and licensing, then test and publish. Update portfolio links after the new destination works. Remove duplicate application code only in a focused change after compatibility is verified.

Keep README, architecture, testing, security and contribution guides in each standalone project. Add CI for the checks that actually exist; documentation-only checks must not be described as application tests.

## What belongs in public source

Publish source, synthetic fixtures and authorized public summaries. Private case evidence, credentials, customer records and detailed SID Media findings stay outside public repositories. The [public assessment overview](SID_MEDIA_ASSESSMENT.md) remains the public reference.

## Branch maintenance

Before removing a branch, verify that its changes are on the default branch and check for open pull requests and deployment dependencies.
