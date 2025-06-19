import PageName from '../../../components/ui/PageName';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import supabase from '../../../utils/supabase';
import type { EditTextHandle } from '../../../components/edit/EditText.types';
import { useEffect, useRef, useState } from 'react';
import { notify } from '../../../utils/customAlert';
import type { PostDetail } from '../../../types';
import type { QuizItem } from '../../../types/quizList';
import QuizShowComponent from '../../../components/edit/QuizShowComponent';
import CreateQuizSolution from '../../../components/edit/CreateQuizSolution';
import { getPost } from '../../../api/postApi';

export default function QuizSolutionEdit() {
  const problem = useLoaderData<PostDetail>();
  const problemTitle = (problem.title || '문제 정보 없음') as string;
  const [tags, setTags] = useState<string[]>(problem.tags || ['기타']);
  const quizData = (problem.quiz_data || []) as QuizItem[]; // 문제 가져오기

  const editTextRef = useRef<EditTextHandle>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');

  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (!postId) return;
    console.log('postId :', postId);
    const fetchPost = async () => {
      const post = await getPost(Number(postId));
      if (!post) {
        notify('존재하지 않는 게시글입니다.', 'error');
        navigate('/questions');
        return;
      }

      setTags(post.tags ?? []);
      editTextRef.current?.setPostData({
        title: post.title!,
        content: post.content!,
        imageUrl: post.image,
        imageFileName: post.image_public_id,
        tags: post.tags!,
        quizData: post.quiz_data as QuizItem[],
      });
    };

    fetchPost();
  }, [postId]);

  const handleAddTag = (tag: string) => {
    if (tags.length >= 5) return;
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    const postData = editTextRef.current?.getPostData();
    if (!postData) return;
    const { title, content, imageUrl, imageFileName } = postData;

    if (title === '') return notify('제목을 입력하세요!', 'info');
    if (content === '') return notify('내용을 입력하세요!', 'info');

    const { data: userData } = await supabase.auth.getUser();
    const authorId = userData.user?.id;
    if (!authorId) return;

    if (postId) {
      const { error } = await supabase
        .from('post')
        .update({
          title,
          content,
          image: imageUrl,
          image_public_id: imageFileName,
          tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', Number(postId))
        .eq('author', authorId);

      if (error) {
        notify('수정 실패', 'error');
        return;
      }

      notify('수정 성공', 'success');
    } else {
      const { error } = await supabase.from('post').insert([
        {
          title,
          content,
          tags,
          image: imageUrl,
          image_public_id: imageFileName,
          channel: 4,
          is_yn: true,
          author: authorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          problem_id: problem.id,
        },
      ]);

      if (error) {
        console.error('저장 실패', error);
        notify('등록 실패!', 'warning');
      } else {
        notify('등록 성공!', 'success');
      }
    }

    navigate('/solutions/job');
  };
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="개발직군 풀이" />
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="mb-3 flex flex-col gap-[10px]">
            <div className="flex items-center">
              <p className="text-sm md:text-base lg:text-lg">문제 모음</p>
              <div className="flex-grow"></div>
              <button
                onClick={() => setForceShow(!forceShow)}
                className={forceShow ? 'button-sm gray2 h-6' : 'button-sm h-6'}
              >
                {forceShow ? '모두 닫기' : '모두 열기'}
              </button>
            </div>
            {quizData.map((v, i) => (
              <QuizShowComponent
                key={i}
                index={i}
                item={v}
                hasCreate={true}
                forceShow={forceShow}
              />
            ))}
          </div>
          <CreateQuizSolution
            pTitle={problemTitle}
            tags={tags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            ref={editTextRef}
          />
        </div>
        <div className="flex gap-3 lg:justify-center">
          <button onClick={() => navigate(-1)} className="button-lg gray">
            취소
          </button>
          <button onClick={handleSubmit} className="button-lg">
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}
