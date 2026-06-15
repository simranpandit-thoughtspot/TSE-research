/**
 * Dark Mode Switch Splash — Animation v4: "Introducing Dark Mode"
 *
 * INTRO (once on load / page refresh):
 *   Frosted-glass overlay on top of the blurred dashboard.
 *   "Introducing Dark Mode" drifts up → holds → exits ease-out → overlay dissolves.
 *
 * LOOP (starts after intro, repeats forever):
 *   Identical to Iteration 1 — cursor, dropdown, appearance menu,
 *   dark mode selection, circular clip reveal, loop.
 */

/* ── Clip config ─────────────────────────────────────────────────── */
const AVATAR_X   = 762;
const AVATAR_Y   = 22;
const MAX_R      = 920;

/* ── Click ripple ─────────────────────────────────────────────────── */
const ripple = document.getElementById('click-ripple');
function clickAt(x, y) {
  gsap.set(ripple, { left: x, top: y, opacity: 0.85, scale: 0.2 });
  gsap.to(ripple, { opacity: 0, scale: 1.3, duration: 0.40, ease: 'power2.out' });
}

/* ── Element refs ─────────────────────────────────────────────────── */
const introOverlay  = document.getElementById('intro-overlay');
const introText     = document.getElementById('intro-text');
const revealCircle  = document.getElementById('reveal-circle');
const dropdownLight = document.getElementById('dropdown-light');
const submenuLight  = document.getElementById('submenu-light');
const appearLight   = document.getElementById('appearance-item-light');
const checkLight    = document.getElementById('check-light-light');
const smLightDark   = document.getElementById('sm-light-dark');
const cursor        = document.getElementById('cursor-dot');

/* ── Radiance ─────────────────────────────────────────────────────── */
function initRadiance() {
  document.querySelectorAll('.radiance-local').forEach(el => {
    const isDark = el.dataset.radianceAppearance === 'dark';
    Object.assign(el.dataset, {
      radianceLayout:    'top-wash',
      radianceVariant:   'dynamic-subtle',
      radianceIntensity: 'subtle',
      radianceDarkGlow:  'subtle',
      radianceMotion:    'dynamic',
      radianceSpeed:     isDark ? '1.72' : '1.86',
    });
  });
  window.RadianceLanguageRenderer?.refresh?.();
}

/* ── Loop: full iteration 1 flow ─────────────────────────────────── */
function buildLoop() {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

  tl.set(cursor,       { left: AVATAR_X, top: AVATAR_Y, opacity: 0 });
  tl.set(revealCircle, { attr: { r: 0 } });

  /* Avatar click → dropdown opens */
  tl.to(cursor, { left: 730, top: 22, opacity: 1, duration: 0.18 }, 0.38);
  tl.to(cursor, { scale: 0.88, duration: 0.08, ease: 'power2.in'  }, 0.56);
  tl.to(cursor, { scale: 1.0,  duration: 0.10, ease: 'power2.out' }, 0.64);
  tl.add(() => clickAt(730, 22), 0.56);
  tl.to(dropdownLight, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }, 0.70);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, 0.92);

  /* Cursor moves to Appearance */
  tl.to(cursor, { left: 673, top: 194, duration: 0.52 }, 1.10);
  tl.to(cursor, { opacity: 1, duration: 0.01 }, 1.10);
  tl.to(appearLight, { backgroundColor: '#eaedf2', duration: 0.18 }, 1.55);

  /* Submenu opens → cursor to Dark mode */
  tl.to(submenuLight, { opacity: 1, scaleX: 1, duration: 0.24, ease: 'power2.out' }, 1.85);
  tl.to(cursor, { left: 477, top: 231, duration: 0.38 }, 2.10);
  tl.to(smLightDark, { backgroundColor: '#eaedf2', duration: 0.18 }, 2.44);

  /* Click Dark mode */
  tl.to(cursor, { scale: 0.88, duration: 0.08, ease: 'power2.in'  }, 2.58);
  tl.to(cursor, { scale: 1.0,  duration: 0.10, ease: 'power2.out' }, 2.66);
  tl.add(() => clickAt(477, 231), 2.58);

  /* Checkmarks transfer */
  tl.to(checkLight, { opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in'  }, 2.60);
  tl.fromTo('#sm-light-dark > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , 2.82);

  tl.to(cursor, { opacity: 0, duration: 0.20 }, 3.10);

  /* Circular reveal */
  tl.to(revealCircle, { attr: { r: MAX_R }, duration: 1.55, ease: 'power2.inOut' }, 3.20);

  /* Light dropdown fades as clip sweeps over it (r≈196 at t≈3.53s) */
  tl.to([dropdownLight, submenuLight], { opacity: 0, duration: 0.22, ease: 'none' }, 3.53);

  /* Collapse clip */
  tl.to(revealCircle, { attr: { r: 0 }, duration: 1.15, ease: 'power2.inOut' }, 5.85);

  /* Reset */
  tl.set(dropdownLight, { opacity: 0, scale: 0.95 },        6.95);
  tl.set(submenuLight,  { opacity: 0, scaleX: 0.92 },       6.95);
  tl.set(cursor,        { scale: 1, left: 730, top: 22 },   6.95);
  tl.set(appearLight,   { clearProps: 'backgroundColor' },   6.95);
  tl.set(smLightDark,   { clearProps: 'backgroundColor' },   6.95);
  tl.set(checkLight,    { opacity: 1, scale: 1 },            6.95);
  tl.add(() => {
    const c = document.querySelector('#sm-light-dark > .ts-check');
    if (c) gsap.set(c, { opacity: 0, scale: 0.6 });
  }, 6.95);

  return tl;
}

/* ── Intro: plays once, then startLoop ───────────────────────────── */
function runIntro() {
  gsap.set(revealCircle, { attr: { r: 0 } });

  const intro = gsap.timeline({
    onComplete: () => {
      if (introOverlay) introOverlay.style.display = 'none';
      buildLoop();
    },
  });

  /* Text drifts up and fades in */
  intro.to(introText, {
    opacity: 1, y: 0,
    duration: 0.72,
    ease: 'power2.out',
  }, 0.30);

  /* Hold */
  intro.set({}, {}, 1.80);

  /* Text exits upward — ease-out (fast start, decelerates to zero) */
  intro.to(introText, {
    opacity: 0, y: -20,
    duration: 0.55,
    ease: 'power2.out',
  }, 1.85);

  /* Overlay dissolves */
  intro.to(introOverlay, {
    opacity: 0,
    duration: 0.60,
    ease: 'power2.out',
  }, 2.15);

  /* Buffer before loop fires */
  intro.set({}, {}, 2.90);
}

/* ── Boot ─────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  const smLightDarkEl = document.getElementById('sm-light-dark');
  if (smLightDarkEl && !smLightDarkEl.querySelector('.ts-check')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ts-check');
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.style.cssText = 'opacity:0;transform:scale(0.6)';
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', 'M2 7l3.5 3.5L12 3');
    svg.appendChild(p);
    smLightDarkEl.appendChild(svg);
  }

  initRadiance();
  runIntro();
});
