# Starbound Drift

An original single-file 2D space game built iteratively with AI assistance. Uses Canvas 2D for rendering, Web Audio oscillators for sound and localStorage for a small record archive. No external assets or packages are required.

## Run

Open `games/starbound-drift/index.html` in a desktop browser, choose a mode and ship body, and click Launch. Audio starts after interaction. A local HTTP preview is also available with `python3 -m http.server 8000` at the portfolio root.

## Modes

| Mode | Objective |
|---|---|
| Open World | Explore, shoot decommissioned worlds and collect three artefacts |
| Story | Destroy Cinder, Vesper and Orison, then dock with at least one artefact |
| Chaos | Survive asteroid collisions, periodic fuel losses and scanner-revealable blackouts |

## Controls

| Input | Action |
|---|---|
| W/Up | Forward thrust |
| S/Down | Reverse thrust |
| A/D or Left/Right | Rotate |
| Space, F or held left mouse | Fire |
| Shift | Brake |
| E | Dock/undock |
| Q | Scanner pulse |
| Esc | Pause/resume |
| R | Empty-tank emergency tow in Open World/Story only |

Mouse/F firing provides an alternative when a keyboard cannot register an arrow/thrust/Space combination. It does not change the keyboard hardware's rollover capability.

## Mechanics

Maximum ship speed is 480 world units per second; the HUD labels these as m/s, although the game is not a physical simulator. Cosmetic bodies are Dart, Manta and Comet. Docking requires distance below 190 and speed below 85. Fuel refills at 10 percentage points per second, so a fully empty tank fills in ten seconds of active simulation. Hull repairs at 15 points per second. Pausing stops these timers.

Scanner reveal lasts two seconds with a five-second cooldown. In Chaos, collision prediction considers approaching asteroids within three seconds and sounds repeated warnings. This uses closest approach, not an exact surface-contact time, so the display is approximate. Each collision removes 22 hull points. Docked ships have a safe zone.

## Architecture

One embedded script contains shared state, reset/docking/combat helpers, `update`, `updateModes`, `draw` and a requestAnimationFrame loop. Delta time is capped at 0.033 seconds. It caps device pixel ratio at 1.5 and retains at most 400 particles and 65 active asteroids.

## Persistence

The key `starbound-records` stores best Chaos survival time and artefact names. It does **not** save a current flight, ship position, inventory state or story progress. Storage failures are caught. Browser/site/file-origin rules can affect persistence. Audio levels and selected ship are not saved. New flight resets the current run; changing modes also resets it.

## Known limits

Small fixed star system, simple planet collisions, procedural visuals and synthesised ambience. Camping at Haven is possible and contributes to Chaos survival time. Threat direction is a world angle, not an arrow relative to the ship. Controls are designed for keyboard and mouse, not touch. Progress text and layout may crowd smaller screens. No multiplayer, full customisation or content editor.

## Verification

Inline JavaScript syntax checked for this uploaded source. Earlier development checks covered flight, braking, docking, ten-second refuel, demolition, collections, mode transitions, story ending and Chaos damage. Those earlier checks are development history, not proof that every browser behaves identically. Current GPU/browser visuals, sound and performance require manual playtesting.
