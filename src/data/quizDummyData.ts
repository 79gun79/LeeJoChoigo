import type { QuizProblem } from '../types/quizList';

export const quizData: QuizProblem[] = [
  {
    description: '다음 중 성격이 다른 것은?',
    quiz: [
      { id: 'A', correct: false, value: 'React useContext' },
      { id: 'B', correct: true, value: 'React.memo' },
      { id: 'C', correct: false, value: 'Redux Toolkit' },
      { id: 'D', correct: false, value: 'Zustand' },
    ],
  },
  {
    description: 'Vue의 디렉티브 해당하는 것을 모두 고르시오',
    quiz: [
      { id: 'A', correct: true, value: 'v-html' },
      { id: 'B', correct: true, value: 'v-bind' },
      { id: 'C', correct: false, value: 'v-prevent' },
      { id: 'D', correct: false, value: 'v-count' },
    ],
  },
  {
    description: '다음 중 모든 타입을 허용하는 타입은?',
    quiz: [
      { id: 'A', correct: true, value: 'unknown' },
      { id: 'B', correct: false, value: 'null' },
      { id: 'C', correct: false, value: 'undefined' },
      { id: 'D', correct: true, value: 'any' },
    ],
  },
];
