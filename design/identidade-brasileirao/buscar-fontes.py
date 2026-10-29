import json,urllib.request,concurrent.futures
from html.parser import HTMLParser
from pathlib import Path
sources=[
(1,'https://www.santosfc.com.br/memoria-com-dois-gols-de-pele-santos-fc-conquistava-o-terceiro-titulo-nacional/'),
(2,'https://www.neymarjr.com/pt/futebol/neymar-jr-10-fatos-libertadores-tri-2011-santos'),
(3,'https://www.saopaulofc.net/rogerio-ceni-o-gol-inusitado-do-m1to/'),
(4,'https://www.zico.com.br/'),
(5,'https://www.netvasco.com.br/news/noticias10/19145.shtml'),
(6,'https://www.uol.com.br/esporte/futebol/ultimas-noticias/2019/09/14/gabigol-e-b-henrique-se-conheceram-no-santos-mas-dupla-so-explodiu-no-fla.htm'),
(7,'https://www.uol.com.br/esporte/futebol/ultimas-noticias/lancepress/2022/11/06/ex-jogadores-do-vasco-romario-e-edmundo-comemoram-o-acesso-na-internet.htm'),
(8,'https://ge.globo.com/futebol/times/corinthians/noticia/2013/06/apos-protestos-corinthians-sauda-torcida-com-imagem-de-socrates.html'),
(9,'https://www.gazetaesportiva.com/times/corinthians/veja-galeria-com-fotos-de-marcelinho-carioca/'),
(10,'https://www.botafogo.com.br/noticias/tu-s-o-glorioso-17'),
(11,'https://esportes.r7.com/futebol/fotos/suarez-marca-no-adeus-a-torcida-do-gremio-apos-viver-temporada-vitoriosa-no-brasil-03122023/'),
(12,'https://ge.globo.com/futebol/times/cruzeiro/noticia/2015/05/cruzeiro-anuncia-homenagem-meia-alex-camisa-10-na-triplice-coroa.html'),
(13,'https://ge.globo.com/futebol/times/atletico-mg/noticia/vida-longa-mais-presente-no-atletico-mg-e-homenageado-em-titulo-reinaldo-completa-65-anos.ghtml'),
(14,'https://atletico.com.br/galo-goleia-na-estreia-de-ronaldinho-em-belo-horizonte/'),
(15,'https://gremio.net/herois/heroi/9'),
(16,'https://cas.internacional.com.br/clube/idolos/falcao'),
(17,'https://atletico.com.br/hulk-comemora-virada-e-exalta-espirito-de-luta-do-time/'),
(18,'https://www.esporteclubebahia.com.br/especial-1988/'),
(19,'https://fluminense.com.br/noticia/nove-anos-do-tetra-fred-e-leandro-euzebio-recordam-conquista-historica'),
(20,'https://www.cbf.com.br/futebol-brasileiro/noticias/noticias-campeonato-brasileiro-serie-a/a/flamengo-e-campeao-do-brasileirao-betano-2025')]
class P(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.img=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':
   k=a.get('property',a.get('name',''))
   if k in ('og:image','og:title','twitter:image'):self.meta[k]=a.get('content')
  if tag=='img':
   self.img.append({k:v for k,v in a.items() if k in ('src','data-src','alt','width','height')})
def get(item):
 n,url=item
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=22) as r:raw=r.read().decode('utf-8',errors='replace')
  p=P();p.feed(raw)
  return dict(id=n,url=url,**p.meta,images=p.img)
 except Exception as e:return dict(id=n,url=url,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:results=list(ex.map(get,sources))
Path(__file__).with_name('fontes-pesquisadas.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
for x in results:print(json.dumps(dict(id=x['id'],title=x.get('og:title'),image=x.get('og:image'),error=x.get('error'),photos=x.get('images',[])[-8:]),ensure_ascii=False))
