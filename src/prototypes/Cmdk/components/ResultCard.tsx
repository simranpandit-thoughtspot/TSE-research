// @ts-nocheck
import React from 'react';
import { Icon } from '../../../components/icons';
import { systemColors } from '../../../tokens/colors';
import { spacing } from '../../../tokens/spacing';
import type { ResultCardProps } from '../types';

function highlightMatch(text: string, query?: string): React.ReactNode {
  if (!query || query.length === 0) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span style={{ fontWeight: 700, color: systemColors.light['content-primary'] }}>
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  );
}

export const ResultCard: React.FC<ResultCardProps> = ({
  item,
  isSelected,
  onClick,
  query,
}) => {
  const hasSecondary = Boolean(item.context) || Boolean(item.description) || Boolean(item.category);

  return (
    <div
      style={{
        ...styles.container,
        ...(isSelected ? styles.selected : {}),
      }}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
    >
      <div style={styles.iconContainer}>
        <Icon name={item.icon} size="s" />
      </div>

      <div style={styles.textRow}>
        <span style={styles.label}>
          {highlightMatch(item.label, query)}
        </span>

        {hasSecondary && (
          <span style={styles.secondary}>
            {item.context && <span>{item.context}</span>}
            {item.category && item.page ? (
              <span>{item.category} / {item.page}</span>
            ) : (
              item.description && <span>{highlightMatch(item.description, query)}</span>
            )}
          </span>
        )}
      </div>

      {item.rightLabel && (
        <span style={styles.rightLabel}>
          {item.rightLabel}
        </span>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.B}px ${spacing.D}px`,
    gap: `${spacing.C}px`,
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
  },
  selected: {
    backgroundColor: systemColors.light['background-sunken'],
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    color: systemColors.light['content-tertiary'],
    flexShrink: 0,
  },
  textRow: {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.B}px`,
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    fontWeight: 375,
    lineHeight: '20px',
    color: systemColors.light['content-primary'],
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  secondary: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center',
  },
  rightLabel: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    marginLeft: 'auto',
  },
};

export default ResultCard;
