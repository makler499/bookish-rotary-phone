import { Network } from 'lucide-react';
import { useState } from 'react';
import { theoryNodes } from '../data/theory';
import { SectionShell } from './SectionShell';

export function TheoryMap() {
  const [activeId, setActiveId] = useState(theoryNodes[0].id);
  const activeNode = theoryNodes.find((node) => node.id === activeId) ?? theoryNodes[0];

  return (
    <SectionShell
      id="theory"
      eyebrow="03 / карта источников"
      title="Теоретическая база"
      lead="Философия, психология, культура и медиа соединяются в одну исследовательскую карту: от карнавального смеха до мемов и симулякров."
    >
      <div className="theory-map">
        <div className="theory-constellation" aria-label="Карта направлений">
          {theoryNodes.map((node) => (
            <button
              className={`theory-node theory-node-${node.column} ${activeId === node.id ? 'is-active' : ''}`}
              type="button"
              key={node.id}
              onClick={() => setActiveId(node.id)}
            >
              <span>{node.title}</span>
            </button>
          ))}
        </div>
        <article className="theory-detail" aria-live="polite">
          <Network aria-hidden="true" />
          <p className="eyebrow">активный узел</p>
          <h3>{activeNode.title}</h3>
          <p className="authors-line">{activeNode.authors}</p>
          <p>{activeNode.description}</p>
        </article>
      </div>
    </SectionShell>
  );
}
