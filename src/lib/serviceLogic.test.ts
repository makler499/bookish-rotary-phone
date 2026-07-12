import { describe, expect, it } from 'vitest';
import { practices } from '../data/service';
import { calculateDominantStyle, filterPractices, recommendPractices, scorePractice } from './serviceLogic';

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
});
