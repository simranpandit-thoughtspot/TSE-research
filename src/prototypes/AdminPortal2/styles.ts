import { CSSProperties } from 'react';
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const pageHeaderStyles = {
  container: {
    marginBottom: `${spacing.D}px`,
  } as CSSProperties,

  title: {
    fontSize: '24px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    margin: 0,
    marginBottom: `${spacing.D}px`,
    letterSpacing: '-0.3px',
    fontFamily: font,
  } as CSSProperties,

  tabs: {
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  } as CSSProperties,
};

export const toolbarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: `${spacing.D}px`,
    marginBottom: `${spacing.D}px`,
    gap: `${spacing.D}px`,
  } as CSSProperties,

  left: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
  } as CSSProperties,

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
  } as CSSProperties,

  searchWrapper: {
    position: 'relative',
    width: '220px',
  } as CSSProperties,

  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: systemColors.light['content-tertiary'],
    display: 'flex',
    pointerEvents: 'none',
  } as CSSProperties,

  searchInput: {
    width: '100%',
    height: '36px',
    paddingLeft: '36px',
    paddingRight: '12px',
    border: `1px solid ${referenceColors.gray['30']}`,
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: font,
    backgroundColor: systemColors.light['background-base'],
  } as CSSProperties,

  settingsButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    border: `1px solid ${referenceColors.gray['30']}`,
    backgroundColor: systemColors.light['background-base'],
    cursor: 'pointer',
    color: systemColors.light['content-secondary'],
  } as CSSProperties,

  createButtonGroup: {
    display: 'flex',
    alignItems: 'stretch',
    borderRadius: '6px',
    overflow: 'hidden',
  } as CSSProperties,

  createButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: systemColors.light['content-brand'],
    color: '#FFFFFF',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: font,
    whiteSpace: 'nowrap',
  } as CSSProperties,

  createChevron: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    backgroundColor: systemColors.light['content-brand'],
    borderLeft: '1px solid rgba(255,255,255,0.25)',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
  } as CSSProperties,
};

export const tableStyles = {
  container: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '8px',
    border: `1px solid ${systemColors.light['background-subtle']}`,
    overflow: 'hidden',
  } as CSSProperties,

  headerRow: {
    display: 'grid',
    gridTemplateColumns: '40px 2fr 1fr 1fr 60px',
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
    fontSize: '12px',
    fontWeight: 600,
    color: systemColors.light['content-secondary'],
    alignItems: 'center',
    fontFamily: font,
  } as CSSProperties,

  headerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'default',
  } as CSSProperties,

  row: {
    display: 'grid',
    gridTemplateColumns: '40px 2fr 1fr 1fr 60px',
    padding: `${spacing.C}px ${spacing.D}px`,
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    fontFamily: font,
  } as CSSProperties,

  groupName: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    cursor: 'pointer',
  } as CSSProperties,

  groupSubtitle: {
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    marginTop: '2px',
  } as CSSProperties,

  cell: {
    fontSize: '14px',
    color: referenceColors.gray['70'],
  } as CSSProperties,

  moreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: `1px solid ${referenceColors.gray['30']}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: systemColors.light['content-secondary'],
  } as CSSProperties,

  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${spacing.B}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    borderTop: `1px solid ${systemColors.light['background-subtle']}`,
    fontSize: '14px',
    color: systemColors.light['content-secondary'],
    fontFamily: font,
  } as CSSProperties,

  paginationLink: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontFamily: font,
  } as CSSProperties,
};

export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as CSSProperties,

  container: {
    width: '600px',
    maxHeight: '90vh',
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '6px',
    boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16), 0px 0px 4px rgba(25, 35, 49, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as CSSProperties,

  header: {
    padding: `${spacing.E}px ${spacing.F}px`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  } as CSSProperties,

  contextLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
    marginBottom: `${spacing.A}px`,
    fontFamily: font,
  } as CSSProperties,

  stepTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    letterSpacing: '-0.4px',
    margin: 0,
    fontFamily: font,
  } as CSSProperties,

  content: {
    flex: 1,
    padding: `${spacing.F}px`,
    overflowY: 'auto',
    minHeight: '400px',
  } as CSSProperties,

  progressContainer: {
    display: 'flex',
    gap: '6px',
    height: '4px',
  } as CSSProperties,

  progressSegment: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    backgroundColor: systemColors.light['background-subtle'],
    transition: 'background-color 0.2s ease',
  } as CSSProperties,

  progressSegmentActive: {
    backgroundColor: systemColors.light['content-brand'],
  } as CSSProperties,

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.E}px ${spacing.F}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px',
  } as CSSProperties,

  cancelButton: {
    background: 'none',
    border: 'none',
    color: systemColors.light['content-brand'],
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    padding: '6px 4px',
    borderRadius: '6px',
    fontFamily: font,
  } as CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: `${spacing.D}px`,
  } as CSSProperties,

  backButton: {
    backgroundColor: systemColors.light['background-subtle'],
    color: systemColors.light['content-primary'],
    border: 'none',
    padding: '6px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    height: '32px',
    fontFamily: font,
  } as CSSProperties,

  nextButton: {
    backgroundColor: systemColors.light['content-brand'],
    color: '#FFFFFF',
    border: 'none',
    padding: '6px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 400,
    cursor: 'pointer',
    height: '32px',
    fontFamily: font,
  } as CSSProperties,

  nextButtonDisabled: {
    backgroundColor: referenceColors.gray['30'],
    cursor: 'not-allowed',
  } as CSSProperties,
};

export const formStyles = {
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.D}px`,
    fontFamily: font,
  } as CSSProperties,

  fieldGroup: {
    marginBottom: `${spacing.E}px`,
  } as CSSProperties,

  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`,
    display: 'block',
    fontFamily: font,
  } as CSSProperties,

  optionalTag: {
    fontSize: '13px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
  } as CSSProperties,
};

export const checkboxListStyles = {
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: `${spacing.B}px`,
    fontFamily: font,
  } as CSSProperties,

  optionalTag: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
  } as CSSProperties,

  infoNote: {
    fontSize: '13px',
    color: systemColors.light['content-brand'],
    backgroundColor: `${systemColors.light['content-brand']}08`,
    padding: `${spacing.C}px ${spacing.D}px`,
    borderRadius: '6px',
    marginBottom: `${spacing.C}px`,
    fontFamily: font,
    lineHeight: 1.5,
  } as CSSProperties,

  searchContainer: {
    marginBottom: `${spacing.C}px`,
  } as CSSProperties,

  searchInput: {
    width: '100%',
    height: '36px',
    paddingLeft: '40px',
    paddingRight: '12px',
    border: `1px solid ${systemColors.light['border-default']}`,
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: font,
  } as CSSProperties,

  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: `${spacing.B}px`,
  } as CSSProperties,

  countLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,

  actionLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
  } as CSSProperties,

  actionLink: {
    fontSize: '13px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: font,
  } as CSSProperties,

  divider: {
    width: '1px',
    height: '18px',
    backgroundColor: systemColors.light['background-subtle'],
  } as CSSProperties,

  listContainer: {
    border: `1px solid ${systemColors.light['background-subtle']}`,
    borderRadius: '6px',
    overflow: 'hidden',
    backgroundColor: systemColors.light['background-base'],
  } as CSSProperties,

  listScroll: {
    maxHeight: '240px',
    overflowY: 'auto',
    padding: `${spacing.C}px ${spacing.D}px`,
  } as CSSProperties,

  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.B}px 0`,
  } as CSSProperties,

  listItemLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-primary'],
    flex: 1,
    fontFamily: font,
  } as CSSProperties,

  listItemMeta: {
    fontSize: '13px',
    color: systemColors.light['content-tertiary'],
    fontFamily: font,
  } as CSSProperties,

  infoIcon: {
    display: 'flex',
    alignItems: 'center',
    color: systemColors.light['content-tertiary'],
    cursor: 'help',
  } as CSSProperties,

  toggleFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    borderTop: `1px solid ${systemColors.light['background-subtle']}`,
    backgroundColor: systemColors.light['background-base'],
  } as CSSProperties,

  toggleLabel: {
    fontSize: '14px',
    fontWeight: 400,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,
};

export const detailPanelStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as CSSProperties,

  panel: {
    width: '680px',
    height: '600px',
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '6px',
    boxShadow: '0px 24px 32px rgba(25, 35, 49, 0.16), 0px 0px 4px rgba(25, 35, 49, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as CSSProperties,

  header: {
    padding: `${spacing.E}px ${spacing.F}px`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: `${spacing.D}px`,
  } as CSSProperties,

  headerInfo: {
    flex: 1,
  } as CSSProperties,

  headerTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    letterSpacing: '-0.4px',
    margin: 0,
    fontFamily: font,
  } as CSSProperties,

  headerSubtitle: {
    fontSize: '13px',
    color: systemColors.light['content-tertiary'],
    marginTop: '4px',
    fontFamily: font,
  } as CSSProperties,

  parentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: systemColors.light['content-brand'],
    backgroundColor: `${systemColors.light['content-brand']}0A`,
    padding: '2px 8px',
    borderRadius: '4px',
    marginTop: '8px',
    fontFamily: font,
  } as CSSProperties,

  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: systemColors.light['content-secondary'],
    flexShrink: 0,
  } as CSSProperties,

  tabsContainer: {
    padding: `0 ${spacing.F}px`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  } as CSSProperties,

  body: {
    flex: 1,
    overflowY: 'auto',
    padding: `${spacing.F}px`,
  } as CSSProperties,

  sectionHeader: {
    fontSize: '13px',
    fontWeight: 600,
    color: systemColors.light['content-secondary'],
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    marginBottom: `${spacing.C}px`,
    fontFamily: font,
  } as CSSProperties,

  sectionDivider: {
    height: '1px',
    backgroundColor: systemColors.light['background-subtle'],
    margin: `${spacing.E}px 0`,
  } as CSSProperties,

  inheritedBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: `${systemColors.light['content-brand']}08`,
    borderRadius: '6px',
    marginBottom: `${spacing.D}px`,
    fontSize: '13px',
    color: systemColors.light['content-brand'],
    fontFamily: font,
    lineHeight: 1.5,
  } as CSSProperties,

  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.C}px`,
    padding: `${spacing.B}px 0`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  } as CSSProperties,

  userAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: systemColors.light['content-brand'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: font,
    flexShrink: 0,
  } as CSSProperties,

  userName: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,

  userEmail: {
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    fontFamily: font,
  } as CSSProperties,

  privilegeRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.C}px 0`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
  } as CSSProperties,

  privilegeName: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,

  privilegeDescription: {
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    marginTop: '2px',
    fontFamily: font,
  } as CSSProperties,

  sourceBadge: {
    fontSize: '11px',
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: '4px',
    fontFamily: font,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  } as CSSProperties,

  directBadge: {
    color: systemColors.light['content-success'],
    backgroundColor: `${systemColors.light['content-success']}12`,
  } as CSSProperties,

  inheritedSourceBadge: {
    color: systemColors.light['content-brand'],
    backgroundColor: `${systemColors.light['content-brand']}12`,
  } as CSSProperties,

  rlsRow: {
    padding: `${spacing.C}px ${spacing.D}px`,
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '6px',
    marginBottom: `${spacing.B}px`,
    fontFamily: font,
  } as CSSProperties,

  rlsTable: {
    fontSize: '13px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,

  rlsExpression: {
    fontSize: '13px',
    color: referenceColors.gray['70'],
    marginTop: '4px',
    fontFamily: font,
  } as CSSProperties,

  rlsColumn: {
    fontWeight: 500,
    color: systemColors.light['content-primary'],
  } as CSSProperties,

  rlsValue: {
    fontWeight: 500,
    color: systemColors.light['content-brand'],
  } as CSSProperties,

  rlsSourceTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    fontWeight: 500,
    padding: '1px 6px',
    borderRadius: '3px',
    marginLeft: `${spacing.B}px`,
    fontFamily: font,
  } as CSSProperties,

  contentRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.C}px 0`,
    borderBottom: `1px solid ${systemColors.light['background-subtle']}`,
    gap: `${spacing.C}px`,
  } as CSSProperties,

  contentIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: systemColors.light['background-sunken'],
    flexShrink: 0,
  } as CSSProperties,

  contentName: {
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-primary'],
    fontFamily: font,
  } as CSSProperties,

  contentMeta: {
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    marginTop: '2px',
    fontFamily: font,
  } as CSSProperties,

  emptyState: {
    textAlign: 'center',
    padding: `${spacing.H}px`,
    color: systemColors.light['content-tertiary'],
    fontSize: '14px',
    fontFamily: font,
  } as CSSProperties,
};
