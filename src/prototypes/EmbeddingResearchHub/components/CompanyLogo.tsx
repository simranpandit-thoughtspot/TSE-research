import React, { useState } from 'react';
import { systemColors } from '../../../tokens/colors';
import type { Competitor } from '../data/competitors';
import styles from './CompanyLogo.module.css';

import lookerLogo from '../assets/logos/looker.svg';
import metabaseLogo from '../assets/logos/metabase.svg';
import qlikLogo from '../assets/logos/qlik.svg';
import supersetLogo from '../assets/logos/apachesuperset.svg';

const c = systemColors.light;

/**
 * A handful of vendors have a real brand mark bundled locally (downloaded
 * from Simple Icons, MIT-licensed, with each brand's own hex baked into the
 * SVG). For everyone else we fall back to a live Clearbit logo fetch, and if
 * that also fails (e.g. no network in this environment), a deterministic
 * colored monogram so the UI never shows a broken image.
 */
const LOCAL_LOGOS: Partial<Record<string, string>> = {
  looker: lookerLogo,
  metabase: metabaseLogo,
  qlik: qlikLogo,
  superset: supersetLogo,
};

const MONOGRAM_COLORS = [
  c['background-accent-blue'],
  c['background-accent-green'],
  c['background-accent-purple-subtle'],
  c['background-accent-red'],
  c['background-accent-yellow'],
  c['background-accent-gray'],
];

const hashString = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const getDomain = (websiteUrl: string): string | null => {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

interface CompanyLogoProps {
  competitor: Competitor;
  size?: number;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ competitor, size = 28 }) => {
  const [liveFailed, setLiveFailed] = useState(false);
  const localLogo = LOCAL_LOGOS[competitor.id];
  const domain = getDomain(competitor.website);
  const monogramColor = MONOGRAM_COLORS[hashString(competitor.id) % MONOGRAM_COLORS.length];

  let content: React.ReactNode;
  if (localLogo) {
    content = <img className={styles.img} src={localLogo} alt={`${competitor.name} logo`} />;
  } else if (domain && !liveFailed) {
    content = (
      <img
        className={styles.img}
        src={`https://logo.clearbit.com/${domain}?size=128`}
        alt={`${competitor.name} logo`}
        onError={() => setLiveFailed(true)}
      />
    );
  } else {
    content = (
      <span className={styles.monogram} style={{ backgroundColor: monogramColor, color: c['content-primary'], fontSize: size * 0.42 }}>
        {competitor.name[0]}
      </span>
    );
  }

  return (
    <span className={styles.wrap} style={{ width: size, height: size }}>
      {content}
    </span>
  );
};

export default CompanyLogo;
