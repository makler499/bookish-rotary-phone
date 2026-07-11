import { ChevronDown } from 'lucide-react';
import { psychologyTheories } from '../data/psychology';
import { SectionShell } from './SectionShell';

export function PsychologySection() {
  return (
    <SectionShell
      id="psychology"
      eyebrow="07 / полный контент PDF"
      title="Психологические теории юмора и их иллюстрации"
      lead="Этот раздел основан на приложенном PDF: пять исследовательских линий, анекдоты-иллюстрации и разборы вынесены в раскрывающиеся блоки."
    >
      <div className="psychology-accordion">
        {psychologyTheories.map((theory, index) => (
          <details className="psychology-item" key={theory.id} open={index === 0}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{theory.author}</strong>
              <em>{theory.title}</em>
              <ChevronDown aria-hidden="true" />
            </summary>
            <div className="psychology-body">
              <p className="thesis-line">{theory.thesis}</p>
              {theory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="joke-grid">
                {theory.jokes.map((joke) => (
                  <details className="joke-card" key={joke.title}>
                    <summary>{joke.title}</summary>
                    <div>
                      {joke.text.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                      <p className="analysis"><strong>Разбор:</strong> {joke.analysis}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
