---
name: evidencia-visual
description: Apresentar evidências visuais reais em celular e computador sempre que entregar o resultado de uma execução solicitada neste projeto, incluindo tarefas sem interface.
---

Ao executar qualquer tarefa pedida pelo usuário, acompanhe a entrega do resultado com evidências visuais nas versões celular e computador. Esta preferência vale para todas as entregas de execução, inclusive correções pequenas, configuração, scripts e resultados parciais apresentados como concluídos.

- Para interfaces, capture o resultado real em navegador em aproximadamente 390 px e 1440 px de largura. Verifique se o conteúdo alterado aparece; capture outros estados quando necessários para demonstrar o pedido. Siga também as verificações de temas e Séries A/B do projeto quando aplicáveis.
- Para tarefas sem interface, apresente um relatório visual responsivo com resultados reais dos testes ou da execução, capturado nessas duas larguras. Identifique-o como relatório de verificação, sem sugerir que é uma tela do produto.
- Exiba as duas imagens na resposta com rótulos Celular e Computador e caminhos absolutos. Não entregue apenas links, descrições textuais, imagens antigas ou mockups como prova da execução atual.
- Não invente capturas ou resultados. Se houver impedimento real para obter uma evidência, explique o impedimento e o que ficou sem verificar; não afirme que concluiu a verificação visual.
- Antes de commit, mostre o resultado e suas evidências e aguarde autorização explícita do usuário em mensagem posterior à apresentação. Pedidos antecipados como “execute e faça commit” não autorizam esse commit.
- Após essa autorização posterior, prepare apenas os arquivos correspondentes ao resultado aprovado, execute `python3 tools/commit-approval.py approve` e faça o commit sem pedir nova confirmação. A autorização é de uso único e vinculada ao conteúdo preparado e ao HEAD. Não altere o resultado aprovado antes de commitar.
- Nunca gere autorização por conta própria, reutilize aprovação anterior ou contorne o hook com `--no-verify`, `core.hooksPath` alternativo ou comandos equivalentes. Não faça push sem autorização pertinente.
