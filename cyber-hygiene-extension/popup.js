'use strict';
const $ = id => document.getElementById(id);
let current;
let busy = false;
function fail(error) { $('error').hidden = false; $('error').textContent = error.message || 'Something went wrong. Please reopen the popup.'; }
function date(value) { return typeof value === 'number' && Number.isFinite(value) ? new Date(value).toLocaleString() : 'Unavailable'; }
function row(label, value) {
  const dt = document.createElement('dt'); const dd = document.createElement('dd');
  dt.textContent = label; dd.textContent = value || 'Unavailable'; $('details').append(dt, dd);
}
async function refresh() {
  current = await browser.runtime.sendMessage({type: 'connection'});
  $('details').replaceChildren(); $('details').hidden = true;
  $('allow-site').hidden = true; $('reload-site').hidden = true;
  document.querySelector('.status-card').dataset.state = '';
  if (!current?.supported) {
    $('connection-state').textContent = 'Open a website first'; $('site').textContent = 'Browser pages cannot be inspected.';
    $('connection-help').textContent = 'Switch to a normal HTTP or HTTPS tab, then reopen this popup.'; return;
  }
  $('site').textContent = current.origin;
  if (current.origin.startsWith('http:')) {
    $('connection-state').textContent = 'Unencrypted HTTP';
    $('connection-help').textContent = 'This connection does not use TLS. Avoid entering sensitive information.'; return;
  }
  if (!current.permitted) {
    $('connection-state').textContent = 'Inspection is off';
    $('connection-help').textContent = 'Allow this origin, then reload when you are ready. Permission remains until you revoke it.';
    $('allow-site').hidden = false; return;
  }
  const o = current.observation;
  $('reload-site').hidden = false;
  if (!o) {
    $('connection-state').textContent = 'Waiting for an observation';
    $('connection-help').textContent = 'Reload this tab to inspect a fresh connection. Save any form work first; reopen the popup afterward.'; return;
  }
  document.querySelector('.status-card').dataset.state = o.state;
  $('connection-state').textContent = ({secure:'Secure TLS connection',weak:'Weak TLS connection',broken:'Broken TLS connection',insecure:'Insecure connection',failed:'Connection failed'})[o.state] || 'TLS state unavailable';
  $('connection-help').textContent = o.state === 'failed' ? 'Firefox did not complete this request. Certificate details may be unavailable.' : 'Observed ' + new Date(o.observedAt).toLocaleTimeString() + '. This describes the connection, not the trustworthiness of the site.';
  $('details').hidden = false;
  if (o.error) row('Browser request error', o.error);
  else {
    row('Protocol / cipher', o.protocol + ' / ' + o.cipher); row('HSTS', o.hsts ? 'Enabled' : 'Not reported');
    row('Certificate subject', o.certificate?.subject); row('Certificate issuer', o.certificate?.issuer);
    row('Valid from', date(o.certificate?.start)); row('Valid until', date(o.certificate?.end));
    row('SHA-256 fingerprint', o.certificate?.sha256);
    if (o.warnings?.length) row('Warnings', o.warnings.join('; '));
  }
}
async function passwordAccess() {
  const perms = await browser.permissions.getAll();
  const allowed = Boolean(perms.data_collection?.includes('authenticationInfo')) &&
    await browser.permissions.contains({origins:['https://api.pwnedpasswords.com/*']});
  $('enable-check').hidden = allowed; $('password-form').hidden = !allowed;
  return allowed;
}
$('connection-tab').onclick = () => selectPanel(false);
$('password-tab').onclick = () => selectPanel(true);
function selectPanel(password) {
  $('connection-panel').hidden = password; $('password-panel').hidden = !password;
  $('connection-tab').setAttribute('aria-pressed', String(!password)); $('password-tab').setAttribute('aria-pressed', String(password));
  if (!password) $('password').value = '';
}
$('allow-site').onclick = async () => {
  try {
    // Call request directly in this user gesture; no asynchronous work beforehand.
    const allowed = await browser.permissions.request({origins:[current.origin + '/*']});
    if (allowed) await refresh();
  } catch (error) { fail(error); }
};
$('reload-site').onclick = async () => {
  try {
    const [tab] = await browser.tabs.query({active:true,currentWindow:true});
    if (tab.id !== current.tabId || CyberCore.originOf(tab.url) !== current.origin) { await refresh(); return; }
    await browser.tabs.reload(tab.id); window.close();
  } catch (error) { fail(error); }
};
$('enable-check').onclick = async () => {
  try {
    await browser.permissions.request({origins:['https://api.pwnedpasswords.com/*'], data_collection:['authenticationInfo']});
    await passwordAccess();
  } catch (error) { fail(error); }
};
$('reveal').onclick = () => {
  const show = $('password').type === 'password'; $('password').type = show ? 'text' : 'password';
  $('reveal').textContent = show ? 'Hide' : 'Show'; $('reveal').setAttribute('aria-pressed', String(show));
  $('reveal').setAttribute('aria-label', show ? 'Hide password' : 'Show password');
};
$('password-form').onsubmit = async event => {
  event.preventDefault(); if (busy) return;
  busy = true; $('check').disabled = true;
  let value = $('password').value; $('password').value = ''; $('password').type = 'password';
  $('reveal').textContent = 'Show'; $('reveal').setAttribute('aria-pressed','false'); $('reveal').setAttribute('aria-label','Show password');
  $('password-result').dataset.tone = ''; $('password-result').textContent = 'Checking with a five-character hash prefix…';
  try {
    if (!await passwordAccess()) throw new Error('Optional permission was revoked. Enable checks to continue.');
    const pending = CyberCore.checkPassword(value); value = null;
    const count = await pending;
    $('password-result').dataset.tone = count ? 'danger' : 'good';
    $('password-result').textContent = count ? 'Exposed: seen ' + count.toLocaleString() + ' times in the dataset. Change it anywhere you use it; choose a unique password.' : 'No match in this dataset. This does not guarantee that the password is strong or unexposed.';
  } catch (error) {
    $('password-result').dataset.tone = 'danger';
    $('password-result').textContent = error.name === 'AbortError' ? 'Request timed out. No exposure result is available.' : error.message;
  } finally { value = null; busy = false; $('check').disabled = false; }
};
$('reset').onclick = async () => {
  try {
    if (busy) throw new Error('Wait for the current check to finish before resetting access.');
    $('password').value = '';
    const perms = await browser.permissions.getAll();
    if (perms.origins?.length) await browser.permissions.remove({origins:perms.origins});
    if (perms.data_collection?.includes('authenticationInfo')) await browser.permissions.remove({data_collection:['authenticationInfo']});
    $('password-result').textContent = 'Optional access removed. No stored passwords or results to delete.';
    await passwordAccess(); await refresh();
  } catch (error) { fail(error); }
};
window.addEventListener('pagehide', () => { $('password').value = ''; });
Promise.all([refresh(), passwordAccess()]).catch(fail);
