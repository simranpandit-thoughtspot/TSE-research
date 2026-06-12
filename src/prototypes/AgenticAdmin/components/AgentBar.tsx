import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from './AgentBar.module.css';
import {
  detectFlow, extractOrg, extractFeatureFlag, extractEmails,
  type Org, type FeatureFlag, FEATURE_FLAGS,
} from '../data/mockData';

const font = '"Plain", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActionCardType =
  | 'feature-toggle'
  | 'clarify-role'
  | 'user-preview'
  | 'org-health'
  | 'navigate-users';

interface ActionCardData {
  type: ActionCardType;
  status: 'pending' | 'confirmed' | 'done' | 'dismissed';
  featureFlag?: FeatureFlag;
  targetOrg?: Org;
  users?: string[];
  selectedRole?: string;
}

interface AgentMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  actionCard?: ActionCardData;
}

export interface AgentBarHandle {
  triggerPrompt: (text: string) => void;
}

interface AgentBarProps {
  onNavigate: (page: string, banner?: string) => void;
}

// ─── Quick chips shown when no conversation yet ───────────────────────────────

const QUICK_CHIPS = [
  { icon: '👤', label: 'Add user to org' },
  { icon: '⚡', label: 'Enable feature flag' },
  { icon: '🔍', label: 'Org health' },
];

const QUICK_CHIP_MAP: Record<string, string> = {
  'Add user to org': 'Add john@example.com to Acme Corp',
  'Enable feature flag': 'Enable SpotIQ for Nina Enterprises',
  'Org health': 'Show me the health of Acme Corp',
};

// ─── Agent logic ──────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2);
}

// ─── Action Card component ────────────────────────────────────────────────────

interface ActionCardProps {
  card: ActionCardData;
  onConfirm: (cardId: string, extra?: { role?: string }) => void;
  onDismiss: (cardId: string) => void;
  cardId: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ card, onConfirm, onDismiss, cardId }) => {
  const [selectedRole, setSelectedRole] = useState<string>(card.selectedRole ?? 'Data Manager');
  const isDone = card.status === 'done';
  const isConfirmed = card.status === 'confirmed';

  if (card.type === 'feature-toggle' && card.featureFlag && card.targetOrg) {
    const isEnabled = isConfirmed || isDone;
    return (
      <div className={`${styles.actionCard} ${isDone ? styles.done : ''}`} style={{ fontFamily: font }}>
        <div className={styles.actionCardHeader}>
          <span className={styles.actionCardTitle}>Feature flag</span>
          {isDone && <span className={styles.actionCardStatusDone}>✓ Enabled</span>}
        </div>
        <div className={styles.actionCardBody}>
          <div className={styles.featureToggleRow}>
            <div className={styles.featureInfo}>
              <div className={styles.featureName}>{card.featureFlag.label}</div>
              <div className={styles.featureDesc}>{card.featureFlag.description}</div>
            </div>
            <button
              className={styles.toggle}
              style={{ backgroundColor: isEnabled ? '#2770EF' : '#D1D5DB' }}
              aria-checked={isEnabled}
              role="switch"
              disabled={isDone}
            >
              <span
                className={styles.toggleThumb}
                style={{ left: isEnabled ? '18px' : '2px' }}
              />
            </button>
          </div>
          <div className={styles.featureOrg}>
            <span>→</span>
            <span className={styles.featureOrgName}>{card.targetOrg.name}</span>
            <span style={{ color: '#9CA3AF' }}>{card.targetOrg.users} users</span>
          </div>
        </div>
        {!isDone && (
          <div className={styles.actionButtons}>
            <button
              className={styles.btnPrimary}
              onClick={() => onConfirm(cardId)}
            >
              Enable now
            </button>
            <button className={styles.btnSecondary} onClick={() => onDismiss(cardId)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  if (card.type === 'clarify-role' && card.targetOrg && card.users) {
    return (
      <div className={styles.actionCard} style={{ fontFamily: font }}>
        <div className={styles.actionCardHeader}>
          <span className={styles.actionCardTitle}>Choose role</span>
        </div>
        <div className={styles.actionCardBody}>
          <div style={{ fontSize: '13px', color: '#374151', marginBottom: '12px', lineHeight: 1.5 }}>
            What role should these users have in <strong>{card.targetOrg.name}</strong>?
          </div>
          <div className={styles.roleSelector}>
            {['Admin', 'Data Manager', 'Consumer', 'Analyst'].map((role) => (
              <button
                key={role}
                className={`${styles.roleChip} ${selectedRole === role ? styles.selected : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.btnPrimary}
            onClick={() => onConfirm(cardId, { role: selectedRole })}
          >
            Confirm role
          </button>
          <button className={styles.btnSecondary} onClick={() => onDismiss(cardId)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (card.type === 'user-preview' && card.targetOrg && card.users && card.selectedRole) {
    return (
      <div className={`${styles.actionCard} ${isDone ? styles.done : ''}`} style={{ fontFamily: font }}>
        <div className={styles.actionCardHeader}>
          <span className={styles.actionCardTitle}>Users to add → {card.targetOrg.name}</span>
          {isDone && <span className={styles.actionCardStatusDone}>✓ Added</span>}
        </div>
        <div className={styles.actionCardBody}>
          <div className={styles.userList}>
            {card.users.map((email) => {
              const initials = email.slice(0, 2).toUpperCase();
              return (
                <div key={email} className={styles.userRow}>
                  <div className={styles.userAvatar}>{initials}</div>
                  <span className={styles.userEmail}>{email}</span>
                  <span className={styles.userRoleBadge}>{card.selectedRole}</span>
                </div>
              );
            })}
          </div>
        </div>
        {!isDone && (
          <div className={styles.actionButtons}>
            <button className={styles.btnPrimary} onClick={() => onConfirm(cardId)}>
              Add {card.users.length} user{card.users.length > 1 ? 's' : ''}
            </button>
            <button className={styles.btnSecondary} onClick={() => onDismiss(cardId)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }

  if (card.type === 'org-health' && card.targetOrg) {
    const org = card.targetOrg;
    const healthColor = org.health === 'healthy' ? '#22C55E' : org.health === 'warning' ? '#F59E0B' : '#EF4444';
    const healthLabel = org.health === 'healthy' ? 'Healthy' : org.health === 'warning' ? 'Needs attention' : 'Critical';
    const adoptionPct = Math.round((org.activeUsers7d / org.users) * 100);
    return (
      <div className={styles.actionCard} style={{ fontFamily: font }}>
        <div className={styles.actionCardHeader}>
          <span className={styles.actionCardTitle}>Org health — {org.name}</span>
        </div>
        <div className={styles.actionCardBody}>
          <div className={styles.healthStatusRow} style={{ marginBottom: '12px' }}>
            <div className={`${styles.healthDot} ${styles[org.health]}`} />
            <span className={styles.healthStatusText} style={{ color: healthColor }}>{healthLabel}</span>
          </div>
          <div className={styles.healthGrid}>
            <div className={styles.healthStat}>
              <div className={styles.healthStatValue}>{org.users}</div>
              <div className={styles.healthStatLabel}>Total users</div>
            </div>
            <div className={styles.healthStat}>
              <div className={styles.healthStatValue}>{org.activeUsers7d}</div>
              <div className={styles.healthStatLabel}>Active last 7d</div>
            </div>
            <div className={styles.healthStat}>
              <div className={styles.healthStatValue}>{adoptionPct}%</div>
              <div className={styles.healthStatLabel}>Adoption rate</div>
            </div>
            <div className={styles.healthStat}>
              <div className={styles.healthStatValue}>{org.featuresEnabled}</div>
              <div className={styles.healthStatLabel}>Features on</div>
            </div>
          </div>
          {org.groups.length > 0 && (
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              Groups: {org.groups.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (card.type === 'navigate-users' && card.targetOrg && card.users && card.selectedRole) {
    return (
      <div className={styles.actionCard} style={{ fontFamily: font }}>
        <div className={styles.actionCardHeader}>
          <span className={styles.actionCardTitle}>Ready to add users</span>
        </div>
        <div className={styles.actionCardBody}>
          <div className={styles.navigatePreview}>
            <div className={styles.navigateInfo}>
              I've pre-staged <strong>{card.users.length} user{card.users.length > 1 ? 's' : ''}</strong> as{' '}
              <strong>{card.selectedRole}</strong> in <strong>{card.targetOrg.name}</strong>.{' '}
              Open User Management to review and confirm.
            </div>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <button
            className={styles.btnNavigate}
            onClick={() => onConfirm(cardId)}
          >
            Open User Management →
          </button>
          <button className={styles.btnSecondary} onClick={() => onDismiss(cardId)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return null;
};

// ─── Agent Bar ────────────────────────────────────────────────────────────────

export const AgentBar = forwardRef<AgentBarHandle, AgentBarProps>(({ onNavigate }, ref) => {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [pendingFlow, setPendingFlow] = useState<{
    type: 'add-users';
    org: Org;
    users: string[];
  } | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    triggerPrompt(text: string) {
      setInputValue(text);
      setTimeout(() => inputRef.current?.focus(), 50);
    },
  }));

  // Auto-scroll thread to bottom on new messages
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const addMessage = (msg: Omit<AgentMessage, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: uid() }]);
  };

  const updateCardStatus = (
    msgId: string,
    status: ActionCardData['status'],
    extra?: Partial<ActionCardData>,
  ) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.actionCard
          ? { ...m, actionCard: { ...m.actionCard, status, ...extra } }
          : m,
      ),
    );
  };

  // ── Flow handlers ──────────────────────────────────────────────────────────

  const handleFeatureFlagFlow = (input: string) => {
    const org = extractOrg(input);
    const flag = extractFeatureFlag(input);
    const alreadyEnabled = flag.enabledOrgs.includes(org.id);

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const msgId = uid();
      const action = alreadyEnabled ? 'disable' : 'enable';
      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          role: 'agent',
          content: `I found **${flag.label}** — it's currently ${alreadyEnabled ? 'enabled' : 'disabled'} for **${org.name}**. ${alreadyEnabled ? 'Do you want to disable it?' : 'Confirm to enable it.'}`,
          actionCard: {
            type: 'feature-toggle',
            status: 'pending',
            featureFlag: flag,
            targetOrg: org,
          },
        },
      ]);
    }, 1500);
  };

  const handleAddUsersFlow = (input: string) => {
    const org = extractOrg(input);
    const users = extractEmails(input);

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      const msgId = uid();
      setPendingFlow({ type: 'add-users', org, users });
      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          role: 'agent',
          content: `Found ${users.length} email address${users.length > 1 ? 'es' : ''} to add to **${org.name}**. What role should ${users.length > 1 ? 'they' : 'this user'} have?`,
          actionCard: {
            type: 'clarify-role',
            status: 'pending',
            targetOrg: org,
            users,
          },
        },
      ]);
    }, 1600);
  };

  const handleOrgHealthFlow = (input: string) => {
    const org = extractOrg(input);

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      addMessage({
        role: 'agent',
        content: `Here's the health overview for **${org.name}**:`,
        actionCard: {
          type: 'org-health',
          status: 'pending',
          targetOrg: org,
        },
      });
    }, 1200);
  };

  const handleGeneralFlow = () => {
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      addMessage({
        role: 'agent',
        content: "I can help with that. Try asking me to add users, enable feature flags, or check org health. You can also say something like \"show me inactive users\" or \"set up a new org\".",
      });
    }, 1000);
  };

  // ── Card interactions ──────────────────────────────────────────────────────

  const handleCardConfirm = (cardId: string, extra?: { role?: string }) => {
    const msg = messages.find((m) => m.id === cardId);
    if (!msg?.actionCard) return;

    const { type } = msg.actionCard;

    if (type === 'feature-toggle') {
      updateCardStatus(cardId, 'confirmed');
      setTimeout(() => {
        updateCardStatus(cardId, 'done');
        addMessage({
          role: 'agent',
          content: `Done! **${msg.actionCard!.featureFlag!.label}** has been enabled for **${msg.actionCard!.targetOrg!.name}**. The ${msg.actionCard!.targetOrg!.users} users in this org will have access immediately.`,
        });
      }, 900);
    }

    if (type === 'clarify-role' && pendingFlow) {
      const role = extra?.role ?? 'Data Manager';
      updateCardStatus(cardId, 'confirmed', { selectedRole: role });

      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        // For 3+ users: navigate; for 1-2: show inline preview
        if (pendingFlow.users.length > 2) {
          const navMsgId = uid();
          setMessages((prev) => [
            ...prev,
            {
              id: navMsgId,
              role: 'agent',
              content: `Ready to add ${pendingFlow.users.length} users as **${role}** to **${pendingFlow.org.name}**. I've opened User Management — review the queue and confirm.`,
              actionCard: {
                type: 'navigate-users',
                status: 'pending',
                targetOrg: pendingFlow.org,
                users: pendingFlow.users,
                selectedRole: role,
              },
            },
          ]);
        } else {
          const previewMsgId = uid();
          setMessages((prev) => [
            ...prev,
            {
              id: previewMsgId,
              role: 'agent',
              content: `Here's what I'll add to **${pendingFlow.org.name}**. Confirm when ready:`,
              actionCard: {
                type: 'user-preview',
                status: 'pending',
                targetOrg: pendingFlow.org,
                users: pendingFlow.users,
                selectedRole: role,
              },
            },
          ]);
        }
        setPendingFlow(null);
      }, 800);
    }

    if (type === 'user-preview') {
      updateCardStatus(cardId, 'confirmed');
      setTimeout(() => {
        updateCardStatus(cardId, 'done');
        addMessage({
          role: 'agent',
          content: `Done! ${msg.actionCard!.users!.length} user${msg.actionCard!.users!.length > 1 ? 's' : ''} added to **${msg.actionCard!.targetOrg!.name}** as **${msg.actionCard!.selectedRole}**. They'll receive an invite email shortly.`,
        });
      }, 900);
    }

    if (type === 'navigate-users' && msg.actionCard.targetOrg && msg.actionCard.users) {
      updateCardStatus(cardId, 'done');
      onNavigate(
        'user-management',
        `${msg.actionCard.users.length} users queued for ${msg.actionCard.targetOrg.name} as ${msg.actionCard.selectedRole}`,
      );
    }
  };

  const handleCardDismiss = (cardId: string) => {
    updateCardStatus(cardId, 'dismissed');
    addMessage({ role: 'agent', content: 'Cancelled. Let me know if you need anything else.' });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    const text = inputValue.trim();
    if (!text || isThinking) return;

    addMessage({ role: 'user', content: text });
    setInputValue('');

    const flow = detectFlow(text);
    if (flow === 'feature-flag') handleFeatureFlagFlow(text);
    else if (flow === 'add-users') handleAddUsersFlow(text);
    else if (flow === 'org-health') handleOrgHealthFlow(text);
    else handleGeneralFlow();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setPendingFlow(null);
    setInputValue('');
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  const hasMessages = messages.length > 0 || isThinking;

  return (
    <div className={styles.bar} style={{ fontFamily: font }}>
      {/* Conversation thread */}
      {hasMessages && (
        <div className={styles.thread} ref={threadRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`${styles.messageRow} ${styles[msg.role]}`}>
              {msg.role === 'agent' && (
                <span className={styles.senderLabel}>
                  <span className={styles.agentDot} style={{ animation: 'none', opacity: 1 }} />
                  Admin Agent
                </span>
              )}
              {msg.role === 'user' && (
                <span className={styles.senderLabel}>You</span>
              )}
              <div
                className={`${styles.bubble} ${styles[msg.role]}`}
                // Render **bold** markers as bold text
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
              {msg.actionCard && msg.actionCard.status !== 'dismissed' && (
                <ActionCard
                  card={msg.actionCard}
                  cardId={msg.id}
                  onConfirm={handleCardConfirm}
                  onDismiss={handleCardDismiss}
                />
              )}
            </div>
          ))}

          {isThinking && (
            <div className={styles.messageRow}>
              <span className={styles.senderLabel}>
                <span className={styles.agentDot} />
                Admin Agent
              </span>
              <div className={styles.thinkingBubble}>
                <div className={styles.thinkingDots}>
                  <span /><span /><span />
                </div>
                Thinking…
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompt area */}
      <div className={styles.promptArea}>
        <div className={styles.promptBox}>
          <div className={styles.agentAvatar}>✦</div>
          <textarea
            ref={inputRef}
            className={styles.promptInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your admin agent — add users, toggle features, check org health…"
            rows={1}
            style={{ fontFamily: font }}
          />
          <div className={styles.promptActions}>
            {hasMessages && (
              <button className={styles.clearBtn} onClick={handleClear}>
                Clear
              </button>
            )}
            <button
              className={styles.sendBtn}
              onClick={handleSubmit}
              disabled={!inputValue.trim() || isThinking}
              aria-label="Send"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M7 2L3 6M7 2L11 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick chips shown when no conversation */}
        {!hasMessages && (
          <div className={styles.quickChips}>
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip.label}
                className={styles.quickChip}
                onClick={() => {
                  const full = QUICK_CHIP_MAP[chip.label];
                  if (full) {
                    setInputValue(full);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }
                }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

AgentBar.displayName = 'AgentBar';
export default AgentBar;
