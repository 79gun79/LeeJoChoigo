import { useEffect, useState } from 'react';
import { getPopularPost, getPopularPosts } from '../../api/mainApi';
import { Link } from 'react-router';

type PopularPostsType = Awaited<ReturnType<typeof getPopularPosts>>;
type PopularPostType = Awaited<ReturnType<typeof getPopularPost>>;

export default function PopularProblem() {
  const [popularProblems, setPopularProblems] = useState<PopularPostType[]>([]);

  useEffect(() => {
    const popularPosts = async () => {
      const postDatas = await getPopularPosts();
      console.log(postDatas);
      const populars = getCount(postDatas);
      const popularsArray = objectToArray(populars)
        ?.sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const popularsData = popularsArray?.map(async (item) => {
        const post = await getPopularPost(Number(item.problem));

        if (post) {
          return post;
        }
      });
      setPopularProblems(popularsData);
    };
    popularPosts();
  }, []);
  const getCount = (posts: PopularPostsType) => {
    if (posts) {
      return posts.reduce((pv, cv) => {
        if (cv.channel === 3) {
          pv[cv.problem_id] = (pv[cv.problem_id] || 0) + 1;
          return pv;
        } else {
          pv[cv.solved_problem_level] = (pv[cv.solved_problem_level] || 0) + 1;
          return pv;
        }
      }, {});
    }
  };
  const objectToArray = (object) => {
    if (!object) return;
    const keys = Object.keys(object);
    const objectArray = keys.map((key) => ({
      problem: key,
      count: object[key],
    }));

    return objectArray;
  };
  return (
    <>
      <div className="mb-6 md:w-full">
        <div className="mb-3 flex gap-1.5">
          👑
          <div>
            <p className="content-title">인기 문제</p>
            <p className="content-title-sub">
              사용자들이 가장 많이 풀어 본 문제를 풀어보세요
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {popularProblems &&
            popularProblems.map((problem, i) => {
              const linkTo =
                problem.channel === 2
                  ? `/problems/job/${problem.id}`
                  : `/solutions/coding/write/${problem.id}`;
              return (
                <Link
                  to={linkTo}
                  key={problem?.id}
                  className="hover-box flex items-center gap-5 rounded-sm border border-[#ccc] px-5 py-3 md:py-4"
                >
                  <p className="text-sm font-semibold md:text-base lg:text-lg">
                    {i + 1}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <p
                      className={`line-clamp-1 text-xs font-semibold md:text-sm lg:text-base ${problem?.channel === 1 && 'text-main'} ${problem?.channel === 2 && 'text-sub1'}`}
                    >
                      {problem?.channel === 1 && '알고리즘 문제'}
                      {problem?.channel === 2 && '개발직군 문제'}
                    </p>
                    <p className="hover line-clamp-1 text-sm font-bold md:text-base lg:text-lg">
                      {problem?.title}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}
