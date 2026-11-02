const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{webcrypto}=require('node:crypto');
function setup(){
 const values=new Map(),events={},windowEvents={},timers=new Map();let timerId=0;
 const nodes={};const root={isConnected:true,innerHTML:'',events:{},addEventListener(n,f){this.events[n]=f;},querySelector:s=>nodes[s]??={textContent:'',value:'',setAttribute(){},isConnected:true},querySelectorAll:()=>[]};
 const document={hidden:false,addEventListener:(n,f)=>events[n]=f};
 const ctx=vm.createContext({crypto:webcrypto,TextEncoder,TextDecoder,Uint8Array,URL,btoa,atob,localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)},document,window:{addEventListener:(n,f)=>windowEvents[n]=f},navigator:{clipboard:{writeText:async()=>{}}},location:{hash:'#password-manager'},setTimeout:f=>{const id=++timerId;timers.set(id,f);return id;},clearTimeout:id=>timers.delete(id),FormData:class{constructor(form){this.fields={...form.fields};}get(n){return this.fields[n]??null;}}});
 for(const file of ['vault.js','vault-ui.js'])vm.runInContext(fs.readFileSync(require.resolve('../'+file),'utf8'),ctx);
 const submit=async(id,fields)=>root.events.submit({preventDefault(){},target:{id,fields,querySelector:()=>({disabled:false,isConnected:false}),reset(){}}});
 const click=async(action,data={})=>root.events.click({target:{closest:()=>({dataset:{vaction:action,...data},setAttribute(){}})}});
 return{ctx,root,values,events,windowEvents,timers,submit,click,ui:ctx.CyberVaultUI};
}
test('guest view, separate master unlock and CRUD screens work through UI events',async()=>{
 const s=setup();s.ui.mount(s.root,null);assert.match(s.root.innerHTML,/Sign in to a local account/);
 s.ui.mount(s.root,{id:'alice',name:'Alice'});assert.match(s.root.innerHTML,/Create your vault/);
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase',confirm:'different-passphrase',understood:'on'});assert.match(s.root.querySelector('#vault-error').textContent,/do not match/);
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase',confirm:'fictional-master-passphrase',understood:'on'});assert.match(s.root.innerHTML,/No credentials yet/);
 await s.click('new');assert.match(s.root.innerHTML,/Add password/);
 await s.submit('vault-entry-form',{title:'<img src=x>',username:'fictional',password:'fake-secret',url:'https://example.com',favorite:'on'});
 assert.match(s.root.innerHTML,/&lt;img src=x&gt;/);assert.ok(!s.root.innerHTML.includes('fake-secret'));
 await s.click('tab',{mode:'generator'});assert.match(s.root.innerHTML,/Password generator/);
 await s.submit('vault-generator',{length:'20',upper:'on',lower:'on',digits:'on',symbols:'on'});assert.equal(s.root.querySelector('#vault-generated').value.length,20);
 await s.click('tab',{mode:'settings'});assert.match(s.root.innerHTML,/Security preferences/);
 await s.click('lock');assert.match(s.root.innerHTML,/Unlock your vault/);
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase'});assert.match(s.root.innerHTML,/&lt;img src=x&gt;/);
});
test('hidden tab, inactivity, page departure and account switching lock the vault',async()=>{
 const s=setup();const user={id:'alice',name:'Alice'};
 s.ui.mount(s.root,user);await s.submit('vault-unlock-form',{master:'fictional-master-passphrase',confirm:'fictional-master-passphrase',understood:'on'});
 s.ctx.document.hidden=true;s.events.visibilitychange();assert.match(s.root.innerHTML,/Unlock your vault/);s.ctx.document.hidden=false;
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase'});[...s.timers.values()][0]();assert.match(s.root.innerHTML,/Unlock your vault/);
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase'});s.ui.detach();s.ui.mount(s.root,user);assert.match(s.root.innerHTML,/Unlock your vault/);
 await s.submit('vault-unlock-form',{master:'fictional-master-passphrase'});s.ui.mount(s.root,{id:'bob',name:'Bob'});assert.match(s.root.innerHTML,/Create your vault/);
 s.ui.mount(s.root,user);assert.match(s.root.innerHTML,/Unlock your vault/);
});
