/**
 * Dark Mode Switch Splash — Animation v1 (Circular Clip Reveal)
 *
 * Cursor is a real arrow SVG whose tip sits exactly at (left, top).
 * Coordinates are derived from the actual element positions:
 *
 *   Org pill click     → x=730, y=22   (topbar, org pill text area)
 *   Appearance row     → x=673, y=194  (dropdown center x, row center y)
 *   Dark mode item     → x=477, y=231  (submenu center x, Dark mode row y)
 *
 * Clip origin matches the avatar corner of the org pill (top-right area).
 */

/* ── Config ────────────────────────────────────────────────────────── */
const AVATAR_X  = 762;   // clip origin x — top-right near org pill
const AVATAR_Y  = 22;    // clip origin y
const MAX_RADIUS = 920;  // covers full 788×380 diagonal


/* ── Click ripple ──────────────────────────────────────────────────── */
const ripple = document.getElementById('click-ripple');
function clickAt(x, y) {
  gsap.set(ripple, { left: x, top: y, opacity: 0.85, scale: 0.2 });
  gsap.to(ripple, { opacity: 0, scale: 1.3, duration: 0.40, ease: 'power2.out' });
}

/* ── Element refs ──────────────────────────────────────────────────── */
const revealCircle   = document.getElementById('reveal-circle');
const dropdownLight  = document.getElementById('dropdown-light');
const submenuLight   = document.getElementById('submenu-light');
const appearLight    = document.getElementById('appearance-item-light');
const checkLight     = document.getElementById('check-light-light');
const smLightDark    = document.getElementById('sm-light-dark');
const cursor         = document.getElementById('cursor-dot');

/* ── Radiance ──────────────────────────────────────────────────────── */
function initRadiance() {
  document.querySelectorAll('.radiance-local').forEach(el => {
    const isDark = el.dataset.radianceAppearance === 'dark';
    el.dataset.radianceLayout    = 'top-wash';
    el.dataset.radianceVariant   = 'dynamic-subtle';
    el.dataset.radianceIntensity = 'subtle';
    el.dataset.radianceDarkGlow  = 'subtle';
    el.dataset.radianceMotion    = 'dynamic';
    el.dataset.radianceSpeed     = isDark ? '1.72' : '1.86';
  });
  window.RadianceLanguageRenderer?.refresh?.();
}

/* ── Main timeline ─────────────────────────────────────────────────── */
function buildTimeline() {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

  /* KF1: Light mode idle */
  tl.set(cursor,       { left: AVATAR_X, top: AVATAR_Y, opacity: 0 });
  tl.set(revealCircle, { attr: { r: 0 } });

  /* KF2: Cursor appears at org pill, clicks to open dropdown */
  tl.to(cursor, { left: 730, top: 22, opacity: 1, duration: 0.18 }, 0.38);
  // Click press — subtle cursor scale
  tl.to(cursor, { scale: 0.88, duration: 0.08, ease: 'power2.in'  }, 0.56);
  tl.to(cursor, { scale: 1.0,  duration: 0.10, ease: 'power2.out' }, 0.64);
  tl.add(() => clickAt(730, 22), 0.56);

  // Dropdown opens
  tl.to(dropdownLight, {
    opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out'
  }, 0.70);

  /* KF3: Cursor moves to Appearance row */
  tl.to(cursor, { left: 673, top: 194, duration: 0.52 }, 1.10);
  tl.to(appearLight, { backgroundColor: '#eaedf2', duration: 0.18 }, 1.55);

  /* KF4: Submenu opens, cursor moves to Dark mode */
  tl.to(submenuLight, {
    opacity: 1, scaleX: 1, duration: 0.24, ease: 'power2.out'
  }, 1.85);
  tl.to(cursor, { left: 477, top: 231, duration: 0.38 }, 2.10);
  tl.to(smLightDark, { backgroundColor: '#eaedf2', duration: 0.18 }, 2.44);

  // Click Dark mode
  tl.to(cursor, { scale: 0.88, duration: 0.08, ease: 'power2.in'  }, 2.58);
  tl.to(cursor, { scale: 1.0,  duration: 0.10, ease: 'power2.out' }, 2.66);
  tl.add(() => clickAt(477, 231), 2.58);

  // Checkmarks transfer
  tl.to(checkLight, { opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in'  }, 2.60);
  tl.fromTo('#sm-light-dark > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , 2.82);

  // Cursor fades
  tl.to(cursor, { opacity: 0, duration: 0.20 }, 3.10);

  /* KF5: Circular reveal */
  tl.to(revealCircle, {
    attr: { r: MAX_RADIUS }, duration: 1.55, ease: 'power2.inOut'
  }, 3.20);

  /* KF5b: Clip sweeps over the light dropdown (r=196 at t≈3.53s → r=299 at t≈3.70s).
     Fade it out linearly so the masked dark dropdown reveal looks seamless.
     No class-toggle — the dark dropdown inside the clip handles the colour. */
  tl.to([dropdownLight, submenuLight], {
    opacity: 0,
    duration: 0.22,
    ease: 'none',
  }, 3.53);

  /* KF6: Dark layer fully revealed — dark dropdown (inside clip) visible */

  /* Loop close: collapse clip */
  tl.to(revealCircle, { attr: { r: 0 }, duration: 1.15, ease: 'power2.inOut' }, 5.85);

  /* Reset */
  tl.set(dropdownLight, { opacity: 0, scale: 0.95 },        6.95);
  tl.set(submenuLight,  { opacity: 0, scaleX: 0.92 },       6.95);
  tl.set(cursor,        { scale: 1, left: 730, top: 22 },   6.95);
  tl.set(appearLight,   { clearProps: 'backgroundColor' },   6.95);
  tl.set(smLightDark,   { clearProps: 'backgroundColor' },   6.95);
  tl.set(checkLight,    { opacity: 1, scale: 1 },            6.95);
  tl.add(() => {
    const check = document.querySelector('#sm-light-dark > .ts-check');
    if (check) gsap.set(check, { opacity: 0, scale: 0.6 });
  }, 6.95);

  return tl;
}

/* ── Tab switcher (kept for standalone.html link) ──────────────────── */
function initTabSwitcher() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ── Boot ──────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // Inject ✓ SVG into Dark mode row
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
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2 7l3.5 3.5L12 3');
    svg.appendChild(path);
    smLightDarkEl.appendChild(svg);
  }

  initRadiance();
  initTabSwitcher();
  buildTimeline();
});
