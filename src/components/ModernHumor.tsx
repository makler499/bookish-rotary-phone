import { MessageCircle, MonitorSmartphone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SectionShell } from './SectionShell';

const forms = [
  {
    title: 'Печатная сатира',
    text: 'Сохраняет длинную мысль, редакционную позицию и связь с традицией интеллектуального памфлета.'
  },
  {
    title: 'Стендап',
    text: 'Переводит личный опыт, травму, социальную неловкость и самоиронию в публичный монолог.'
  },
  {
    title: 'Интернет-мемы',
    text: 'Сжимают ситуацию до узнаваемой формулы и становятся маркером принадлежности к группе.'
  },
  {
    title: 'Абсурд и пародия',
    text: 'Показывают расслоение реальности, когда привычные смыслы больше не держатся вместе.'
  },
  {
    title: 'Самоирония',
    text: 'Защищает личность от унифицирующего давления и помогает говорить о слабости без капитуляции.'
  },
  {
    title: 'Постмодернистская игра',
    text: 'Работает с цитатами, пустыми знаками, симулякрами и бесконечной переработкой образов.'
  }
];

export function ModernHumor() {
  const [active, setActive] = useState(forms[2].title);
  const activeForm = forms.find((item) => item.title === active) ?? forms[0];

  return (
    <SectionShell
      id="modern"
      eyebrow="09 / XXI век"
      title="Современные формы юмора"
      lead="Главная черта Новейшего времени - демократизация: создавать и распространять юмор может почти любой пользователь."
    >
      <div className="modern-layout">
        <div className="meme-device" aria-hidden="true">
          <div className="device-header" />
          <div className="meme-bubble">я свой, раз понял шутку</div>
          <div className="pixel-field">
            {Array.from({ length: 36 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>
        <div className="modern-copy">
          <p>
            Современный юмор превращается из привилегии профессионального сатирика в общий язык
            коммуникации, самоописания и критики. Он быстрее, короче и подвижнее, но всё ещё
            удерживает древние функции: объединять, снижать страх и проверять границы нормы.
          </p>
          <div className="form-switcher" role="tablist" aria-label="Формы современного юмора">
            {forms.map((item) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={active === item.title}
                onClick={() => setActive(item.title)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <article className="form-detail" aria-live="polite">
            <MonitorSmartphone aria-hidden="true" />
            <h3>{activeForm.title}</h3>
            <p>{activeForm.text}</p>
          </article>
        </div>
      </div>

      <div className="cosmopolitan-note">
        <Sparkles aria-hidden="true" />
        <div>
          <h3>Космополитизм и свобода мышления</h3>
          <p>
            В искусстве XX-XXI веков юмор связан со свободой мысли. У Оруэлла подавление иронии
            становится маркером тоталитаризма, а у Эко столкновение догмы и разума показывает,
            почему смех способен разрушать страх.
          </p>
        </div>
        <MessageCircle aria-hidden="true" />
      </div>
    </SectionShell>
  );
}
