'use strict';
/* Browser-local encrypted classroom vault. No network calls or plaintext persistence. */
globalThis.CyberVault = (() => {
  const ITERATIONS = 600000, PREFIX = 'cyber-hygiene-vault-v1-';
  const encode = value => { let text=''; for(let i=0;i<value.length;i+=8192) text+=String.fromCharCode(...value.subarray(i,i+8192)); return btoa(text); };
  const decode = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
  const clone = value => JSON.parse(JSON.stringify(value));
  function generate(length = 20, groups = ['upper', 'lower', 'digits', 'symbols']) {
    const sets = {upper:'ABCDEFGHJKLMNPQRSTUVWXYZ',lower:'abcdefghijkmnopqrstuvwxyz',digits:'23456789',symbols:'!@#$%&*+-=?'};
    if (!Number.isInteger(length) || length < 12 || length > 64) throw Error('Choose 12–64 characters.');
    const selected = [...new Set(groups)].map(g => sets[g]);
    if (!selected.length || selected.some(s => !s)) throw Error('Choose at least one character group.');
    function random(n) { const limit = 256 - 256 % n; let b; do { b = crypto.getRandomValues(new Uint8Array(1))[0]; } while (b >= limit); return b % n; }
    const pool = selected.join(''), chars = selected.map(s => s[random(s.length)]);
    while (chars.length < length) chars.push(pool[random(pool.length)]);
    for (let i = chars.length - 1; i > 0; i--) { const j = random(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    return chars.join('');
  }
  function session(storage = localStorage) {
    let owner = null, key = null, data = null, raw = null, epoch = 0, writing = false;
    const storageKey = id => PREFIX + id;
    const aad = id => new TextEncoder().encode('CyberHygieneVault:v1:' + id);
    function lock() { epoch++; key = data = raw = owner = null; }
    function assertOpen() { if (!key || !data || !owner) throw Error('Unlock your vault first.'); }
    function envelope(text) {
      const v = JSON.parse(text);
      if (v?.version !== 1 || v.iterations !== ITERATIONS || v.algorithm !== 'AES-GCM' ||
          typeof v.salt !== 'string' || typeof v.iv !== 'string' || typeof v.ciphertext !== 'string' ||
          v.ciphertext.length > 2000000 || decode(v.salt).length !== 16 || decode(v.iv).length !== 12) throw Error('Invalid vault file.');
      return v;
    }
    function validate(records) {
      if (!Array.isArray(records) || records.length > 100) throw Error('Invalid vault contents.');
      const ids = new Set();
      for (const e of records) {
        if (!e || !['id','title','username','password','url'].every(k => typeof e[k] === 'string') ||
            !e.id || ids.has(e.id) || !e.title.trim() || e.title.length > 80 || e.username.length > 200 ||
            !e.password.length || e.password.length > 1024 || e.url.length > 500 || typeof e.favorite !== 'boolean') throw Error('Invalid credential entry.');
        ids.add(e.id);
      }
      return records;
    }
    async function derive(master, salt) {
      if (!crypto?.subtle) throw Error('Vault encryption requires HTTPS and a modern browser.');
      if (typeof master !== 'string' || master.length < 12 || master.length > 256) throw Error('Use a master passphrase of 12–256 characters.');
      const bytes = new TextEncoder().encode(master);
      try {
        const material = await crypto.subtle.importKey('raw', bytes, 'PBKDF2', false, ['deriveKey']);
        return await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:ITERATIONS,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
      } finally { bytes.fill(0); }
    }
    async function seal(id, cryptoKey, records, salt) {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const bytes = new TextEncoder().encode(JSON.stringify(records));
      try {
        const encrypted = await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:aad(id)},cryptoKey,bytes);
        return JSON.stringify({version:1,algorithm:'AES-GCM',iterations:ITERATIONS,salt,iv:encode(iv),ciphertext:encode(new Uint8Array(encrypted))});
      } finally { bytes.fill(0); }
    }
    async function create(id, master) {
      lock(); const token = epoch;
      if (!id || storage.getItem(storageKey(id))) throw Error('A vault already exists for this account. Unlock it instead.');
      const salt = crypto.getRandomValues(new Uint8Array(16)); const k = await derive(master,salt);
      const sealed = await seal(id,k,[],encode(salt));
      if (token !== epoch) throw Error('Vault operation cancelled.');
      if (storage.getItem(storageKey(id))) throw Error('A vault was created in another tab. Unlock it instead.');
      storage.setItem(storageKey(id),sealed); owner=id;key=k;data=[];raw=sealed;
    }
    async function unlock(id, master) {
      lock(); const token = epoch, snapshot = storage.getItem(storageKey(id));
      if (!snapshot) throw Error('No vault found for this account.');
      try {
        const v = envelope(snapshot), k = await derive(master,decode(v.salt));
        const plain = new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(v.iv),additionalData:aad(id)},k,decode(v.ciphertext)));
        let records;
        try { records = validate(JSON.parse(new TextDecoder().decode(plain))); } finally { plain.fill(0); }
        if (token !== epoch || snapshot !== storage.getItem(storageKey(id))) throw Error('Vault changed.');
        owner=id;key=k;data=records;raw=snapshot;
      } catch { throw Error('Unable to unlock. Check the passphrase; the vault may also have changed or be damaged.'); }
    }
    async function commit(next) {
      assertOpen(); if (writing) throw Error('A vault save is already in progress.');
      writing=true; const token=epoch, id=owner, snapshot=raw, k=key;
      try {
        validate(next); const sealed=await seal(id,k,next,envelope(snapshot).salt);
        if (token !== epoch) throw Error('Vault locked before saving. Unlock and try again.');
        if (storage.getItem(storageKey(id)) !== snapshot) { lock(); throw Error('Vault changed in another tab. Unlock the latest copy before editing.'); }
        storage.setItem(storageKey(id),sealed);data=next;raw=sealed;
      } finally { writing=false; }
    }
    async function put(entry) {
      assertOpen(); const e={id:entry.id||crypto.randomUUID(),title:String(entry.title||'').trim(),
        username:String(entry.username||''),password:String(entry.password||''),url:String(entry.url||'').trim(),favorite:Boolean(entry.favorite)};
      if (e.url) { let u; try {u=new URL(e.url);} catch {throw Error('Use a complete HTTPS or HTTP website address.');} if (!['https:','http:'].includes(u.protocol) || u.username || u.password) throw Error('Use an HTTP(S) address without embedded credentials.'); }
      const next=clone(data), index=next.findIndex(x=>x.id===e.id);
      if (index>=0) next[index]=e; else next.push(e);
      await commit(next); return e.id;
    }
    async function remove(id) { assertOpen(); await commit(data.filter(e=>e.id!==id)); }
    return {create,unlock,lock,put,remove,
      exists:id=>Boolean(storage.getItem(storageKey(id))), isOpen:id=>Boolean(key && owner===id),
      list:()=>{assertOpen();return clone(data);}, backup:()=>{assertOpen();return JSON.parse(raw);},
      storageKey};
  }
  return Object.freeze({session,generate});
})();
