import { curator, team } from '../data/team';
import { SectionShell } from './SectionShell';

export function ProjectTeam() {
  return (
    <SectionShell
      id="team"
      eyebrow="12 / авторы"
      title="Авторы"
      lead="Над сайтом работала команда Московского института психоанализа; кураторская рамка удерживает связь философии, психологии и культуры."
    >
      <div className="team-layout">
        <article className="curator-panel">
          <p className="eyebrow">куратор</p>
          <h3>{curator}</h3>
          <span>2026</span>
        </article>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person}>
              <span>{person.split(' ')[0].slice(0, 2)}</span>
              <p>{person}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
