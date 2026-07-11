import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResearchHypothesis } from './components/ResearchHypothesis';
import { Goals } from './components/Goals';
import { TheoryMap } from './components/TheoryMap';
import { CausesSection } from './components/CausesSection';
import { Timeline } from './components/Timeline';
import { VisualGallery } from './components/VisualGallery';
import { PhilosophySection } from './components/PhilosophySection';
import { PsychologySection } from './components/PsychologySection';
import { MediaCulture } from './components/MediaCulture';
import { ModernHumor } from './components/ModernHumor';
import { FunctionsAndConstants } from './components/FunctionsAndConstants';
import { ComparisonConclusion } from './components/ComparisonConclusion';
import { ProjectTeam } from './components/ProjectTeam';
import { Footer } from './components/Footer';
import { navigationItems } from './data/navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState(navigationItems[0].id);
  const sectionIds = useMemo(() => navigationItems.map((item) => item.id), []);

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

  useEffect(() => {
    const hashId = window.location.hash.slice(1);
    if (!hashId || !sectionIds.includes(hashId)) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(hashId)?.scrollIntoView();
    });
  }, [sectionIds]);

  return (
    <>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <ResearchHypothesis />
        <Goals />
        <TheoryMap />
        <CausesSection />
        <Timeline />
        <VisualGallery />
        <PhilosophySection />
        <PsychologySection />
        <MediaCulture />
        <ModernHumor />
        <FunctionsAndConstants />
        <ComparisonConclusion />
        <ProjectTeam />
      </main>
      <Footer />
    </>
  );
}
