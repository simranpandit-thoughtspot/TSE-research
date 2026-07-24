import React, { useEffect, useState } from 'react';
import { Icon } from '../../../components/icons';
import type { IconName } from '../../../components/icons';
import { Button } from '../../../components/Button';
import { Tabs } from '../../../components/Tabs';
import { systemColors, referenceColors } from '../../../tokens/colors';
import { shadows } from '../../../tokens/shadows';
import { interviews, quadrantMeta, Interview } from '../data/primaryResearch';
import { TSEmbeddingJourney } from './TSEmbeddingJourney';
import { CustomerJourney } from './CustomerJourney';
import { DiscordCommunity } from './DiscordCommunity';
import styles from './PrimaryResearch.module.css';

const c = systemColors.light;

type SubTab = 'boards' | 'ts-embedding' | 'journey' | 'discord';

const SUB_TABS = [
  { id: 'boards', label: 'Interview boards' },
  { id: 'ts-embedding', label: 'TS Embedding' },
  { id: 'journey', label: 'Customer journey' },
  { id: 'discord', label: 'Discord community' },
];

type QuadrantKey = keyof typeof quadrantMeta;

/**
 * Quadrant canvas stays near-white (reference tier 10); the sticky note
 * itself uses the more saturated tier 40 so it visibly "pops" off the
 * canvas instead of blending into it.
 */
const QUADRANT_STYLE: Record<QuadrantKey, { bg: string; fg: string; icon: IconName; stickyBg: string }> = {
  strengths: { bg: referenceColors.green['10'], fg: c['content-success'], icon: 'checkmark-circle', stickyBg: referenceColors.green['40'] },
  limitations: { bg: referenceColors.gray['10'], fg: c['content-secondary'], icon: 'info-circle', stickyBg: referenceColors.gray['40'] },
  frustrations: { bg: referenceColors.red['10'], fg: c['content-failure'], icon: 'exclamation-point-circle', stickyBg: referenceColors.red['40'] },
  opportunities: { bg: referenceColors.yellow['10'], fg: c['content-warning'], icon: 'bulb', stickyBg: referenceColors.yellow['40'] },
};

const QUADRANT_ORDER: QuadrantKey[] = ['strengths', 'limitations', 'frustrations', 'opportunities'];

interface EditableCard {
  id: string;
  label?: string;
  text: string;
  quadrant: QuadrantKey;
}

const STORAGE_PREFIX = 'embeddingResearchHub:primaryResearch:';

const buildDefaultCards = (interview: Interview): EditableCard[] => {
  const cards: EditableCard[] = [];
  QUADRANT_ORDER.forEach((key) => {
    interview.quadrants[key].forEach((card, i) => {
      cards.push({ id: `${interview.id}-${key}-${i}`, label: card.label, text: card.text, quadrant: key });
    });
  });
  return cards;
};

const loadCards = (interview: Interview): EditableCard[] => {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + interview.id);
    if (raw) return JSON.parse(raw) as EditableCard[];
  } catch {
    // ignore malformed/unavailable storage — fall back to source research
  }
  return buildDefaultCards(interview);
};

const openInNewTab = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

export const PrimaryResearch: React.FC = () => {
  const [tab, setTab] = useState<SubTab>('boards');
  const [activeId, setActiveId] = useState(interviews[0].id);
  const [cardsByInterview, setCardsByInterview] = useState<Record<string, EditableCard[]>>(() =>
    Object.fromEntries(interviews.map((iv) => [iv.id, loadCards(iv)])),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverQuadrant, setDragOverQuadrant] = useState<QuadrantKey | null>(null);

  const active = interviews.find((i) => i.id === activeId) ?? interviews[0];
  const cards = cardsByInterview[activeId] ?? [];

  useEffect(() => {
    Object.entries(cardsByInterview).forEach(([id, list]) => {
      try {
        localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(list));
      } catch {
        // localStorage unavailable (private mode, quota) — edits just won't persist
      }
    });
  }, [cardsByInterview]);

  const setCards = (updater: (prev: EditableCard[]) => EditableCard[]) => {
    setCardsByInterview((prev) => ({ ...prev, [activeId]: updater(prev[activeId] ?? []) }));
  };

  const moveCard = (cardId: string, quadrant: QuadrantKey) => {
    setCards((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (!card || card.quadrant === quadrant) return prev;
      return [...prev.filter((c) => c.id !== cardId), { ...card, quadrant }];
    });
  };

  const addCard = (quadrant: QuadrantKey) => {
    const id = `${activeId}-new-${Date.now()}`;
    setCards((prev) => [...prev, { id, text: '', quadrant }]);
    setEditingId(id);
  };

  const updateCardText = (cardId: string, text: string) => {
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, text } : c)));
  };

  const commitCard = (cardId: string) => {
    setEditingId(null);
    setCards((prev) => {
      const card = prev.find((c) => c.id === cardId);
      if (card && card.text.trim() === '') return prev.filter((c) => c.id !== cardId);
      return prev;
    });
  };

  const deleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const resetBoard = () => {
    if (!window.confirm('Reset this board to the original transcribed research? Any notes you added or moved will be lost.')) return;
    setCardsByInterview((prev) => ({ ...prev, [activeId]: buildDefaultCards(active) }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.subnav}>
        <p className={styles.subnavTitle}>Primary research</p>
        <span className={styles.subnavDivider} style={{ backgroundColor: c['border-divider'] }} />
        <Tabs tabs={SUB_TABS} activeTab={tab} onTabChange={(id) => setTab(id as SubTab)} />
      </div>
      {tab === 'ts-embedding' ? (
        <div className={styles.body}>
          <TSEmbeddingJourney />
        </div>
      ) : tab === 'journey' ? (
        <div className={styles.body}>
          <CustomerJourney />
        </div>
      ) : tab === 'discord' ? (
        <div className={styles.body}>
          <DiscordCommunity />
        </div>
      ) : (
      <div className={styles.boardsLayout}>
      <div className={styles.picker}>
        {interviews.map((interview) => {
          const isActive = interview.id === activeId;
          return (
            <div
              key={interview.id}
              role="button"
              tabIndex={0}
              className={`${styles.interviewCard} ${isActive ? styles.interviewCardActive : ''}`}
              onClick={() => setActiveId(interview.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveId(interview.id);
                }
              }}
            >
              <div className={styles.interviewTitleRow}>
                <p className={styles.interviewTitle}>{interview.title}</p>
                <Button
                  size="small"
                  variant="tertiary"
                  icon="video"
                  onClick={(e) => {
                    e.stopPropagation();
                    openInNewTab(interview.recordingUrl);
                  }}
                >
                  Watch recording
                </Button>
              </div>
              <p className={styles.interviewSubtitle} style={{ color: c['content-secondary'] }}>{interview.subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.boardColumn}>
      <div className={styles.boardToolbar}>
        <p className={styles.boardHint} style={{ color: c['content-tertiary'] }}>
          Drag a note into another quadrant to re-tag it — it'll pick up that quadrant's color. Use + to add your own.
        </p>
        <button className={styles.resetBtn} onClick={resetBoard} style={{ color: c['content-tertiary'] }}>
          <Icon name="reset" size="xs" color="currentColor" />
          Reset board
        </button>
      </div>

      <div className={styles.boardScroll}>
        <div className={styles.quadrantGrid}>
          {QUADRANT_ORDER.map((key) => {
            const meta = quadrantMeta[key];
            const style = QUADRANT_STYLE[key];
            const quadrantCards = cards.filter((c) => c.quadrant === key);
            const isDragOver = dragOverQuadrant === key;
            return (
              <div
                key={key}
                className={`${styles.quadrant} ${isDragOver ? styles.quadrantDragOver : ''}`}
                style={{ backgroundColor: style.bg }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverQuadrant(key);
                }}
                onDragLeave={() => setDragOverQuadrant((prev) => (prev === key ? null : prev))}
                onDrop={(e) => {
                  e.preventDefault();
                  const cardId = e.dataTransfer.getData('text/plain');
                  if (cardId) moveCard(cardId, key);
                  setDragOverQuadrant(null);
                }}
              >
                <div className={styles.quadrantHeader}>
                  <Icon name={style.icon} size="s" color={style.fg} />
                  <p className={styles.quadrantTitle} style={{ color: style.fg }}>{meta.label}</p>
                  <span className={styles.quadrantCount} style={{ color: style.fg }}>{quadrantCards.length} notes</span>
                  <button
                    className={styles.addBtn}
                    style={{ color: style.fg }}
                    onClick={() => addCard(key)}
                    aria-label={`Add a note to ${meta.label}`}
                    title={`Add a note to ${meta.label}`}
                  >
                    <Icon name="plus" size="xs" color="currentColor" />
                  </button>
                </div>
                <div className={styles.stickyGrid}>
                  {quadrantCards.map((card) => {
                    const isEditing = editingId === card.id;
                    return (
                      <div
                        key={card.id}
                        className={`${styles.sticky} ${draggingId === card.id ? styles.stickyDragging : ''}`}
                        style={{ backgroundColor: style.stickyBg, color: c['content-primary'], boxShadow: shadows.sm }}
                        draggable={!isEditing}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', card.id);
                          e.dataTransfer.effectAllowed = 'move';
                          setDraggingId(card.id);
                        }}
                        onDragEnd={() => setDraggingId(null)}
                        onDoubleClick={() => setEditingId(card.id)}
                      >
                        {!isEditing && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteCard(card.id)}
                            aria-label="Delete note"
                            title="Delete note"
                          >
                            <Icon name="cross" size="xs" color="currentColor" />
                          </button>
                        )}
                        {card.label && !isEditing && <span className={styles.stickyLabel}>{card.label}</span>}
                        {isEditing ? (
                          <textarea
                            className={styles.stickyInput}
                            autoFocus
                            value={card.text}
                            placeholder="Type a note…"
                            onChange={(e) => updateCardText(card.id, e.target.value)}
                            onBlur={() => commitCard(card.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') commitCard(card.id);
                            }}
                          />
                        ) : (
                          card.text
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default PrimaryResearch;
