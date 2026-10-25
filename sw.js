// Guarda o app e os dados no celular para abrir sem internet.
const CACHE='painel-v24';
const BASE=['./','index.html','logo.png','manifest.json','icone-192.png','icone.png','apple-icon.png','dados.json','controles/lista.json','reproducao.html','reproducao.json','lactotropin.html','lactotropin.json','instalar.js','tema.js','avisos.js','badge.png'];
const chave=u=>{const x=new URL(u);return x.origin+x.pathname};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(BASE.map(p=>fetch(p,{cache:'no-store'}).then(r=>r.ok&&c.put(chave(new URL(p,self.registration.scope)),r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const salvo=r=>r.blob().then(b=>{const h=new Headers(r.headers);h.set('X-Salvo','1');return new Response(b,{status:200,headers:h})});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(/script\.google(usercontent)?\.com$/.test(url.hostname))return; // planilha do Lactotropin: sempre direto na rede, nunca guardar
 if(url.origin!==location.origin){ // fontes do Google: usa a guardada, senão busca e guarda
  e.respondWith(caches.match(req).then(m=>m||fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));return r})));return}
 let k=chave(req.url);if(k.endsWith('/index.html'))k=k.slice(0,-10);
 const rede=fetch(req,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(k,cp))}return r});
 const espera=new Promise((ok,no)=>setTimeout(no,5000));
 e.respondWith(Promise.race([rede,espera]).catch(()=>caches.match(k).then(m=>m?salvo(m):rede)));
});
// Avisos diários
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'FBS',body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'Fazenda Boa Sorte',{body:d.body||'',icon:new URL('icone-192.png',self.registration.scope).href,badge:new URL('badge.png',self.registration.scope).href,tag:d.tag||'fbs-dia',renotify:true,data:{url:d.url||'reproducao.html'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL(e.notification.data&&e.notification.data.url||'./',self.registration.scope).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c){c.navigate(u);return c.focus()}}return clients.openWindow(u)}))});
