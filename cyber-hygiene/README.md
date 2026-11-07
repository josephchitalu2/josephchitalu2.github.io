# Cyber Hygiene

A static student cyber-awareness demo published through GitHub Pages.

## Run
Open index.html with its adjacent files in a modern browser, or visit the GitHub Pages URL. No dependency installation or build is required.

## Design source
The original Cyber Hygiene Figma file is 9TESNt9v6DWKsO8kauvMdC.
The implementation adapts its mobile screens into responsive HTML/CSS:
- Login 54:426
- Dashboard 112:487
- Risk assessment 222:250
- Learning content 147:477
- Report manager 90:518
- Verification 142:448
- My account 208:274

figma.css contains the Figma colours and component treatments. Fonts and used exported assets are local. OS status bars and home indicators are not reproduced as website controls. Dashboard activity uses actual local learning results instead of the prototype's sample social-app activity.

## Working demo flows
Device-local sign-up, password sign-in, account picker and guest access, six lessons with quizzes, eight scam scenarios, progress export, local report history, manual likelihood/impact risk logging, educational message warning checks, and profile/logout navigation.

The reference risk score denominator was corrected from 26 to 25 because likelihood and impact each range from 1 to 5. The matrix image is a labelled reference illustration; the calculator and log use the entered values.

## Boundaries
This version has device-local password sign-in, with salted PBKDF2 hashes and separate browser storage namespaces for each profile. Password sign-in is not a server authorization boundary and does not encrypt learning records. This version has no backend account authentication, provider OAuth, live breach/account monitoring, central incident submission, or email response system. Users create a username and a unique prototype password. They should not reuse credentials from other services. There is no cross-device sync or email password recovery. Verification uses local text patterns and cannot establish that a message or URL is safe. Practice reports remain browser-local.

## Development and verification

Serve the portfolio root using `python3 -m http.server 8000 --bind 127.0.0.1`, then open http://localhost:8000/cyber-hygiene/. Use HTTPS or localhost for Web Crypto. Node.js 22 runs `node --test tests/*.test.cjs` from this folder without installing packages.

The shipped tests cover routing, authentication return destinations and vault operations, encryption persistence, rejected wrong passphrases and locking. They do not constitute complete account-registry or browser UI coverage. Follow the repository [manual testing guide](../docs/TESTING.md) before a release.

## Navigation
Workspace navigation is inside a native dialog drawer on desktop and mobile. Use the Menu button to open it. Navigation, outside clicks, the close button and Escape dismiss it. Native dialog behaviour supplies focus containment and return. Reduced-motion settings disable entrance animation.


## Team feedback update — 2 November 2026

- **Password Manager** opens Cyber Vault, with separate master-passphrase create/unlock, encrypted local credentials, search, favourites, detail/reveal/copy, add/edit/delete, a cryptographic generator and session lock settings. AES-256-GCM encrypts entries; PBKDF2-SHA-256 derives the key with 600,000 iterations. The vault is a classroom prototype; use fictional entries. It has no recovery or sync.
- **Security Guidelines** provides incident-specific response steps, separate from the learning content.
- **Cyber Training Awareness** now owns the learning hub, lesson quizzes and phishing challenge. The old `#learn` route remains an alias so saved links still work.
- **Risk Assessment** remains accessible from Home and is removed from the workspace menu.
- [UML-ALIGNMENT.md](UML-ALIGNMENT.md) specifies model, navigation, use-case and sequence changes, with presentation limits.

Run the vault tests with `node --test tests/*.test.cjs`. No package install is required. Browser-local account credentials and learning data use separate storage from encrypted vault entries. Sign-in does not unlock the vault. Hiding the tab, leaving the vault page, switching accounts or logging out locks it; the default inactivity timeout is five minutes.

A forgotten master passphrase cannot be recovered. Clearing browser data destroys the vault. There is no backup export/restore, autofill, biometrics or TOTP implementation. Copying passwords puts them on the system clipboard, outside vault protection. All scripts on the shared GitHub Pages origin remain within the browser security boundary; encryption does not protect an unlocked page from malicious code or a compromised device.

### Password storage navigation

My Account → Password storage → Add account opens the Password Manager entry form. View saved passwords opens the vault list. Creating another Cyber Hygiene profile is a separately labelled action.

Guests sign in or create a profile first, then return to the requested vault page. On Add account, creating or unlocking the vault continues to the entry form. Saving stores the encrypted entry and shows it in Saved passwords.

Reference: FigJam board `OabUufhV1iTMtqRSXBPXuP`, password-manager Must have sticky `175:974` (encrypted storage, master password, CRUD, view/copy, auto-lock). Figma design `9TESNt9v6DWKsO8kauvMdC` was reviewed for the existing account/navigation structure. The connected Jira site exposed onboarding tasks rather than Cyber Hygiene requirements. Miro content was unavailable for review.
