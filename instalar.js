// Aviso "Instalar app": aparece só no navegador, nunca dentro do app instalado.
(function(){
 const app=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
 let fechado=false;try{fechado=localStorage.getItem('instalar_fechado')==='1'}catch(e){}
 if(app||fechado)return;
 const ua=navigator.userAgent, ios=/iPhone|iPad|iPod/.test(ua), samsung=/SamsungBrowser/.test(ua), android=/Android/.test(ua);
 const css=document.createElement('style');
 css.textContent=`.inst{position:fixed;left:12px;right:12px;bottom:calc(70px + env(safe-area-inset-bottom,0px));z-index:20;max-width:520px;margin:0 auto;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;box-shadow:0 6px 20px rgba(0,0,0,.22);display:grid;gap:8px;font-size:.95rem}
 .inst b{font-size:1rem}.inst .acts{display:flex;gap:8px;flex-wrap:wrap}
 .inst button{font:700 .95rem var(--body);padding:9px 14px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--fg);cursor:pointer}
 .inst button.pri{background:var(--accent);border-color:var(--accent);color:var(--surface)}
 @media(min-width:900px){.inst{bottom:16px}}`;
 document.head.appendChild(css);
 const box=document.createElement('div');box.className='inst';box.setAttribute('role','dialog');box.setAttribute('aria-label','Instalar app');
 const fechar=()=>{box.remove();try{localStorage.setItem('instalar_fechado','1')}catch(e){}};
 const mostra=(html,acts)=>{box.innerHTML=html+'<div class="acts">'+acts+'<button id="inst_x">Agora não</button></div>';document.body.appendChild(box);box.querySelector('#inst_x').onclick=fechar};
 const link=location.origin+location.pathname.replace(/[^/]*$/,'');
 if(samsung){
  mostra(`<b>Instale este app pelo Chrome</b><span>No navegador Internet da Samsung o Android pode bloquear a instalação. Copie o link e abra no Chrome.</span><span class="note" style="user-select:all;word-break:break-all">${link}</span>`,'<button class="pri" id="inst_c">Copiar link</button>');
  box.querySelector('#inst_c').onclick=e=>{navigator.clipboard&&navigator.clipboard.writeText(link).then(()=>e.target.textContent='Copiado ✓').catch(()=>{})};
  return;
 }
 if(ios){
  setTimeout(()=>mostra('<b>Instalar o app no iPhone</b><span>No Safari, toque em <b>compartilhar</b> (quadrado com seta) e depois em <b>Adicionar à Tela de Início</b>.</span>',''),1500);return;
 }
 let ev=null;
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();ev=e;
  mostra('<b>Instalar o app</b><span>Fica com ícone na tela, abre em tela cheia e funciona sem internet.</span>','<button class="pri" id="inst_i">Instalar</button>');
  box.querySelector('#inst_i').onclick=()=>{ev.prompt();ev.userChoice.finally(()=>box.remove())};
 });
 addEventListener('appinstalled',()=>box.remove());
 if(android)setTimeout(()=>{if(!ev&&!box.isConnected)mostra('<b>Instalar o app</b><span>Toque em <b>⋮</b> no navegador e escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>. Se o link abriu dentro do WhatsApp, escolha antes <b>Abrir no Chrome</b>.</span>','')},4000);
})();
