# Cyber Hygiene · Firefox Extension

**Security checks where you browse.** A lightweight Firefox extension by [Joseph Chitalu](https://josephchitalu2.github.io), built with plain JavaScript, HTML and CSS. No build process, framework, backend, API key, account or dependency installation required.

> Version 0.1.0 · Firefox desktop 140+ · Prototype for temporary developer installation. Not signed or published on Mozilla Add-ons.

## What it does

- **Connection inspector:** explicitly allow an HTTPS origin, then reload to view Firefox's observed TLS state, protocol, cipher, HSTS status and server certificate subject, issuer, validity dates and SHA-256 fingerprint.
- **Password exposure check:** enable the optional feature and submit a password inside the extension popup. SHA-1 is computed locally; only its first five hexadecimal characters are sent to the Pwned Passwords range endpoint. The remaining suffix is compared locally.
- **Private by design:** no content scripts, login form monitoring, telemetry, accounts, persistent storage or password history. Checks run on submission, never on each keystroke.
- **Small, accessible UI:** teal and mint colours, keyboard focus indicators, status announcements, password visibility toggle and reduced-motion support.

## Install on Firefox

1. [Download the ZIP](https://josephchitalu2.github.io/downloads/cyber-hygiene-extension.zip) and extract it into a folder. Alternatively clone this repository and open `cyber-hygiene-extension/`.
2. Open `about:debugging#/runtime/this-firefox` in Firefox.
3. Click **Load Temporary Add-on…** and select the extracted `manifest.json`.
4. Open the extension from Firefox's extensions menu; optionally pin it to the toolbar.

Temporary installation ends when Firefox restarts. A permanent distributable needs Mozilla signing and review. This is a **Firefox desktop** implementation; it does not promise Chromium compatibility or Android support.

## Try the two flows

**Connection:** open a normal HTTPS website → open the popup → Allow inspection on this site → Reload tab to inspect → reopen the popup. Save unfinished form work before reloading. If the destination redirects to another origin, grant that destination separately and reload it. Browser internal pages cannot be inspected. HTTP is identified as unencrypted without requesting access.

**Exposure:** open Password exposure → Enable optional exposure checks → accept Firefox's optional host and authentication-data permission prompts → enter a test password → Check exposure. The field clears on submit. Use a deliberately disposable test string for the demo. Network/service failures show an error rather than a no-match result.

**Reset access** removes optional host permissions and exposure consent. Firefox also lets you revoke these in `about:addons`. Connection observations live in background memory only and disappear on navigation, revocation or background suspension. Reload to obtain a fresh observation if none is available.

## Architecture

| File | Responsibility |
| --- | --- |
| `manifest.json` | Firefox MV3 event background and optional permissions |
| `background.js` | Main-frame request listeners; volatile, per-tab TLS summaries |
| `core.js` | Local hashing, range parsing, exposure request and certificate summarization |
| `popup.html`, `popup.css`, `popup.js` | User-triggered permissions, connection view and password check |
| `tests/` | Offline Node tests with browser and network mocks |

For TLS, `webRequest.getSecurityInfo()` is called in a blocking `onHeadersReceived` listener. The extension observes the negotiated connection and does not modify requests, headers, certificate validation or browser trust settings. Only the leaf certificate summary is displayed. Firefox remains responsible for certificate validation. Failed TLS handshakes may provide no certificate information.

## Permissions

| Permission | Purpose |
| --- | --- |
| `activeTab` | Identify the active origin when you open the popup |
| `webRequest`, `webRequestBlocking` | Firefox's TLS security-info API requires these; no traffic interception without granted host access |
| Optional `https://*/*` | Request individual HTTPS origins only when you click Allow; the extension never requests this whole wildcard |
| Optional `https://api.pwnedpasswords.com/*` | Requested only when enabling exposure checks |
| Optional `authenticationInfo` data consent | Firefox consent for transmitting a password-derived hash prefix |

## Development and verification

Node 20+ is only needed for tests:

```sh
cd cyber-hygiene-extension
npm test
npm run check
```

Tests use known SHA-1 vectors and mocked HTTP responses; they never submit passwords to a live service. They cover prefix-only requests, padding, parse errors, timeouts, certificate fields, permission denial/revocation, navigation races and sender restrictions.

Automated tests do **not** validate Firefox's native permission dialogs, popup rendering, actual TLS event delivery or real endpoint connectivity. Complete the browser checklist in [TESTING.md](TESTING.md) before a public release. This workspace did not have Firefox available for that installation test.

## Limits that matter

A valid TLS certificate does not establish that a website is trustworthy. No breach match does not establish password strength or prove absence from every breach. The range API reduces disclosure but is not zero-disclosure: the service receives a five-character hash prefix, your IP address and timing. Response padding is requested. SHA-1 is used only for compatibility with the lookup protocol, never as a password-storage scheme.

See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md).

## References

- [Mozilla: getSecurityInfo](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/getSecurityInfo)
- [Mozilla: CertificateInfo](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/CertificateInfo)
- [Firefox built-in data consent](https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/)
- [Pwned Passwords range API](https://haveibeenpwned.com/API/v3#PwnedPasswords)

Built as an extension companion to [Cyber Hygiene Platform](https://josephchitalu2.github.io/cyber-hygiene/).
