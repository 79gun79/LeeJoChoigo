export interface EditTextProps {
  tags: string[];
  onAddTag: (val: string) => void;
  onRemoveTag: (val: string) => void;
  problems?: boolean;
}
