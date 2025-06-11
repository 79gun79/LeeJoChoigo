export interface EditTextProps {
  tags: string[];
  onAddTag: (val: string) => void;
  onRemoveTag: (val: string) => void;
  problems?: boolean;
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
  problems?: boolean;
}

export interface CreateQuizHandle {
  getPostData: () => {
    title: string;
    content: string;
    imageUrl: string | null;
    imageFileName: string | null;
  };
}
