from pathlib import Path
import json,html
R=Path(__file__).parent
found={x['id']:x for x in json.loads((R/'fontes-pesquisadas.json').read_text())}
rows=[
('Pelé · Santos · anos 1960','gesto','Salto com punho erguido, camisa branca e corpo inteiro. Preservar espaço acima da mão.','Confirmar data e partida da fotografia; preferência Taça Brasil ou Robertão.'),
('Neymar · Santos · 2010–2012','gesto','Moicano, sorriso e comemoração irreverente. Cintura para cima, torcida desfocada.','Nova candidata: sorriso após gol contra o Guaratinguetá, em 2012. Competição diferente permitida pelo usuário.'),
('Rogério Ceni · São Paulo · 2006–2008','ação','Instante do chute da falta, incluindo bola, perna e uniforme de goleiro.','Fonte oficial localizada para Cruzeiro x São Paulo de 2006. Conferir se a imagem retrata esse lance, pois a data da matéria não comprova a data da foto.'),
('Zico · Flamengo · 1980, 1982 ou 1983','gesto','Braços abertos, sorriso e camisa clássica; separado dos demais jogadores.','Candidata de comemoração em 1982; conferir o crédito e o espaço para os braços.'),
('Roberto Dinamite · Vasco · 1974','gesto','Correndo de frente ou braços erguidos, faixa diagonal inteira. Manter textura antiga.','Galeria específica do Brasileiro de 1974 encontrada. Resolução publicada pequena; procurar matriz maior.'),
('Gabigol e Bruno Henrique · Flamengo · 2019','coletiva','Os dois juntos, rostos visíveis e composição horizontal.','Comemoração da dupla em 2019 encontrada. A imagem publicada identifica Flamengo x Fluminense; campeonato diferente está permitido.'),
('Romário e Edmundo · Vasco · 2000','coletiva','Abraço ou comemoração juntos; duas expressões e faixas visíveis.','Mundial de 2000 contra Manchester United: alternativa expressamente aprovada pelo usuário. Legenda pública: Vasco · 2000. Verificar marcas visíveis no corte.'),
('Sócrates · Corinthians · anos 1980','gesto','Punho acima da cabeça, braço inteiro, barba e rosto destacados.','Candidata do gesto clássico localizada. Conferir ano, crédito e margem acima da mão.'),
('Marcelinho Carioca · Corinthians · 1998–1999','ação','Beijando o escudo ou cobrança de falta; expressão intensa e camisa identificável.','Galeria de agência localizada; candidata de comemoração em 1999. É alternativa ao gesto de beijar o escudo.'),
('Túlio Maravilha · Botafogo · 1995','gesto','Peito aberto e braços erguidos. Estrela visível; preferir ângulo levemente baixo.','Página histórica do clube localizada; escolher a fotografia individual de comemoração, sem usar montagem ou pôster como se fosse original.'),
('Luis Suárez · Grêmio · 2023','gesto','Beijo nos dedos com mãos e rosto próximos; camisa tricolor.','Galeria de Grêmio x Vasco, em dezembro de 2023, localizada. Selecionar o gesto individual, sem substituir por foto da família.'),
('Alex · Cruzeiro · 2003','gesto','Braços abertos e cabeça erguida, composição limpa com camisa azul.','Foto de comemoração de 2003 identificada pelo veículo. Confirmar matriz, enquadramento e partida.'),
('Reinaldo · Atlético-MG','gesto','Punho erguido como foco; preservar rosto, braço e listras.','Candidata do gesto clássico encontrada. Não usar reencenação recente como se fosse foto de época.'),
('Ronaldinho · Atlético-MG · 2012','gesto','Sorriso, cabelo preso e hang loose; recorte próximo.','Registro oficial de Atlético x Náutico em 23/06/2012. Selecionar o sorriso e o gesto; a data da partida está documentada.'),
('Renato Gaúcho · Grêmio · 1981','ação','Renato jovem em arrancada com cabelo em movimento e bola no quadro.','Acervo oficial localizado, mas o ano da foto precisa ser confirmado. Cuidado: o Renato citado na final de 1981 é Renato Sá; não confundir com Portaluppi.'),
('Falcão · Internacional · 1979','ação','Conduzindo com cabeça levantada, camisa vermelha e parte do campo.','Acervo oficial do ídolo localizado; a imagem ainda precisa comprovar a temporada de 1979 e o gesto com bola.'),
('Hulk · Atlético-MG · 2021','gesto','Grito, punhos cerrados e braços destacados; cintura para cima.','Registro oficial de Corinthians x Atlético em 17/07/2021. Fotos: Pedro Souza / Atlético.'),
('Bobô · Bahia · campanha de 1988','coletiva','Uniforme tricolor visível, comemoração com atmosfera de torcida.','Especial oficial da campanha localizado. Separar fotografias das artes gráficas do especial e identificar Bobô na cena.'),
('Fred · Fluminense · 2012','gesto','De frente, gritando ou puxando a camisa; listras e expressão preservadas.','Referência oficial sobre a conquista de 2012 localizada. Foto individual de comemoração ainda precisa ser selecionada.'),
('Filipe Luís · Flamengo · 2025','ação','Na lateral instruindo com braço estendido, cabelo comprido e concentração.','Foto de agência encontrada em jogo de 29/10/2025; é Libertadores, permitida se o corte não mostrar marcas da competição. Crédito: Luis Robayo / AFP. Alternativa: festa do Brasileiro de 2025.')]
images={
1:'https://s2.glbimg.com/on0bx3XCTxRQ0WMu3BWMbvpY078=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2022/h/f/gok9BESASbwUdKZ3m3rA/foto21cul-601-pele-d8.jpg',
2:'https://conteudo.imguol.com.br/2012/03/29/neymar-sorri-apos-balancar-as-redes-durante-o-jogo-do-santos-contra-o-guaratingueta-1333070262253_956x500.jpg',
3:found[3]['og:image'],
4:'https://s.glbimg.com/es/ge/f/original/2013/03/01/zico_flamengo_comemoracao_glo.jpg_95.jpg',
5:'https://www.netvasco.com.br/news/noticias10/arquivos/1974roberto3.jpg',
6:found[6]['og:image'],7:found[7]['og:image'],8:found[8]['og:image'],
9:'https://static.gazetaesportiva.com/uploads/imagem/2016/12/31/00151458-1024x687.jpg',
10:found[10]['og:image'],11:found[11]['og:image'],
12:'https://s.glbimg.com/es/ge/f/original/2014/12/03/luxemburgo_alex_cruzeiro_ae_fagnerangelino.jpg',
13:found[13]['og:image'],14:'https://farm9.staticflickr.com/8007/7429510076_8e511aa891.jpg',
15:'https://gremio.blob.core.windows.net/imgs-site/upload-heroi-renato_01.jpg',
16:'https://static.internacional.com.br/cms/assets/full_banner_34c8cd1689.jpg',
17:'https://atletico.com.br/wp-content/uploads/2021/07/51318016836_3fde5b872e_k.jpg',
19:found[19]['og:image']}
source_overrides={
1:'https://valor.globo.com/eu-e/noticia/2022/10/21/pele-aos-82-o-rei-e-o-relacionamento-conturbado-com-seu-reino.ghtml',
2:'https://televisao.uol.com.br/colunas/flavio-ricco/2012/04/13/neymar-participara-do-cqc.htm',
4:'https://ge.globo.com/futebol/times/flamengo/noticia/2014/03/devorador-de-pequenos-fla-tem-raros-exemplos-de-zebra-no-carioca.html',
20:'https://www.gettyimages.com.br/detail/foto-jornal%C3%ADstica/flamengos-head-coach-filipe-luis-gives-instructions-foto-jornal%C3%ADstica/2243546998'}
items=[]
for n,(title,kind,brief,note) in enumerate(rows,1):
 items.append(dict(id=n,title=title,kind=kind,brief=brief,note=note,source=source_overrides.get(n,found[n]['url']),published_image_url=images.get(n),status='candidata: revisar imagem e corte' if n in images else 'foto ainda em seleção',credit={6:'Alexandre Vidal / Flamengo',7:'Antônio Gaudério / Folhapress',8:'Reprodução / Twitter do Corinthians; autoria original a confirmar',9:'Acervo / Gazeta Press',12:'Fagner Angelino / Futura Press',14:'Bruno Cantini / Atlético',17:'Pedro Souza / Atlético',20:'Luis Robayo / AFP'}.get(n,'Autoria a confirmar na fonte'),rights='verificar autorização de uso antes da publicação',original_file=None,desktop_focus='50% 40%',mobile_focus='50% 30%'))
manifest=dict(updated='2026-10-21',rules=['Fotos de outras competições estão autorizadas pelo usuário, sem marcas visíveis que remetam a elas.','Romário e Edmundo no Mundial de 2000 estão expressamente aprovados.','Legendas identificam personagem, clube e época; não atribuir a fotografia ao Brasileirão sem evidência.','Sem montagens de jogadores de partidas diferentes; sem imagens sintéticas para substituir fotografias históricas.','Preservar o arquivo publicado como recebido. Original da câmera ou matriz sem corte exige localização própria.','Cortes devem manter rosto, mãos, cabelo e bola, quando fizerem parte do gesto.','Desktop: personagem à direita, texto à esquerda. Celular: definir recorte próprio por foto.','Troca automática em 6 segundos; transição suave; pausa e movimento reduzido.'],proposed_order=[1,3,6,8,16,7,2,15,18,4,9,20,5,14,10,12,17,19,13,11],items=items)
(R/'curadoria-20.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
