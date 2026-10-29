# Versões do app (Fazenda Boa Sorte)

Formato **maior.média.menor** (versionamento semântico), só para controle interno; não aparece no app.
- **maior**: muda o jeito de usar o app.
- **média**: função nova, sem quebrar o que existia.
- **menor**: correção ou ajuste pequeno.

O número `painel-vN` do `sw.js` é outra coisa: é o contador da cópia guardada no celular (sobe a cada mudança que o celular precisa baixar).

**Versão atual: 1.7.0** (29/10/2026)

## 1.7 · Prodap de 28/10 (29/10)
- 1.7.0 · Reprodução com o Prodap de 28/10 (121 gestantes, 18 a secar). Cada quadro do Resumo mostra discreto o valor do Prodap anterior; no quadro Gestantes, um toque abre a divisão lactação/secas/novilhas do anterior.

## 1.6 · Lactotropin por lance (25/10)
- 1.6.3 · Painel: sempre abre no Resumo (antes voltava para a última aba aberta, ex.: Vaca).
- 1.6.2 · Lactotropin: "Lote N" voltou a se chamar "Primíparas".
- 1.6.1 · Correção: marcando rápido, o lance "voltava" vacas já liberadas ou sumia com vacas por um instante (leitura velha da planilha chegando depois do envio). Agora uma leitura por vez, leitura antiga é descartada e o que já foi enviado fica guardado até a planilha confirmar.
- 1.6.0 · Toque na vaca põe ela no lance (faixa no topo, compartilhada entre os celulares); "Liberar" manda o lance para conferidas, com desfazer. Na 12ª vaca pergunta se é o mesmo lance ou se trocou. Aviso de último lance sem liberar. Aba Todas: conferidas por lance, com etiqueta amarela na vaca de outro lote. Legenda SIM = aplicar / NÃO = não aplicar. "Faltam" só no botão do lote e na linha fina. Atualiza a cada 5 s com lance aberto. Planilha ganhou a aba "lance" (precisa do Apps Script novo).

## 1.5 · Avisos do Lactotropin (24/10)
- 1.5.12 · Lactotropin: "aplicada" virou "recebeu ✓" (aviso: "recebeu dose").
- 1.5.11 · Lactotropin: tirado o nome de quem marcou de baixo da vaca (continua na planilha).
- 1.5.10 · Lactotropin: no lugar de "passou", vaca SIM fica "aplicada ✓" e vaca NÃO fica "conferida, sem dose" (só texto; planilha igual).
- 1.5.9 · Lactotropin: botões de lote grandes de novo (arrastando), com "faltam" embaixo; Primíparas = "Lote N".
- 1.5.8 · Lactotropin: os 6 lotes numa linha só (Todas, L1, L2, L3, PP, N) com "faltam".
- 1.5.7 · Texto do menu Avisos inclui o Lactotropin.
- 1.5.6 · Fora do dia da aplicação, pergunta "tem certeza?" na 1ª vaca toda vez que a tela abre.
- 1.5.5 · "Sair" apaga as confirmações de fora do dia.
- 1.5.4 · Título dos avisos: "Fazenda Boa Sorte".
- 1.5.3 · Teste manual do modo lacto manda o aviso real da próxima aplicação ("daqui N dias").
- 1.5.2 · Título sem "FBS"; ícones do aviso com endereço completo (trevo no lugar do sino/"D").
- 1.5.1 · Véspera às 7h e no dia às 6h; texto "aplicar em N vacas".
- 1.5.0 · Aviso do Lactotropin na véspera.

## 1.4 · Lactotropin (24/10)
- 1.4.7 · Pergunta "tem certeza?" em qualquer dia que não seja o da aplicação.
- 1.4.6 · Tela fica na aplicação até 3 dias depois; depois passa para a próxima.
- 1.4.5 · Confirmação na 1ª vaca fora do período.
- 1.4.4 · Entrada (nome e código) vale por aplicação: desconecta na troca.
- 1.4.3 · Seção "Manejo · equipe" no menu e menu próprio na tela.
- 1.4.2 · Só marca com nome e código; descarta marcações sem nome.
- 1.4.1 · Modo "só acompanhar" com o código, sem enviar nada.
- 1.4.0 · Tela de aplicação do Lactotropin com marcação compartilhada (planilha Google).

## 1.3 · Avisos no celular (24/10)
- 1.3.7 · Próximos partos: vaca fora do controle aparece como seca.
- 1.3.6 · Tira o botão "Refazer cadastro" (toque acidental).
- 1.3.5 · Aviso volta para a versão que funcionava.
- 1.3.4 · Aviso sem trevo repetido e com vibração própria; aviso novo sempre toca.
- 1.3.3 · Aviso abre direto em Secagens ou Partos; teste pode simular uma data.
- 1.3.2 · Ícone da barra de notificação: silhueta do trevo; avisos compactos no menu.
- 1.3.1 · Prioridade alta; disparo manual e teste.
- 1.3.0 · Avisos às 7h: secagem (véspera e dia) e parto previsto (dia).

## 1.2 · Aparência (24/10)
- 1.2.0 · Menu com Sistema, Claro e Escuro; claro em off-white.

## 1.1 · Reprodução (23/10)
- 1.1.6 · Touro em destaque na ficha e nos partos; ficha em 4 quadros.
- 1.1.5 · Previsão por mês cabe na tela.
- 1.1.4 · Aviso de instalação conforme o navegador.
- 1.1.3 · Busca da reprodução com largura total; atenção mais discreta.
- 1.1.2 · Atenção para parto atrasado.
- 1.1.1 · Cruza com o controle: fora do controle = não ordenhada.
- 1.1.0 · Tela de Reprodução (Prodap 06/10) e menu com Controles e Reprodução.

## 1.0 · Painel do controle leiteiro (23/10)
- 1.0.2 · Funciona sem internet; corrige cópia offline.
- 1.0.1 · Ícone nítido; menu de controles antigos; controle 14/09 no histórico.
- 1.0.0 · Painel com os controles de 05/10 e 22/10.
