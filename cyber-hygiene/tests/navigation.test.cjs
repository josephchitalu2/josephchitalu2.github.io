const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path'),dir=path.join(__dirname,'..');
function app(){
 const elements={},nav=['account','dashboard','password-manager','report','verify','guidelines','training','progress'].map(name=>({dataset:{nav:name},active:false,classList:{toggle(c,v){this.owner.active=v;}},setAttribute(){},removeAttribute(){}}));
 nav.forEach(n=>n.classList.owner=n);
 const elem=s=>elements[s]??={innerHTML:'',textContent:'',style:{},classList:{toggle(){}},insertAdjacentHTML(){},showModal(){},close(){}};
 const ctx=vm.createContext({document:{body:{classList:{toggle(){}}},querySelector:elem,querySelectorAll:()=>nav,addEventListener(){}},window:{addEventListener(){},scrollTo(){}},location:{hash:'#training'},localStorage:{getItem:()=>null},CyberVaultUI:{detach(){},mount(node,user){node.mounted=true;}},setTimeout:()=>0,clearTimeout(){}});
 for(const f of ['guidelines.js','app.js'])vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx);
 return{ctx,elements,nav,run:s=>vm.runInContext(s,ctx)};
}
test('menu points to vault, guidelines and training; risk stays available in Home',()=>{
 const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');const nav=html.match(/<nav aria-label="Main navigation">([\s\S]*?)<\/nav>/)[1];
 assert.ok(!nav.includes('href="#risk"'));assert.ok(nav.includes('href="#password-manager"'));assert.ok(nav.includes('href="#guidelines"'));assert.ok(nav.includes('href="#training"'));
 const a=app();a.run("location.hash='#dashboard';render()");assert.ok(a.elements['#main'].innerHTML.includes('href="#risk"'));
 a.run("location.hash='#password-manager';render()");assert.equal(a.elements['#vault-root'].mounted,true);
});
test('training owns learning hub, quizzes and challenge; guidelines has recovery instructions',()=>{
 const a=app();const training=a.elements['#main'].innerHTML;
 assert.match(training,/Learning hub &amp; knowledge checks/);assert.match(training,/href="#challenge"/);assert.match(training,/href="#lesson\/phishing"/);
 a.run("location.hash='#lesson/passwords';render()");assert.ok(a.nav.find(n=>n.dataset.nav==='training').active);assert.match(a.elements['#main'].innerHTML,/data-quiz="passwords"/);
 a.run("location.hash='#guidelines';render()");const guidance=a.elements['#main'].innerHTML;
 assert.match(guidance,/sign out other sessions/);assert.match(guidance,/every other account where it was reused/);assert.match(guidance,/connected apps/);assert.match(guidance,/does not alert anyone/);
 a.run("location.hash='#learn';render()");assert.match(a.elements['#main'].innerHTML,/CYBER TRAINING AWARENESS/);
});
test('all local script and stylesheet references exist',()=>{
 const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
 for(const [,asset] of html.matchAll(/(?:src|href)="([^"#][^"]*\.(?:js|css)(?:\?[^\"]*)?)"/g))assert.ok(fs.existsSync(path.join(dir,asset.split('?')[0])),asset);
});

test('profile offers password storage and Add account opens a vault entry, not platform registration',()=>{
 const a=app();a.run("location.hash='#account';render()");
 assert.match(a.elements['#main'].innerHTML,/Password storage/);
 assert.match(a.elements['#main'].innerHTML,/href="#password-manager\/add">＋ Add account/);
 a.run("location.hash='#signup/password-manager/add'");assert.equal(a.run('authDestination()'),'password-manager/add');
 assert.equal(a.run("authLink('signin')"),'#signin/password-manager/add');
 a.run("location.hash='#signin/password-manager/add'");assert.equal(a.run("authLink('signup')"),'#signup/password-manager/add');
 a.run("location.hash='#signin/https:evil'");assert.equal(a.run('authDestination()'),'dashboard');
});

test('successful sign-in and registration return to the requested password entry form',async()=>{
 for(const formId of ['signinform','signupform']){
  const a=app();let hash='#'+(formId==='signinform'?'signin':'signup')+'/password-manager/add';
  Object.defineProperty(a.ctx.location,'hash',{get:()=>hash,set:v=>{hash=v.startsWith('#')?v:'#'+v;}});
  a.ctx.FormData=class{get(){return 'fictional';}};
  a.ctx.CyberAccounts={authenticate:async()=>({id:'alice',name:'Alice'}),register:async()=>({id:'alice',name:'Alice'})};
  let mounted;
  a.ctx.CyberVaultUI.mount=(node,user,add)=>{mounted={user,add};};
  a.ctx.localStorage.setItem=()=>{};
  a.ctx.form={id:formId,querySelector:()=>({textContent:'Submit',isConnected:true}),reset(){}};
  await a.run('submitAccount(form)');
  assert.equal(hash,'#password-manager/add');assert.equal(mounted.user.id,'alice');assert.equal(mounted.add,true);
 }
});
