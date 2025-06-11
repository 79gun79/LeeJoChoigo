import { useEffect, useRef, useState, useTransition } from 'react';
import EditText from '../../../components/edit/EditText';
import PageName from '../../../components/ui/PageName';
import type { EditTextHandle } from '../../../components/edit/EditText.types';
import { useParams } from 'react-router';
// import { fetchBjProblemById } from '../../../utils/fetchBjProblems';

export default function AlgorithmSolutionEdit() {
  const [tags, setTags] = useState<string[]>([]);
  const editTextRef = useRef<EditTextHandle>(null);
  const params = useParams<string>().id;
  const [isLoading, startTransition] = useTransition();
  const [problem, setProblem] = useState();

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  useEffect(() => {
    startTransition(async () => {
      // if (params) await fetchBjProblemById(parseInt(params, 10));
      console.log(params);
    });
  }, []);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="알고리즘풀이" />
        </div>

        <EditText
          ref={editTextRef}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button className="button-lg gray">취소</button>
          <button className="button-lg">작성하기</button>
        </div>
      </div>
    </>
  );
}
