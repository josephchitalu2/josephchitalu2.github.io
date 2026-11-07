# ZescoLoad-Track Web

Lightweight, buildless household load simulator using HTML, CSS and JavaScript. No external packages, fonts, services, or network calls are needed after loading the page.

## Run

[Open the live simulator](https://josephchitalu2.github.io/zesco-load-track/), or serve the portfolio root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit http://localhost:8000/zesco-load-track/. No build or package installation is required. For direct offline use, open `index.html` with `style.css`, `model.js` and `app.js` alongside it. `offline.html` is a bundled snapshot; verify it separately when updating the multi-file app.

## Demo
The initial household has a 150 W television, four 10 W lights and a 900 W kettle on a 1000 W inverter. It totals 1090 W and flags overload. Switch off the kettle to show 190 W and 810 W headroom. The settings panel controls inverter rating, warning threshold and optional battery assumptions.

## Features
Add, edit, remove and toggle appliances, adjust quantities, choose example presets, show load/headroom/status, estimate constant-load battery runtime, save browser-local state, import/export CLI-compatible JSON profiles and export CSV reports. Data-changing imports, demo resets and removals use confirmation dialogs.

## Data compatibility
JSON uses schema_version 1 and the same household/appliance/battery field names as zesco_load_track.py. Profile inputs are validated before replacing existing state. File size limit: 1 MB. Appliance limit: 1000. Names: 80 characters, no controls. Quantities must be whole positive numbers.

## Calculations and limits
Total watts = sum(watts × quantity) for enabled items.
Headroom = inverter continuous rating − total watts.
Runtime = voltage × Ah × usable fraction × efficiency ÷ total watts.

The warning threshold is a configurable classroom assumption. Battery runtime excludes surge demand, idle draw, changing loads, battery chemistry, age and other effects. At or above the inverter rating, runtime is labelled energy-only arithmetic. This is not a measurement/control tool or official ZESCO service.

## Development checks

From this folder with Node.js 22:

```bash
node --check model.js
node --check app.js
node check.cjs
```

The included check exercises calculation thresholds, runtime, invalid inputs, duplicate IDs, appliance operations, persistence, escaping, settings and reset using browser-like mocks. It does not prove browser layout or real battery performance. The Python CLI is not shipped in this repository; the JSON format preserves its documented field conventions.

## Accessibility and motion
Labelled inputs, native confirmation/form dialogs, keyboard-accessible controls, semantic switches, reduced-motion support and limited CSS-only animations.
