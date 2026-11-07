'use strict';
/* Standalone UI mounted by the main application router. */
globalThis.CyberVaultUI = (() => {
  const vault = CyberVault.session();
  const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let account=null, root=null, mode='vault', selected=null, busy=false, timer, generation=0;
  let idleMs=300000, pendingAdd=false;
  function lock() { generation++; vault.lock(); selected=null; mode='vault'; clearTimeout(timer); if(root?.isConnected && location.hash.slice(1).split('/')[0]==='password-manager') draw(); }
  function touch() { clearTimeout(timer); if (account && vault.isOpen(account.id)) timer=setTimeout(lock,idleMs); }
  function detach() { root=null; lock(); account=null; pendingAdd=false; }
  function mount(node, user, addEntry=false) {
    if (account?.id!==user?.id) {root=null;lock();} account=user;root=node;pendingAdd=addEntry;if(addEntry&&account&&vault.isOpen(account.id)){selected=null;mode='form';pendingAdd=false;}
    node.addEventListener('click',click);node.addEventListener('submit',submit);
    node.addEventListener('input',event=>{touch();if(event.target.id==='vault-search')filterRows(event.target.value);if(event.target.id==='generator-length')node.querySelector('#length-label').textContent=event.target.value;});
    node.addEventListener('keydown',touch);draw();touch();
  }
  function error(msg) {const el=root?.querySelector('#vault-error');if(el)el.textContent=msg;}
  function field(label,name,value='',type='text',extra='') {return '<label>'+label+'<input name="'+name+'" type="'+type+'" value="'+esc(value)+'" '+extra+'></label>';}
  function draw() {
    if (!root) return;
    const heading='<div class="vault-head"><div><p class="eyebrow">PASSWORD MANAGER</p><h1>Cyber Vault</h1><p>Your credentials, in your control.</p></div><span class="vault-emblem" aria-hidden="true">◇</span></div>';
    let html='';
    if(!account) html='<section class="vault-unlock"><h2>Your own encrypted space</h2><p>Sign in to a local account before creating a separate master passphrase for your vault. You will return here to save your login.</p><a class="btn" href="#signin/password-manager'+(pendingAdd?'/add':'')+'">Sign in to continue</a> <a class="textlink" href="#signup/password-manager'+(pendingAdd?'/add':'')+'">Create Cyber Hygiene profile</a></section>';
    else if(!vault.isOpen(account.id)) {
      let exists;try{exists=vault.exists(account.id);}catch{root.innerHTML=heading+'<section class="vault-panel"><h2>Browser storage unavailable</h2><p>Allow storage for this site to create or unlock a vault. Nothing has been saved.</p></section>';return;}
      html='<section class="vault-unlock"><div class="vault-lock" aria-hidden="true">◇</div><h2>'+(exists?'Unlock your vault':'Create your vault')+'</h2><p>'+esc(account.name)+' · Separate from your platform sign-in</p><form id="vault-unlock-form">'+field('Master passphrase','master','','password','required minlength="12" maxlength="256" autocomplete="'+(exists?'current-password':'new-password')+'"')+(!exists?field('Confirm master passphrase','confirm','','password','required minlength="12" maxlength="256" autocomplete="new-password"')+'<label class="vault-check"><input type="checkbox" name="understood" required> I understand there is no master-passphrase recovery. Clearing browser data deletes this vault.</label>':'')+'<button class="btn" type="submit">'+(exists?'Unlock vault':'Create encrypted vault')+'</button></form><p class="muted">Use a unique passphrase. The vault locks when you leave this page, hide this tab, or after inactivity.</p></section>';
    } else {
      html='<div class="vault-bar"><span>● Unlocked · '+esc(account.name)+'</span><button class="btn secondary small" data-vaction="lock">Lock vault</button></div><nav class="vault-tabs" aria-label="Password manager sections">'+[['vault','Saved passwords'],['generator','Generator'],['settings','Settings']].map(([m,t])=>'<button class="chip '+(mode===m?'active':'')+'" aria-pressed="'+(mode===m)+'" data-vaction="tab" data-mode="'+m+'">'+t+'</button>').join('')+'</nav>';
      if(mode==='vault') {
        const entries=vault.list();
        html+='<section class="vault-panel"><div class="row"><h2>Saved passwords <small>('+entries.length+')</small></h2><button class="btn" data-vaction="new">＋ Add account</button></div><label>Find a credential<input id="vault-search" type="search" placeholder="Search by title or username" autocomplete="off"></label><div class="vault-list">'+(entries.length?entries.sort((a,b)=>Number(b.favorite)-Number(a.favorite)||a.title.localeCompare(b.title)).map(e=>'<button class="vault-item" data-vaction="detail" data-id="'+esc(e.id)+'" data-search="'+esc((e.title+' '+e.username).toLowerCase())+'"><span class="vault-item-icon">'+esc(e.title.charAt(0).toUpperCase())+'</span><span><strong>'+esc(e.title)+'</strong><small>'+esc(e.username||'No username')+'</small></span><span>'+(e.favorite?'★':'›')+'</span></button>').join(''):'<div class="empty">No saved passwords yet. Choose Add account to store a service, username and password.</div>')+'</div><p id="vault-no-results" hidden>No matching credentials.</p></section>';
      } else if(mode==='detail') {
        const e=vault.list().find(x=>x.id===selected);
        if(!e){mode='vault';draw();return;}
        html+='<section class="vault-panel"><button class="textbtn" data-vaction="back">← My vault</button><h2>'+esc(e.title)+'</h2>'+field('Username / email','detail-user',e.username,'text','readonly')+'<label>Password<div class="passwordfield"><input id="vault-secret" type="password" value="'+esc(e.password)+'" readonly autocomplete="off"><button type="button" data-vaction="reveal" aria-pressed="false">Show</button></div></label><button class="btn secondary" data-vaction="copy">Copy password</button><p class="muted">Clipboard contents are outside this vault. Clear them when finished.</p><dl><dt>Website</dt><dd class="vault-url">'+esc(e.url||'Not provided')+'</dd><dt>Favourite</dt><dd>'+(e.favorite?'Yes':'No')+'</dd></dl><div class="row"><button class="btn" data-vaction="edit">Edit entry</button><button class="textbtn" data-vaction="delete-confirm">Delete entry</button></div></section>';
      } else if(mode==='form') {
        const e=vault.list().find(x=>x.id===selected)||{};
        html+='<section class="vault-panel"><button class="textbtn" data-vaction="back">← My vault</button><h2>'+(e.id?'Edit saved account':'Add account password')+'</h2><form id="vault-entry-form">'+field('Service / title','title',e.title,'text','required maxlength="80" autocomplete="off"')+field('Username / email','username',e.username,'text','maxlength="200" autocomplete="off"')+'<label>Password<div class="passwordfield"><input id="vault-entry-password" name="password" type="password" value="'+esc(e.password||'')+'" required maxlength="1024" autocomplete="new-password"><button type="button" data-vaction="reveal-entry" aria-pressed="false">Show</button></div></label><button type="button" class="textbtn" data-vaction="generate-entry">Generate a 20-character password</button>'+field('Website URL (optional)','url',e.url,'url','maxlength="500" placeholder="https://example.com"')+'<label class="vault-check"><input type="checkbox" name="favorite" '+(e.favorite?'checked':'')+'> Favourite</label><button class="btn" type="submit">Save encrypted entry</button></form></section>';
      } else if(mode==='generator') html='<section class="vault-panel"><h2>Password generator</h2><p>Randomly generated on this device using the browser’s cryptographic random source.</p><form id="vault-generator"><label>Length: <span id="length-label">20</span><input id="generator-length" name="length" type="range" min="12" max="64" value="20"></label>'+[['upper','Uppercase (A–Z)'],['lower','Lowercase (a–z)'],['digits','Numbers (2–9)'],['symbols','Symbols']].map(([n,l])=>'<label class="vault-check"><input type="checkbox" name="'+n+'" checked> '+l+'</label>').join('')+'<button class="btn" type="submit">Generate password</button></form><label>Generated password<input id="vault-generated" type="text" readonly autocomplete="off" aria-live="polite"></label><div class="row"><button class="btn secondary" data-vaction="copy-generated">Copy password</button><button class="btn secondary" data-vaction="use-generated">Use in a new entry</button></div></section>';
      else if(mode==='settings') html='<section class="vault-panel"><h2>Security preferences</h2><label>Lock after inactivity<select id="vault-timeout"><option value="60000" '+(idleMs===60000?'selected':'')+'>1 minute</option><option value="300000" '+(idleMs===300000?'selected':'')+'>5 minutes</option><option value="900000" '+(idleMs===900000?'selected':'')+'>15 minutes</option></select></label><button class="btn" data-vaction="timeout">Apply timeout</button><h3>Local encryption</h3><p>AES-256-GCM encrypts your entries. PBKDF2-SHA-256 derives the encryption key from your master passphrase using a random salt and 600,000 iterations. The key is kept only while unlocked.</p><p>Settings reset when the page reloads. Hiding the tab, leaving Password Manager, switching accounts and logging out all lock the vault.</p><h3>Classroom prototype limits</h3><p>No cloud sync, autofill, biometrics, one-time-code generator, master-passphrase recovery or backup restore is implemented. Clearing site data loses the vault. This has not received an independent security audit; use fictional credentials for the presentation.</p><p>Encryption cannot protect an unlocked vault from malicious scripts, browser extensions, or an infected device.</p></section>';
    }
    root.innerHTML='<div class="vault-shell">'+heading+'<p class="vault-demo">LOCAL ENCRYPTED DEMO · Use fictional credentials for class.</p>'+html+'<p id="vault-error" role="status" aria-live="polite"></p></div>';
  }
  function filterRows(value) {let found=0;root.querySelectorAll('.vault-item').forEach(row=>{row.hidden=!row.dataset.search.includes(value.toLowerCase());if(!row.hidden)found++;});root.querySelector('#vault-no-results').hidden=found>0||!root.querySelectorAll('.vault-item').length;}
  async function click(event) {
    const b=event.target.closest('[data-vaction]');if(!b || busy)return;touch();const action=b.dataset.vaction;
    try {
      if(action==='lock'){lock();return;}
      if(action==='tab'){mode=b.dataset.mode;selected=null;draw();}
      if(action==='new'){selected=null;mode='form';draw();}
      if(action==='detail'){selected=b.dataset.id;mode='detail';draw();}
      if(action==='edit'){mode='form';draw();}
      if(action==='back'){selected=null;mode='vault';draw();}
      if(action==='reveal'||action==='reveal-entry'){const input=root.querySelector(action==='reveal'?'#vault-secret':'#vault-entry-password'),show=input.type==='password';input.type=show?'text':'password';b.textContent=show?'Hide':'Show';b.setAttribute('aria-pressed',String(show));}
      if(action==='generate-entry')root.querySelector('#vault-entry-password').value=CyberVault.generate();
      if(action==='copy'||action==='copy-generated') {
        const value=action==='copy'?root.querySelector('#vault-secret').value:root.querySelector('#vault-generated').value;
        if(!value)throw Error('Generate a password first.');
        await navigator.clipboard.writeText(value);error('Password copied. Clear your clipboard after use.');
      }
      if(action==='use-generated') {const value=root.querySelector('#vault-generated').value;if(!value)throw Error('Generate a password first.');selected=null;mode='form';draw();root.querySelector('#vault-entry-password').value=value;}
      if(action==='timeout'){idleMs=Number(root.querySelector('#vault-timeout').value);touch();error('Inactivity lock updated for this session.');}
      if(action==='delete-confirm'){error('');b.outerHTML='<button class="btn secondary" data-vaction="delete">Confirm delete</button>';}
      if(action==='delete'){busy=true;await vault.remove(selected);selected=null;mode='vault';draw();}
    } catch(err){error(err.message||'Unable to complete this action.');}finally{busy=false;}
  }
  async function submit(event) {
    if(!event.target.id.startsWith('vault-'))return;event.preventDefault();if(busy)return;
    const form=event.target, fields=new FormData(form), token=generation;
    busy=true;const button=form.querySelector('[type="submit"]');if(button)button.disabled=true;error('Working locally…');
    try {
      if(form.id==='vault-unlock-form') {
        const master=fields.get('master');form.reset();
        if(!vault.exists(account.id)) {if(master!==fields.get('confirm'))throw Error('Master passphrases do not match.');if(!fields.get('understood'))throw Error('Please acknowledge the recovery limitation.');await vault.create(account.id,master);}
        else await vault.unlock(account.id,master);
        if(token!==generation){vault.lock();return;}mode=pendingAdd?'form':'vault';selected=null;pendingAdd=false;draw();touch();
      }
      if(form.id==='vault-entry-form') {
        await vault.put({id:selected,title:fields.get('title'),username:fields.get('username'),password:fields.get('password'),url:fields.get('url'),favorite:fields.get('favorite')==='on'});
        if(token!==generation)return;form.reset();mode='vault';selected=null;draw();touch();error('Entry saved in encrypted browser storage.');
      }
      if(form.id==='vault-generator') {const value=CyberVault.generate(Number(fields.get('length')),['upper','lower','digits','symbols'].filter(g=>fields.get(g)==='on'));root.querySelector('#vault-generated').value=value;error('Generated locally.');}
    } catch(err){if(token===generation)error(err.message||'Unable to save. Browser storage may be unavailable.');}finally{busy=false;if(button?.isConnected)button.disabled=false;}
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)lock();});
  window.addEventListener('pagehide',lock);
  window.addEventListener('storage',event=>{if(account&&event.key===vault.storageKey(account.id))lock();});
  return Object.freeze({mount,detach,lock});
})();
