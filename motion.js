/* Camada de movimento progressiva: nenhum dado esportivo é alterado aqui. */
(() => {
  'use strict';
  // Opcional: mude para true para experimentar o anel; o cursor nativo permanece.
  const ENABLE_CUSTOM_CURSOR = false;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = () => reduce.matches;
  const canPoint = () => hover.matches && !prefersReducedMotion();
  const css = getComputedStyle(root);
  const duration = name => parseFloat(css.getPropertyValue(`--${name}`));
  const ease = css.getPropertyValue('--ease-out').trim();
  const activeAnimations = new Set();
  const activeCounts = new Map();
  const completedCounts = new WeakSet();
  const revealObserverTargets = new Set();
  const visibleContinuous = new Map();
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // Um agendamento por quadro absorve rajadas de eventos sem ler layout repetidamente.
  function rafThrottle(fn) {
    let frame = 0, latest;
    return (...args) => { latest = args; if (!frame) frame = requestAnimationFrame(() => { frame = 0; fn(...latest); }); };
  }
  function animate(el, frames, options = {}) {
    if (prefersReducedMotion() || !el.animate) return null;
    const animation = el.animate(frames, {duration: duration('dur-base'), easing: ease, ...options});
    activeAnimations.add(animation);
    animation.finished.catch(() => {}).finally(() => activeAnimations.delete(animation));
    return animation;
  }
  function buildOdometer(el) {
    if (el.dataset.odometerReady) return;
    const value = String(el.dataset.odometer || '').trim();
    if (!value || prefersReducedMotion()) return;
    const source = $('span', el) || el;
    const visual = document.createElement('span'); visual.className = 'odometer'; visual.setAttribute('aria-hidden', 'true');
    [...value].forEach((character, index) => {
      if (!/\d/.test(character)) {visual.append(character); return;}
      const digit = document.createElement('span'); digit.className = 'odometer-digit';
      const reel = document.createElement('span'); reel.className = 'odometer-reel'; reel.style.setProperty('--digit', character); reel.style.setProperty('--odometer-delay', `${index * 45}ms`);
      reel.innerHTML = '0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9'; digit.append(reel); visual.append(digit);
    });
    if (source === el) {const suffix = el.textContent.replace(value, '');el.textContent = '';el.append(visual, document.createTextNode(suffix));}
    else source.replaceWith(visual);
    el.dataset.odometerReady = 'true';
    requestAnimationFrame(() => visual.classList.add('is-running'));
  }
  function onEnter(elements, callback, {threshold = .08, rootMargin = '0px', once = true} = {}) {
    if (!('IntersectionObserver' in window)) { [...elements].forEach(callback); return null; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { callback(entry.target, entry); if (once) observer.unobserve(entry.target); }
    }), {threshold, rootMargin});
    [...elements].forEach(el => observer.observe(el));
    return observer;
  }
  function countUp(el) {
    if (completedCounts.has(el) || activeCounts.has(el)) return;
    completedCounts.add(el);
    if (el.dataset.odometer) {buildOdometer(el); return;}
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node; while ((node = walker.nextNode()) && !/\d/.test(node.textContent)) {}
    if (!node) return;
    const finalText = node.textContent, raw = el.dataset.count ?? finalText;
    const match = raw.match(/[-+]?\d[\d.]*(?:,\d+)?/);
    if (!match || prefersReducedMotion()) return;
    const final = Number(match[0].replaceAll('.', '').replace(',', '.'));
    if (!Number.isFinite(final)) return;
    const decimals = (match[0].split(',')[1] || '').length;
    const format = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
    const textMatch = finalText.match(/[-+]?\d[\d.]*(?:,\d+)?/);
    if (!textMatch) return;
    // O nome acessível permanece no valor final durante a contagem visual.
    const previousLabel = el.getAttribute('aria-label');
    el.setAttribute('aria-label', finalText);
    let start;
    const range = document.createRange();range.selectNodeContents(node);
    const width = range.getBoundingClientRect().width;
    const reserved = document.createElement('bdi');reserved.style.display='inline-block';reserved.style.minWidth=`${width}px`;
    node.before(reserved);reserved.append(node);
    const finish = () => { node.textContent = finalText;reserved.replaceWith(node); previousLabel === null ? el.removeAttribute('aria-label') : el.setAttribute('aria-label', previousLabel); activeCounts.delete(el); };
    const state = {frame: 0, finish}; activeCounts.set(el, state);
    const tick = time => {
      if (prefersReducedMotion() || !el.isConnected || document.hidden) { finish(); return; }
      start ??= time;
      const t = Math.min(1, (time - start) / duration('dur-count'));
      const value = format.format(final * (1 - (1 - t) ** 3));
      node.textContent = finalText.replace(textMatch[0], `${match[0].startsWith('+') ? '+' : ''}${value}`);
      if (t < 1) state.frame = requestAnimationFrame(tick); else finish();
    };
    state.frame = requestAnimationFrame(tick);
  }
  const counts = onEnter([], countUp);
  const reveals = onEnter([], el => {el.classList.add('is-visible'); revealObserverTargets.delete(el);});
  function reveal(elements, stagger = duration('stagger')) {
    elements.forEach((el, i) => {
      el.dataset.reveal = '';
      el.style.setProperty('--reveal-delay', `${Math.min(i, 12) * stagger}ms`);
      if (!prefersReducedMotion() && reveals) {revealObserverTargets.add(el); reveals.observe(el);} else el.classList.add('is-visible');
    });
  }
  function observeCounts(elements) { elements.forEach(el => counts ? counts.observe(el) : countUp(el)); }
  function cancelCounts() { activeCounts.forEach(state => {cancelAnimationFrame(state.frame); state.finish();}); }

  // Animações CSS contínuas têm uma única política de visibilidade e de aba.
  function syncContinuous() {
    visibleContinuous.forEach((visible, el) => el.classList.toggle('is-paused', !visible || document.hidden || prefersReducedMotion()));
  }
  const continuousObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => visibleContinuous.set(entry.target, entry.isIntersecting)); syncContinuous();
  }) : null;
  function continuous(el) { visibleContinuous.set(el, false); continuousObserver?.observe(el); syncContinuous(); }
  $$('.continuous,.scroll-hint').forEach(continuous);
  document.addEventListener('visibilitychange', () => {syncContinuous(); if (document.hidden) cancelCounts();});

  // Hero: os contêineres de linha já reservam a altura final do texto.
  const heroTitle = $('#heroTitle');
  heroTitle.classList.add('is-revealing');
  const revealHeroTitle = () => requestAnimationFrame(() => requestAnimationFrame(() => heroTitle.classList.add('is-in')));
  if (document.fonts) document.fonts.ready.then(revealHeroTitle, revealHeroTitle);
  else revealHeroTitle();
  $$('.hero-eyebrow,.hero-meta,.discover-link,.hero-controls').forEach((el, i) => animate(el, [{opacity: 0, transform: 'translateY(16px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: duration('dur-slow'), delay: i * duration('stagger')}));
  const progress = document.createElement('span'); progress.className = 'reading-progress'; progress.setAttribute('aria-hidden', 'true'); $('.topbar').append(progress);
  let heroVisible = true;
  
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {heroVisible = entry.isIntersecting; if (!heroVisible) $('#heroMedia').style.transform = '';}).observe($('.hero'));
  const timeline = $('.history-timeline');
  const year = document.createElement('span'); year.className = 'timeline-year'; year.setAttribute('aria-hidden', 'true'); $('.history-evolution > div').append(year);
  $$('.section-num').forEach(el => {el.dataset.number=el.textContent;el.setAttribute('aria-hidden','true');});
  // TODO(asset): imagens com licença confirmada e correspondência a cada período.
  const timelineItems = $$('li', timeline);
  const updateScroll = rafThrottle(() => {
    const range = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0})`;
    if (heroVisible && innerWidth > 768 && !prefersReducedMotion()) $('#heroMedia').style.transform = `translate3d(0,${Math.min(scrollY * .13, 140)}px,0)`;
    else $('#heroMedia').style.transform = '';
    if (timeline.getClientRects().length) {
      const rect = timeline.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (innerHeight * .5 - rect.top) / rect.height));
      timeline.style.setProperty('--timeline-progress', prefersReducedMotion() ? 1 : fraction);
      const active = timelineItems.filter(item => item.getBoundingClientRect().top < innerHeight * .55).at(-1) || timelineItems[0];
      timelineItems.forEach(item => item.classList.toggle('is-current', item === active));
      const next = $('span', active)?.textContent || '';
      if (year.textContent !== next) {year.textContent = next; animate(year, [{opacity: 0, transform: 'translateY(12px)'}, {opacity: 1, transform: 'none'}]);}
    }
    $$('.section-num').forEach(el => el.style.setProperty('--number-shift', prefersReducedMotion() ? '0px' : `${Math.max(-20, Math.min(20, el.getBoundingClientRect().top * .025))}px`));
  });
  window.addEventListener('scroll', updateScroll, {passive: true});
  window.addEventListener('resize', updateScroll, {passive: true});
  document.addEventListener('click', updateScroll);

  // Faixa derivada dos objetos atuais: não mistura divisões nem recalcula datas.
  const ticker = document.createElement('section'); ticker.className = 'match-ticker continuous'; ticker.setAttribute('aria-label', 'Próximos jogos após o recorte histórico');
  ticker.innerHTML = '<p>PRÓXIMOS JOGOS · RECORTE HISTÓRICO</p><div class="ticker-window" tabindex="0" aria-label="Jogos; foque para pausar"><div class="ticker-track"></div></div>';
  $('.hero').after(ticker); continuous(ticker);
  function renderTicker() {
    const track = $('.ticker-track', ticker); track.replaceChildren();
    const list = document.createElement('ul');
    const clubsByName = new Map(clubs.map(club => [normalizedName(club.name), club]));
    const fixtures = new Map();
    clubs.forEach(club => {
      if (!club.next || !club.date) return;
      const opponent = clubsByName.get(normalizedName(club.next));
      if (!opponent) return;
      const key = [club.code, opponent.code].sort().join(':');
      const fixture = {
        home: club.venue === 'C' ? club : opponent,
        away: club.venue === 'C' ? opponent : club,
        date: club.date,
        isHomeRecord: club.venue === 'C'
      };
      if (!fixtures.has(key) || fixture.isHomeRecord) fixtures.set(key, fixture);
    });
    fixtures.forEach(({home, away, date: fixtureDate}) => {
      const item = document.createElement('li');
      item.dataset.homeCode = home.code; item.dataset.awayCode = away.code;
      item.setAttribute('aria-label', `${home.name} contra ${away.name}, ${fixtureDate}`);
      const team = club => {
        const wrapper = document.createElement('span'); wrapper.className = 'ticker-team'; wrapper.setAttribute('aria-hidden', 'true');
        const img = document.createElement('img'); img.src = crest(club.code); img.alt = ''; img.width = img.height = 22; img.loading = 'lazy';
        const name = document.createElement('span'); name.textContent = club.name;
        wrapper.append(img, name); return wrapper;
      };
      const versus = document.createElement('span'); versus.className = 'ticker-versus'; versus.textContent = '×'; versus.setAttribute('aria-hidden', 'true');
      const date = document.createElement('small'); date.textContent = fixtureDate; date.setAttribute('aria-hidden', 'true');
      item.append(team(home), versus, team(away), date); list.append(item);
    });
    if (!list.children.length) {ticker.hidden = true; return;} ticker.hidden = false;
    const copy = list.cloneNode(true); copy.setAttribute('aria-hidden', 'true'); copy.inert = true;
    track.append(list, copy);
  }
  renderTicker();

  // Faixas editoriais usam somente termos que já existem no conteúdo e no recorte.
  const marqueeAfterGames = document.createElement('div');
  const marqueeBeforeHistory = document.createElement('div');
  [marqueeAfterGames, marqueeBeforeHistory].forEach(marquee => {marquee.className = 'editorial-marquee continuous';marquee.setAttribute('aria-hidden','true');continuous(marquee);});
  ticker.after(marqueeAfterGames); $('.history').before(marqueeBeforeHistory);
  function renderMarquees() {
    const division = $('.series-toggle .active')?.dataset.series || 'A';
    const round = division === 'A' ? 'RODADA 31' : '33 RODADAS CONCLUÍDAS';
    const fill = (target, terms) => {const content = terms.map(term => `<span>${term}</span>`).join('');target.innerHTML = `<div>${content}${content}</div>`;};
    fill(marqueeAfterGames, [`BRASILEIRÃO 2026`, `SÉRIE ${division}`, round, 'CLASSIFICAÇÃO']);
    fill(marqueeBeforeHistory, ['ARTILHEIROS', 'CAMPEÕES', 'HISTÓRIA', `SÉRIE ${division}`]);
  }
  renderMarquees();

  // Créditos em grupos recolhíveis; os nós originais são apenas movidos, sem reescrever o conteúdo.
  const creditsGrid = $('.credits-grid');
  if (creditsGrid) [...creditsGrid.children].forEach((group, index) => {
    const details = document.createElement('details'); details.className = 'credit-group surface-2'; details.open = index === 0;
    const summary = document.createElement('summary'); summary.textContent = group.firstElementChild?.textContent.trim() || `Grupo de fontes ${index + 1}`;
    group.before(details); details.append(summary, group);
  });
  $$('a[target="_blank"]').forEach(link => {
    if ($('.external-icon', link)) return;
    const external = document.createElementNS('http://www.w3.org/2000/svg','svg'); external.setAttribute('class','icon external-icon'); external.setAttribute('aria-hidden','true');
    const use = document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href','#icon-arrow-up-right'); external.append(use); link.append(' ',external);
  });

  // Observadores são desconectados antes de substituir linhas para não reter nós antigos.
  let tableResize, rowCursor;
  const entryCounts = new Set(), entryReveals = new Set();
  function setupTable() {
    entryCounts.forEach(el => counts?.unobserve(el)); entryCounts.clear();
    entryReveals.forEach(el => {reveals?.unobserve(el); revealObserverTargets.delete(el);}); entryReveals.clear();
    tableResize?.disconnect(); rowCursor?.remove();$$('.yield-bar', $('#tableBody')).forEach(el=>bars?.unobserve(el));
    const rows = $$('.club-entry,.mobile-card');
    rows.forEach((row, i) => {
      row.dataset.reveal = ''; row.style.setProperty('--reveal-delay', `${i % 20 * duration('stagger-row')}ms`);
      if (prefersReducedMotion()) row.classList.add('is-visible'); else {reveals?.observe(row); entryReveals.add(row); revealObserverTargets.add(row);}
      const points = $('.pts,.points strong', row); if (points) {entryCounts.add(points); counts?.observe(points);}
      const code = $('[data-club-code]', row)?.dataset.clubCode || row.dataset.clubCode;
      const identity = clubIdentities[code]; if (identity?.theme?.accent) row.style.setProperty('--row-accent', identity.theme.accent);
      const percentage = $('.hover-details b', row);
      if (percentage) addBar(percentage);
    });
    rowCursor = document.createElement('span'); rowCursor.className = 'row-spotlight'; rowCursor.setAttribute('aria-hidden', 'true'); $('#tableBody').prepend(rowCursor);
    tableResize = new ResizeObserver(() => {moveRowCursor(lastRow); syncPills();}); tableResize.observe($('#tableBody'));
    rows.forEach(row => tableResize.observe(row));
    $$('[data-series]').forEach(button => {button.setAttribute('role', 'radio'); button.setAttribute('aria-checked', String(button.classList.contains('active')));button.tabIndex = button.classList.contains('active') ? 0 : -1;});
    syncPills();
  }
  const panelBars = new Set();
  const bars = onEnter([], target => target.classList.add('is-visible'));
  function addBar(el) {
    if ($('.yield-bar', el.parentElement)) return;
    const value = parseFloat(el.textContent.replace(',', '.'));
    if (!Number.isFinite(value)) return;
    const bar = document.createElement('span'); bar.className = 'yield-bar'; bar.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('i'); fill.style.setProperty('--yield', Math.min(1, value / 100)); bar.append(fill); el.after(bar);
    if (bars) bars.observe(bar); else bar.classList.add('is-visible');if (el.closest('.detail-sheet')) panelBars.add(bar);
  }
  let lastRow = null;
  const moveRowCursor = rafThrottle(row => {
    lastRow = row?.isConnected ? row : null;
    if (!lastRow || !canPoint()) {rowCursor?.classList.remove('is-visible'); return;}
    const y = lastRow.offsetTop;
    rowCursor.style.transform = `translateY(${y}px) scaleY(${lastRow.offsetHeight})`;
    rowCursor.style.setProperty('--row-accent', getComputedStyle(lastRow).getPropertyValue('--row-accent').trim() || 'var(--accent)');
    rowCursor.classList.add('is-visible');
  });
  $('#tableBody').addEventListener('pointermove', event => moveRowCursor(event.target.closest('.club-entry')), {passive: true});
  $('#tableBody').addEventListener('pointerleave', () => moveRowCursor(null));
  $('#tableBody').addEventListener('focusin', event => moveRowCursor(event.target.closest('.club-entry')));
  $('#tableBody').addEventListener('focusout', event => {if (!$('#tableBody').contains(event.relatedTarget)) moveRowCursor(null);});
  const toggle = $('.series-toggle'); toggle.setAttribute('role', 'radiogroup'); toggle.setAttribute('aria-label', 'Divisão do campeonato');
  const seriesPill = document.createElement('span'); seriesPill.className = 'series-pill'; seriesPill.setAttribute('aria-hidden', 'true'); toggle.prepend(seriesPill);
  const nav = $('#mainNav'); const navPill = document.createElement('span'); navPill.className = 'nav-pill'; navPill.setAttribute('aria-hidden', 'true'); nav.prepend(navPill);
  let highlightedNav = null;
  function syncPills() {
    const active = $('[data-series].active');
    if (active) {seriesPill.style.width = `${active.offsetWidth}px`;seriesPill.style.transform = `translateX(${active.offsetLeft}px)`;}
    const link = highlightedNav || $('[aria-current]', nav);
    if (link && innerWidth > 768) {navPill.style.width = `${link.offsetWidth}px`;navPill.style.transform = `translateX(${link.offsetLeft}px)`;navPill.style.opacity = 1;} else navPill.style.opacity = 0;
  }
  nav.addEventListener('pointermove', rafThrottle(event => {if (!canPoint()) return;highlightedNav = event.target.closest('a');syncPills();}), {passive: true});
  nav.addEventListener('pointerleave', () => {highlightedNav = null;syncPills();});
  nav.addEventListener('focusin', event => {highlightedNav = event.target.closest('a');syncPills();});
  nav.addEventListener('focusout', () => {highlightedNav = null;syncPills();});
  new MutationObserver(syncPills).observe(nav, {attributes: true, subtree: true, attributeFilter: ['aria-current']});
  window.addEventListener('resize', rafThrottle(syncPills), {passive: true});
  toggle.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const options = $$('[data-series]'); const index = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - options.indexOf(document.activeElement);
    options[Math.max(0, index)].click(); options[Math.max(0, index)].focus();
  });
  setupTable();
  document.addEventListener('motion:division', () => {lastRow = null;setupTable();renderTicker();renderMarquees();observeCounts($$('[data-odometer]'));animate($('#tableBody'), [{opacity: .35}, {opacity: 1}]);});

  // Um listener por card; apenas os destaques indicados recebem inclinação.
  const cards = $$('.history-preview article,.history-scorer,.history-regulations,.season-player');
  cards.forEach(card => {
    card.classList.add('motion-card');
    const tilt = card.matches('.season-player-leader,.history-preview article:nth-child(n+4)');
    const move = rafThrottle(event => {
      if (!canPoint()) return;
      const rect = card.getBoundingClientRect(),x = event.clientX - rect.left,y = event.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);card.style.setProperty('--my', `${y}px`);
      if (tilt) {card.style.setProperty('--tilt-x', `${(y / rect.height - .5) * -8}deg`);card.style.setProperty('--tilt-y', `${(x / rect.width - .5) * 8}deg`);card.classList.add('is-tilting');}
    });
    card.addEventListener('pointermove', move, {passive: true});
    card.addEventListener('pointerleave', () => {card.style.setProperty('--tilt-x', '0deg');card.style.setProperty('--tilt-y', '0deg');card.classList.remove('is-tilting');});
  });
  const magnetic = $$('.discover-link,#themeBtn');
  // A área ampliada usa o pai para garantir o retorno ao sair.
  magnetic.forEach(button => {
    button.parentElement.addEventListener('pointermove', rafThrottle(event => {
      if (!canPoint()) return;
      const r = button.getBoundingClientRect(),dx = event.clientX - r.x - r.width / 2,dy = event.clientY - r.y - r.height / 2;
      const near = Math.abs(dx) <= r.width / 2 + 80 && Math.abs(dy) <= r.height / 2 + 80;
      button.style.translate = near ? `${Math.max(-6, Math.min(6, dx * .025))}px ${Math.max(-6, Math.min(6, dy * .06))}px` : '0px 0px';
    }), {passive: true});
    button.parentElement.addEventListener('pointerleave', () => button.style.translate = '0px 0px');
  });

  // Carregamento progressivo: observa apenas imagens novas dos painéis.
  const watchedImages = new WeakSet();
  function setupImages(parent) {
    $$('img', parent).forEach(img => {
      if (watchedImages.has(img)) return; watchedImages.add(img);
      img.decoding = 'async';
      const large = img.matches('.hero-slide img,.club-moment img,.history-portrait img,.season-photo img,.preview-legend img');
      if (large) img.classList.add('motion-image');
      const done = () => {if(img.parentElement){continuousObserver?.unobserve(img.parentElement);visibleContinuous.delete(img.parentElement);}img.classList.remove('is-loading');img.parentElement?.classList.remove('image-pending');};
      const failed = () => {
        done();
        if (!img.dataset.neutralFallback) {img.dataset.neutralFallback = 'true';img.src = 'assets/identidade/favicon.svg';img.classList.add('image-fallback');}
        else if (!img.dataset.failed) {img.dataset.failed='true';img.style.visibility='hidden';const icon=document.createElement('span');icon.className='image-unavailable-icon';icon.textContent='◇';icon.setAttribute('role','img');icon.setAttribute('aria-label',img.alt||'Imagem indisponível');img.parentElement?.classList.add('image-unavailable');img.after(icon);}
      };
      img.addEventListener('load', done);img.addEventListener('error', failed);
      if (img.complete) {if (img.getAttribute('src') && !img.naturalWidth) failed();} else if (large) {img.classList.add('is-loading');img.parentElement.classList.add('image-pending');continuous(img.parentElement);}
    });
  }
  setupImages(document);
  const panelAnimations = new Set();
  function cancelPanel() {panelBars.forEach(el=>bars?.unobserve(el));panelBars.clear();visibleContinuous.forEach((_,el)=>{if(!el.isConnected){continuousObserver?.unobserve(el);visibleContinuous.delete(el);}});panelAnimations.forEach(a => a.cancel());panelAnimations.clear();$$('*', $('#detailContent')).forEach(el => {const state = activeCounts.get(el);if (state) {cancelAnimationFrame(state.frame);state.finish();}});}
  document.addEventListener('motion:panel-close', cancelPanel);
  document.addEventListener('motion:panel', () => {
    cancelPanel(); const panel = $('#detailContent');setupImages(panel);
    const sections = $$('.detail-top,.detail-stats,.club-moment,.market-total,.detail-section,.next-game', panel);
    sections.forEach((el, index) => {const a = animate(el, [{opacity: 0, transform: 'translateY(12px)'}, {opacity: 1, transform: 'none'}], {delay: Math.min(index, 8) * duration('stagger')});if (a) {panelAnimations.add(a);a.finished.catch(() => {}).finally(() => panelAnimations.delete(a));}});
    $$('.detail-stat strong,.market-total strong,.percent', panel).forEach(countUp);
    $$('.form.large .dot', panel).forEach((el, index) => {const a = animate(el, [{transform: 'scale(0)', opacity: 0}, {transform: 'scale(1)', opacity: 1}], {delay: index * duration('stagger-dot')});if (a) panelAnimations.add(a);});
    $$('.percent', panel).forEach(addBar);
    const replay = $('[data-replay-intro]', panel);if (replay) animate(replay, [{transform: 'scale(1)'}, {transform: 'scale(1.04)'}, {transform: 'scale(1)'}], {duration: duration('dur-slow')});
  });
  reveal($$('.history-heading,.history-preview article,.history-timeline li,.history-rules-intro,.season-ranking'));
  $$('[data-reveal-group]').forEach(group => reveal([...group.children]));
  observeCounts($$('.history-scorer strong,.history-preview article > strong,.season-total strong'));
  observeCounts($$('[data-odometer]'));
  $$('.surface,.method,.history-preview article,.season-ranking,.sources-details').forEach(el => el.classList.add('surface-2'));
  $$('.detail-sheet,.topbar').forEach(el => el.classList.add('surface-3'));
  root.classList.add('motion-ready');
  document.fonts?.ready.then(() => {syncPills();updateScroll();}); updateScroll();

  function resetMotion() {
    if (prefersReducedMotion()) {
      document.getAnimations().forEach(a => a.cancel());activeAnimations.forEach(a => a.cancel());cancelCounts();cancelPanel();
      revealObserverTargets.forEach(el => el.classList.add('is-visible'));revealObserverTargets.clear();
    }
    if (!canPoint()) {$$('.is-tilting').forEach(el => el.classList.remove('is-tilting'));magnetic.forEach(el => el.style.translate = '0px 0px');rowCursor?.classList.remove('is-visible');}
    syncContinuous();updateScroll();
  }
  reduce.addEventListener('change', resetMotion);hover.addEventListener('change', resetMotion);
  if (ENABLE_CUSTOM_CURSOR) {
    const ring = document.createElement('span');ring.className = 'custom-cursor';ring.setAttribute('aria-hidden', 'true');document.body.append(ring);ring.hidden=true;
    let frame = 0,x = 0,y = 0,tx = 0,ty = 0;
    const tick = () => {x += (tx - x) * .2;y += (ty - y) * .2;ring.style.transform = `translate(${x}px,${y}px)`;if (canPoint() && !document.hidden && Math.hypot(tx - x, ty - y) > .2) frame = requestAnimationFrame(tick);else frame = 0;};
    document.addEventListener('pointermove', event => {tx = event.clientX;ty = event.clientY;const target = event.target.closest('.club-row,.mobile-card,.motion-card');ring.hidden = !canPoint() || !target;ring.textContent = target ? 'Ver' : '';if (!frame && !ring.hidden) frame = requestAnimationFrame(tick);}, {passive: true});
    document.addEventListener('visibilitychange', () => {if (document.hidden) {cancelAnimationFrame(frame);frame = 0;ring.hidden = true;}});
    reduce.addEventListener('change', () => {ring.hidden = true;cancelAnimationFrame(frame);frame = 0;});
  }
})();
