import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  Filter,
  HeartHandshake,
  History,
  Lightbulb,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { Header } from './components/Header';
import {
  audienceLabels,
  durationOptions,
  goalLabels,
  historyPeriods,
  humorStyleQuestions,
  humorStyleResults,
  practices,
  psychologistTools,
  safetyWarnings,
  sourceList,
  stateLabels
} from './data/service';
import { navigationItems } from './data/navigation';
import { calculateDominantStyle, filterPractices, recommendPractices } from './lib/serviceLogic';
import type { Audience, EmotionalState, HumorStyle, PracticeGoal } from './types';

const audienceOptions = Object.keys(audienceLabels) as Audience[];
const stateOptions = Object.keys(stateLabels) as EmotionalState[];
const goalOptions = Object.keys(goalLabels) as PracticeGoal[];

const scenarios = [
  {
    title: 'Помочь себе сейчас',
    text: 'Выберите состояние и получите короткую практику с шагами, временем и ограничениями.',
    href: '#self-help',
    icon: Sparkles
  },
  {
    title: 'Подобрать практику',
    text: 'Мастер учитывает аудиторию, состояние, цель и доступное время.',
    href: '#finder',
    icon: Compass
  },
  {
    title: 'Работать с клиентом',
    text: 'Карточки для сессий, вопросы готовности, безопасные и рискованные формулировки.',
    href: '#psychologists',
    icon: Stethoscope
  },
  {
    title: 'Понять свой стиль юмора',
    text: 'Небольшой тест показывает сильные стороны, риски и подходящие упражнения.',
    href: '#style-test',
    icon: ClipboardList
  }
];

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = ''
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`service-section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {children}
    </section>
  );
}

function PillButton({
  selected,
  children,
  onClick,
  ariaLabel
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      className={selected ? 'pill is-selected' : 'pill'}
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function PracticeCard({ practice, compact = false }: { practice: (typeof practices)[number]; compact?: boolean }) {
  return (
    <article className={compact ? 'practice-card compact-card' : 'practice-card'}>
      <div className="card-topline">
        <span>{practice.durationMinutes} мин</span>
        <span>{practice.difficulty === 'easy' ? 'легко' : practice.difficulty === 'medium' ? 'средне' : 'глубже'}</span>
      </div>
      <h3>{practice.title}</h3>
      <p>{practice.shortDescription}</p>
      <div className="tag-row" aria-label="Подходит для">
        {practice.audience.slice(0, 3).map((audience) => (
          <span key={audience}>{audienceLabels[audience]}</span>
        ))}
      </div>
      {!compact && (
        <details>
          <summary>
            Начать практику
            <ChevronRight size={18} aria-hidden="true" />
          </summary>
          <ol>
            {practice.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {practice.example && <p className="example-line">{practice.example}</p>}
          <div className="caution-box">
            <strong>Когда лучше не применять</strong>
            <ul>
              {practice.contraindications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
      )}
    </article>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState(navigationItems[0].id);
  const sectionIds = useMemo(() => navigationItems.map((item) => item.id), []);
  const [selfState, setSelfState] = useState<EmotionalState>('anxiety');
  const [moodBefore, setMoodBefore] = useState(6);
  const [moodAfter, setMoodAfter] = useState(4);
  const [finderAudience, setFinderAudience] = useState<Audience>('self');
  const [finderState, setFinderState] = useState<EmotionalState>('stress');
  const [finderGoal, setFinderGoal] = useState<PracticeGoal>('reduceTension');
  const [finderTime, setFinderTime] = useState<number>(durationOptions[1].maxMinutes);
  const [catalogAudience, setCatalogAudience] = useState<Audience | undefined>();
  const [catalogState, setCatalogState] = useState<EmotionalState | undefined>();
  const [catalogGoal, setCatalogGoal] = useState<PracticeGoal | undefined>();
  const [catalogTime, setCatalogTime] = useState<number | undefined>();
  const [psyState, setPsyState] = useState<EmotionalState>('anxiety');
  const [psyGoal, setPsyGoal] = useState<PracticeGoal>('buildContact');
  const [answers, setAnswers] = useState<Record<string, HumorStyle>>({});

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.1, 0.25, 0.45, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  const selfRecommendations = recommendPractices(practices, { audience: 'self', state: selfState }, 3);
  const finderRecommendations = recommendPractices(
    practices,
    {
      audience: finderAudience,
      state: finderState,
      goal: finderGoal,
      maxMinutes: finderTime
    },
    4
  );
  const catalogResults = filterPractices(practices, {
    audience: catalogAudience,
    state: catalogState,
    goal: catalogGoal,
    maxMinutes: catalogTime
  });
  const psychologistMatches = psychologistTools.filter(
    (tool) => tool.clientStates.includes(psyState) || tool.sessionGoals.includes(psyGoal)
  );
  const answeredStyles = humorStyleQuestions.map((question) => answers[question.id]).filter(Boolean);
  const dominantStyle = answeredStyles.length === humorStyleQuestions.length
    ? calculateDominantStyle(answeredStyles)
    : undefined;
  const styleResult = dominantStyle
    ? humorStyleResults.find((result) => result.id === dominantStyle)
    : undefined;
  const stylePractices = styleResult
    ? practices.filter((practice) => styleResult.practiceSlugs.includes(practice.slug))
    : [];

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <section id="hero" className="service-hero" aria-labelledby="hero-title">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/hero-human-humor-v2.png)` }}
            aria-hidden="true"
          />
          <div className="service-hero-overlay" aria-hidden="true" />
          <div className="service-hero-content">
            <p className="hero-kicker">Юмор как инструмент самопомощи и поддержки</p>
            <h1 id="hero-title">Юмор, который помогает</h1>
            <p className="hero-subtitle">
              Практики для снижения напряжения, работы с эмоциями и бережного применения юмора
              в психологическом консультировании.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#self-help">
                <Sparkles size={18} />
                Помочь себе сейчас
              </a>
              <a className="button button-ghost" href="#psychologists">
                <HeartHandshake size={18} />
                Инструменты для психолога
              </a>
              <a className="button button-ghost" href="#finder">
                <SlidersHorizontal size={18} />
                Подобрать практику
              </a>
            </div>
            <div className="hero-service-strip" aria-label="Что есть на сайте">
              <span>короткие упражнения</span>
              <span>тест стиля юмора</span>
              <span>этические ограничения</span>
              <span>история как контекст</span>
            </div>
          </div>
        </section>

        <Section
          id="scenarios"
          eyebrow="С чего начать"
          title="Четыре понятных сценария вместо презентации"
          lead="Сайт сразу ведет к действию: выбрать состояние, получить практику, провести упражнение или проверить, какой юмор для вас безопаснее."
        >
          <div className="scenario-grid">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <a key={scenario.title} className="scenario-card" href={scenario.href}>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{scenario.title}</h3>
                  <p>{scenario.text}</p>
                </a>
              );
            })}
          </div>
        </Section>

        <Section
          id="self-help"
          eyebrow="Самопомощь"
          title="Выберите состояние и начните мягкую практику"
          lead="Практики не лечат и не заменяют помощь специалиста. Они могут использоваться как дополнительный способ снизить напряжение и посмотреть на ситуацию иначе."
        >
          <div className="tool-layout">
            <div className="control-panel">
              <h3>Что сейчас ближе?</h3>
              <div className="pill-grid">
                {stateOptions.map((state) => (
                  <PillButton key={state} selected={selfState === state} onClick={() => setSelfState(state)}>
                    {stateLabels[state]}
                  </PillButton>
                ))}
              </div>
              <div className="mood-panel" aria-label="Оценка состояния до и после">
                <label>
                  Напряжение до упражнения
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={moodBefore}
                    onChange={(event) => setMoodBefore(Number(event.target.value))}
                  />
                  <span>{moodBefore}/10</span>
                </label>
                <label>
                  Напряжение после упражнения
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={moodAfter}
                    onChange={(event) => setMoodAfter(Number(event.target.value))}
                  />
                  <span>{moodAfter}/10</span>
                </label>
              </div>
            </div>
            <div className="result-panel">
              <div className="result-heading">
                <Brain size={24} aria-hidden="true" />
                <div>
                  <span>Подбор для состояния</span>
                  <h3>{stateLabels[selfState]}</h3>
                </div>
              </div>
              <div className="practice-list">
                {selfRecommendations.map((practice) => (
                  <PracticeCard key={practice.id} practice={practice} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="finder"
          eyebrow="Мастер подбора"
          title="Практика под задачу, аудиторию и время"
          lead="Выберите параметры, а сайт объяснит, какие упражнения подходят и почему."
        >
          <div className="wizard-grid">
            <div className="wizard-step">
              <span>1</span>
              <h3>Кто использует?</h3>
              <div className="pill-grid compact">
                {audienceOptions.map((audience) => (
                  <PillButton
                    key={audience}
                    selected={finderAudience === audience}
                    onClick={() => setFinderAudience(audience)}
                  >
                    {audienceLabels[audience]}
                  </PillButton>
                ))}
              </div>
            </div>
            <div className="wizard-step">
              <span>2</span>
              <h3>Состояние</h3>
              <select value={finderState} onChange={(event) => setFinderState(event.target.value as EmotionalState)}>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>{stateLabels[state]}</option>
                ))}
              </select>
            </div>
            <div className="wizard-step">
              <span>3</span>
              <h3>Цель</h3>
              <select value={finderGoal} onChange={(event) => setFinderGoal(event.target.value as PracticeGoal)}>
                {goalOptions.map((goal) => (
                  <option key={goal} value={goal}>{goalLabels[goal]}</option>
                ))}
              </select>
            </div>
            <div className="wizard-step">
              <span>4</span>
              <h3>Время</h3>
              <select value={finderTime} onChange={(event) => setFinderTime(Number(event.target.value))}>
                {durationOptions.map((option) => (
                  <option key={option.id} value={option.maxMinutes}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="recommendation-grid">
            {finderRecommendations.map((practice) => (
              <PracticeCard key={practice.id} practice={practice} compact />
            ))}
          </div>
          {finderRecommendations.length === 0 && (
            <div className="empty-state">
              <AlertTriangle size={24} />
              <p>Для выбранных параметров нет точного совпадения. Увеличьте время или выберите более широкую цель.</p>
            </div>
          )}
        </Section>

        <Section
          id="practices"
          eyebrow="Каталог"
          title="Практики с фильтрами и ограничениями"
          lead="Каждая карточка показывает цель, время, шаги, ожидаемый эффект и случаи, когда упражнение лучше не применять."
        >
          <div className="filter-bar" aria-label="Фильтры каталога">
            <Filter size={20} aria-hidden="true" />
            <select value={catalogAudience ?? ''} onChange={(event) => setCatalogAudience(event.target.value ? event.target.value as Audience : undefined)}>
              <option value="">любая аудитория</option>
              {audienceOptions.map((audience) => (
                <option key={audience} value={audience}>{audienceLabels[audience]}</option>
              ))}
            </select>
            <select value={catalogState ?? ''} onChange={(event) => setCatalogState(event.target.value ? event.target.value as EmotionalState : undefined)}>
              <option value="">любое состояние</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>{stateLabels[state]}</option>
              ))}
            </select>
            <select value={catalogGoal ?? ''} onChange={(event) => setCatalogGoal(event.target.value ? event.target.value as PracticeGoal : undefined)}>
              <option value="">любая цель</option>
              {goalOptions.map((goal) => (
                <option key={goal} value={goal}>{goalLabels[goal]}</option>
              ))}
            </select>
            <select value={catalogTime ?? ''} onChange={(event) => setCatalogTime(event.target.value ? Number(event.target.value) : undefined)}>
              <option value="">любое время</option>
              {durationOptions.map((option) => (
                <option key={option.id} value={option.maxMinutes}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="catalog-grid">
            {catalogResults.map((practice) => (
              <PracticeCard key={practice.id} practice={practice} />
            ))}
          </div>
          {catalogResults.length === 0 && (
            <div className="empty-state">
              <AlertTriangle size={24} />
              <p>Практик с такими фильтрами нет. Снимите один из фильтров.</p>
            </div>
          )}
        </Section>

        <Section
          id="psychologists"
          eyebrow="Психологам"
          title="Инструменты для сессий и этической проверки"
          lead="Юмор в консультации требует согласия, оценки готовности клиента и ясной границы между поддержкой и обесцениванием."
        >
          <div className="professional-layout">
            <aside className="control-panel">
              <h3>Параметры сессии</h3>
              <label>
                Состояние клиента
                <select value={psyState} onChange={(event) => setPsyState(event.target.value as EmotionalState)}>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>{stateLabels[state]}</option>
                  ))}
                </select>
              </label>
              <label>
                Цель сессии
                <select value={psyGoal} onChange={(event) => setPsyGoal(event.target.value as PracticeGoal)}>
                  {goalOptions.map((goal) => (
                    <option key={goal} value={goal}>{goalLabels[goal]}</option>
                  ))}
                </select>
              </label>
              <div className="ethics-note">
                <ShieldCheck size={22} />
                <p>Если клиент напрягается, не улыбается или меняет тему, юмор лучше остановить и вернуться к поддержке.</p>
              </div>
            </aside>
            <div className="professional-list">
              {psychologistMatches.map((tool) => (
                <article className="professional-card" key={tool.id}>
                  <div className="card-topline">
                    <span>уровень юмора: {tool.humorLevel === 'low' ? 'низкий' : tool.humorLevel === 'medium' ? 'средний' : 'высокий'}</span>
                    <span>{tool.formats.join(' / ')}</span>
                  </div>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <div className="professional-columns">
                    <div>
                      <h4>Карточки для сессии</h4>
                      <ul>
                        {tool.sessionCards.map((card) => (
                          <li key={card}>{card}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Безопаснее сказать</h4>
                      <ul>
                        {tool.safePhrases.map((phrase) => (
                          <li key={phrase}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Лучше избегать</h4>
                      <ul>
                        {tool.unsafePhrases.map((phrase) => (
                          <li key={phrase}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="style-test"
          eyebrow="Самопроверка"
          title="Тест на стиль юмора"
          lead="Это не диагностика. Результат помогает заметить привычный способ использовать юмор и подобрать более безопасные практики."
        >
          <div className="test-layout">
            <div className="question-list">
              {humorStyleQuestions.map((question, index) => (
                <fieldset key={question.id} className="question-card">
                  <legend>{index + 1}. {question.text}</legend>
                  {question.answers.map((answer) => (
                    <label key={answer.text}>
                      <input
                        type="radio"
                        name={question.id}
                        value={answer.style}
                        checked={answers[question.id] === answer.style}
                        onChange={() => setAnswers((current) => ({ ...current, [question.id]: answer.style }))}
                      />
                      <span>{answer.text}</span>
                    </label>
                  ))}
                </fieldset>
              ))}
            </div>
            <aside className="test-result">
              <ClipboardList size={28} aria-hidden="true" />
              {styleResult ? (
                <>
                  <span>Ваш преобладающий стиль</span>
                  <h3>{styleResult.title}</h3>
                  <p>{styleResult.description}</p>
                  <h4>Сильные стороны</h4>
                  <ul>
                    {styleResult.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4>Риски</h4>
                  <ul>
                    {styleResult.risks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h4>Подходящие практики</h4>
                  <div className="mini-practices">
                    {stylePractices.map((practice) => (
                      <a key={practice.id} href={`#practices`}>{practice.title}</a>
                    ))}
                  </div>
                </>
              ) : (
                <p>Ответьте на все вопросы, и здесь появится описание стиля, рисков и подходящих практик.</p>
              )}
            </aside>
          </div>
        </Section>

        <Section
          id="safety"
          eyebrow="Безопасность"
          title="Когда юмор помогает, а когда может навредить"
          lead="Проект использует осторожные формулировки: юмор может помогать снижать напряжение, но не лечит расстройства и не заменяет профессиональную помощь."
        >
          <div className="safety-grid">
            <article className="safety-card positive">
              <CheckCircle2 size={26} aria-hidden="true" />
              <h3>Можно пробовать, когда</h3>
              <ul>
                <li>ситуация не угрожает безопасности;</li>
                <li>есть желание немного снизить напряжение;</li>
                <li>юмор направлен на форму мысли, а не на ценность человека;</li>
                <li>можно остановиться, если стало хуже.</li>
              </ul>
            </article>
            <article className="safety-card warning">
              <AlertTriangle size={26} aria-hidden="true" />
              <h3>Нельзя использовать как замену помощи</h3>
              <ul>
                {safetyWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section
          id="history"
          eyebrow="Контекст"
          title="Краткая история юмора - как вспомогательный раздел"
          lead="История остается на сайте, но теперь она объясняет, почему юмор связан с телом, обществом, защитой, критикой и цифровой культурой."
        >
          <div className="history-timeline">
            {historyPeriods.map((period) => (
              <article key={period.id}>
                <History size={22} aria-hidden="true" />
                <span>{period.period}</span>
                <h3>{period.title}</h3>
                <p>{period.summary}</p>
                <strong>{period.practicalTakeaway}</strong>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="sources"
          eyebrow="Достоверность"
          title="Источники и границы утверждений"
          lead="Список содержит базовые работы, на которые можно опираться в образовательном контексте. Спорные утверждения на сайте сформулированы осторожно."
        >
          <div className="sources-layout">
            <div className="source-card">
              <BookOpen size={26} aria-hidden="true" />
              <h3>Использованные источники</h3>
              <ol>
                {sourceList.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ol>
            </div>
            <div className="source-card contrast-card">
              <Lightbulb size={26} aria-hidden="true" />
              <h3>Как читать сайт</h3>
              <p>
                Практики описаны как дополнительные упражнения для саморефлексии и коммуникации. Они не являются
                медицинскими рекомендациями, диагностикой или обещанием терапевтического эффекта.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <footer className="site-footer">
        <p>Юмор во времени - практический сервис о бережном юморе, эмоциях и психологической поддержке.</p>
        <p>При угрозе жизни или безопасности обращайтесь в экстренные службы.</p>
      </footer>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
