# Joseph Chitalu portfolio

## Contents and running

`index.html` is a static HTML/CSS/JavaScript portfolio. Open locally in Firefox, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000 . No Python backend is required for the site itself. The local server is for previewing static files, not production hosting.

The site includes responsive navigation, section scrolling, scroll-based active links and intersection-triggered card reveals. It is designed around the uploaded dark theme.

## Prepared changes

- Corrected the IMS project badge from v4.0 to the source's v5.0.
- Replaced the unsupported CSV backup/restore claim with CSV reporting and actual implemented features.
- Linked IMS directly to `josephchitalu2/INVENTORY-MANAGEMENT-SYSTEM-`.
- Added Starbound Drift with a local play link and documentation link.
- Removed a duplicated GitHub contact link.
- Replaced the fake contact-success alert with a mailto draft. The visitor still needs an email application and must send the draft themselves. No message is submitted by this site.

## File layout

- `index.html`: portfolio entry page.
- `games/starbound-drift/index.html`: playable game.
- `downloads/ims.py`: supplied IMS source for download.
- `docs/PORTFOLIO.md`: this document.
- `docs/STARBOUND_DRIFT.md`: game documentation.

## Deployment and review

This folder is prepared for the existing GitHub Pages repository. Its actual Pages branch/source and current remote content could not be inspected in this session. The publishing helper creates a review branch and pull request, not a merge. Inspect the diff and existing Pages configuration before merging. Standard branch-based Pages can serve this tree from the repository root; other build workflows may need adaptation.

Contact information and other experience claims come from the supplied page and have not been independently verified. Review public personal details before merging. Other project cards still point to the GitHub profile because no specific repositories were supplied. The page describes Cybersecurity studies; confirm that wording matches your preferred current programme title.

## Validation and limits

Checked inline JavaScript syntax, local project links and the corrected IMS claim. Browser layout, keyboard navigation, mailto behaviour and Pages deployment still require a live preview. No analytics, contact database or email delivery service is implemented.
