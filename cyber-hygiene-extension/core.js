/* Shared, dependency-free functions. No logging or persistence of credentials. */
(function (root) {
  'use strict';
  function originOf(url) {
    try { const u = new URL(url); return ['https:', 'http:'].includes(u.protocol) ? u.origin : null; }
    catch { return null; }
  }
  async function sha1(value) {
    const bytes = new TextEncoder().encode(value);
    try {
      const digest = await crypto.subtle.digest('SHA-1', bytes);
      return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    } finally { bytes.fill(0); }
  }
  function parseRange(body, suffix) {
    if (body.length > 1000000) throw new Error('Unexpected response size.');
    let count = 0;
    const lines = body.trim().split(/\r?\n/);
    if (!lines.length || !body.trim()) throw new Error('Empty response. Try again later.');
    for (const line of lines) {
      const match = /^([A-F0-9]{35}):(\d+)$/i.exec(line.trim());
      if (!match || !Number.isSafeInteger(Number(match[2]))) throw new Error('Unexpected response format.');
      if (match[1].toUpperCase() === suffix) count = Math.max(count, Number(match[2]));
    }
    return count;
  }
  async function checkPassword(password, fetcher = fetch, timeoutMs = 12000) {
    if (typeof password !== 'string' || !password.length) throw new Error('Enter a password to check.');
    const hash = await sha1(password);
    password = null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetcher('https://api.pwnedpasswords.com/range/' + hash.slice(0, 5), {
        method: 'GET', headers: {'Add-Padding': 'true'}, credentials: 'omit',
        cache: 'no-store', redirect: 'error', referrerPolicy: 'no-referrer', signal: controller.signal
      });
      if (!response.ok) throw new Error('Exposure service unavailable. Try again later.');
      if (Number(response.headers?.get('content-length')) > 1000000) throw new Error('Unexpected response size.');
      return parseRange(await response.text(), hash.slice(5));
    } finally { clearTimeout(timer); }
  }
  function summarize(info) {
    const cert = info.certificates?.[0];
    return {
      state: info.state || 'unknown', protocol: info.protocolVersion || 'Unavailable',
      cipher: info.cipherSuite || 'Unavailable', hsts: Boolean(info.hsts),
      warnings: [info.isDomainMismatch && 'Certificate domain mismatch',
        info.isNotValidAtThisTime && 'Certificate outside validity period',
        info.isUntrusted && 'Certificate is untrusted'].filter(Boolean),
      certificate: cert ? {subject: cert.subject, issuer: cert.issuer,
        start: cert.validity?.start, end: cert.validity?.end,
        sha256: cert.fingerprint?.sha256} : null
    };
  }
  root.CyberCore = {originOf, sha1, parseRange, checkPassword, summarize};
})(globalThis);
