import fs from 'node:fs/promises';

const cutoff=new Date('2026-10-20T02:59:59Z');
const scoreboardUrl='https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=2026&limit=1000';
const teamsUrl='https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams?limit=100';
const [scoreboard,teamsPayload]=await Promise.all([fetch(scoreboardUrl).then(r=>r.json()),fetch(teamsUrl).then(r=>r.json())]);
const teams=teamsPayload.sports[0].leagues[0].teams.map(x=>x.team).filter(t=>t.logos?.[0]);
const codeById=Object.fromEntries(teams.map(t=>[t.id,t.abbreviation==='BRA'?'RBB':t.abbreviation==='REMO'?'REM':t.abbreviation]));
const completed=scoreboard.events.filter(e=>e.status.type.completed&&new Date(e.date)<=cutoff);
const counts=Object.fromEntries(Object.values(codeById).map(code=>[code,{}]));
const playerIds={};
const normalizeTeam=name=>name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace('red bull','rb').replace('-pr',' paranaense').replace('-mg',' mineiro').replace(' da gama','').replace(/[^a-z]/g,'');

async function fetchSummary(event){
  const url=`https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/summary?event=${event.id}`;
  for(let attempt=0;attempt<3;attempt++){
    const response=await fetch(url);if(response.ok)return response.json();
  }
  throw new Error(`Não foi possível carregar a súmula ${event.id}`);
}

for(let offset=0;offset<completed.length;offset+=12){
  const batch=completed.slice(offset,offset+12);
  const summaries=await Promise.all(batch.map(fetchSummary));
  for(let i=0;i<batch.length;i++){
    const event=batch[i],summary=summaries[i];
    const teamCodeByName=Object.fromEntries(event.competitions[0].competitors.map(c=>[normalizeTeam(c.team.displayName),codeById[c.team.id]]));
    for(const item of summary.commentary||[]){
      const text=item.text||'';if(!text.startsWith('Goal!')||!text.includes('Assisted by'))continue;
      const teamMatch=text.match(/\(([^)]+)\)[^.]*\. Assisted by /);const assistMatch=text.match(/Assisted by (.+?)(?: with | following |\.$)/);
      if(!teamMatch||!assistMatch)continue;const code=teamCodeByName[normalizeTeam(teamMatch[1])];if(!code)continue;
      const name=assistMatch[1].trim();counts[code][name]=(counts[code][name]||0)+1;
      const athlete=(summary.rosters||[]).flatMap(r=>r.roster||[]).map(x=>x.athlete).find(a=>a?.displayName===name);if(athlete?.id)playerIds[name]=athlete.id;
    }
  }
  process.stdout.write(`Súmulas processadas: ${Math.min(offset+batch.length,completed.length)}/${completed.length}\r`);
}
process.stdout.write('\n');
const output=Object.fromEntries(Object.entries(counts).map(([code,players])=>[code,Object.entries(players).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'pt-BR')).slice(0,3).map(([name,assists])=>({name,assists,id:playerIds[name]||null}))]));
await fs.writeFile('assists-a.generated.json',JSON.stringify(output,null,2));
