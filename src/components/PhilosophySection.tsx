import { useState } from 'react';
import { philosophyTheories } from '../data/theory';
import { SectionShell } from './SectionShell';

export function PhilosophySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = philosophyTheories[activeIndex];

  return (
    <SectionShell
      id="philosophy"
      eyebrow="06 / философские теории"
      title="Юмор как предмет философской рефлексии"
      lead="Философские объяснения комического показывают, как смех становится интеллектуальным действием: превосходством, разрушением ожидания, несоответствием или социальной коррекцией."
    >
      <div className="philosophy-layout">
        <div className="philosophy-index" role="tablist" aria-label="Философы">
          {philosophyTheories.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <article className="philosophy-detail" aria-live="polite">
          <p className="eyebrow">теория</p>
          <h3>{active.name}</h3>
          <strong>{active.thesis}</strong>
          <p>{active.detail}</p>
        </article>
      </div>
    </SectionShell>
  );
}
