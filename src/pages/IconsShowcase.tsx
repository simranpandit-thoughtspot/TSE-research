import React, { useState, useMemo } from 'react';
import { Icon, getIconNames } from '../components/icons';
import type { IconName, IconSize } from '../components/icons';
import { SearchInput } from '../components/SearchInput';
import { LastUpdated } from '../components/LastUpdated';
import { systemColors, referenceColors } from '../tokens/colors';

// Get all icon names from the registry
const ALL_ICONS = getIconNames();

// Group icons by category - only include icons that exist in the registry
const ICON_CATEGORIES: Record<string, IconName[]> = {
  'Action': ['plus', 'minus', 'cross', 'checkmark', 'copy', 'share', 'download', 'upload', 'save', 'pencil', 'trash-can', 'search', 'magnifying-glass', 'cog', 'filter', 'funnel', 'sort', 'expand', 'fullscreen'],
  'Navigation': ['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-down', 'arrow-up', 'arrow-left', 'arrow-right'],
  'Status': ['information', 'info-circle', 'checkmark-circle', 'cross-circle', 'exclamation-point-circle', 'question-mark'],
  'UI': ['eye', 'eye-undo', 'lock', 'pin', 'star', 'tag', 'folder', 'clock', 'profile', 'more', 'hamburger', 'play', 'pause'],
};

const SIZE_OPTIONS: { label: string; value: IconSize }[] = [
  { label: 'XS (12px)', value: 'xs' },
  { label: 'S (14px)', value: 's' },
  { label: 'M (16px)', value: 'm' },
  { label: 'L (18px)', value: 'l' },
];

export const IconsShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<IconSize>('m');
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Filter icons based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return ICON_CATEGORIES;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, IconName[]> = {};

    Object.entries(ICON_CATEGORIES).forEach(([category, icons]) => {
      const matchingIcons = icons.filter(icon => 
        icon.toLowerCase().includes(query) || 
        category.toLowerCase().includes(query)
      );
      if (matchingIcons.length > 0) {
        filtered[category] = matchingIcons;
      }
    });

    return filtered;
  }, [searchQuery]);

  const totalFilteredIcons = useMemo(() => {
    return Object.values(filteredCategories).flat().length;
  }, [filteredCategories]);

  const handleCopyIcon = (iconName: IconName) => {
    const code = `<Icon name="${iconName}" size="${selectedSize}" />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const handleCopyImport = () => {
    const code = `import { Icon } from './components/icons';`;
    navigator.clipboard.writeText(code);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <section style={styles.headerSection}>
        <LastUpdated componentId="icongallery" />
        <h1 style={styles.pageTitle}>Icons</h1>
        <p style={styles.pageDescription}>
          A comprehensive icon library with {ALL_ICONS.length} icons in 4 size variants (XS, S, M, L). 
          Click any icon to copy the code snippet.
        </p>
      </section>

      {/* Controls */}
      <section style={styles.controlsSection}>
        <div style={styles.controlsRow}>
          <div style={styles.searchWrapper}>
            <SearchInput
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={styles.sizeSelector}>
            <span style={styles.sizeLabel}>Size:</span>
            <div style={styles.sizeButtons}>
              {SIZE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  style={{
                    ...styles.sizeButton,
                    ...(selectedSize === option.value ? styles.sizeButtonActive : {}),
                  }}
                  onClick={() => setSelectedSize(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={styles.resultCount}>
          {searchQuery ? (
            <span>Showing {totalFilteredIcons} of {ALL_ICONS.length} icons</span>
          ) : (
            <span>{ALL_ICONS.length} icons available</span>
          )}
        </div>
      </section>

      {/* Usage */}
      <section style={styles.usageSection}>
        <h2 style={styles.sectionTitle}>Usage</h2>
        <div style={styles.codeBlock}>
          <div style={styles.codeHeader}>
            <span>Import</span>
            <button style={styles.copyButton} onClick={handleCopyImport}>Copy</button>
          </div>
          <pre style={styles.code}>
{`import { Icon } from './components/icons';

// Basic usage
<Icon name="plus" />

// With size and color
<Icon name="chevron-down" size="s" color="#666" />

// In a button
<Button icon="plus" iconPosition="leading">Add Item</Button>`}
          </pre>
        </div>
      </section>

      {/* Icon Grid by Category */}
      {Object.entries(filteredCategories).map(([category, icons]) => (
        <section key={category} style={styles.categorySection}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.iconGrid}>
            {icons.map((iconName) => (
              <div
                key={iconName}
                style={{
                  ...styles.iconCard,
                  ...(selectedIcon === iconName ? styles.iconCardSelected : {}),
                  ...(copiedIcon === iconName ? styles.iconCardCopied : {}),
                }}
                onClick={() => handleCopyIcon(iconName)}
                onMouseEnter={() => setSelectedIcon(iconName)}
                onMouseLeave={() => setSelectedIcon(null)}
              >
                <div style={styles.iconPreview}>
                  <Icon name={iconName} size={selectedSize} />
                </div>
                <span style={styles.iconName}>{iconName}</span>
                {copiedIcon === iconName && (
                  <span style={styles.copiedBadge}>Copied!</span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* No Results */}
      {Object.keys(filteredCategories).length === 0 && (
        <div style={styles.noResults}>
          <Icon name="search" size="l" color={systemColors.light['border-default']} />
          <p style={styles.noResultsText}>No icons found for "{searchQuery}"</p>
          <button 
            style={styles.clearButton}
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      )}

      {/* Size Reference */}
      <section style={styles.sizeReferenceSection}>
        <h2 style={styles.sectionTitle}>Size Reference</h2>
        <div style={styles.sizeGrid}>
          {SIZE_OPTIONS.map((option) => (
            <div key={option.value} style={styles.sizeRefCard}>
              <div style={styles.sizeRefHeader}>
                <span style={styles.sizeRefLabel}>{option.value.toUpperCase()}</span>
                <span style={styles.sizeRefPixels}>
                  {option.value === 'xs' ? '12px' : option.value === 's' ? '14px' : option.value === 'm' ? '16px' : '18px'}
                </span>
              </div>
              <div style={styles.sizeRefPreview}>
                <Icon name="star" size={option.value} />
                <Icon name="plus" size={option.value} />
                <Icon name="chevron-down" size={option.value} />
              </div>
              <p style={styles.sizeRefUsage}>
                {option.value === 'xs' && 'Chips, badges, compact UI'}
                {option.value === 's' && 'Small buttons, inline text'}
                {option.value === 'm' && 'Default for buttons, inputs'}
                {option.value === 'l' && 'Headers, emphasis, standalone'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1000px',
  },

  // Header
  headerSection: {
    marginBottom: '40px',
  },
  pageTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    color: systemColors.light['content-primary'],
    marginBottom: '12px',
  },
  pageDescription: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    color: systemColors.light['content-secondary'],
    lineHeight: '26px',
    maxWidth: '700px',
  },

  // Controls
  controlsSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    flex: '1',
    minWidth: '240px',
    maxWidth: '400px',
  },
  sizeSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sizeLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: referenceColors.gray['70'],
  },
  sizeButtons: {
    display: 'flex',
    gap: '4px',
    backgroundColor: systemColors.light['background-sunken'],
    padding: '4px',
    borderRadius: '8px',
  },
  sizeButton: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['content-secondary'],
    backgroundColor: 'transparent',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  sizeButtonActive: {
    backgroundColor: systemColors.light['background-base'],
    color: systemColors.light['content-primary'],
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  resultCount: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
    color: systemColors.light['content-tertiary'],
    marginTop: '16px',
  },

  // Usage
  usageSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '16px',
  },
  codeBlock: {
    backgroundColor: systemColors.light['content-primary'],
    borderRadius: '8px',
    overflow: 'hidden',
  },
  codeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: systemColors.light['border-default'],
  },
  copyButton: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    color: referenceColors.brand['40'],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background 0.15s ease',
  },
  code: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '13px',
    lineHeight: '22px',
    color: '#e5e5e5',
    padding: '16px',
    margin: 0,
    overflowX: 'auto',
  },

  // Category
  categorySection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  categoryTitle: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
    marginBottom: '20px',
  },

  // Icon Grid
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '12px',
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 12px',
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    border: '2px solid transparent',
    position: 'relative',
  },
  iconCardSelected: {
    backgroundColor: referenceColors.blue['10'],
    borderColor: referenceColors.brand['30'],
  },
  iconCardCopied: {
    backgroundColor: referenceColors.green['10'],
    borderColor: referenceColors.green['40'],
  },
  iconPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    color: referenceColors.gray['70'],
  },
  iconName: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '10px',
    fontWeight: 400,
    color: systemColors.light['content-tertiary'],
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  copiedBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '9px',
    fontWeight: 600,
    color: systemColors.light['content-success'],
    backgroundColor: referenceColors.green['10'],
    padding: '2px 6px',
    borderRadius: '4px',
  },

  // No Results
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  noResultsText: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    color: systemColors.light['content-tertiary'],
    marginTop: '16px',
    marginBottom: '16px',
  },
  clearButton: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: systemColors.light['content-brand'],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
  },

  // Size Reference
  sizeReferenceSection: {
    backgroundColor: systemColors.light['background-base'],
    borderRadius: '12px',
    padding: '24px',
    marginTop: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sizeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  sizeRefCard: {
    padding: '20px',
    backgroundColor: systemColors.light['background-sunken'],
    borderRadius: '8px',
  },
  sizeRefHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sizeRefLabel: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    color: systemColors.light['content-primary'],
  },
  sizeRefPixels: {
    fontFamily: '"SF Mono", Monaco, Inconsolata, monospace',
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
  },
  sizeRefPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px',
    color: referenceColors.gray['70'],
  },
  sizeRefUsage: {
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    color: systemColors.light['content-tertiary'],
    margin: 0,
  },
};

export default IconsShowcase;
