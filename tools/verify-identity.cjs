const { chromium } = require('/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const errors=[],resourceWarnings=[];
  const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'});
  const page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error'){const detail=message.text();if(detail.includes('Failed to load resource'))resourceWarnings.push(detail);else errors.push(detail)}});
  await page.goto('http://localhost:8765/',{waitUntil:'domcontentloaded'});
  await page.locator('#pauseHeroPhotos').click();
  await page.screenshot({path:'audit/identidade-desktop-light.png',fullPage:true});

  await page.locator('.club-row[data-code="FLA"]').click();
  const flamengoTheme=await page.locator('#detailSheet').getAttribute('data-club');
  const flamengoMoment=await page.locator('#detailSheet .club-moment').count();
  const introVisibleOnOpen=await page.locator('#clubIntro').isVisible();
  const introWord=(await page.locator('#clubIntro strong').innerText()).replace(/\s/g,'');
  const introSymbol=await page.locator('#clubIntro').getAttribute('data-symbol');
  await page.keyboard.press('Escape');
  const escapeSkipsOnly=await page.locator('#detailSheet').evaluate(sheet=>sheet.classList.contains('open'))&&!(await page.locator('#clubIntro').isVisible());
  const replayButton=await page.locator('[data-replay-intro="FLA"]').count();
  await page.locator('[data-replay-intro="FLA"]').click();
  await page.waitForTimeout(1900);
  await page.screenshot({path:'audit/vinheta-flamengo.png',fullPage:false});
  await page.waitForTimeout(900);
  const introFinishesAutomatically=!(await page.locator('#clubIntro').isVisible());
  await page.locator('#detailSheet').screenshot({path:'audit/painel-flamengo.png'});
  await page.locator('#closeSheet').click();

  const seriesACodes=await page.locator('#tableBody .club-row').evaluateAll(rows=>rows.map(row=>row.dataset.code));
  const identityAudit=[];
  for(const code of seriesACodes){
    await page.locator(`.club-row[data-code="${code}"]`).click();
    const name=await page.locator('#detailSheet .detail-top h3').innerText();
    const introVisible=await page.locator('#clubIntro').isVisible();
    const introName=introVisible?(await page.locator('#clubIntro strong').innerText()).replace(/\s/g,''):'';
    const expectedName=name.toUpperCase().replace(/\s/g,'');
    const identityClass=await page.locator('#detailSheet').evaluate(sheet=>sheet.classList.contains('has-club-identity'));
    const pattern=await page.locator('#detailSheet').getAttribute('data-pattern');
    const moment=await page.locator('#detailSheet .club-moment').count();
    const replay=await page.locator(`[data-replay-intro="${code}"]`).count();
    const panelOverflow=await page.locator('#detailSheet').evaluate(sheet=>sheet.scrollWidth>sheet.clientWidth);
    if(['PAL','BOT'].includes(code)){await page.waitForTimeout(1900);await page.screenshot({path:`audit/vinheta-${code.toLowerCase()}.png`,fullPage:false})}
    if(introVisible)await page.locator('#clubIntro').click();
    if(['PAL','VAS','BOT'].includes(code))await page.locator('#detailSheet').screenshot({path:`audit/painel-${code.toLowerCase()}.png`});
    identityAudit.push({code,name,introVisible,introName,expectedName,identityClass,pattern,moment,replay,panelOverflow});
    await page.locator('#closeSheet').click();
  }
  const allSeriesAIdentitiesPass=identityAudit.length===20&&identityAudit.every(item=>item.introVisible&&item.introName===item.expectedName&&item.identityClass&&item.pattern&&item.moment===1&&item.replay===1&&!item.panelOverflow);

  for(let i=0;i<4;i++)await page.locator('#nextHeroPhoto').click();
  await page.waitForTimeout(1100);
  const filipeFit=await page.locator('.hero-slide.active img').evaluate(image=>getComputedStyle(image).objectFit);
  await page.locator('.hero').screenshot({path:'audit/identidade-filipe-luis.png'});
  await page.locator('#nextHeroPhoto').click();
  await page.waitForTimeout(1100);
  const flamengoLabel=await page.locator('#heroPhotoLabel').innerText();
  await page.locator('.hero').screenshot({path:'audit/identidade-flamengo-2019.png'});
  await page.locator('#nextHeroPhoto').click();
  await page.waitForTimeout(1100);
  const peleLabel=await page.locator('#heroPhotoLabel').innerText();
  const peleLandscape=await page.locator('.hero-slide.active img').evaluate(image=>image.naturalWidth>image.naturalHeight);
  const cutoffBlocks=await page.locator('.hero .cutoff').count();
  await page.locator('.hero').screenshot({path:'audit/identidade-pele-horizontal.png'});

  for(let i=0;i<6;i++)await page.locator('#nextHeroPhoto').click();
  await page.waitForTimeout(1100);
  const alexLabel=await page.locator('#heroPhotoLabel').innerText();
  const alexFit=await page.locator('.hero-slide.active img').evaluate(image=>getComputedStyle(image).objectFit);
  await page.locator('.hero').screenshot({path:'audit/identidade-alex.png'});

  await page.locator('#themeBtn').click();
  await page.screenshot({path:'audit/identidade-desktop-dark.png',fullPage:false});
  await page.locator('[data-series="B"]').click();
  const seriesB=await page.locator('#heroSeries').innerText();
  const bRows=await page.locator('#tableBody .club-entry').count();
  await page.locator('#tableBody .club-row').first().click();
  const seriesBPanelOpens=await page.locator('#detailSheet').evaluate(sheet=>sheet.classList.contains('open'));
  const seriesBHasNoUnconfiguredIntro=!(await page.locator('#clubIntro').isVisible());
  await page.locator('#closeSheet').click();

  const mobile=await browser.newPage({viewport:{width:390,height:844},colorScheme:'light'});
  mobile.on('pageerror',error=>errors.push(error.message));
  await mobile.goto('http://localhost:8765/',{waitUntil:'domcontentloaded'});
  await mobile.locator('#pauseHeroPhotos').click();
  const mobileOverflow=await mobile.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
  await mobile.locator('.mobile-card[data-code="FLA"]').click();
  const mobileIntroVisible=await mobile.locator('#clubIntro').isVisible();
  await mobile.locator('#clubIntro').click();
  const mobilePanelWidth=await mobile.locator('#detailSheet').evaluate(sheet=>({scroll:sheet.scrollWidth,client:sheet.clientWidth}));
  const mobileOverflowing=await mobile.locator('#detailSheet').evaluate(sheet=>[...sheet.querySelectorAll('*')].filter(element=>element.scrollWidth>element.clientWidth+1).map(element=>({tag:element.tagName,className:element.className,scroll:element.scrollWidth,client:element.clientWidth})).slice(0,12));
  await mobile.locator('#detailSheet').screenshot({path:'audit/painel-flamengo-mobile.png'});
  await mobile.screenshot({path:'audit/identidade-mobile.png',fullPage:false});
  await mobile.locator('#closeSheet').click();
  const mobileIdentityAudit=[];
  for(const code of ['PAL','VAS','BOT']){
    await mobile.locator(`.mobile-card[data-code="${code}"]`).click();
    const intro=await mobile.locator('#clubIntro').isVisible();
    if(intro)await mobile.locator('#clubIntro').click();
    const width=await mobile.locator('#detailSheet').evaluate(sheet=>({scroll:sheet.scrollWidth,client:sheet.clientWidth}));
    mobileIdentityAudit.push({code,intro,width});
    if(code==='PAL')await mobile.locator('#detailSheet').screenshot({path:'audit/painel-pal-mobile.png'});
    await mobile.locator('#closeSheet').click();
  }
  const mobileIdentitiesPass=mobileIdentityAudit.every(item=>item.intro&&item.width.scroll<=item.width.client);

  const reducedContext=await browser.newContext({viewport:{width:900,height:700},reducedMotion:'reduce'});
  const reduced=await reducedContext.newPage();
  await reduced.goto('http://localhost:8765/',{waitUntil:'domcontentloaded'});
  const reducedLabel=await reduced.locator('#pauseHeroPhotos').innerText();
  await reduced.locator('.club-row[data-code="FLA"]').click();
  const reducedIntroVisible=await reduced.locator('#clubIntro').isVisible();
  const reducedReplayVisible=await reduced.locator('[data-replay-intro="FLA"]').isVisible();

  console.log(JSON.stringify({flamengoTheme,flamengoMoment,introVisibleOnOpen,introWord,introSymbol,escapeSkipsOnly,replayButton,introFinishesAutomatically,seriesAIdentityCount:identityAudit.length,allSeriesAIdentitiesPass,identityAudit,filipeFit,flamengoLabel,peleLabel,peleLandscape,alexLabel,alexFit,cutoffBlocks,seriesB,bRows,seriesBPanelOpens,seriesBHasNoUnconfiguredIntro,mobileOverflow,mobileIntroVisible,mobilePanelWidth,mobileOverflowing,mobileIdentitiesPass,mobileIdentityAudit,reducedLabel,reducedIntroVisible,reducedReplayVisible,resourceWarnings,errors},null,2));
  await browser.close();
  if(errors.length||flamengoTheme!=='FLA'||flamengoMoment!==1||!introVisibleOnOpen||introWord!=='FLAMENGO'||introSymbol!=='urubu'||!escapeSkipsOnly||replayButton!==1||!introFinishesAutomatically||!allSeriesAIdentitiesPass||mobileOverflow||!mobileIntroVisible||mobilePanelWidth.scroll>mobilePanelWidth.client||!mobileIdentitiesPass||filipeFit!=='cover'||!flamengoLabel.includes('geração 2019')||peleLabel!=='Pelé · Santos'||!peleLandscape||alexLabel!=='Alex · Cruzeiro, 2003'||alexFit!=='cover'||cutoffBlocks!==0||!seriesB.includes('SÉRIE B')||bRows!==20||!seriesBPanelOpens||!seriesBHasNoUnconfiguredIntro||reducedLabel!=='Retomar'||reducedIntroVisible||reducedReplayVisible)process.exitCode=1;
})();
