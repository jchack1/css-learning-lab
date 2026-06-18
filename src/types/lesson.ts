export interface AlternativeSolution {
  name: string;
  description: string;
  css: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  oldWay: string;
  modernWay: string;
  html: string;
  startingCSS: string;
  challenge: string;
  targetSelector?: string;
  expectedCSS: Record<string, string>;
  order?: number;
  alternatives?: AlternativeSolution[];
}
