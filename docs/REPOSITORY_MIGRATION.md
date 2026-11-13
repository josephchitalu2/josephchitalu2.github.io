# Project repository map and migration plan

## Public project repositories

| Repository | Current scope |
| --- | --- |
| josephchitalu2.github.io | Live portfolio and existing GitHub Pages project paths |
| INVENTORY-MANAGEMENT-SYSTEM- | v5.0 CLI source and regression tests; web PR #3 remains separate |
| chitalu-business-automation | Operations architecture and API design; implementation pending |
| chitalu-security-operations | Security operations architecture and release requirements |
| chitalu-analysis-lab | Tested static triage, benign exercises and isolated-lab documentation |

This map covers the public portfolio projects and their source. The status column describes what each repository contains today.

## Existing live projects awaiting extraction

| Intended repository | Current source |
| --- | --- |
| cyber-hygiene-platform | cyber-hygiene/ |
| cyber-hygiene-firefox-extension | cyber-hygiene-extension/ |
| zesco-load-track | zesco-load-track/ |
| starbound-drift | games/starbound-drift/ |

These extractions are not complete. Preserve the working Pages paths, test relative assets and links, and verify replacement deployments before replacing old code with compatibility pages or redirects. Shared GitHub Pages origins still share a browser storage boundary; separate repositories alone do not isolate storage.

The separate local Flask POS and UNILUS Connect browser workspace are not implemented by this portfolio repository. They need their own verified source and release workflow.

## Migration procedure

Create the destination, preserve the relevant source/history where practical, copy tests and synthetic assets, document setup and deployment, review privacy and licensing, then test and publish. Update portfolio links after the new destination works. Remove duplicate application code only in a focused change after compatibility is verified.

Keep README, architecture, testing, security and contribution guides in each standalone project. Add CI for the checks that actually exist; documentation-only checks must not be described as application tests.

## What belongs in public source

Publish source, synthetic fixtures and authorized public summaries. Private case evidence, credentials, customer records and detailed SID Media findings stay outside public repositories. The [public assessment overview](SID_MEDIA_ASSESSMENT.md) remains the public reference.

## Branch maintenance

Before removing a branch, verify that its changes are on the default branch and that no open work still uses it. Review the [IMS web demo proposal](https://github.com/josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-/pull/3) separately.
