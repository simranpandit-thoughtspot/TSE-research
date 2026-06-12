import React, { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import type { AppSidebarProps, SidebarTab, SidebarCategory, ScopeToggle } from '../../components/AppSidebar';
import type { GlobalHeaderProps } from '../../components/GlobalHeader';
import { systemColors, referenceColors } from '../../tokens/colors';

type View = 'main' | 'edit';
type Iteration = 1 | 2 | 3;
type Iter2SubView = 'settings' | 'preview';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const blue = systemColors.light['content-brand'];
const divider = systemColors.light['border-divider'];
const border = systemColors.light['border-default'];
const primary = systemColors.light['content-primary'];
const secondary = systemColors.light['content-secondary'];

// ─── Sidebar data ──────────────────────────────────────────────────────────────

type SidebarTabId = 'insights' | 'data' | 'develop' | 'admin';

const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights' },
  { id: 'data', label: 'Data', headerTitle: 'Data Workspace' },
  { id: 'develop', label: 'Develop', headerTitle: 'Develop' },
  { id: 'admin', label: 'Admin', headerTitle: 'Admin' },
];

const SIDEBAR_CATEGORIES: Record<SidebarTabId, SidebarCategory[]> = {
  insights: [{ title: '', items: [{ id: 'home', label: 'Home' }] }],
  data: [{ title: '', items: [{ id: 'data-objects', label: 'Data objects' }] }],
  develop: [{ title: '', items: [{ id: 'playground', label: 'Playground' }] }],
  admin: [
    { title: '', items: [
      { id: 'home', label: 'Home' },
      { id: 'org-management', label: 'Org management' },
      { id: 'user-management', label: 'User management' },
    ]},
    { title: 'MANAGEMENT', items: [
      { id: 'feature-management', label: 'Feature management' },
      { id: 'variables', label: 'Variables' },
      { id: 'version-control', label: 'Version control' },
    ]},
    { title: 'CONFIGURATION', items: [
      { id: 'application-settings', label: 'Application settings' },
      { id: 'customisation', label: 'Customisation' },
      { id: 'ai-settings', label: 'AI settings' },
      { id: 'search-spot-iq', label: 'Search & Spot IQ' },
    ]},
    { title: 'MONITOR', items: [
      { id: 'user-adoption', label: 'Usage & adoption' },
      { id: 'performance-tracking', label: 'performance tracking' },
      { id: 'ai-bi-stats', label: 'AI & BI stats' },
      { id: 'billing-query-stats', label: 'Billing query stats' },
    ]},
  ],
};

// ─── Toggle ────────────────────────────────────────────────────────────────────

const Toggle: React.FC<{ checked: boolean; onChange?: () => void; disabled?: boolean }> = ({ checked, onChange, disabled }) => (
  <button
    onClick={disabled ? undefined : onChange}
    role="switch"
    aria-checked={checked}
    style={{
      position: 'relative', width: 36, height: 20, borderRadius: 10, border: 'none',
      backgroundColor: checked ? (disabled ? `${blue}88` : blue) : referenceColors.gray['30'],
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0, flexShrink: 0, transition: 'background-color 0.2s ease',
      opacity: disabled ? 0.75 : 1,
    }}
  >
    <span style={{
      position: 'absolute', top: 2, left: checked ? 18 : 2, width: 16, height: 16,
      borderRadius: '50%', backgroundColor: '#fff', transition: 'left 0.2s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
    }} />
  </button>
);

// ─── Iteration switcher chip ───────────────────────────────────────────────────

const IterationSwitcher: React.FC<{ current: Iteration; onChange: (i: Iteration) => void }> = ({ current, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', background: systemColors.light['background-subtle'], borderRadius: 999, padding: '3px 3px 3px 10px', gap: 2 }}>
    <span style={{ fontSize: 11, color: secondary, fontFamily: font, marginRight: 4, fontWeight: 500 }}>Iteration</span>
    {([1, 2, 3] as Iteration[]).map(i => (
      <button key={i} onClick={() => onChange(i)} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: current === i ? blue : 'transparent', color: current === i ? '#fff' : secondary, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: 'pointer', transition: 'background 0.15s' }}>
        {i}
      </button>
    ))}
  </div>
);

// ─── Shared page shell ────────────────────────────────────────────────────────

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ height: '100%', overflowY: 'auto', backgroundColor: '#FFFFFF' }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '28px 40px 0', borderBottom: `1px solid ${divider}` }}>
      <h1 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 700, color: primary, fontFamily: font, letterSpacing: '-0.3px', flexShrink: 0 }}>
        Customisations
      </h1>
      <div style={{ width: 1, height: 24, background: border, margin: '0 24px 16px', flexShrink: 0 }} />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        {['Style', 'Chart', 'Homepage', 'Email', 'Help'].map(tab => (
          <button key={tab} style={{ padding: '0 14px 16px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: font, fontSize: 13.5, fontWeight: tab === 'Email' ? 600 : 400, color: tab === 'Email' ? blue : secondary, borderBottom: tab === 'Email' ? `2px solid ${blue}` : '2px solid transparent', marginBottom: -1, whiteSpace: 'nowrap' }}>
            {tab}
          </button>
        ))}
      </div>
    </div>
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 40px 64px', boxSizing: 'border-box' as const }}>
      {children}
    </div>
  </div>
);

// ─── Tertiary link button ──────────────────────────────────────────────────────

const TertiaryBtn: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button onClick={onClick} style={{ background: 'none', border: 'none', color: blue, fontSize: 13, fontWeight: 500, fontFamily: font, cursor: 'pointer', padding: 0 }}>
    {label}
  </button>
);

// ─── Card wrapper ──────────────────────────────────────────────────────────────

const EmailCard: React.FC<{
  actions: React.ReactNode;
  chevron?: boolean;
  children: React.ReactNode;
}> = ({ actions, chevron, children }) => (
  <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${border}`, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: `1px solid ${divider}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {chevron && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5.5l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: primary, fontFamily: font }}>Email customisations</div>
          <div style={{ fontSize: 12, color: secondary, marginTop: 2, fontFamily: font }}>Manage the common appearance settings applied to all your customer emails</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexShrink: 0 }}>
        {actions}
      </div>
    </div>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ITERATION 1
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Iter1 email preview (Coca-Cola KPI alert) ─────────────────────────────────

const Iter1EmailBody: React.FC = () => (
  <div style={{ fontFamily: font, color: '#1D232F' }}>

    {/* Logo placeholder */}
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'inline-block', border: '1.5px dashed #9CA3AF', borderRadius: 4, padding: '7px 14px', fontSize: 13, color: '#6B7280' }}>
        Mixed Logo
      </div>
    </div>

    {/* Heading */}
    <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1D232F', margin: '0 0 24px', lineHeight: 1.25 }}>
      Scheduled update: 'Monthly Active Users' up 10%
    </h2>

    {/* KPI card */}
    <div style={{ background: '#B2DFCA', borderRadius: 8, marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.4)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: 0.8, marginBottom: 8 }}>CURRENT (1/12/23)</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: '#1D232F', lineHeight: 1 }}>88.2M</div>
      </div>
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: 0.8, marginBottom: 4 }}>% CHANGE</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: '#1D232F', display: 'flex', alignItems: 'center', gap: 6 }}>
            20.74%
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, background: '#2770EF', borderRadius: 4, fontSize: 12, color: '#fff' }}>↗</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: 0.8, marginBottom: 4 }}>LAST (12/29/22)</div>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#374151' }}>79.9M</div>
        </div>
      </div>
    </div>

    {/* CTA button with gradient border */}
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'inline-block', background: 'linear-gradient(to right, #3B82F6, #EC4899, #F97316)', borderRadius: 999, padding: 2 }}>
        <button style={{ display: 'block', background: '#1D232F', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 32px', fontSize: 14, fontWeight: 500, fontFamily: font, cursor: 'default' }}>
          View KPI
        </button>
      </div>
    </div>

    {/* Alert details */}
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 0.8, marginBottom: 8 }}>ALERT DETAILS:</div>
      <div style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.8 }}>
        Alert name: Alert on MAU<br />
        KPI value: 40200000<br />
        Threshold condition: Increased by 10%<br />
        Alert checked for threshold condition on 1st of every month 9AM PST
      </div>
    </div>

    {/* Note from creator */}
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 0.8, marginBottom: 8 }}>NOTE FROM CREATOR:</div>
      <div style={{ fontSize: 13.5, color: '#374151' }}>"Keep the overall's company in health when viewing this KPI"</div>
    </div>

    {/* Divider */}
    <div style={{ borderTop: '1px solid #E5E7EB', marginBottom: 28 }} />

    {/* Mobile app section */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 28 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1D232F', marginBottom: 8 }}>Want data at your fingertips?</div>
        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 16, lineHeight: 1.5 }}>Scan the QR code to download the latest ThoughtSpot mobile app on your phone.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ background: '#000', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M11.182 9.82c-.18.32-.27.49-.45.78-.29.46-.7 1.03-1.2 1.04-.45.01-.56-.29-1.17-.29-.6 0-.73.3-1.18.3-.5.01-.89-.52-1.18-.98-.8-1.26-.88-2.74-.39-3.53.35-.57.9-.9 1.42-.9.53 0 .86.29 1.3.29.43 0 .69-.29 1.31-.29.47 0 .96.26 1.31.7-.32.18-.96.65-.96 1.49 0 .95.68 1.39.89 1.49zM8.66 4.5c.25-.31.44-.74.44-1.17 0-.06 0-.12-.01-.17-.42.01-.91.28-1.2.6-.26.29-.48.73-.48 1.17 0 .06 0 .13.01.18.04 0 .07.01.1.01.4 0 .87-.25 1.14-.62z"/></svg>
            <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8, lineHeight: 1 }}>Download on the</div><div style={{ fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>App Store</div></div>
          </div>
          <div style={{ background: '#000', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.5 2.3L9.3 8l-6.8 5.7a1 1 0 01-.5-.87V3.17a1 1 0 01.5-.87zm10.6 4.53l1.4.82a1 1 0 010 1.7l-1.4.82L11 8l2.1-1.17zM3.2 1.6L10 5.8 8.5 7.28 2.5 1.9a1 1 0 01.7-.3zm6.8 8.62l-6.8 3.82a1 1 0 01-.7-.28l6-5.4L10 9.78l.01.44z" fill="white"/></svg>
            <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8, lineHeight: 1 }}>GET IT ON</div><div style={{ fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>Google Play</div></div>
          </div>
        </div>
      </div>
      {/* Phone mockup with QR */}
      <div style={{ flexShrink: 0, width: 110, height: 130, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)', opacity: 0.15 }} />
        <div style={{ position: 'relative', width: 72, height: 120, margin: '5px auto 0', background: '#1D232F', borderRadius: 12, border: '3px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 48, height: 48, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="#1D232F" strokeWidth="1.5"/>
              <rect x="5" y="5" width="6" height="6" fill="#1D232F"/>
              <rect x="22" y="2" width="12" height="12" rx="1.5" stroke="#1D232F" strokeWidth="1.5"/>
              <rect x="25" y="5" width="6" height="6" fill="#1D232F"/>
              <rect x="2" y="22" width="12" height="12" rx="1.5" stroke="#1D232F" strokeWidth="1.5"/>
              <rect x="5" y="25" width="6" height="6" fill="#1D232F"/>
              <rect x="22" y="22" width="4" height="4" fill="#1D232F"/>
              <rect x="30" y="22" width="4" height="4" fill="#1D232F"/>
              <rect x="22" y="30" width="4" height="4" fill="#1D232F"/>
              <rect x="30" y="30" width="4" height="4" fill="#1D232F"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div style={{ borderTop: '1px solid #E5E7EB', marginBottom: 24 }} />

    {/* Footer */}
    <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
      <div style={{ marginBottom: 10 }}>You are receiving this email because you are subscribed to threshold alert on Thoughtspot</div>
      <div style={{ marginBottom: 20 }}>
        <a href="#" style={{ color: blue, textDecoration: 'none' }}>Modify Alert</a>
        <span style={{ margin: '0 8px', color: '#D1D5DB' }}>|</span>
        <a href="#" style={{ color: blue, textDecoration: 'none' }}>Unsubscribe</a>
      </div>
      <div style={{ fontWeight: 600, color: '#374151', lineHeight: 2 }}>
        Mixed<br />Company<br />Signature
      </div>
    </div>
  </div>
);

// ─── Iter1 preview modal ───────────────────────────────────────────────────────

const Iter1PreviewModal: React.FC<{ onClose: () => void; onEdit: () => void }> = ({ onClose, onEdit }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div style={{ background: '#fff', borderRadius: 16, width: 788, maxHeight: '82vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.18)', fontFamily: font }}>
      <div style={{ padding: '18px 24px', borderBottom: `1px solid ${divider}` }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: primary, margin: 0 }}>Preview Email</h2>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <Iter1EmailBody />
      </div>
      <div style={{ padding: '14px 24px', borderTop: `1px solid ${divider}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button onClick={onClose} style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${border}`, background: '#fff', color: primary, fontSize: 14, fontWeight: 500, fontFamily: font, cursor: 'pointer' }}>Close</button>
        <button onClick={() => { onClose(); onEdit(); }} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: blue, color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer' }}>Edit</button>
      </div>
    </div>
  </div>
);

// ─── Iter1 setting rows ────────────────────────────────────────────────────────

const rowBase: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 20px', borderBottom: `1px solid ${divider}`, fontSize: 14, color: primary, fontFamily: font };

const Iter1Card: React.FC<{ onPreview: () => void; onEdit: () => void }> = ({ onPreview, onEdit }) => (
  <EmailCard actions={<><TertiaryBtn label="Preview" onClick={onPreview} /><TertiaryBtn label="Edit" onClick={onEdit} /></>}>
    <div style={rowBase}><span>Logo</span><span style={{ fontSize: 13, color: secondary }}>Same as styling</span></div>
    {[['Button Color', '#E61D2B'], ['Button text colour', '#E61D2B'], ['Primary content background color', '#E61D2B']].map(([label, hex]) => (
      <div key={label} style={rowBase}>
        <span>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 15, height: 15, borderRadius: 3, background: hex, border: `1px solid ${border}` }} />
          <span style={{ fontSize: 13, color: secondary }}>{hex} (Default)</span>
        </div>
      </div>
    ))}
    {['Product name', 'Phone number', 'Address', 'Mobile app nudge', 'Modify alert', 'Unsubscribe link', 'Error message'].map(label => (
      <div key={label} style={rowBase}><span>{label}</span><span style={{ fontSize: 13, color: secondary }}>Shown</span></div>
    ))}
    <div style={rowBase}><span>Company signature</span><span style={{ fontSize: 13, color: secondary, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>444 Castro St, Suite 1000 Mountain View, C...</span></div>
    <div style={rowBase}><span>Privacy policy</span><span style={{ fontSize: 13, color: secondary, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://www.thoughtspot.com/privacy-stat...</span></div>
    <div style={rowBase}><span>Contact support</span><span style={{ fontSize: 13, color: secondary }}>https://www.thoughtspot.com/support</span></div>
    <div style={rowBase}><span>Manage notification preferences</span><Toggle checked onChange={() => {}} /></div>
    <div style={rowBase}><span>Company website URL</span><span style={{ fontSize: 13, color: secondary }}>https://www.thoughtspot.com</span></div>
  </EmailCard>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ITERATION 2
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Disabled field primitives ─────────────────────────────────────────────────

const DisabledInput: React.FC<{ value: string }> = ({ value }) => (
  <div style={{ minWidth: 200, maxWidth: 240, height: 34, padding: '0 10px', border: `1px solid ${border}`, borderRadius: 8, background: '#F9FAFB', display: 'flex', alignItems: 'center', opacity: 0.8 }}>
    <span style={{ fontSize: 13, color: secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: font }}>{value}</span>
  </div>
);

const DisabledColorPicker: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 10px', border: `1px solid ${border}`, borderRadius: 8, background: '#F9FAFB', cursor: 'not-allowed', opacity: 0.8 }}>
    <div style={{ width: 18, height: 18, borderRadius: 4, background: color, border: `1px solid ${border}`, flexShrink: 0 }} />
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" /></svg>
  </div>
);

// ─── ThoughtSpot logo for email preview ───────────────────────────────────────

const TSLogo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2z" fill="#1D232F"/>
      <path d="M9 10h10M14 10v8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
    <span style={{ fontSize: 16, fontWeight: 700, color: '#1D232F', fontFamily: font, letterSpacing: '-0.3px' }}>ThoughtSpot</span>
  </div>
);

// ─── Iter2 inline email preview (ThoughtSpot test email) ──────────────────────

const Iter2EmailPreview: React.FC = () => (
  <div style={{ background: '#F6F8FA', borderRadius: 8, padding: 24, fontFamily: font }}>
    <div style={{ fontSize: 11, color: secondary, marginBottom: 4 }}>Sample email</div>
    <div style={{ fontSize: 18, fontWeight: 700, color: primary, marginBottom: 20 }}>Test email</div>

    {/* Email card */}
    <div style={{ background: '#fff', borderRadius: 8, border: `1px solid ${border}`, overflow: 'hidden' }}>
      <div style={{ padding: '24px 28px 20px' }}>
        <TSLogo />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: primary, margin: '0 0 16px', lineHeight: 1.3 }}>
          Test Email to Validate Email White labelling
        </h2>

        {/* Vocabulary update list */}
        <div style={{ background: '#F9FAFB', border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
          {["You have updated \"Answer\" to Answer", "You have updated \"Liveboard\" to Liveboard", "You have updated \"SpotIQ\" to SpotIQ"].map(line => (
            <div key={line} style={{ fontSize: 13.5, color: primary, padding: '3px 0' }}>{line}</div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginBottom: 28 }}>
          <button style={{ background: '#1D232F', color: '#fff', border: '2px solid #E61D2B', borderRadius: 999, padding: '10px 28px', fontSize: 14, fontWeight: 500, fontFamily: font, cursor: 'default' }}>
            Test CTA
          </button>
        </div>

        {/* Vocabulary definitions */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: primary, marginBottom: 6 }}>Sample vocabulary definitions for Answer:</div>
          <div style={{ fontSize: 13, color: secondary, lineHeight: 1.6 }}>What's an Answer? An Answer is a personalised, actionable insight created through search. You can see Answer that you and others have saved on the Answer page.</div>
        </div>
        <div style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: primary, marginBottom: 6 }}>Sample vocabulary definitions for Liveboard:</div>
          <div style={{ fontSize: 13, color: secondary, lineHeight: 1.6 }}>What's a Liveboard? Unlike static dashboards that show you outdated insights based on stale data, Liveboard offer a live and fully interactive view of all your cloud data so you can create personalised, actionable insights at the point of impact.</div>
        </div>
      </div>

      {/* Mobile app section */}
      <div style={{ background: '#F9FAFB', borderTop: `1px solid ${border}`, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: primary, marginBottom: 8 }}>Want data at your fingertips?</div>
          <div style={{ fontSize: 13, color: secondary, marginBottom: 16, lineHeight: 1.5 }}>Scan the QR code to download the latest ThoughtSpot mobile app on your phone.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {/* App Store badge */}
            <div style={{ background: '#000', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5z" fill="#fff" opacity="0.2"/><path d="M4.5 9.5L7 5l2.5 4.5M5.5 7.5h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8 }}>Download on the</div><div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>App Store</div></div>
            </div>
            {/* Play Store badge */}
            <div style={{ background: '#000', borderRadius: 6, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2l8 5-8 5V2z" fill="#fff" opacity="0.8"/></svg>
              <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8 }}>GET IT ON</div><div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>Google Play</div></div>
            </div>
          </div>
        </div>
        {/* QR code placeholder */}
        <div style={{ width: 72, height: 72, border: `1px solid ${border}`, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#374151" strokeWidth="2"/>
            <rect x="8" y="8" width="8" height="8" fill="#374151"/>
            <rect x="28" y="4" width="16" height="16" rx="2" stroke="#374151" strokeWidth="2"/>
            <rect x="32" y="8" width="8" height="8" fill="#374151"/>
            <rect x="4" y="28" width="16" height="16" rx="2" stroke="#374151" strokeWidth="2"/>
            <rect x="8" y="32" width="8" height="8" fill="#374151"/>
            <rect x="28" y="28" width="4" height="4" fill="#374151"/>
            <rect x="36" y="28" width="4" height="4" fill="#374151"/>
            <rect x="28" y="36" width="4" height="4" fill="#374151"/>
            <rect x="36" y="36" width="8" height="8" fill="#374151"/>
          </svg>
        </div>
      </div>

      {/* Error section */}
      <div style={{ borderTop: `1px solid ${border}`, padding: '20px 28px' }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: primary, marginBottom: 4 }}>Error details</div>
        <div style={{ fontSize: 12, color: secondary, marginBottom: 16 }}>Incident ID: 22187-ggh88810-dhaj211</div>

        <div style={{ fontSize: 13, color: secondary, marginBottom: 8 }}>You are receiving this notification because you have subscribed to ThoughtSpot</div>
        <div style={{ fontSize: 13, marginBottom: 20 }}>
          <a href="#" style={{ color: blue, textDecoration: 'none' }}>Modify alert</a>
          <span style={{ color: secondary, margin: '0 6px' }}>|</span>
          <a href="#" style={{ color: blue, textDecoration: 'none' }}>Unsubscribe</a>
        </div>

        <div style={{ fontSize: 13, color: secondary, lineHeight: 1.7 }}>
          ThoughtSpot<br />
          (800) 508-7008<br />
          444 Castro St, Suite 1000 Mountain View, CA 94041
        </div>
        <div style={{ fontSize: 13, marginTop: 8 }}>
          <a href="#" style={{ color: blue, textDecoration: 'none' }}>Privacy policy</a>
          <span style={{ color: secondary, margin: '0 6px' }}>|</span>
          <a href="#" style={{ color: blue, textDecoration: 'none' }}>Contact support</a>
          <span style={{ color: secondary, margin: '0 6px' }}>|</span>
          <a href="#" style={{ color: blue, textDecoration: 'none' }}>Manage notification preferences</a>
        </div>
      </div>
    </div>
  </div>
);

// ─── Iter2 card ────────────────────────────────────────────────────────────────

const Iter2Card: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const [subView, setSubView] = useState<Iter2SubView>('settings');

  const actions = subView === 'settings'
    ? <><TertiaryBtn label="Preview" onClick={() => setSubView('preview')} /><TertiaryBtn label="Edit" onClick={onEdit} /></>
    : <><TertiaryBtn label="Back" onClick={() => setSubView('settings')} /><TertiaryBtn label="Edit" onClick={onEdit} /></>;

  return (
    <EmailCard actions={actions} chevron={subView === 'preview'}>
      {subView === 'settings' ? (
        <>
          {/* Logo */}
          <div style={rowBase}><span>Logo</span><DisabledInput value="Same as styling" /></div>

          {/* Color pickers */}
          {[['Button Color', '#2770EF'], ['Button text colour', '#2770EF'], ['Primary content background color', '#2770EF']].map(([label, color]) => (
            <div key={label} style={rowBase}><span>{label}</span><DisabledColorPicker color={color} /></div>
          ))}

          {/* Toggle rows */}
          {['Product name', 'Phone number', 'Address', 'Mobile app nudge', 'Modify alert', 'Unsubscribe link', 'Error message'].map(label => (
            <div key={label} style={rowBase}><span>{label}</span><Toggle checked disabled /></div>
          ))}

          {/* Text input rows */}
          <div style={rowBase}><span>Company signature</span><DisabledInput value="444 Castro St, Suite 1000 Mountain View, C..." /></div>
          <div style={rowBase}><span>Privacy policy</span><DisabledInput value="https://www.thoughtspot.com/privacy-stat..." /></div>
          <div style={rowBase}><span>Contact support</span><DisabledInput value="https://www.thoughtspot.com/support" /></div>
          <div style={rowBase}><span>Manage notification preferences</span><Toggle checked disabled /></div>
          <div style={rowBase}><span>Company website URL</span><DisabledInput value="Text" /></div>
        </>
      ) : (
        <Iter2EmailPreview />
      )}
    </EmailCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EDIT PAGE (shared full-page takeover)
// ═══════════════════════════════════════════════════════════════════════════════

const EditPage: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [logoSize, setLogoSize] = useState<'S' | 'M' | 'L'>('M');
  const [toastVisible, setToastVisible] = useState(false);

  const handleSave = () => {
    setToastVisible(true);
    setTimeout(() => { setToastVisible(false); onDone(); }, 1400);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: systemColors.light['background-sunken'], fontFamily: font }}>
      <div style={{ height: 52, background: '#141519', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, borderBottom: '1px solid #2D3139' }}>
        <span style={{ color: '#F9FAFB', fontSize: 15, fontWeight: 600 }}>Edit email customisations</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={handleSave} style={{ background: blue, color: '#fff', border: 'none', borderRadius: 8, padding: '7px 20px', fontSize: 14, fontWeight: 600, fontFamily: font, cursor: 'pointer' }}>Save</button>
          <span style={{ color: '#4B5563' }}>|</span>
          <button onClick={onDone} style={{ background: 'none', border: 'none', color: '#D1D5DB', fontSize: 14, fontFamily: font, cursor: 'pointer', padding: 0 }}>Exit</button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px 8px' }}>
            <div style={{ fontSize: 11, color: secondary, marginBottom: 2 }}>Sample email</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: primary }}>KPI</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px 24px 24px', overflow: 'auto', gap: 16 }}>
            <button style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: '#fff', border: `1px solid ${border}`, fontSize: 20, color: secondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 80, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>‹</button>
            <div style={{ flex: 1, maxWidth: 580, background: '#fff', borderRadius: 8, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <Iter1EmailBody />
            </div>
            <button style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: '#fff', border: `1px solid ${border}`, fontSize: 20, color: secondary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 80, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>›</button>
          </div>
        </div>

        <div style={{ width: 272, background: '#1C1F28', borderLeft: '1px solid #2D3139', overflow: 'auto', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid #2D3139' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#F9FAFB' }}>Properties</span>
            <button style={{ background: 'none', border: 'none', color: blue, fontSize: 12, fontFamily: font, cursor: 'pointer', padding: 0 }}>Reset to default</button>
          </div>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #2D3139' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F9FAFB', marginBottom: 10 }}>Logo</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>Asset (PNG, JPEG supported)</div>
            <div style={{ background: '#2D3139', borderRadius: 8, padding: '12px 10px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 72 }}>
              <span style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 20, color: '#E61D2B', fontWeight: 900 }}>Coca-Cola</span>
            </div>
            <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6 }}>Size</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['S', 'M', 'L'] as const).map(s => (
                <button key={s} onClick={() => setLogoSize(s)} style={{ flex: 1, padding: '6px 0', background: logoSize === s ? blue : '#2D3139', color: logoSize === s ? '#fff' : '#9CA3AF', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 500, fontFamily: font, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #2D3139' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F9FAFB', marginBottom: 12 }}>Colors</div>
            {[{ label: 'Button', bg: '#1F2937' }, { label: 'Section Background', bg: '#E5E7EB' }, { label: 'Primary Text', bg: 'transparent' }, { label: 'Secondary Text', bg: '#fff' }].map(({ label, bg }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
                <span style={{ fontSize: 13, color: '#D1D5DB' }}>{label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: bg, border: '1px solid #4B5563' }} />
                  <span style={{ color: '#6B7280', fontSize: 11 }}>▾</span>
                </div>
              </div>
            ))}
            <button style={{ background: 'none', border: 'none', color: blue, fontSize: 12, fontFamily: font, cursor: 'pointer', padding: 0 }}>Show Semantic Colors</button>
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F9FAFB', marginBottom: 10 }}>Footer</div>
            {[{ label: 'Company address', value: '444 Castro St, Suite 1000...' }, { label: 'Privacy policy URL', value: 'thoughtspot.com/privacy...' }, { label: 'Support URL', value: 'thoughtspot.com/support' }, { label: 'Company website URL', value: 'thoughtspot.com' }].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 4 }}>{label}</div>
                <div style={{ background: '#2D3139', borderRadius: 6, padding: '6px 10px' }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastVisible && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: '#111827', color: '#fff', padding: '10px 22px', borderRadius: 10, fontSize: 14, fontFamily: font, boxShadow: '0 4px 16px rgba(0,0,0,0.3)', zIndex: 9999 }}>
          Changes saved
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ITERATION 3 — components upfront, no full preview, edit mode to edit
// ═══════════════════════════════════════════════════════════════════════════════

const Iter3ReadRow: React.FC<{ label: string; right: React.ReactNode; preview?: React.ReactNode }> = ({ label, right, preview }) => (
  <div style={{ background: '#fff', border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px' }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: primary, fontFamily: font }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>{right}</div>
    </div>
    {preview && (
      <div style={{ borderTop: `1px solid ${divider}`, padding: '13px 20px 15px' }}>{preview}</div>
    )}
  </div>
);

const Iter3DotRow: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ background: '#fff', border: `1px solid ${border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px' }}>
    <span style={{ fontSize: 14, fontWeight: 500, color: primary, fontFamily: font }}>{label}</span>
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: blue, flexShrink: 0 }} />
  </div>
);

const Iter3Chip: React.FC<{ label: string }> = ({ label }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 14px', background: systemColors.light['background-subtle'], border: `1px solid ${border}`, borderRadius: 999 }}>
    <span style={{ fontSize: 12.5, color: secondary, fontFamily: font }}>&lt;{label}&gt;</span>
  </div>
);

const shownLabel = <span style={{ fontSize: 13, color: secondary, fontFamily: font }}>Shown</span>;

const Iter3Card: React.FC<{ onEdit: () => void }> = ({ onEdit }) => (
  <EmailCard actions={<TertiaryBtn label="Edit" onClick={onEdit} />}>
    <div style={{ background: systemColors.light['background-subtle'], padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* Logo */}
      <Iter3ReadRow
        label="Logo"
        right={<>
          <span style={{ fontSize: 13, color: secondary, fontFamily: font }}>Same as styling</span>
          <span style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontSize: 22, color: '#E61D2B', fontWeight: 900, letterSpacing: -0.5, lineHeight: 1 }}>Coca-Cola</span>
        </>}
      />

      {/* Button color + Button text color + View KPI preview */}
      <div style={{ background: '#fff', border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {([{ label: 'Button color', filled: true }, { label: 'Button text color', filled: false }] as const).map(({ label, filled }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px', borderBottom: `1px solid ${divider}` }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: primary, fontFamily: font }}>{label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: filled ? '#1F2937' : '#fff', border: filled ? `1px solid ${border}` : `1.5px solid ${border}`, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: secondary, fontFamily: font }}>#E61D2B (Default)</span>
            </div>
          </div>
        ))}
        <div style={{ padding: '13px 20px' }}>
          <button style={{ height: 36, padding: '0 28px', borderRadius: 999, border: 'none', background: '#1F2937', color: '#fff', fontSize: 13.5, fontWeight: 600, fontFamily: font, cursor: 'default' }}>
            View KPI
          </button>
        </div>
      </div>

      {/* Primary content background color + KPI tile */}
      <div style={{ background: '#fff', border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 20px', borderBottom: `1px solid ${divider}` }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: primary, fontFamily: font }}>Primary content background color</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: '#fff', border: `1.5px solid ${border}`, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: secondary, fontFamily: font }}>#E61D2B (Default)</span>
          </div>
        </div>
        <div style={{ padding: '13px 20px 15px' }}>
          <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 8, padding: '14px 20px', display: 'flex', gap: 24, maxWidth: 400 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#166534', fontFamily: font, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 8 }}>CURRENT (1/12/23)</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#14532D', fontFamily: font, lineHeight: 1 }}>88.2M</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#166534', fontFamily: font, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>% CHANGE</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#166534', fontFamily: font, display: 'flex', alignItems: 'center', gap: 3 }}>
                  20.74%
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 10V3M3.5 6L6.5 3l3 3" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#166534', fontFamily: font, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>LAST (12/29/22)</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#166534', fontFamily: font }}>79.9M</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shown rows with previews */}
      <Iter3ReadRow label="Product name" right={shownLabel} preview={<Iter3Chip label="Product name" />} />
      <Iter3ReadRow label="Phone number" right={shownLabel} preview={<Iter3Chip label="8795867721" />} />
      <Iter3ReadRow
        label="Address"
        right={shownLabel}
        preview={
          <div style={{ background: systemColors.light['background-subtle'], border: `1px solid ${border}`, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: primary, fontFamily: font }}>Thoughtspot</div>
            <div style={{ fontSize: 12.5, color: secondary, fontFamily: font }}>(800) 508-7008</div>
            <div style={{ fontSize: 12.5, color: secondary, fontFamily: font }}>444 Castro St, Suite 1000 Mountain View, CA 94041</div>
          </div>
        }
      />
      <Iter3ReadRow
        label="Mobile app nudge"
        right={shownLabel}
        preview={
          <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 18, background: systemColors.light['background-subtle'] }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: primary, fontFamily: font, marginBottom: 6 }}>Want data at your fingertips?</div>
              <div style={{ fontSize: 12.5, color: secondary, fontFamily: font, lineHeight: 1.5, marginBottom: 10 }}>Scan the QR code to download the latest ThoughtSpot mobile app on your phone.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ background: '#000', borderRadius: 6, padding: '5px 11px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5z" fill="#fff" opacity="0.2"/><path d="M4.5 9.5L7 5l2.5 4.5M5.5 7.5h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8, fontFamily: font }}>Download on the</div><div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: font }}>App Store</div></div>
                </div>
                <div style={{ background: '#000', borderRadius: 6, padding: '5px 11px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 2l8 5-8 5V2z" fill="#fff" opacity="0.8"/></svg>
                  <div><div style={{ fontSize: 8, color: '#fff', opacity: 0.8, fontFamily: font }}>GET IT ON</div><div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: font }}>Google Play</div></div>
                </div>
              </div>
            </div>
            <div style={{ width: 62, height: 80, background: 'linear-gradient(160deg, #6366F1 0%, #8B5CF6 100%)', borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="40" viewBox="0 0 26 40" fill="none"><rect x="2" y="2" width="22" height="36" rx="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/><line x1="8" y1="6" x2="18" y2="6" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="13" cy="34" r="2" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/></svg>
            </div>
          </div>
        }
      />
      <Iter3ReadRow label="Error message" right={shownLabel} preview={<Iter3Chip label="Error message" />} />

      {/* Dot-only rows */}
      <Iter3DotRow label="Modify alert" />
      <Iter3DotRow label="Unsubscribe link" />

      {/* Value rows */}
      <Iter3ReadRow label="Company signature" right={<span style={{ fontSize: 13, color: secondary, fontFamily: font, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>444 Castro St, Suite 1000 Mountain View, C...</span>} />
      <Iter3ReadRow label="Privacy policy" right={<span style={{ fontSize: 13, color: secondary, fontFamily: font, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://www.thoughtspot.com/privacy-stat...</span>} />
      <Iter3ReadRow label="Contact support" right={<span style={{ fontSize: 13, color: secondary, fontFamily: font }}>https://www.thoughtspot.com/support</span>} />
      <Iter3DotRow label="Manage notification preferences" />
      <Iter3ReadRow label="Company website URL" right={<span style={{ fontSize: 13, color: secondary, fontFamily: font }}>https://www.thoughtspot.com</span>} />

    </div>
  </EmailCard>
);

// ─── Coming soon overlay (iteration 3) ────────────────────────────────────────



// ─── Root component ────────────────────────────────────────────────────────────

export const EmailCustomisation: React.FC = () => {
  const [view, setView] = useState<View>('main');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [iteration, setIteration] = useState<Iteration>(1);
  const [sidebarTab, setSidebarTab] = useState<SidebarTabId>('admin');

  const scopeToggle: ScopeToggle = {
    options: [{ id: 'all-orgs', label: 'All Orgs' }, { id: 'primary-org', label: 'Primary Org' }],
    activeId: 'all-orgs',
    onChange: () => {},
  };

  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search in your library',
    userName: 'Primary',
    notificationCount: 1,
    showHamburger: false,
    rightSlot: <IterationSwitcher current={iteration} onChange={setIteration} />,
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: sidebarTab,
    onTabChange: (tabId) => setSidebarTab(tabId as SidebarTabId),
    categories: SIDEBAR_CATEGORIES,
    selectedNav: 'customisation',
    onNavSelect: () => {},
    ...(sidebarTab === 'admin' ? { scopeToggle } : {}),
  };

  if (view === 'edit') {
    return <EditPage onDone={() => setView('main')} />;
  }

  return (
    <>
      <AppShell headerProps={headerProps} sidebarProps={sidebarProps} contentBackground="#FFFFFF" style={{ height: '100vh' }}>
        <PageShell>
          {iteration === 1 && <Iter1Card onPreview={() => setPreviewOpen(true)} onEdit={() => setView('edit')} />}
          {iteration === 2 && <Iter2Card onEdit={() => setView('edit')} />}
          {iteration === 3 && <Iter3Card onEdit={() => setView('edit')} />}
        </PageShell>
      </AppShell>

      {previewOpen && iteration === 1 && (
        <Iter1PreviewModal onClose={() => setPreviewOpen(false)} onEdit={() => setView('edit')} />
      )}
    </>
  );
};

export default EmailCustomisation;
