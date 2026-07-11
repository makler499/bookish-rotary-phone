import type { ReactNode } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, eyebrow, title, lead, children, className = '' }: SectionShellProps) {
  return (
    <section id={id} className={`section-shell ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section-header">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {children}
    </section>
  );
}
