from pathlib import Path
import json,re,html
R=Path(__file__).parent;m=json.loads((R/'curadoria-20.json').read_text());p=R/'index.html';s=p.read_text();e=html.escape
by={x['id']:x for x in m['items']}
order=[2,16,7,8,20,6,1,14,9,4,18,17,12,19,13,11]
labels={1:'Pelé · Santos',2:'Neymar · Santos, 2012',4:'Zico · Flamengo',6:'Gabigol · Flamengo, geração 2019',7:'Romário e Edmundo · Vasco, 2000',8:'Sócrates · Corinthians',9:'Marcelinho Carioca · Corinthians',11:'Luis Suárez · Grêmio, 2023',12:'Alex · Cruzeiro, 2003',13:'Reinaldo · Atlético-MG',14:'Ronaldinho · Atlético-MG, 2012',16:'Falcão · Internacional',17:'Hulk · Atlético-MG, 2021',18:'Bobô · Bahia',19:'Fred · Fluminense, 2012',20:'Filipe Luís · Flamengo, 2025'}
slides=[]
for n in order:
 x=by[n];slides.append(dict(title=labels[n],src=x['source_file'],focus=x.get('desktop_focus','50% 30%'),fit='contain' if n in (1,8,12,20) else 'cover',credit=x['credit'],url=x['source'],note=x['note']))
media='<div class="hero-media" aria-hidden="true">'+''.join(f'<div class="hero-slide {"active" if i==0 else ""}" data-title="{e(x["title"])}" style="--focus:{x["focus"]}"><img src="{e(x["src"])}" style="object-fit:{x["fit"]}" alt=""></div>' for i,x in enumerate(slides))+'</div>'
start=s.index('<div class="hero-media"');end=s.index('<small>CAMPEONATO BRASILEIRO',start);s=s[:start]+media+s[end:]
s=re.sub(r'(<span class="hero-label" id="heroLabel">).*?(</span>)',r'\g<1>Neymar · Santos, 2012\2',s,count=1)
s=s.replace('A sequência abaixo ainda demonstra o acervo anterior; as novas candidatas estão no painel de revisão.','A sequência abaixo demonstra 16 candidatas da nova curadoria. Ceni e Túlio seguem em busca; Dinamite precisa de uma versão maior e Renato ainda precisa ter o ano da foto confirmado.')
start=s.index('<div class="gallery">')
next_heading=s.find('<h3>Próximos personagens',start)
if next_heading == -1:
 next_heading=s.index('<h3>Os 20 itens estão no painel de curadoria',start)
end=next_heading
gallery='<div class="gallery">'+''.join(f'<figure class="photo"><img loading="lazy" src="{e(x["src"])}" alt="{e(x["title"])}"><figcaption><b>{e(x["title"])}</b><p>{e(x["note"])}</p><span class="status">{e(x["credit"])}</span><br><a href="{e(x["url"])}">Ver fonte</a></figcaption></figure>' for x in slides)+'</div>'
s=s[:start]+gallery+s[end:]
start=s.find('<h3>Próximos personagens')
if start == -1:
 start=s.index('<h3>Os 20 itens estão no painel de curadoria')
end=s.index('</section>',start)
s=s[:start]+'<h3>Os 20 itens estão no painel de curadoria</h3><p>As versões publicadas foram guardadas sem novos cortes ou filtros. O painel diferencia candidatas, alternativas e fotos descartadas, com as pendências de data, autoria e enquadramento. As legendas da abertura usam apenas personagem, clube e época documentada.</p>'+s[end:]
p.write_text(s)
(R/'slides.json').write_text(json.dumps(slides,ensure_ascii=False,indent=2)+'\n')
p=R/'preview.js';s=p.read_text();s=s.replace("const titles = [...document.querySelectorAll('.gallery figcaption b')].map(el => el.textContent);", "const titles = slides.map(el => el.dataset.title);");p.write_text(s)
