const {test} = require('node:test');
const assert = require('node:assert/strict');
const {webcrypto} = require('node:crypto');
globalThis.crypto = webcrypto;
require('../core.js');
const C = globalThis.CyberCore;
const suffix = '1E4C9B93F3F0682250B6CF8331B7EE68FD8';
test('SHA-1 matches standard vectors, including UTF-8', async () => {
  assert.equal(await C.sha1('password'), '5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8');
  assert.equal(await C.sha1('abc'), 'A9993E364706816ABA3E25717850C26C9CD0D89D');
  assert.equal(await C.sha1(''), 'DA39A3EE5E6B4B0D3255BFEF95601890AFD80709');
  assert.equal(await C.sha1('🔐'), require('node:crypto').createHash('sha1').update('🔐').digest('hex').toUpperCase());
});
test('only five hash characters leave device; cookies/referrer/cache disabled; padded response requested', async () => {
  let calls = 0;
  const count = await C.checkPassword('password', async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.pwnedpasswords.com/range/5BAA6');
    assert.equal(options.method, 'GET'); assert.equal(options.body, undefined);
    assert.equal(options.headers['Add-Padding'], 'true'); assert.equal(options.credentials, 'omit');
    assert.equal(options.referrerPolicy, 'no-referrer'); assert.equal(options.cache, 'no-store');
    assert.equal(options.redirect, 'error');
    assert.equal(new URL(url).search, '');
    assert.ok(!JSON.stringify(options).includes('password'));
    assert.ok(!url.includes('5BAA6' + suffix));
    return {ok:true, text:async () => suffix + ':42\r\n' + '0'.repeat(35) + ':0'};
  });
  assert.equal(count, 42); assert.equal(calls, 1);
});
test('zero-count padding and missing match produce no exposure match', () => {
  assert.equal(C.parseRange(suffix + ':0', suffix), 0);
  assert.equal(C.parseRange('0'.repeat(35) + ':9', suffix), 0);
});
test('malformed, empty, oversized and unsafe count responses are rejected', () => {
  for (const body of ['', 'bad', suffix + ':NaN', suffix + ':9007199254740992', 'x'.repeat(1000001)]) {
    assert.throws(() => C.parseRange(body, suffix));
  }
});
test('HTTP failures and timeouts never become a reassuring no-match', async () => {
  await assert.rejects(C.checkPassword('test', async () => ({ok:false})), /unavailable/);
  await assert.rejects(C.checkPassword('', async () => {throw Error('should not fetch');}), /Enter a password/);
  await assert.rejects(C.checkPassword('test', (url, {signal}) => new Promise((resolve,reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('timeout', 'AbortError')));
  }), 5), {name:'AbortError'});
});
test('origin extraction discards path, query and fragment; excludes browser pages', () => {
  assert.equal(C.originOf('https://example.com/private?secret=1#token'), 'https://example.com');
  assert.equal(C.originOf('about:addons'), null); assert.equal(C.originOf('garbage'), null);
});
test('certificate times remain milliseconds, warnings do not disappear', () => {
  const result = C.summarize({state:'weak', protocolVersion:'TLSv1.2', isUntrusted:true,
    certificates:[{subject:'CN=example.com',validity:{start:1700000000000,end:1800000000000}, fingerprint:{sha256:'ABC'}}]});
  assert.equal(result.certificate.start, 1700000000000);
  assert.equal(result.certificate.sha256, 'ABC'); assert.deepEqual(result.warnings,['Certificate is untrusted']);
  assert.equal(C.summarize({}).state,'unknown');
});
