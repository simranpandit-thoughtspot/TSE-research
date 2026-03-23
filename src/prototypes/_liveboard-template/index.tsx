import React, { useState } from 'react';
import { LiveboardHeader } from '@components/LiveboardHeader';
import { AnswerTile } from './components/AnswerTile';
import { SampleBarChart } from './components/SampleBarChart';
import { SampleKPITile } from './components/SampleKPITile';
import { SpotterVizPanel } from './components/SpotterVizPanel';
import { colors, typography, layout } from './styles';
import {
  tabsData,
  filterData,
  liveboardName,
  kpiData,
  monthlyRevenue,
  revenueTrend,
} from './data/mockData';

/**
 * Liveboard Template
 *
 * A ready-to-use Liveboard prototype with view and edit modes.
 * Replace the mock data, tile layout, and chart components to match your design.
 *
 * Features:
 * - View/Edit mode toggle via LiveboardHeader
 * - Sample bar chart and KPI tiles with sparkline
 * - SpotterViz side panel (edit mode)
 * - Floating hover toolbar on tiles
 */
export const LiveboardTemplate: React.FC = () => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [spotterOpen, setSpotterOpen] = useState(false);

  return (
    <div style={s.page}>
      {/* Sticky header */}
      <div style={s.stickyNav}>
        <LiveboardHeader
          mode={mode}
          title={liveboardName}
          activeTab={activeTab}
          tabs={tabsData}
          filters={filterData}
          onTabChange={setActiveTab}
          onEdit={() => setMode('edit')}
          onSave={() => { setMode('view'); setSpotterOpen(false); }}
          onCancel={() => { setMode('view'); setSpotterOpen(false); }}
          onToggleSpotter={() => setSpotterOpen(!spotterOpen)}
          spotterOpen={spotterOpen}
        />
      </div>

      {/* Body + optional SpotterViz panel */}
      <div style={s.bodyWrapper}>
        <div style={{ ...s.canvas, ...(mode === 'edit' ? s.canvasEditGrid : {}) }}>
          <div style={s.tileGrid}>

            {/* Row 1: Bar chart tile + KPI tiles */}
            <div style={s.row}>
              <AnswerTile title="Monthly revenue" mode={mode} style={{ flex: 1 }} headerBorder>
                <div style={{ padding: 8 }}>
                  <SampleBarChart data={monthlyRevenue.data} labels={monthlyRevenue.labels} />
                </div>
              </AnswerTile>

              <div style={s.kpiColumn}>
                {kpiData.map((kpi) => (
                  <AnswerTile key={kpi.label} title={kpi.label} mode={mode} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={s.bigValue}>{kpi.value}</span>
                        <span style={s.changeUp}>{kpi.change}</span>
                      </div>
                      <SampleKPITile sparkline={revenueTrend.sparkline} />
                    </div>
                  </AnswerTile>
                ))}
              </div>
            </div>

            {/* Row 2: Add more tiles here */}
            {/* Example:
            <div style={s.row}>
              <AnswerTile title="Your chart" mode={mode} style={{ flex: 1 }}>
                <YourChartComponent />
              </AnswerTile>
            </div>
            */}

          </div>
        </div>

        {mode === 'edit' && spotterOpen && (
          <SpotterVizPanel onClose={() => setSpotterOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default LiveboardTemplate;

const s: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: typography.fontFamily,
    background: colors.pageBg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  stickyNav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexShrink: 0,
  },
  bodyWrapper: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
    overflowY: 'auto',
  },
  canvasEditGrid: {
    backgroundImage: `
      linear-gradient(to right, rgba(192,198,207,0.3) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(192,198,207,0.3) 1px, transparent 1px)
    `,
    backgroundSize: 'calc((100% - 133px) / 12) 44px',
    backgroundPosition: '133px 0',
  },
  tileGrid: {
    padding: layout.canvasMargin,
    display: 'flex',
    flexDirection: 'column',
    gap: layout.tileGap,
  },
  row: {
    display: 'flex',
    gap: layout.tileGap,
  },
  kpiColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: layout.tileGap,
    flex: 1,
  },
  bigValue: {
    fontSize: 32,
    fontWeight: 600,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: '40px',
  },
  changeUp: {
    fontSize: 13,
    fontWeight: 500,
    color: colors.success,
  },
};
