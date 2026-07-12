import { useState } from 'react';
import { BookOpen, ChevronDown, Clapperboard, RotateCcw } from 'lucide-react';
import {
  culturalEraLabels,
  culturalTaskLabels,
  culturalTechniqueLabels,
  culturalTypeLabels
} from '../data/culturalExamples';
import type {
  CulturalExample,
  CulturalExampleEra,
  CulturalExampleType,
  CulturalTask,
  CulturalTechnique,
  Practice
} from '../types';

type ExampleFiltersValue = {
  type?: CulturalExampleType;
  era?: CulturalExampleEra;
  technique?: CulturalTechnique;
  task?: CulturalTask;
};

type ExampleFiltersProps = {
  value: ExampleFiltersValue;
  onChange: (value: ExampleFiltersValue) => void;
};

const typeOptions = Object.keys(culturalTypeLabels) as CulturalExampleType[];
const eraOptions = Object.keys(culturalEraLabels) as CulturalExampleEra[];
const techniqueOptions = Object.keys(culturalTechniqueLabels) as CulturalTechnique[];
const taskOptions = Object.keys(culturalTaskLabels) as CulturalTask[];

export function ExamplesFilters({ value, onChange }: ExampleFiltersProps) {
  return (
    <div className="examples-filter-bar" aria-label="Фильтры культурных примеров">
      <select
        value={value.type ?? ''}
        onChange={(event) => onChange({ ...value, type: event.target.value ? event.target.value as CulturalExampleType : undefined })}
      >
        <option value="">Литература и кино</option>
        {typeOptions.map((type) => (
          <option key={type} value={type}>{culturalTypeLabels[type]}</option>
        ))}
      </select>
      <select
        value={value.era ?? ''}
        onChange={(event) => onChange({ ...value, era: event.target.value ? event.target.value as CulturalExampleEra : undefined })}
      >
        <option value="">Любая эпоха</option>
        {eraOptions.map((era) => (
          <option key={era} value={era}>{culturalEraLabels[era]}</option>
        ))}
      </select>
      <select
        value={value.technique ?? ''}
        onChange={(event) => onChange({ ...value, technique: event.target.value ? event.target.value as CulturalTechnique : undefined })}
      >
        <option value="">Любой прием</option>
        {techniqueOptions.map((technique) => (
          <option key={technique} value={technique}>{culturalTechniqueLabels[technique]}</option>
        ))}
      </select>
      <select
        value={value.task ?? ''}
        onChange={(event) => onChange({ ...value, task: event.target.value ? event.target.value as CulturalTask : undefined })}
      >
        <option value="">Любая задача</option>
        {taskOptions.map((task) => (
          <option key={task} value={task}>{culturalTaskLabels[task]}</option>
        ))}
      </select>
      <button type="button" className="icon-text-button" onClick={() => onChange({})}>
        <RotateCcw size={17} aria-hidden="true" />
        Сбросить
      </button>
    </div>
  );
}

export function RelatedPracticeLink({ practice }: { practice?: Practice }) {
  if (!practice) {
    return null;
  }

  return (
    <a className="related-practice-link" href={`#practice-${practice.slug}`}>
      Попробовать упражнение
    </a>
  );
}

export function CulturalExampleCard({
  example,
  practice,
  compact = false
}: {
  example: CulturalExample;
  practice?: Practice;
  compact?: boolean;
}) {
  const Icon = example.type === 'literature' ? BookOpen : Clapperboard;

  return (
    <article className={compact ? 'cultural-card compact-cultural-card' : 'cultural-card'}>
      <div className="cultural-card-topline">
        <span>
          <Icon size={16} aria-hidden="true" />
          {culturalTypeLabels[example.type]}
        </span>
        <span>{example.yearOrEra}</span>
      </div>
      <h3>{example.title}</h3>
      {example.authorOrDirector && <p className="cultural-author">{example.authorOrDirector}</p>}
      <div className="cultural-tags">
        <span>{culturalEraLabels[example.era]}</span>
        <span>{culturalTechniqueLabels[example.technique]}</span>
        <span>{culturalTaskLabels[example.task]}</span>
      </div>
      <div className="cultural-copy">
        <p><strong>Что здесь происходит:</strong> {example.shortContext}</p>
        <p><strong>Психологически:</strong> {example.psychologicalMeaning}</p>
        <p><strong>Попробуйте:</strong> {example.practiceApplication}</p>
        {example.reflectionQuestion && <p><strong>Вопрос:</strong> {example.reflectionQuestion}</p>}
      </div>
      <div className="cultural-footer">
        <span>{example.sourceReference}</span>
        <RelatedPracticeLink practice={practice} />
      </div>
    </article>
  );
}

export function CulturalExamplesSection({
  examples,
  practice
}: {
  examples: CulturalExample[];
  practice: Practice;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleExamples = expanded ? examples : examples.slice(0, 2);
  const hiddenCount = Math.max(examples.length - visibleExamples.length, 0);

  if (examples.length === 0) {
    return null;
  }

  return (
    <div className="practice-cultural-section">
      <h4>Юмор в книгах и кино</h4>
      <div className="practice-cultural-grid">
        {visibleExamples.map((example) => (
          <CulturalExampleCard key={example.id} example={example} practice={practice} compact />
        ))}
      </div>
      {hiddenCount > 0 && (
        <button type="button" className="show-more-button" onClick={() => setExpanded(true)}>
          <ChevronDown size={17} aria-hidden="true" />
          Показать еще примеры
        </button>
      )}
    </div>
  );
}

