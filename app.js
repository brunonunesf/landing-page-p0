const crestBase='assets/escudos/';
const clubsAFallback=[
['FLA','Flamengo',64,30,19,7,4,58,25,'VEVVV',['Pedro|16','Samuel Lino|9','Lucas Paquetá|6'],'Bahia','F','18/10 · 18h30'],
['PAL','Palmeiras',63,30,18,9,3,52,22,'VVEVE',['Flaco López|9','Maurício|8','Vitor Roque|5'],'Athletico-PR','F','17/10 · 21h00'],
['CAP','Athletico-PR',53,30,15,8,7,49,35,'VEVED',['Viveros|21','Mendoza|5','Zapelli|4'],'Palmeiras','C','17/10 · 21h00'],
['FLU','Fluminense',51,30,14,9,7,48,37,'DVVDV',['John Kennedy|9','Hulk|7','Savarino|6'],'Santos','C','18/10 · 16h00'],
['BAH','Bahia',49,30,13,10,7,44,36,'VDDVV',['Luciano Juba|10','Willian José|7','Everton Ribeiro|5'],'Flamengo','C','18/10 · 18h30'],
['CRU','Cruzeiro',48,30,14,6,10,46,44,'DVVDV',['Matheus Pereira|9','Kaio Jorge|8','Sinisterra|5'],'Grêmio','F','18/10 · 18h30'],
['CAM','Atlético-MG',47,30,13,8,9,41,35,'VEVEV',['Hulk|7','Rony|6','Igor Gomes|4'],'Coritiba','C','17/10 · 18h30'],
['SAN','Santos',42,30,11,9,10,46,45,'DEVVV',['Gabriel|14','Neymar|8','Barreal|5'],'Fluminense','F','18/10 · 16h00'],
['RBB','Bragantino',40,30,11,7,12,38,35,'VEDDE',['Lucas Barbosa|6','Eduardo Sasha|5','Jhon Jhon|4'],'Remo','F','18/10 · 18h30'],
['SAO','São Paulo',39,30,11,6,13,35,35,'VDDVD',['Calleri|10','Luciano|9','Ferreira|4'],'Vasco','F','19/10 · 20h00'],
['CFC','Coritiba',39,30,10,9,11,38,48,'EDDED',['Breno Lopes|8','Lavega|5','Josué|4'],'Atlético-MG','F','17/10 · 18h30'],
['VIT','Vitória',36,30,10,6,14,33,44,'DVDEV',['Renê|9','Matheuzinho|5','Osvaldo|4'],'Corinthians','F','18/10 · 20h30'],
['BOT','Botafogo',36,30,9,9,12,43,48,'EDDVE',['Danilo|10','Arthur Cabral|7','Savarino|5'],'Chapecoense','C','17/10 · 18h00'],
['VAS','Vasco',35,29,9,8,12,36,42,'EVVVD',['Pablo Vegetti|9','Rayan|7','Philippe Coutinho|5'],'São Paulo','C','19/10 · 20h00'],
['MIR','Mirassol',33,30,8,9,13,34,44,'DEVEV',['Alesson|6','Chico da Costa|5','Negueba|4'],'Internacional','C','16/10 · 20h00'],
['COR','Corinthians',32,30,8,8,14,31,38,'DDDDD',['Yuri Alberto|8','Memphis Depay|6','Garro|4'],'Vitória','C','18/10 · 20h30'],
['INT','Internacional',32,30,7,11,12,33,38,'EVDVD',['Carbonero|7','Borré|6','Alan Patrick|5'],'Mirassol','F','16/10 · 20h00'],
['GRE','Grêmio',31,30,7,10,13,32,40,'EEEDD',['Carlos Vinícius|10','Braithwaite|6','Cristaldo|4'],'Cruzeiro','C','18/10 · 18h30'],
['REM','Remo',25,30,5,10,15,33,48,'EEDDD',['Jajá|7','Alef Manga|5','Pedro Rocha|4'],'Bragantino','C','18/10 · 18h30'],
['CHA','Chapecoense',18,30,3,9,18,30,61,'DDEDV',['Marcinho|6','Perotti|5','Walterson|4'],'Botafogo','F','17/10 · 18h00']
].map((c,i)=>({code:c[0],name:c[1],pts:c[2],j:c[3],v:c[4],e:c[5],d:c[6],gp:c[7],gc:c[8],form:c[9],scorers:c[10],next:c[11],venue:c[12],date:c[13],pos:i+1}));
const clubsA=window.seriesAData||clubsAFallback;
const clubsB=window.seriesBData||[];
Object.entries(window.seriesPhotos||{}).forEach(([name,url])=>{if(!playerPhotos[name])playerPhotos[name]=url});
playerPhotos['Jorge Carrascal']='https://storage.googleapis.com/crf-strapi-media-prd/CARRASCAL_Fut_Prof_Masc_69cb5c6eed/CARRASCAL_Fut_Prof_Masc_69cb5c6eed.png';
let division='A',clubs=clubsA;

const zone=p=>division==='B'?(p<=4?'#c8f631':p>=17?'#ee604e':'transparent'):(p<=4?'#c8f631':p<=6?'#4bd57d':p<=12?'#52a7d8':p>=17?'#ee604e':'transparent');
const crest=c=>`${crestBase}${c}.png?v=escudos-oficiais-20261017`;
const dots=f=>[...f].map(x=>`<i class="dot ${x}" title="${x==='V'?'Vitória':x==='D'?'Derrota':'Empate'}"></i>`).join('');
const table=document.querySelector('#tableBody');
function renderTable(){
  table.innerHTML=clubs.map(c=>`<div class="club-entry" style="--zone:${zone(c.pos)}"><div class="club-row row-grid" tabindex="0" role="button" aria-label="Ver detalhes do ${c.name}" data-code="${c.code}"><span class="pos">${String(c.pos).padStart(2,'0')}</span><span class="club"><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}" loading="lazy">${c.name}</span><strong class="pts">${c.pts}</strong><span class="stat">${c.j}</span><span class="stat">${c.v}</span><span class="stat">${c.gp}</span><span class="stat">${c.gc}</span><span class="stat">${c.gp-c.gc>0?'+':''}${c.gp-c.gc}</span><span class="form">${dots(c.form)}</span><span class="arrow">↗</span></div><div class="hover-details"><span><small>APROVEITAMENTO</small><b>${((c.pts/(c.j*3))*100).toFixed(1).replace('.',',')}%</b></span><span><small>VALOR DO ELENCO</small><b>${marketData[c.code]?.total||'N/D'}</b></span><span><small>PRÓXIMO</small><b>${c.next} · ${c.venue}</b></span><span class="hover-form"><small>RECENTE</small><span class="form">${dots(c.form)}</span></span><em>Clique para abrir a análise completa →</em></div></div>`).join('');
  document.querySelector('#mobileCards').innerHTML=clubs.map(c=>`<article class="mobile-card" tabindex="0" role="button" data-code="${c.code}" style="--zone:${zone(c.pos)}"><i class="zone"></i><span class="pos">${String(c.pos).padStart(2,'0')}</span><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}" loading="lazy"><div><h3>${c.name}</h3><p class="form">${dots(c.form)}</p></div><div class="points"><strong>${c.pts}</strong><span>PONTOS</span></div></article>`).join('');
}
renderTable();

const sheet=document.querySelector('#detailSheet'),backdrop=document.querySelector('#backdrop'),content=document.querySelector('#detailContent');
const extras={
FLA:{o:['Fluminense','Botafogo','Cruzeiro','Palmeiras','Santos'],a:['Arrascaeta|9','Samuel Lino|6','Lucas Paquetá|6']},PAL:{o:['Corinthians','Mirassol','Bahia','Flamengo','Santos'],a:['Maurício|7','Vitor Roque|5','Flaco López|5']},CAP:{o:['Chapecoense','Santos','Fluminense','Atlético-MG','Coritiba'],a:['Zapelli|7','Viveros|5','Mendoza|4']},FLU:{o:['Flamengo','Botafogo','Vitória','Cruzeiro','Bahia'],a:['Savarino|7','Lucho Acosta|6','John Kennedy|4']},BAH:{o:['Mirassol','Vitória','Fluminense','Remo','Palmeiras'],a:['Everton Ribeiro|8','Luciano Juba|7','Jean Lucas|4']},CRU:{o:['Bragantino','Internacional','São Paulo','Fluminense','Bahia'],a:['Matheus Pereira|11','Sinisterra|5','Kaio Jorge|4']},CAM:{o:['Santos','Athletico-PR','Bahia','Remo','Flamengo'],a:['Igor Gomes|6','Hulk|5','Rony|4']},SAN:{o:['Atlético-MG','Vitória','Palmeiras','Coritiba','Remo'],a:['Neymar|8','Barreal|6','Gabriel|4']},RBB:{o:['Cruzeiro','Atlético-MG','Coritiba','São Paulo','Bahia'],a:['Jhon Jhon|7','Eduardo Sasha|5','Lucas Barbosa|4']},SAO:{o:['Vitória','Bragantino','Flamengo','Santos','Palmeiras'],a:['Luciano|6','Ferreira|5','Calleri|4']},CFC:{o:['Botafogo','Remo','Bragantino','Santos','Chapecoense'],a:['Josué|7','Breno Lopes|5','Lavega|4']},VIT:{o:['São Paulo','Fluminense','Chapecoense','Santos','Corinthians'],a:['Matheuzinho|6','Osvaldo|4','Renê|3']},BOT:{o:['Coritiba','Flamengo','Grêmio','Remo','Fluminense'],a:['Savarino|7','Danilo|5','Arthur Cabral|4']},VAS:{o:['Remo','Palmeiras','Internacional','Vitória','Flamengo'],a:['Philippe Coutinho|7','Rayan|5','Thiago Mendes|4']},MIR:{o:['Bahia','Palmeiras','Santos','Chapecoense','Coritiba'],a:['Negueba|5','Alesson|4','Igor Formiga|4']},COR:{o:['Palmeiras','São Paulo','Santos','Vitória','Flamengo'],a:['Garro|7','Memphis Depay|5','Yuri Alberto|4']},INT:{o:['Grêmio','Vasco','Cruzeiro','Coritiba','Fluminense'],a:['Alan Patrick|7','Carbonero|5','Borré|4']},GRE:{o:['Internacional','Botafogo','Vasco','Santos','Palmeiras'],a:['Cristaldo|6','Braithwaite|5','Carlos Vinícius|4']},REM:{o:['Vasco','Bahia','Botafogo','Santos','Coritiba'],a:['Pedro Rocha|6','Alef Manga|4','Jajá|3']},CHA:{o:['Athletico-PR','Mirassol','Vitória','Coritiba','Palmeiras'],a:['Walterson|5','Perotti|4','Marcinho|3']}
};
const reviewedOpponents={FLA:['Fluminense','Santos','Bragantino','Corinthians','Remo'],PAL:['Corinthians','Bahia','Grêmio','São Paulo','Botafogo'],CAP:['Chapecoense','Atlético-MG','Bahia','Coritiba','Cruzeiro'],FLU:['Flamengo','Coritiba','Corinthians','Atlético-MG','Vasco'],BAH:['Mirassol','Palmeiras','Athletico-PR','Remo','Bragantino'],CRU:['Bragantino','São Paulo','Vitória','Santos','Athletico-PR'],CAM:['Santos','Athletico-PR','Bragantino','Chapecoense','Fluminense'],SAN:['Atlético-MG','Flamengo','São Paulo','Remo','Cruzeiro'],RBB:['Cruzeiro','Mirassol','Atlético-MG','Flamengo','Botafogo'],SAO:['Vitória','Cruzeiro','Santos','Internacional','Palmeiras'],CFC:['Botafogo','Fluminense','Vasco','Athletico-PR','Mirassol'],VIT:['São Paulo','Chapecoense','Cruzeiro','Mirassol','Grêmio'],BOT:['Coritiba','Vasco','Mirassol','Grêmio','Bragantino'],VAS:['Remo','Botafogo','Coritiba','Grêmio','Fluminense'],MIR:['Bahia','Bragantino','Botafogo','Vitória','Coritiba'],COR:['Palmeiras','Internacional','Fluminense','Flamengo','Chapecoense'],INT:['Grêmio','Corinthians','São Paulo','Chapecoense','Santos'],GRE:['Internacional','Remo','Palmeiras','Botafogo','Vasco'],REM:['Vasco','Grêmio','Santos','Bahia','Flamengo'],CHA:['Athletico-PR','Vitória','Atlético-MG','Internacional','Corinthians']};
Object.entries(reviewedOpponents).forEach(([code,opponents])=>{extras[code].o=opponents});
function playerVisual(name){const initials=name.split(' ').map(x=>x[0]).join('').slice(0,2);return playerPhotos[name]?`<img class="avatar" src="${playerPhotos[name]}" alt="Foto de ${name}" onerror="this.outerHTML='<span class=&quot;avatar-fallback&quot;>${initials}</span>'">`:`<span class="avatar-fallback" title="Retrato não disponível">${initials}</span>`}
let pinned=false,closeTimer;
const rankList=(items,label)=>items.map((s,i)=>{const[n,v]=s.split('|');return `<div class="scorer assist"><div class="assist-photo">${playerVisual(n)}<span class="assist-rank">0${i+1}</span></div><b>${n}</b><em>${v} ${label}</em></div>`}).join('');
const searchUrl=q=>`https://www.google.com/search?q=${encodeURIComponent(`${q} site:ge.globo.com antes:${division==='A'?'2026-10-21':'2026-10-18'}`)}`;
const marketList=code=>(marketData[code]?.players||[]).map((p,i)=>`<a class="market-player" href="${marketData[code].kader}" target="_blank" rel="noreferrer"><img src="${p.photo}" alt="Foto de ${p.name}" loading="lazy"><span><small>0${i+1}</small><b>${p.name}</b></span><em>${p.value}</em></a>`).join('');
function openClub(code,expanded=false){
  const c=clubs.find(x=>x.code===code),x=extras[code],market=marketData[code],pct=((c.pts/(c.j*3))*100).toFixed(1).replace('.',',');
  pinned=expanded;sheet.classList.toggle('expanded',expanded);
  const games=c.games||[...c.form].map((r,i)=>({r,opp:x?.o[i]||'Adversário',score:''}));
  const scorers=c.scorers.length?`<div class="detail-section"><h4>TOP 3 ARTILHEIROS · BRASILEIRÃO</h4>${c.scorers.map((s,i)=>{const[n,g]=s.split('|');return `<div class="scorer">${playerVisual(n)}<b><small>0${i+1}</small>${n}</b><em>${g} GOLS</em></div>`}).join('')}</div>`:'';
  const assists=division==='A'&&c.assists?.length?`<div class="detail-section"><h4>TOP 3 EM ASSISTÊNCIAS</h4>${rankList(c.assists,'ASSIST.')}</div>`:`<div class="data-note">Assistências individuais da Série B não foram exibidas sem uma fonte consolidada no recorte. A artilharia foi calculada pelas súmulas dos jogos.</div>`;
  const valuables=marketList(code)||'<div class="data-note">Avaliações individuais não disponíveis.</div>';
  const newsUrl=searchUrl(`${c.name} últimas notícias futebol`),previewUrl=searchUrl(`${c.name} x ${c.next} prévia próximo jogo`);
  content.innerHTML=`<div class="detail-top"><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}"><div><small>SÉRIE ${division} · ${String(c.pos).padStart(2,'0')}º NA CLASSIFICAÇÃO</small><h3>${c.name}</h3></div></div>
  <div class="detail-stats"><div class="detail-stat"><span>VITÓRIAS</span><strong>${c.v}</strong></div><div class="detail-stat"><span>GOLS PRÓ</span><strong>${c.gp}</strong></div><div class="detail-stat"><span>GOLS CONTRA</span><strong>${c.gc}</strong></div></div>
  <div class="market-total"><span>VALOR DE MERCADO DO ELENCO</span><strong>${market?.total||'N/D'}</strong><a href="${market?.kader||'#'}" target="_blank" rel="noreferrer">VER NO TRANSFERMARKT ↗</a></div>
  <div class="detail-section"><h4>APROVEITAMENTO</h4><div class="percent">${pct}%</div></div>
  <div class="detail-section"><h4>FORMA · ÚLTIMOS 5</h4><div class="form large">${dots(c.form)}</div></div>${scorers}
  <div class="detail-section"><h4>TOP 3 MAIS VALIOSOS DO ELENCO</h4>${valuables}</div>
  ${expanded?`<div class="detail-section"><h4>ÚLTIMOS CINCO JOGOS</h4><div class="match-list">${games.map(g=>`<div class="match"><span class="result ${g.r}">${g.r}</span><b>${g.score}</b><span>${g.opp}</span></div>`).join('')}</div></div>${assists}`:`<button class="expand-hint" data-expand="${code}">Clique para ver jogos, mercado e notícias →</button>`}
  <div class="next-game"><small>PRÓXIMO JOGO APÓS O RECORTE</small><div class="fixture"><strong>${c.next}</strong><span class="venue">${c.venue} · ${c.venue==='C'?'CASA':'FORA'}</span></div><div class="next-date">${c.date}</div></div>
  <div class="detail-section news-section"><h4>NOTÍCIAS E PRÉVIA</h4><a class="news-link featured" href="${previewUrl}" target="_blank" rel="noreferrer"><small>PRÉVIA DO PRÓXIMO JOGO</small><b>${c.name} × ${c.next}</b><span>ABRIR BUSCA NO GE ↗</span></a><a class="news-link" href="${newsUrl}" target="_blank" rel="noreferrer"><small>ÚLTIMAS NOTÍCIAS</small><b>Noticiário de ${c.name}</b><span>VER MATÉRIAS ↗</span></a></div>`;
  sheet.classList.add('open');if(expanded){backdrop.classList.add('open');document.body.style.overflow='hidden'}else{backdrop.classList.remove('open');document.body.style.overflow=''}
}
function close(){sheet.classList.remove('open');sheet.classList.remove('expanded');backdrop.classList.remove('open');document.body.style.overflow='';}
document.addEventListener('click',e=>{const el=e.target.closest('[data-code],[data-expand]');if(el)openClub(el.dataset.code||el.dataset.expand,true)});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-code]'))openClub(e.target.dataset.code,true);if(e.key==='Escape'){pinned=false;close()}});
document.querySelector('#closeSheet').addEventListener('click',()=>{pinned=false;close()});backdrop.addEventListener('click',()=>{pinned=false;close()});document.querySelector('#aboutBtn').addEventListener('click',()=>document.querySelector('.method').scrollIntoView({behavior:'smooth'}));
function setDivision(next){division=next;clubs=division==='A'?clubsA:clubsB;close();document.querySelectorAll('[data-series]').forEach(b=>b.classList.toggle('active',b.dataset.series===division));document.querySelector('#heroSeries').textContent=`CAMPEONATO BRASILEIRO · SÉRIE ${division}`;document.querySelector('#roundLabel').textContent=division==='A'?'31 / 38':'ATÉ 17 OUT';document.querySelector('#cutoffDate').textContent=division==='A'?'20 OUT 2026':'17 OUT 2026';document.querySelector('#heroDescription').innerHTML=division==='A'?'Classificação final da <strong>31ª rodada</strong>, com o momento de cada clube em um só lugar.':'Classificação da <strong>Série B até 17 de outubro</strong>, calculada partida a partida no mesmo recorte.';document.querySelector('#methodPrimary').innerHTML=division==='A'?'Esta é uma fotografia do campeonato <strong>ao apito final da rodada 31</strong>.':'A Série B considera <strong>todas as partidas concluídas até 17 de outubro</strong>; por isso alguns clubes têm número diferente de jogos.';document.querySelector('#methodSecondary').innerHTML=division==='A'?'Partidas, classificação e estatísticas da Série A consideram os jogos concluídos até 19 de outubro. Os “próximos jogos” exibem o primeiro compromisso agendado após esse momento.':'Partidas, classificação e estatísticas da Série B permanecem no recorte anterior de 17 de outubro.';document.querySelector('.legend').innerHTML=division==='A'?'<span><i class="key title"></i> Libertadores</span><span><i class="key pre"></i> Pré-Libertadores</span><span><i class="key sula"></i> Sul-Americana</span><span><i class="key drop"></i> Rebaixamento</span>':'<span><i class="key title"></i> Acesso à Série A</span><span><i class="key drop"></i> Rebaixamento</span>';document.querySelector('.stamp').innerHTML=division==='A'?'ATUALIZADO EM 20.10.2026<br>CLASSIFICAÇÃO: RODADA 31':'ATUALIZADO EM 17.10.2026<br>CLASSIFICAÇÃO: SÉRIE B';renderTable();localStorage.setItem('br26-series',division)}
document.querySelectorAll('[data-series]').forEach(b=>b.addEventListener('click',()=>setDivision(b.dataset.series)));
setDivision(localStorage.getItem('br26-series')==='B'?'B':'A');
const themeBtn=document.querySelector('#themeBtn');
function setTheme(dark){document.body.classList.toggle('dark',dark);themeBtn.setAttribute('aria-pressed',String(dark));themeBtn.querySelector('.theme-label').textContent=dark?'Modo claro':'Modo escuro';themeBtn.querySelector('.theme-icon').textContent=dark?'☀':'◐';localStorage.setItem('br26-theme',dark?'dark':'light')}
setTheme(localStorage.getItem('br26-theme')==='dark'||(!localStorage.getItem('br26-theme')&&matchMedia('(prefers-color-scheme:dark)').matches));
themeBtn.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));

// Modo determinístico usado apenas para a captura de auditoria solicitada.
if(new URLSearchParams(location.search).get('capture')==='round31'){
  document.body.classList.add('capture-mode');
  setDivision('A');
  document.querySelector('main').insertBefore(sheet,document.querySelector('.method'));
  openClub('FLA',true);
  document.body.style.overflow='auto';
}
