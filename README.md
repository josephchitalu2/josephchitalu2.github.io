# Joseph Chitalu · Portfolio & Projects

Cybersecurity student at the University of Lusaka, building practical tools for security awareness, inventory workflows and household power planning.

[Visit the portfolio](https://josephchitalu2.github.io/) · [Report a bug](https://github.com/josephchitalu2/josephchitalu2.github.io/issues)

## Explore the projects

| Project | Try it | Source & documentation | Status |
| --- | --- | --- | --- |
| Cyber Hygiene | [Open the app](https://josephchitalu2.github.io/cyber-hygiene/) | [App guide](cyber-hygiene/README.md) | Student awareness platform; encrypted local vault |
| Cyber Hygiene Firefox extension | [Download](downloads/cyber-hygiene-extension.zip) | [Installation & privacy](cyber-hygiene-extension/README.md) | Temporary Firefox developer add-on |
| ZescoLoad-Track | [Open simulator](https://josephchitalu2.github.io/zesco-load-track/) | [Guide](zesco-load-track/README.md) | Household load and runtime estimates |
| Starbound Drift | [Play](https://josephchitalu2.github.io/games/starbound-drift/) | [Controls & architecture](docs/STARBOUND_DRIFT.md) | Keyboard/mouse space-game prototype |
| Inventory Management System | [Separate repository](https://github.com/josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-) | [Technical documentation](https://github.com/josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-/blob/main/docs/TECHNICAL.md) | Python CLI / SQLite prototype |
| SID Media assessment | [Public overview](docs/SID_MEDIA_ASSESSMENT.md) | Evidence summary; private report excluded | Completed assessment project |

## Run locally

Requires Python 3 for the preview server. The websites need no package installation or build step.

```bash
git clone https://github.com/josephchitalu2/josephchitalu2.github.io.git
cd josephchitalu2.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000/ and choose a project. Use localhost or HTTPS for browser cryptography; opening files directly may behave differently.

## Repository map

| Path | Purpose |
| --- | --- |
| `index.html`, `assets/` | Personal portfolio and shared branding |
| `cyber-hygiene/` | Awareness app, local accounts and encrypted vault |
| `cyber-hygiene-extension/` | Firefox connection/exposure companion |
| `zesco-load-track/` | Buildless household power simulator |
| `games/starbound-drift/` | Single-file Canvas game |
| `downloads/` | Public distribution copies |
| `docs/` | Project explanations and maintenance guidance |
| `scripts/check_repo.py` | Local links, assets and JavaScript syntax checks |

## Development

Node.js 22 and Python 3 are used by repository checks. No npm installation is required.

```bash
python3 scripts/check_repo.py
node --test cyber-hygiene/tests/*.test.cjs
node --test cyber-hygiene-extension/tests/*.test.cjs
(cd zesco-load-track && node check.cjs)
```

[Testing guide](docs/TESTING.md) · [Portfolio maintenance](docs/PORTFOLIO.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

## Project boundaries

Cyber Hygiene profiles and learning data stay in the current browser. The vault encrypts its own entries and uses a separate master passphrase. Reports are classroom practice records, not submissions to an institution. The extension's optional exposure lookup contacts an external service only when enabled and submitted. Each project documents its own limitations.

The published source has no repository-wide software licence grant. Third-party fonts and design assets retain their own rights; check provenance before redistribution. Built through iterative development with AI assistance.
