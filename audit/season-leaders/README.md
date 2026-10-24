# Protagonistas da Série A e fotografias dos clubes

- Nova seção imediatamente após a classificação, antes da história.
- Cinco artilheiros e cinco líderes em assistências, derivados dos dados existentes da Série A até a 31ª rodada.
- Rankings permanecem da Série A quando a tabela muda para a Série B. O clique abre a ficha correta da Série A; Esc fecha e devolve o foco.
- Empates compartilham posição, com ordem alfabética no corte de cinco atletas.
- Fotografias dos rankings mostram os jogadores em campo. São ilustrativas e podem ser de outras partidas ou temporadas, conforme a nota nos créditos.
- Catálogo cobre 243 nomes exibidos, incluindo nomes abreviados e apelidos do mesmo atleta, nas fichas das duas divisões. Foram priorizados os sites dos clubes e usadas publicações esportivas nos demais casos.
- Fotos locais otimizadas; URLs originais, fontes e atribuições ficam em player-images.js e em Fontes e créditos. A seleção não declara licenças livres nem altera a titularidade das imagens.
- Nenhum dado estatístico ou fonte de valores de mercado foi modificado. A rolagem do CTA permanece em 1.100 ms.

## Validação

- 12 combinações de 390, 768 e 1440 px, temas claro/escuro e Séries A/B.
- Telas de 390×844 e 1440×900; sem rolagem horizontal.
- 253/253 referências de imagens carregaram em navegador: 243 nomes e dez fotos de jogo.
- Nenhuma requisição de imagem ao Transfermarkt; links de consulta de valores permanecem preservados.
- Testes da abertura pelo ranking, identificação da divisão no painel, fechamento com Esc, retorno de foco e ausência de linhas expandidas.
- Regressão do fechamento da classificação: mouse, teclado, pointer parado, ambas as divisões, ambos os temas e Esc durante a comemoração.
- Scripts alterados passaram na verificação de sintaxe. Sem erros JavaScript nas combinações testadas.
- Inspeção manual adicional no navegador local: abrir Flamengo pelo ranking e fechar com Esc.

## Arquivos da implementação

- index.html
- styles.css
- app.js
- player-images.js
- assets/jogadores/edicao-2026/
- tools/verify-season-leaders.cjs

## Entrega

Resultado local, sem commit nem deploy desta alteração. Capturas reais em 390 e 1440 px estão nesta pasta.
