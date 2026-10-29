/* Regressão da camada de movimento. Dados e relatórios são somente lidos. */
const {chromium,firefox,webkit}=require('/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const output='audit/movimento';fs.mkdirSync(output,{recursive:true});
(async()=>{
 const results=[],errors=[],browserResults=[];
 const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 for(const width of [390,768,1440])for(const reduced of [false,true]){
  const page=await b.newPage({viewport:{width,height:1000},reducedMotion:reduced?'reduce':'no-preference'});
  page.on('pageerror',error=>errors.push({width,reduced,message:error.message}));
  await page.addInitScript(()=>{window.layoutShifts=[];new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.layoutShifts.push(e.value)})).observe({type:'layout-shift',buffered:true});});
  await page.goto('http://localhost:8765');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
  assert.equal(await page.locator('.history-preview article').count(),5);
  for(const dark of [false,true])for(const series of ['A','B']){
   await page.evaluate(({dark,series})=>{setTheme(dark);setDivision(series);scrollTo({top:0,behavior:'instant'})},{dark,series});await page.waitForTimeout(160);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow ${width}`);
   assert.equal(await page.locator(`[data-series=${series}]`).getAttribute('aria-checked'),'true');
   assert.equal(await page.locator('.ticker-track ul').count(),2);
   const data=await page.evaluate(()=>clubs.map(c=>({code:c.code,pts:String(c.pts)})));
   const visible=width<=850?'#mobileCards':'#tableBody';
   await page.locator('#classificacao').scrollIntoViewIfNeeded();await page.waitForTimeout(1450);
   for(const c of data){const row=page.locator(`${visible} [data-club-code="${c.code}"]`);const points=visible==='#mobileCards'?row.locator('.points strong'):row.locator('.pts');assert.equal(await points.innerText(),c.pts);}
   const trigger=page.locator(`${visible} .club-details-button`).first();await trigger.click();await page.waitForTimeout(450);
   assert.equal(await page.locator('#detailSheet').getAttribute('aria-hidden'),'false');assert.equal(await page.evaluate(()=>document.querySelector('main').inert),true);
   await page.keyboard.press('Escape');await page.waitForTimeout(360);
   assert.equal(await page.locator('#detailSheet').getAttribute('aria-hidden'),'true');assert.equal(await page.evaluate(()=>document.querySelector('main').inert),false);assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(150);
   if(reduced)await page.screenshot({path:`${output}/${width}-${series}-${dark?'escuro':'claro'}.png`});
   results.push({width,reduced,dark,series,overflow:false,counts:true,panelFocus:true});
  }
  await page.locator('#historia').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);if(reduced)await page.screenshot({path:`${output}/historia-${width}.png`});
  await page.locator('#historyToggle').click();await page.locator('.history-timeline').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
  assert.equal(await page.locator('.timeline-year').textContent().then(Boolean),true);
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0);
  if(!reduced)results.push({width,cls:await page.evaluate(()=>window.layoutShifts.reduce((a,b)=>a+b,0))});
  fs.writeFileSync(`${output}/verification.json`,JSON.stringify({results,errors,browserResults},null,2));console.log(`OK ${width}px, movimento ${reduced?"reduzido":"normal"}`);await page.close();
 }
 // Pausa, aba fora do hero, alterações de preferência e teclado do seletor.
 const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errors.push({message:e.message}));await p.goto('http://localhost:8765');await p.waitForTimeout(900);
 await p.locator('#pauseHeroPhotos').click();await p.evaluate(()=>heroProgressAnimation?.ready);const t=await p.evaluate(()=>heroProgressAnimation?.currentTime);await p.waitForTimeout(180);assert.equal(await p.evaluate(()=>heroProgressAnimation?.currentTime),t);
 await p.locator('#pauseHeroPhotos').click();await p.locator('#classificacao').scrollIntoViewIfNeeded();await p.waitForTimeout(120);assert.equal(await p.evaluate(()=>heroProgressAnimation?.playState),'paused');
 await p.locator('[data-series=A]').focus();await p.keyboard.press('ArrowRight');assert.equal(await p.locator('[data-series=B]').getAttribute('aria-checked'),'true');assert.equal(await p.locator('[data-series=B]').evaluate(el=>el===document.activeElement),true);
 const first=p.locator('#tableBody .club-details-button').first();await first.click();await p.keyboard.press('Escape');await p.evaluate(()=>openClub(clubs[1].code,true));await p.waitForTimeout(400);assert.equal(await p.locator('#detailSheet').getAttribute('aria-hidden'),'false');await p.keyboard.press('Escape');await p.waitForTimeout(350);
 await p.evaluate(()=>{document.body.style.zoom='2';scrollTo({top:0,behavior:'instant'})});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.evaluate(()=>document.body.style.zoom='');
 await p.locator('#themeBtn').click();await p.waitForTimeout(800);assert.equal(await p.locator('#themeBtn').getAttribute('aria-pressed'),'true');
 await p.close();
 // HTML estático mantém classificação, artilheiros e história sem JavaScript.
 for(const width of [390,1440]){const nojs=await b.newPage({viewport:{width,height:1000},javaScriptEnabled:false});await nojs.goto('http://localhost:8765');assert.equal(await nojs.locator('#tableBody .club-entry').count(),20);assert.equal(await nojs.locator('#seasonScorers li').count(),5);assert.equal(await nojs.locator('#historyContent').isVisible(),true);assert.equal(await nojs.locator('#heroTitle').isVisible(),true);await nojs.screenshot({path:`${output}/sem-js-${width}.png`});await nojs.close();}
 // Falha da camada opcional não oculta a página.
 const failure=await b.newPage();await failure.route('**/motion.js*',route=>route.fulfill({body:'throw new Error("falha simulada")'}));await failure.goto('http://localhost:8765');assert.equal(await failure.locator('#heroTitle').isVisible(),true);assert.equal(await failure.locator('.history-preview article').first().evaluate(el=>getComputedStyle(el).opacity),'1');await failure.close();
 const storage=await b.newPage();await storage.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('armazenamento bloqueado')}})});await storage.goto('http://localhost:8765');assert.equal(await storage.locator('#tableBody .club-entry').count(),20);await storage.close();
 const images=await b.newPage({reducedMotion:'reduce'});await images.route('**/assets/motion/hero/**',route=>route.abort());await images.route('**/assets/historia/dinamite.jpg',route=>route.abort());await images.goto('http://localhost:8765');await images.locator('.preview-legend').scrollIntoViewIfNeeded();await images.waitForFunction(()=>{const img=document.querySelector('.preview-legend img');return img.complete&&img.naturalWidth>0});assert.equal(await images.locator('.preview-legend img').evaluate(el=>el.complete&&el.naturalWidth>0),true);await images.close();
 await b.close();
 for(const [name,type]of [['Firefox',firefox],['WebKit',webkit]]){
  let browser;try{browser=await type.launch();for(const width of [390,768,1440]){const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push({browser:name,message:e.message}));await page.goto('http://localhost:8765');assert.equal(await page.locator('.history-preview article').count(),5);await page.locator('[data-series=B]').click();await page.locator('#themeBtn').click();await page.waitForTimeout(150);assert.equal(await page.locator('[data-series=B]').getAttribute('aria-checked'),'true');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`${output}/${name}-${width}.png`});await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#historyToggle').click();await page.locator('.history-timeline').scrollIntoViewIfNeeded();await page.waitForTimeout(450);await page.close();}browserResults.push({browser:name,passed:true});}catch(e){browserResults.push({browser:name,passed:false,error:e.message});}finally{await browser?.close();}
 }
 fs.writeFileSync(`${output}/verification.json`,JSON.stringify({results,errors,browserResults},null,2));assert.deepEqual(errors,[]);console.log(JSON.stringify({combinations:results.filter(r=>'series' in r).length,checks:'counts, focus, pause, no-JS, storage, errors, zoom, keyboards',browserResults},null,2));
})().catch(error=>{console.error(error);process.exit(1)});
