import PageName from '../../components/ui/PageName';
import EditText from '../../components/edit/EditText';
import { useEffect, useRef, useState } from 'react';
import type { EditTextHandle } from '../../components/edit/EditText.types';
import supabase from '../../utils/supabase';
import { useNavigate, useSearchParams } from 'react-router';
import { getPost } from '../../api/postApi';
import { notify } from '../../utils/customAlert';

export default function QuestionEdit() {
  const [tags, setTags] = useState<string[]>([]);
  const editTextRef = useRef<EditTextHandle>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');

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

    if (!title.trim()) {
      notify('제목을 입력해주세요.', 'warning');
      return;
    }

    if (!content.trim()) {
      notify('내용을 입력해주세요.', 'warning');
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const authorId = userData.user?.id;

    if (!authorId) {
      alert('로그인이 필요합니다.');
      return;
    }

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
          image: imageUrl,
          image_public_id: imageFileName,
          tags,
          channel: 5,
          is_yn: true,
          author: authorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        notify('등록 실패', 'error');
        return;
      }

      notify('등록 성공', 'success');
    }

    navigate('/questions');
  };

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="질문게시판" />
        </div>
        <EditText
          ref={editTextRef}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button onClick={() => navigate(-1)} className="button-lg gray">
            취소
          </button>
          <button className="button-lg" onClick={handleSubmit}>
            {postId ? '수정하기' : '작성하기'}
          </button>
        </div>
      </div>
    </>
  );
}
