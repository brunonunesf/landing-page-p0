# Revisão independente — seção histórica

**Resultado: APROVADO no escopo inspecionado.** Nenhum defeito acionável encontrado na alteração local revisada. A aprovação deve ser combinada com a verificação interativa do navegador conduzida pelo agente principal.

## Escopo e evidências

- Li `CLAUDE.md`, o diff de `index.html`, `styles.css`, `app.js`, os cinco JPEGs disponíveis e `assets/historia/CREDITOS.md`. Não alterei código, não fiz commit nem deploy.
- `node --check app.js` passou.
- O HTML começa fechado com `hidden` e `aria-expanded="false"`. O botão nativo associa o conteúdo por `aria-controls`; a rotina mantém estado, texto e símbolo sincronizados. Há foco visível e nenhum novo movimento obrigatório.
- A seção fica após a metodologia e antes do rodapé; não depende da divisão selecionada. O texto explica o recorte da Série A, evitando apresentar esses artilheiros como estatísticas da Série B.
- A revisão de CSS encontrou grades de cinco, três e duas colunas para retratos, linha histórica em uma coluna em telas menores e curiosidades empilhadas no celular. Não identifiquei largura mínima introduzida que force transbordamento.
- Inspecionei `audit/historia-desktop-dark.png`: os cinco retratos correspondem aos jogadores e preservam o estilo existente. A captura cobre o início da seção e os artilheiros; não serve como verificação visual completa do conteúdo expandido.

## Conteúdo e créditos

O ranking e os números coincidem com a [lista da CBF](https://www.cbf.com.br/futebol-brasileiro/noticias/campeonato-brasileiro-serie-a/a/gabigol-sobe-para-a-8-posicao-na-artilharia-historia-do-brasileirao): Dinamite 190, Fred 158, Romário 154, Edmundo 153 e Zico 135. São jogadores aposentados, portanto o recorte encerrado em 2025 não depende da temporada atual.

O reconhecimento do título de 1937 em 2023 é corroborado pelo [relatório de gestão do Atlético](https://atletico.com.br/wp-content/uploads/2024/04/Earnings-Release-CAM-2023-3.pdf). O recorde de Washington (34 em 2004) é corroborado pela [cobertura histórica do GE](https://ge.globo.com/programas/esporte-espetacular/noticia/2011/01/washington-relembra-o-gol-da-vida-que-simbolizou-sua-volta-ao-futebol.html). Não encontrei afirmação histórica materialmente enganosa na cronologia.

As páginas do Wikimedia Commons conferidas para Dinamite, Fred, Edmundo e Zico sustentam os autores e as licenças indicados na interface. A interface também informa o reenquadramento e a escala de cinza, e oferece links para originais e licenças. A página específica do Romário não pôde ser recuperada pela ferramenta nesta revisão; autoria/licença desse arquivo não foram verificadas independentemente.

## Limites

Não fiz interação própria no navegador, teste de leitor de tela ou inspeção visual móvel/clara. O agente principal está conduzindo esses testes, exigidos por `CLAUDE.md`. O segundo link de leitura da CBF retornou erro 500 no leitor web; isso pode ser limitação temporária/de acesso e não demonstra que esteja quebrado no navegador. Nenhum desses limites foi convertido em defeito sem evidência reproduzível.

## Complemento após QA final

Li `audit/historia-browser-checks.json`, produzido pelo agente principal. As 12 combinações de largura (1440, 390 e 320 px), divisão (A/B) e tema (claro/escuro) registram conteúdo aberto e visível, cinco retratos carregados e ausência de transbordamento horizontal. O mesmo arquivo registra Enter recolhendo e Espaço abrindo, com `aria-expanded` sincronizado. Inspecionei adicionalmente `audit/historia-desktop-light.png`; não encontrei problema visual no trecho capturado, incluindo o foco do botão. Isso reduz o limite relativo à cobertura de temas e dispositivos, embora eu não tenha repetido essas interações pessoalmente nem executado leitor de tela.

A consulta independente à API `imageinfo/extmetadata` do Commons para o arquivo de Romário retornou `Artist: Agência Senado from Brasilia, Brazil`, `LicenseShortName: CC BY 2.0` e `LicenseUrl: https://creativecommons.org/licenses/by/2.0`, coerentes com os créditos publicados. A descrição identifica também “Foto: Rodrigo Viana/Senado Federal”. Não há mais pendência de confirmação dos metadados de licença desse retrato.

**Conclusão mantida: APROVADO, sem achados acionáveis.**
