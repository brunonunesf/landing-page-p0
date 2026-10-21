# Revisão independente — maiores campeões

**APROVADO no escopo inspecionado.** Nenhum achado acionável de contagem, anos, ordenação, estrutura ou CSS.

Revisei `.history-champions` em `index.html` e os estilos `.champion*`, seguindo o `CLAUDE.md` já lido. Não alterei o produto, não fiz commit nem deploy. `git diff --check` passou e os cinco escudos referenciados existem como PNG.

## Dados

A contagem é coerente com o critério declarado e com o corte até 2025: Palmeiras 12; Flamengo e Santos empatados com 8; Corinthians 7; São Paulo 6. Os anos em cada cartão somam exatamente a quantidade exibida. O empate usa 2º lugar para ambos e a sequência correta prossegue com 4º e 5º, inclusive nos valores da lista HTML.

Os dois títulos do Palmeiras em 1967 estão discriminados como Taça Brasil e Robertão. O campeonato de 2025 foi incluído para o Flamengo; 1987 fica explicitamente fora da soma, com nota explicando o critério da CBF e a Copa União vencida pelo Flamengo. A nota evita confusão entre a contagem adotada e a contagem usada pelo clube.

Fontes consultadas:

- [CBF — Palmeiras e seus 12 títulos](https://www.cbf.com.br/futebol-brasileiro/noticias/detalhes/competicoes-campeonato-brasileiro-serie-a/palmeiras-celebra-110-anos-de-muita-tradicao-e-glorias) e [galeria do Palmeiras](https://www.palmeiras.com.br/galeria-de-titulos/).
- [CBF — Flamengo campeão em 2025](https://www.cbf.com.br/futebol-brasileiro/noticias/competicoes-campeonato-brasileiro-serie-c/a/flamengo-e-campeao-do-brasileirao-betano-2025).
- [Títulos do Santos](https://www.santosfc.com.br/titulos/).
- [Enciclopédia do São Paulo](https://www.saopaulofc.net/enciclopedia-campeonato-brasileiro-2/), que lista os mesmos seis anos.
- [Títulos do Corinthians](https://www.tituloscorinthians.com.br/), que lista os mesmos sete anos. Este é um site dedicado ao tema, não o domínio oficial do clube; a interface o apresenta apenas pelo nome do clube, sem alegar que seja fonte oficial.
- [STF — recurso sobre 1987](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=311893&ori=1), corroborando o reconhecimento do Sport. A página da resolução da CBF vinculada na interface retornou erro 502 na ferramenta de leitura; isso não comprova falha no navegador.

## Estrutura e celular

A seção tem título associado por `aria-labelledby`, lista ordenada com posições explícitas, nomes e totais como texto, e alternativas úteis nos escudos. Os anos aparecem abaixo do nome e do total de cada clube. O conteúdo permanece dentro da área histórica inicialmente recolhida.

O CSS usa cinco colunas acima de 1100 px, três até 1100 px e uma até 600 px. As colunas têm `minmax(0,1fr)` e os cartões `min-width:0`; o texto dos anos contém espaços, permitindo quebra de linha. Os escudos têm dimensões fixas de 56 px e `object-fit:contain`. Não identifiquei causa de transbordamento ou truncamento no CSS.

## Limites

Não repeti a navegação interativa nem inspecionei capturas específicas da nova seção nesta revisão. A aprovação de apresentação final deve ser combinada com o QA de navegador em andamento pelo principal, incluindo temas claro/escuro, Séries A/B e telas móveis. A revisão anterior da seção histórica permanece em `audit/historia-revisao-independente.md`.
