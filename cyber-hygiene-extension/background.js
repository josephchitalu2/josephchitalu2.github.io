'use strict';
// Volatile only: Firefox may suspend this event page; reopen/reload to obtain a fresh observation.
const observations = new Map();
const generations = new Map();
const requests = new Map();
let permissionEpoch = 0;
function clearTab(tabId) {
  observations.delete(tabId);
  requests.delete(tabId);
  generations.set(tabId, (generations.get(tabId) || 0) + 1);
}
browser.webRequest.onBeforeRequest.addListener(details => { clearTab(details.tabId); requests.set(details.tabId, details.requestId); },
  {urls: ['http://*/*', 'https://*/*'], types: ['main_frame']});
browser.webRequest.onHeadersReceived.addListener(async details => {
  const origin = CyberCore.originOf(details.url);
  if (details.tabId < 0 || !origin?.startsWith('https://')) return;
  const generation = generations.get(details.tabId) || 0;
  const epoch = permissionEpoch;
  try {
    if (!await browser.permissions.contains({origins: [origin + '/*']})) return;
    const info = await browser.webRequest.getSecurityInfo(details.requestId, {certificateChain: true, rawDER: false});
    if (epoch !== permissionEpoch || generation !== (generations.get(details.tabId) || 0) ||
        (requests.has(details.tabId) && requests.get(details.tabId) !== details.requestId)) return;
    observations.set(details.tabId, {origin, observedAt: Date.now(), ...CyberCore.summarize(info)});
  } catch { /* Missing TLS information stays unknown; never treat an error as secure. */ }
}, {urls: ['https://*/*'], types: ['main_frame']}, ['blocking']);
browser.webRequest.onErrorOccurred.addListener(details => {
  const origin = CyberCore.originOf(details.url);
  if (details.tabId >= 0 && origin &&
      (!requests.has(details.tabId) || requests.get(details.tabId) === details.requestId)) observations.set(details.tabId,
    {origin, state: 'failed', observedAt: Date.now(), error: details.error});
}, {urls: ['https://*/*'], types: ['main_frame']});
browser.tabs.onRemoved.addListener(tabId => { observations.delete(tabId); generations.delete(tabId); requests.delete(tabId); });
browser.tabs.onUpdated.addListener((tabId, change) => {
  if (change.url) clearTab(tabId);
});
browser.permissions.onRemoved.addListener(() => { permissionEpoch++; observations.clear(); generations.clear(); requests.clear(); });
browser.runtime.onMessage.addListener(async (message, sender) => {
  // Only the extension popup may query these volatile observations.
  if (sender.id !== browser.runtime.id || sender.url !== browser.runtime.getURL('popup.html')) return;
  if (message.type !== 'connection') return;
  const [tab] = await browser.tabs.query({active: true, currentWindow: true});
  const origin = CyberCore.originOf(tab?.url);
  if (!origin) return {supported: false};
  const permitted = origin.startsWith('https://') && await browser.permissions.contains({origins: [origin + '/*']});
  const observation = observations.get(tab.id);
  return {supported: true, tabId: tab.id, origin, permitted,
    observation: permitted && observation?.origin === origin ? observation : null};
});
