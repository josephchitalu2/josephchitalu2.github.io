# Verification guide

Run from the repository root with Node.js 22 and Python 3. No npm dependencies are required.

```bash
python3 scripts/check_repo.py
node --test cyber-hygiene/tests/*.test.cjs
node --test cyber-hygiene-extension/tests/*.test.cjs
(cd zesco-load-track && node check.cjs)
```

## What automation covers

| Check | Coverage |
| --- | --- |
| Repository checker | HTML/Markdown local links, referenced CSS assets, external-script and inline-JavaScript syntax |
| Cyber Hygiene tests | Navigation, auth return destination, vault setup, credential CRUD, encryption persistence, rejected wrong passphrases and locking |
| Extension tests | Local hashing, mocked range API, TLS summaries and mocked Firefox permission/message behaviour |
| Power checks | Load thresholds, runtime arithmetic, input validation, appliance actions and local persistence |

These checks do not prove browser layout, native permission prompts, real TLS delivery or network-service availability.

## Manual release checklist

1. Serve the repository and inspect the portfolio at desktop and narrow widths. Open the menu and links using the keyboard; check reduced-motion behaviour.
2. In Cyber Hygiene, create a disposable local profile, open My Account → Password storage → Add account, create a vault, save a fictional login, reveal/edit/delete it and lock/unlock. Repeat Add account as a guest and verify the return after sign-in. Hiding the tab should lock the vault.
3. Complete a lesson quiz, save/export a practice report and verify progress under a second profile. Reloading requires a fresh sign-in; do not assume a persisted authenticated session.
4. Follow the [extension browser checklist](../cyber-hygiene-extension/TESTING.md).
5. Toggle the simulator kettle: the demo should change from 1090 W to 190 W. Export and reimport a synthetic profile.
6. Play Starbound Drift with keyboard and mouse; test launch, movement, docking and audio after interaction.
7. After deployment, inspect the changed public pages and check the browser console. Use a disposable browser profile for destructive reset tests.

Record which browser and checks actually ran in the pull request. A passing Node suite is not a claim of manual browser QA.
