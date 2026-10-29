# Painel de controle leiteiro

Versões e o que mudou em cada uma: `CHANGELOG.md` (formato maior.média.menor). A cada mudança, acrescente a linha e atualize "Versão atual".

Site estático (GitHub Pages) instalado como app no celular.

## Atualizar com um controle novo
1. Substitua **só** `dados.json` pelos dados do controle novo (mesmo formato; `cfg.data_iso` = data do controle).
2. Rode `python3 arquivar.py` antes do commit. Ele guarda a cópia em `controles/AAAA-MM-DD.json` e refaz `controles/lista.json`, que alimenta o menu ☰ de controles antigos.
   (O workflow `.github/workflows/arquivar.yml` faz o mesmo automaticamente se alguém esquecer.)
3. Não mexa em `index.html` para trocar dados. Ele lê tudo dos JSON.
4. Commits sem nome nem e-mail pessoal (autor `Painel <painel@users.noreply.github.com>` ou `Claude <noreply@anthropic.com>`).

## Atualizar a reprodução (Prodap)
- Fonte: PDFs mais recentes da pasta do Drive `01_Prodap_Veterinario/Reproducao` ("Matrizes Gestantes" e "Matrizes a secar").
- Substitua `reproducao.json` inteiro (não tem histórico; sempre o Prodap mais recente). Campos: `data`, `gestantes[]` (v, cat, ult, ins, doses, touro, parto, raca, iep, partos), `secar[]` (v, parto, sec), `resumo`, `touros`, `previsao[]` (mês, partos novilhas, partos vacas, total, secagens, matrizes em lactação).
- Regra do Danilo: vaca que não aparece no último controle de leite não está sendo ordenhada (tratar como seca). A tela cruza isso sozinha com `dados.json`.
- Antes de substituir, copie do `reproducao.json` atual para o campo `anterior` do novo: `data`, `total`, `lactacao`, `secas`, `novilhas`, `is_geral`, `iep_medio`, `partos_medio` (aparece discreto embaixo de cada número do Resumo; a divisão lactação/secas/novilhas fica escondida, abre com um toque).
- Confira: total de gestantes, contagem por categoria e por touro iguais ao PDF.

## Regras do Danilo (valem para toda atualização)
1. Vaca que não aparece no controle de leite não está sendo ordenhada: tratar como seca.
2. Parto previsto já passou e a vaca não tem medida no último controle: ATENÇÃO (pode estar atrasada e não ter parido). Aparece no topo do Resumo da Reprodução.
3. Não inventar critérios (ex.: limites de DEL para trocar de lote). Critérios novos vêm dele.

## Avisos no celular (regras do Danilo)
- Secagem: aviso na véspera e no dia. Parto previsto: aviso no dia. Lactotropin: véspera às 7h ("Amanhã (dd/mm) tem Lactotropin: aplicar em N vacas") e no dia às 6h ("Hoje tem Lactotropin: aplicar em N vacas"), rodada separada no cron 5h40 com MODO=lacto. Teste manual: campo modo = lacto. Sem nada no dia, não envia.
- Enviado por `.github/workflows/avisos.yml` + `avisar.js`, com prioridade alta (Samsung segura avisos normais).
- Segredos (Settings → Secrets → Actions): `VAPID_PRIVADA`, `ASSINATURAS` (os dois primeiros celulares) e `ASSINATURAS_3`, `_4`, `_5` (um celular novo em cada; o GitHub não deixa ler um segredo salvo, então cada celular novo vai num segredo novo). Para mais de 5, acrescentar o nome em `avisos.yml`.
- O relógio do GitHub (`schedule`) atrasa horas. Plano combinado: alarmes do Apps Script disparando o workflow (ver pendências no contexto do Drive). Até lá, disparar à mão quando o horário importar.
- Recado livre: Run workflow com `mensagem` (texto) e `pagina` (ex.: `lactotropin.html`) manda só esse texto.
- Teste manual: Actions → Avisos diarios → Run workflow; campo opcional "data" simula um dia (dd/mm/aaaa).
- O toque no aviso abre a aba Secagens (ou Partos).

## Lactotropin (aplicação)
- Tela `lactotropin.html`, aberta pelo menu ☰. Lê `lactotropin.json` (cronograma) e o lote de cada vaca de `dados.json` (último controle). Vaca do cronograma que não está no último controle não aparece (tratada como seca).
- Cronograma novo (vem do Renner/Prodap, PDF na pasta do Drive `06_Lactotropin`): substitua `lactotropin.json` inteiro. Campos: `cronograma` (data do PDF), `datas[]` (dd/mm/aaaa), `vacas[]` = [brinco, [true/false por data]] (true = SIM). Confira os totais de SIM por data com o PDF.
- Marcações compartilhadas: planilha Google `Lactotropin_Marcacoes` (Drive `06_Lactotropin`) via Apps Script (URL em `lactotropin.html`, `URL_API`). Desde a 1.6 funciona por lance: aba `lance` (entrou/saiu, quem, seq) e aba `marcacoes` (passou com nº do lance, desfez, voltou, zerou, seq). "Liberar" grava o lance inteiro de uma vez (o nº do lance é dado pelo Apps Script). `seq` é a ordem única entre as duas abas. Código do Apps Script: `Lactotropin_AppsScript.gs` (pasta do Drive). Lance de 11 vacas: na 12ª o app pergunta. A planilha guarda o brinco 060 como 60; a tela corrige.
- Código da fazenda pedido na entrada (o mesmo do Apps Script). Modo "Só acompanhar" não grava nada.
- A tela consulta a planilha a cada 5 s com lance aberto e a cada 15 s sem lance, só com a tela aberta; uma leitura por vez, e leitura que começou antes do último envio é descartada. O `sw.js` não guarda as respostas da planilha.
