# Polimento visual — inventário e verificação

## Referência inicial
- CSS: `--ink`, `--paper`, `--acid`, `--green`, `--red`, `--gray`, `--line`, `--muted`, `--header-height`; temas em `body.dark`; identidades em `--club-*`.
- Seções: hero, classificação, história (artilheiros, campeões, linha do tempo, regulamento, fatos), sobre o recorte e rodapé.
- JS: renderTable/setDivision; setTheme; openClub/close/playClubIntro; historyToggle; heroMoments/showHeroPhoto/scheduleHeroPhotos; CTA com duração de 1100 ms.
- Hover/ativo: `.club-entry`, `.club-row`, `.hover-details` no CSS. Voltar ao topo: `#backToTop` e syncBackToTop no JS. Carrossel: `#heroMedia`, heroMoments. Gaveta: `#detailSheet`, clubIdentities.
- Referências anteriores às mudanças salvas em /tmp/polimento-*-original.*; hashes de data.js e photos.js em /tmp/polimento-dados.sha. Nenhum arquivo anterior ou não relacionado será preparado para commit.

## Fases

1. **Tokens e cor:** cores centralizadas em `:root`/`body.dark`, com tokens semânticos de superfície, texto, acento, escala tipográfica, espaços, raios, sombras e movimento. A paleta de compatibilidade conserva os tratamentos existentes sem cores hexadecimais dispersas no CSS. Limão sólido restrito ao CTA, título, seleção e selos de artilheiros.
2. **Classificação:** hover suave, detalhe expansível, foco e clique em todo o bloco da linha; contraste do retrospecto, cabeçalho fixo, legenda no topo e números tabulares. Mobile mostra jogos disputados e reserva uma faixa para o retorno ao topo.
3. **Formatação:** helpers pt-BR para euros e percentuais; datas da interface uniformizadas. Objetos de dados não foram alterados. Fotos remotas que retornavam 404 usam escudos locais na apresentação.
4. **Navegação:** cabeçalho fixo, menu móvel acessível, links internos e seção atual; observadores controlam o estado do cabeçalho e o retorno circular ao topo. CTA preservado em 1100 ms.
5. **Legibilidade:** textos mínimos de 12px; notas e parágrafos em fonte sem serifa; contraste corrigido nas superfícies dos dois temas e nas gavetas.
6. **Logos:** brilho removido, escudo recortado visualmente e rodapé com selo intencional. Nota de projeto independente adicionada.
7. **Hero:** subtítulo curto, informação da rodada corrigida, degradês, controles em linha, indicador de fotografia, pausa acessível e convite à rolagem. Altura de uma tela com crescimento seguro em telas baixas.
8. **Gavetas:** configuração `clubIdentities` reaproveitada integralmente; diálogo nomeado pelo clube, fundo inerte, ciclo de foco, Esc e retorno à origem. Silhueta existente substitui a foto repetida do Flamengo. Legendas em superfície sólida, inclusive no celular.
9. **História:** carrossel manual no celular e três destaques no desktop; setas e teclado; Dinamite em destaque, retratos padronizados e anos dos campeões recolhíveis.
10. **Blocos finais:** linha do tempo contínua, regulamento com números e espaçamentos uniformes, fatos em destaque, recorte em nota expansível e fontes/créditos num único details. Links e atribuições originais preservados; créditos da abertura também acessíveis no bloco.
11. **Movimento:** uma técnica de reveal, sem repetição, desligada com movimento reduzido; autoplay desligado nessa preferência. Conteúdo histórico permanece visível sem JavaScript; o recolhimento é aplicado pelo script.
12. **Metadados e acabamento:** favicon derivado do escudo, ícone Apple de 180×180, imagem social de 1200×630, Open Graph/Twitter, theme-color por tema, dimensões de imagens e rel seguro em links externos. Créditos dos derivados registrados.

## Arquivos alterados/criados
- Interface: `index.html`, `styles.css`, `app.js`.
- Assets: `assets/identidade/favicon.svg`, `apple-touch-icon.png`, `compartilhamento.png` e atualização de `assets/identidade/CREDITOS.md`.
- Verificadores: `tools/verify-polish.cjs`, `verify-polish-panels.cjs`, `verify-polish-motion.cjs`, `verify-polish-phase.cjs` e `check-polish-contrast.cjs` e `verify-polish-smoke.cjs`.
- Evidências e resultados: esta pasta `audit/polimento/`.
- `data.js`, `photos.js`, arrays de fallback, extras, configurações de clubes, artilheiros históricos, anos dos campeões, linha do tempo e critérios do regulamento preservados. Todos os links externos que já existiam no HTML foram mantidos.

## Verificações realizadas
- 72 capturas intermediárias: 12 fases × 1440/768/390px × claro/escuro.
- Matriz final: 12 combinações de largura, tema e Série A/B, além de altura reduzida de 500px.
- Fluxos: CTA e foco de chegada, Space/Enter, abertura/fechamento das gavetas, ciclo de foco e retorno, menu/Esc, expansão da história, navegação direta ao regulamento, detalhes de dados/créditos e carrossel de história por setas/teclado.
- Painéis: 40 clubes × dois temas = 80 aberturas verificadas. Medição dos textos sobre as superfícies dos painéis, excluindo ornamentos marcados como decorativos.
- Contraste: 573 trechos no desktop e 322/323 trechos no celular/tablet por tema na página expandida, sem falhas nos limites WCAG de 4,5:1 para texto normal e 3:1 para texto grande. Textos sobre fotografias recebem inspeção visual complementar; o cálculo automático não certifica pixels de fundos fotográficos/gradientes. Nenhum texto renderizado abaixo de 12px nos estados auditados.
- Movimento: amostras intermediárias comprovam duração de 1100 ms; rolagem manual interrompe a animação. Preferência reduzida interrompe autoplay e remove reveals pendentes; conferida em 390 e 1440px.
- Sem erros de execução JavaScript, respostas HTTP locais com erro ou rolagem horizontal na matriz final. Após tratar 100 URLs antigas da ESPN que retornavam 404, as 80 aberturas dos painéis não produziram erros de console. As URLs originais continuam intactas nos arquivos de dados; uma lista de indisponibilidade controla o fallback para o escudo local.
- Inspeção manual no navegador e revisão das capturas de abertura, tabela, história, ícones e gavetas. Problemas de legenda cortada na gaveta móvel, clique perdido entre linhas e faixa decorativa sob o título tricolor foram encontrados e corrigidos.
- Sintaxe com `node --check`, integridade com `git diff --check`, hashes de dados e comparação dos blocos de conteúdo: aprovados.

### Comandos de reprodução
Os verificadores usam o Playwright/Chrome já disponíveis na máquina, sem dependências adicionadas ao projeto. Com localhost:8765 ativo, a partir da raiz:

```sh
node --check app.js
node tools/verify-polish.cjs
node tools/verify-polish-panels.cjs
node tools/verify-polish-motion.cjs
node tools/verify-polish-smoke.cjs
node tools/verify-polish-phase.cjs revisao
```

Resultados detalhados: `verificacao.json`, `paineis.json`, `movimento.json`, `preservacao.json`, `smoke.json`, `recursos-remotos.json` e `links.json`.

## Decisões adotadas
- Uma entrega final e um eventual commit posterior, conforme escolha do usuário. Nenhum commit ou publicação foi realizado.
- Sem a seção opcional “Escolha seu time”.
- Paleta de clubes existente preservada; textos pequenos usam cores claras verificadas e áreas de conteúdo usam superfícies controladas.
- “Ver anos das conquistas” usa details nativo, evitando uma sequência excessiva de chips.
- Carrossel histórico sem autoplay em qualquer preferência. Desktop mantém os três destaques visíveis.
- O botão de retorno ocupa uma faixa reservada junto aos cartões móveis e à linha do tempo para não cobrir ações ou pontos.
- Endereço público dos metadados obtido dos verificadores de produção já existentes na máquina: `https://landing-page-p0.vercel.app/`. Os novos metadados/assets continuam locais até uma publicação futura.

## TODO(asset) e limitações
1. SVG verdadeiro do escudo isolado: o favicon atual é um invólucro SVG que recorta a matriz PNG existente, suficiente para a prévia.
2. Logo transparente próprio para cada tema: o rodapé usa o selo previsto no plano.
3. Fotografia neutra de estádio/torcida/taça para abrir o hero: mantida a ordem atual por falta de recurso existente com licença confirmada.
4. Fotografia alternativa do Flamengo: usada a silhueta existente; nenhuma nova foto foi baixada.
5. Retratos de jogo de Romário e Zico com licença livre: mantidas e uniformizadas as imagens atuais.
6. As pendências de direitos das fotografias já catalogadas continuam registradas na curadoria. Nenhuma autorização ou licença foi inventada. A imagem social deriva da prévia local e não foi publicada.
7. Dos 41 destinos externos verificados, 34 responderam com sucesso e sete ficaram sem confirmação: cinco URLs da CBF falharam na validação do certificado pelo cliente local, uma URL do Atlético retornou 403 e uma do UOL excedeu o tempo limite. Isso não comprova que estejam quebrados; foram preservados e registrados em `links.json`. Não houve desativação da verificação de certificados.
8. Não houve teste com um leitor de tela dedicado; houve inspeção da árvore de acessibilidade do navegador, rótulos, estados, foco e navegação por teclado.
9. A imagem social foi gerada com as dimensões previstas; não há TODO de geração de `og:image`. Sua disponibilização no domínio público depende da publicação futura, fora desta tarefa.

10. TODO(asset) adicional: retratos licenciados para os jogadores cujas 100 URLs de fotos ESPN estavam indisponíveis. Até lá, a apresentação usa os escudos locais existentes. Registro anterior em `recursos-remotos-antes.json`; verificação posterior em `recursos-remotos.json` (sem erros).
