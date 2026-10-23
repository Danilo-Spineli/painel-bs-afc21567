// Guarda o app e os dados no celular para abrir sem internet.
const CACHE='painel-v1';
const BASE=['./','index.html','logo.png','manifest.json','icone-192.png','icone.png','apple-icon.png','dados.json','controles/lista.json'];
const chave=u=>{const x=new URL(u);return x.origin+x.pathname};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(BASE.map(p=>fetch(p,{cache:'no-store'}).then(r=>r.ok&&c.put(chave(new URL(p,self.registration.scope)),r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const salvo=r=>r.blob().then(b=>{const h=new Headers(r.headers);h.set('X-Salvo','1');return new Response(b,{status:200,headers:h})});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==location.origin){ // fontes do Google: usa a guardada, senão busca e guarda
  e.respondWith(caches.match(req).then(m=>m||fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(req,cp));return r})));return}
 const k=req.mode==='navigate'?chave(new URL('./',self.registration.scope)):chave(req.url);
 const rede=fetch(req,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put(k,cp))}return r});
 const espera=new Promise((ok,no)=>setTimeout(no,5000));
 e.respondWith(Promise.race([rede,espera]).catch(()=>caches.match(k).then(m=>m?salvo(m):rede)));
});
