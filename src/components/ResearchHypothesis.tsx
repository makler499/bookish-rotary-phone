import { Brain, Layers, UserRound } from 'lucide-react';
import { SectionShell } from './SectionShell';

const directions = [
  {
    title: 'Когнитивная адаптация',
    text: 'Юмор помогает ориентироваться в противоречиях, перегрузке и меняющихся социальных кодах.',
    Icon: Brain
  },
  {
    title: 'Утрата целостности',
    text: 'Смех утрачивает прежнюю сакральную и карнавальную цельность, становясь более рефлексивным.',
    Icon: Layers
  },
  {
    title: 'Личное переживание',
    text: 'Комическое всё чаще работает как реакция отдельного субъекта, а не как общий ритуал.',
    Icon: UserRound
  }
];

export function ResearchHypothesis() {
  return (
    <SectionShell
      id="hypothesis"
      eyebrow="01 / исследовательская линия"
      title="Гипотеза исследования"
      lead="Юмор в европейской и североамериканской традиции XVII-XXI веков стал более субъективно-рациональным и ориентированным на отдельную личность."
    >
      <div className="hypothesis-grid">
        {directions.map(({ title, text, Icon }, index) => (
          <article className="direction-panel" key={title}>
            <span className="direction-number">{String(index + 1).padStart(2, '0')}</span>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
