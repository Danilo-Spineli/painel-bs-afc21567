// Avisos no celular: o celular gera um código anônimo (sem número, nome ou e-mail)
// que a pessoa manda para o Danilo cadastrar. O envio diário é feito pelo GitHub.
(function(){
 const CHAVE='BMo96EQtufIs-vg4sDDIBWDQuaDr5kEUqqvjPc8U19JUFKmJJerboaepEKSy7wzeAUgOIipC3BoAWq0dPxUgbB0';
 const b64=s=>{const p='='.repeat((4-s.length%4)%4),r=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from([...r].map(c=>c.charCodeAt(0)))};
 const suporta=('serviceWorker' in navigator)&&('PushManager' in window)&&('Notification' in window);
 window.addEventListener('DOMContentLoaded',()=>{
  const inn=document.querySelector('#sheet .in');if(!inn)return;
  const box=document.createElement('div');box.style.cssText='display:grid;gap:8px;margin-top:10px';inn.appendChild(box);
  const app=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  const mostraCodigo=sub=>{const cod=btoa(JSON.stringify(sub));
   box.innerHTML='<div style="font-weight:700">Avisos</div><p class="note">Avisos ativos neste celular. Se ainda não mandou, copie o código e mande para o Danilo.</p><textarea id="avcod" readonly rows="3" style="width:100%;font:12px monospace;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--fg);padding:8px">'+cod+'</textarea><button class="ctl" id="avcop" style="grid-template-columns:1fr"><b style="font-size:1.05rem">Copiar código</b></button>';
   box.querySelector('#avcop').onclick=e=>{const t=box.querySelector('#avcod');(navigator.clipboard?navigator.clipboard.writeText(cod):Promise.reject()).then(()=>e.currentTarget.querySelector('b').textContent='Copiado ✓').catch(()=>{t.select()})}};
  const inicial=()=>{
   if(!suporta){box.innerHTML='<div style="font-weight:700">Avisos</div><p class="note">Este navegador não aceita avisos.</p>';return}
   if(!app){box.innerHTML='<div style="font-weight:700">Avisos</div><p class="note">Instale o app na tela inicial para receber avisos.</p>';return}
   if(Notification.permission==='denied'){box.innerHTML='<div style="font-weight:700">Avisos</div><p class="note">As notificações deste app estão bloqueadas nas configurações do celular.</p>';return}
   box.innerHTML='<div style="font-weight:700">Avisos</div><p class="note">Secagem (um dia antes e no dia) e parto previsto (no dia), às 7h.</p><button class="ctl" id="avon" style="grid-template-columns:1fr"><b style="font-size:1.05rem">Ativar avisos</b><small>neste celular</small></button>';
   box.querySelector('#avon').onclick=async()=>{try{
     if(await Notification.requestPermission()!=='granted'){inicial();return}
     const reg=await navigator.serviceWorker.ready;
     const sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64(CHAVE)});
     mostraCodigo(sub.toJSON());
    }catch(e){box.insertAdjacentHTML('beforeend','<p class="note">Não consegui ativar. Abra o app com internet e tente de novo.</p>')}};
  };
  if(suporta)navigator.serviceWorker.ready.then(r=>r.pushManager.getSubscription()).then(s=>s?mostraCodigo(s.toJSON()):inicial()).catch(inicial);else inicial();
 });
})();
