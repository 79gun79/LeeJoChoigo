import type { QuizItem } from '../../types/quizList';

export interface EditTextProps {
  tags: string[];
  onAddTag: (val: string) => void;
  onRemoveTag: (val: string) => void;
  isLoading?: boolean;
  problem?: {
    id: string;
    title: string;
    desc?: string;
  };
}

export interface EditTextHandle {
  getPostData: () => {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
    tags: string[];
  };
  setPostData: (data: {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
    tags?: string[];
    quizData?: QuizItem[];
  }) => void;
}

export interface CreateQuizProps {
  quizValid: (valid: boolean) => void;
}

export interface CreateQuizHandle {
  getPostData: () => {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
    tags: string[];
    quizData: QuizItem[];
  };
  setPostData: (data: {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
    tags: string[];
    quizData: QuizItem[];
  }) => void;
}

export interface SolutionQuizProps {
  pTitle: string;
  tags: string[];
  onAddTag: (val: string) => void;
  onRemoveTag: (val: string) => void;
}
