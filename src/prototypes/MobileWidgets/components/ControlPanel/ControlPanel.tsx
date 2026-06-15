import React from 'react';
import {
  MockupDevice, WidgetSize, KPIDisplayType, Theme,
  WidgetLayout, WidgetView, WidgetState, ActiveView,
} from '../../types';
import { MOCK_KPIS } from '../../data/mockKPIs';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  device: MockupDevice;
  size: WidgetSize;
  kpiDisplayType: KPIDisplayType;
  theme: Theme;
  layout: WidgetLayout;
  widgetView: WidgetView;
  state: WidgetState;
  kpiIndex: number;
  activeView: ActiveView;
  onDeviceChange: (d: MockupDevice) => void;
  onSizeChange: (s: WidgetSize) => void;
  onKPIDisplayTypeChange: (t: KPIDisplayType) => void;
  onThemeChange: (t: Theme) => void;
  onLayoutChange: (l: WidgetLayout) => void;
  onWidgetViewChange: (v: WidgetView) => void;
  onStateChange: (s: WidgetState) => void;
  onKPIIndexChange: (i: number) => void;
  onActiveViewChange: (v: ActiveView) => void;
}

interface Opt<T> { value: T; label: string; desc?: string; }

function ToggleGroup<T extends string | number>({
  label, options, value, onChange, wrap,
}: {
  label: string;
  options: Opt<T>[];
  value: T;
  onChange: (v: T) => void;
  wrap?: boolean;
}) {
  return (
    <div className={styles.group}>
      <span className={styles.groupLabel}>{label}</span>
      <div className={`${styles.toggleRow} ${wrap ? styles.toggleRowWrap : ''}`}>
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            className={`${styles.toggle} ${value === opt.value ? styles.toggleActive : ''}`}
            onClick={() => onChange(opt.value)}
            title={opt.desc}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const isIOS = (d: MockupDevice) => d === 'iphone' || d === 'watch' || d === 'ipad' || d === 'standby';

const ControlPanel: React.FC<ControlPanelProps> = ({
  device, size, kpiDisplayType, theme, layout, widgetView, state, kpiIndex, activeView,
  onDeviceChange, onSizeChange, onKPIDisplayTypeChange, onThemeChange,
  onLayoutChange, onWidgetViewChange, onStateChange, onKPIIndexChange, onActiveViewChange,
}) => {
  const ios = isIOS(device);

  // When switching platforms, reset theme to a valid value for that platform
  const handleDeviceChange = (d: MockupDevice) => {
    onDeviceChange(d);
    const willBeIOS = isIOS(d);
    if (willBeIOS && theme === 'light') {
      onThemeChange('full');
    } else if (!willBeIOS && (theme === 'full' || theme === 'clear' || theme === 'tinted' || theme === 'black')) {
      onThemeChange('dark');
    }
  };

  return (
    <div className={styles.panel}>
      {/* Tab row */}
      <div className={styles.viewTabs}>
        <button
          className={`${styles.viewTab} ${activeView === 'mockup' ? styles.viewTabActive : ''}`}
          onClick={() => onActiveViewChange('mockup')}
        >
          Mockup
        </button>
        <button
          className={`${styles.viewTab} ${activeView === 'docs' ? styles.viewTabActive : ''}`}
          onClick={() => onActiveViewChange('docs')}
        >
          Docs
        </button>
      </div>

      {activeView === 'mockup' && (
        <div className={styles.controls}>
          {/* 1 — Mockup device */}
          <ToggleGroup<MockupDevice>
            label="Mockup"
            value={device}
            onChange={handleDeviceChange}
            wrap
            options={[
              { value: 'iphone',  label: 'iPhone',   desc: 'iOS — iPhone 12' },
              { value: 'android', label: 'Android',  desc: 'Android — Pixel 5' },
              { value: 'watch',   label: 'Watch',    desc: 'Apple Watch 45mm' },
              { value: 'ipad',    label: 'iPad',     desc: 'iPad Pro 12.9"' },
              { value: 'standby', label: 'StandBy',  desc: 'iOS StandBy mode (landscape)' },
              { value: 'carplay', label: 'Car',      desc: 'CarPlay / Android Auto' },
              { value: 'desktop', label: 'Desktop',  desc: 'macOS / Windows desktop widget' },
            ]}
          />

          <div className={styles.divider} />

          {/* 2 — Size */}
          <ToggleGroup<WidgetSize>
            label="Size"
            value={size}
            onChange={onSizeChange}
            options={[
              { value: 'small',  label: 'S', desc: 'Small — 1 KPI' },
              { value: 'medium', label: 'M', desc: 'Medium — 2–3 KPIs' },
              { value: 'large',  label: 'L', desc: 'Large — 4–5 KPIs' },
              { value: 'xlarge', label: 'XL', desc: 'Extra Large — 6+ KPIs' },
            ]}
          />

          {/* 3 — KPI type */}
          <ToggleGroup<KPIDisplayType>
            label="KPI type"
            value={kpiDisplayType}
            onChange={onKPIDisplayTypeChange}
            wrap
            options={[
              { value: 'full',                label: 'Full',          desc: 'Title · Trend% · Chart · Date · Value' },
              { value: 'no-change',           label: 'w/o Δ%',        desc: 'Full without change percent' },
              { value: 'no-date',             label: 'w/o Date',      desc: 'Full without KPI date' },
              { value: 'full-graph',          label: 'Graph',         desc: 'Chart-dominant, value+trend+annotation' },
              { value: 'full-graph-no-change',label: 'Graph w/o Δ%',  desc: 'Full-graph without change percent' },
              { value: 'full-graph-no-date',  label: 'Graph w/o Date',desc: 'Full-graph without annotation' },
            ]}
          />

          <div className={styles.divider} />

          {/* 4 — Theme (platform-aware) */}
          {ios ? (
            <ToggleGroup<Theme>
              label="iOS theme"
              value={theme}
              onChange={onThemeChange}
              options={[
                { value: 'full',   label: 'Light',  desc: 'Full-color white background' },
                { value: 'dark',   label: 'Dark',   desc: 'Dark background' },
                { value: 'black',  label: 'Black',  desc: 'Pure black with visible border' },
                { value: 'clear',  label: 'Clear',  desc: 'Liquid Glass / vibrant translucent' },
                { value: 'tinted', label: 'Tinted', desc: 'System-tinted accented monochromatic' },
              ]}
            />
          ) : (
            <ToggleGroup<Theme>
              label="Android theme"
              value={theme}
              onChange={onThemeChange}
              options={[
                { value: 'light', label: 'Light', desc: 'Material You light surface' },
                { value: 'dark',  label: 'Dark',  desc: 'Material You dark surface' },
              ]}
            />
          )}

          {/* 5 — Layout */}
          <ToggleGroup<WidgetLayout>
            label="Layout"
            value={layout}
            onChange={onLayoutChange}
            options={[
              { value: 'list', label: 'List',  desc: 'Watchlist row layout' },
              { value: 'grid', label: 'Grid',  desc: 'Watchlist tile grid' },
            ]}
          />

          <div className={styles.divider} />

          {/* 6 — View */}
          <ToggleGroup<WidgetView>
            label="View"
            value={widgetView}
            onChange={onWidgetViewChange}
            options={[
              { value: 'home', label: 'Home screen',  desc: 'Standard home screen widget' },
              { value: 'lock', label: 'Lock screen',  desc: 'iOS lock screen / StandBy' },
            ]}
          />

          {/* 7 — State */}
          <ToggleGroup<WidgetState>
            label="State"
            value={state}
            onChange={onStateChange}
            options={[
              { value: 'default', label: 'Default', desc: 'Live data' },
              { value: 'empty',   label: 'Empty',   desc: 'No KPIs configured' },
              { value: 'loading', label: 'Loading', desc: 'Fetching data' },
              { value: 'error',   label: 'Error',   desc: 'Failed to load' },
            ]}
          />

          <div className={styles.divider} />

          {/* KPI metric selector */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>KPI metric</span>
            <div className={`${styles.toggleRow} ${styles.toggleRowWrap}`}>
              {MOCK_KPIS.map((kpi, i) => (
                <button
                  key={kpi.id}
                  className={`${styles.toggle} ${styles.toggleSmall} ${kpiIndex === i ? styles.toggleActive : ''}`}
                  onClick={() => onKPIIndexChange(i)}
                  title={kpi.name}
                >
                  {kpi.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
