from pathlib import Path
import json
R=Path(__file__).parent;p=R/'curadoria-20.json';m=json.loads(p.read_text())
updates={
8:('https://conteudo.imguol.com.br/c/esporte/0d/2021/02/19/socrates-comemorando-gol-pelo-corinthians-1613756247465_v2_4x3.jpg','https://www.uol.com.br/ecoa/ultimas-noticias/2022/11/24/socrates-foi-o-jogador-de-futebol-mais-politizado-que-o-brasil-ja-teve.htm','Rodolpho Machado; confirmar crédito na página','Substitui a arte com texto pela fotografia do gesto. Conferir ano e margem acima do punho.'),
9:('https://cloudfront-us-east-1.images.arcpublishing.com/newr7/UMLF44PCVFMM7KWULMHANKLHQM.jpg','https://esportes.r7.com/futebol/fotos/veja-grandes-momentos-da-volta-de-marcelinho-carioca-ao-corinthians-12052018/','Confirmar crédito da agência na galeria','Alternativa de comemoração coletiva no período da volta ao Corinthians. Não é o gesto de beijar o escudo; data da foto ainda a confirmar.'),
11:('https://static.tvgazeta.com.br/uploads/2023/01/Suarez-gremio-1024x683.jpg','https://www.tvgazeta.com.br/','Autoria a confirmar; imagem publicada pela TV Gazeta','Candidata ao beijo nos dedos na estreia de 2023, pela Recopa Gaúcha. Permitida se não aparecerem marcas da competição. Falta localizar a matéria original da emissora.'),
14:('https://conteudo.imguol.com.br/2012/11/18/ronaldinho-gaucho-comemora-gol-do-atletico-mg-na-partida-contra-o-lanterna-atletico-go-no-independencia-1353274888910_956x500.jpg','https://www.uol.com.br/esporte/futebol/ultimas-noticias/2012/11/22/ronaldinho-janta-com-nova-namorada-em-restaurante-de-bh-come-costela-de-porco-e-da-autografos.htm','Confirmar crédito da fotografia na fonte','Comemoração contra Atlético-GO em 18/11/2012. Gesto de coração como alternativa ao hang loose; época e contexto compatíveis.'),
15:('https://i.pinimg.com/originals/59/cb/5f/59cb5f954341cf9cd40b8c7ac7de80c7.jpg','https://www.pinterest.com/pin/217720963222024165/','Fotógrafo e matriz original ainda não identificados','Referência visual de Renato com bola. Fonte de descoberta, não acervo original. Ano de 1981 e autoria não comprovados; não entra no carrossel enquanto isso.'),
16:('https://lncimg.lance.com.br/uploads/2025/08/falcao_idolos_internacional-aspect-ratio-512-320.jpg','https://www.lance.com.br/lancepedia/cruzeiro-2-x-3-internacional-brasileirao-1979.html','Confirmar crédito e matriz na fonte','Candidata de Falcão com bola em retrospectiva de 1979. Versão publicada pequena; procurar matriz maior e confirmar data da foto.'),
18:('https://www.ogol.com.br/img/geral/687521_ori_.png','https://www.ogol.com.br/historia/1988-com-elegancia-sutil-bahia-triunfa/12350','Fotógrafo ainda a identificar na fonte','Candidata individual de Bobô comemorando. Camisa branca do Bahia, alternativa à tricolor; conferir a identificação e a data na fonte.'),
19:('https://conteudo.imguol.com.br/2012/11/11/fred-comemora-o-gol-da-vitoria-do-fluminense-sobre-o-palmeiras-com-o-triunfo-por-3-a-2-o-time-carioca-foi-campeao-1352671048200_1024x768.jpg','https://ge.globo.com/futebol/times/fluminense/noticia/2022/11/11/ha-dez-anos-fluminense-era-tetracampeao-brasileiro-foi-um-ano-espetacular-lembra-fred.ghtml','Confirmar crédito no arquivo e no veículo de origem','Foto do gol do título em 11/11/2012. Uniforme grená como alternativa às listras. Substitui a imagem recente de entrevista que foi descartada.'),
20:('https://conteudo.imguol.com.br/c/esporte/7c/2025/03/08/filipe-luis-orienta-os-jogadores-do-flamengo-1741483255570_v2_1x1.jpg','https://www.uol.com.br/esporte/','Autoria e matéria original a localizar','Candidata de instrução em 2025. A imagem foi localizada na busca, mas ainda falta vincular à matéria original e confirmar a partida.')}
for x in m['items']:
 n=x['id']
 if n in updates:
  url,source,credit,note=updates[n]
  x['published_image_url']=url;x['source']=source;x['credit']=credit;x['note']=note
  for k in ['source_file','source_sha256','source_bytes','download_error']:x.pop(k,None)
 if n==3:
  x['status']='descartada: não mostra a cobrança';x['note']='A foto localizada na matéria de 2006 mostra comemoração, não o chute. Fora da sequência; continuar a busca por bola, perna e uniforme visíveis.'
 if n==10:
  x['status']='descartada: foto de equipe';x['note']='O registro encontrado é de equipe, sem destacar Túlio como solicitado. Continua a busca por comemoração individual de 1995.'
 if n in (1,4,5,6,7,8,12,13,17):x['status']='candidata visual: conferir crédito, data e corte'
 if n in (9,11,14,15,16,18,19,20):x['status']='alternativa visual: revisar diferenças'
 if n==5:x['kind']='ação';x['note']='Galeria específica do Brasileiro de 1974: a candidata mostra Dinamite com bola. Alternativa de ação; a imagem publicada tem apenas 390 × 294 px e não serve como fundo final.'
 if n==9:x['kind']='coletiva'
 if n==12:x['note']='Candidata de 2003 com punho erguido e rosto visível, alternativa aos braços abertos. Fotografia vertical com enquadramento limpo.'
 if n==17:x['note']='Candidata de 17/07/2021, contra o Corinthians. Expressão forte e braço apontando, alternativa aos punhos cerrados. Pedro Souza / Atlético.'
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
