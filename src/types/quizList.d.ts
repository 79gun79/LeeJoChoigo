export type QuizOptions = {
  id: string;
  selected: boolean;
  value: string;
};
export type QuizItem = {
  description: string;
  quiz: QuizOptions[];
};

export type QuizAnswers = {
  id: string;
  correct: boolean;
  value: string;
};
export type QuizProblem = {
  description: string;
  quiz: QuizAnswers[];
  userSelected?: string[];
};
