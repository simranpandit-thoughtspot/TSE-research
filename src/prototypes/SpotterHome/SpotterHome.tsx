import React from 'react';
import styles from './SpotterHome.module.css';
import BgSvg from './Bg.svg';

// Figma asset — avatar photo (expires ~7 days)
const AVATAR = 'https://www.figma.com/api/mcp/asset/9fc36c18-b5d7-49a8-a07c-8b8da8a1787e';

// ─── Spotter section assets (Figma MCP, expires ~7 days) ─────────────────────
const imgVector   = 'https://www.figma.com/api/mcp/asset/1ffc36ec-6518-428a-9758-82f3834bcd70';
const imgVector1  = 'https://www.figma.com/api/mcp/asset/68d064e1-7f3f-44c9-b29b-512c742324d2';
const imgGroup    = 'https://www.figma.com/api/mcp/asset/45ba063f-3057-4c5c-afdc-642237a65ac9';
const imgGroup1   = 'https://www.figma.com/api/mcp/asset/2afa36e5-e13f-4225-8cda-89eb5d9e9615';
const imgVector2  = 'https://www.figma.com/api/mcp/asset/34639ec5-3113-4bb0-a1f9-f0e265215d15';
const imgPath1    = 'https://www.figma.com/api/mcp/asset/04eb40e0-22ec-4ffc-b938-9c8236500bfa';
const imgControls = 'https://www.figma.com/api/mcp/asset/904d1153-0671-4413-9736-3654552ce13c';
const imgPath2    = 'https://www.figma.com/api/mcp/asset/5dbee5a8-9fc4-4315-b714-b15911a9bd97';
const imgPath     = 'https://www.figma.com/api/mcp/asset/d1794ee7-dd04-4e39-9127-280258ba2079';
const imgEllipse258 = 'https://www.figma.com/api/mcp/asset/3a9d51d5-d814-4c48-8abe-9d31fd0853f9';
const imgEllipse635 = 'https://www.figma.com/api/mcp/asset/791a4a50-b0b0-474e-840e-014e5f33209a';
const imgEllipse634 = 'https://www.figma.com/api/mcp/asset/9910ecd7-172c-40b7-907a-31551f3763d7';

// ─── Watchlist section assets (Figma MCP, expires ~7 days) ───────────────────
const wlStar2        = 'https://www.figma.com/api/mcp/asset/f27e0f70-4b4d-4e6b-814f-8567b5ab1a6c';
const wlStar3        = 'https://www.figma.com/api/mcp/asset/312e516e-065a-4969-b78e-b6f6d98b607e';
const wlGroup3177    = 'https://www.figma.com/api/mcp/asset/893c8bfd-72e0-4953-b81c-953b94504a2d';
const wlGroup3155    = 'https://www.figma.com/api/mcp/asset/6d5ffdf5-fe41-4690-8742-b403e01cce81';
const wlGroup3158    = 'https://www.figma.com/api/mcp/asset/915f4d5b-30cc-440d-bda4-23945e751c66';
const wlArrowUp      = 'https://www.figma.com/api/mcp/asset/034d5db7-47da-4445-bc8c-68a3e508b4a7';
const wlArrowDown    = 'https://www.figma.com/api/mcp/asset/de95fe33-74be-4ce6-a14d-410047bf53d0';
const wlSparkline    = 'https://www.figma.com/api/mcp/asset/820161a8-a9a3-41f1-8f50-31736cfa42c2';
const wlSparklineLine = 'https://www.figma.com/api/mcp/asset/66c00cb3-59f0-4a04-b86c-28c51557b84a';

// ─── Icons ────────────────────────────────────────────────────────────────────

const TSLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21.0234 18.0469C22.6674 18.0469 24.0008 19.3795 24.001 21.0234C24.001 22.6675 22.6675 24.001 21.0234 24.001C19.3795 24.0008 18.0469 22.6674 18.0469 21.0234C18.047 19.3796 19.3796 18.047 21.0234 18.0469ZM23.8135 7.44141H15.627V23.8125H14.1387V7.44141H12.6514V23.8125H11.1631V7.44141H9.6748V23.8125H8.18652V7.44141H0V5.95312H23.8135V7.44141ZM23.8135 4.46484H0V2.97656H23.8135V4.46484ZM23.8135 1.48828H0V0H23.8135V1.48828Z" fill="#1d232f" />
  </svg>
);

const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#777e8b" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="4.5" /><line x1="9.5" y1="9.5" x2="13" y2="13" />
  </svg>
);

const IcoHelp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#777e8b" strokeWidth="1.5" />
    <path d="M6.2 6.1c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1.1-.9 1.5-1.5 2-.2.2-.3.4-.3.7" stroke="#777e8b" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="#777e8b" />
  </svg>
);

const IcoBell = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2L2 10.5h12L12.5 8.5v-2A4.5 4.5 0 0 0 8 2Z" stroke="#777e8b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="#777e8b" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IcoChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#1d232f" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

// Side nav tab icons
const IcoChart = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#1d232f">
    <rect x="0.5" y="10.5" width="3" height="7" rx="1" />
    <rect x="5" y="7" width="3" height="10.5" rx="1" />
    <rect x="9.5" y="3" width="3" height="14.5" rx="1" />
    <rect x="14" y="5.5" width="3" height="12" rx="1" />
  </svg>
);

const IcoList = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1d232f" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="5" x2="15" y2="5" /><line x1="3" y1="9" x2="15" y2="9" /><line x1="3" y1="13" x2="11" y2="13" />
  </svg>
);

const IcoCode = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1d232f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6 2.5 9 6 12M12 6l3.5 3L12 12M10.5 4l-3 10" />
  </svg>
);

const IcoCog = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1d232f" strokeWidth="1.5">
    <circle cx="9" cy="9" r="2.5" />
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.46 3.46l1.41 1.41M13.13 13.13l1.41 1.41M14.54 3.46l-1.41 1.41M4.87 13.13l-1.41 1.41" strokeLinecap="round" />
  </svg>
);

const IcoPlus = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1d232f" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="9" cy="9" r="7.5" />
    <line x1="9" y1="5.5" x2="9" y2="12.5" /><line x1="5.5" y1="9" x2="12.5" y2="9" />
  </svg>
);

const IcoExternal = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#777e8b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
    <path d="M8 1h3v3M11 1 6 6" />
  </svg>
);

const IcoLiveboard = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <rect x="0.5" y="0.5" width="3.5" height="3.5" rx="0.5" fill="#777e8b" />
    <rect x="6" y="0.5" width="3.5" height="3.5" rx="0.5" fill="#777e8b" />
    <rect x="0.5" y="6" width="3.5" height="3.5" rx="0.5" fill="#777e8b" />
    <rect x="6" y="6" width="3.5" height="3.5" rx="0.5" fill="#777e8b" />
  </svg>
);

const IcoChevronRight = () => (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" stroke="#1d232f" strokeWidth="1.4" strokeLinecap="round">
    <path d="M1 1l5 4-5 4" />
  </svg>
);

const IcoPlusSimple = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1d232f" strokeWidth="1.5" strokeLinecap="round">
    <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

// ─── Dog avatar — 4 masked layers ────────────────────────────────────────────

const DogAvatar: React.FC = () => (
  <div className={styles.dogAvatar}>
    {/* Layer 1 */}
    <div
      className={styles.dogLayer1}
      style={{ maskImage: `url('${imgVector}')`, WebkitMaskImage: `url('${imgVector}')` }}
    >
      <img alt="" src={imgVector1} className={styles.dogLayerImg} />
    </div>
    {/* Layer 2 */}
    <div
      className={styles.dogLayer2}
      style={{ maskImage: `url('${imgVector}')`, WebkitMaskImage: `url('${imgVector}')` }}
    >
      <div className={styles.dogLayer2Inner}>
        <img alt="" src={imgGroup} className={styles.dogLayerImgFill} />
      </div>
    </div>
    {/* Layer 3 */}
    <div
      className={styles.dogLayer3}
      style={{ maskImage: `url('${imgVector}')`, WebkitMaskImage: `url('${imgVector}')` }}
    >
      <div className={styles.dogLayer3Inner}>
        <img alt="" src={imgGroup1} className={styles.dogLayerImgFill} />
      </div>
    </div>
    {/* Layer 4 */}
    <div
      className={styles.dogLayer4}
      style={{ maskImage: `url('${imgVector}')`, WebkitMaskImage: `url('${imgVector}')` }}
    >
      <img alt="" src={imgVector2} className={styles.dogLayerImg} />
    </div>
  </div>
);

// ─── ModeToggle — 60×32px pill ────────────────────────────────────────────────

const ModeToggle: React.FC = () => (
  <div className={styles.modeToggle}>
    <div className={styles.modeToggleBg} />
    <div className={styles.modeToggleActive} />
    {/* Left button (active): analytics icon */}
    <button className={`${styles.modeToggleBtn} ${styles.modeToggleBtnLeft}`} aria-label="Search mode">
      <div className={styles.modeToggleBtnCentre}>
        {/* First rotated ellipse */}
        <div className={styles.modeToggleIcoWrap1}>
          <div className={styles.modeToggleRotNeg45}>
            <div className={styles.modeToggleEllWrap1}>
              <div className={styles.modeToggleEllInset}>
                <img alt="" src={imgEllipse258} className={styles.dogLayerImg} />
              </div>
            </div>
          </div>
        </div>
        {/* Second rotated ellipse */}
        <div className={styles.modeToggleIcoWrap2}>
          <div className={styles.modeToggleRot45}>
            <div className={styles.modeToggleEllWrap2}>
              <img alt="" src={imgEllipse635} className={styles.dogLayerImg} />
            </div>
          </div>
        </div>
        {/* Small centre dot */}
        <div className={styles.modeToggleEllSmall}>
          <img alt="" src={imgEllipse634} className={styles.dogLayerImg} />
        </div>
      </div>
    </button>
    {/* Right button: explore icon */}
    <button className={`${styles.modeToggleBtn} ${styles.modeToggleBtnRight}`} aria-label="Explore mode">
      <div className={styles.modeToggleExploreInset}>
        <img alt="" src={imgPath} className={styles.dogLayerImg} />
      </div>
    </button>
  </div>
);

// ─── Spotter section ──────────────────────────────────────────────────────────

const SpotterSection: React.FC = () => (
  <div className={styles.spotterFrame}>
    {/* Background gradient — centered behind prompt box */}
    <img src={BgSvg} alt="" className={styles.spotterBg} />

    {/* Centred content column */}
    <div className={styles.spotterInner}>

      {/* Welcome message */}
      <div className={styles.spotterWelcome}>
        <div className={styles.spotterTitleRow}>
          <DogAvatar />
          <p className={styles.spotterTitle}>Hi! I'm Spotter, your AI data analyst</p>
        </div>
        <p className={styles.spotterSubtitle}>Let's make sense of your data together</p>
      </div>

      {/* Prompt box */}
      <div className={styles.promptBox}>
        {/* Input row */}
        <div className={styles.promptInputRow}>
          <p className={styles.promptPlaceholder}>Ask me a question. Use '@' to select columns and values.</p>
        </div>

        {/* Toolbar row */}
        <div className={styles.promptToolbar}>
          <div className={styles.promptLeftActions}>
            <ModeToggle />
            <div className={styles.toolbarDivider} />
            {/* GTMRevOps split button */}
            <div className={styles.splitBtn}>
              <button className={styles.splitBtnLeft}>GTMRevOps</button>
              <div className={styles.splitBtnRight}>
                <div className={styles.splitBtnRightBg} />
                <div className={styles.splitBtnChevron}>
                  <div className={styles.splitBtnChevronPath}>
                    <img alt="" src={imgPath1} className={styles.dogLayerImg} />
                  </div>
                </div>
              </div>
            </div>
            {/* Ghost + button */}
            <button className={styles.ghostPlusBtn} aria-label="Add">
              <IcoPlusSimple />
            </button>
          </div>
          <div className={styles.promptRightActions}>
            <button className={styles.controlsBtn} aria-label="Controls">
              <img alt="" src={imgControls} className={styles.controlsIcon} />
            </button>
            <button className={styles.sendBtn} aria-label="Send">
              <div className={styles.sendBtnIcon}>
                <div className={styles.sendBtnIconPath}>
                  <img alt="" src={imgPath2} className={styles.dogLayerImg} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
);

// ─── Watchlist icons ──────────────────────────────────────────────────────────

const IcoAIAgent: React.FC = () => (
  <div className={styles.recentIconBox}>
    <div className={styles.aiIconClip}>
      <div className={styles.aiStarTopLeft}><div className={styles.aiStarTopLeftInner}><img alt="" src={wlStar2} className={styles.wlFill} /></div></div>
      <div className={styles.aiStarBotRight}><div className={styles.aiStarBotRightInner}><img alt="" src={wlStar3} className={styles.wlFill} /></div></div>
    </div>
  </div>
);

const IcoLiveboardItem: React.FC = () => (
  <div className={styles.recentIconBox}>
    <img alt="" src={wlGroup3177} className={styles.liveboardItemIcon} />
  </div>
);

const IcoPieChartItem: React.FC = () => (
  <div className={styles.recentIconBox}>
    <img alt="" src={wlGroup3155} className={styles.pieMainIcon} />
    <img alt="" src={wlGroup3158} className={styles.pieBadgeIcon} />
  </div>
);

const WlArrowUp: React.FC = () => (
  <div className={styles.deltaArrowBox}>
    <div className={styles.deltaArrowInner}>
      <div className={styles.deltaArrowPath}><img alt="" src={wlArrowUp} className={styles.wlFill} /></div>
    </div>
  </div>
);

const WlArrowDown: React.FC = () => (
  <div className={styles.deltaArrowBox}>
    <div className={styles.deltaArrowInner}>
      <div className={styles.deltaArrowPath}><img alt="" src={wlArrowDown} className={styles.wlFill} /></div>
    </div>
  </div>
);

const IcoPlusBlue = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#2770ef" strokeWidth="1.5" strokeLinecap="round">
    <line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" />
  </svg>
);

// ─── Watchlist data ───────────────────────────────────────────────────────────

type RecentIconType = 'ai' | 'liveboard' | 'pie';
const RECENTS: Array<{ label: string; time: string; icon: RecentIconType }> = [
  { label: 'Quarterly profit dashboard',     time: 'Yesterday', icon: 'ai' },
  { label: 'Customer attrition by team',     time: 'Yesterday', icon: 'liveboard' },
  { label: 'New leads by marketing channel', time: 'Yesterday', icon: 'pie' },
  { label: 'Adelaide product pipeline',      time: 'Yesterday', icon: 'pie' },
  { label: 'Weekly active users',            time: 'Yesterday', icon: 'ai' },
];

type DeltaDir = 'up' | 'down' | 'neutral';
const KPI_ITEMS: Array<{ title: string; period: string; value: string; delta: string; dir: DeltaDir }> = [
  { title: 'Total Revenue by Product',          period: 'WoW', value: '88.888M',  delta: '20.74', dir: 'up' },
  { title: 'Sessions by Traffic Source',         period: 'MoM', value: '10.07M',   delta: '20.74', dir: 'up' },
  { title: 'Conversion Rate by Marketing',       period: 'WoW', value: '6.3%',     delta: '20.74', dir: 'down' },
  { title: 'Avg. Session Duration by Platform',  period: 'MoM', value: '14.52M',   delta: '0',     dir: 'neutral' },
  { title: 'New Users by Last Week',             period: 'MoM', value: '575.124M', delta: '20.74', dir: 'down' },
  { title: 'Customer Churn Rate by Tier',        period: 'WoW', value: '88.888M',  delta: '20.74', dir: 'up' },
  { title: 'Total Orders by Monthly Date',       period: 'WoW', value: '88.888M',  delta: '20.74', dir: 'up' },
];

// ─── Watchlist cards ──────────────────────────────────────────────────────────

const RecentsCard: React.FC = () => (
  <div className={styles.recentsCard}>
    <div className={styles.cardHeader}>
      <span className={styles.cardHeaderLabel}>Recents</span>
    </div>
    <div className={styles.cardDivider} />
    <div className={styles.recentsList}>
      {RECENTS.map((item, i) => (
        <div key={i} className={styles.recentsItem}>
          <div className={styles.recentsIconWrap}>
            {item.icon === 'ai'        && <IcoAIAgent />}
            {item.icon === 'liveboard' && <IcoLiveboardItem />}
            {item.icon === 'pie'       && <IcoPieChartItem />}
          </div>
          <div className={styles.recentsText}>
            <p className={styles.recentsName}>{item.label}</p>
            <p className={styles.recentsTime}>{item.time}</p>
          </div>
        </div>
      ))}
    </div>
    <div className={styles.recentsScrollbar}><div className={styles.scrollbarThumb} /></div>
  </div>
);

function KpiRow({ title, period, value, delta, dir }: { title: string; period: string; value: string; delta: string; dir: DeltaDir }) {
  const dc = dir === 'up' ? styles.deltaUp : dir === 'down' ? styles.deltaDown : styles.deltaNeutral;
  return (
    <div className={styles.kpiItem}>
      <div className={styles.kpiItemLeft}>
        <button className={styles.kpiTitle}>{title}</button>
        <p className={styles.kpiPeriod}>{period}</p>
      </div>
      <div className={styles.kpiItemRight}>
        <div className={styles.kpiValueDelta}>
          <p className={styles.kpiValue}>{value}</p>
          <div className={styles.kpiDeltaRow}>
            {dir === 'up'   && <WlArrowUp />}
            {dir === 'down' && <WlArrowDown />}
            <span className={dc}>{delta}</span>
            <span className={dc}>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const WatchlistCard: React.FC = () => (
  <div className={styles.watchlistCard}>
    <div className={styles.cardHeader}>
      <span className={styles.cardHeaderLabel}>Watchlist</span>
      <button className={styles.addKpiBtn}><IcoPlusBlue /><span>Add KPI</span></button>
    </div>
    <div className={styles.cardDivider} />
    <div className={styles.kpiList}>
      {KPI_ITEMS.map((item, i) => <KpiRow key={i} {...item} />)}
      {/* Sparkline row */}
      <div className={styles.kpiItemSparkline}>
        <div className={styles.kpiItemLeft}>
          <p className={styles.kpiTitleStatic}>Total Orders by Monthly Date</p>
          <p className={styles.kpiPeriod}>WoW</p>
        </div>
        <div className={styles.kpiSparklineRight}>
          <div className={styles.sparklineWrap}>
            <img alt="" src={wlSparkline} className={styles.sparklineImg} />
            <div className={styles.sparklineBaseline}>
              <div className={styles.sparklineBaselineInner}>
                <img alt="" src={wlSparklineLine} className={styles.wlFill} />
              </div>
            </div>
          </div>
          <div className={styles.sparklineStats}>
            <div className={styles.sparklinePill}>
              <span className={styles.sparklinePillText}>0.2</span>
              <span className={styles.sparklinePillText}>%</span>
            </div>
            <p className={styles.kpiValue}>88.888M</p>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.watchlistScrollbar}><div className={styles.scrollbarThumb} /></div>
  </div>
);

// ─── Watchlist section ────────────────────────────────────────────────────────

const WatchlistSection: React.FC = () => (
  <div className={styles.watchlistFrame}>
    <div className={styles.watchlistRow}>
      <RecentsCard />
      <WatchlistCard />
    </div>
  </div>
);

// ─── Favourites data ──────────────────────────────────────────────────────────

const FAVS = [
  { label: 'Retails Sales', dot: false },
  { label: 'Total sales, Total quantity pu...', dot: false },
  { label: 'Cloud Clusters', dot: true },
  { label: 'Sales by state and region', dot: true },
  { label: 'Retails Sales', dot: false },
];

// ─── Component ────────────────────────────────────────────────────────────────

const SpotterHome: React.FC = () => (
  <div className={styles.page}>

    {/* ── Global Header — 60px ───────────────────────────────────────────── */}
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <TSLogo />
      </div>
      <div className={styles.headerToolbar}>
        <div className={styles.searchBar}>
          <IcoSearch />
          <span className={styles.searchText}>Search in your library</span>
        </div>
        <button className={styles.utilBtn} aria-label="Help"><IcoHelp /></button>
        <button className={`${styles.utilBtn} ${styles.bellBtn}`} aria-label="Notifications">
          <IcoBell />
          <span className={styles.notifDot} />
        </button>
        <div className={styles.orgSwitcher}>
          <button className={styles.orgName}>
            <span>Royal Enfield</span>
            <IcoChevronDown />
          </button>
          <button className={styles.avatarBtn}>
            <img src={AVATAR} alt="User avatar" className={styles.avatar} />
          </button>
        </div>
      </div>
    </header>

    {/* ── Body ───────────────────────────────────────────────────────────── */}
    <div className={styles.body}>

      {/* ── Side Nav — 261px ─────────────────────────────────────────────── */}
      <aside className={styles.sideNav}>

        {/* Icon tab strip */}
        <div className={styles.iconTabs}>
          <button className={`${styles.iconTab} ${styles.iconTabActive}`} aria-label="Insights"><IcoChart /></button>
          <button className={styles.iconTab} aria-label="Data workspace"><IcoList /></button>
          <button className={styles.iconTab} aria-label="Develop"><IcoCode /></button>
          <button className={styles.iconTab} aria-label="Settings"><IcoCog /></button>
        </div>

        {/* Nav content */}
        <nav className={styles.navMenu}>
          {/* Insights header */}
          <div className={styles.navTopHeader}>
            <span className={styles.navTopTitle}>Insights</span>
            <button className={styles.navPlusBtn} aria-label="Add"><IcoPlus /></button>
          </div>

          {/* Section 1 */}
          <div className={styles.navSection}>
            <button className={`${styles.navItem} ${styles.navItemActive}`}>Home</button>
            <button className={styles.navItem}>Spotter</button>
            <button className={styles.navItem}>
              AgentSpot
              <IcoExternal />
            </button>
            <button className={styles.navItem}>Search data</button>
          </div>

          {/* Section 2 — Library */}
          <div className={styles.navSection}>
            <p className={styles.navLabel}>Library</p>
            <button className={styles.navItem}>Liveboards</button>
            <button className={styles.navItem}>Answers</button>
          </div>

          {/* Section 3 — Analysis & Alerts */}
          <div className={styles.navSection}>
            <p className={styles.navLabel}>Analysis &amp; Alerts</p>
            <button className={styles.navItem}>Subscriptions</button>
            <button className={styles.navItem}>SpotIQ analysis</button>
          </div>

          <hr className={styles.navDivider} />

          {/* Collections */}
          <div className={styles.navSection}>
            <button className={styles.navItem}>Collections</button>
          </div>

          {/* Favourites */}
          <div className={styles.navSection}>
            <p className={styles.navLabel}>Favourites</p>
            {FAVS.map((fav, i) => (
              <button key={i} className={`${styles.navItem} ${styles.navItemFav}`}>
                <span className={fav.dot ? styles.favDotActive : styles.favDotEmpty} />
                <IcoLiveboard />
                <span className={styles.favLabel}>{fav.label}</span>
              </button>
            ))}
            <button className={styles.showMore}>
              Show more <IcoChevronRight />
            </button>
          </div>
        </nav>
      </aside>

      {/* ── Content area — 1179 × 813px ────────────────────────────────────── */}
      <main className={styles.contentArea}>
        {/* Spotter div — 40% = 325.2px */}
        <div className={styles.spotterDiv}><SpotterSection /></div>
        {/* Watchlist div — 60% = 487.8px */}
        <div className={styles.watchlistDiv}><WatchlistSection /></div>
      </main>

    </div>
  </div>
);

export default SpotterHome;
