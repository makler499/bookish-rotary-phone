import { BookOpen, Film, MessageSquareText, ScrollText } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { eras } from '../data/timeline';
import { SectionShell } from './SectionShell';

const icons = [ScrollText, BookOpen, Film, MessageSquareText];

export function Timeline() {
  const [activeEraId, setActiveEraId] = useState(eras[0].id);
  const activeEra = eras.find((era) => era.id === activeEraId) ?? eras[0];
  const Icon = icons[eras.findIndex((era) => era.id === activeEra.id)] ?? ScrollText;

  return (
    <SectionShell
      id="timeline"
      eyebrow="05 / эпохи"
      title="XVII-XXI века: как меняется смеющийся человек"
      lead="Каждая эпоха даёт смеху свой носитель, темп и адресата: от гравюры и салонной сатиры до кино, стендапа и цифрового мема."
      className="timeline-section"
    >
      <div className="timeline-tabs" role="tablist" aria-label="Выбор эпохи">
        {eras.map((era) => (
          <button
            key={era.id}
            type="button"
            role="tab"
            aria-selected={activeEra.id === era.id}
            style={{ '--era-accent': era.accent } as CSSProperties}
            onClick={() => setActiveEraId(era.id)}
          >
            {era.label}
          </button>
        ))}
      </div>
      <article className="era-panel" style={{ '--era-accent': activeEra.accent } as CSSProperties}>
        <div className="era-symbol">
          <Icon aria-hidden="true" />
          <span>{activeEra.label}</span>
        </div>
        <div className="era-copy">
          <p className="eyebrow">{activeEra.visual}</p>
          <h3>{activeEra.title}</h3>
          <p>{activeEra.human}</p>
          <blockquote>{activeEra.quote}</blockquote>
        </div>
        <div className="era-lists">
          <div>
            <h4>Авторы</h4>
            <ul>{activeEra.authors.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Формы</h4>
            <ul>{activeEra.forms.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h4>Функции</h4>
            <ul>{activeEra.functions.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <p className="era-example">{activeEra.example}</p>
      </article>
    </SectionShell>
  );
}
