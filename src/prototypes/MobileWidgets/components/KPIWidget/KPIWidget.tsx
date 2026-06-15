import React from 'react';
import { KPIData, KPIDisplayType, WidgetLayout, WidgetSize, WidgetState, Platform } from '../../types';
import { IOS_TYPE, ANDROID_TYPE, IOS_WIDGET_SIZES, ANDROID_WIDGET_SIZES, IOS_PADDING, ANDROID_PADDING } from '../../constants/widgetSpecs';
import { MOCK_KPIS, WATCHLIST_KPIS } from '../../data/mockKPIs';
import TSLogo from '../TSLogo/TSLogo';
import Sparkline from '../Sparkline/Sparkline';
import styles from './KPIWidget.module.css';

type TypeScale = typeof IOS_TYPE & { watchlistPeriod?: { size: string; weight: string; lineHeight: string } };

interface KPIWidgetProps {
  kpi: KPIData;
  kpiDisplayType: KPIDisplayType;
  layout: WidgetLayout;
  size: WidgetSize;
  state: WidgetState;
  platform: Platform;
}

// ─── State placeholders ───────────────────────────────────────────────────────

interface StateProps { kpi: KPIData; size: WidgetSize; }

const EmptyState: React.FC<StateProps> = () => (
  <div className={styles.stateContainer}>
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" className={styles.emptyHeart}>
      <path
        d="M14 23.5C14 23.5 2 16.5 2 8C2 4.96 4.46 2.5 7.5 2.5C9.74 2.5 11.78 3.78 12.9 5.7L14 7.5L15.1 5.7C16.22 3.78 18.26 2.5 20.5 2.5C23.54 2.5 26 4.96 26 8C26 16.5 14 23.5 14 23.5Z"
        stroke="var(--widget-text-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className={styles.emptyAction}>+ Add to watchlist</span>
  </div>
);

const LoadingState: React.FC<StateProps> = ({ size }) => {
  const isSmall = size === 'small';
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeletonBar} ${styles.skeletonBarFull}`} />
      <div className={`${styles.skeletonBar} ${styles.skeletonBarHalf}`} />
      <div className={`${styles.skeletonBar} ${styles.skeletonBarThreeQ}`} />
      {!isSmall && <div className={`${styles.skeletonBar} ${styles.skeletonBarHalf}`} />}
    </div>
  );
};

const ErrorState: React.FC<StateProps> = ({ kpi }) => (
  <div className={styles.stateContainer}>
    <span className={styles.errorKpiName}>{kpi.shortName}</span>
    <div className={styles.errorBadge}>!</div>
    <span className={styles.errorSubtext}>Error loading data</span>
  </div>
);

// ─── Single KPI (full / no-change / no-date) ─────────────────────────────────

interface SingleProps {
  kpi: KPIData;
  kpiDisplayType: KPIDisplayType;
  size: WidgetSize;
  type: TypeScale;
  availableH: number;
  availableW: number;
}

const SingleKPI: React.FC<SingleProps> = ({ kpi, kpiDisplayType, size, type, availableH, availableW }) => {
  const showTrend = kpiDisplayType !== 'no-change';
  const showDate = kpiDisplayType !== 'no-date';
  const logoSize = size === 'small' ? 14 : 16;
  const valueSize = size === 'small' ? type.valueSmall : size === 'medium' ? type.valueMedium : type.valueLarge;

  const chartH = Math.max(28, Math.floor(availableH * (showTrend ? 0.40 : 0.48)));

  // Sparkline color tracks trend direction (green = up, red = down)
  const trendUp = kpi.trendDirection === 'up';
  const sparkLine = trendUp ? 'var(--widget-positive)' : 'var(--widget-negative)';
  const sparkFill = trendUp ? 'rgba(6,191,127,0.12)' : 'rgba(226,43,61,0.12)';
  const sparkBase = trendUp ? 'rgba(6,191,127,0.35)' : 'rgba(226,43,61,0.35)';

  return (
    <div className={styles.singleLayout}>
      <div className={styles.headerRow}>
        <span className={styles.title} style={{ fontSize: type.titleLarge.size, fontWeight: type.titleLarge.weight }}>
          {kpi.shortName}
        </span>
        <TSLogo color="var(--widget-logo)" size={logoSize} />
      </div>

      {showTrend && (
        <div
          className={`${styles.trendRow} ${kpi.trendDirection === 'up' ? styles.positive : kpi.trendDirection === 'down' ? styles.negative : ''}`}
          style={{ fontSize: type.trend.size }}
        >
          {kpi.trend}
          <span className={styles.trendComp}>{kpi.comparison}</span>
        </div>
      )}

      <div className={styles.chartFlex} style={{ height: chartH }}>
        <Sparkline
          data={kpi.sparklineData}
          width={availableW}
          height={chartH}
          lineColor={sparkLine}
          fillColor={sparkFill}
          baselineColor={sparkBase}
        />
      </div>

      <div className={styles.valueRow}>
        {showDate && (
          <span className={styles.period} style={{ fontSize: type.caption.size }}>
            {kpi.period}
          </span>
        )}
        <span className={styles.value} style={{ fontSize: valueSize.size, fontWeight: valueSize.weight }}>
          {kpi.value}
        </span>
      </div>
    </div>
  );
};

// ─── Full-graph (chart-dominant) ─────────────────────────────────────────────

interface FullGraphProps {
  kpi: KPIData;
  kpiDisplayType: KPIDisplayType;
  size: WidgetSize;
  type: TypeScale;
  availableH: number;
  availableW: number;
}

const FullGraph: React.FC<FullGraphProps> = ({ kpi, kpiDisplayType, size, type, availableH, availableW }) => {
  const showTrend = kpiDisplayType !== 'full-graph-no-change';
  const showAnnotation = kpiDisplayType !== 'full-graph-no-date';
  const logoSize = size === 'small' ? 14 : 16;
  const valueSize = size === 'small' ? type.valueSmall : size === 'medium' ? type.valueMedium : type.valueLarge;

  const annotationH = showAnnotation ? 22 : 0;
  const dotsH = 14;
  const headerH = 18 + 20; // titleRow + valueRow
  const chartH = Math.max(40, availableH - headerH - annotationH - dotsH - 4);

  return (
    <div className={styles.fullGraphLayout}>
      <div className={styles.headerRow}>
        <span className={styles.title} style={{ fontSize: type.titleLarge.size, fontWeight: type.titleLarge.weight }}>
          {kpi.shortName}
        </span>
        <TSLogo color="var(--widget-logo)" size={logoSize} />
      </div>

      <div className={styles.graphValueRow}>
        <span className={styles.value} style={{ fontSize: valueSize.size, fontWeight: valueSize.weight }}>
          {kpi.value}
        </span>
        {showTrend && (
          <span
            className={`${styles.graphTrend} ${kpi.trendDirection === 'up' ? styles.positive : styles.negative}`}
            style={{ fontSize: type.trend.size }}
          >
            {kpi.trend}
          </span>
        )}
      </div>

      <div className={styles.chartExpand} style={{ height: chartH }}>
        <Sparkline
          data={kpi.sparklineData}
          width={availableW}
          height={chartH}
          lineColor="var(--widget-chart-line)"
          fillColor="var(--widget-chart-fill)"
          baselineColor="var(--widget-chart-baseline)"
          strokeWidth={1.5}
        />
      </div>

      {showAnnotation && (
        <div className={styles.annotationBand}>
          <span className={styles.annotationDot} />
          <span className={styles.annotationLabel} style={{ fontSize: type.caption.size }}>
            Below expected
          </span>
        </div>
      )}

      <div className={styles.paginationDots}>
        <span className={styles.dotActive} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
};

// ─── Watchlist List ───────────────────────────────────────────────────────────

const ROWS_BY_SIZE: Record<WidgetSize, number> = {
  small: 1, medium: 2, large: 5, xlarge: 6,
};

interface WatchlistListProps {
  kpiDisplayType: KPIDisplayType;
  size: WidgetSize;
  type: TypeScale;
}

const WatchlistList: React.FC<WatchlistListProps> = ({ kpiDisplayType, size, type }) => {
  const showTrend = !kpiDisplayType.startsWith('full-graph') && kpiDisplayType !== 'no-change';
  const showDate = kpiDisplayType !== 'no-date' && kpiDisplayType !== 'full-graph-no-date';
  const showSparkline = size === 'large' || size === 'xlarge';
  const count = ROWS_BY_SIZE[size];
  const kpis = WATCHLIST_KPIS.slice(0, count);
  const periodSize = (type as typeof IOS_TYPE).watchlistPeriod?.size ?? type.caption.size;

  return (
    <div className={styles.watchlistLayout}>
      <div className={styles.watchlistHeader}>
        <span className={styles.watchlistTitle} style={{ fontSize: type.titleLarge.size, fontWeight: type.titleLarge.weight }}>
          WATCHLIST
        </span>
        <TSLogo color="var(--widget-logo)" size={14} />
      </div>
      <div className={styles.watchlistDivider} />
      {kpis.map((kpi, i) => (
        <React.Fragment key={kpi.id}>
          <div className={showSparkline ? styles.watchlistRowSpark : styles.watchlistRow}>
            <div className={styles.watchlistLeft}>
              <span className={styles.watchlistName} style={{ fontSize: type.watchlistRow.size, fontWeight: type.watchlistRow.weight }}>
                {kpi.name}
              </span>
              {showDate && (
                <span className={styles.watchlistPeriod} style={{ fontSize: periodSize }}>
                  {kpi.period}
                </span>
              )}
            </div>
            {showSparkline && (
              <div className={styles.watchlistSparkCell}>
                <Sparkline
                  data={kpi.sparklineData}
                  width={62}
                  height={20}
                  lineColor={kpi.trendDirection === 'up' ? 'var(--widget-positive)' : 'var(--widget-negative)'}
                  fillColor={kpi.trendDirection === 'up' ? 'rgba(6,191,127,0.15)' : 'rgba(226,43,61,0.15)'}
                  showBaseline={false}
                  strokeWidth={1}
                />
              </div>
            )}
            <div className={styles.watchlistRight}>
              <span className={styles.watchlistValue} style={{ fontSize: type.watchlistValue.size, fontWeight: type.watchlistValue.weight }}>
                {kpi.value}
              </span>
              {showTrend && (
                <span
                  className={`${styles.watchlistTrend} ${kpi.trendDirection === 'up' ? styles.positive : styles.negative}`}
                  style={{ fontSize: type.watchlistTrend.size, fontWeight: type.watchlistTrend.weight }}
                >
                  {kpi.trend}
                </span>
              )}
            </div>
          </div>
          {i < kpis.length - 1 && <div className={styles.watchlistDivider} />}
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── Watchlist Grid ───────────────────────────────────────────────────────────

const TILES_BY_SIZE: Record<WidgetSize, number> = {
  small: 1, medium: 2, large: 4, xlarge: 6,
};

interface WatchlistGridProps {
  kpiDisplayType: KPIDisplayType;
  size: WidgetSize;
  type: TypeScale;
}

const WatchlistGrid: React.FC<WatchlistGridProps> = ({ kpiDisplayType, size, type }) => {
  const showTrend = kpiDisplayType !== 'no-change' && !kpiDisplayType.startsWith('full-graph');
  const showDate = kpiDisplayType !== 'no-date' && kpiDisplayType !== 'full-graph-no-date';
  const count = TILES_BY_SIZE[size];
  const kpis = WATCHLIST_KPIS.slice(0, count);

  return (
    <div className={styles.gridLayout}>
      <div className={styles.watchlistHeader}>
        <span className={styles.watchlistTitle} style={{ fontSize: type.titleLarge.size }}>
          WATCHLIST
        </span>
        <TSLogo color="var(--widget-logo)" size={14} />
      </div>
      <div className={styles.gridTiles}>
        {kpis.map((kpi) => (
          <div key={kpi.id} className={styles.gridTile}>
            <span className={styles.tileName} style={{ fontSize: type.watchlistRow.size, fontWeight: type.watchlistRow.weight }}>
              {kpi.shortName}
            </span>
            <span className={styles.tileValue} style={{ fontSize: type.watchlistValue.size, fontWeight: type.watchlistValue.weight }}>
              {kpi.value}
            </span>
            {showDate && (
              <span className={styles.tilePeriod} style={{ fontSize: type.caption.size }}>
                {kpi.period}
              </span>
            )}
            {showTrend && (
              <span
                className={`${styles.tileTrend} ${kpi.trendDirection === 'up' ? styles.positive : styles.negative}`}
                style={{ fontSize: type.watchlistTrend.size }}
              >
                {kpi.trend}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

const KPIWidget: React.FC<KPIWidgetProps> = ({ kpi, kpiDisplayType, layout, size, state, platform }) => {
  const type = platform === 'ios' ? IOS_TYPE : ANDROID_TYPE;
  const sizes = platform === 'ios' ? IOS_WIDGET_SIZES : ANDROID_WIDGET_SIZES;
  const padding = platform === 'ios' ? IOS_PADDING : ANDROID_PADDING;
  const dims = sizes[size];
  const availableW = dims.widthPx - padding * 2;
  const availableH = dims.heightPx - padding * 2;

  if (state === 'empty') return <EmptyState kpi={kpi} size={size} />;
  if (state === 'loading') return <LoadingState kpi={kpi} size={size} />;
  if (state === 'error') return <ErrorState kpi={kpi} size={size} />;

  // Full-graph types: always single-KPI chart-dominant (override layout)
  if (kpiDisplayType.startsWith('full-graph')) {
    return (
      <FullGraph
        kpi={kpi}
        kpiDisplayType={kpiDisplayType}
        size={size}
        type={type}
        availableH={availableH}
        availableW={availableW}
      />
    );
  }

  // Medium / large / xlarge + list layout
  if (size !== 'small' && layout === 'list') {
    return <WatchlistList kpiDisplayType={kpiDisplayType} size={size} type={type} />;
  }

  // Medium / large / xlarge + grid layout
  if (size !== 'small' && layout === 'grid') {
    return <WatchlistGrid kpiDisplayType={kpiDisplayType} size={size} type={type} />;
  }

  // Small (or fallback): single-KPI
  return (
    <SingleKPI
      kpi={kpi}
      kpiDisplayType={kpiDisplayType}
      size={size}
      type={type}
      availableH={availableH}
      availableW={availableW}
    />
  );
};

export default KPIWidget;
