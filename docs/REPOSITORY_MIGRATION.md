# Project repository map and migration plan

## Repositories in use

| Repository | Current scope |
| --- | --- |
| josephchitalu2.github.io | Live portfolio and existing GitHub Pages project paths |
| INVENTORY-MANAGEMENT-SYSTEM- | v5.0 CLI source and regression tests; web PR #3 remains separate |
| chitalu-business-automation | Operations architecture and API design; implementation pending |
| chitalu-security-operations | Security operations architecture and release requirements |
| chitalu-analysis-lab | Tested static triage, benign exercises and isolated-lab documentation |

All five repositories have README documentation. The three Chitalu product repositories were created and populated on 10 November 2026. Source publication and application deployment are separate milestones.

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

## Scope and ownership

The current laptop does not define product scope. Choose infrastructure and tools to fit the required work, with separate development and deployment resource profiles. Track full release goals in explicit milestones.

Publish source, synthetic fixtures and authorized public summaries. Private case evidence, credentials, customer records and detailed SID Media findings stay outside public repositories. The [public assessment overview](SID_MEDIA_ASSESSMENT.md) remains the public reference.

## Branch cleanup

Main history and open work are retained. The IMS web-deployment PR remains pending; merged or historical branches should only be removed after their relationship to main and open work is checked. No history rewrite is part of this restructuring.
