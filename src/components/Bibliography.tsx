import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { bibliography } from '../data/bibliography';
import type { BibliographyItem } from '../types';
import { SectionShell } from './SectionShell';

const categories: Array<'Все' | BibliographyItem['category']> = [
  'Все',
  'Философские и теоретические',
  'Психологические и антропологические',
  'Художественные тексты и киноматериалы'
];

export function Bibliography() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('Все');

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return bibliography.filter((item) => {
      const categoryMatch = category === 'Все' || item.category === category;
      const queryMatch = !normalizedQuery || item.text.toLowerCase().includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [query, category]);

  return (
    <SectionShell
      id="bibliography"
      eyebrow="13 / источники"
      title="Список литературы"
      lead="Источники разделены на категории и доступны через поиск по автору, названию или ключевому слову."
    >
      <div className="bibliography-tools">
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Поиск по литературе</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Автор, название, тема"
            type="search"
          />
        </label>
        <div className="category-filter" role="tablist" aria-label="Категории источников">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <ol className="bibliography-list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
