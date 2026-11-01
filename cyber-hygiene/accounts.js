'use strict';
/* Device-local demo accounts. This is not a server authorization boundary. */
globalThis.CyberAccounts=(()=>{
const STORE='cyber-hygiene-accounts-v1',ROUNDS=600000;
function registry(){const a=JSON.parse(localStorage.getItem(STORE)||'[]');if(!Array.isArray(a))throw new Error('Account storage is invalid.');return a}
function list(){return registry().map(({id,username,name})=>({id,username,name}))}
function username(value){const n=String(value||'').trim().toLowerCase();if(!/^[a-z0-9][a-z0-9._-]{2,39}$/.test(n))throw new Error('Use 3–40 letters, numbers, dots, underscores or hyphens for your username.');return n}
function bytesToHex(bytes){return [...bytes].map(x=>x.toString(16).padStart(2,'0')).join('')}
function hexToBytes(hex){if(typeof hex!=='string'||hex.length!==32||!/^[a-f0-9]+$/.test(hex))throw new Error('Account data is invalid.');return Uint8Array.from(hex.match(/../g),x=>parseInt(x,16))}
function ensureCrypto(){if(!globalThis.crypto?.subtle)throw new Error('Password sign-in needs a modern browser on HTTPS. You can still use guest mode.')}
async function derive(password,salt){ensureCrypto();const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return bytesToHex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:ROUNDS},key,256)))}
async function register({name,login,password,confirm}){
ensureCrypto();const n=String(name||'').trim();if(!n||n.length>40)throw new Error('Enter a display name of up to 40 characters.');
const u=username(login);if(typeof password!=='string'||password.length<12||password.length>128)throw new Error('Choose a password between 12 and 128 characters.');if(password!==confirm)throw new Error('The passwords do not match.');
if(registry().some(x=>x.username===u))throw new Error('That username already exists on this device.');
const salt=crypto.getRandomValues(new Uint8Array(16)),hash=await derive(password,salt);
const all=registry();if(all.some(x=>x.username===u))throw new Error('That username already exists on this device.');if(all.length>=20)throw new Error('This demo supports up to 20 accounts per browser.');
const account={id:crypto.randomUUID(),name:n,username:u,salt:bytesToHex(salt),hash,iterations:ROUNDS,createdAt:new Date().toISOString()};
all.push(account);localStorage.setItem(STORE,JSON.stringify(all));return {id:account.id,name:n,username:u};
}
async function authenticate({login,password}){
ensureCrypto();const u=String(login||'').trim().toLowerCase();if(typeof password!=='string'||password.length>128)throw new Error('Incorrect username or password.');
const a=registry().find(x=>x.username===u);
const salt=a?hexToBytes(a.salt):new Uint8Array(16);
const hash=await derive(password,salt);
if(!a||typeof a.hash!=='string'||hash.length!==a.hash.length)throw new Error('Incorrect username or password.');
let diff=0;for(let i=0;i<hash.length;i++)diff|=hash.charCodeAt(i)^a.hash.charCodeAt(i);if(diff)throw new Error('Incorrect username or password.');
return {id:a.id,name:a.name,username:a.username};
}
return Object.freeze({list,register,authenticate});
})();
