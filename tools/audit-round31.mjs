import fs from 'node:fs/promises';
import vm from 'node:vm';

const cutoff = new Date('2026-10-20T02:59:59Z');
const scoreboardUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=2026&limit=1000';
const officialRound31 = [
  ['REM','RBB',1,1],['BAH','FLA',0,3],['GRE','CRU',2,4],['FLU','SAN',1,2],['SAO','VAS',1,0],
  ['CAP','PAL',0,2],['CAM','CFC',1,0],['BOT','CHA',1,0],['MIR','INT',2,0],['COR','VIT',1,1]
];
const officialRound32 = [
  ['CRU','REM'],['MIR','SAO'],['INT','BOT'],['VIT','CAP'],['VAS','COR'],
  ['PAL','RBB'],['CHA','FLU'],['SAN','BAH'],['CFC','GRE'],['FLA','CAM']
];
const codeByName = {
  'Athletico-PR':'CAP','Atlético-MG':'CAM','Bahia':'BAH','Botafogo':'BOT','Chapecoense':'CHA','Corinthians':'COR','Coritiba':'CFC','Cruzeiro':'CRU','Flamengo':'FLA','Fluminense':'FLU','Grêmio':'GRE','Internacional':'INT','Mirassol':'MIR','Palmeiras':'PAL','Red Bull Bragantino':'RBB','Remo':'REM','Santos':'SAN','São Paulo':'SAO','Vasco da Gama':'VAS','Vitória':'VIT'
};
const display = Object.fromEntries(Object.entries(codeByName).map(([name,code])=>[code,name.replace('Red Bull ','').replace(' da Gama','')]));
const resultKey = (h,a,hg,ag)=>`${h}-${a}:${hg}-${ag}`;
const pairKey = (h,a)=>`${h}-${a}`;
const eq = (a,b)=>JSON.stringify(a)===JSON.stringify(b);
const check = (name, pass, evidence)=>({name,pass,evidence});

const [scoreboard,generated,assistFile,dataSource] = await Promise.all([
  fetch(scoreboardUrl).then(r=>{if(!r.ok)throw new Error(`ESPN ${r.status}`);return r.json()}),
  fs.readFile('series-a.generated.json','utf8').then(JSON.parse),
  fs.readFile('assists-a.generated.json','utf8').then(JSON.parse),
  fs.readFile('data.js','utf8')
]);
const context={window:{}};vm.createContext(context);vm.runInContext(dataSource,context);
const browserData=context.window.seriesAData;
const events=scoreboard.events;
const completed=events.filter(e=>e.status.type.completed&&new Date(e.date)<=cutoff).sort((a,b)=>new Date(a.date)-new Date(b.date));
const records=Object.fromEntries(Object.values(codeByName).map(code=>[code,{pts:0,j:0,v:0,e:0,d:0,gp:0,gc:0,recent:[]}]))
const scorers=Object.fromEntries(Object.values(codeByName).map(code=>[code,{}]));

for(const event of completed){
  const competitors=event.competitions?.[0]?.competitors||[];
  const home=competitors.find(c=>c.homeAway==='home'),away=competitors.find(c=>c.homeAway==='away');
  if(!home||!away)continue;
  const hc=codeByName[home.team.displayName],ac=codeByName[away.team.displayName];
  if(!hc||!ac)continue;
  const hg=Number(home.score),ag=Number(away.score);
  for(const [code,opp,gf,ga] of [[hc,ac,hg,ag],[ac,hc,ag,hg]]){
    const r=records[code],res=gf>ga?'V':gf<ga?'D':'E';
    r.j++;r.gp+=gf;r.gc+=ga;r[res==='V'?'v':res==='E'?'e':'d']++;r.pts+=res==='V'?3:res==='E'?1:0;
    r.recent.push({result:res,opp:display[opp],score:`${gf}–${ga}`});
  }
  for(const play of event.competitions[0].details||[]){
    if(!play.scoringPlay||play.ownGoal)continue;
    const athlete=play.athletesInvolved?.[0],code=Object.entries(codeByName).find(([name])=>name===play.team?.displayName)?.[1]||Object.entries(codeByName).find(([,candidate])=>candidate&&event.competitions[0].competitors.some(c=>c.team.id===play.team?.id&&codeByName[c.team.displayName]===candidate))?.[1];
    if(athlete&&code)scorers[code][athlete.displayName]=(scorers[code][athlete.displayName]||0)+1;
  }
}
const rank=Object.entries(records).map(([code,r])=>({code,...r,recent:r.recent.slice(-5)})).sort((a,b)=>b.pts-a.pts||(b.gp-b.gc)-(a.gp-a.gc)||b.gp-a.gp||display[a.code].localeCompare(display[b.code],'pt-BR')).map((r,i)=>({...r,pos:i+1}));
const topScorers=Object.fromEntries(Object.entries(scorers).map(([code,players])=>[code,Object.entries(players).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'pt-BR')).slice(0,3).map(([name,goals])=>`${name}|${goals}`)]));
const siteByCode=Object.fromEntries(browserData.map(c=>[c.code,c]));
const generatedByCode=Object.fromEntries(generated.map(c=>[c.code,c]));

const round31Events=completed.filter(e=>{
  const c=e.competitions?.[0]?.competitors||[],h=c.find(x=>x.homeAway==='home'),a=c.find(x=>x.homeAway==='away');
  return officialRound31.some(([hc,ac])=>codeByName[h?.team.displayName]===hc&&codeByName[a?.team.displayName]===ac);
});
const actual31=round31Events.map(e=>{const c=e.competitions[0].competitors,h=c.find(x=>x.homeAway==='home'),a=c.find(x=>x.homeAway==='away');return [codeByName[h.team.displayName],codeByName[a.team.displayName],Number(h.score),Number(a.score)]});
const expected31Set=new Set(officialRound31.map(x=>resultKey(...x))),actual31Set=new Set(actual31.map(x=>resultKey(...x)));
const resultChecks=officialRound31.map(x=>check(`${display[x[0]]} ${x[2]}–${x[3]} ${display[x[1]]}`,actual31Set.has(resultKey(...x)),actual31Set.has(resultKey(...x))?'placar confirmado':'placar divergente ou ausente'));

const tableFields=['pos','pts','j','v','e','d','gp','gc'];
const tableRows=rank.map(fresh=>{const site=siteByCode[fresh.code];const differences=tableFields.filter(k=>fresh[k]!==site[k]);return {code:fresh.code,pass:!differences.length,fresh,site,differences}});
const scorerRows=Object.keys(siteByCode).map(code=>({code,expected:topScorers[code],site:siteByCode[code].scorers,pass:eq(topScorers[code],siteByCode[code].scorers)}));
const assistRows=Object.keys(siteByCode).map(code=>({code,expected:(assistFile[code]||[]).map(x=>`${x.name}|${x.assists}`),site:siteByCode[code].assists||[],pass:eq((assistFile[code]||[]).map(x=>`${x.name}|${x.assists}`),siteByCode[code].assists||[])}));
const lastRows=officialRound31.flatMap(([h,a,hg,ag])=>[[h,a,`${hg}–${ag}`],[a,h,`${ag}–${hg}`]]).map(([code,opp,score])=>{const last=generatedByCode[code].recent.at(-1);return {code,expected:`${display[opp]} ${score}`,site:`${last.opp} ${last.score}`,pass:last.opp===display[opp]&&last.score===score}});
const nextRows=officialRound32.flatMap(([h,a])=>[[h,a,'C'],[a,h,'F']]).map(([code,opp,venue])=>{const next=generatedByCode[code].next;return {code,expected:`${display[opp]} · ${venue}`,site:`${next.opp} · ${next.venue}`,pass:next.opp===display[opp]&&next.venue===venue}});
const globalAssistExpected=['Andreas Pereira|10','Josué|10','Jorge Carrascal|8','Samuel Lino|8'];
const globalAssists=Object.values(assistFile).flat().map(x=>`${x.name}|${x.assists}`);
const globalAssistPass=globalAssistExpected.every(x=>globalAssists.includes(x));

const checks=[
  check('Dez resultados oficiais da rodada 31',resultChecks.every(x=>x.pass)&&actual31Set.size===10,`${actual31Set.size}/10 placares encontrados`),
  check('Classificação e estatísticas coletivas',tableRows.every(x=>x.pass),`${tableRows.filter(x=>x.pass).length}/20 clubes sem divergência`),
  check('Top 3 artilheiros por clube',scorerRows.every(x=>x.pass),`${scorerRows.filter(x=>x.pass).length}/20 clubes sem divergência`),
  check('Top 3 assistentes por clube',assistRows.every(x=>x.pass),`${assistRows.filter(x=>x.pass).length}/20 clubes sincronizados com 309 súmulas`),
  check('Líderes globais de assistências',globalAssistPass,globalAssistExpected.join(', ')),
  check('Último confronto de cada clube',lastRows.every(x=>x.pass),`${lastRows.filter(x=>x.pass).length}/20 clubes corretos`),
  check('Próximo confronto da rodada 32',nextRows.every(x=>x.pass),`${nextRows.filter(x=>x.pass).length}/20 clubes corretos`)
];
const pass=checks.every(x=>x.pass);
const json={generatedAt:new Date().toISOString(),cutoff:cutoff.toISOString(),sources:{results:'CBF — encerramento da 31ª rodada',fixtures:'ge — tabela das rodadas 31 e 32',matchData:'ESPN scoreboard e súmulas',assistsCrossCheck:'Wikipedia — líderes de assistências'},processedMatches:completed.length,pass,checks,resultChecks,tableRows,scorerRows,assistRows,lastRows,nextRows};
await fs.mkdir('audit',{recursive:true});
await fs.writeFile('audit/round31-audit.json',JSON.stringify(json,null,2));
const mark=v=>v?'✅':'❌';
const md=[
  '# Auditoria — Brasileirão Série A 2026, rodada 31','',
  `Gerada em ${new Date().toISOString()}. Recorte: partidas concluídas até ${cutoff.toISOString()}.`, '',
  '## Critérios e resultado','',
  '| Critério | Estado | Evidência |','|---|---:|---|',...checks.map(x=>`| ${x.name} | ${mark(x.pass)} | ${x.evidence} |`),'',
  '## Os dez resultados','', '| Jogo | Estado | Evidência |','|---|---:|---|',...resultChecks.map(x=>`| ${x.name} | ${mark(x.pass)} | ${x.evidence} |`),'',
  '## Classificação recalculada','', '| Pos. | Clube | P | J | V | E | D | GP | GC | SG | Estado |','|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|',...tableRows.map(x=>`| ${x.fresh.pos} | ${display[x.code]} | ${x.fresh.pts} | ${x.fresh.j} | ${x.fresh.v} | ${x.fresh.e} | ${x.fresh.d} | ${x.fresh.gp} | ${x.fresh.gc} | ${x.fresh.gp-x.fresh.gc} | ${mark(x.pass)} |`),'',
  '## Top 3 por clube','', '| Clube | Artilheiros | Assistências | Estado |','|---|---|---|---:|',...scorerRows.map(s=>{const a=assistRows.find(x=>x.code===s.code);return `| ${display[s.code]} | ${s.site.join(', ')} | ${a.site.join(', ')} | ${mark(s.pass&&a.pass)} |`}),'',
  '## Último e próximo confronto','', '| Clube | Último jogo | Próximo jogo | Estado |','|---|---|---|---:|',...lastRows.map(l=>{const n=nextRows.find(x=>x.code===l.code);return `| ${display[l.code]} | ${l.site} | ${n.site} | ${mark(l.pass&&n.pass)} |`}),'',
  `**Resultado geral: ${pass?'APROVADO':'REPROVADO'}**`
].join('\n');
await fs.writeFile('audit/round31-audit.md',md);
console.log(`${pass?'APROVADO':'REPROVADO'} — ${completed.length} jogos processados; relatório em audit/round31-audit.md`);
if(!pass)process.exitCode=1;
