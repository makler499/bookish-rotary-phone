import { ArrowUp, CheckCircle2 } from 'lucide-react';
import { SectionShell } from './SectionShell';

export function ComparisonConclusion() {
  return (
    <SectionShell
      id="comparison"
      eyebrow="11 / итог исследования"
      title="Что изменилось и что осталось неизменным"
      lead="С XVII по XXI век менялся не столько юмор, сколько человек, который его создаёт и воспринимает."
      className="conclusion-section"
    >
      <div className="comparison-grid">
        <article>
          <p className="eyebrow">главное изменение</p>
          <h3>От части коллектива к самостоятельной личности</h3>
          <p>
            Юмор начинает выполнять функции индивидуальной саморегуляции, психологической защиты,
            самоиронии и личного высказывания.
          </p>
        </article>
        <article>
          <p className="eyebrow">постоянные основания</p>
          <h3>Противоречие, игра, дистанция</h3>
          <p>
            Мы по-прежнему смеёмся над несоответствием, абсурдом, нарушением ожиданий, ролевыми
            масками и безопасным нарушением нормы.
          </p>
        </article>
      </div>

      <div className="final-formula">
        <CheckCircle2 aria-hidden="true" />
        <h3>Смех прошёл путь от общественного ритуала к личному интеллектуальному и психологическому инструменту.</h3>
        <p>
          Он помогает человеку понимать, сопротивляться, адаптироваться, объединяться и оставаться собой.
        </p>
        <a className="button button-primary" href="#hero">
          <ArrowUp size={18} />
          Вернуться к началу
        </a>
      </div>
    </SectionShell>
  );
}
