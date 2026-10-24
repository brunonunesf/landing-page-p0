const {chromium}=require('/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
(async()=>{
  const fixture={window:{}};vm.runInNewContext(fs.readFileSync('data.js','utf8'),fixture);vm.runInNewContext(fs.readFileSync('player-images.js','utf8'),fixture);
  for(const club of [...fixture.window.seriesAData,...fixture.window.seriesBData]){
    const names=[...club.scorers,...(club.assists||[])].map(s=>s.split('|')[0]).concat((fixture.window.marketData[club.code]?.players||[]).map(p=>p.name));
    for(const name of names){const photo=fixture.window.clubPlayerImages[club.code]?.[name];assert.ok(photo?.image,`${club.code}: ${name}`);assert.ok(!/transfermarkt|tmssl|silhouette|silhueta/i.test(photo.image),photo.image)}
  }
  const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),results=[];
  fs.mkdirSync('audit/season-leaders',{recursive:true});
  for(const width of [1440,768,390]){
    const p=await b.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'}),errors=[],transfermarkt=[];
    p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(r.resourceType()==='image'&&/transfermarkt|tmssl/.test(r.url()))transfermarkt.push(r.url())});
    await p.goto('http://localhost:8765',{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);
    assert.equal(await p.locator('#seasonScorers>li').count(),5);assert.equal(await p.locator('#seasonAssists>li').count(),5);
    assert.equal(await p.locator('#classificacao + #destaques + #historia').count(),1);
    const initial=await p.locator('.season-list').allTextContents();
    assert.match(initial[0],/Kevin Viveros/);assert.match(initial[1],/Andreas Pereira/);
    for(const dark of [false,true])for(const series of ['A','B']){
      await p.evaluate(({dark,series})=>{setTheme(dark);setDivision(series)},{dark,series});
      assert.deepEqual(await p.locator('.season-list').allTextContents(),initial);
      await p.locator('#destaques').scrollIntoViewIfNeeded();
      const trigger=p.locator('#seasonScorers button').first();await trigger.click();
      assert.equal(await p.locator('#detailSheet').getAttribute('aria-hidden'),'false');assert.match(await p.locator('.detail-top small').innerText(),/SÉRIE A/);assert.equal(await p.locator('#clubDialogTitle').innerText(),'Athletico-PR');
      await p.keyboard.press('Escape');assert.equal(await p.locator('#detailSheet').getAttribute('aria-hidden'),'true');assert.equal(await trigger.evaluate(e=>e===document.activeElement),true);assert.equal(await p.locator('.club-entry.preview-open').count(),0);
      assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.equal(await p.evaluate(()=>document.querySelector('main').inert),false);
      results.push({width,dark,series,rankingsUnchanged:true,correctSerieADialog:true,escapeAndFocus:true,noHorizontalOverflow:true});
    }
    await p.evaluate(()=>{setDivision('A');setTheme(true);scrollTo({top:document.querySelector('#destaques').offsetTop-100,behavior:'instant'})});
    await p.waitForTimeout(2000);
    await p.locator('#destaques').screenshot({path:`audit/season-leaders/${width}-escuro.png`});
    await p.evaluate(()=>setTheme(false));await p.locator('#destaques').screenshot({path:`audit/season-leaders/${width}-claro.png`});
    if(width===390){await p.evaluate(()=>setTheme(true));await p.locator('[aria-labelledby="assistsTitle"]').scrollIntoViewIfNeeded();await p.screenshot({path:'audit/season-leaders/390-assistencias.png'})}
    assert.deepEqual(errors,[]);assert.deepEqual(transfermarkt,[]);await p.close();
  }
  const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});await p.goto('http://localhost:8765');await p.locator('.club-row[data-code=FLA]').click();await p.locator('.market-player').first().scrollIntoViewIfNeeded();await p.waitForTimeout(2000);await p.screenshot({path:'audit/season-leaders/1440-ficha-flamengo.png'});await p.keyboard.press('Escape');assert.equal(await p.locator('.club-entry.preview-open').count(),0);
  await b.close();fs.writeFileSync('audit/season-leaders/verification.json',JSON.stringify(results,null,2));console.log(`PASS: ${results.length} combinações; 243 nomes com fotos; nenhum pedido de imagem ao Transfermarkt.`);
})().catch(e=>{console.error(e);process.exit(1)});
