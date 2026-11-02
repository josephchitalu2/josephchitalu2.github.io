const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const {webcrypto} = require('node:crypto');
function setup() {
  const values=new Map();let fail=false;
  const storage={getItem:k=>values.get(k)||null,setItem:(k,v)=>{if(fail)throw Error('Quota exceeded');values.set(k,v);}};
  const ctx=vm.createContext({crypto:webcrypto,URL,TextEncoder,TextDecoder,Uint8Array,btoa,atob,localStorage:storage});
  vm.runInContext(fs.readFileSync(require.resolve('../vault.js'),'utf8'),ctx);
  return {C:ctx.CyberVault,values,storage,setFail:v=>fail=v};
}
const master='class-demo-master-passphrase';
const entry={title:'Student portal DEMO',username:'fictional-student',password:'fictional-secret-123',url:'https://portal.example',favorite:true};
test('encrypted vault survives reload; wrong passphrase fails; no plaintext persists',async()=>{
  const s=setup(),v=s.C.session();await v.create('alice',master);const id=await v.put(entry);
  const raw=s.values.get(v.storageKey('alice'));
  for(const text of [master,entry.password,entry.title,entry.username,entry.url])assert.ok(!raw.includes(text));
  const metadata=JSON.parse(raw);assert.equal(metadata.algorithm,'AES-GCM');assert.equal(metadata.iterations,600000);
  assert.equal(Buffer.from(metadata.iv,'base64').length,12);assert.equal(Buffer.from(metadata.salt,'base64').length,16);
  v.lock();assert.throws(()=>v.list(),/Unlock/);
  const reloaded=s.C.session();await assert.rejects(reloaded.unlock('alice','incorrect-master-passphrase'),/Unable to unlock/);
  assert.equal(reloaded.isOpen('alice'),false);await reloaded.unlock('alice',master);
  assert.equal(reloaded.list()[0].password,entry.password);assert.equal(reloaded.list()[0].id,id);
  assert.equal(reloaded.isOpen('bob'),false);
});
test('add edit delete, fresh IV per write, safe URLs and immutable list copies',async()=>{
  const s=setup(),v=s.C.session();await v.create('alice',master);const id=await v.put(entry);
  const iv1=v.backup().iv;const copy=v.list();copy[0].password='mutated';assert.equal(v.list()[0].password,entry.password);
  await v.put({...entry,id,password:'edited-fictional-secret'});assert.notEqual(v.backup().iv,iv1);assert.equal(v.list().length,1);
  await assert.rejects(v.put({...entry,url:'javascript:alert(1)'}),/HTTP/);
  await assert.rejects(v.put({...entry,url:'https://user:secret@example.com'}),/HTTP/);
  await assert.rejects(v.put({...entry,password:''}),/Invalid/);
  await v.remove(id);assert.equal(v.list().length,0);v.lock();await v.unlock('alice',master);assert.equal(v.list().length,0);
});
test('tampering and moving ciphertext between accounts fail authentication',async()=>{
  const s=setup(),v=s.C.session();await v.create('alice',master);await v.put(entry);
  const original=s.values.get(v.storageKey('alice'));s.values.set(v.storageKey('bob'),original);
  await assert.rejects(v.unlock('bob',master),/Unable to unlock/);
  const altered=JSON.parse(original);const bytes=Buffer.from(altered.ciphertext,'base64');bytes[0]^=1;altered.ciphertext=bytes.toString('base64');
  s.values.set(v.storageKey('alice'),JSON.stringify(altered));await assert.rejects(v.unlock('alice',master),/Unable to unlock/);
});
test('storage errors do not claim successful save; concurrent edit conflicts lock',async()=>{
  const s=setup(),v=s.C.session();await v.create('alice',master);await v.put(entry);
  const snapshot=s.values.get(v.storageKey('alice'));s.setFail(true);
  await assert.rejects(v.put({...entry,title:'Not saved'}),/Quota/);assert.equal(v.list().length,1);assert.equal(s.values.get(v.storageKey('alice')),snapshot);
  s.setFail(false);const other=s.C.session();await other.unlock('alice',master);await other.put({...entry,title:'Other tab'});
  await assert.rejects(v.put({...entry,title:'Stale edit'}),/another tab/);assert.equal(v.isOpen('alice'),false);
});
test('locking during derivation or save cancels the operation',async()=>{
  const s=setup(),v=s.C.session();const pending=v.create('alice',master);v.lock();await assert.rejects(pending,/cancelled/);assert.equal(v.exists('alice'),false);
  await v.create('alice',master);const save=v.put(entry);v.lock();await assert.rejects(save,/locked/);await v.unlock('alice',master);assert.equal(v.list().length,0);
});
test('generator uses requested groups with valid bounds and fresh output',()=>{
  const {C}=setup();const values=new Set();
  for(let i=0;i<40;i++){const p=C.generate(20);assert.equal(p.length,20);assert.match(p,/[A-Z]/);assert.match(p,/[a-z]/);assert.match(p,/[2-9]/);assert.match(p,/[!@#$%&*+\-=?]/);values.add(p);}
  assert.equal(values.size,40);assert.match(C.generate(12,['digits']),/^[2-9]{12}$/);
  assert.throws(()=>C.generate(11),/12–64/);assert.throws(()=>C.generate(65),/12–64/);assert.throws(()=>C.generate(12,[]),/at least/);
});
