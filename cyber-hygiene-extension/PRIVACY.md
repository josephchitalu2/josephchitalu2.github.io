# Privacy — version 0.1.0

The extension contains no analytics, ads, account system, database, local storage, content scripts or website password-field readers.

## Connection inspection

When you grant an HTTPS origin access and load it, Firefox exposes its main-frame TLS information to the extension. The extension keeps the origin, observation time, negotiated protocol/cipher, HSTS flag, certificate summary and relevant warnings in volatile background memory, indexed by tab. It does not retain URL paths, queries, fragments or a browsing history. These summaries are not transmitted to Joseph Chitalu or any other server. Revocation and navigation clear cached observations; suspension or restart loses them too.

## Optional exposure lookup

You must explicitly enable this feature through Firefox's optional permission dialog and submit a password in the popup. It uses the Pwned Passwords service operated by Have I Been Pwned. The password is hashed with SHA-1 locally; the first five hexadecimal characters are sent over HTTPS to `api.pwnedpasswords.com/range/PREFIX`. No password, full hash, suffix, website origin or account identifier is sent. Cookies and referrer are omitted. Redirects are rejected and cache bypass requested. The service sees your IP address, request time and hash prefix. The extension requests padded responses and compares the suffix locally.

The input clears immediately on submission and when leaving the password view or closing the popup. Passwords, hashes and results are never deliberately persisted or logged. JavaScript memory management cannot guarantee immediate erasure of immutable strings from RAM. The result remains in the open popup until replaced or the popup closes.

See [HIBP privacy](https://haveibeenpwned.com/Privacy) for the service's handling of requests. Network infrastructure and the browser may retain their own metadata beyond the extension's control.

## Your controls

TLS inspection works without exposure checks. Reset access removes optional origin access and exposure data consent. You can also revoke permissions or uninstall in Firefox `about:addons`. Reset waits for an already-submitted check to finish; it cannot undo a request already sent.
