# Cyber Hygiene: code and feature walkthrough

Use the [live demo](https://josephchitalu2.github.io/cyber-hygiene/) or the local
preview in the [app README](README.md). Start as a guest for the quiz. Set up a
fictional local profile and separate vault passphrase before demonstrating the vault.

## How a menu click opens a screen

[`index.html`](index.html) provides the menu and the main content area. The
**Cyber Training Awareness** link sets the URL to `#training`.
The `hashchange` handler in [`app.js`](app.js) calls `render()`; the router maps
that route to `learning()` and replaces the contents of the main area. GitHub
Pages serves the files; the browser runs the app.

## Demo 1: quiz feedback and progress

1. Open **Cyber Training Awareness**, then **Phishing: look before you click**.
2. Start the knowledge check and select an answer to the bursary question.
3. Click **Check answer** to see the explanation. Finish all three questions to
   save the attempt, then open **Learning Progress**.

In `app.js`, `startquiz(id)` sets the starting question and score. The answer
handler compares the selected option with the lesson's answer key. After the
third question, `record()` adds the attempt and `save()` writes it to the active
browser profile. At least two correct answers mark the lesson complete.

## Demo 2: Add account in the Password Manager

1. From **My Account → Password storage**, choose **Add account**.
2. If prompted, sign in to a fictional Cyber Hygiene profile. The app keeps the
   `#password-manager/add` destination.
3. Create or unlock the vault with its separate passphrase. Save a fictional
   service login and show it under **Saved passwords**.

[`accounts.js`](accounts.js) handles local profile sign-in.
[`vault-ui.js`](vault-ui.js) opens the requested entry form after unlock.
[`vault.js`](vault.js) uses Web Crypto to encrypt saved entries before they are
written to browser storage. Sign-in and vault unlock are separate. Use invented
credentials in class; the demo has no vault sync or recovery.

## Demo 3: guidance, verification and reports

[`guidelines.js`](guidelines.js) shows steps for the incident the learner selects.
Verification in `app.js` checks pasted text for common warning patterns, such as
urgent language or requests for a password. Report Manager saves a practice report
locally and can export it as JSON. The checker cannot establish a message is safe,
and the report does not reach campus IT.

See [UML alignment](UML-ALIGNMENT.md) for the relationships and
[repository testing](../docs/TESTING.md) for the checks to run before a change.
