const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto').webcrypto;
const el={},events={},data=new Map();function element(s){return el[s]??={innerHTML:'',textContent:'',value:'',checked:true,hidden:false,files:[],style:{setProperty(){}},dataset:{},querySelectorAll:()=>[],addEventListener:(n,f)=>{events[s+':'+n]=f},showModal(){},close(){},click(){}}}
const ctx={crypto,document:{querySelector:element,documentElement:{style:{setProperty(){}}},addEventListener:(n,f)=>events[n]=f,createElement:()=>({click(){}})},localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)},console,FormData:class{constructor(f){this.f=f.fields}get(k){return this.f[k]}},Blob,URL:{createObjectURL:()=>'',revokeObjectURL(){}},setTimeout:()=>0,clearTimeout(){}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('model.js','utf8'),ctx);const M=ctx.PowerModel;
assert.equal(M.calculate(M.demo()).total,1090);assert.equal(M.calculate(M.demo()).status,'overload');
for(const [load,status] of [[799,'balanced'],[800,'warning'],[1000,'limit'],[1001,'overload']]){const h=M.demo();h.appliances=[{id:M.id(),name:'Test',watts:load,count:1,enabled:true}];assert.equal(M.calculate(h).status,status)}
const h=M.demo();h.appliances[2].enabled=false;assert.equal(M.calculate(h).total,190);assert.equal(M.calculate(h).headroom,810);
h.appliances=[{id:M.id(),name:'Load',watts:200,count:1,enabled:true}];assert.equal(M.calculate(h).runtime,4.32);
h.appliances=[];assert.equal(M.calculate(h).runtime,null);
for(const n of ['NaN','Infinity',-1,0,true,null,''])assert.throws(()=>M.positive(n,'Value'));
assert.throws(()=>M.count(1.2));assert.throws(()=>M.validate({...h,inverter_w:0}));assert.throws(()=>M.parse({schema_version:true,household:h}));
const dupe=M.demo();dupe.appliances.push(dupe.appliances[0]);assert.throws(()=>M.validate(dupe));
vm.runInContext(fs.readFileSync('app.js','utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);
const click=(action,id)=>events.click({target:{closest:()=>({dataset:{action,id},disabled:false})}});
const kettle=run('home.appliances[2].id');click('toggle',kettle);assert.equal(run('M.calculate(home).total'),190);assert.ok(data.has('zescoload-track-web-v1'));
const first=run('home.appliances[0].id');click('increase',first);assert.equal(run('home.appliances[0].count'),2);click('decrease',first);assert.equal(run('home.appliances[0].count'),1);
events.submit({target:{id:'applianceform',dataset:{id:''},fields:{name:'Desk lamp',watts:'25',count:'2'}},preventDefault(){}});
assert.equal(run('home.appliances.length'),4);assert.equal(run('M.calculate(home).total'),240);
const newId=run('home.appliances[3].id');click('remove',newId);click('confirm');assert.equal(run('home.appliances.length'),3);
run("home.appliances[0].name='<img src=x onerror=alert(1)>';render()");assert.ok(!element('#appliancegrid').innerHTML.includes('<img src=x'));
click('settings');assert.ok(element('#dialogbody').innerHTML.includes('System settings'));
events.submit({target:{id:'settingsform',fields:{limit:'2000',warning:'75',batteryenabled:null}},preventDefault(){}});
assert.equal(run('home.inverter_w'),2000);assert.equal(run('home.battery'),null);
click('demo');click('confirm');assert.equal(run('M.calculate(home).total'),1090);
console.log('PASS: load states, runtime, zero load, validation, duplicate IDs, toggles, quantities, add/remove, persistence, escaped names, settings and demo reset.');
