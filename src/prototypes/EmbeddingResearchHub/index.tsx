import React, { useState } from 'react';
import { styles } from './styles';
import { Horizontal } from '../../components/Layout/Horizontal';
import { BottomNav, SectionId } from './components/BottomNav';
import { SecondaryResearch } from './components/SecondaryResearch';
import { PrimaryResearch } from './components/PrimaryResearch';
import { TabAudit } from './components/TabAudit';
import { CustomerJourney } from './components/CustomerJourney';
import { ProblemAreas } from './components/ProblemAreas';

/**
 * EmbeddingResearchHub
 *
 * Interactive research documentation platform for the TSE Embedding project.
 * Consolidates secondary research (market/competitors), primary research
 * (TSE SME interviews), the </> tab audit, the customer journey, and a
 * problem-areas summary into one segmented, slide-deck-style workspace.
 */
export const EmbeddingResearchHub: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('secondary');

  return (
    <div style={styles.shell}>
      <Horizontal style={styles.header} gap={10}>
        <div style={styles.brandMark}>ER</div>
        <div>
          <div style={styles.brandText}>Embedding Research Hub</div>
          <div style={styles.brandSubtext}>TSE Embedding project · Playground &amp; embedding journey</div>
        </div>
      </Horizontal>

      <div style={styles.content}>
        {activeSection === 'secondary' && <SecondaryResearch />}
        {activeSection === 'primary' && <PrimaryResearch />}
        {activeSection === 'tabAudit' && <TabAudit />}
        {activeSection === 'journey' && <CustomerJourney />}
        {activeSection === 'problems' && <ProblemAreas />}
      </div>

      <BottomNav active={activeSection} onChange={setActiveSection} />
    </div>
  );
};

export default EmbeddingResearchHub;
