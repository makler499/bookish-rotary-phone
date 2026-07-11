export type NavigationItem = {
  id: string;
  label: string;
};

export type Era = {
  id: string;
  label: string;
  title: string;
  accent: string;
  visual: string;
  authors: string[];
  forms: string[];
  functions: string[];
  human: string;
  quote: string;
  example: string;
};

export type TheoryNode = {
  id: string;
  title: string;
  authors: string;
  description: string;
  column: 'culture' | 'philosophy' | 'psychology' | 'media';
};

export type PhilosophyTheory = {
  name: string;
  thesis: string;
  detail: string;
};

export type PsychologyJoke = {
  title: string;
  text: string[];
  analysis: string;
};

export type PsychologyTheory = {
  id: string;
  author: string;
  title: string;
  thesis: string;
  paragraphs: string[];
  jokes: PsychologyJoke[];
};

export type BibliographyItem = {
  id: number;
  category: 'Философские и теоретические' | 'Психологические и антропологические' | 'Художественные тексты и киноматериалы';
  text: string;
};
