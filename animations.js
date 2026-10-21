(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const file = location.pathname.split('/').pop() || 'index.html';
  const activePage = file === '' ? 'index.html' : file;
  const page = document.querySelector('.view');
  const gold = '#A87022';
  const seq = count => Array.from({length:count}, (_, index) => index);
  const visuals = {
    capital: () => {
      const heights = [40,62,52,88,104,96,132,154,146,178,204];
      const x = index => 130 + index * 94;
      const bars = heights.map((height, index) => `<rect class="scene-bar" style="--i:${index}" x="${x(index)}" y="${232-height}" width="50" height="${height}" fill="${index===10 ? gold : '#1D5A4C'}" stroke="${gold}" stroke-width="2"/>`).join('');
      const points = heights.map((height,index) => `${x(index)+25},${222-height}`).join(' L');
      return bars + `<path class="scene-draw" pathLength="1" d="M${points}" fill="none" stroke="${gold}" stroke-width="4" style="--i:8"/><circle class="scene-pulse" cx="${x(10)+25}" cy="${222-heights[10]}" r="10" fill="${gold}"/>`;
    },
    private: () => {
      const orbits = [[58,16,1],[96,24,-1],[132,34,1]];
      return orbits.map(([radius,duration,direction]) => `<g class="scene-orbit" style="--orbit-duration:${duration}s;animation-direction:${direction > 0 ? 'normal' : 'reverse'}"><circle cx="600" cy="120" r="${radius}" fill="none" stroke="${gold}" stroke-width="2"/><circle cx="${600+radius}" cy="120" r="9" fill="${gold}"/></g>`).join('') + `<line class="scene-flare" x1="0" y1="120" x2="438" y2="120"/><line class="scene-flare" x1="762" y1="120" x2="1200" y2="120"/><circle cx="600" cy="120" r="27" fill="${gold}"/>`;
    },
    legacy: () => {
      const branches = [
        'M600 276 C600 235 598 192 600 145','M600 180 C570 166 540 144 505 104','M600 180 C632 164 662 142 698 104',
        'M600 145 C590 116 588 82 575 46','M600 145 C613 116 615 82 630 46','M505 104 C490 91 470 78 445 61',
        'M698 104 C714 91 735 77 758 60','M505 104 C500 81 495 64 480 42','M698 104 C704 79 710 62 724 39'
      ];
      const leaves = [[445,61],[480,42],[575,46],[630,46],[724,39],[758,60]];
      return [0,1,2].map(i=>`<circle class="scene-ring" pathLength="1" cx="600" cy="268" r="72" style="--i:${i}"/>`).join('') + branches.map((path,i)=>`<path class="scene-draw" pathLength="1" d="${path}" fill="none" stroke="${gold}" stroke-width="${i===0?5:3}" stroke-linecap="round" style="--i:${i}"/>`).join('') + leaves.map(([x,y],i)=>`<circle class="scene-leaf" cx="${x}" cy="${y}" r="9" fill="${gold}" style="--i:${i}"/>`).join('');
    },
    about: () => seq(9).map(i=>`<line class="scene-line" x1="900" y1="120" x2="0" y2="${-22+i*35}" style="--i:${i}"/>`).join('') + `<circle class="scene-ring" pathLength="1" cx="900" cy="120" r="58" style="--i:0"/><circle class="scene-pulse" cx="900" cy="120" r="10" fill="${gold}"/>` + seq(3).map(i=>`<circle class="scene-node" cx="0" cy="${15+i*95}" r="8" fill="${gold}" style="--i:${i}"/>`).join(''),
    insights: () => seq(4).map(i=>{
      let d='';
      for(let x=-240;x<=1440;x+=24) d+=(x===-240?'M':'L')+x+','+(120+[34,26,18,10][i]*Math.sin(x/110+i*1.3)).toFixed(1);
      return `<path class="scene-wave" pathLength="1" d="${d}" fill="none" stroke="${gold}" stroke-width="${3-i*.4}" style="--i:${i}"/>`;
    }).join(''),
    contact: () => [[600,120,0],[300,120,1],[900,120,1.5]].map(([x,y,delay])=>seq(3).map(i=>`<circle class="scene-ring" pathLength="1" cx="${x}" cy="${y}" r="${48+i*23}" style="--i:${i};--delay:${delay}s"/>`).join('')+`<circle class="scene-pulse" cx="${x}" cy="${y}" r="${x===600?10:7}" fill="${gold}"/>`).join('')
  };
  const marqueeWords = {
    capital:['Capital advisory','Strategic transactions','Founder perspectives','Independent advice'],
    private:['Private wealth','Coordination','Family perspective','Independent advice'],
    legacy:['Legacy planning','Succession','Personal wishes','A longer perspective'],
    about:['Independent','Discreet','Coordinated','Patient'],
    insights:['Capital','Wealth','Legacy','Longer perspectives'],
    contact:['Capital','Wealth','Legacy','Begin a conversation']
  };
  if (page && page.dataset.page !== 'home') {
    const hero = page.querySelector('.page-hero');
    const builder = visuals[page.dataset.page];
    if (hero && builder) {
      const scene = document.createElement('div');
      scene.className = `scene scene-${page.dataset.page}`;
      scene.setAttribute('aria-hidden','true');
      scene.innerHTML = `<svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet">${builder()}</svg>`;
      const strip = document.createElement('div');
      strip.className = 'marquee page-marquee';
      strip.setAttribute('aria-label', (marqueeWords[page.dataset.page] || []).join(' \u00b7 '));
      const words = marqueeWords[page.dataset.page] || marqueeWords.about;
      const group = `<div class="marquee-group">${words.concat(words).map(word=>`<span>${word}<i aria-hidden="true">&#183;</i></span>`).join('')}</div>`;
      strip.innerHTML = `<div class="page-marquee-track">${group}${group}</div>`;
      hero.after(scene, strip);
    }
  }

  const menuButton = document.getElementById('mb');
  const primaryNav = document.getElementById('nv');
  const progressFill = document.getElementById('scroll-progress-fill');
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  document.querySelectorAll('header nav a, footer nav a').forEach(link => {
    const active = link.getAttribute('href') === activePage;
    link.classList.toggle('on', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (menuButton && primaryNav) {
    const setMenu = open => {
      primaryNav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    };
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    primaryNav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (innerWidth > 700) setMenu(false); }, {passive:true});
  }

  // The opening moment is reserved for the home headline and hand-drawn rings.
  const headline = document.querySelector('.word-reveal');
  if (headline) {
    const words = headline.textContent.trim().split(/\s+/);
    headline.setAttribute('aria-label', words.join(' '));
    headline.textContent = '';
    words.forEach((word, i) => {
      const outer = document.createElement('span'); outer.className = 'word'; outer.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); inner.className = 'word-inner'; inner.style.setProperty('--word-index', i); inner.textContent = word;
      outer.append(inner); headline.append(outer); headline.append(document.createTextNode(' '));
    });
  }

  const rails = document.querySelectorAll('[data-drag-rail]');
  rails.forEach(rail => {
    let downX = 0, startLeft = 0, moved = false, suppressClick = false;
    rail.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('a,button')) return;
      downX = event.clientX; startLeft = rail.scrollLeft; moved = false;
      rail.setPointerCapture?.(event.pointerId);
    });
    rail.addEventListener('pointermove', event => {
      if (!rail.hasPointerCapture?.(event.pointerId)) return;
      const delta = event.clientX - downX;
      if (Math.abs(delta) > 5) { moved = true; rail.classList.add('is-dragging'); }
      if (moved) { event.preventDefault(); rail.scrollLeft = startLeft - delta; }
    });
    const release = () => {
      if (moved) { suppressClick = true; window.setTimeout(() => { suppressClick = false; }, 80); }
      rail.classList.remove('is-dragging'); moved = false;
    };
    rail.addEventListener('pointerup', release);
    rail.addEventListener('pointercancel', release);
    rail.addEventListener('lostpointercapture', release);
    rail.addEventListener('click', event => { if (suppressClick) { event.preventDefault(); event.stopPropagation(); } }, true);
    rail.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); rail.scrollBy({left:(event.key === 'ArrowRight' ? 1 : -1) * rail.clientWidth * .72,behavior:reducedMotion.matches?'auto':'smooth'});
      }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); rail.scrollTo({left:event.key === 'Home' ? 0 : rail.scrollWidth,behavior:reducedMotion.matches?'auto':'smooth'}); }
    });
  });

  const timeline = document.querySelector('[data-timeline]');
  const horizon = document.querySelector('.horizon-art');
  const verticalProcess = document.querySelector('.vertical-process');
  let ticking = false;
  const updateScroll = () => {
    ticking = false;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - innerHeight;
    if (progressFill) progressFill.style.transform = `scaleX(${maxScroll > 0 ? clamp(scrollY / maxScroll, 0, 1) : 0})`;
    if (horizon && !reducedMotion.matches) {
      const amount = clamp(scrollY / Math.max(innerHeight * 2.7, 1), 0, 1);
      horizon.style.setProperty('--horizon-angle', (amount * 16).toFixed(2));
      horizon.style.setProperty('--horizon-rise', (amount * 1).toFixed(3));
    }
    if (verticalProcess) {
      const rect = verticalProcess.getBoundingClientRect();
      const amount = clamp((innerHeight * .78 - rect.top) / Math.max(rect.height * .82, 1), 0, 1);
      verticalProcess.style.setProperty('--process-progress', (amount * 100).toFixed(1) + '%');
      const steps = [...verticalProcess.querySelectorAll('li')];
      const count = amount === 0 ? 0 : Math.max(1, Math.ceil(amount * steps.length));
      steps.forEach((step, i) => step.classList.toggle('is-active', i < count));
    }
    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const progress = clamp((innerHeight * .78 - rect.top) / (rect.height * .9), 0, 1);
      timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
      const stops = [...timeline.querySelectorAll('.timeline-stops li')];
      const activeCount = progress === 0 ? 0 : Math.max(1, Math.ceil(progress * stops.length));
      stops.forEach((stop, i) => stop.classList.toggle('is-active', i < activeCount));
    }
  };
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } };
  addEventListener('scroll', requestUpdate, {passive:true});
  addEventListener('resize', requestUpdate, {passive:true});
  requestUpdate();

  const form = document.getElementById('enquiry-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.getElementById('form-status');
    if (status) { status.hidden = false; status.textContent = 'Preview only: connect a secure form destination before launch. Your details were not sent.'; }
  });
})();
