import { ArrowDown, Clock3 } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">XVII - XXI век</p>
        <h1 id="hero-title" aria-label="Человек и юмор в Новое и Новейшее время">
          <span aria-hidden="true">Человек и юмор</span>
          <span aria-hidden="true">в Новое и Новейшее время</span>
        </h1>
        <p className="hero-subtitle">
          От коллективного ритуала и социальной критики - к личному переживанию,
          психологической защите и цифровому мему.
        </p>
        <p className="hero-intro">
          Интерактивное исследование эволюции форм, функций и субъектов юмора в европейской
          и североамериканской культуре XVII-XXI веков.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#hypothesis">
            <ArrowDown size={18} />
            Начать путешествие
          </a>
          <a className="button button-ghost" href="#timeline">
            <Clock3 size={18} />
            Смотреть шкалу
          </a>
        </div>
        <div className="hero-meta">
          <span>Московский институт психоанализа, 2026</span>
          <span>Куратор: Амелин Лев Константинович</span>
        </div>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <span>карнавал</span>
        <span>кино</span>
        <span>мем</span>
      </div>
    </section>
  );
}
