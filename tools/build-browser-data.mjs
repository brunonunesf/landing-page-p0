import fs from 'node:fs/promises';
const market=JSON.parse(await fs.readFile('market.generated.json','utf8'));
const rawA=JSON.parse(await fs.readFile('series-a.generated.json','utf8'));
const raw=JSON.parse(await fs.readFile('series-b.generated.json','utf8'));
const ptDate=iso=>new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',timeZone:'America/Fortaleza'}).format(new Date(iso)).replace(',',' ·');
const seriesB=raw.map(c=>({
  code:c.code,name:c.name,pts:c.pts,j:c.j,v:c.v,e:c.e,d:c.d,gp:c.gp,gc:c.gc,
  form:c.recent.map(x=>x.result).join(''),scorers:c.scorers.map(x=>`${x.name}|${x.goals}`),next:c.next?.opp||'A definir',venue:c.next?.venue||'—',date:c.next?ptDate(c.next.date):'A definir',pos:c.pos,
  games:c.recent.map(x=>({r:x.result,opp:x.opp,score:x.score,date:ptDate(x.date)}))
}));
const seriesA=rawA.map(c=>({
  code:c.code,name:c.name,pts:c.pts,j:c.j,v:c.v,e:c.e,d:c.d,gp:c.gp,gc:c.gc,
  form:c.recent.map(x=>x.result).join(''),scorers:c.scorers.map(x=>`${x.name}|${x.goals}`),assists:c.assists.map(x=>`${x.name}|${x.assists}`),next:c.next?.opp||'A definir',venue:c.next?.venue||'—',date:c.next?ptDate(c.next.date):'A definir',pos:c.pos,
  games:c.recent.map(x=>({r:x.result,opp:x.opp,score:x.score,date:ptDate(x.date)}))
}));
const photos=Object.fromEntries(raw.flatMap(c=>c.scorers).map(x=>[x.name,`https://a.espncdn.com/i/headshots/soccer/players/full/${x.id}.png`]));
const photosA=Object.fromEntries(rawA.flatMap(c=>[...c.scorers,...c.assists]).filter(x=>x.id).map(x=>[x.name,`https://a.espncdn.com/i/headshots/soccer/players/full/${x.id}.png`]));
await fs.writeFile('data.js',`window.marketData=${JSON.stringify(market)};\nwindow.seriesAData=${JSON.stringify(seriesA)};\nwindow.seriesBData=${JSON.stringify(seriesB)};\nwindow.seriesPhotos=${JSON.stringify({...photos,...photosA})};\n`);
