import type { QuizItem } from '../../types/quizList';

export interface EditTextProps {
  tags: string[];
  onAddTag: (val: string) => void;
  onRemoveTag: (val: string) => void;
  isLoading?: boolean;
  problemId?: string;
}

export interface EditTextHandle {
  getPostData: () => {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
    tags: string[];
  };
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
}
