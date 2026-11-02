# Firefox acceptance checklist

Automated logic tests are available with `npm test`; the following browser tests remain required on Firefox desktop 140+.

- [ ] Load the unpacked manifest using about:debugging with no manifest/API errors.
- [ ] Open popup on an HTTPS site; it initially says inspection is off. Deny access; no certificate summary appears.
- [ ] Grant only that origin, reload and reopen. Compare protocol, issuer and expiry with Firefox's built-in connection details.
- [ ] Navigate to another origin: no stale certificate appears. Test a redirect to an ungranted origin.
- [ ] Open an HTTP site, an internal about: page and a browser error page. Each shows an appropriate non-secure/unsupported/unknown state.
- [ ] Where possible, test an invalid certificate without bypassing Firefox's warning. A failed request must not become a secure result.
- [ ] Open Password exposure. Reject consent: form remains disabled. TLS inspection still works.
- [ ] Grant exposure permissions; use a disposable test string. In the extension's network inspector, verify one range request per submit, a five-hex-character path and Add-Padding:true. No request while typing.
- [ ] Simulate offline/service failure: no reassuring no-match is displayed. Restore connectivity.
- [ ] Revoke exposure consent in about:addons, reopen popup and confirm checks require enabling again.
- [ ] Reset access; origin grants and optional data permission disappear. Password input and results do not persist across reopening/restart.
- [ ] Check keyboard-only navigation, visible focus, status announcements, reduced-motion preference and popup scrolling on a small laptop display.

Do not use a real password for network inspection or screenshots. Record Firefox version, OS and results before marking a public release verified.
