# Evidência final — seção histórica do Brasileirão

## Resultado local

Seção 03 após “Sobre o recorte”, antes do rodapé. Começa recolhida. “Explorar a história” abre os retratos, ranking, cronologia e curiosidades; “Recolher a história” oculta tudo novamente. Nenhum commit ou deploy foi realizado.

- Top 5 da Série A: Roberto Dinamite 190, Fred 158, Romário 154, Edmundo 153, Zico 135. Fotos reais locais, texto alternativo, atribuições e licenças.
- Linha histórica: 1937, 1959, 1967, 1971, pontos corridos em 2003 e 20 clubes/38 rodadas em 2006.
- Curiosidades: Washington 34 gols em 2004; unificação dos títulos em 2010.
- Conteúdo histórico explicitamente separado do recorte de temporada e da Série B.

## Verificação executada

- `node --check app.js`: passou.
- `git diff --check`: passou.
- Navegador real: estado inicial fechado, abertura e fechamento por clique e por Enter/Espaço; `hidden` e `aria-expanded` sincronizados.
- 12 combinações: 1440, 390 e 320 pixels × Séries A/B × temas claro/escuro. Nenhum transbordamento horizontal; todas as cinco fotos carregadas; seção aberta e visível. Registros em [historia-browser-checks.json](historia-browser-checks.json).
- Inspeção visual direta do desktop claro/escuro e celular: retratos, gols, cronologia, curiosidades, fontes e créditos legíveis. Não foi realizado teste com leitor de tela.

## Capturas

- [Computador, claro](historia-desktop-light.png)
- [Computador, escuro](historia-desktop-dark.png)
- [Celular, claro](historia-mobile-light.png)
- [Celular 320 pixels, escuro](historia-mobile-320-dark.png)
- [Celular, marcos 2003/2006](historia-mobile-timeline.png)

## Fontes verificadas

- [CBF — artilharia histórica](https://www.cbf.com.br/futebol-brasileiro/noticias/campeonato-brasileiro-serie-a/a/gabigol-sobe-para-a-8-posicao-na-artilharia-historia-do-brasileirao)
- [CBF — pontos corridos e 20 clubes](https://www.cbf.com.br/futebol-brasileiro/noticias/supercopa-masculino/a/sao-paulo-x-flamengo-vale-a-lideranca-do-ranking-dos-pontos-corridos)
- [CBF — unificação](https://www.cbf.com.br/a-cbf/por-dentro-da-cbf/juridico/a/cbf-oficializa-campeoes-brasileiros-de-1959-a-2010)
- [Atlético — reconhecimento de 1937](https://atletico.com.br/galo-e-tricampeao-brasileiro/)
- [ge — recorde de Washington](https://ge.globo.com/google/amp/pr/futebol/times/athletico-pr/noticia/2024/12/20/pelo-athletico-washington-virava-maior-artilheiro-do-brasileirao-ha-20-anos-nasceu-coracao-valente.ghtml)
- [Créditos e licenças dos retratos](../assets/historia/CREDITOS.md)

## Revisão independente

Revisor iniciado sem histórico da conversa (`fork_turns: none`), somente requisitos e checkout. Resultado: **APROVADO, sem achados acionáveis**. Consultar [relatório e limites](historia-revisao-independente.md).
