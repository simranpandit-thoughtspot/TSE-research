import React from 'react';
import styles from './PreviewCard.module.css';

export interface PreviewVariant {
  label: string;
  node: React.ReactNode;
  description?: string;
}

export interface PreviewCardProps {
  name: string;
  path?: string;
  description?: string;
  variants: PreviewVariant[];
  /** Render as a "planned" ghosted placeholder instead of live previews. */
  planned?: boolean;
  plannedHint?: string;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  name,
  path,
  description,
  variants,
  planned = false,
  plannedHint,
}) => {
  return (
    <article className={styles.card} id={name.toLowerCase()}>
      <header className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        {path && <code className={styles.path}>{path}</code>}
        {planned && <span className={styles.plannedBadge}>Planned</span>}
      </header>
      {description && <p className={styles.description}>{description}</p>}

      {planned ? (
        <div className={styles.plannedSlot}>
          <p className={styles.plannedText}>
            {plannedHint ?? 'Component is planned but not yet in code. See spotter-components.md → Planned components.'}
          </p>
        </div>
      ) : (
        <div className={styles.variants}>
          {variants.map((variant) => (
            <section key={variant.label} className={styles.variant}>
              <div className={styles.variantHeader}>
                <span className={styles.variantLabel}>{variant.label}</span>
                {variant.description && (
                  <span className={styles.variantDescription}>{variant.description}</span>
                )}
              </div>
              <div className={styles.variantStage}>
                <div className={styles.stageInner}>{variant.node}</div>
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  );
};
