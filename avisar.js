// Roda todo dia no GitHub às 7h (Brasília). Monta o aviso do dia e manda para os celulares cadastrados.
// Regras do Danilo: secagem -> aviso um dia antes e no dia; parto previsto -> aviso no dia; Lactotropin -> aviso na véspera.
// Vaca que não aparece no último controle não está sendo ordenhada (é dita no aviso, não decide nada).
const fs=require('fs'), webpush=require('web-push');
const R=JSON.parse(fs.readFileSync('reproducao.json','utf8')), D=JSON.parse(fs.readFileSync('dados.json','utf8'));
const hoje=process.env.HOJE?(([d,m,y])=>new Date(y,m-1,d))(process.env.HOJE.split('/').map(Number)):new Date(new Date().toLocaleString('en-US',{timeZone:'America/Sao_Paulo'}));hoje.setHours(0,0,0,0);
const dt=s=>{const[d,m,y]=s.split('/').map(Number);return new Date(y<100?2000+y:y,m-1,d)};
const dif=s=>Math.round((dt(s)-hoje)/864e5);
const ord=new Set(D.vac.map(c=>c.v));
const L=[];
const secHoje=R.secar.filter(s=>dif(s.sec)===0), secAmanha=R.secar.filter(s=>dif(s.sec)===1);
const nota=s=>ord.has(s.v)?s.v:`${s.v} (já fora do controle de ${D.cfg.at})`;
if(secHoje.length)L.push('Secar hoje: '+secHoje.map(nota).join(', '));
if(secAmanha.length)L.push('Secar amanhã: '+secAmanha.map(nota).join(', '));
const parHoje=R.gestantes.filter(g=>dif(g.parto)===0);
if(parHoje.length)L.push('Parto previsto hoje: '+parHoje.map(g=>g.v+(g.cat==='novilha'?' (novilha)':'')).join(', '));
// Lactotropin (regra do Danilo): aviso só na véspera, às 7h (no dia, às 7h, já estão aplicando).
let lacAmanha=null;
try{const LT=JSON.parse(fs.readFileSync('lactotropin.json','utf8'));
 LT.datas.forEach((d,i)=>{if(dif(d)===1){const sim=LT.vacas.filter(v=>ord.has(v[0])&&v[1][i]).length;lacAmanha=d;L.push(`Lactotropin amanhã (${d.slice(0,5)}): ${sim} vacas SIM`)}});
}catch(e){}
const teste=process.env.TESTE==='1';
if(!L.length&&!teste){console.log('::notice::Nada para avisar hoje.');process.exit(0)}
const dia=hoje.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'});
const msg={title:teste?'FBS · aviso de teste'+(process.env.HOJE?' (simulando '+process.env.HOJE.slice(0,5)+')':''):'FBS · '+dia,body:teste?(L.length?L.join('\n'):'Os avisos estão funcionando. Hoje não há secagem nem parto previsto.'):L.join('\n'),url:(lacAmanha&&!secHoje.length&&!secAmanha.length&&!parHoje.length)?'lactotropin.html':'reproducao.html'+(secHoje.length||secAmanha.length?'#secagens':parHoje.length?'#partos':'')};
webpush.setVapidDetails('mailto:painel@users.noreply.github.com',process.env.VAPID_PUBLICA,process.env.VAPID_PRIVADA);
const subs=(process.env.ASSINATURAS||'').split(/[\s,]+/).filter(Boolean).map(c=>JSON.parse(Buffer.from(c,'base64').toString()));
console.log(`::notice::Aviso: ${msg.title} | ${L.length} linha(s) | ${subs.length} celular(es)`);
Promise.allSettled(subs.map(s=>webpush.sendNotification(s,JSON.stringify(msg),{urgency:'high',TTL:43200}))).then(r=>{
 r.forEach((x,i)=>console.log(`::notice::celular ${i+1}: `+(x.status==='fulfilled'?'enviado '+x.value.statusCode:'falhou '+(x.reason&&x.reason.statusCode)+' '+String(x.reason&&x.reason.body||'').slice(0,120))));
 if(r.length&&r.every(x=>x.status!=='fulfilled'))process.exit(1)});
