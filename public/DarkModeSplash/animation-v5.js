/**
 * Dark Mode Switch Splash — Animation v5: "The Liveboard"
 *
 * DUSK (Light → Dark):
 *   Cursor clicks org pill → dropdown opens → hovers Appearance →
 *   cascading submenu opens → clicks Dark mode.
 *   Horizon mask rises bottom→top. The light dropdown is covered naturally
 *   as the dark layer sweeps over it. After dark mode is fully applied,
 *   the dark dropdown closes. 500ms pause.
 *
 * DAWN (Dark → Light):
 *   Cursor clicks org pill (dark) → dropdown opens → hovers Appearance →
 *   clicks Light mode. Horizon mask falls top→bottom. The dark dropdown is
 *   clipped away naturally as the light layer takes over. Reset.
 *
 * Cursor uses the click-ripple style from iteration 1.
 */

/* ── Config ──────────────────────────────────────────────────────────── */
const DUSK_DUR = 1.1;
const DAWN_DUR = 1.1;

// Mask sweep geometry over the dropdown (y=48..250 inside 380px frame)
// clip-path: inset(T 0 0 0) → visible when y > T*380
// Dropdown bottom at y=250 → T = 250/380 = 65.8% → progress = 34.2%
// Dropdown top  at y= 48 → T =  48/380 = 12.6% → progress = 87.4%
const DUSK_ENTER = 0.342;
const DUSK_EXIT  = 0.874;

/* ── Element refs ─────────────────────────────────────────────────────── */
const layerDark      = document.getElementById('layer-dark');
const dropdownLight  = document.getElementById('dropdown-light');
const dropdownDark   = document.getElementById('dropdown-dark');
const submenuLight   = document.getElementById('submenu-light');
const submenuDark    = document.getElementById('submenu-dark');
const appearLight    = document.getElementById('appearance-item-light');
const appearDark     = document.getElementById('appearance-item-dark');
const checkDarkDark  = document.getElementById('check-dark-dark');
const smLightDark    = document.getElementById('sm-light-dark');
const smDarkLight    = document.getElementById('sm-dark-light');
const horizonLine    = document.getElementById('horizon-line');
const cursor         = document.getElementById('cursor-dot');
const ripple         = document.getElementById('click-ripple');

/* ── Click ripple (iteration 1 style) ────────────────────────────────── */
function clickAt(x, y) {
  gsap.set(ripple, { left: x, top: y, opacity: 0.8, scale: 0.2 });
  gsap.to(ripple, { opacity: 0, scale: 1.5, duration: 0.44, ease: 'power2.out' });
}

/* ── Radiance ─────────────────────────────────────────────────────────── */
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

/* ── Timeline ─────────────────────────────────────────────────────────── */
function buildTimeline() {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

  /* ── Initial state ──────────────────────────────────────────────── */
  tl.set(layerDark,    { clipPath: 'inset(100% 0 0 0)' });
  tl.set(horizonLine,  { opacity: 0, y: 380 });
  tl.set(cursor,       { left: 762, top: 22, opacity: 0 });
  tl.set([dropdownLight, dropdownDark], { opacity: 0, scale: 0.95 });
  tl.set([submenuLight, submenuDark],   { opacity: 0, scaleX: 0.92 });

  /* ════════════════════════════════════════════════════════════════
     DUSK — Light → Dark
  ════════════════════════════════════════════════════════════════ */

  /* D1: Cursor appears at org pill, clicks */
  tl.to(cursor, { left: 730, top: 22, opacity: 1, duration: 0.18 }, 0.50);
  tl.to(cursor, { scale: 0.82, duration: 0.09, ease: 'power2.in'  }, 0.66);
  tl.to(cursor, { scale: 1.0,  duration: 0.11, ease: 'power2.out' }, 0.75);
  tl.add(() => clickAt(730, 22), 0.66);

  /* D2: Light dropdown opens, cursor fades */
  tl.to(dropdownLight, { opacity: 1, scale: 1, duration: 0.26, ease: 'power2.out' }, 0.80);
  tl.to(cursor, { opacity: 0, duration: 0.16 }, 1.00);

  /* D3: Cursor reappears, moves to Appearance row */
  tl.to(cursor, { left: 673, top: 194, opacity: 1, duration: 0.44 }, 1.22);
  tl.to(appearLight, { backgroundColor: '#d0e5f8', duration: 0.18 }, 1.60);

  /* D4: Cascading submenu slides in */
  tl.to(submenuLight, { opacity: 1, scaleX: 1, duration: 0.24, ease: 'power2.out' }, 1.80);

  /* D5: Cursor moves to "Dark mode" item */
  tl.to(cursor, { left: 477, top: 231, duration: 0.34 }, 2.00);
  tl.to(smLightDark, { backgroundColor: '#d0e5f8', duration: 0.18 }, 2.32);

  /* D6: Click "Dark mode" — ripple + checkmark transfer */
  tl.to(cursor, { scale: 0.82, duration: 0.09, ease: 'power2.in'  }, 2.48);
  tl.to(cursor, { scale: 1.0,  duration: 0.11, ease: 'power2.out' }, 2.57);
  tl.add(() => clickAt(477, 231), 2.48);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, 2.70);

  tl.to('#check-light-light', { opacity: 0, scale: 0.6, duration: 0.20, ease: 'power2.in' }, 2.50);
  tl.fromTo('#sm-light-dark > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,   duration: 0.20, ease: 'power2.out' }
  , 2.70);

  /* D7: DUSK — horizon rises (dark layer sweeps bottom→top) */
  const duskStart = 3.00;

  // Pre-set dark dropdown fully open inside layer-dark — the clip-path hides it
  // until the mask rises past its position, revealing it naturally.
  tl.set(dropdownDark, { opacity: 1, scale: 1  }, duskStart - 0.01);
  tl.set(submenuDark,  { opacity: 1, scaleX: 1 }, duskStart - 0.01);

  tl.to(horizonLine, { opacity: 1, duration: 0.10 }, duskStart);
  tl.to(horizonLine, { y: 0,  duration: DUSK_DUR, ease: 'power2.inOut' }, duskStart);
  tl.to(layerDark,   { clipPath: 'inset(0% 0 0 0)', duration: DUSK_DUR, ease: 'power2.inOut' }, duskStart);

  // Fade out light dropdown as the dark mask sweeps through it
  const duskSweepStart = duskStart + DUSK_DUR * DUSK_ENTER;
  const duskSweepDur   = DUSK_DUR  * (DUSK_EXIT - DUSK_ENTER);
  tl.to([dropdownLight, submenuLight], { opacity: 0, duration: duskSweepDur, ease: 'none' }, duskSweepStart);

  const duskEnd = duskStart + DUSK_DUR;
  tl.to(horizonLine, { opacity: 0, duration: 0.28 }, duskEnd);

  /* D8: Dark dropdown is now fully visible — close it after a beat */
  tl.to(submenuDark,  { opacity: 0, scaleX: 0.92, duration: 0.22, ease: 'power2.in' }, duskEnd + 0.42);
  tl.to(dropdownDark, { opacity: 0, scale: 0.95,  duration: 0.24, ease: 'power2.in' }, duskEnd + 0.64);

  // Reset light dropdown state for next loop
  tl.add(() => {
    gsap.set(appearLight,               { clearProps: 'backgroundColor' });
    gsap.set(smLightDark,               { clearProps: 'backgroundColor' });
    gsap.set('#check-light-light',      { opacity: 1, scale: 1 });
    gsap.set('#sm-light-dark > .ts-check', { opacity: 0, scale: 0.6 });
  }, duskEnd + 1.02);

  /* ════════════════════════════════════════════════════════════════
     DAWN — Dark → Light  (≈500ms after dropdown fully closed)
  ════════════════════════════════════════════════════════════════ */

  // dropdown done at duskEnd + 0.88 → +0.5s pause → duskEnd + 1.38
  const dawnPhaseStart = duskEnd + 1.38;

  /* A1: Cursor appears at org pill (dark mode), clicks */
  tl.to(cursor, { left: 730, top: 22, opacity: 1, duration: 0.18 }, dawnPhaseStart);
  tl.to(cursor, { scale: 0.82, duration: 0.09, ease: 'power2.in'  }, dawnPhaseStart + 0.18);
  tl.to(cursor, { scale: 1.0,  duration: 0.11, ease: 'power2.out' }, dawnPhaseStart + 0.27);
  tl.add(() => clickAt(730, 22), dawnPhaseStart + 0.18);

  /* A2: Dark dropdown opens, cursor fades */
  tl.to(dropdownDark, { opacity: 1, scale: 1, duration: 0.26, ease: 'power2.out' }, dawnPhaseStart + 0.32);
  tl.to(cursor, { opacity: 0, duration: 0.16 }, dawnPhaseStart + 0.52);

  /* A3: Cursor reappears, moves to Appearance row (dark) */
  tl.to(cursor, { left: 673, top: 194, opacity: 1, duration: 0.44 }, dawnPhaseStart + 0.74);
  tl.to(appearDark, { backgroundColor: '#303136', duration: 0.18 }, dawnPhaseStart + 1.12);

  /* A4: Dark cascading submenu slides in */
  tl.to(submenuDark, { opacity: 1, scaleX: 1, duration: 0.24, ease: 'power2.out' }, dawnPhaseStart + 1.32);

  /* A5: Cursor moves to "Light mode" item */
  tl.to(cursor, { left: 477, top: 209, duration: 0.32 }, dawnPhaseStart + 1.52);
  tl.to(smDarkLight, { backgroundColor: '#303136', duration: 0.18 }, dawnPhaseStart + 1.82);

  /* A6: Click "Light mode" — ripple + checkmark transfer */
  tl.to(cursor, { scale: 0.82, duration: 0.09, ease: 'power2.in'  }, dawnPhaseStart + 1.98);
  tl.to(cursor, { scale: 1.0,  duration: 0.11, ease: 'power2.out' }, dawnPhaseStart + 2.07);
  tl.add(() => clickAt(477, 209), dawnPhaseStart + 1.98);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, dawnPhaseStart + 2.20);

  tl.to(checkDarkDark, { opacity: 0, scale: 0.6, duration: 0.20, ease: 'power2.in' }, dawnPhaseStart + 2.00);
  tl.fromTo('#sm-dark-light > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,   duration: 0.20, ease: 'power2.out' }
  , dawnPhaseStart + 2.20);

  /* A7: DAWN — horizon falls (light layer sweeps top→bottom) */
  const dawnStart = dawnPhaseStart + 2.36;

  tl.set(horizonLine, { y: 0 }, dawnStart - 0.01);
  tl.to(horizonLine, { opacity: 1, duration: 0.10 }, dawnStart);
  tl.to(horizonLine, { y: 380, duration: DAWN_DUR, ease: 'power2.inOut' }, dawnStart);
  tl.to(layerDark,   { clipPath: 'inset(100% 0 0 0)', duration: DAWN_DUR, ease: 'power2.inOut' }, dawnStart);
  // Dark dropdown is clipped away naturally as the mask retreats

  const dawnEnd = dawnStart + DAWN_DUR;
  tl.to(horizonLine, { opacity: 0, duration: 0.28 }, dawnEnd);

  /* ── Full reset for next loop ─────────────────────────────────── */
  const resetT = dawnEnd + 0.60;
  tl.set(dropdownLight, { opacity: 0, scale: 0.95 },  resetT);
  tl.set(dropdownDark,  { opacity: 0, scale: 0.95 },  resetT);
  tl.set(submenuLight,  { opacity: 0, scaleX: 0.92 }, resetT);
  tl.set(submenuDark,   { opacity: 0, scaleX: 0.92 }, resetT);
  tl.add(() => {
    gsap.set(appearDark,  { clearProps: 'backgroundColor' });
    gsap.set(smDarkLight, { clearProps: 'backgroundColor' });
    gsap.set(checkDarkDark,               { opacity: 1, scale: 1 });
    gsap.set('#sm-dark-light > .ts-check', { opacity: 0, scale: 0.6 });
  }, resetT);

  // Pause before loop restarts
  tl.set({}, {}, resetT + 0.60);
  return tl;
}

/* ── Boot ─────────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  // Inject ✓ SVG into "Dark mode" option (light dropdown) and "Light mode" option (dark dropdown)
  ['sm-light-dark', 'sm-dark-light'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.querySelector('.ts-check')) {
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
      el.appendChild(svg);
    }
  });

  initRadiance();
  buildTimeline();
});
