/**
 * Dark Mode Switch Splash — Animation v2 (Bidirectional Scale Loop)
 *
 * Full 9.8-second loop — two complete theme transitions:
 *
 *   Phase 1 (Light → Dark):
 *     Normal scale → dropdown opens → zoom in → submenu opens →
 *     Dark mode selected → theme switches → zoom out → dropdown closes
 *
 *   Phase 2 (Dark → Light):
 *     Normal scale → dark dropdown opens → zoom in → submenu opens →
 *     Light mode selected → theme switches → zoom out → dropdown closes
 *
 * No content fading — the background remains visible throughout the zoom.
 * Transform origin (96.7%, 33.2%) positions the expanded menus so
 * dropdown right edge ≈ frame right, all 3 submenu items visible.
 */

/* ── Config ─────────────────────────────────────────────────────── */
// ORIGIN oy=28% → y=106px: dropdown top (y=48) at frame y≈12px, submenu bottom at ≈393px
// Both give ~12px top/bottom breathing room at peak zoom.
const SCALE_PEAK   = 1.62;
const ORIGIN       = '96.7% 28%';
const EXPAND_DUR   = 0.76;
const COMPRESS_DUR = 1.02;

/* ── Element refs ─────────────────────────────────────────────────── */
const scaleWrapper  = document.getElementById('scale-wrapper');
const layerLight    = document.getElementById('layer-light');
const layerDark     = document.getElementById('layer-dark');
const dropdownLight = document.getElementById('dropdown-light');
const dropdownDark  = document.getElementById('dropdown-dark');
const submenuLight  = document.getElementById('submenu-light');
const submenuDark   = document.getElementById('submenu-dark');
const appearLight   = document.getElementById('appearance-item-light');
const checkLight    = document.getElementById('check-light-light');
const smLightDark   = document.getElementById('sm-light-dark');
const smDarkLight   = document.getElementById('sm-dark-light');
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
  tl.set(scaleWrapper,  { scale: 1, transformOrigin: ORIGIN });
  tl.set(layerDark,     { opacity: 0 });
  tl.set(layerLight,    { opacity: 1 });
  tl.set(cursor,        { left: 762, top: 22, opacity: 0 });
  tl.set([dropdownLight, dropdownDark], { opacity: 0, scale: 0.95 });
  tl.set([submenuLight, submenuDark],   { opacity: 0, scaleX: 0.92 });

  /* ════════════════════════════════════════════════════════════════
     PHASE 1 — Light → Dark  (t = 0 → 4.8s)
  ════════════════════════════════════════════════════════════════ */

  /* 1a: Dropdown opens at normal scale */
  tl.to(cursor, { opacity: 1, duration: 0.18 }, 0.38);
  tl.to(cursor, { scale: 0.75, duration: 0.10, ease: 'power2.in'  }, 0.56);
  tl.to(cursor, { scale: 1.0,  duration: 0.12, ease: 'power2.out' }, 0.66);
  tl.to(dropdownLight, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }, 0.70);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, 0.92);

  /* 1b: Zoom in */
  tl.to(scaleWrapper, { scale: SCALE_PEAK, duration: EXPAND_DUR }, 1.08);
  tl.to(appearLight,  { backgroundColor: '#eaedf2', duration: 0.20 }, 1.55);

  /* 1c: Submenu opens at peak zoom */
  tl.to(submenuLight, { opacity: 1, scaleX: 1, duration: 0.26, ease: 'power2.out' }, 1.96);
  tl.to(smLightDark,  { backgroundColor: '#eaedf2', duration: 0.18 }, 2.28);
  tl.to(checkLight,   { opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in' }, 2.44);
  tl.fromTo('#sm-light-dark > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , 2.66);

  /* 1d: Theme switch Light → Dark */
  tl.to(layerLight, { opacity: 0, duration: 0.22, ease: 'power1.in'  }, 2.82);
  tl.to(layerDark,  { opacity: 1, duration: 0.22, ease: 'power1.out' }, 2.82);
  tl.add(() => {
    // Toggle dropdown to dark theme; override GSAP inline bg values with dark equivalents
    dropdownLight.classList.add('dropdown-dark');
    gsap.set(appearLight, { backgroundColor: '#303136' });
    gsap.set(smLightDark,  { backgroundColor: '#303136' });
  }, 2.82);

  /* 1e: Zoom out */
  tl.to(scaleWrapper, { scale: 1.0, duration: COMPRESS_DUR }, 3.06);

  /* 1f: Close submenu, then dropdown at normal scale */
  tl.to(submenuLight,  { opacity: 0, scaleX: 0.92, duration: 0.20, ease: 'power2.in' }, 4.22);
  tl.to(dropdownLight, { opacity: 0, scale: 0.95,  duration: 0.22, ease: 'power2.in' }, 4.42);

  /* 1g: Cleanup — revert dropdown to light theme (invisible at this point) */
  tl.add(() => {
    dropdownLight.classList.remove('dropdown-dark');
    gsap.set(appearLight, { clearProps: 'backgroundColor' });
    gsap.set(smLightDark,  { clearProps: 'backgroundColor' });
    gsap.set(checkLight,              { opacity: 1, scale: 1 });
    gsap.set('#sm-light-dark > .ts-check', { opacity: 0, scale: 0.6 });
  }, 4.88);

  /* ════════════════════════════════════════════════════════════════
     PHASE 2 — Dark → Light  (t = 5.1 → 9.8s)
  ════════════════════════════════════════════════════════════════ */

  /* 2a: Dark dropdown opens at normal scale */
  tl.to(cursor, { opacity: 1, duration: 0.18 }, 5.28);
  tl.to(cursor, { scale: 0.75, duration: 0.10, ease: 'power2.in'  }, 5.46);
  tl.to(cursor, { scale: 1.0,  duration: 0.12, ease: 'power2.out' }, 5.56);
  tl.to(dropdownDark, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }, 5.60);
  tl.to(cursor, { opacity: 0, duration: 0.18 }, 5.82);

  /* 2b: Zoom in */
  tl.to(scaleWrapper, { scale: SCALE_PEAK, duration: EXPAND_DUR }, 5.98);
  // Appearance row in dropdownDark already has hover bg via HTML inline style

  /* 2c: Submenu opens at peak zoom */
  tl.to(submenuDark, { opacity: 1, scaleX: 1, duration: 0.26, ease: 'power2.out' }, 6.86);
  tl.to(smDarkLight, { backgroundColor: '#303136', duration: 0.18 }, 7.18);
  // Remove ✓ from Dark mode, add ✓ to Light mode
  tl.to('#sm-dark-dark > .ts-check',
    { opacity: 0, scale: 0.6, duration: 0.22, ease: 'power2.in' }
  , 7.34);
  tl.fromTo('#sm-dark-light > .ts-check',
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1,  duration: 0.22, ease: 'power2.out' }
  , 7.56);

  /* 2d: Theme switch Dark → Light */
  tl.to(layerDark,  { opacity: 0, duration: 0.22, ease: 'power1.in'  }, 7.72);
  tl.to(layerLight, { opacity: 1, duration: 0.22, ease: 'power1.out' }, 7.72);
  // Swap dark dropdown for light dropdown (same position, same scale)
  tl.set(dropdownDark, { opacity: 0 },                                          7.74);
  tl.set(submenuDark,  { opacity: 0, scaleX: 0.92 },                            7.74);
  tl.to(dropdownLight, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, 7.76);

  /* 2e: Zoom out */
  tl.to(scaleWrapper, { scale: 1.0, duration: COMPRESS_DUR }, 7.96);

  /* 2f: Close light dropdown at normal scale */
  tl.to(dropdownLight, { opacity: 0, scale: 0.95, duration: 0.22, ease: 'power2.in' }, 9.10);

  /* ── Full reset for next loop iteration ─────────────────────── */
  tl.set(dropdownLight, { opacity: 0, scale: 0.95 },  9.50);
  tl.set(dropdownDark,  { opacity: 0, scale: 0.95 },  9.50);
  tl.set(submenuLight,  { opacity: 0, scaleX: 0.92 }, 9.50);
  tl.set(submenuDark,   { opacity: 0, scaleX: 0.92 }, 9.50);
  tl.add(() => {
    gsap.set(smDarkLight, { clearProps: 'backgroundColor' });
    gsap.set('#sm-dark-dark > .ts-check',  { opacity: 1, scale: 1 });
    gsap.set('#sm-dark-light > .ts-check', { opacity: 0, scale: 0.6 });
  }, 9.50);

  /* Extend timeline so light-mode idle is visible before next loop */
  tl.set({}, {}, 9.80);

  return tl;
}

/* ── Boot ─────────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  /* Inject ✓ SVG into #sm-light-dark (Light→Dark transition) */
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
    const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p1.setAttribute('d', 'M2 7l3.5 3.5L12 3');
    svg.appendChild(p1);
    smLightDarkEl.appendChild(svg);
  }

  /* Inject ✓ SVG into #sm-dark-light (Dark→Light transition) */
  const smDarkLightEl = document.getElementById('sm-dark-light');
  if (smDarkLightEl && !smDarkLightEl.querySelector('.ts-check')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ts-check');
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.style.cssText = 'opacity:0;transform:scale(0.6)';
    const p2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p2.setAttribute('d', 'M2 7l3.5 3.5L12 3');
    svg.appendChild(p2);
    smDarkLightEl.appendChild(svg);
  }

  initRadiance();
  buildTimeline();
});
