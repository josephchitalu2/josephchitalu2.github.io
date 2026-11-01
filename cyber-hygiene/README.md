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
Display-name entry and guest access, six lessons with quizzes, eight scam scenarios, progress export, local report history, manual likelihood/impact risk logging, educational message warning checks, and profile/logout navigation.

The reference risk score denominator was corrected from 26 to 25 because likelihood and impact each range from 1 to 5. The matrix image is a labelled reference illustration; the calculator and log use the entered values.

## Boundaries
This version has no backend account authentication, provider OAuth, encrypted password vault, live breach/account monitoring, central incident submission, or email response system. The login uses a display name rather than asking for real credentials. Verification uses local text patterns and cannot establish that a message or URL is safe. Practice reports remain browser-local.

## Verification
JavaScript syntax and functional checks cover login/guest routes, lesson completion, challenge scoring, duplicate completion guards, escaping, risk bounds/persistence, report history, local message checks, and logout. Used asset and font paths were checked for nonempty files. Browser visual verification was blocked by the execution environment, so desktop/mobile layout still needs a browser review.
