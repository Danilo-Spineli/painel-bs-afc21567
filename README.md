# Painel de controle leiteiro

Site estático (GitHub Pages) instalado como app no celular.

## Atualizar com um controle novo
1. Substitua **só** `dados.json` pelos dados do controle novo (mesmo formato; `cfg.data_iso` = data do controle).
2. Rode `python3 arquivar.py` antes do commit. Ele guarda a cópia em `controles/AAAA-MM-DD.json` e refaz `controles/lista.json`, que alimenta o menu ☰ de controles antigos.
   (O workflow `.github/workflows/arquivar.yml` faz o mesmo automaticamente se alguém esquecer.)
3. Não mexa em `index.html` para trocar dados. Ele lê tudo dos JSON.
4. Commits sem nome nem e-mail pessoal (autor: `Painel <painel@users.noreply.github.com>`).
