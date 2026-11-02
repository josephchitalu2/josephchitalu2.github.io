'use strict';
(()=>{
const drawer=document.getElementById('workspace-menu');
const toggle=document.getElementById('menu-toggle');
if(!drawer||!toggle)return;
function close(){if(drawer.open)drawer.close()}
toggle.addEventListener('click',()=>{if(drawer.open){close();return}drawer.showModal();toggle.setAttribute('aria-expanded','true')});
drawer.addEventListener('close',()=>toggle.setAttribute('aria-expanded','false'));
drawer.addEventListener('click',event=>{
 if(event.target.closest('[data-menu-close]')||event.target.closest('a[href]')||event.target.closest('[data-logout]')){close();return}
 if(event.target===drawer){const r=drawer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close()}
});
window.addEventListener('hashchange',close);
})();
