# DESIGN — proposta para a classificação do Brasileirão

Status: aplicado localmente em 28/10/2026, após autorização do usuário. Evidências e comparação em [audit/design-proposta/comparacao.md](audit/design-proposta/comparacao.md).
Referência: `styles.css`, `app.js` e inspeção do site local em 28/10/2026.
Preservar o recorte histórico de 17/10/2026, os textos em português e as identidades dos clubes.

## Direção visual

Manter o caráter editorial esportivo atual: títulos Archivo de peso alto, estatísticas em DM Mono, superfícies claras quentes, verde profundo e limão nos destaques. A principal mudança proposta é tornar o acesso aos detalhes de cada time explícito e permanente. Hoje há uma seta na tabela; nos cartões móveis, a ação depende da percepção de que o cartão inteiro é clicável.

## Tipografia proposta

Base do navegador: 16px; manter unidades rem para respeitar as preferências de leitura. Os valores abaixo são os alvos desta proposta, não uma descrição de todos os estilos atuais.

| Uso | Família e alternativas | Peso | Computador | Celular | Entrelinha | Entreletras |
|---|---|---:|---:|---:|---:|---:|
| Corpo | Archivo, "Times New Roman", serif | 400 | 16px / 1rem | 16px / 1rem | 1,65 | 0 |
| Título da capa | Archivo, "Times New Roman", serif | 800 | 80px / 5rem | 48px / 3rem | 1 | -0,04em |
| Título de seção | Archivo, "Times New Roman", serif | 800 | 32px / 2rem | 28px / 1,75rem | 1,15 | -0,03em |
| Nome do time | Archivo, "Times New Roman", serif | 700 | 16px / 1rem | 14px / 0,875rem | 1,4 | 0 |
| Pontos | Archivo, "Times New Roman", serif | 800 | 22px / 1,375rem | 22px / 1,375rem | 1,2 | 0 |
| Estatísticas e posição | DM Mono, monospace | 500 | 14px / 0,875rem | 14px / 0,875rem | 1,5 | 0 |
| Rótulos auxiliares | DM Mono, monospace | 500 | 12px / 0,75rem | 12px / 0,75rem | 1,5 | 0,04em |
| Botão Ver detalhes | Archivo, "Times New Roman", serif | 700 | 14px / 0,875rem | 14px / 0,875rem | 20px / 1,25rem | 0 |
| Nome no painel de detalhes | Archivo, "Times New Roman", serif | 800 | 42px / 2,625rem | 36px / 2,25rem | 1,1 | -0,03em |

Aplicar números tabulares às estatísticas. Reservar caixa alta para rótulos curtos. Não truncar nomes de times: permitir quebra de linha. No zoom de 200%, permitir crescimento vertical.

## Cores

Reutilizar os tokens semânticos existentes, evitando ampliar a paleta numerada.

| Token / papel | Claro | Escuro |
|---|---|---|
| Fundo `--bg` | #F3F2E9 | #081E16 |
| Superfície `--surface` | #FFFEF8 | #102B20 |
| Superfície secundária `--surface-2` | #E9ECE2 | #1A3529 |
| Borda `--border` | #C7CEC3 | #496252 |
| Texto `--text` | #102C20 | #EEF3ED |
| Texto secundário `--text-muted` | #4D6154 | #B2C2B6 |
| Destaque textual `--accent` | #426117 | #CAE895 |
| Limão `--accent-fill` | #C8FF00 | #C8FF00 |
| Texto sobre limão `--accent-ink` | #10230C | #10230C |

O novo botão usa fundo #C8FF00, texto #10230C e borda de 1px #426117 nos dois temas. Hover: fundo #D9FF43, texto #10230C. Pressionado: fundo #B7E600. Foco: contorno de 3px em `--text`, com afastamento de 3px. A visibilidade não pode depender de hover, animação ou cor isolada. Conferir contraste mínimo de 4,5:1 no texto e 3:1 no indicador de foco contra a superfície adjacente. Preservar cores próprias dos clubes nos painéis.

## Espaçamento e dimensões

Escala: 4, 8, 12, 16, 24, 32, 48 e 96px, correspondente aos tokens `--space-1` a `--space-8` já existentes.

| Elemento | Computador (a partir de 851px) | Celular e tablet (até 850px) |
|---|---|---|
| Margens laterais da classificação | 7vw (100,8px em 1440px) | 5vw (19,5px em 390px) |
| Respiro vertical de seção | 48px | 32px |
| Título até controles / conteúdo | 24px | 24px |
| Linha / cartão do time | mínimo 76px; padding 12px 16px | altura automática; padding 16px; gap 8px |
| Escudo na classificação | 40 × 40px | 32 × 36px |
| Botão de detalhes | mínimo 124 × 44px; padding 12px 16px | mínimo 124 × 44px; padding 12px 16px |
| Ícone do botão | 16 × 16px; gap 8px para o texto | 16 × 16px; gap 8px para o texto |
| Raio do botão | 6px | 6px |
| Painel de detalhes | largura min(650px, 100%); padding 32px | largura 100%; padding 24px |
| Seções internas do painel | gap 24px | gap 24px |

Na tabela, reservar 140px para a última coluna (botão mais respiro), ajustando também o cabeçalho. Até 850px, usar cartões; o botão ocupa uma linha abaixo do nome e das estatísticas, alinhado à esquerda, com margem superior de 12px. Não comprimir estatísticas nem criar rolagem horizontal para acomodá-lo.

## 1. Critério — acesso a detalhes mais visível

- Exibir “Ver detalhes” com ícone de seta em todos os times das Séries A e B, nos dois temas e sem interação prévia.
- Usar um botão nativo com nome acessível “Ver detalhes do [time]”, `aria-haspopup="dialog"` e alvo mínimo de 44 × 44px.
- Preservar o clique na linha/cartão. Evitar controles interativos aninhados: linha/cartão pode ser um contêiner com clique auxiliar, e o botão deve ser o único ponto de tabulação para abrir aquele time.
- Clique, toque, Enter e Espaço devem abrir uma única vez o painel do time correto. Manter os detalhes, expansão e comemorações existentes.
- Fechar por botão, Escape e fundo; devolver o foco ao botão acionador, liberar a página e impedir foco atrás do diálogo enquanto aberto.
- Transições: cor/fundo em 150ms; com movimento reduzido, eliminar movimentos e transições dispensáveis.

## 2. Evidência — antes, depois e comparação com este arquivo

Antes de alterar a interface, capturar a classificação em 390 × 844px e 1440 × 900px para cada combinação: Série A/B × claro/escuro (8 capturas). Depois, repetir as mesmas 8 capturas, com zoom de 100%, mesma posição de rolagem, primeiro time visível e cursor afastado. Registrar também o painel aberto em celular e computador. Usar arquivos reais do navegador; nunca chamar um mockup de resultado.

Guardar em `audit/design-proposta/antes/` e `audit/design-proposta/depois/`, com nome `[largura]-[serie]-[tema].png`. Registro da execução: os conjuntos “antes” e “depois” foram capturados nesta aplicação; a revisão funcional está em `audit/design-proposta/revisao-funcional.json`.

Produzir uma tabela de conferência com: seletor/elemento, propriedade, alvo deste DESIGN.md, valor computado antes, valor computado depois, aprovado/reprovado e caminho do print. Conferir família, peso, tamanho, entrelinha, cores, borda, padding, gap, raio, largura e altura do botão. Para o tamanho mínimo, comparar dimensões reais; para rem, registrar também a base efetiva. Prints demonstram aparência; valores computados demonstram medidas.

## 3. Limite — no máximo três rodadas de ajustes

O registro inicial não conta como rodada. Cada rodada contém: alterações, testes, comparação com este arquivo e capturas do resultado. Corrigir primeiro problemas de acesso aos detalhes, depois visibilidade e acabamento. Registrar as pendências e o resultado de cada rodada.

Parar assim que os critérios passarem. Após a terceira rodada, não iniciar uma quarta: apresentar evidências, listar pendências concretas e perguntar ao usuário quais devem ser tratadas e se autoriza outro ciclo. Não ocultar falhas nem declarar conclusão com acesso aos detalhes quebrado.

## 4. Revisão separada — aparência e funcionamento

Fazer uma segunda passagem após a revisão visual, com checklist e registro próprios, sem presumir que aparência correta garante funcionamento. Essa revisão pode ser executada pelo mesmo responsável em etapa separada.

- Revisão visual: oito combinações de largura/série/tema; botão permanente, legível, sem sobreposição, sem rolagem horizontal; conferir os valores computados e o zoom de 200%.
- Segunda revisão funcional: abrir os 20 times de cada série nas duas larguras e temas; conferir nome/código do time e conteúdo do painel. Testar botão explícito, clique auxiliar da linha/cartão, expansão quando disponível, fechar e reabrir, troca de série e tema.
- Por teclado: alcançar o controle por Tab, abrir por Enter e Espaço, navegar dentro do painel, fechar por Escape e botão, conferir contenção e retorno do foco. Verificar fechamento por fundo, ausência de abertura duplicada e comportamento com movimento reduzido.
- Conferir console e erros de execução. Validar sintaxe dos scripts modificados. Não atualizar dados históricos para resolver problemas visuais.

Registrar a segunda revisão em relatório separado com casos, resultados e falhas. Se ela exigir mudanças, repetir a revisão visual afetada e a funcional, respeitando o teto de três rodadas.

## Entrega e commit

Entregar o resultado com evidências reais de celular e computador. Commit somente após uma mensagem humana posterior à apresentação autorizar explicitamente o resultado; seguir o procedimento de `AGENTS.md`. Este documento não autoriza implementação nem commit por si só.
