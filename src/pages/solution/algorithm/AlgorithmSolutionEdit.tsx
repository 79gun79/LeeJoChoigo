import { useEffect, useRef, useState, useTransition } from 'react';
import EditText from '../../../components/edit/EditText';
import PageName from '../../../components/ui/PageName';
import type { EditTextHandle } from '../../../components/edit/EditText.types';
import { useNavigate, useParams, useSearchParams } from 'react-router';
// import { fetchBjProblemById } from '../../../utils/fetchBjProblems';
import { GoogleGenAI } from '@google/genai';
import supabase from '../../../utils/supabase';
import { notify } from '../../../utils/customAlert';
import { useAuthStore } from '../../../stores/authStore';
import { getPost } from '../../../api/postApi';
import { getUser } from '../../../api/userApi';

const APIKEY = import.meta.env.VITE_API_GEMINI_KEY;
const CHANNELID = 3;

export default function AlgorithmSolutionEdit() {
  const [tags, setTags] = useState<string[]>([]);
  const editTextRef = useRef<EditTextHandle>(null);
  const params = useParams<string>().id;
  const [isLoading, startTransition] = useTransition();
  const [problemTitle, setProblemTitle] = useState<string>();
  const [problemDesc, setProblemDesc] = useState<string>('');
  const session = useAuthStore((state) => state.session);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('id');

  const ai = new GoogleGenAI({ apiKey: APIKEY });

  useEffect(() => {
    if (!postId) return;
    console.log('postId :', postId);
    const fetchPost = async () => {
      const post = await getPost(Number(postId));
      if (!post) {
        notify('존재하지 않는 게시글입니다.', 'error');
        navigate('/solutions/coding');
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

  async function fetchProblemDesc() {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `백준 문제 ${params}번 문제내용과 입출력 형식만 알려줘.`,
    });
    return response.text;
  }

  const handleSubmit = async () => {
    const postData = editTextRef.current?.getPostData();
    if (!postData) return;

    const { title, content, imageUrl, imageFileName } = postData;

    const authorId = session?.user.id;

    if (!authorId) {
      notify('로그인이 필요합니다.', 'info');
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
      if (params) {
        const userData = await getUser(session?.user.id as string);
        const prevSolved = userData?.solved ?? [];
        if (!prevSolved.includes(parseInt(params, 10))) {
          const { data } = await supabase
            .from('user')
            .update({ solved: [...prevSolved, parseInt(params, 10)] })
            .eq('id', userData?.id as string)
            .select();
          console.log(data);
        }
        const { error } = await supabase.from('post').insert([
          {
            title,
            content,
            image: imageUrl,
            image_public_id: imageFileName,
            channel: CHANNELID,
            tags,
            is_yn: true,
            author: authorId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            problem_id: parseInt(params, 10),
          },
        ]);
        if (error) {
          console.error('저장 실패', error);
          notify('등록 실패', 'error');
        } else {
          notify('등록 성공!', 'success');
        }
      }
    }

    navigate('/solutions/coding');
  };

  useEffect(() => {
    // console.time('Mount → Render');
    if (!params) return;

    startTransition(async () => {
      try {
        const { data: post, error } = await supabase
          .from('post')
          .select(`title, content`)
          .eq('solved_problem_id', parseInt(params, 10))
          .single();

        if (error) {
          console.error('알고리즘 문제를 가져오는 것에 실패했습니다.');
          return;
        }

        if (post.title) {
          setProblemTitle(`백준 ${params}번 : ${post.title}`);
        }

        if (post.content) {
          setProblemDesc(post.content);
        } else {
          console.log('제미나이에게 요청을 보냈습니다.');
          const content = await fetchProblemDesc();
          if (content) {
            setProblemDesc(content);

            const { error } = await supabase
              .from('post')
              .update({
                content,
                updated_at: new Date().toISOString(),
              })
              .eq('solved_problem_id', parseInt(params, 10));

            if (error) {
              console.error('문제 설명 저장 실패: ', error);
            }
          }
        }
      } catch (e) {
        console.error('문제 설명을 받아오는데 실패했습니다.', e);
      }
      // console.log(params);
    });
  }, [params]);

  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:h-[calc(100vh-64px)] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="알고리즘풀이" />
        </div>

        <EditText
          ref={editTextRef}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          isLoading={isLoading}
          problem={{
            id: params ?? '',
            desc: problemDesc,
            title: problemTitle ?? '',
          }}
        />
        <div className="mb-[25px] flex gap-3 md:mb-[35px] lg:justify-center">
          <button className="button-lg gray">취소</button>
          <button className="button-lg" onClick={handleSubmit}>
            작성하기
          </button>
        </div>
      </div>
    </>
  );
}
