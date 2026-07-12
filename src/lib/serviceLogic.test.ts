import { describe, expect, it } from 'vitest';
import { culturalExamples } from '../data/culturalExamples';
import { practices } from '../data/service';
import {
  calculateDominantStyle,
  featuredExamplesForPractice,
  filterCulturalExamples,
  filterPractices,
  recommendPractices,
  scorePractice,
  validateCulturalExampleLinks
} from './serviceLogic';

describe('serviceLogic', () => {
  it('scores a practice by audience, state, goal and time', () => {
    const practice = practices.find((item) => item.slug === 'comic-headline');

    expect(practice).toBeDefined();
    expect(scorePractice(practice!, {
      audience: 'self',
      state: 'anxiety',
      goal: 'reduceTension',
      maxMinutes: 3
    })).toBe(13);
  });

  it('recommends the strongest matching practices first', () => {
    const recommendations = recommendPractices(practices, {
      audience: 'self',
      state: 'selfCriticism',
      goal: 'softenSelfCriticism',
      maxMinutes: 10
    });

    expect(recommendations[0].slug).toBe('self-irony-boundary');
    expect(recommendations.map((practice) => practice.slug)).toContain('self-irony-boundary');
  });

  it('filters catalog results with all selected constraints', () => {
    const results = filterPractices(practices, {
      audience: 'couple',
      state: 'conflict',
      goal: 'prepareConversation',
      maxMinutes: 30
    });

    expect(results.map((practice) => practice.slug)).toEqual(['shared-small-smile', 'comic-rehearsal']);
  });

  it('calculates the dominant humor style', () => {
    expect(calculateDominantStyle(['supportive', 'selfIrony', 'supportive', 'social'])).toBe('supportive');
  });

  it('links every cultural example to an existing practice', () => {
    expect(validateCulturalExampleLinks(culturalExamples, practices)).toEqual([]);
  });

  it('covers the curator requested practices with cultural examples', () => {
    const requestedPracticeSlugs = [
      'comic-headline',
      'kind-character-advice',
      'absurd-continuation',
      'self-irony-boundary',
      'inner-critic-rewrite',
      'three-funny-explanations'
    ];

    expect(requestedPracticeSlugs.every((slug) => (
      culturalExamples.some((example) => example.practiceSlug === slug)
    ))).toBe(true);
  });

  it('returns one featured literature and one featured film example for a practice', () => {
    const featured = featuredExamplesForPractice(culturalExamples, 'comic-headline');

    expect(featured).toHaveLength(2);
    expect(featured.map((example) => example.type)).toEqual(['literature', 'film']);
  });

  it('filters cultural examples by type and era', () => {
    const contemporaryFilms = filterCulturalExamples(culturalExamples, {
      type: 'film',
      era: 'contemporary'
    });

    expect(contemporaryFilms.length).toBeGreaterThan(0);
    expect(contemporaryFilms.every((example) => example.type === 'film' && example.era === 'contemporary')).toBe(true);
  });

  it('returns an empty cultural examples result for impossible filters', () => {
    expect(filterCulturalExamples(culturalExamples, {
      type: 'film',
      era: 'antiquity'
    })).toEqual([]);
  });
});
