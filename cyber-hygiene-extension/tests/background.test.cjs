const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function setup() {
  const events = {};
  const event = name => ({addListener(fn,filter,options) {events[name]={fn,filter,options};}});
  let allowed=true;
  let info={state:'secure',protocolVersion:'TLSv1.3',certificates:[]};
  let reads=0;
  const browser={
    webRequest:{onBeforeRequest:event('before'),onHeadersReceived:event('headers'),onErrorOccurred:event('error'),
      getSecurityInfo:async () => {reads++; return await info;}},
    permissions:{contains:async()=>allowed,onRemoved:event('removed')},
    tabs:{query:async()=>[{id:1,url:'https://example.com/page'}],onRemoved:event('tabRemoved'),onUpdated:event('updated')},
    runtime:{id:'test',getURL:p=>'moz-extension://test/'+p,onMessage:event('message')}
  };
  const ctx=vm.createContext({browser,URL,Date,Map});
  vm.runInContext(fs.readFileSync(require.resolve('../core.js'),'utf8'),ctx);
  vm.runInContext(fs.readFileSync(require.resolve('../background.js'),'utf8'),ctx);
  return {events, setAllowed:value=>allowed=value,setInfo:value=>info=value,reads:()=>reads,
    query:()=>events.message.fn({type:'connection'},{id:'test',url:'moz-extension://test/popup.html'})};
}
const request={tabId:1,requestId:'a',url:'https://example.com/path'};
test('blocking main-frame listener retrieves actual TLS observation',async()=>{
  const s=setup(); assert.deepEqual(Array.from(s.events.headers.options),['blocking']);
  assert.deepEqual(Array.from(s.events.headers.filter.types),['main_frame']);
  s.events.before.fn(request); await s.events.headers.fn(request);
  const result=await s.query(); assert.equal(result.observation.state,'secure');
  assert.equal(result.observation.protocol,'TLSv1.3'); assert.equal(result.origin,'https://example.com');
});
test('denied host never reads certificates or returns previous observation',async()=>{
  const s=setup();s.setAllowed(false);await s.events.headers.fn(request);
  assert.equal(s.reads(),0); assert.equal((await s.query()).observation,null);
});
test('navigation during async certificate lookup cannot expose stale result',async()=>{
  const s=setup();let resolve; s.setInfo(new Promise(r=>resolve=r));
  const pending=s.events.headers.fn(request); await Promise.resolve();
  s.events.before.fn(request);resolve({state:'secure'});await pending;
  assert.equal((await s.query()).observation,null);
});
test('navigation and permission revocation clear observations',async()=>{
  const s=setup();await s.events.headers.fn(request);s.events.updated.fn(1,{url:'https://example.com/new'});
  assert.equal((await s.query()).observation,null);
  await s.events.headers.fn(request);s.events.removed.fn();assert.equal((await s.query()).observation,null);
});
test('failed connection stays failed and other extension pages cannot read results',async()=>{
  const s=setup();s.events.error.fn({...request,error:'SEC_ERROR_UNKNOWN_ISSUER'});
  assert.equal((await s.query()).observation.state,'failed');
  assert.equal(await s.events.message.fn({type:'connection'},{id:'other',url:'https://example.com'}),undefined);
});
test('late error from an old request cannot replace a newer observation',async()=>{
  const s=setup();s.events.before.fn(request);
  s.events.before.fn({...request,requestId:'b'});
  await s.events.headers.fn({...request,requestId:'b'});
  s.events.error.fn({...request,error:'old error'});
  assert.equal((await s.query()).observation.state,'secure');
});
test('revocation while certificate lookup is pending invalidates its result',async()=>{
  const s=setup();let resolve;s.setInfo(new Promise(r=>resolve=r));
  const pending=s.events.headers.fn(request);await Promise.resolve();
  s.events.removed.fn();resolve({state:'secure'});await pending;
  assert.equal((await s.query()).observation,null);
});
