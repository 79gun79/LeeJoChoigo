export type QuizOptions = {
  id: string;
  selected: boolean;
  value: string;
};

export type QuizItem = {
  description: string;
  quiz: QuizOptions[];
};
