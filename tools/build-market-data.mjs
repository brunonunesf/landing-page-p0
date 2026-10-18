import fs from 'node:fs/promises';

const aliases={
  'SE Palmeiras':'PAL','CR Flamengo':'FLA','Cruzeiro EC':'CRU','SC Corinthians':'COR','CR Vasco da Gama':'VAS','Botafogo FR':'BOT','EC Bahia':'BAH','Fluminense FC':'FLU','Santos FC':'SAN','Atlético Mineiro':'CAM','Athletico Paranaense':'CAP','RB Bragantino':'RBB','São Paulo FC':'SAO','Grêmio FBPA':'GRE','SC Internacional':'INT','EC Vitória':'VIT','Coritiba FC':'CFC','Mirassol FC':'MIR','Clube do Remo':'REM','Chapecoense':'CHA',
  'Fortaleza EC':'FOR','Sport Recife':'SPO','Ceará SC':'CEA','Cuiabá EC':'CUI','Goiás EC':'GOI','Atlético Goianiense':'ACG','EC Juventude':'JUV','Criciúma EC':'CRI','Grêmio Novorizontino':'NOV','América Mineiro':'AMG','Vila Nova FC':'VIL','Operário FEC':'OPE','Athletic Club':'ATH','Avaí FC':'AVA','CRB':'CRB','Botafogo FC':'BSP','São Bernardo FC':'SBE','Londrina EC':'LON','Náutico':'NAU','AA Ponte Preta':'PON'
};
const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ').trim();
async function get(url){const r=await fetch(url,{headers:{'user-agent':'Mozilla/5.0'}});if(!r.ok)throw new Error(`${r.status} ${url}`);return r.text()}
const comps=[['A','https://www.transfermarkt.com.br/campeonato-brasileiro-serie-a/startseite/wettbewerb/BRA1'],['B','https://www.transfermarkt.com.br/campeonato-brasileiro-serie-b/startseite/wettbewerb/BRA2']];
const clubs=[];
for(const [division,url] of comps){
  const html=await get(url);
  for(const row of html.matchAll(/<tr class="(?:odd|even)">([\s\S]*?)(?=<tr class="(?:odd|even)">|<\/tbody>)/g)){
    const body=row[1];const m=body.match(/<td class="hauptlink no-border-links"><a title="([^"]+)" href="([^"]+)"/);if(!m||!aliases[m[1]])continue;
    const values=[...body.matchAll(/<td class="rechts"[^>]*>([\s\S]*?)<\/td>/g)].map(x=>strip(x[1]));const total=values.at(-1);
    const kader=body.match(/href="([^"]*\/kader\/verein\/[^"]+)"/);
    clubs.push({division,code:aliases[m[1]],club:m[1],total,kader:kader?`https://www.transfermarkt.com.br${kader[1]}`:null,source:url});
  }
}
async function enrich(c){
  if(!c.kader)return c; const html=await get(c.kader);const players=[];
  for(const row of html.matchAll(/<tr class="(?:odd|even)">([\s\S]*?)(?=<tr class="(?:odd|even)">|<\/tbody>)/g)){
    const body=row[1];const p=body.match(/data-src="([^"]+)" title="([^"]+)"[^>]+class="bilderrahmen-fixed/);const v=body.match(/class="rechts hauptlink"><a[^>]*>(€[^<]+)<\/a>/);if(!p||!v)continue;
    const raw=v[1].replace(/\s/g,' ');const num=parseFloat(raw.replace('€','').replace('mi.','').replace('mil','').trim());const amount=raw.includes('mi.')?num*1e6:num*1e3;
    players.push({name:p[2],value:strip(v[1]),amount,photo:p[1]});
  }
  c.players=players.sort((a,b)=>b.amount-a.amount).slice(0,3);return c;
}
for(let i=0;i<clubs.length;i+=5){const group=clubs.slice(i,i+5);await Promise.all(group.map(enrich));}
await fs.writeFile('market.generated.json',JSON.stringify(Object.fromEntries(clubs.map(c=>[c.code,c])),null,2));
