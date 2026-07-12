export type NavigationItem = {
  id: string;
  label: string;
};

export type Audience =
  | 'self'
  | 'psychologist'
  | 'group'
  | 'couple'
  | 'teen'
  | 'adult';

export type EmotionalState =
  | 'anxiety'
  | 'stress'
  | 'fatigue'
  | 'lowMood'
  | 'awkwardness'
  | 'mistakeFear'
  | 'conflict'
  | 'selfCriticism'
  | 'shame'
  | 'tension'
  | 'loneliness';

export type PracticeGoal =
  | 'reduceTension'
  | 'reframe'
  | 'softenSelfCriticism'
  | 'buildContact'
  | 'expressEmotion'
  | 'prepareConversation'
  | 'restoreResource';

export type Difficulty = 'easy' | 'medium' | 'advanced';

export type CulturalExampleType = 'literature' | 'film';

export type CulturalExampleEra =
  | 'antiquity'
  | 'renaissance'
  | 'eighteenthNineteenth'
  | 'twentieth'
  | 'contemporary';

export type CulturalTechnique =
  | 'irony'
  | 'selfIrony'
  | 'absurd'
  | 'satire'
  | 'exaggeration'
  | 'perspectiveShift'
  | 'kindJoke'
  | 'defensiveHumor';

export type CulturalTask =
  | 'anxiety'
  | 'selfCriticism'
  | 'shame'
  | 'conflict'
  | 'stress'
  | 'mistakeFear'
  | 'buildContact'
  | 'reduceTension';

export type CulturalExample = {
  id: string;
  type: CulturalExampleType;
  title: string;
  authorOrDirector?: string;
  yearOrEra: string;
  era: CulturalExampleEra;
  technique: CulturalTechnique;
  task: CulturalTask;
  relatedTechnique: string;
  practiceSlug: string;
  shortContext: string;
  psychologicalMeaning: string;
  practiceApplication: string;
  reflectionQuestion?: string;
  spoilerLevel?: 'none' | 'minor' | 'significant';
  sourceReference: string;
};

export type Practice = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  audience: Audience[];
  emotionalStates: EmotionalState[];
  goals: PracticeGoal[];
  durationMinutes: number;
  difficulty: Difficulty;
  steps: string[];
  example?: string;
  benefits: string[];
  cautions: string[];
  contraindications: string[];
  psychologistNotes?: string[];
  sourceReferences?: string[];
  culturalExamples?: CulturalExample[];
};

export type HumorStyle =
  | 'supportive'
  | 'selfIrony'
  | 'social'
  | 'defensive'
  | 'aggressive'
  | 'avoidant'
  | 'devaluing';

export type HumorStyleResult = {
  id: HumorStyle;
  title: string;
  description: string;
  strengths: string[];
  risks: string[];
  recommendations: string[];
  practiceSlugs: string[];
};

export type HumorStyleQuestion = {
  id: string;
  text: string;
  answers: Array<{
    text: string;
    style: HumorStyle;
  }>;
};

export type PsychologistTool = {
  id: string;
  title: string;
  clientStates: EmotionalState[];
  ageGroups: Array<'teen' | 'adult' | 'mixed'>;
  sessionGoals: PracticeGoal[];
  formats: Array<'individual' | 'group' | 'couple'>;
  humorLevel: 'low' | 'medium' | 'high';
  description: string;
  sessionCards: string[];
  safePhrases: string[];
  unsafePhrases: string[];
  readinessQuestions: string[];
  ethics: string[];
};

export type HistoryPeriod = {
  id: string;
  period: string;
  title: string;
  summary: string;
  practicalTakeaway: string;
};
