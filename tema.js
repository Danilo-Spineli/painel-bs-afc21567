// Escolha de tema: Sistema (padrão), Claro, Escuro e Fazenda. Fica guardada no celular.
(function(){
 const OP=[['sistema','Sistema','segue o celular'],['light','Claro',''],['dark','Escuro','']];
 const atual=()=>{try{return localStorage.getItem('tema')||'sistema'}catch(e){return 'sistema'}};
 const aplica=t=>{const r=document.documentElement;if(t==='sistema')delete r.dataset.theme;else r.dataset.theme=t};
 window.addEventListener('DOMContentLoaded',()=>{
  const inn=document.querySelector('#sheet .in');if(!inn)return;
  const box=document.createElement('div');box.style.cssText='display:grid;gap:8px;margin-top:10px';
  const desenha=()=>{const a=atual();box.innerHTML='<div style="font-weight:700">Aparência</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+OP.map(([k,n,d])=>`<button class="ctl" data-tema="${k}" aria-current="${a===k}" style="grid-template-columns:1fr"><b style="font-size:1.05rem">${n}</b>${d?`<small>${d}</small>`:''}</button>`).join('')+'</div>';
   box.querySelectorAll('[data-tema]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('tema',b.dataset.tema)}catch(e){}aplica(b.dataset.tema);desenha()})};
  desenha();inn.appendChild(box);
 });
})();
