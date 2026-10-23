# Painel de controle leiteiro

Site estático (GitHub Pages) instalado como app no celular.

## Atualizar com um controle novo
1. Substitua **só** `dados.json` pelos dados do controle novo (mesmo formato; `cfg.data_iso` = data do controle).
2. Rode `python3 arquivar.py` antes do commit. Ele guarda a cópia em `controles/AAAA-MM-DD.json` e refaz `controles/lista.json`, que alimenta o menu ☰ de controles antigos.
   (O workflow `.github/workflows/arquivar.yml` faz o mesmo automaticamente se alguém esquecer.)
3. Não mexa em `index.html` para trocar dados. Ele lê tudo dos JSON.
4. Commits sem nome nem e-mail pessoal (autor: `Painel <painel@users.noreply.github.com>`).

## Atualizar a reprodução (Prodap)
- Fonte: PDFs mais recentes da pasta do Drive `01_Prodap_Veterinario/Reproducao` ("Matrizes Gestantes" e "Matrizes a secar").
- Substitua `reproducao.json` inteiro (não tem histórico; sempre o Prodap mais recente). Campos: `data`, `gestantes[]` (v, cat, ult, ins, doses, touro, parto, raca, iep, partos), `secar[]` (v, parto, sec), `resumo`, `touros`, `previsao[]` (mês, partos novilhas, partos vacas, total, secagens, matrizes em lactação).
- Regra do Danilo: vaca que não aparece no último controle de leite não está sendo ordenhada (tratar como seca). A tela cruza isso sozinha com `dados.json`.
- Confira: total de gestantes, contagem por categoria e por touro iguais ao PDF.

## Regras do Danilo (valem para toda atualização)
1. Vaca que não aparece no controle de leite não está sendo ordenhada: tratar como seca.
2. Parto previsto já passou e a vaca não tem medida no último controle: ATENÇÃO (pode estar atrasada e não ter parido). Aparece no topo do Resumo da Reprodução.
3. Não inventar critérios (ex.: limites de DEL para trocar de lote). Critérios novos vêm dele.
