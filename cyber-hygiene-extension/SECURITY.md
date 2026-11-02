# Security model

This prototype helps inspect connections and query a known-breached-password dataset. It is not a password manager, antivirus, phishing detector, certificate authority or replacement for Firefox's security warnings.

## Boundaries

- Firefox validates certificates. The extension never accepts invalid certificates or changes browser trust.
- The popup is an extension-owned page; no script is injected into visited websites.
- TLS summaries stay local and are available only through a sender-checked internal popup message.
- Permissions are optional per HTTPS origin; no blanket origin request is made. The manifest's broad optional pattern defines what users can choose, not an installation-time grant.
- The exposure service receives a hash prefix. A compromised endpoint can return wrong results or correlate request metadata; padding and prefix lookup do not eliminate this risk.
- An already-compromised browser, malicious extension, OS malware, screen capture or local memory inspection is outside this model.
- SHA-1 is required by the range protocol. Do not reuse this code as a password-storage design.
- The extension has no remote scripts, dependencies or build-time asset fetches. DOM updates use textContent rather than untrusted HTML.

## Reporting

For non-sensitive bugs, open a GitHub issue in this repository. Do not include real passwords, private certificate keys, confidential browsing URLs or access tokens. For a sensitive flaw, use the repository's private vulnerability reporting feature if available; otherwise contact the maintainer through the portfolio contact method before disclosing details publicly.

No independent security audit or signed-store release is claimed.
