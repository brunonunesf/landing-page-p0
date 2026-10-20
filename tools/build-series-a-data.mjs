import fs from 'node:fs/promises';

const cutoff = new Date('2026-10-20T02:59:59Z');
const teams = JSON.parse(await fs.readFile('/tmp/espn-a-2026.json','utf8')).sports[0].leagues[0].teams.map(x=>x.team).filter(t=>t.logos?.[0]);
const games = JSON.parse(await fs.readFile('/tmp/agames-2026.json','utf8')).events;
const codeMap={"Athletico-PR":"CAP","Atlético-MG":"CAM","Bahia":"BAH","Botafogo":"BOT","Chapecoense":"CHA","Corinthians":"COR","Coritiba":"CFC","Cruzeiro":"CRU","Flamengo":"FLA","Fluminense":"FLU","Grêmio":"GRE","Internacional":"INT","Mirassol":"MIR","Palmeiras":"PAL","Red Bull Bragantino":"RBB","Remo":"REM","Santos":"SAN","São Paulo":"SAO","Vasco da Gama":"VAS","Vitória":"VIT"};
const records=Object.fromEntries(teams.map(t=>[t.displayName,{code:codeMap[t.displayName],name:t.displayName==='Red Bull Bragantino'?'Bragantino':t.displayName==='Vasco da Gama'?'Vasco':t.displayName,pts:0,j:0,v:0,e:0,d:0,gp:0,gc:0,recent:[],next:null}]));
const idToName=Object.fromEntries(teams.map(t=>[t.id,t.displayName]));
const scorerCounts={},playerIds={};
let assistsByClub={};try{assistsByClub=JSON.parse(await fs.readFile('assists-a.generated.json','utf8'));}catch{}
for(const event of [...games].sort((a,b)=>new Date(a.date)-new Date(b.date))){
  const pair=event.competitions?.[0]?.competitors;if(!pair?.length)continue;const home=pair.find(x=>x.homeAway==='home'),away=pair.find(x=>x.homeAway==='away');
  if(!records[home.team.displayName]||!records[away.team.displayName])continue;const date=new Date(event.date);
  if(event.status.type.completed&&date<=cutoff){
    const hg=Number(home.score),ag=Number(away.score),hr=hg>ag?'V':hg<ag?'D':'E',ar=hg<ag?'V':hg>ag?'D':'E';
    for(const [side,opp,gf,ga,res] of [[home,away,hg,ag,hr],[away,home,ag,hg,ar]]){const r=records[side.team.displayName];r.j++;r.gp+=gf;r.gc+=ga;r[res==='V'?'v':res==='E'?'e':'d']++;r.pts+=res==='V'?3:res==='E'?1:0;r.recent.push({result:res,opp:records[opp.team.displayName].name,score:`${gf}–${ga}`,date:event.date});}
    for(const play of event.competitions[0].details||[]){if(!play.scoringPlay||play.ownGoal)continue;const athlete=play.athletesInvolved?.[0],club=idToName[play.team?.id];if(!athlete||!club)continue;scorerCounts[club]??={};scorerCounts[club][athlete.displayName]=(scorerCounts[club][athlete.displayName]||0)+1;playerIds[athlete.displayName]=athlete.id;}
  }else if(date>cutoff){for(const [side,opp] of [[home,away],[away,home]]){const r=records[side.team.displayName];if(!r.next)r.next={opp:records[opp.team.displayName].name,venue:side.homeAway==='home'?'C':'F',date:event.date};}}
}
const sorted=Object.entries(records).map(([sourceName,r])=>({...r,recent:r.recent.slice(-5),scorers:Object.entries(scorerCounts[sourceName]||{}).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'pt-BR')).slice(0,3).map(([name,goals])=>({name,goals,id:playerIds[name]})),assists:assistsByClub[r.code]||[]})).sort((a,b)=>b.pts-a.pts||(b.gp-b.gc)-(a.gp-a.gc)||b.gp-a.gp||a.name.localeCompare(b.name,'pt-BR')).map((r,i)=>({...r,pos:i+1}));
await fs.writeFile('series-a.generated.json',JSON.stringify(sorted,null,2));
