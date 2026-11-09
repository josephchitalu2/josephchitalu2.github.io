# Independent project repository migration plan

**Status:** proposal, not a completed migration. Do not move or delete live website directories until independent repositories exist and the published URLs have been tested.

## Current state (November 2026)

The `josephchitalu2.github.io` repo currently hosts the portfolio, Cyber Hygiene web demo, Cyber Hygiene Firefox extension, ZescoLoad-Track, and Starbound Drift. The CLI inventory application already has its own repository. The newer Flask POS is separate work and **is not the same as the CLI application**.

## Target repositories

| Proposed repository | Current source | Focus |
| --- | --- | --- |
| `cyber-hygiene-platform` | `cyber-hygiene/` | Awareness app, demo accounts, encrypted classroom vault |
| `cyber-hygiene-firefox-extension` | `cyber-hygiene-extension/` | TLS observation and optional k-anonymous password exposure checks |
| `zesco-load-track` | `zesco-load-track/` | Local household load/runtime simulator |
| `starbound-drift` | `games/starbound-drift/` | Browser game |
| `python-pos-inventory` | Existing local Flask POS project, once verified | Sales, shifts, roles, SQLite persistence |
| `network-security-labs` | New project | Permission-based packet capture analysis, defensive exercises |
| `python-log-analyzer` | New project | Offline parsing, detection rules, synthetic security logs |

Do not publish the SID Media assessment's detailed findings or private evidence. The existing [public overview](SID_MEDIA_ASSESSMENT.md) is the appropriate public reference unless disclosure is authorized.

## Safe migration checklist

1. Create an independent empty repository, with a clear name, description and appropriate visibility.
2. Copy only that project's source, tests, synthetic assets and documentation. Inspect for secrets, tokens, live databases, real customer data and internal organization details before publishing.
3. Add `README.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `SECURITY.md`, `.gitignore`, and CI checks. Add a license only when ownership and third-party rights are clear.
4. Keep the original GitHub Pages URLs working during migration. Update relative paths, links, and Pages configuration for the new repository location.
5. Run tests, smoke-check a deployed preview, check Firefox extension distribution paths (where relevant), and verify links from mobile and desktop.
6. Update portfolio links to the independent repositories. Retain old paths as redirects or documented compatibility copies until the new locations are confirmed.
7. After a stable release, remove duplicate application code from the portfolio in a separate reviewed change. Do not remove old assets or history blindly.

## Default repository structure

```text
project-name/
├── README.md
├── .gitignore
├── SECURITY.md
├── CONTRIBUTING.md
├── src/                 # Or existing framework-appropriate source layout
├── tests/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── TESTING.md
│   └── ROADMAP.md
└── .github/workflows/
    └── checks.yml
```

Use a smaller structure when a project genuinely does not need a directory; avoid placeholder files. Every README should state purpose, requirements, local start commands, tests, current feature boundaries, privacy/security assumptions, and deployment or demo status.

## Defensive security project standards

- Use synthetic logs, locally generated test packets, or explicitly authorized lab captures.
- Do not commit live credentials, browser history, packet captures with private traffic, full vulnerability reports, access tokens, or private customer data.
- Include a threat model and limitations in the documentation. A green CI badge is not proof of security.
- Favor interpretable detections with sample data, tests, and false-positive notes instead of exaggerated detection guarantees.
- Prefer simple Python standard-library tools compatible with a low-memory Linux machine.

## Migration constraints

Creating repositories requires a repository-creation-capable GitHub connection or the user's GitHub interface. Until that is available, this document is a plan only. Existing directories and deployments remain untouched.
