import type { Audience, EmotionalState, HumorStyle, Practice, PracticeGoal } from '../types';

export type PracticeSelection = {
  audience?: Audience;
  state?: EmotionalState;
  goal?: PracticeGoal;
  maxMinutes?: number;
};

export function scorePractice(practice: Practice, selection: PracticeSelection): number {
  let score = 0;

  if (selection.audience && practice.audience.includes(selection.audience)) {
    score += 4;
  }

  if (selection.state && practice.emotionalStates.includes(selection.state)) {
    score += 4;
  }

  if (selection.goal && practice.goals.includes(selection.goal)) {
    score += 3;
  }

  if (selection.maxMinutes && practice.durationMinutes <= selection.maxMinutes) {
    score += 2;
  }

  return score;
}

export function recommendPractices(
  practices: Practice[],
  selection: PracticeSelection,
  limit = 3
): Practice[] {
  return practices
    .map((practice) => ({
      practice,
      score: scorePractice(practice, selection)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.practice.durationMinutes - b.practice.durationMinutes)
    .slice(0, limit)
    .map((item) => item.practice);
}

export function filterPractices(practices: Practice[], selection: PracticeSelection): Practice[] {
  return practices.filter((practice) => {
    const audienceMatches = !selection.audience || practice.audience.includes(selection.audience);
    const stateMatches = !selection.state || practice.emotionalStates.includes(selection.state);
    const goalMatches = !selection.goal || practice.goals.includes(selection.goal);
    const timeMatches = !selection.maxMinutes || practice.durationMinutes <= selection.maxMinutes;

    return audienceMatches && stateMatches && goalMatches && timeMatches;
  });
}

export function calculateDominantStyle(answers: HumorStyle[]): HumorStyle {
  const totals = answers.reduce<Record<HumorStyle, number>>((acc, style) => {
    acc[style] += 1;
    return acc;
  }, {
    supportive: 0,
    selfIrony: 0,
    social: 0,
    defensive: 0,
    aggressive: 0,
    avoidant: 0,
    devaluing: 0
  });

  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0] as HumorStyle;
}
