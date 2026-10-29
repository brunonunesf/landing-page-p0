from pathlib import Path
import urllib.request,json,concurrent.futures,hashlib
R=Path(__file__).parent
p=R/'curadoria-20.json';m=json.loads(p.read_text());out=R/'assets/curadoria/fontes';out.mkdir(parents=True,exist_ok=True)
def get(x):
 url=x.get('published_image_url')
 if not url or x.get('source_file'):return x
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=25) as r:
   typ=r.headers.get_content_type();data=r.read()
  if not typ.startswith('image/'):raise ValueError('Resposta não é imagem')
  ext={'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp'}.get(typ,'.img')
  rel=f'assets/curadoria/fontes/{x["id"]:02d}{ext}';(R/rel).write_bytes(data)
  x.update(source_file=rel,source_sha256=hashlib.sha256(data).hexdigest(),source_bytes=len(data),source_note='Arquivo publicado preservado byte a byte, sem corte ou filtro. Não equivale necessariamente à matriz original da câmera.')
 except Exception as e:x['download_error']=str(e)
 return x
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:m['items']=list(pool.map(get,m['items']))
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
for x in m['items']:print(x['id'],x.get('source_file',x.get('download_error','foto em seleção')))
