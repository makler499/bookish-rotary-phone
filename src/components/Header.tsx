import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigationItems } from '../data/navigation';

type HeaderProps = {
  activeSection: string;
};

export function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#hero" aria-label="К началу сайта">
        <span className="brand-glyph" aria-hidden="true">Ю</span>
        <span>Юмор во времени</span>
      </a>
      <button
        className="icon-button nav-toggle"
        type="button"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={isOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Основная навигация">
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'is-active' : undefined}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
