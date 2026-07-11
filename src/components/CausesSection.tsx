import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { causes } from '../data/theory';
import { SectionShell } from './SectionShell';

export function CausesSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = causes[activeGroup];

  return (
    <SectionShell
      id="causes"
      eyebrow="04 / сдвиги"
      title="Причины исторических изменений"
      lead="Каждый сдвиг меняет не только форму юмора, но и роль человека, который смеётся, читает, смотрит или публикует шутку."
    >
      <div className="segmented-control" role="tablist" aria-label="Группы причин">
        {causes.map((item, index) => (
          <button
            key={item.group}
            type="button"
            role="tab"
            aria-selected={index === activeGroup}
            onClick={() => setActiveGroup(index)}
          >
            {item.group}
          </button>
        ))}
      </div>
      <div className="cause-chains">
        {group.items.map((item) => (
          <article className="cause-chain" key={item.cause}>
            <strong>{item.cause}</strong>
            <ArrowRight aria-hidden="true" />
            <span>{item.change}</span>
            <ArrowRight aria-hidden="true" />
            <em>{item.role}</em>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
