# Movimento e acabamento — relatório de implementação

Data: 28/10/2026. Resultado local, sem publicação e sem commit.

## Resultado por fase

| Fase | Implementação |
| --- | --- |
| A | Tokens consolidados, módulo fechado em motion.js, IntersectionObserver reutilizável, reveals progressivos, contagem em pt-BR, agendamento por quadro e preferência de movimento acompanhada em tempo real. As contagens reservam a largura final e preservam os elementos e nomes acessíveis. |
| B | Entrada do título por linhas, crossfade, Ken Burns de 14s, parallax desktop, controle de pausa e progresso por scaleX. Slides ocultos carregam sob demanda, e a foto anterior permanece até a seguinte estar pronta. |
| C | Três gradientes discretos, ruído estático, indicador de rolagem e progresso de leitura. Efeitos contínuos pausam fora da área visível e quando a aba é ocultada. |
| D | Faixa de próximos jogos a partir dos objetos existentes da divisão selecionada; confrontos repetidos com a mesma data são deduplicados. Cópia decorativa oculta de leitores de tela; pausa por foco/hover e lista rolável em movimento reduzido. |
| E | Cascata das linhas, contagem exata de pontos, barras de aproveitamento, destaque móvel único, efeitos em escudos/setas e seletor A/B com pílula e teclado. ResizeObserver recalcula o destaque. A troca de conjuntos usa crossfade/cascata. |
| F | Indicador de navegação ligado à seção ativa, transição circular de tema com detecção de suporte, persistência protegida e aplicação antecipada da preferência. |
| G | Bento com os três destaques e os dois fatos existentes, empilhado no celular. Spotlight, retratos em cor ao interagir, inclinação restrita, bordas, números decorativos e linha do tempo com ano sticky no desktop. O carrossel antigo de destaques e seus controles foram removidos. |
| H | Varredura do CTA, setas, magnetismo limitado, estados de pressão, sublinhados e foco visível. Hover legado foi condicionado a ponteiro fino. |
| I | Entrada dos blocos, contagem, forma V/E/D sequencial, pulso único e fechamento com saída antes de liberar o fundo e devolver o foco. Reabertura cancela a saída pendente e os observadores não retêm blocos substituídos. |
| J | Placeholder, shimmer, blur-up, dimensões reservadas e fallback de imagem. Variantes WebP dos mesmos originais, com tamanhos responsivos no hero. Fontes Archivo e DM Mono locais, com licenças OFL. |
| K | Cursor opcional implementado em motion.js; ENABLE_CUSTOM_CURSOR permanece false. Para experimentar, alterar essa constante no início do módulo. O cursor nativo não é removido. |
| L | Sintaxe, integridade dos dados, matriz visual, interação, fallbacks, console, Lighthouse e amostra/trace de rolagem verificados. Limites de cobertura registrados abaixo. |

## Decisões e preservação de conteúdo

- As exceções de grayscale, blur-up, sublinhado e foco seguem a escolha do usuário. Os demais movimentos novos usam transform/opacity ou as exceções de clip-path e SVG.
- motion.js concentra a camada nova para manter o código existente legível. app.js recebeu apenas os pontos de integração, ajustes de carregamento, tema, pausa e ciclo de vida do painel.
- A troca A/B substitui clubes inteiros: crossfade/cascata foi escolhido em vez de um FLIP sem correspondência entre elementos. Não foi adicionado um controle de reordenação que o site não possui.
- Não há série completa de pontos por rodada na entrada usada pelo painel. Por isso, a forma existente é animada e nenhuma sparkline ou dado foi inventado.
- O destaque sticky usa anos. TODO(asset): fotografias com licença e correspondência comprovadas para cada período da linha do tempo.
- O título, subtítulo, CTA, fontes editoriais, regulamento e dados existentes foram preservados. A movimentação dos dois fatos para o bento é a reorganização aprovada.
- Os arrays de fallback, extras/identidades e momentos históricos foram comparados com a cópia inicial e são idênticos. data.js, photos.js e player-images.js não foram alterados nesta tarefa.
- O HTML inclui os valores finais e classificações estáticas para manter conteúdo útil sem JavaScript; o código funcional substitui essas cópias ao iniciar.

## Validação

- Chrome: 24 combinações de 390/768/1440px × temas claro/escuro × Séries A/B × movimento normal/reduzido. Pontos finais, seleção acessível, ausência de transbordamento, abertura/fechamento, Esc e retorno de foco verificados.
- Firefox e WebKit: três larguras, troca de tema/divisão, renderização, movimento normal/reduzido e linha do tempo.
- WebKit com emulação de toque: menu, navegação, abertura/fechamento do painel e ausência de hover fino.
- Casos adicionais: JavaScript desativado, falha simulada de motion.js, armazenamento bloqueado, API de View Transitions indisponível, imagens indisponíveis (incluindo o fallback), pausa do carrossel, saída do hero, reabertura rápida e layout com zoom CSS de 200%.
- Capturas finais em 390/768/1440px. Console da navegação normal sem erros ou avisos.
- Rolagem em Chrome desktop: amostra de aproximadamente quatro segundos, cerca de 60 fps por requestAnimationFrame, p95 de 16,7 ms e maior intervalo de 16,8 ms. A gravação de trace também foi salva; isto não constitui garantia de desempenho em aparelhos físicos.

No percurso completo de interações automatizadas, os acumulados de CLS foram 0,000153 (390px), 0,000072 (768px) e 0,000115 (1440px). O CLS zero abaixo corresponde à medição de carregamento do Lighthouse; não é uma afirmação de zero absoluto durante toda interação.

### Lighthouse mobile

Lighthouse 12.8.2, Chrome headless, categorias Performance/Acessibilidade e configuração mobile padrão. Uma execução por cenário, com cache novo; os números não são médias nem garantia de produção.

| Ambiente igual para antes/depois | Performance antes → depois | Acessibilidade | LCP antes → depois | CLS final |
| --- | --- | --- | --- | --- |
| Servidor local com gzip | 85 → 98 | 100 → 100 | 4,22s → 2,42s | 0 |
| Servidor local simples, sem gzip | 68 → 81 | 100 → 100 | 68,44s → 4,81s | 0 |

No servidor simples, a transferência inicial medida caiu de 13.153.743 para 698.470 bytes. Com gzip, o resultado final foi 280.698 bytes. O servidor de auditoria aplica a mesma compressão às duas versões; não houve publicação na Vercel.

### Comandos principais

```sh
node --check app.js
node --check motion.js
node tools/verify-motion.cjs
node tools/verify-motion-edge.cjs
node tools/profile-motion.cjs
git diff --check
python3 tools/serve-audit.py --port 8767 --directory .
```

Medição de Lighthouse, com o Chrome instalado:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npx --yes lighthouse http://localhost:8767 --quiet --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility --output=json --output-path=audit/movimento/lighthouse-depois-gzip.json
```

A referência anterior foi copiada antes das edições para /tmp/br26-motion-baseline. Os relatórios JSON e capturas anteriores estão preservados nesta pasta de auditoria.

## Limitações e próximos passos

- Safari real 26.6.2: o WebDriver recusou a sessão porque “Allow remote automation” está desativado. Nenhuma configuração do usuário foi alterada. WebKit automatizado foi testado, mas não equivale a Safari real ou a iPhone físico.
- Não foi verificado zoom nativo da interface do navegador; o teste automatizado de layout usou zoom CSS de 200%.
- A meta de Performance ≥90 foi atingida no cenário com gzip; no servidor simples permanece em 81. Isso depende do modo de entrega dos arquivos e deve ser confirmado no ambiente publicado depois de uma publicação autorizada.
- A ativação experimental do cursor personalizado permanece fora do fluxo padrão de validação. A opção continua desligada.
- Nenhum commit foi feito. A autorização deve vir em mensagem posterior à apresentação das evidências; não foi executado o comando de aprovação técnica.
- Próximos passos: validar Safari/iPhone reais, revisar as fotos da linha do tempo e, após autorização pertinente, verificar a versão publicada.

## Arquivos desta entrega

- index.html, styles.css e app.js: integração visual e funcional, preservando as alterações locais anteriores.
- motion.js: camada de movimento e interações.
- assets/motion/: variantes estáticas dos escudos e fotos existentes.
- assets/fonts/: mesmas famílias tipográficas e respectivas licenças.
- tools/verify-motion.cjs, tools/verify-motion-edge.cjs e tools/profile-motion.cjs: verificações reproduzíveis.
- tools/serve-audit.py: servidor local de comparação com gzip; sem framework ou build.
- tools/optimize-motion-assets.py: regeneração opcional das variantes existentes; não é etapa de build.
- audit/movimento/: relatório, resultados, capturas e trace desta execução.

## Evidências

### Celular — tela inicial

![Celular — tela inicial](/Users/mac/Desktop/landing-page-p0/audit/movimento/final-390.png)

### Computador — tela inicial

![Computador — tela inicial](/Users/mac/Desktop/landing-page-p0/audit/movimento/final-1440.png)

### Computador — bento da história

![Computador — bento da história](/Users/mac/Desktop/landing-page-p0/audit/movimento/bento-final-1440.png)

### Celular — painel do clube

![Celular — painel do clube](/Users/mac/Desktop/landing-page-p0/audit/movimento/painel-final-390.png)

