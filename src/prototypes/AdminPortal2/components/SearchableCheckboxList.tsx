import React, { useState, useMemo } from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { Toggle } from '../../../components/Toggle';
import { Icon } from '../../../components/icons';
import { checkboxListStyles as styles } from '../styles';
import { systemColors } from '../../../tokens/colors';

export interface ListItem {
  id: string;
  name: string;
  meta?: string;
  description?: string;
  showInfoIcon?: boolean;
}

interface SearchableCheckboxListProps {
  title: string;
  optional?: boolean;
  infoNote?: string;
  items: ListItem[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  showSelectAll?: boolean;
  singleSelect?: boolean;
  countLabel?: string;
}

export const SearchableCheckboxList: React.FC<SearchableCheckboxListProps> = ({
  title,
  optional = false,
  infoNote,
  items,
  selectedIds,
  onSelectionChange,
  showSelectAll = true,
  singleSelect = false,
  countLabel,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const filteredItems = useMemo(() => {
    let filtered = items;
    if (searchValue) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (showSelectedOnly) {
      filtered = filtered.filter(item => selectedIds.includes(item.id));
    }
    return filtered;
  }, [items, searchValue, showSelectedOnly, selectedIds]);

  const handleSelectAll = () => {
    const allIds = filteredItems.map(item => item.id);
    const newSelected = [...new Set([...selectedIds, ...allIds])];
    onSelectionChange(newSelected);
  };

  const handleClear = () => {
    const filteredIds = filteredItems.map(item => item.id);
    const newSelected = selectedIds.filter(id => !filteredIds.includes(id));
    onSelectionChange(newSelected);
  };

  const handleToggle = (itemId: string, checked: boolean) => {
    if (singleSelect) {
      onSelectionChange(checked ? [itemId] : []);
    } else if (checked) {
      onSelectionChange([...selectedIds, itemId]);
    } else {
      onSelectionChange(selectedIds.filter(id => id !== itemId));
    }
  };

  const label = countLabel || title;

  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <span style={styles.sectionTitle}>{title}</span>
        {optional && <span style={styles.optionalTag}> (Optional)</span>}
      </div>

      {infoNote && <div style={styles.infoNote}>{infoNote}</div>}

      <div style={styles.searchContainer}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: systemColors.light['content-tertiary'],
            display: 'flex',
          }}>
            <Icon name="magnifying-glass" size="s" color="currentColor" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.headerRow}>
        <span style={styles.countLabel}>
          {label} ({selectedIds.length})
        </span>
        {showSelectAll && !singleSelect && (
          <div style={styles.actionLinks}>
            <button style={styles.actionLink} onClick={handleSelectAll}>
              Select all
            </button>
            <div style={styles.divider} />
            <button style={styles.actionLink} onClick={handleClear}>
              Clear
            </button>
          </div>
        )}
      </div>

      <div style={styles.listContainer}>
        <div style={styles.listScroll}>
          {filteredItems.map((item) => (
            <div key={item.id} style={styles.listItem}>
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onChange={(checked) => handleToggle(item.id, checked)}
              />
              <span style={styles.listItemLabel}>{item.name}</span>
              {item.meta && (
                <span style={styles.listItemMeta}>{item.meta}</span>
              )}
              {item.showInfoIcon && (
                <span style={styles.infoIcon} title={item.description}>
                  <Icon name="info-circle" size="s" color="currentColor" />
                </span>
              )}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '24px',
              color: systemColors.light['content-tertiary'],
              fontSize: '14px',
            }}>
              {showSelectedOnly ? 'No items selected' : 'No items found'}
            </div>
          )}
        </div>

        <div style={styles.toggleFooter}>
          <Toggle
            checked={showSelectedOnly}
            onChange={setShowSelectedOnly}
          />
          <span style={styles.toggleLabel}>Show selected</span>
        </div>
      </div>
    </div>
  );
};

export default SearchableCheckboxList;
