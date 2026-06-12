/**
 * Dark Mode Switch Splash — Animation v3: "The Horizon"
 *
 * Masked reveal mechanic — no class-toggle:
 *
 *   DUSK (Light → Dark):
 *     The dark layer (clip-path) rises from the bottom.
 *     dropdown-dark lives INSIDE layer-dark, so the clip reveals it
 *     naturally — exactly as night sweeps over it.
 *     The light dropdown (overlay) fades out linearly as the mask
 *     sweeps from the dropdown bottom to the dropdown top.
 *
 *   DAWN (Dark → Light):
 *     The clip retreats downward. dropdown-dark disappears with it.
 *     The light dropdown fades in as the mask retreats past the dropdown.
 *
 * Mask geometry (content area = 380px tall):
 *   clip-path: inset(T% 0 0 0)  — top edge of visible dark area = T%×380
 *   Dusk: T 100%→0%  (horizon rises, y = T×380 moves bottom→top)
 *   Dawn: T 0%→100%  (horizon falls, y = T×380 moves top→bottom)
 *
 *   Dropdown card spans y=48 to y≈250.
 *   Dusk  sweep: mask enters at y=250 (T=65.8%, progress=34.2%)
 *                mask exits  at y=48  (T=12.6%, progress=87.4%)
 *   Dawn  sweep: mask enters at y=48  (T=12.6%, progress=12.6%)
 *                mask exits  at y=250 (T=65.8%, progress=65.8%)
 */

/* ── Config ─────────────────────────────────────────────────────── */
const DUSK_DUR = 1.02;
const DAWN_DUR = 1.02;

// Mask sweep geometry over the dropdown card (y=48 to y=250)
const DUSK_ENTER = 0.342;   // progress when mask bottom-edge reaches dropdown bottom
const DUSK_EXIT  = 0.874;   // progress when mask clears the dropdown top
const DAWN_ENTER = 0.126;   // progress when descending mask enters dropdown top
const DAWN_EXIT  = 0.658;   // progress when descending mask clears dropdown bottom
const SWEEP_FADE = 'none';  // linear fade to match linear mask movement

/* ── Element refs ─────────────────────────────────────────────────── */
const layerDark     = document.getElementById('layer-dark');
const dropdownLight = document.getElementById('dropdown-light');
const dropdownDark  = document.getElementById('dropdown-dark');
const submenuLight  = document.getElementById('submenu-light');
const submenuDark   = document.getElementById('submenu-dark');
const appearLight   = document.getElementById('appearance-item-light');
const checkLight    = document.getElementById('check-light-light');
const smLightDark   = document.getElementById('sm-light-dark');
const smDarkLight   = document.getElementById('sm-dark-light');
const horizonLine   = document.getElementById('horizon-line');
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

/* ── Timeline ─────────────────────────────────────────────────────── */
function buildTimeline() {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

  /* ── Initial state ───────────────────────────────────────────── */
  tl.set(layerDark,    { clipPath: 'inset(100% 0 0 0)' });
  tl.set(horizonLine,  { opacity: 0, y: 380 });
  tl.set(cursor,       { left: 762, top: 22, opacity: 0 });
  tl.set([dropdownLight, dropdownDark], { opacity: 0, scale: 0.95 });
  tl.set([submenuLight, submenuDark],   { opacity: 0, scaleX: 0.92 });

  /* ════════════════════════════════════════════════════════════════
     DUSK — Light → Dark  (t = 0 → 4.4s)
  ════════════════════════════════════════════════════════════════ */

  /* D1: Avatar click, light dropdown opens at normal scale */
  tl.to(cursor, { opacity: 1, duration: 0.18 }, 0.38);
  tl.to(cursor, { scale: 0.75, duration: 0.10, ease: 'power2.in'  }, 0.56);
  tl.to(cursor, { scale: 1.0,  duration: 0.12, ease: 'power2.out' }, 0.66);
  tl.to(dropdownLight, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }, 0.70);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, 0.92);

  /* D2: Cursor to Appearance, submenu opens */
  tl.to(appearLight, { backgroundColor: '#eaedf2', duration: 0.20 }, 1.30);
  tl.to(submenuLight, { opacity: 1, scaleX: 1, duration: 0.26, ease: 'power2.out' }, 1.52);
  tl.to(smLightDark,  { backgroundColor: '#eaedf2', duration: 0.18 }, 1.82);

  /* D3: Checkmarks transfer */
  tl.to(checkLight, { opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in' }, 1.98);
  tl.fromTo('#sm-light-dark > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , 2.20);

  /* D4: DUSK — clip rises, horizon glow tracks it */
  const duskStart = 2.46;
  tl.to(horizonLine, { opacity: 1, duration: 0.12 }, duskStart);
  tl.to(horizonLine, { y: 0, duration: DUSK_DUR, ease: 'power2.inOut' }, duskStart);
  tl.to(layerDark, { clipPath: 'inset(0% 0 0 0)', duration: DUSK_DUR, ease: 'power2.inOut' }, duskStart);

  /* Also open dropdownDark (inside clip) at dusk start so it's ready */
  tl.to(dropdownDark, { opacity: 1, scale: 1, duration: 0.20, ease: 'power2.out' }, duskStart);
  tl.to(submenuDark,  { opacity: 1, scaleX: 1, duration: 0.18, ease: 'power2.out' }, duskStart + 0.06);

  /* As mask sweeps over light dropdown, fade it out linearly (mask-synced) */
  const duskSweepDur = DUSK_DUR * (DUSK_EXIT - DUSK_ENTER); // duration mask crosses dropdown
  tl.to([dropdownLight, submenuLight], {
    opacity: 0,
    duration: duskSweepDur,
    ease: SWEEP_FADE,
  }, duskStart + DUSK_DUR * DUSK_ENTER);

  /* D5: Glow fades after dusk settles */
  const duskEnd = duskStart + DUSK_DUR;
  tl.to(horizonLine, { opacity: 0, duration: 0.30 }, duskEnd);

  /* D6: Dark dropdown closes (after dusk) */
  tl.to(submenuDark,   { opacity: 0, scaleX: 0.92, duration: 0.22, ease: 'power2.in' }, duskEnd + 0.34);
  tl.to(dropdownDark,  { opacity: 0, scale: 0.95,  duration: 0.24, ease: 'power2.in' }, duskEnd + 0.56);

  /* D7: Cleanup — reset light dropdown state for next iteration */
  const duskClean = duskEnd + 0.92;
  tl.add(() => {
    gsap.set(appearLight, { clearProps: 'backgroundColor' });
    gsap.set(smLightDark,  { clearProps: 'backgroundColor' });
    gsap.set(checkLight,              { opacity: 1, scale: 1 });
    gsap.set('#sm-light-dark > .ts-check', { opacity: 0, scale: 0.6 });
  }, duskClean);

  /* ════════════════════════════════════════════════════════════════
     DAWN — Dark → Light  (t = 4.7 → 8.5s)
  ════════════════════════════════════════════════════════════════ */

  const dawnPhaseStart = 4.72;

  /* A1: Dark dropdown opens at normal scale */
  tl.to(cursor, { opacity: 1, duration: 0.18 }, dawnPhaseStart);
  tl.to(cursor, { scale: 0.75, duration: 0.10, ease: 'power2.in'  }, dawnPhaseStart + 0.18);
  tl.to(cursor, { scale: 1.0,  duration: 0.12, ease: 'power2.out' }, dawnPhaseStart + 0.28);
  tl.to(dropdownDark,  { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }, dawnPhaseStart + 0.32);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, dawnPhaseStart + 0.52);

  /* A2: Submenu opens */
  tl.to(submenuDark, { opacity: 1, scaleX: 1, duration: 0.26, ease: 'power2.out' }, dawnPhaseStart + 0.98);
  tl.to(smDarkLight,  { backgroundColor: '#303136', duration: 0.18 }, dawnPhaseStart + 1.28);

  /* A3: Checkmarks transfer */
  tl.to('#sm-dark-dark > .ts-check', {
    opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in'
  }, dawnPhaseStart + 1.44);
  tl.fromTo('#sm-dark-light > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , dawnPhaseStart + 1.66);

  /* A4: DAWN — clip descends, glow tracks it */
  const dawnStart = dawnPhaseStart + 1.92;
  tl.set(horizonLine, { y: 0 }, dawnStart - 0.01);
  tl.to(horizonLine, { opacity: 1, duration: 0.12 }, dawnStart);
  tl.to(horizonLine, { y: 380, duration: DAWN_DUR, ease: 'power2.inOut' }, dawnStart);
  tl.to(layerDark, { clipPath: 'inset(100% 0 0 0)', duration: DAWN_DUR, ease: 'power2.inOut' }, dawnStart);

  /* As mask retreats past light dropdown, fade it IN linearly (mask-synced) */
  const dawnSweepDur = DAWN_DUR * (DAWN_EXIT - DAWN_ENTER);
  tl.to(dropdownLight, {
    opacity: 1,
    scale: 1,
    duration: dawnSweepDur,
    ease: SWEEP_FADE,
  }, dawnStart + DAWN_DUR * DAWN_ENTER);

  /* A5: Glow fades after dawn settles */
  const dawnEnd = dawnStart + DAWN_DUR;
  tl.to(horizonLine, { opacity: 0, duration: 0.30 }, dawnEnd);

  /* A6: Light dropdown closes */
  tl.to(dropdownLight, { opacity: 0, scale: 0.95, duration: 0.24, ease: 'power2.in' }, dawnEnd + 0.60);

  /* ── Full reset for next loop ─────────────────────────────────── */
  const resetT = dawnEnd + 0.98;
  tl.set(dropdownLight, { opacity: 0, scale: 0.95 },  resetT);
  tl.set(dropdownDark,  { opacity: 0, scale: 0.95 },  resetT);
  tl.set(submenuLight,  { opacity: 0, scaleX: 0.92 }, resetT);
  tl.set(submenuDark,   { opacity: 0, scaleX: 0.92 }, resetT);
  tl.add(() => {
    gsap.set(smDarkLight, { clearProps: 'backgroundColor' });
    gsap.set('#sm-dark-dark > .ts-check',  { opacity: 1, scale: 1 });
    gsap.set('#sm-dark-light > .ts-check', { opacity: 0, scale: 0.6 });
  }, resetT);

  tl.set({}, {}, resetT + 0.30);
  return tl;
}

/* ── Boot ─────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
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
