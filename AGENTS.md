# Preferências deste projeto

Leia e siga [CLAUDE.md](CLAUDE.md) para as regras existentes do projeto.

Em toda entrega de uma execução pedida pelo usuário, aplique a skill
[evidencia-visual](.agents/skills/evidencia-visual/SKILL.md): mostre evidências
reais em celular e computador, inclusive para tarefas sem interface.

## Autorização de commit

Uma instrução antecipada para executar e commitar não é autorização suficiente.
Mostre primeiro o resultado com as duas evidências e aguarde uma mensagem
posterior do usuário autorizando explicitamente o commit. Depois dessa mensagem,
faça o commit sem perguntar novamente, limitando-o ao resultado aprovado.

Prepare os arquivos aprovados e execute `python3 tools/commit-approval.py approve`
imediatamente antes do commit. Nunca execute esse comando sem a autorização
posterior à entrega. Não contorne nem desative o hook. Se o conteúdo mudar,
apresente o novo resultado e obtenha nova autorização.

O hook verifica a autorização técnica; a identificação da mensagem humana e a
ordem entre apresentação e aprovação são responsabilidade do agente.
