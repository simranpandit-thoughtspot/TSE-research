// @ts-nocheck
/**
 * CommandPalette - Main Component
 *
 * Phase 1 enhancements:
 * - richer default groups (Recent, Create, Quick links)
 * - broad search across objects + admin commands
 * - special query actions (View all / Spotter)
 * - initial filter support
 * - keyboard actions: Tab, Shift+Enter, Cmd/Ctrl+Enter
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Icon } from '../../components/icons';
import { systemColors, referenceColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { CommandSearch } from './components/CommandSearch';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { FilterOptions } from './components/FilterOptions';
import { ResultCard } from './components/ResultCard';
import {
  allItems,
  commandGroups,
  keyboardShortcuts,
  getItemsByFilter,
  getRankedFilterOptions,
  FILTER_OPTIONS,
} from './data/mockData';
import type {
  CommandItem,
  FilterOption,
  CommandPaletteProps,
} from './types';

const MODAL_WIDTH = 754;
const MODAL_HEIGHT = 540;
const MAX_RESULTS = 25;

const VIEW_ALL_ACTION_ID = 'special-view-all';
const SPOTTER_ACTION_ID = 'special-spotter-search';

function matchesItemQuery(item: CommandItem, query: string): boolean {
  const queryText = query.toLowerCase();
  return (
    item.label.toLowerCase().includes(queryText) ||
    item.description?.toLowerCase().includes(queryText) === true ||
    item.context?.toLowerCase().includes(queryText) === true ||
    item.tags?.some((tag) => tag.toLowerCase().includes(queryText)) === true ||
    item.keywords?.some((keyword) => keyword.toLowerCase().includes(queryText)) === true
  );
}

function dedupeItems(items: CommandItem[]): CommandItem[] {
  const seen = new Set<string>();
  const deduped: CommandItem[] = [];
  items.forEach((item) => {
    const uniqueKey = item.objectId ? `object-${item.objectId}` : `item-${item.id}`;
    if (seen.has(uniqueKey)) {
      return;
    }
    seen.add(uniqueKey);
    deduped.push(item);
  });
  return deduped;
}

function getSpecialQueryItems(query: string): CommandItem[] {
  return [
    {
      id: VIEW_ALL_ACTION_ID,
      label: `View all objects for "${query}"`,
      description: 'Open full search results',
      rightLabel: 'Search',
      icon: 'search',
      group: 'Actions',
      query,
      isViewAll: true,
    },
    {
      id: SPOTTER_ACTION_ID,
      label: `View search in Spotter for "${query}"`,
      description: 'Ask Spotter with current query',
      rightLabel: 'Spotter',
      icon: 'spotter',
      group: 'Actions',
      query,
      isSpotter: true,
    },
  ];
}

const Toast: React.FC<{ message: string; onDismiss: () => void }> = ({ message, onDismiss }) => {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 2500);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div style={styles.toast}>
      <Icon name="checkmark-circle" size="s" />
      <span style={styles.toastText}>{message}</span>
    </div>
  );
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelect,
  onFilterSelect,
  ResultCardComponent = ResultCard,
  context = 'default',
  initialFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const rankedFilterOptions = useMemo(() => getRankedFilterOptions(context), [context]);

  const isFilterMode = searchQuery.startsWith('/') && !activeFilter;
  const filterQuery = isFilterMode ? searchQuery.slice(1).trim() : '';

  const filteredFilterOptions = useMemo(() => {
    if (!filterQuery) {
      return rankedFilterOptions;
    }
    return rankedFilterOptions.filter((option) =>
      option.label.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }, [filterQuery, rankedFilterOptions]);

  const resultItems = useMemo(() => {
    if (isFilterMode) {
      return [];
    }

    if (activeFilter) {
      const filteredByType = getItemsByFilter(activeFilter.filterType);
      if (!searchQuery.trim()) {
        return dedupeItems(filteredByType);
      }
      return dedupeItems(filteredByType.filter((item) => matchesItemQuery(item, searchQuery)));
    }

    if (!searchQuery.trim()) {
      return commandGroups.flatMap((group) => group.items);
    }

    const query = searchQuery.trim();
    const searchResults = dedupeItems(allItems.filter((item) => matchesItemQuery(item, query))).slice(0, MAX_RESULTS);
    return [...searchResults, ...getSpecialQueryItems(query)];
  }, [activeFilter, isFilterMode, searchQuery]);

  const groupedItems = useMemo(() => {
    if (isFilterMode) {
      return [];
    }

    const groups: { title: string; items: CommandItem[] }[] = [];
    const groupMap = new Map<string, CommandItem[]>();

    resultItems.forEach((item) => {
      const groupTitle = item.group || 'Results';
      const existing = groupMap.get(groupTitle);
      if (existing) {
        existing.push(item);
      } else {
        groupMap.set(groupTitle, [item]);
      }
    });

    groupMap.forEach((items, title) => {
      groups.push({ title, items });
    });

    return groups;
  }, [resultItems, isFilterMode]);

  const flatItems = useMemo(() => {
    if (isFilterMode) {
      return filteredFilterOptions;
    }
    return resultItems;
  }, [isFilterMode, filteredFilterOptions, resultItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [flatItems.length, activeFilter, isFilterMode]);

  useEffect(() => {
    if (contentRef.current && selectedIndex >= 0) {
      const selected = contentRef.current.querySelector('[aria-selected="true"]');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      const preselectedFilter = initialFilter
        ? FILTER_OPTIONS.find((option) => option.id === initialFilter)
        : null;
      if (preselectedFilter) {
        setActiveFilter(preselectedFilter);
        setSearchQuery('');
      } else {
        setActiveFilter(null);
      }
    }
  }, [isOpen, initialFilter]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setActiveFilter(null);
      setSelectedIndex(0);
      setNotification(null);
    }
  }, [isOpen]);

  const executeItem = useCallback((item: CommandItem, mode: 'default' | 'new-tab' = 'default') => {
    if (mode === 'new-tab') {
      setNotification(`Opening "${item.label}" in new tab`);
      onSelect?.(item);
      return;
    }

    if (item.isSpotter) {
      setNotification(item.query ? `Asking Spotter: "${item.query}"` : 'Opening Spotter');
      onSelect?.(item);
      return;
    }

    if (item.isViewAll) {
      setNotification(item.query ? `Showing all results for "${item.query}"` : 'Showing full results');
      onSelect?.(item);
      return;
    }

    if (item.page) {
      setNotification(`Navigating to ${item.label}`);
    }

    onSelect?.(item);
  }, [onSelect]);

  const handleFilterSelect = useCallback((filter: FilterOption) => {
    setActiveFilter(filter);
    setSearchQuery('');
    onFilterSelect?.(filter);
  }, [onFilterSelect]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((previous) => Math.min(previous + 1, Math.max(flatItems.length - 1, 0)));
          return;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((previous) => Math.max(previous - 1, 0));
          return;
        case 'Tab':
          event.preventDefault();
          if (!flatItems[selectedIndex]) {
            return;
          }
          if (isFilterMode) {
            handleFilterSelect(flatItems[selectedIndex] as FilterOption);
          } else {
            executeItem(flatItems[selectedIndex] as CommandItem);
          }
          return;
        case 'Enter':
          event.preventDefault();

          if (event.shiftKey && !isFilterMode && flatItems[selectedIndex]) {
            executeItem(flatItems[selectedIndex] as CommandItem, 'new-tab');
            return;
          }

          if ((event.metaKey || event.ctrlKey) && searchQuery.trim()) {
            executeItem({
              id: SPOTTER_ACTION_ID,
              label: `View search in Spotter for "${searchQuery.trim()}"`,
              description: 'Ask Spotter with current query',
              rightLabel: 'Spotter',
              icon: 'spotter',
              group: 'Actions',
              query: searchQuery.trim(),
              isSpotter: true,
            });
            return;
          }

          if (!flatItems[selectedIndex]) {
            return;
          }

          if (isFilterMode) {
            handleFilterSelect(flatItems[selectedIndex] as FilterOption);
          } else {
            executeItem(flatItems[selectedIndex] as CommandItem);
          }
          return;
        case 'Escape':
          event.preventDefault();
          if (activeFilter) {
            setActiveFilter(null);
          } else if (searchQuery) {
            setSearchQuery('');
          } else {
            onClose();
          }
          return;
        case 'Backspace':
          if (searchQuery === '' && activeFilter) {
            setActiveFilter(null);
          }
          return;
        default:
      }
    },
    [
      isOpen,
      flatItems,
      selectedIndex,
      isFilterMode,
      searchQuery,
      activeFilter,
      onClose,
      executeItem,
      handleFilterSelect,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleClearFilter = () => {
    setActiveFilter(null);
    inputRef.current?.focus();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  let currentItemIndex = 0;

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      {notification && <Toast message={notification} onDismiss={() => setNotification(null)} />}

      <div style={styles.modal} onClick={(event) => event.stopPropagation()}>
        <CommandSearch
          value={searchQuery}
          onChange={setSearchQuery}
          activeFilter={activeFilter}
          onClearFilter={handleClearFilter}
          onClear={handleClearSearch}
          inputRef={inputRef}
          autoFocus
        />

        <div ref={contentRef} style={styles.content}>
          {isFilterMode && (
            <FilterOptions
              options={filteredFilterOptions}
              selectedIndex={selectedIndex}
              onSelect={handleFilterSelect}
              query={filterQuery}
            />
          )}

          {!isFilterMode && groupedItems.length > 0 && (
            <>
              {groupedItems.map((group) => (
                <div key={group.title} style={styles.group}>
                  <div style={styles.groupHeader}>{group.title}</div>
                  {group.items.map((item) => {
                    const itemIndex = currentItemIndex++;
                    return (
                      <ResultCardComponent
                        key={item.id}
                        item={item}
                        isSelected={itemIndex === selectedIndex}
                        onClick={() => executeItem(item)}
                        query={searchQuery}
                      />
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {!isFilterMode && groupedItems.length === 0 && searchQuery && (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        <KeyboardShortcuts shortcuts={keyboardShortcuts} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 35, 47, 0.5)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    zIndex: 1000,
    fontFamily: '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  modal: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    backgroundColor: systemColors.light['background-base'],
    borderRadius: 12,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  group: {
    paddingTop: `${spacing.A}px`,
  },
  groupHeader: {
    padding: `${spacing.D}px ${spacing.D}px ${spacing.B}px`,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '-0.072px',
    color: systemColors.light['content-secondary'],
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: 200,
    padding: `${spacing.H}px`,
  },
  emptyText: {
    fontSize: 14,
    color: systemColors.light['content-tertiary'],
    textAlign: 'center',
  },
  toast: {
    position: 'fixed',
    right: spacing.F,
    bottom: spacing.F,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.B,
    padding: `${spacing.B}px ${spacing.C}px`,
    borderRadius: 8,
    backgroundColor: systemColors.light['content-primary'],
    color: systemColors.light['background-base'],
    border: `1px solid ${referenceColors.gray['30']}`,
    zIndex: 1100,
  },
  toastText: {
    fontSize: 12,
    lineHeight: '18px',
  },
};

export default CommandPalette;
