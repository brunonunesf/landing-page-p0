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
const clubsA=[...(window.seriesAData||clubsAFallback)].sort((a,b)=>b.pts-a.pts||b.v-a.v||(b.gp-b.gc)-(a.gp-a.gc)||b.gp-a.gp);
clubsA.forEach((club,index)=>{club.pos=index+1});
const clubsB=window.seriesBData||[];
Object.entries(window.seriesPhotos||{}).forEach(([name,url])=>{if(!playerPhotos[name])playerPhotos[name]=url});
const normalizedName=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
Object.values(window.marketData||{}).flatMap(club=>club.players||[]).forEach(player=>{
  const matchingName=[...clubsA,...clubsB].flatMap(club=>club.scorers||[]).map(item=>item.split('|')[0]).find(name=>normalizedName(name)===normalizedName(player.name));
  if(matchingName)playerPhotos[matchingName]=player.photo;
});
playerPhotos['Jorge Carrascal']='https://storage.googleapis.com/crf-strapi-media-prd/CARRASCAL_Fut_Prof_Masc_69cb5c6eed/CARRASCAL_Fut_Prof_Masc_69cb5c6eed.png';
let division='A',clubs=clubsA;

const zone=p=>division==='B'?(p<=2?'#c8f631':p<=6?'#4bd57d':p>=17?'#ee604e':'transparent'):(p<=4?'#c8f631':p<=6?'#4bd57d':p<=12?'#52a7d8':p>=17?'#ee604e':'transparent');
const crest=c=>`${crestBase}${c}.png?v=escudos-oficiais-20261017`;
const dots=f=>[...f].map(x=>`<i class="dot ${x}" title="${x==='V'?'Vitória':x==='D'?'Derrota':'Empate'}"></i>`).join('');
const table=document.querySelector('#tableBody');
function renderTable(){
  table.innerHTML=clubs.map(c=>`<div class="club-entry" style="--zone:${zone(c.pos)}"><div class="club-row row-grid" tabindex="0" role="button" aria-label="Ver detalhes do ${c.name}" data-code="${c.code}"><span class="pos">${String(c.pos).padStart(2,'0')}</span><span class="club"><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}" loading="lazy">${c.name}</span><strong class="pts">${c.pts}</strong><span class="stat">${c.j}</span><span class="stat">${c.v}</span><span class="stat">${c.gp}</span><span class="stat">${c.gc}</span><span class="stat">${c.gp-c.gc>0?'+':''}${c.gp-c.gc}</span><span class="form">${dots(c.form)}</span><span class="arrow">↗</span></div><div class="hover-details"><span><small>APROVEITAMENTO</small><b>${((c.pts/(c.j*3))*100).toFixed(1).replace('.',',')}%</b></span><span><small>VALOR DO ELENCO</small><b>${marketData[c.code]?.total||'N/D'}</b></span><span><small>PRÓXIMO</small><b>${c.next} · ${c.venue}</b></span><span class="hover-form"><small>RECENTE</small><span class="form">${dots(c.form)}</span></span><em>Clique para abrir a análise completa →</em></div></div>`).join('');
  document.querySelector('#mobileCards').innerHTML=clubs.map(c=>`<article class="mobile-card" tabindex="0" role="button" data-code="${c.code}" style="--zone:${zone(c.pos)}"><i class="zone"></i><span class="pos">${String(c.pos).padStart(2,'0')}</span><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}" loading="lazy"><div><h3>${c.name}</h3><p class="form">${dots(c.form)}</p></div><div class="points"><strong>${c.pts}</strong><span>PONTOS</span></div></article>`).join('');
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
  FLA:{theme:clubTheme('#120509','#2d0a12','#cf1730','#ff6579','#fff5f2','#f0c7cc'),symbols:{art:'assets/identidade/flamengo-silhuetas.svg',names:['urubu','Maracanã','Cristo Redentor','comemoração'],pattern:'stripes'},tagline:'Vermelho que pulsa. Uma nação que empurra.',intro:{type:'symbol-reveal',symbol:'urubu',mark:'V',kicker:'O URUBU VOOU',duration:2600},moment:{eyebrow:'MOMENTO QUE MARCOU · GERAÇÃO 2019',title:'O camisa 9 diante da arquibancada.',text:'Gabigol e a torcida resumem a confiança e a intensidade daquele Flamengo.',image:'assets/identidade/hero/06-gabigol-2019.jpg',alt:'Gabigol comemora diante da torcida do Flamengo em 2019',source:'https://ge.globo.com/numerologos/noticia/flamengo-tem-quarta-melhor-campanha-de-1o-turno-na-era-dos-pontos-corridos-avai-condenado.ghtml',credit:'André Durão / GloboEsporte.com'}},
  PAL:{theme:clubTheme('#061b13','#0b3524','#168247','#65d98b','#f5fff7','#b9d8c5'),symbols:{marks:['P','◉','P'],names:['porco','Academia','Allianz Parque'],pattern:'rings'},tagline:'A Academia transforma pressão em conquista.',intro:{type:'impact',symbol:'academia',mark:'P',kicker:'AVANTI, PALESTRA',duration:2600},moment:graphicMoment('MEMÓRIA ALVIVERDE · ACADEMIA','A tradição que atravessa gerações.','Técnica, intensidade e uma torcida que reconhece cada capítulo da Academia.','ACADEMIA')},
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
  const bird=`<svg class="club-intro__bird" viewBox="0 0 240 150" aria-hidden="true"><path class="club-intro__wing club-intro__wing--left" d="M119 74C91 45 56 27 17 22 38 46 57 67 84 87Z"/><path class="club-intro__wing club-intro__wing--right" d="M121 74C149 45 184 27 223 22 202 46 183 67 156 87Z"/><path class="club-intro__body" d="M86 76 112 64 121 48 130 64 158 77 140 91 133 124 121 143 109 124 102 92Z"/><path class="club-intro__head" d="m116 54 15-20 20 7-14 9 8 10-19 8Z"/></svg>`;
  const symbol=intro.symbol==='urubu'?bird:`<div class="club-intro__emblem" aria-hidden="true"><span>${intro.mark}</span></div>`;
  clubIntro.innerHTML=`<div class="club-intro__stripes" aria-hidden="true"></div><div class="club-intro__stage">${symbol}<p>${intro.kicker}</p><strong aria-label="${club.name}">${introLetters(club.name.toUpperCase())}</strong><small>Clique, toque ou pressione Esc para continuar</small></div>`;
  clubIntro.hidden=false;
  void clubIntro.offsetWidth;
  clubIntro.classList.add('is-playing');
  introTimer=setTimeout(finishClubIntro,intro.duration);
}
function playerVisual(name,clubCode){const fallback=clubCode?crest(clubCode):'';return playerPhotos[name]?`<img class="avatar" src="${playerPhotos[name]}" alt="Foto de ${name}" onerror="this.onerror=null;this.src='${fallback}';this.classList.add('club-photo-fallback')">`:`<img class="avatar club-photo-fallback" src="${fallback}" alt="Escudo do clube de ${name}">`}
let pinned=false,closeTimer,lastTrigger=null;
const rankList=(items,label,clubCode)=>items.map((s,i)=>{const[n,v]=s.split('|');return `<div class="scorer assist"><div class="assist-photo">${playerVisual(n,clubCode)}<span class="assist-rank">0${i+1}</span></div><b>${n}</b><em>${v} ${label}</em></div>`}).join('');
const searchUrl=q=>`https://www.google.com/search?q=${encodeURIComponent(`${q} site:ge.globo.com antes:${division==='A'?'2026-10-21':'2026-10-18'}`)}`;
const marketList=code=>(marketData[code]?.players||[]).map((p,i)=>`<a class="market-player" href="${marketData[code].kader}" target="_blank" rel="noreferrer"><img src="${p.photo}" alt="Foto de ${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${crest(code)}';this.classList.add('club-photo-fallback')"><span><small>0${i+1}</small><b>${p.name}</b></span><em>${p.value}</em></a>`).join('');
function openClub(code,expanded=false){
  const c=clubs.find(x=>x.code===code),x=extras[code],market=marketData[code],identity=clubIdentities[code],pct=((c.pts/(c.j*3))*100).toFixed(1).replace('.',',');
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
  const clubMoment=identity?.moment?`<figure class="club-moment${identity.moment.image?'':' club-moment--graphic'}">${identity.moment.image?`<img src="${identity.moment.image}" alt="${identity.moment.alt||''}" loading="lazy">`:`<div class="club-moment__graphic" aria-hidden="true"><img src="${crest(c.code)}" alt=""><b>${identity.moment.year}</b></div>`}<figcaption><small>${identity.moment.eyebrow}</small><h4>${identity.moment.title}</h4><p>${identity.moment.text}</p>${identity.moment.source?`<a href="${identity.moment.source}" target="_blank" rel="noreferrer">${identity.moment.credit} ↗</a>`:''}</figcaption></figure>`:'';
  content.innerHTML=`${symbolField}<div class="detail-top"><img class="crest" src="${crest(c.code)}" alt="Escudo do ${c.name}"><div><small>SÉRIE ${division} · ${String(c.pos).padStart(2,'0')}º NA CLASSIFICAÇÃO</small><h3>${c.name}</h3>${identity?`<p class="club-tagline">${identity.tagline}</p>${identity.intro?`<button class="replay-celebration" type="button" data-replay-intro="${code}" aria-label="Rever comemoração do ${c.name}">↻ Rever comemoração</button>`:''}`:''}</div></div>
  <div class="detail-stats"><div class="detail-stat"><span>VITÓRIAS</span><strong>${c.v}</strong></div><div class="detail-stat"><span>GOLS PRÓ</span><strong>${c.gp}</strong></div><div class="detail-stat"><span>GOLS CONTRA</span><strong>${c.gc}</strong></div></div>
  ${clubMoment}
  <div class="market-total"><span>VALOR DE MERCADO DO ELENCO</span><strong>${market?.total||'N/D'}</strong><a href="${market?.kader||'#'}" target="_blank" rel="noreferrer">VER NO TRANSFERMARKT ↗</a></div>
  <div class="detail-section"><h4>APROVEITAMENTO</h4><div class="percent">${pct}%</div></div>
  <div class="detail-section"><h4>FORMA · ÚLTIMOS 5</h4><div class="form large">${dots(c.form)}</div></div>${scorers}
  <div class="detail-section"><h4>TOP 3 MAIS VALIOSOS DO ELENCO</h4>${valuables}</div>
  ${expanded?`<div class="detail-section"><h4>ÚLTIMOS CINCO JOGOS</h4><div class="match-list">${games.map(g=>`<div class="match"><span class="result ${g.r}">${g.r}</span><b>${g.score}</b><span>${g.opp}</span></div>`).join('')}</div></div>${assists}`:`<button class="expand-hint" data-expand="${code}">Clique para ver jogos, mercado e notícias →</button>`}
  <div class="next-game"><small>PRÓXIMO JOGO APÓS O RECORTE</small><div class="fixture"><strong>${c.next}</strong><span class="venue">${c.venue} · ${c.venue==='C'?'CASA':'FORA'}</span></div><div class="next-date">${c.date}</div></div>
  <div class="detail-section news-section"><h4>NOTÍCIAS E PRÉVIA</h4><a class="news-link featured" href="${previewUrl}" target="_blank" rel="noreferrer"><small>PRÉVIA DO PRÓXIMO JOGO</small><b>${c.name} × ${c.next}</b><span>ABRIR BUSCA NO GE ↗</span></a><a class="news-link" href="${newsUrl}" target="_blank" rel="noreferrer"><small>ÚLTIMAS NOTÍCIAS</small><b>Noticiário de ${c.name}</b><span>VER MATÉRIAS ↗</span></a></div>`;
  sheet.classList.add('open');sheet.setAttribute('aria-hidden','false');playClubIntro(code);if(expanded){backdrop.classList.add('open');document.body.style.overflow='hidden';document.querySelector('#closeSheet').focus()}else{backdrop.classList.remove('open');document.body.style.overflow=''}
}
function close(){finishClubIntro();sheet.classList.remove('open');sheet.classList.remove('expanded');sheet.setAttribute('aria-hidden','true');backdrop.classList.remove('open');document.body.style.overflow='';if(lastTrigger?.isConnected)lastTrigger.focus();}
document.addEventListener('click',e=>{const el=e.target.closest('[data-code],[data-expand]');if(el){lastTrigger=el;openClub(el.dataset.code||el.dataset.expand,true)}});
document.addEventListener('click',e=>{const replay=e.target.closest('[data-replay-intro]');if(replay){sheet.scrollTop=0;playClubIntro(replay.dataset.replayIntro)}});
clubIntro.addEventListener('click',finishClubIntro);
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-code]')){lastTrigger=e.target;openClub(e.target.dataset.code,true)}if(e.key==='Tab'&&pinned&&sheet.classList.contains('open')){const focusable=[...sheet.querySelectorAll('button,a[href],[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}if(e.key==='Escape'){if(!clubIntro.hidden){finishClubIntro();return}pinned=false;close()}});
document.querySelector('#closeSheet').addEventListener('click',()=>{pinned=false;close()});backdrop.addEventListener('click',()=>{pinned=false;close()});document.querySelector('#aboutBtn').addEventListener('click',()=>document.querySelector('.method').scrollIntoView({behavior:'smooth'}));
function setDivision(next){division=next;clubs=division==='A'?clubsA:clubsB;close();document.querySelectorAll('[data-series]').forEach(b=>b.classList.toggle('active',b.dataset.series===division));document.querySelector('#heroSeries').textContent=`CAMPEONATO BRASILEIRO · SÉRIE ${division}`;document.querySelector('#roundLabel').textContent=division==='A'?'31 / 38':'ATÉ 17 OUT';document.querySelector('#heroDescription').innerHTML=division==='A'?'Classificação final da <strong>31ª rodada</strong>.':'Classificação da <strong>Série B até 17 de outubro</strong>, calculada partida a partida no mesmo recorte.';document.querySelector('#methodPrimary').innerHTML=division==='A'?'Esta é uma fotografia do campeonato <strong>ao apito final da rodada 31</strong>.':'A Série B considera <strong>todas as partidas concluídas até 17 de outubro</strong>; por isso alguns clubes têm número diferente de jogos.';document.querySelector('#methodSecondary').innerHTML=division==='A'?'Partidas, classificação e estatísticas da Série A consideram os jogos concluídos até 19 de outubro. Os “próximos jogos” exibem o primeiro compromisso agendado após esse momento.':'Partidas, classificação e estatísticas da Série B permanecem no recorte anterior de 17 de outubro.';document.querySelector('.legend').innerHTML=division==='A'?'<span><i class="key title"></i> Libertadores</span><span><i class="key pre"></i> Pré-Libertadores</span><span><i class="key sula"></i> Sul-Americana</span><span><i class="key drop"></i> Rebaixamento</span>':'<span><i class="key title"></i> Acesso direto</span><span><i class="key pre"></i> Playoffs de acesso</span><span><i class="key drop"></i> Rebaixamento</span>';document.querySelector('.stamp').innerHTML=division==='A'?'ATUALIZADO EM 20.10.2026<br>CLASSIFICAÇÃO: RODADA 31':'ATUALIZADO EM 17.10.2026<br>CLASSIFICAÇÃO: SÉRIE B';renderTable();localStorage.setItem('br26-series',division)}
document.querySelectorAll('[data-series]').forEach(b=>b.addEventListener('click',()=>setDivision(b.dataset.series)));
setDivision(localStorage.getItem('br26-series')==='B'?'B':'A');
const themeBtn=document.querySelector('#themeBtn');
function setTheme(dark){document.body.classList.toggle('dark',dark);themeBtn.setAttribute('aria-pressed',String(dark));themeBtn.querySelector('.theme-label').textContent=dark?'Modo claro':'Modo escuro';themeBtn.querySelector('.theme-icon').textContent=dark?'☀':'◐';localStorage.setItem('br26-theme',dark?'dark':'light')}
setTheme(localStorage.getItem('br26-theme')==='dark'||(!localStorage.getItem('br26-theme')&&matchMedia('(prefers-color-scheme:dark)').matches));
themeBtn.addEventListener('click',()=>setTheme(!document.body.classList.contains('dark')));

const backToTop=document.querySelector('#backToTop');
let scrollTicking=false;
function syncBackToTop(){
  const visible=window.scrollY>Math.min(480,window.innerHeight*.6);
  backToTop.classList.toggle('is-visible',visible);
  backToTop.setAttribute('aria-hidden',String(!visible));
  backToTop.tabIndex=visible?0:-1;
  scrollTicking=false;
}
window.addEventListener('scroll',()=>{if(!scrollTicking){scrollTicking=true;requestAnimationFrame(syncBackToTop)}},{passive:true});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
syncBackToTop();

// Modo determinístico usado apenas para a captura de auditoria solicitada.
if(new URLSearchParams(location.search).get('capture')==='round31'){
  document.body.classList.add('capture-mode');
  setDivision('A');
  document.querySelector('main').insertBefore(sheet,document.querySelector('.method'));
  openClub('FLA',true);
  document.body.style.overflow='auto';
}

// A memória do campeonato é independente da divisão exibida na tabela.
const historyToggle=document.querySelector('#historyToggle');
const historyContent=document.querySelector('#historyContent');
historyToggle.addEventListener('click',()=>{
  const expanded=historyToggle.getAttribute('aria-expanded')!=='true';
  historyToggle.setAttribute('aria-expanded',String(expanded));
  historyContent.hidden=!expanded;
  historyToggle.querySelector('span').textContent=expanded?'Recolher a história':'Explorar a história';
  historyToggle.querySelector('.history-toggle-icon').textContent=expanded?'−':'+';
});

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
const heroMedia=document.querySelector('#heroMedia');
const heroPhotoLabel=document.querySelector('#heroPhotoLabel');
const heroPhotoPause=document.querySelector('#pauseHeroPhotos');
let heroPhotoIndex=0,heroPhotoTimer,heroPhotosPaused=reducedMotion.matches;

heroMedia.innerHTML=heroMoments.map((moment,index)=>`<div class="hero-slide${index===0?' active':''}" data-title="${moment.title}"><img src="${moment.src}" alt="" ${index===0?'fetchpriority="high"':'loading="lazy"'} style="--hero-focus:${moment.focus};object-fit:${moment.fit||'cover'}"></div>`).join('');
const heroSlides=[...heroMedia.querySelectorAll('.hero-slide')];

function showHeroPhoto(index){
  for(let checked=0;checked<heroSlides.length;checked++,index++){
    const next=(index+heroSlides.length)%heroSlides.length;
    const image=heroSlides[next].querySelector('img');
    if(!heroSlides[next].classList.contains('failed')&&image.complete&&image.naturalWidth){
      heroSlides[heroPhotoIndex].classList.remove('active');
      heroPhotoIndex=next;
      heroSlides[heroPhotoIndex].classList.add('active');
      heroPhotoLabel.textContent=heroMoments[heroPhotoIndex].title;
      return;
    }
  }
}
function scheduleHeroPhotos(){
  clearInterval(heroPhotoTimer);
  heroPhotoPause.textContent=heroPhotosPaused?'Retomar':'Pausar';
  heroPhotoPause.setAttribute('aria-pressed',String(heroPhotosPaused));
  if(!heroPhotosPaused&&!document.hidden)heroPhotoTimer=setInterval(()=>showHeroPhoto(heroPhotoIndex+1),6000);
}
heroSlides.forEach(slide=>{
  const image=slide.querySelector('img');
  const markFailed=()=>{
    slide.classList.add('failed');
    if(slide===heroSlides[heroPhotoIndex])showHeroPhoto(heroPhotoIndex+1);
  };
  image.addEventListener('error',markFailed);
  if(image.complete&&!image.naturalWidth)markFailed();
});
document.querySelector('#nextHeroPhoto').addEventListener('click',()=>{showHeroPhoto(heroPhotoIndex+1);scheduleHeroPhotos()});
document.querySelector('#previousHeroPhoto').addEventListener('click',()=>{showHeroPhoto(heroPhotoIndex-1);scheduleHeroPhotos()});
heroPhotoPause.addEventListener('click',()=>{heroPhotosPaused=!heroPhotosPaused;scheduleHeroPhotos()});
reducedMotion.addEventListener('change',event=>{heroPhotosPaused=event.matches;scheduleHeroPhotos()});
document.addEventListener('visibilitychange',scheduleHeroPhotos);
const firstHeroImage=heroSlides[0].querySelector('img');
if(firstHeroImage.complete)scheduleHeroPhotos();
else firstHeroImage.addEventListener('load',scheduleHeroPhotos,{once:true});
