import React, { useState } from 'react';
import {
  MockupDevice, Theme, WidgetSize, KPIDisplayType,
  WidgetLayout, WidgetView, WidgetState, ActiveView,
} from './types';
import { IOS_WIDGET_SIZES, ANDROID_WIDGET_SIZES } from './constants/widgetSpecs';
import ControlPanel from './components/ControlPanel/ControlPanel';
import IOSPhoneFrame from './components/PhoneFrame/iOSPhoneFrame';
import AndroidPhoneFrame from './components/PhoneFrame/AndroidPhoneFrame';
import IPadFrame from './components/PhoneFrame/iPadFrame';
import DocsPage from './components/DocsPage/DocsPage';
import styles from './MobileWidgetsPage.module.css';

const DEVICE_LABEL: Record<MockupDevice, string> = {
  iphone:  'iPhone 12',
  android: 'Pixel 5',
  watch:   'Apple Watch 45mm',
  ipad:    'iPad Pro 12.9"',
  standby: 'iPhone StandBy',
  carplay: 'CarPlay',
  desktop: 'Desktop',
};

const DEVICE_COMING_SOON: MockupDevice[] = ['watch', 'standby', 'carplay', 'desktop'];

const ModeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({ isDark, onToggle }) => (
  <button
    className={`${styles.modeToggle} ${isDark ? styles.modeToggleDark : ''}`}
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle
        cx="9" cy="9" r="8"
        stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M9 1 A8 8 0 0 1 9 17 Z"
        fill={isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'}
      />
    </svg>
  </button>
);

const MobileWidgetsPage: React.FC = () => {
  const [device, setDevice] = useState<MockupDevice>('iphone');
  const [size, setSize] = useState<WidgetSize>('medium');
  const [isDark, setIsDark] = useState(false);
  const [kpiDisplayType, setKPIDisplayType] = useState<KPIDisplayType>('full');
  const [theme, setTheme] = useState<Theme>('full');
  const [layout, setLayout] = useState<WidgetLayout>('list');
  const [widgetView, setWidgetView] = useState<WidgetView>('home');
  const [state, setState] = useState<WidgetState>('default');
  const [kpiIndex, setKPIIndex] = useState(0);
  const [activeView, setActiveView] = useState<ActiveView>('mockup');

  const iosSize = IOS_WIDGET_SIZES[size];
  const androidSize = ANDROID_WIDGET_SIZES[size];

  const isAndroid = device === 'android';
  const isIpad = device === 'ipad';
  const isComingSoon = DEVICE_COMING_SOON.includes(device);

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.breadcrumb}>ThoughtSpot · Mobile</div>
          <h1 className={styles.title}>KPI Widget Explorer</h1>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.badge}>iOS + Android</span>
          <span className={styles.badge}>6 types · 2 layouts · 3 states</span>
          <ModeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />
        </div>
      </header>

      <div className={styles.layout}>
        {/* Sidebar controls */}
        <aside className={styles.sidebar}>
          <ControlPanel
            device={device}
            size={size}
            kpiDisplayType={kpiDisplayType}
            theme={theme}
            layout={layout}
            widgetView={widgetView}
            state={state}
            kpiIndex={kpiIndex}
            activeView={activeView}
            onDeviceChange={setDevice}
            onSizeChange={setSize}
            onKPIDisplayTypeChange={setKPIDisplayType}
            onThemeChange={setTheme}
            onLayoutChange={setLayout}
            onWidgetViewChange={setWidgetView}
            onStateChange={setState}
            onKPIIndexChange={setKPIIndex}
            onActiveViewChange={setActiveView}
          />

          {/* Spec summary (mockup view only) */}
          {activeView === 'mockup' && !isComingSoon && (
            <div className={styles.specSummary}>
              {!isAndroid && (
                <div className={styles.specRow}>
                  <span className={styles.specPlatform} style={{ color: '#007AFF' }}>iOS</span>
                  <span>{iosSize.ptLabel}</span>
                  <span className={styles.specNote}>CR 22pt · 16pt margin</span>
                </div>
              )}
              {isAndroid && (
                <div className={styles.specRow}>
                  <span className={styles.specPlatform} style={{ color: '#4285F4' }}>Android</span>
                  <span>{androidSize.dpLabel}</span>
                  <span className={styles.specNote}>CR 28dp · 16dp margin</span>
                </div>
              )}
            </div>
          )}
        </aside>

        {/* Main canvas */}
        <main className={styles.canvas}>
          {activeView === 'docs' ? (
            <DocsPage isDark={isDark} />
          ) : (
            <div className={styles.mockupArea}>
              {/* Platform labels row */}
              <div className={styles.platformRow}>

                {/* iOS Phone Frame */}
                {!isAndroid && !isIpad && !isComingSoon && (
                  <div className={styles.platformCol}>
                    <div className={styles.platformLabel}>
                      <span className={styles.platformDot} style={{ background: '#007AFF' }} />
                      <span>{DEVICE_LABEL[device]}</span>
                      <span className={styles.platformSub}>{iosSize.ptLabel}</span>
                    </div>
                    <IOSPhoneFrame
                      theme={theme}
                      size={size}
                      kpiDisplayType={kpiDisplayType}
                      layout={layout}
                      state={state}
                      kpiIndex={kpiIndex}
                    />
                  </div>
                )}

                {/* iPad Frame */}
                {isIpad && (
                  <div className={styles.platformCol}>
                    <div className={styles.platformLabel}>
                      <span className={styles.platformDot} style={{ background: '#007AFF' }} />
                      <span>{DEVICE_LABEL['ipad']}</span>
                      <span className={styles.platformSub}>{iosSize.ptLabel}</span>
                    </div>
                    <IPadFrame
                      theme={theme}
                      size={size}
                      kpiDisplayType={kpiDisplayType}
                      layout={layout}
                      state={state}
                      kpiIndex={kpiIndex}
                    />
                  </div>
                )}

                {/* Android Frame */}
                {isAndroid && (
                  <>
                    <div className={styles.platformCol}>
                      <div className={styles.platformLabel}>
                        <span className={styles.platformDot} style={{ background: '#34A853' }} />
                        <span>{DEVICE_LABEL['android']}</span>
                        <span className={styles.platformSub}>{androidSize.dpLabel}</span>
                      </div>
                      <AndroidPhoneFrame
                        theme={theme}
                        size={size}
                        kpiDisplayType={kpiDisplayType}
                        layout={layout}
                        state={state}
                        kpiIndex={kpiIndex}
                      />
                    </div>
                  </>
                )}

                {/* Coming soon placeholder  */}
                {isComingSoon && (
                  <div className={styles.comingSoon}>
                    <span className={styles.comingSoonIcon}>🚧</span>
                    <span className={styles.comingSoonLabel}>{DEVICE_LABEL[device]} mockup</span>
                    <span className={styles.comingSoonSub}>Coming soon</span>
                  </div>
                )}
              </div>

              {/* View / layout info banner */}
              {!isComingSoon && (
                <div className={styles.iterBanner}>
                  <strong>
                    {kpiDisplayType === 'full' && 'Full'}
                    {kpiDisplayType === 'no-change' && 'w/o Change %'}
                    {kpiDisplayType === 'no-date' && 'w/o Date'}
                    {kpiDisplayType === 'full-graph' && 'Full graph'}
                    {kpiDisplayType === 'full-graph-no-change' && 'Full graph w/o Change %'}
                    {kpiDisplayType === 'full-graph-no-date' && 'Full graph w/o Date'}
                  </strong>
                  {' · '}
                  {size === 'small' ? 'Single KPI' : `${layout === 'list' ? 'List' : 'Grid'} watchlist`}
                  {' · '}
                  {widgetView === 'home' ? 'Home screen' : 'Lock screen'}
                  {state !== 'default' && ` · ${state.charAt(0).toUpperCase() + state.slice(1)} state`}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export { MobileWidgetsPage };
export default MobileWidgetsPage;
