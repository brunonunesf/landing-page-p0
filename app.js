const savedPreference={get:key=>{try{return localStorage.getItem(key)}catch{return null}},set:(key,value)=>{try{localStorage.setItem(key,value)}catch{}}};
const crestBase='assets/escudos/';
const clubsAFallback=[{"code":"FLA","name":"Flamengo","pts":73,"j":33,"v":22,"e":7,"d":4,"gp":68,"gc":28,"form":"EVVVV","scorers":["Pedro|18","Samuel Lino|11","Jorge Carrascal|7"],"assists":["Samuel Lino|9","Jorge Carrascal|8","Guillermo Varela|6"],"next":"Grêmio","venue":"C","date":"04/11 · 19:30","pos":1,"games":[{"r":"E","opp":"Santos","score":"2–2","date":"08/10 · 19:30"},{"r":"V","opp":"Fluminense","score":"1–0","date":"11/10 · 17:30"},{"r":"V","opp":"Bahia","score":"3–0","date":"18/10 · 18:30"},{"r":"V","opp":"Atlético-MG","score":"3–2","date":"26/10 · 20:00"},{"r":"V","opp":"Vasco","score":"4–1","date":"29/10 · 20:00"}]},{"code":"PAL","name":"Palmeiras","pts":70,"j":33,"v":20,"e":10,"d":3,"gp":56,"gc":22,"form":"VVVVE","scorers":["José Manuel López|9","Maurício|9","Vitor Roque|5"],"assists":["Andreas Pereira|10","Joaquín Piquerez|4","Allan|3"],"next":"Remo","venue":"C","date":"05/11 · 19:30","pos":2,"games":[{"r":"V","opp":"Bahia","score":"1–0","date":"08/10 · 21:30"},{"r":"V","opp":"Corinthians","score":"4–1","date":"11/10 · 17:30"},{"r":"V","opp":"Athletico-PR","score":"2–0","date":"17/10 · 19:30"},{"r":"V","opp":"Bragantino","score":"2–0","date":"24/10 · 18:30"},{"r":"E","opp":"Santos","score":"0–0","date":"28/10 · 19:30"}]},{"code":"CRU","name":"Cruzeiro","pts":57,"j":33,"v":17,"e":6,"d":10,"gp":52,"gc":46,"form":"VDVVV","scorers":["Kaio Jorge|12","Matheus Pereira|9","Christian|5"],"assists":["Matheus Pereira|7","Keny Arroyo|5","Fágner|4"],"next":"Bahia","venue":"C","date":"05/11 · 21:30","pos":3,"games":[{"r":"V","opp":"São Paulo","score":"2–0","date":"07/10 · 21:30"},{"r":"D","opp":"Bragantino","score":"2–4","date":"12/10 · 21:00"},{"r":"V","opp":"Grêmio","score":"4–2","date":"18/10 · 16:00"},{"r":"V","opp":"Remo","score":"1–0","date":"23/10 · 20:00"},{"r":"V","opp":"Atlético-MG","score":"1–0","date":"29/10 · 19:30"}]},{"code":"FLU","name":"Fluminense","pts":54,"j":33,"v":15,"e":9,"d":9,"gp":52,"gc":42,"form":"VDDDV","scorers":["John Kennedy|9","Hulk|6","Jefferson Savarino|6"],"assists":["Lucho Acosta|5","Kevin Serna|4","Agustín Canobbio|3"],"next":"Vitória","venue":"F","date":"06/11 · 20:00","pos":4,"games":[{"r":"V","opp":"Coritiba","score":"4–0","date":"08/10 · 21:30"},{"r":"D","opp":"Flamengo","score":"0–1","date":"11/10 · 17:30"},{"r":"D","opp":"Santos","score":"1–2","date":"18/10 · 16:00"},{"r":"D","opp":"Chapecoense","score":"1–2","date":"24/10 · 19:30"},{"r":"V","opp":"Internacional","score":"2–1","date":"28/10 · 19:30"}]},{"code":"CAP","name":"Athletico-PR","pts":54,"j":33,"v":15,"e":9,"d":9,"gp":50,"gc":40,"form":"EVDED","scorers":["Kevin Viveros|21","Leozinho|5","Stiven Mendoza|5"],"assists":["Gastón Benavídez|5","João Cruz|5","Lucas Esquivel|5"],"next":"Vasco","venue":"C","date":"04/11 · 19:30","pos":5,"games":[{"r":"E","opp":"Atlético-MG","score":"2–2","date":"08/10 · 20:00"},{"r":"V","opp":"Chapecoense","score":"4–1","date":"12/10 · 19:30"},{"r":"D","opp":"Palmeiras","score":"0–2","date":"17/10 · 19:30"},{"r":"E","opp":"Vitória","score":"1–1","date":"24/10 · 16:30"},{"r":"D","opp":"Grêmio","score":"0–2","date":"29/10 · 21:30"}]},{"code":"BAH","name":"Bahia","pts":53,"j":33,"v":14,"e":11,"d":8,"gp":48,"gc":42,"form":"DVDEV","scorers":["Luciano Juba|11","Erick|4","Erick Pulga|4"],"assists":["Éverton Ribeiro|4","Jean Lucas|4","Rodrigo Nestor|4"],"next":"Cruzeiro","venue":"F","date":"05/11 · 21:30","pos":6,"games":[{"r":"D","opp":"Palmeiras","score":"0–1","date":"08/10 · 21:30"},{"r":"V","opp":"Mirassol","score":"1–0","date":"11/10 · 19:30"},{"r":"D","opp":"Flamengo","score":"0–3","date":"18/10 · 18:30"},{"r":"E","opp":"Santos","score":"1–1","date":"24/10 · 21:00"},{"r":"V","opp":"São Paulo","score":"3–2","date":"28/10 · 21:30"}]},{"code":"CAM","name":"Atlético-MG","pts":50,"j":33,"v":14,"e":8,"d":11,"gp":44,"gc":39,"form":"EVVDD","scorers":["Bernard|5","Tomás Cuello|5","Reiner|4"],"assists":["Alan Minda|3","Bernard|3","Hulk|3"],"next":"Botafogo","venue":"F","date":"04/11 · 21:30","pos":7,"games":[{"r":"E","opp":"Athletico-PR","score":"2–2","date":"08/10 · 20:00"},{"r":"V","opp":"Santos","score":"2–1","date":"11/10 · 16:00"},{"r":"V","opp":"Coritiba","score":"1–0","date":"17/10 · 18:30"},{"r":"D","opp":"Flamengo","score":"2–3","date":"26/10 · 20:00"},{"r":"D","opp":"Cruzeiro","score":"0–1","date":"29/10 · 19:30"}]},{"code":"SAN","name":"Santos","pts":47,"j":33,"v":12,"e":11,"d":10,"gp":49,"gc":47,"form":"EDVEE","scorers":["Gabriel Barbosa|15","Neymar|8","Álvaro Barreal|5"],"assists":["Benjamín Rollheiser|3","Gabriel Barbosa|3","Gabriel Bontempo|3"],"next":"Bragantino","venue":"F","date":"02/11 · 20:00","pos":8,"games":[{"r":"E","opp":"Flamengo","score":"2–2","date":"08/10 · 19:30"},{"r":"D","opp":"Atlético-MG","score":"1–2","date":"11/10 · 16:00"},{"r":"V","opp":"Fluminense","score":"2–1","date":"18/10 · 16:00"},{"r":"E","opp":"Bahia","score":"1–1","date":"24/10 · 21:00"},{"r":"E","opp":"Palmeiras","score":"0–0","date":"28/10 · 19:30"}]},{"code":"RBB","name":"Bragantino","pts":44,"j":33,"v":12,"e":8,"d":13,"gp":42,"gc":38,"form":"EVEDV","scorers":["Lucas Barbosa|7","Isidro Pitta|5","Fernando|3"],"assists":["Henry Mosquera|4","Isidro Pitta|3","Lucas Barbosa|3"],"next":"Santos","venue":"C","date":"02/11 · 20:00","pos":9,"games":[{"r":"E","opp":"Mirassol","score":"1–1","date":"07/10 · 19:30"},{"r":"V","opp":"Cruzeiro","score":"4–2","date":"12/10 · 21:00"},{"r":"E","opp":"Remo","score":"1–1","date":"18/10 · 19:30"},{"r":"D","opp":"Palmeiras","score":"0–2","date":"24/10 · 18:30"},{"r":"V","opp":"Chapecoense","score":"3–0","date":"28/10 · 19:30"}]},{"code":"SAO","name":"São Paulo","pts":43,"j":33,"v":12,"e":7,"d":14,"gp":39,"gc":39,"form":"DVVED","scorers":["Jonathan Calleri|10","Luciano|9","Ferreira|4"],"assists":["Wendell|3","Artur|2","Damián Bobadilla|2"],"next":"Corinthians","venue":"C","date":"04/11 · 21:30","pos":10,"games":[{"r":"D","opp":"Cruzeiro","score":"0–2","date":"07/10 · 21:30"},{"r":"V","opp":"Vitória","score":"2–1","date":"10/10 · 21:00"},{"r":"V","opp":"Vasco","score":"1–0","date":"17/10 · 21:00"},{"r":"E","opp":"Mirassol","score":"1–1","date":"24/10 · 16:30"},{"r":"D","opp":"Bahia","score":"2–3","date":"28/10 · 21:30"}]},{"code":"BOT","name":"Botafogo","pts":39,"j":33,"v":10,"e":9,"d":14,"gp":45,"gc":53,"form":"DEVDD","scorers":["Danilo Santos|10","Arthur Cabral|7","Alex Telles|4"],"assists":["Álvaro Montoro|5","Alex Telles|4","Danilo|3"],"next":"Atlético-MG","venue":"C","date":"04/11 · 21:30","pos":11,"games":[{"r":"D","opp":"Vasco","score":"1–2","date":"07/10 · 20:30"},{"r":"E","opp":"Coritiba","score":"1–1","date":"12/10 · 16:00"},{"r":"V","opp":"Chapecoense","score":"1–0","date":"17/10 · 18:00"},{"r":"D","opp":"Internacional","score":"0–3","date":"24/10 · 16:30"},{"r":"D","opp":"Remo","score":"1–2","date":"28/10 · 21:30"}]},{"code":"CFC","name":"Coritiba","pts":39,"j":32,"v":10,"e":9,"d":13,"gp":38,"gc":50,"form":"DDEDD","scorers":["Breno|8","Pedro Rocha|8","Joaquín Lavega|5"],"assists":["Josué|10","Breno Lopes|2","João Pedro Chermont|2"],"next":"Vitória","venue":"C","date":"31/10 · 16:00","pos":12,"games":[{"r":"D","opp":"Vasco","score":"0–5","date":"19/09 · 20:30"},{"r":"D","opp":"Fluminense","score":"0–4","date":"08/10 · 21:30"},{"r":"E","opp":"Botafogo","score":"1–1","date":"12/10 · 16:00"},{"r":"D","opp":"Atlético-MG","score":"0–1","date":"17/10 · 18:30"},{"r":"D","opp":"Grêmio","score":"0–1","date":"26/10 · 19:30"}]},{"code":"VAS","name":"Vasco","pts":38,"j":32,"v":10,"e":8,"d":14,"gp":40,"gc":49,"form":"VEDVD","scorers":["Andrés Gómez|5","Thiago Mendes|5","David|4"],"assists":["Cuiabano|4","José Rodríguez|4","Andrés Gómez|2"],"next":"Athletico-PR","venue":"F","date":"04/11 · 19:30","pos":13,"games":[{"r":"V","opp":"Botafogo","score":"2–1","date":"07/10 · 20:30"},{"r":"E","opp":"Remo","score":"0–0","date":"10/10 · 18:00"},{"r":"D","opp":"São Paulo","score":"0–1","date":"17/10 · 21:00"},{"r":"V","opp":"Corinthians","score":"3–2","date":"24/10 · 18:30"},{"r":"D","opp":"Flamengo","score":"1–4","date":"29/10 · 20:00"}]},{"code":"VIT","name":"Vitória","pts":38,"j":32,"v":10,"e":8,"d":14,"gp":35,"gc":46,"form":"DVDEE","scorers":["Renê|10","Erick|5","Matheus|5"],"assists":["Erick|5","Matheuzinho|4","Gabriel Baralhas|3"],"next":"Coritiba","venue":"F","date":"31/10 · 16:00","pos":14,"games":[{"r":"D","opp":"Cruzeiro","score":"1–3","date":"20/09 · 16:00"},{"r":"V","opp":"Chapecoense","score":"4–0","date":"07/10 · 20:00"},{"r":"D","opp":"São Paulo","score":"1–2","date":"10/10 · 21:00"},{"r":"E","opp":"Corinthians","score":"1–1","date":"19/10 · 20:00"},{"r":"E","opp":"Athletico-PR","score":"1–1","date":"24/10 · 16:30"}]},{"code":"GRE","name":"Grêmio","pts":37,"j":33,"v":9,"e":10,"d":14,"gp":37,"gc":44,"form":"EEDVV","scorers":["Carlos Vinícius|11","Cristian Pavón|3","Gustavo Martins|3"],"assists":["Cristian Pavón|4","Francis Amuzu|4","José Enamorado|3"],"next":"Flamengo","venue":"F","date":"04/11 · 19:30","pos":15,"games":[{"r":"E","opp":"Remo","score":"1–1","date":"07/10 · 19:30"},{"r":"E","opp":"Internacional","score":"1–1","date":"11/10 · 17:30"},{"r":"D","opp":"Cruzeiro","score":"2–4","date":"18/10 · 16:00"},{"r":"V","opp":"Coritiba","score":"1–0","date":"26/10 · 19:30"},{"r":"V","opp":"Athletico-PR","score":"2–0","date":"29/10 · 21:30"}]},{"code":"MIR","name":"Mirassol","pts":37,"j":32,"v":9,"e":10,"d":13,"gp":37,"gc":45,"form":"VEDVE","scorers":["Carlos Eduardo|8","Igor Marques|4","André Luis|3"],"assists":["Alesson|5","Igor Formiga|5","Reinaldo|4"],"next":"Corinthians","venue":"F","date":"30/10 · 20:00","pos":16,"games":[{"r":"V","opp":"Botafogo","score":"2–0","date":"19/09 · 17:00"},{"r":"E","opp":"Bragantino","score":"1–1","date":"07/10 · 19:30"},{"r":"D","opp":"Bahia","score":"0–1","date":"11/10 · 19:30"},{"r":"V","opp":"Internacional","score":"2–0","date":"16/10 · 20:00"},{"r":"E","opp":"São Paulo","score":"1–1","date":"24/10 · 16:30"}]},{"code":"INT","name":"Internacional","pts":35,"j":33,"v":8,"e":11,"d":14,"gp":37,"gc":42,"form":"VEDVD","scorers":["Johan Carbonero|7","Alan Patrick|6","Alexander Bernabei|5"],"assists":["Alerrandro|5","Johan Carbonero|4","Matheus Bahia|3"],"next":"Coritiba","venue":"C","date":"03/11 · 21:30","pos":17,"games":[{"r":"V","opp":"Corinthians","score":"2–1","date":"07/10 · 19:30"},{"r":"E","opp":"Grêmio","score":"1–1","date":"11/10 · 17:30"},{"r":"D","opp":"Mirassol","score":"0–2","date":"16/10 · 20:00"},{"r":"V","opp":"Botafogo","score":"3–0","date":"24/10 · 16:30"},{"r":"D","opp":"Fluminense","score":"1–2","date":"28/10 · 19:30"}]},{"code":"COR","name":"Corinthians","pts":33,"j":32,"v":8,"e":9,"d":15,"gp":34,"gc":42,"form":"DDDED","scorers":["André|4","Gustavo Henrique|4","Matheus Bidu|4"],"assists":["Rodrigo Garro|6","André|2","Breno Bidon|2"],"next":"Mirassol","venue":"C","date":"30/10 · 20:00","pos":18,"games":[{"r":"D","opp":"Fluminense","score":"1–3","date":"20/09 · 16:00"},{"r":"D","opp":"Internacional","score":"1–2","date":"07/10 · 19:30"},{"r":"D","opp":"Palmeiras","score":"1–4","date":"11/10 · 17:30"},{"r":"E","opp":"Vitória","score":"1–1","date":"19/10 · 20:00"},{"r":"D","opp":"Vasco","score":"2–3","date":"24/10 · 18:30"}]},{"code":"REM","name":"Remo","pts":29,"j":33,"v":6,"e":11,"d":16,"gp":36,"gc":51,"form":"EEEDV","scorers":["Jajá|9","Alef Manga|5","Gabriel Taliari|4"],"assists":["Alef Manga|3","Vitor Bueno|3","Gabriel Taliari|2"],"next":"Palmeiras","venue":"F","date":"05/11 · 19:30","pos":19,"games":[{"r":"E","opp":"Grêmio","score":"1–1","date":"07/10 · 19:30"},{"r":"E","opp":"Vasco","score":"0–0","date":"10/10 · 18:00"},{"r":"E","opp":"Bragantino","score":"1–1","date":"18/10 · 19:30"},{"r":"D","opp":"Cruzeiro","score":"0–1","date":"23/10 · 20:00"},{"r":"V","opp":"Botafogo","score":"2–1","date":"28/10 · 21:30"}]},{"code":"CHA","name":"Chapecoense","pts":21,"j":32,"v":4,"e":9,"d":19,"gp":32,"gc":66,"form":"DDDVD","scorers":["Marcinho|5","Maurício Garcez|3","Túlio Eduardo Silva De Oliveira|3"],"assists":["Giovanni Augusto|6","Bruno Pacheco|3","Yannick Bolasie|3"],"next":"Mirassol","venue":"C","date":"03/11 · 19:30","pos":20,"games":[{"r":"D","opp":"Vitória","score":"0–4","date":"07/10 · 20:00"},{"r":"D","opp":"Athletico-PR","score":"1–4","date":"12/10 · 19:30"},{"r":"D","opp":"Botafogo","score":"0–1","date":"17/10 · 18:00"},{"r":"V","opp":"Fluminense","score":"2–1","date":"24/10 · 19:30"},{"r":"D","opp":"Bragantino","score":"0–3","date":"28/10 · 19:30"}]}];
const clubsA=[...(window.seriesAData||clubsAFallback)].sort((a,b)=>b.pts-a.pts||b.v-a.v||(b.gp-b.gc)-(a.gp-a.gc)||b.gp-a.gp);
clubsA.forEach((club,index)=>{club.pos=index+1});
const clubsB=window.seriesBData||[];
Object.entries(window.seriesPhotos||{}).forEach(([name,url])=>{if(!playerPhotos[name])playerPhotos[name]=url});
const normalizedName=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let division='A',clubs=clubsA;

// Formatação altera somente a apresentação, nunca a referência de dados.
function formatEuroMi(value){
  if(value==null)return 'N/D';
  if(typeof value==='string'&&!/[0-9]/.test(value))return value;
  const numeric=typeof value==='number'?value:Number(String(value).replace(/[^0-9.,-]/g,'').replace(',','.').replace(/\.$/,''));
  return Number.isFinite(numeric)?`€ ${new Intl.NumberFormat('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}).format(numeric)} mi.`:String(value);
}
const formatPercent=value=>new Intl.NumberFormat('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}).format(value);
const zone=p=>division==='B'?(p<=2?'var(--zone-title)':p<=6?'var(--zone-pre)':p>=17?'var(--zone-drop)':'transparent'):(p<=4?'var(--zone-title)':p<=6?'var(--zone-pre)':p<=12?'var(--zone-sula)':p>=17?'var(--zone-drop)':'transparent');
const crest=c=>`assets/motion/escudos/${c}.webp`;
const icon=(name,className='')=>`<svg class="icon${className?` ${className}`:''}" aria-hidden="true" focusable="false"><use href="#icon-${name}"></use></svg>`;
const dots=f=>[...f].map(x=>`<i class="dot ${x}" role="img" aria-label="${x==='V'?'Vitória':x==='D'?'Derrota':'Empate'}" title="${x==='V'?'Vitória':x==='D'?'Derrota':'Empate'}"></i>`).join('');
const table=document.querySelector('#tableBody');
table.setAttribute('role','rowgroup');
table.closest('.desktop-table')?.setAttribute('role','table');
document.querySelector('.table-header')?.setAttribute('role','row');
document.querySelectorAll('.table-header > span').forEach(cell=>cell.setAttribute('role','columnheader'));
const detailsButton=c=>`<span class="details-cell" role="cell"><button type="button" class="club-details-button" data-code="${c.code}" aria-haspopup="dialog" aria-label="Ver detalhes do ${c.name}">Ver detalhes${icon('arrow-up-right')}</button></span>`;
function renderTable(){
  table.innerHTML=clubs.map(c=>`<div class="club-entry${c.pos<=3?' podium':''}" role="presentation" style="--zone:${zone(c.pos)}"><div class="club-row row-grid" role="row" aria-rowindex="${c.pos+1}" data-club-code="${c.code}"><span class="pos" role="cell">${String(c.pos).padStart(2,'0')}</span><span class="club" role="rowheader"><img decoding="async" class="crest" width="43" height="43" src="${crest(c.code)}" alt="Escudo do ${c.name}" loading="lazy"><b>${c.name}</b><small>${c.j} jogos</small></span><strong class="pts scoreboard" role="cell" data-odometer="${c.pts}" aria-label="${c.pts} pontos"><span>${c.pts}</span><small class="led-label">PTS</small></strong><span class="stat" role="cell">${c.j}</span><span class="stat" role="cell">${c.v}</span><span class="stat" role="cell">${c.gp}</span><span class="stat" role="cell">${c.gc}</span><span class="stat" role="cell">${c.gp-c.gc>0?'+':''}${c.gp-c.gc}</span><span class="form" role="cell">${dots(c.form)}</span>${detailsButton(c)}</div><div class="hover-details" role="presentation"><span><small>APROVEITAMENTO</small><b>${formatPercent((c.pts/(c.j*3))*100)}%</b></span><span><small>VALOR DO ELENCO</small><b>${formatEuroMi(marketData[c.code]?.total)}</b></span><span><small>PRÓXIMO</small><b>${c.next} · ${c.venue}</b></span><span class="hover-form"><small>RECENTE</small><span class="form">${dots(c.form)}</span></span><em>Clique para abrir a análise completa ${icon('arrow-right')}</em></div></div>`).join('');
}
renderTable();

const sheet=document.querySelector('#detailSheet'),backdrop=document.querySelector('#backdrop'),content=document.querySelector('#detailContent'),clubIntro=document.querySelector('#clubIntro');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const extras={
FLA:{o:['Fluminense','Botafogo','Cruzeiro','Palmeiras','Santos'],a:['Arrascaeta|9','Samuel Lino|6','Lucas Paquetá|6']},PAL:{o:['Corinthians','Mirassol','Bahia','Flamengo','Santos'],a:['Maurício|7','Vitor Roque|5','Flaco López|5']},CAP:{o:['Chapecoense','Santos','Fluminense','Atlético-MG','Coritiba'],a:['Zapelli|7','Viveros|5','Mendoza|4']},FLU:{o:['Flamengo','Botafogo','Vitória','Cruzeiro','Bahia'],a:['Savarino|7','Lucho Acosta|6','John Kennedy|4']},BAH:{o:['Mirassol','Vitória','Fluminense','Remo','Palmeiras'],a:['Everton Ribeiro|8','Luciano Juba|7','Jean Lucas|4']},CRU:{o:['Bragantino','Internacional','São Paulo','Fluminense','Bahia'],a:['Matheus Pereira|11','Sinisterra|5','Kaio Jorge|4']},CAM:{o:['Santos','Athletico-PR','Bahia','Remo','Flamengo'],a:['Igor Gomes|6','Hulk|5','Rony|4']},SAN:{o:['Atlético-MG','Vitória','Palmeiras','Coritiba','Remo'],a:['Neymar|8','Barreal|6','Gabriel|4']},RBB:{o:['Cruzeiro','Atlético-MG','Coritiba','São Paulo','Bahia'],a:['Jhon Jhon|7','Eduardo Sasha|5','Lucas Barbosa|4']},SAO:{o:['Vitória','Bragantino','Flamengo','Santos','Palmeiras'],a:['Luciano|6','Ferreira|5','Calleri|4']},CFC:{o:['Botafogo','Remo','Bragantino','Santos','Chapecoense'],a:['Josué|7','Breno Lopes|5','Lavega|4']},VIT:{o:['São Paulo','Fluminense','Chapecoense','Santos','Corinthians'],a:['Matheuzinho|6','Osvaldo|4','Renê|3']},BOT:{o:['Coritiba','Flamengo','Grêmio','Remo','Fluminense'],a:['Savarino|7','Danilo|5','Arthur Cabral|4']},VAS:{o:['Remo','Palmeiras','Internacional','Vitória','Flamengo'],a:['Philippe Coutinho|7','Rayan|5','Thiago Mendes|4']},MIR:{o:['Bahia','Palmeiras','Santos','Chapecoense','Coritiba'],a:['Negueba|5','Alesson|4','Igor Formiga|4']},COR:{o:['Palmeiras','São Paulo','Santos','Vitória','Flamengo'],a:['Garro|7','Memphis Depay|5','Yuri Alberto|4']},INT:{o:['Grêmio','Vasco','Cruzeiro','Coritiba','Fluminense'],a:['Alan Patrick|7','Carbonero|5','Borré|4']},GRE:{o:['Internacional','Botafogo','Vasco','Santos','Palmeiras'],a:['Cristaldo|6','Braithwaite|5','Carlos Vinícius|4']},REM:{o:['Vasco','Bahia','Botafogo','Santos','Coritiba'],a:['Pedro Rocha|6','Alef Manga|4','Jajá|3']},CHA:{o:['Athletico-PR','Mirassol','Vitória','Coritiba','Palmeiras'],a:['Walterson|5','Perotti|4','Marcinho|3']}
};
const reviewedOpponents={FLA:['Fluminense','Santos','Bragantino','Corinthians','Remo'],PAL:['Corinthians','Bahia','Grêmio','São Paulo','Botafogo'],CAP:['Chapecoense','Atlético-MG','Bahia','Coritiba','Cruzeiro'],FLU:['Flamengo','Coritiba','Corinthians','Atlético-MG','Vasco'],BAH:['Mirassol','Palmeiras','Athletico-PR','Remo','Bragantino'],CRU:['Bragantino','São Paulo','Vitória','Santos','Athletico-PR'],CAM:['Santos','Athletico-PR','Bragantino','Chapecoense','Fluminense'],SAN:['Atlético-MG','Flamengo','São Paulo','Remo','Cruzeiro'],RBB:['Cruzeiro','Mirassol','Atlético-MG','Flamengo','Botafogo'],SAO:['Vitória','Cruzeiro','Santos','Internacional','Palmeiras'],CFC:['Botafogo','Fluminense','Vasco','Athletico-PR','Mirassol'],VIT:['São Paulo','Chapecoense','Cruzeiro','Mirassol','Grêmio'],BOT:['Coritiba','Vasco','Mirassol','Grêmio','Bragantino'],VAS:['Remo','Botafogo','Coritiba','Grêmio','Fluminense'],MIR:['Bahia','Bragantino','Botafogo','Vitória','Coritiba'],COR:['Palmeiras','Internacional','Fluminense','Flamengo','Chapecoense'],INT:['Grêmio','Corinthians','São Paulo','Chapecoense','Santos'],GRE:['Internacional','Remo','Palmeiras','Botafogo','Vasco'],REM:['Vasco','Grêmio','Santos','Bahia','Flamengo'],CHA:['Athletico-PR','Vitória','Atlético-MG','Internacional','Corinthians']};
const clubTheme=(surface,stripe,accent,accentBright,text='#fff',muted='#d7cfd1')=>({surface,stripe,accent,accentBright,text,muted});
const graphicMoment=(eyebrow,title,text,year)=>({eyebrow,title,text,year});
const clubIdentities={
  FLA:{theme:clubTheme('#120509','#2d0a12','#cf1730','#ff6579','#fff5f2','#f0c7cc'),symbols:{art:'assets/identidade/flamengo-silhuetas.svg',names:['urubu','Maracanã','Cristo Redentor','comemoração'],pattern:'stripes'},tagline:'Vermelho que pulsa. Uma nação que empurra.',intro:{type:'symbol-reveal',symbol:'urubu',art:'assets/identidade/flamengo-urubu.webp',mark:'V',kicker:'O URUBU VOOU',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · GERAÇÃO 2019',title:'O camisa 9 diante da arquibancada.',text:'Gabigol e a torcida resumem a confiança e a intensidade daquele Flamengo.',image:'assets/identidade/hero/06-gabigol-2019.jpg',alt:'Gabigol comemora diante da torcida do Flamengo em 2019',source:'https://ge.globo.com/numerologos/noticia/flamengo-tem-quarta-melhor-campanha-de-1o-turno-na-era-dos-pontos-corridos-avai-condenado.ghtml',credit:'André Durão / GloboEsporte.com'}},
  PAL:{theme:clubTheme('#03170f','#0a3021','#168247','#65d98b','#f5fff7','#bedac8'),symbols:{art:'assets/identidade/palmeiras-silhuetas.svg',names:['porco','Nubank Parque','Abel Ferreira','Academia'],pattern:'rings'},tagline:'Cabeça fria. Coração quente. Verde até o fim.',intro:{type:'palmeiras-charge',symbol:'porco',art:'assets/identidade/palmeiras-porco.svg',kicker:'AVANTI, PALESTRA',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · ERA ABEL',title:'A era que transformou pressão em conquista.',text:'Os Brasileiros de 2022 e 2023 consolidaram uma geração movida por método, intensidade e fome de vencer.',image:'assets/identidade/hero/21-abel-palmeiras-2022.jpg',alt:'Abel Ferreira de braços cruzados à beira do campo pelo Palmeiras em 2022',source:'https://commons.wikimedia.org/wiki/File:Abel-Ferreira-Palmeiras-Athletico-jul-2022.jpg',credit:'Fabio Giannelli / Soccer Digital · Domínio público'}},
  CAP:{theme:clubTheme('#16070a','#310b12','#df1738','#ff6b7f','#fff7f4','#e8b8bf'),symbols:{marks:['↗','CAP','↙'],names:['furacão','Arena da Baixada','faixas diagonais'],pattern:'diagonal'},tagline:'O Furacão acelera e muda o jogo.',intro:{type:'sweep',symbol:'furacão',mark:'↗',kicker:'VEM O FURACÃO',duration:2500},moment:graphicMoment('MEMÓRIA RUBRO-NEGRA · 2001','A primeira estrela nacional.','A força da Baixada e uma campanha que colocou o Furacão no topo do Brasil.','2001')},
  FLU:{theme:clubTheme('#19070e','#3b0e20','#7b1637','#49a87a','#fff8f1','#dcbec8'),symbols:{marks:['FFC','◇','FFC'],names:['Laranjeiras','faixas tricolores','torcida'],pattern:'vertical'},tagline:'Tradição tricolor, futebol com assinatura.',intro:{type:'rise',symbol:'tricolor',mark:'◇',kicker:'FAZ O L',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · 2012',title:'Fred e o grito do tetracampeonato.',text:'O capitão virou o rosto de uma campanha segura e decisiva.',image:'assets/identidade/hero/19-fred.jpg',alt:'Fred comemora pelo Fluminense em 2012',source:'https://ge.globo.com/futebol/times/fluminense/noticia/2022/11/11/ha-dez-anos-fluminense-era-tetracampeao-brasileiro-foi-um-ano-espetacular-lembra-fred.ghtml',credit:'Crédito a confirmar na fonte'}},
  BAH:{theme:clubTheme('#06142b','#102a55','#1477c9','#f04a42','#fff','#bfd6ef'),symbols:{marks:['★','BAÊA','★'],names:['Fonte Nova','Bamor','faixas tricolores'],pattern:'rays'},tagline:'O Esquadrão joga com a Bahia inteira.',intro:{type:'pulse',symbol:'esquadrão',mark:'★',kicker:'BORA, BAÊA',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · 1988',title:'Bobô e a segunda estrela.',text:'Talento e personalidade no time que levou a festa tricolor ao país.',image:'assets/identidade/hero/18-bobo.png',alt:'Bobô com a camisa do Bahia',source:'https://www.ogol.com.br/historia/1988-com-elegancia-sutil-bahia-triunfa/12350',credit:'Fotógrafo a identificar na fonte'}},
  CRU:{theme:clubTheme('#061432','#0b2860','#1b66db','#88b7ff','#fff','#c4d7f5'),symbols:{marks:['★','✦','★'],names:['constelação','Mineirão','Tríplice Coroa'],pattern:'constellation'},tagline:'Cinco estrelas conduzem a Raposa.',intro:{type:'orbit',symbol:'constelação',mark:'✦',kicker:'O CÉU FICOU AZUL',duration:2700},moment:{eyebrow:'MOMENTO QUE MARCOU · 2003',title:'Alex rege a Tríplice Coroa.',text:'Visão, técnica e uma temporada que permanece como referência celeste.',image:'assets/identidade/hero/12-alex.jpg',alt:'Alex comemora com a camisa do Cruzeiro em 2003',source:'https://ge.globo.com/futebol/times/cruzeiro/noticia/2015/05/cruzeiro-anuncia-homenagem-meia-alex-camisa-10-na-triplice-coroa.html',credit:'Fagner Angelino / Futura Press'}},
  CAM:{theme:clubTheme('#080808','#232323','#f4f1e9','#f5c542','#fff','#c9c9c9'),symbols:{marks:['GALO','V','GALO'],names:['galo','Mineirão','punho erguido'],pattern:'halves'},tagline:'O Galo canta forte até o último lance.',intro:{type:'charge',symbol:'galo',mark:'GALO',kicker:'CANTOU NO HORTO',duration:2500},moment:{eyebrow:'MOMENTO QUE MARCOU · 2021',title:'Hulk lidera a arrancada do campeão.',text:'Força, gols e protagonismo na temporada que recolocou o Galo no topo.',image:'assets/identidade/hero/17-hulk.jpg',alt:'Hulk comemora com a camisa do Atlético Mineiro em 2021',source:'https://atletico.com.br/hulk-comemora-virada-e-exalta-espirito-de-luta-do-time/',credit:'Pedro Souza / Atlético'}},
  SAN:{theme:clubTheme('#101010','#292929','#f5f5f0','#c9a84c','#fff','#d3d3cf'),symbols:{marks:['♛','SFC','⚽'],names:['coroa','Vila Belmiro','Meninos da Vila'],pattern:'waves'},tagline:'A Vila revela reis e reinventa o jogo.',intro:{type:'wave',symbol:'vila',mark:'♛',kicker:'NASCE UM MENINO DA VILA',duration:2700},moment:{eyebrow:'MEMÓRIA ALVINEGRA · O REI',title:'Pelé transforma a Vila em território eterno.',text:'O gesto do Rei representa uma história que mudou o tamanho do futebol brasileiro.',image:'assets/identidade/hero/01-pele-horizontal.jpg',alt:'Pelé com a camisa do Santos no Pacaembu',source:'https://www.opovo.com.br/esportes/futebol/2023/01/14/santos-usara-uniforme-especial-na-estreia-do-paulistao-em-homenagem-a-pele.html',credit:'Domicio Pinheiro / Agência Estado / AE'}},
  RBB:{theme:clubTheme('#14070b','#321018','#e3223d','#f2d25c','#fff','#ecc6cc'),symbols:{marks:['▲','RB','▲'],names:['touros','energia','Massa Bruta'],pattern:'diagonal'},tagline:'A Massa Bruta pressiona sem recuar.',intro:{type:'charge',symbol:'touros',mark:'▲',kicker:'CARGA DA MASSA BRUTA',duration:2400},moment:graphicMoment('IDENTIDADE BRAGANTINA · PRESSÃO','Energia para atacar o espaço.','Velocidade, juventude e intensidade traduzem a nova fase do clube de Bragança.','MASSA')},
  SAO:{theme:clubTheme('#100c0d','#282123','#d71920','#f4f1e9','#fff','#d7ced0'),symbols:{marks:['▲','M1TO','▲'],names:['Morumbi','faixa tricolor','goleiro artilheiro'],pattern:'tricolor'},tagline:'Soberano na história, imenso no Morumbi.',intro:{type:'rise',symbol:'morumbi',mark:'▲',kicker:'O MORUMBI LEVANTOU',duration:2600},moment:graphicMoment('MEMÓRIA TRICOLOR · 2006–2008','Três Brasileiros em sequência.','Regularidade, liderança e a presença de Rogério Ceni marcaram uma era tricolor.','TRI')},
  CFC:{theme:clubTheme('#061a13','#0a3a29','#16834f','#f2f2e8','#fff','#bed8ca'),symbols:{marks:['▲','CFC','▲'],names:['pinheiros','Couto Pereira','camisa alviverde'],pattern:'forest'},tagline:'O Alto da Glória empurra o Coxa.',intro:{type:'rise',symbol:'pinheiros',mark:'▲',kicker:'VERDE QUE SOBE',duration:2500},moment:graphicMoment('MEMÓRIA ALVIVERDE · 1985','O Brasil ficou verde e branco.','A conquista nacional permanece como a grande estrela da história coxa-branca.','1985')},
  VIT:{theme:clubTheme('#120609','#300b12','#d71932','#ffcf4a','#fff','#e8bdc4'),symbols:{marks:['V','LEÃO','V'],names:['leão','Barradão','arquibancada'],pattern:'stripes'},tagline:'O Leão ruge no coração do Barradão.',intro:{type:'impact',symbol:'leão',mark:'V',kicker:'RUGE O BARRADÃO',duration:2500},moment:graphicMoment('IDENTIDADE RUBRO-NEGRA · BARRADÃO','A casa onde o Leão cresce.','Arquibancada próxima, vermelho e preto intensos e uma atmosfera que transforma cada jogo.','LEÃO')},
  BOT:{theme:clubTheme('#07090c','#20242a','#f4f4ef','#8bbcff','#fff','#c9ced6'),symbols:{marks:['★','FOGO','★'],names:['Estrela Solitária','Nilton Santos','General Severiano'],pattern:'night'},tagline:'Uma estrela basta para iluminar o caminho.',intro:{type:'ignite',symbol:'estrela',mark:'★',kicker:'ACENDE A ESTRELA',duration:2700},moment:graphicMoment('MEMÓRIA ALVINEGRA · 1995','Túlio e a estrela no alto.', 'A campanha de 1995 devolveu ao Botafogo o protagonismo nacional.','1995')},
  VAS:{theme:clubTheme('#08090a','#24272a','#f4f2e9','#d71932','#fff','#d0d2d3'),symbols:{marks:['✠','⛵','✠'],names:['caravela','São Januário','faixa diagonal'],pattern:'waves'},tagline:'O Gigante cruza qualquer mar.',intro:{type:'wave',symbol:'caravela',mark:'⛵',kicker:'A BARREIRA VAI VIRAR BAILE',duration:2800},moment:{eyebrow:'MOMENTO QUE MARCOU · 2000',title:'Romário e Edmundo diante do mundo.',text:'Dois dos nomes mais intensos de sua geração vestindo a mesma faixa diagonal.',image:'assets/identidade/hero/07-romario-edmundo.jpg',alt:'Romário e Edmundo comemoram pelo Vasco em 2000',source:'https://www.uol.com.br/esporte/futebol/ultimas-noticias/lancepress/2022/11/06/ex-jogadores-do-vasco-romario-e-edmundo-comemoram-o-acesso-na-internet.htm',credit:'Antônio Gaudério / Folhapress'}},
  MIR:{theme:clubTheme('#071a12','#123a27','#2c9b55','#f5cf37','#fff','#c7dfcf'),symbols:{marks:['☀','MFC','☀'],names:['sol','José Maria de Campos Maia','interior paulista'],pattern:'rays'},tagline:'O interior chega grande e joga sem medo.',intro:{type:'rise',symbol:'sol',mark:'☀',kicker:'BRILHA O LEÃO',duration:2500},moment:graphicMoment('IDENTIDADE DO INTERIOR · CONQUISTA','O caminho até a elite.', 'Organização e coragem transformaram uma trajetória regional em presença nacional.','ELITE')},
  COR:{theme:clubTheme('#090a0b','#24272a','#f5f3ea','#df2437','#fff','#d1d1ce'),symbols:{marks:['⚓','SCCP','⚓'],names:['âncora','remos','Neo Química Arena'],pattern:'halves'},tagline:'O Time do Povo entra junto em cada disputa.',intro:{type:'impact',symbol:'âncora',mark:'⚓',kicker:'VAI, CORINTHIANS',duration:2600},moment:{eyebrow:'MEMÓRIA ALVINEGRA · ANOS 1980',title:'Sócrates ergue o punho.',text:'Inteligência, personalidade e uma geração que ampliou o significado da camisa.',image:'assets/identidade/hero/08-socrates.jpg',alt:'Sócrates comemora com o punho erguido pelo Corinthians',source:'https://www.uol.com.br/ecoa/ultimas-noticias/2022/11/24/socrates-foi-o-jogador-de-futebol-mais-politizado-que-o-brasil-ja-teve.htm',credit:'Rodolpho Machado; confirmar na fonte'}},
  INT:{theme:clubTheme('#1e0608','#430b10','#d7192d','#ffd1d5','#fff','#ecc4c7'),symbols:{marks:['SCI','✦','SCI'],names:['Beira-Rio','Colorado','Rio Guaíba'],pattern:'rings'},tagline:'O Beira-Rio pulsa em vermelho.',intro:{type:'pulse',symbol:'colorado',mark:'SCI',kicker:'VAMOS, INTER',duration:2500},moment:{eyebrow:'MOMENTO QUE MARCOU · 1979',title:'Falcão comanda o campeão invicto.',text:'Elegância e controle para conduzir uma das campanhas mais lembradas do futebol brasileiro.',image:'assets/identidade/hero/16-falcao.jpg',alt:'Falcão conduz a bola com a camisa do Internacional',source:'https://www.lance.com.br/lancepedia/cruzeiro-2-x-3-internacional-brasileirao-1979.html',credit:'Crédito e matriz a confirmar na fonte'}},
  GRE:{theme:clubTheme('#07131b','#0d2d40','#31a5df','#f4f4ed','#fff','#bfd8e5'),symbols:{marks:['◉','IMORTAL','◉'],names:['Arena','três faixas','Imortal'],pattern:'vertical'},tagline:'O Imortal cresce quando o jogo aperta.',intro:{type:'orbit',symbol:'imortal',mark:'◉',kicker:'DÁ-LHE, TRICOLOR',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · 2023',title:'Suárez deixa sua marca em Porto Alegre.',text:'Técnica, competitividade e uma temporada de conexão imediata com a arquibancada.',image:'assets/identidade/hero/11-suarez.jpg',alt:'Luis Suárez comemora com a camisa do Grêmio em 2023',source:'https://www.tvgazeta.com.br/',credit:'Autoria a confirmar; imagem publicada pela TV Gazeta'}},
  REM:{theme:clubTheme('#071530','#102c5d','#174c9c','#f2f4ff','#fff','#c2d1ec'),symbols:{marks:['LEÃO','R','LEÃO'],names:['Leão Azul','Baenão','Fenômeno Azul'],pattern:'waves'},tagline:'O Leão Azul carrega a força da Amazônia.',intro:{type:'charge',symbol:'leão-azul',mark:'R',kicker:'RUGE O BAENÃO',duration:2500},moment:graphicMoment('IDENTIDADE AZULINA · BAENÃO','A Amazônia canta em azul-marinho.', 'O Fenômeno Azul transforma arquibancada, território e pertencimento em pressão.','LEÃO')},
  CHA:{theme:clubTheme('#071a10','#123725','#17824a','#d5f2df','#fff','#bdd9c8'),symbols:{marks:['▲','CHAPE','▲'],names:['Arena Condá','oeste catarinense','verde e branco'],pattern:'forest'},tagline:'A Chape transforma união em força.',intro:{type:'rise',symbol:'condá',mark:'▲',kicker:'VAMOS, CHAPE',duration:2600},moment:graphicMoment('IDENTIDADE VERDE · ARENA CONDÁ','Uma cidade inteira no mesmo abraço.', 'Comunidade, resistência e pertencimento definem a presença da Chapecoense.','UNIÃO')}
};
Object.entries(reviewedOpponents).forEach(([code,opponents])=>{extras[code].o=opponents});
const clubThemeVariables={surface:'--club-surface',stripe:'--club-stripe',accent:'--club-accent',accentBright:'--club-accent-bright',text:'--club-text',muted:'--club-muted'};
const colorForAccent=hex=>{const value=hex.replace('#','');const parts=value.length===3?[...value].map(char=>parseInt(char+char,16)):[0,2,4].map(index=>parseInt(value.slice(index,index+2),16));return (parts[0]*299+parts[1]*587+parts[2]*114)/1000>155?'#0a0d0b':'#ffffff'};
function applyClubIdentity(identity){
  Object.values(clubThemeVariables).forEach(variable=>sheet.style.removeProperty(variable));
  sheet.style.removeProperty('--club-symbols');
  sheet.style.removeProperty('--club-on-accent');
  delete sheet.dataset.symbols;
  delete sheet.dataset.pattern;
  sheet.classList.toggle('has-club-identity',Boolean(identity));
  sheet.classList.toggle('has-club-art',Boolean(identity?.symbols?.art));
  if(!identity)return;
  Object.entries(identity.theme||{}).forEach(([name,value])=>{if(clubThemeVariables[name])sheet.style.setProperty(clubThemeVariables[name],value)});
  if(identity.theme?.accent)sheet.style.setProperty('--club-on-accent',colorForAccent(identity.theme.accent));
  if(identity.symbols?.art)sheet.style.setProperty('--club-symbols',`url("${identity.symbols.art}")`);
  if(identity.symbols?.names)sheet.dataset.symbols=identity.symbols.names.join(',');
  if(identity.symbols?.pattern)sheet.dataset.pattern=identity.symbols.pattern;
}
function introLetters(word){
  return [...word].map((letter,index)=>`<span style="--letter:${index}"${letter===' '?' aria-hidden="true"':''}>${letter===' '?'&nbsp;':letter}</span>`).join('');
}
let introTimer=null;
function finishClubIntro(){
  clearTimeout(introTimer);
  clubIntro.classList.remove('is-playing');
  clubIntro.hidden=true;
}
function playClubIntro(code){
  const club=clubs.find(item=>item.code===code),intro=clubIdentities[code]?.intro;
  finishClubIntro();
  if(!club||!intro||reducedMotion.matches||document.body.classList.contains('capture-mode'))return;
  clubIntro.className=`club-intro club-intro--${intro.type}`;
  clubIntro.dataset.symbol=intro.symbol;
  clubIntro.style.setProperty('--intro-duration',`${intro.duration}ms`);
  const symbol=intro.art?`<img decoding="async" class="club-intro__symbol-art" width="180" height="180" src="${intro.art}" alt="" aria-hidden="true">`:`<div class="club-intro__emblem" aria-hidden="true"><span>${intro.mark}</span></div>`;
  clubIntro.innerHTML=`<div class="club-intro__stripes" aria-hidden="true"></div><div class="club-intro__stage">${symbol}<p>${intro.kicker}</p><strong aria-label="${club.name}">${introLetters(club.name.toUpperCase())}</strong><small>Clique, toque ou pressione Esc para continuar</small></div>`;
  clubIntro.hidden=false;
  void clubIntro.offsetWidth;
  clubIntro.classList.add('is-playing');
  introTimer=setTimeout(finishClubIntro,intro.duration);
}
// URLs do recorte que retornaram 404 na auditoria: manter dados e usar o escudo local.
// Novas fotos são locais e identificadas por clube; mantém compatibilidade com URLs antigas.
const unavailableEspnPhotos=new Set(["115379", "119170", "121921", "131075", "140012", "143849", "145107", "145369", "146269", "155056", "158272", "162558", "166488", "167845", "168981", "174395", "174782", "182522", "182646", "197049", "198435", "198569", "198808", "199017", "199065", "199734", "200775", "205448", "206953", "210135", "210143", "218972", "219005", "223437", "235385", "236283", "236284", "236324", "236596", "237013", "237136", "240149", "241466", "250594", "252805", "253486", "254007", "266664", "267902", "269079", "269852", "270193", "270562", "271726", "272527", "282588", "285004", "285029", "286703", "286714", "287633", "287688", "293875", "297761", "298576", "299967", "302657", "304380", "306764", "307717", "309499", "3108270", "314545", "314603", "314825", "314915", "319422", "319696", "320082", "331074", "333314", "334723", "334756", "339844", "357900", "358788", "361359", "371527", "379785", "379922", "380327", "382870", "382994", "385289", "390671", "399179", "418241", "418256", "420672", "94225"]);
function unavailablePhoto(src){const match=/espncdn\.com\/i\/headshots\/soccer\/players\/full\/(\d+)\.png$/.exec(src||'');return Boolean(match&&unavailableEspnPhotos.has(match[1]))}
function playerVisual(name,clubCode){
  const fallback=clubCode?crest(clubCode):'';
  const curated=window.clubPlayerImages?.[clubCode]?.[name];
  const legacy=playerPhotos[name];
  const photo=curated?.image||(!/transfermarkt|tmssl/i.test(legacy||'')&&!unavailablePhoto(legacy)?legacy:null);
  return photo?`<img decoding="async" class="avatar" width="56" height="64" style="object-position:${curated?.position||'50% 22%'}" src="${photo}" alt="Foto de ${name}" onerror="this.onerror=null;this.src='${fallback}';this.classList.add('club-photo-fallback')">`:`<img decoding="async" class="avatar club-photo-fallback" width="46" height="46" src="${fallback}" alt="Escudo do clube de ${name}">`;
}
let pinned=false,closeTimer,lastTrigger=null,lastTriggerKeyboard=false;
const rankList=(items,label,clubCode)=>items.map((s,i)=>{const[n,v]=s.split('|');return `<div class="scorer assist"><div class="assist-photo">${playerVisual(n,clubCode)}<span class="assist-rank">0${i+1}</span></div><b>${n}</b><em>${v} ${label}</em></div>`}).join('');
const searchUrl=q=>`https://www.google.com/search?q=${encodeURIComponent(`${q} site:ge.globo.com antes:${'2026-10-31'}`)}`;
const marketList=code=>(marketData[code]?.players||[]).map((p,i)=>`<a class="market-player" href="${marketData[code].kader}" target="_blank" rel="noopener noreferrer">${playerVisual(p.name,code)}<span><small>0${i+1}</small><b>${p.name}</b></span><em>${formatEuroMi(p.value)}</em></a>`).join('');

// Mesmos objetos e recorte da classificação; nenhum total é atualizado aqui.
function seasonTopFive(field){
  const entries=clubsA.flatMap(club=>(club[field]||[]).map(item=>{const[name,total]=item.split('|');return {name,total:Number(total),club}})).sort((a,b)=>b.total-a.total||a.name.localeCompare(b.name,'pt-BR'));
  return entries.slice(0,5).map(entry=>({...entry,rank:entries.findIndex(other=>other.total===entry.total)+1}));
}
function renderSeasonRanking(field,target,label){
  document.getElementById(target).innerHTML=seasonTopFive(field).map((entry,index)=>{
    const photo=window.seasonActionImages?.[`${entry.club.code}:${entry.name}`];
    return `<li value="${entry.rank}" class="season-player ${index===0?'season-player-leader':''}"><button type="button" class="season-player-button" data-season-club="${entry.club.code}" aria-haspopup="dialog" aria-label="${entry.rank}º lugar: ${entry.name}, ${entry.total} ${label==='gols'?'gols':'assistências'}. Ver detalhes do ${entry.club.name}"><span class="season-photo"><img src="${photo?.image||window.clubPlayerImages?.[entry.club.code]?.[entry.name]?.image||crest(entry.club.code)}" alt="${photo?.alt||entry.name}" loading="lazy" decoding="async" width="640" height="420" style="object-position:${photo?.position||'50% 35%'}" onerror="this.onerror=null;this.src='${crest(entry.club.code)}';this.classList.add('club-photo-fallback')"></span><span class="season-rank" aria-label="${entry.rank}º lugar">${String(entry.rank).padStart(2,'0')}</span><span class="season-player-name"><strong>${entry.name}</strong><span><img src="${crest(entry.club.code)}" alt="" width="20" height="20" loading="lazy">${entry.club.name}</span></span><span class="season-total"><strong>${entry.total}</strong><span>${label}</span></span><span class="season-arrow" aria-hidden="true">↗</span></button></li>`;
  }).join('');
}
renderSeasonRanking('scorers','seasonScorers','gols');
renderSeasonRanking('assists','seasonAssists','assist.');
document.querySelectorAll('[data-season-club]').forEach(button=>button.addEventListener('click',event=>{
  button.classList.remove('focus-returned','pointer-returned');lastTrigger=button;lastTriggerKeyboard=event.detail===0;
  // Os destaques permanecem da Série A quando a tabela está na Série B.
  const previousClubs=clubs,previousDivision=division;clubs=clubsA;division='A';openClub(button.dataset.seasonClub,true);clubs=previousClubs;division=previousDivision;
}));
const photoSources=new Map();
Object.values(window.clubPlayerImages||{}).flatMap(Object.values).concat(Object.values(window.seasonActionImages||{})).forEach(photo=>{if(photo.source&&!photoSources.has(photo.source))photoSources.set(photo.source,photo.credit)});
document.getElementById('playerPhotoSources').innerHTML=[...photoSources].map(([source,credit])=>`<li><a href="${source}" target="_blank" rel="noopener noreferrer">${credit} ↗</a></li>`).join('');
document.querySelector('[data-open-sources]').addEventListener('click',()=>{document.getElementById('fontes-creditos').open=true});

function openClub(code,expanded=false){
  clearTimeout(closeTimer);sheet.getAnimations().forEach(animation=>animation.cancel());sheet.classList.remove('is-closing');
  const c=clubs.find(x=>x.code===code),x=extras[code],market=marketData[code],identity=clubIdentities[code],pct=formatPercent((c.pts/(c.j*3))*100);
  sheet.dataset.club=code;
  sheet.scrollTop=0;
  applyClubIdentity(identity);
  pinned=expanded;sheet.classList.toggle('expanded',expanded);
  const games=c.games||[...c.form].map((r,i)=>({r,opp:x?.o[i]||'Adversário',score:''}));
  const scorers=c.scorers.length?`<div class="detail-section"><h4>TOP 3 ARTILHEIROS · BRASILEIRÃO</h4>${c.scorers.map((s,i)=>{const[n,g]=s.split('|');return `<div class="scorer">${playerVisual(n,c.code)}<b><small>0${i+1}</small>${n}</b><em>${g} GOLS</em></div>`}).join('')}</div>`:'';
  const assists=division==='A'&&c.assists?.length?`<div class="detail-section"><h4>TOP 3 EM ASSISTÊNCIAS</h4>${rankList(c.assists,'ASSIST.',c.code)}</div>`:`<div class="data-note">Assistências individuais da Série B não foram exibidas sem uma fonte consolidada no recorte. A artilharia foi calculada pelas súmulas dos jogos.</div>`;
  const valuables=marketList(code)||'<div class="data-note">Avaliações individuais não disponíveis.</div>';
  const newsUrl=searchUrl(`${c.name} últimas notícias futebol`),previewUrl=searchUrl(`${c.name} x ${c.next} prévia próximo jogo`);
  const symbolField=identity?.symbols?.marks?`<div class="club-symbol-field" aria-hidden="true">${identity.symbols.marks.map(mark=>`<span>${mark}</span>`).join('')}</div>`:'';
// TODO(asset): fotografia alternativa do Flamengo com licença confirmada; usa silhueta existente.
  const clubMoment=identity?.moment?`<figure class="club-moment${identity.moment.image?'':' club-moment--graphic'}">${identity.moment.image?`<img decoding="async" width="640" height="360" src="${code==='FLA'?'assets/identidade/flamengo-silhuetas.svg':identity.moment.image}" alt="${code==='FLA'?'Silhuetas que representam a torcida e os símbolos do Flamengo':identity.moment.alt||''}" loading="lazy">`:`<div class="club-moment__graphic" aria-hidden="true"><img decoding="async" width="130" height="130" src="${crest(c.code)}" alt=""><b>${identity.moment.year}</b></div>`}<figcaption><small>${identity.moment.eyebrow}</small><h4>${identity.moment.title}</h4><p>${identity.moment.text}</p>${identity.moment.source?`<a href="${identity.moment.source}" target="_blank" rel="noopener noreferrer">${code==='FLA'?'Fonte do momento histórico · ':''}${identity.moment.credit} ↗</a>`:''}</figcaption></figure>`:'';
  content.innerHTML=`${symbolField}<div class="detail-top"><img decoding="async" class="crest" width="43" height="43" src="${crest(c.code)}" alt="Escudo do ${c.name}"><div><small>SÉRIE ${division} · ${String(c.pos).padStart(2,'0')}º NA CLASSIFICAÇÃO</small><h3 id="clubDialogTitle">${c.name}</h3>${identity?`<p class="club-tagline">${identity.tagline}</p>${identity.intro?`<button class="replay-celebration" type="button" data-replay-intro="${code}" aria-label="Rever comemoração do ${c.name}">↻ Rever comemoração</button>`:''}`:''}</div></div>
  <div class="detail-stats"><div class="detail-stat"><span>VITÓRIAS</span><strong>${c.v}</strong></div><div class="detail-stat"><span>GOLS PRÓ</span><strong>${c.gp}</strong></div><div class="detail-stat"><span>GOLS CONTRA</span><strong>${c.gc}</strong></div></div>
  ${clubMoment}
  <div class="market-total"><span>VALOR DE MERCADO DO ELENCO</span><strong>${formatEuroMi(market?.total)}</strong><a href="${market?.kader||'#'}" target="_blank" rel="noopener noreferrer">VER NO TRANSFERMARKT ↗</a></div>
  <div class="detail-section"><h4>APROVEITAMENTO</h4><div class="percent">${pct}%</div></div>
  <div class="detail-section"><h4>FORMA · ÚLTIMOS 5</h4><div class="form large">${dots(c.form)}</div></div>${scorers}
  <div class="detail-section"><h4>TOP 3 MAIS VALIOSOS DO ELENCO</h4>${valuables}</div>
  ${expanded?`<div class="detail-section"><h4>ÚLTIMOS CINCO JOGOS</h4><div class="match-list">${games.map(g=>`<div class="match"><span class="result ${g.r}">${g.r}</span><b>${g.score}</b><span>${g.opp}</span></div>`).join('')}</div></div>${assists}`:`<button class="expand-hint" data-expand="${code}">Clique para ver jogos, mercado e notícias →</button>`}
  <div class="next-game"><small>PRÓXIMO JOGO APÓS O RECORTE</small><div class="fixture"><strong>${c.next}</strong><span class="venue">${c.venue} · ${c.venue==='C'?'CASA':'FORA'}</span></div><div class="next-date">${c.date}</div></div>
  <div class="detail-section news-section"><h4>NOTÍCIAS E PRÉVIA</h4><a class="news-link featured" href="${previewUrl}" target="_blank" rel="noopener noreferrer"><small>PRÉVIA DO PRÓXIMO JOGO</small><b>${c.name} × ${c.next}</b><span>ABRIR BUSCA NO GE ↗</span></a><a class="news-link" href="${newsUrl}" target="_blank" rel="noopener noreferrer"><small>ÚLTIMAS NOTÍCIAS</small><b>Noticiário de ${c.name}</b><span>VER MATÉRIAS ↗</span></a></div>`;
  sheet.inert=false;sheet.classList.add('open');document.dispatchEvent(new CustomEvent('motion:panel'));sheet.setAttribute('aria-hidden','false');playClubIntro(code);if(expanded){backdrop.classList.add('open');document.body.style.overflow='hidden';document.querySelectorAll('header,main,footer,#backToTop').forEach(el=>el.inert=!document.body.classList.contains('capture-mode'));document.querySelector('#closeSheet').focus()}else{backdrop.classList.remove('open');document.body.style.overflow=''}
}
function close(){
  clearTimeout(closeTimer);finishClubIntro();
  document.dispatchEvent(new CustomEvent('motion:panel-close'));
  const finish=()=>{sheet.classList.remove('is-closing');document.querySelectorAll('.club-entry.preview-open').forEach(entry=>entry.classList.remove('preview-open'));finishClubIntro();document.querySelectorAll('header,main,footer,#backToTop').forEach(el=>el.inert=false);sheet.inert=true;sheet.classList.remove('open');sheet.classList.remove('expanded');sheet.setAttribute('aria-hidden','true');backdrop.classList.remove('open');document.body.style.overflow='';if(lastTrigger?.isConnected){lastTrigger.classList.add('focus-returned');lastTrigger.classList.toggle('pointer-returned',!lastTriggerKeyboard);lastTrigger.focus({preventScroll:true});}};
  if(sheet.classList.contains('open')&&!reducedMotion.matches){
    sheet.classList.add('is-closing');sheet.inert=true;
    closeTimer=setTimeout(finish,Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-base'))||300);
  }else finish();
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-code],[data-expand]')||e.target.closest('.club-entry,.mobile-card')?.querySelector('.club-details-button');if(el){el.classList.remove('focus-returned','pointer-returned');lastTriggerKeyboard=e.detail===0;lastTrigger=el;openClub(el.dataset.code||el.dataset.expand,true)}});
document.addEventListener('click',e=>{const replay=e.target.closest('[data-replay-intro]');if(replay){sheet.scrollTop=0;playClubIntro(replay.dataset.replayIntro)}});
clubIntro.addEventListener('click',finishClubIntro);
document.addEventListener('keydown',e=>{if(e.key==='Tab'&&pinned&&sheet.classList.contains('open')){const focusable=[...sheet.querySelectorAll('button,a[href],[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&el.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
document.querySelector('#closeSheet').addEventListener('click',()=>{pinned=false;close()});backdrop.addEventListener('click',()=>{pinned=false;close()});
function setDivision(next){division=next;clubs=division==='A'?clubsA:clubsB;close();document.querySelectorAll('[data-series]').forEach(b=>b.classList.toggle('active',b.dataset.series===division));document.querySelector('#heroSeries').textContent=`CAMPEONATO BRASILEIRO · SÉRIE ${division}`;document.querySelector('.round-select > span').textContent=division==='A'?'RODADA EM ANDAMENTO':'RODADAS CONCLUÍDAS';const roundLabel=document.querySelector('#roundLabel');roundLabel.textContent=division==='A'?'33 / 38':'35 / 38';roundLabel.dataset.odometer=division==='A'?'33':'35';roundLabel.setAttribute('aria-label',`${division==='A'?'33':'35'} de 38 rodadas`);document.querySelector('#heroDescription').innerHTML=division==='A'?'Série A na <strong>33ª rodada, em andamento</strong>. Resultados concluídos até 29 de outubro.':'Série B atualizada até o fim da <strong>35ª rodada</strong>.';document.querySelector('#methodPrimary').innerHTML=division==='A'?'Esta é uma fotografia da <strong>33ª rodada em andamento</strong>, com os jogos encerrados até 29 de outubro.':'A Série B considera <strong>as 35 rodadas concluídas até 27 de outubro</strong>.';document.querySelector('#methodSecondary').innerHTML=division==='A'?'Partidas, classificação e estatísticas da Série A consideram os jogos concluídos até 29 de outubro. Alguns clubes ainda têm jogos pendentes. Os “próximos jogos” exibem o primeiro compromisso agendado após esse momento.':'Partidas, classificação e estatísticas da Série B consideram os jogos concluídos até 27 de outubro. Os “próximos jogos” mostram o primeiro compromisso ainda não disputado após esse recorte.';document.querySelector('.legend').innerHTML=division==='A'?'<span><i class="key title"></i> Libertadores</span><span><i class="key pre"></i> Pré-Libertadores</span><span><i class="key sula"></i> Sul-Americana</span><span><i class="key drop"></i> Rebaixamento</span>':'<span><i class="key title"></i> Acesso direto</span><span><i class="key pre"></i> Playoffs de acesso</span><span><i class="key drop"></i> Rebaixamento</span>';document.querySelector('.stamp').innerHTML=division==='A'?'ATUALIZADO EM 30/10/2026<br>SÉRIE A: RODADA 33 EM ANDAMENTO':'ATUALIZADO EM 30/10/2026<br>SÉRIE B: RODADA 35 CONCLUÍDA';renderTable();document.dispatchEvent(new CustomEvent('motion:division'));savedPreference.set('br26-series',division)}
document.querySelectorAll('[data-series]').forEach(b=>b.addEventListener('click',()=>setDivision(b.dataset.series)));
setDivision(savedPreference.get('br26-series')==='B'?'B':'A');
const themeBtn=document.querySelector('#themeBtn');
function setTheme(dark){document.documentElement.dataset.theme=dark?'dark':'light';document.body.classList.toggle('dark',dark);themeBtn.setAttribute('aria-pressed',String(dark));themeBtn.setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');themeBtn.querySelector('.theme-label').textContent=dark?'Modo claro':'Modo escuro';themeBtn.querySelector('.theme-icon').innerHTML=icon(dark?'sun':'moon');document.querySelector('meta[name="theme-color"]').content=getComputedStyle(document.body).getPropertyValue('--bg').trim();savedPreference.set('br26-theme',dark?'dark':'light')}
setTheme(savedPreference.get('br26-theme')==='dark'||(!savedPreference.get('br26-theme')&&matchMedia('(prefers-color-scheme:dark)').matches));
themeBtn.addEventListener('click',async event=>{
  const change=()=>setTheme(!document.body.classList.contains('dark'));
  if(!document.startViewTransition||reducedMotion.matches){change();return}
  if(document.documentElement.classList.contains('theme-transition'))return;
  document.documentElement.classList.add('theme-transition');
  const rect=themeBtn.getBoundingClientRect(),x=event.detail?event.clientX:rect.x+rect.width/2,y=event.detail?event.clientY:rect.y+rect.height/2;
  try{const transition=document.startViewTransition(change);await transition.ready;
    await document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${Math.hypot(innerWidth,innerHeight)}px at ${x}px ${y}px)`]}, {duration:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-theme'))||600,easing:getComputedStyle(document.documentElement).getPropertyValue('--ease-out').trim(),pseudoElement:'::view-transition-new(root)'}).finished;
  }catch{/* O tema já aplicado continua utilizável se a transição for interrompida. */}
  finally{document.documentElement.classList.remove('theme-transition')}
});

const backToTop=document.querySelector('#backToTop');
const heroVisibility=new IntersectionObserver(entries=>{
  const entry=entries[0];
  const visible=!entry.isIntersecting&&entry.boundingClientRect.top<0;
  syncActiveNavigation();
  backToTop.classList.toggle('is-visible',visible);
  backToTop.setAttribute('aria-hidden',String(!visible));
  backToTop.tabIndex=visible?0:-1;
});
heroVisibility.observe(document.querySelector('.hero'));
const header=document.querySelector('.topbar');
const sentinel=document.createElement('span');sentinel.className='scroll-sentinel';sentinel.setAttribute('aria-hidden','true');document.querySelector('main').prepend(sentinel);
new IntersectionObserver(([entry])=>header.classList.toggle('is-scrolled',!entry.isIntersecting)).observe(sentinel);
backToTop.addEventListener('click',()=>{document.querySelector('#top').focus({preventScroll:true});window.scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'})});
const menuToggle=document.querySelector('#menuToggle');
const mainNav=document.querySelector('#mainNav');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir navegação');menuToggle.innerHTML=icon('menu');mainNav.classList.remove('is-open')}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar navegação':'Abrir navegação');menuToggle.innerHTML=icon(open?'close':'menu');mainNav.classList.toggle('is-open',open)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mainNav.classList.contains('is-open')){closeMenu();menuToggle.focus()}});
document.addEventListener('click',event=>{if(!header.contains(event.target))closeMenu()});
mainNav.addEventListener('click',event=>{
  const link=event.target.closest('a');if(!link)return;closeMenu();
  if(link.hash==='#regulamento'&&document.querySelector('#historyContent').hidden)document.querySelector('#historyToggle').click();
  const section=document.querySelector(link.hash);
  if(section?.tagName==='DETAILS')section.open=true;
  requestAnimationFrame(()=>{section?.setAttribute('tabindex','-1');section?.focus({preventScroll:true});section?.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'})});
});
function syncActiveNavigation(){
  const headerHeight=header.getBoundingClientRect().height;
  const marker=headerHeight+Math.min(innerHeight*.25,180);
  let active=null;
  if(document.querySelector('.hero').getBoundingClientRect().bottom<=headerHeight+24){
    active=['classificacao','historia','regulamento','sobre-dados'].map(id=>document.getElementById(id)).filter(section=>section.getClientRects().length&&section.getBoundingClientRect().top<=marker&&section.getBoundingClientRect().bottom>headerHeight).sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top)[0];
  }
  mainNav.querySelectorAll('a').forEach(link=>{if(active&&link.hash===`#${active.id}`)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current')});
}
const navObserver=new IntersectionObserver(syncActiveNavigation,{rootMargin:'-15% 0px -60% 0px',threshold:0});
['classificacao','historia','regulamento','sobre-dados'].forEach(id=>navObserver.observe(document.getElementById(id)));

// Modo determinístico usado apenas para a captura de auditoria solicitada.
if(new URLSearchParams(location.search).get('capture')==='round31'){
  document.body.classList.add('capture-mode');
  setDivision('A');
  document.querySelector('main').insertBefore(sheet,document.querySelector('.history'));
  openClub('FLA',true);
  document.body.style.overflow='auto';
}

// A memória do campeonato é independente da divisão exibida na tabela.
const historyToggle=document.querySelector('#historyToggle');
const historyContent=document.querySelector('#historyContent');
historyContent.hidden=true;
historyToggle.addEventListener('click',()=>{
  const expanded=historyToggle.getAttribute('aria-expanded')!=='true';
  historyToggle.setAttribute('aria-expanded',String(expanded));
  historyContent.hidden=!expanded;
  document.querySelector('#historia').classList.toggle('is-expanded',expanded);
  document.querySelector('#historyMoreHint').hidden=expanded;
  historyToggle.querySelector('span').textContent=expanded?'Recolher a história':'Ver mais da história';
  historyToggle.querySelector('.history-toggle-icon').textContent=expanded?'−':'+';
});

// TODO(asset): foto neutra de estádio, torcida ou taça com licença e crédito confirmados.
const heroMoments=[
  {title:'Neymar · Santos, 2012',src:'assets/identidade/hero/02-neymar.jpg',focus:'50% 40%'},
  {title:'Falcão · Internacional',src:'assets/identidade/hero/16-falcao.jpg',focus:'52% 40%'},
  {title:'Romário e Edmundo · Vasco, 2000',src:'assets/identidade/hero/07-romario-edmundo.jpg',focus:'50% 40%'},
  {title:'Sócrates · Corinthians',src:'assets/identidade/hero/08-socrates.jpg',focus:'50% 38%',fit:'contain'},
  {title:'Filipe Luís · Flamengo, 2025',src:'assets/identidade/hero/20-filipe-luis.jpg',focus:'50% 34%'},
  {title:'Gabigol · Flamengo, geração 2019',src:'assets/identidade/hero/06-gabigol-2019.jpg',focus:'50% 52%'},
  {title:'Pelé · Santos',src:'assets/identidade/hero/01-pele-horizontal.jpg',focus:'52% 38%'},
  {title:'Ronaldinho · Atlético-MG, 2012',src:'assets/identidade/hero/14-ronaldinho.jpg',focus:'50% 40%'},
  {title:'Marcelinho Carioca · Corinthians',src:'assets/identidade/hero/09-marcelinho.jpg',focus:'50% 40%'},
  {title:'Zico · Flamengo',src:'assets/identidade/hero/04-zico.jpg',focus:'50% 40%'},
  {title:'Bobô · Bahia',src:'assets/identidade/hero/18-bobo.png',focus:'50% 40%'},
  {title:'Hulk · Atlético-MG, 2021',src:'assets/identidade/hero/17-hulk.jpg',focus:'50% 40%'},
  {title:'Alex · Cruzeiro, 2003',src:'assets/identidade/hero/12-alex.jpg',focus:'50% 34%'},
  {title:'Fred · Fluminense, 2012',src:'assets/identidade/hero/19-fred.jpg',focus:'50% 40%'},
  {title:'Reinaldo · Atlético-MG',src:'assets/identidade/hero/13-reinaldo.jpg',focus:'50% 40%'},
  {title:'Luis Suárez · Grêmio, 2023',src:'assets/identidade/hero/11-suarez.jpg',focus:'50% 40%'}
];
// Variantes locais dos mesmos arquivos; os créditos e objetos originais são preservados.
const heroAsset=(src,size)=>`assets/motion/hero/${src.split('/').pop().replace(/\.[^.]+$/,'')}-${size}.webp`;
const heroMedia=document.querySelector('#heroMedia');
const heroPhotoLabel=document.querySelector('#heroPhotoLabel');
const heroPhotoPause=document.querySelector('#pauseHeroPhotos');
const heroPhotoDuration=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-hero-slide'))||8000;
let heroInViewport=true,heroProgressAnimation;
let heroPhotoIndex=0,heroPhotoTimer,heroPhotosPaused=reducedMotion.matches;
let heroZoomDeferred=true;

const initialHeroSlide=heroMedia.querySelector('.hero-slide');
initialHeroSlide.dataset.title=heroMoments[0].title;
const initialHeroImage=initialHeroSlide.querySelector('img');
const initialHeroCanvas=document.createElement('canvas');initialHeroCanvas.className='hero-canvas';initialHeroCanvas.setAttribute('aria-hidden','true');initialHeroSlide.append(initialHeroCanvas);
function paintInitialHero(){
  if(!initialHeroImage.naturalWidth)return;
  const rect=initialHeroSlide.getBoundingClientRect(),scale=Math.min(devicePixelRatio||1,2),w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));
  if(initialHeroCanvas.width===w&&initialHeroCanvas.height===h)return;initialHeroCanvas.width=w;initialHeroCanvas.height=h;
  const iw=initialHeroImage.naturalWidth,ih=initialHeroImage.naturalHeight,cover=Math.max(w/iw,h/ih),sw=w/cover,sh=h/cover,sx=(iw-sw)*.5,sy=Math.max(0,Math.min(ih-sh,(ih-sh)*.4));
  initialHeroCanvas.getContext('2d').drawImage(initialHeroImage,sx,sy,sw,sh,0,0,w,h);
}
if(initialHeroImage.complete)paintInitialHero();else initialHeroImage.addEventListener('load',paintInitialHero,{once:true});window.addEventListener('resize',paintInitialHero,{passive:true});
heroMedia.insertAdjacentHTML('beforeend',heroMoments.slice(1).map(moment=>`<div class="hero-slide" data-title="${moment.title}"><img decoding="async" width="1600" height="900" data-src="${heroAsset(moment.src,1600)}" data-srcset="${heroAsset(moment.src,800)} 800w, ${heroAsset(moment.src,1600)} 1600w" sizes="(max-width:768px) 100vw, 65vw" alt="" loading="lazy" style="--hero-focus:${moment.focus};object-fit:${moment.fit||'cover'}"></div>`).join(''));
const heroSlides=[...heroMedia.querySelectorAll('.hero-slide')];
const heroZooms=new Map();

function startHeroZoom(){
  const slide=heroSlides[heroPhotoIndex];
  heroZooms.get(slide)?.cancel();
  if(reducedMotion.matches||heroZoomDeferred)return;
  const zoom=(slide.querySelector('.hero-canvas')||slide.querySelector('img')).animate(
    [{transform:'scale(1)'},{transform:'scale(1.06)'}],
    {duration:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-hero-zoom'))||14000,easing:getComputedStyle(document.documentElement).getPropertyValue('--ease-in-out').trim(),direction:'alternate',iterations:Infinity}
  );
  heroZooms.set(slide,zoom);
  if(heroPhotosPaused||document.hidden||!heroInViewport)zoom.pause();
}

let heroRequest=0;
async function showHeroPhoto(index){
  const request=++heroRequest;
  for(let checked=0;checked<heroSlides.length;checked++,index++){
    const next=(index+heroSlides.length)%heroSlides.length;
    const slide=heroSlides[next],image=slide.querySelector('img');
    if(slide.classList.contains('failed'))continue;
    if(!image.getAttribute('src')){image.classList.add('is-loading');slide.classList.add('image-pending');image.srcset=image.dataset.srcset;image.src=image.dataset.src;image.loading='eager';}
    try{if(!image.complete)await image.decode();}catch{slide.classList.add('failed');}finally{image.classList.remove('is-loading');slide.classList.remove('image-pending');}
    if(request!==heroRequest)return;
    if(image.naturalWidth){
      heroZooms.get(heroSlides[heroPhotoIndex])?.cancel();heroZooms.delete(heroSlides[heroPhotoIndex]);
      heroSlides[heroPhotoIndex].classList.remove('active');heroPhotoIndex=next;slide.classList.add('active');
      heroPhotoLabel.textContent=heroMoments[next].title;
      document.querySelector('.hero-progress').setAttribute('aria-valuenow',String(next+1));
      heroProgressAnimation?.cancel();heroProgressAnimation=null;
      startHeroZoom();scheduleHeroPhotos();return;
    }
  }
}

function scheduleHeroPhotos(){
  heroSlides.forEach(slide=>slide.classList.toggle('is-animating',slide===heroSlides[heroPhotoIndex]&&!heroPhotosPaused&&!document.hidden&&!reducedMotion.matches&&heroInViewport));
  clearTimeout(heroPhotoTimer);
  heroPhotoPause.innerHTML=icon(heroPhotosPaused?'play':'pause');
  heroPhotoPause.setAttribute('aria-label',heroPhotosPaused?'Retomar fotografias':'Pausar fotografias');
  heroPhotoPause.disabled=reducedMotion.matches;
  heroPhotoPause.setAttribute('aria-pressed',String(heroPhotosPaused));
  if(reducedMotion.matches){
    heroZooms.forEach(zoom=>zoom.cancel());
    heroZooms.clear();heroProgressAnimation?.cancel();heroProgressAnimation=null;
  }
  let zoom=heroZooms.get(heroSlides[heroPhotoIndex]);
  if(!zoom&&!reducedMotion.matches){startHeroZoom();zoom=heroZooms.get(heroSlides[heroPhotoIndex])}
  if(!heroProgressAnimation&&!reducedMotion.matches)heroProgressAnimation=document.querySelector('.hero-progress span').animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:heroPhotoDuration,fill:'forwards'});
  if(heroPhotosPaused||document.hidden||reducedMotion.matches||!heroInViewport){zoom?.pause();heroProgressAnimation?.pause();return}
  heroProgressAnimation?.play();
  zoom?.play();
  const remaining=Math.max(0,heroPhotoDuration-(heroProgressAnimation?.currentTime||0));
  heroPhotoTimer=setTimeout(()=>showHeroPhoto(heroPhotoIndex+1),remaining);
}
heroSlides.forEach(slide=>{
  const image=slide.querySelector('img');
  const markFailed=()=>{
    slide.classList.add('failed');
    if(slide===heroSlides[heroPhotoIndex])showHeroPhoto(heroPhotoIndex+1);
  };
  image.addEventListener('error',markFailed);
  if(image.getAttribute('src')&&image.complete&&!image.naturalWidth)markFailed();
});
document.querySelector('#nextHeroPhoto').addEventListener('click',()=>showHeroPhoto(heroPhotoIndex+1));
document.querySelector('#previousHeroPhoto').addEventListener('click',()=>showHeroPhoto(heroPhotoIndex-1));
heroPhotoPause.addEventListener('click',()=>{heroPhotosPaused=!heroPhotosPaused;scheduleHeroPhotos()});
reducedMotion.addEventListener('change',event=>{heroPhotosPaused=event.matches;scheduleHeroPhotos()});
document.addEventListener('visibilitychange',scheduleHeroPhotos);
new IntersectionObserver(([entry])=>{heroInViewport=entry.isIntersecting;scheduleHeroPhotos()}).observe(document.querySelector('.hero'));
const firstHeroImage=heroSlides[0].querySelector('img');
if(firstHeroImage.complete)scheduleHeroPhotos();
else firstHeroImage.addEventListener('load',scheduleHeroPhotos,{once:true});
setTimeout(()=>{heroZoomDeferred=false;startHeroZoom();scheduleHeroPhotos()},3000);

// Descida editorial com duração previsível e parada ao interagir.
document.querySelector('.discover-link').addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  const target=document.querySelector('#classificacao');
  const title=document.querySelector('#tableTitle');
  const start=window.scrollY;
  const offset=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
  const end=Math.max(0,target.getBoundingClientRect().top+start-offset);
  const finish=()=>{
    if(location.hash!=='#classificacao')history.pushState(null,'','#classificacao');
    title.focus({preventScroll:true});
  };
  if(reducedMotion.matches){window.scrollTo({top:end,behavior:'instant'});finish();return}
  const duration=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dur-scroll'))||1100;
  let frame;
  let started;
  const events=['wheel','touchstart','keydown','pointerdown'];
  const cancel=()=>{cancelAnimationFrame(frame);events.forEach(name=>window.removeEventListener(name,cancel))};
  events.forEach(name=>window.addEventListener(name,cancel,{once:true,passive:true}));
  const animate=time=>{
    started??=time;
    const progress=Math.min((time-started)/duration,1);
    const eased=progress*progress*progress*(progress*(progress*6-15)+10);
    window.scrollTo({top:start+(end-start)*eased,behavior:'instant'});
    if(progress<1)frame=requestAnimationFrame(animate);
    else{cancel();finish()}
  };
  frame=requestAnimationFrame(animate);
});

// Links diretos ao regulamento também abrem o conteúdo histórico.
function revealLinkedSection(){
  if(location.hash==='#regulamento'){
    if(historyContent.hidden)historyToggle.click();
    requestAnimationFrame(()=>document.querySelector('#regulamento').scrollIntoView({behavior:'instant',block:'start'}));
  }
}
window.addEventListener('hashchange',revealLinkedSection);
revealLinkedSection();

// Esc sempre fecha a gaveta, mesmo durante a comemoração ou em controles internos.
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&sheet.classList.contains('open')){
    event.preventDefault();event.stopImmediatePropagation();pinned=false;close();
  }
},true);
// O foco devolvido não representa hover; o próximo foco de teclado reativa a prévia.
document.addEventListener('focusout',event=>{
  if(event.target.matches?.('[data-code],[data-season-club]'))event.target.classList.remove('focus-returned','pointer-returned');
});

function closeRowPreviews(){document.querySelectorAll('.club-entry.preview-open').forEach(entry=>entry.classList.remove('preview-open'))}
let previewPointer=null,previewFrame=0,previewEvent;
document.addEventListener('pointermove',event=>{
  previewEvent=event;
  if(previewFrame)return;
  previewFrame=requestAnimationFrame(()=>{
    previewFrame=0;
    const position=`${previewEvent.clientX},${previewEvent.clientY}`;
    if(position===previewPointer)return;
    previewPointer=position;closeRowPreviews();
    if(!sheet.classList.contains('open')&&previewEvent.pointerType!=='touch'&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!reducedMotion.matches)previewEvent.target.closest('.club-entry')?.classList.add('preview-open');
  });
},{passive:true});
document.documentElement.addEventListener('pointerleave',closeRowPreviews);
document.addEventListener('focusin',event=>{
  const row=event.target.closest('.club-row');
  if(row&&!event.target.classList.contains('focus-returned')&&event.target.matches(':focus-visible')&&!sheet.classList.contains('open')){
    closeRowPreviews();row.closest('.club-entry').classList.add('preview-open');
  }
});
document.addEventListener('focusout',event=>{
  if(event.target.matches?.('.club-details-button')&&event.target.closest('.club-entry'))event.target.closest('.club-entry')?.classList.remove('preview-open');
});
