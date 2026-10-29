(() => {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const label = document.querySelector('#heroLabel');
  const pause = document.querySelector('#pauseSlides');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = reduced.matches;
  let timer;
  const titles = slides.map(el => el.dataset.title);
  function display(index) {
    for (let step = 0; step < slides.length; step++) {
      const candidate = (index + slides.length) % slides.length;
      const image = slides[candidate].querySelector('img');
      if (!slides[candidate].classList.contains('failed') && image.complete && image.naturalWidth > 0) {
        slides[current].classList.remove('active');
        current = candidate;
        slides[current].classList.add('active');
        label.textContent = titles[current];
        break;
      }
      index++;
    }
  }
  function schedule() {
    clearInterval(timer);
    pause.textContent = paused ? 'Retomar' : 'Pausar';
    pause.setAttribute('aria-pressed', String(paused));
    if (!paused && !document.hidden) timer = setInterval(() => display(current + 1), 6000);
  }
  for (const slide of slides) {
    const img = slide.querySelector('img');
    function failed() {
      slide.classList.add('failed');
      if (slide === slides[current]) display(current + 1);
    }
    img.addEventListener('error', failed);
    if (img.complete && !img.naturalWidth) failed();
  }
  document.querySelector('#nextSlide').addEventListener('click', () => { display(current + 1); schedule(); });
  document.querySelector('#previousSlide').addEventListener('click', () => {
    let index = current - 1;
    for (let step = 0; step < slides.length; step++, index--) {
      if (!slides[(index + slides.length) % slides.length].classList.contains('failed')) break;
    }
    display(index); schedule();
  });
  pause.addEventListener('click', () => { paused = !paused; schedule(); });
  reduced.addEventListener('change', event => { paused = event.matches; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  for (const button of document.querySelectorAll('[data-font]')) {
    button.addEventListener('click', () => {
      document.body.style.fontFamily = `${button.dataset.font}, Arial, sans-serif`;
      document.querySelectorAll('[data-font]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    });
  }
  const firstImage = slides[0].querySelector('img');
  if (firstImage.complete) schedule();
  else firstImage.addEventListener('load', schedule, { once: true });
})();
