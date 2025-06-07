import CommentEdit from '../../components/detail/CommentEdit';
import CommentItem from '../../components/detail/CommentItem';
import DetailText from '../../components/detail/DetailText';
import PageName from '../../components/ui/PageName';

export default function QuestionDetail() {
  return (
    <>
      <div className="px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <div className="mb-[25px] md:mb-[35px]">
          <PageName title="질문 게시판" />
        </div>
        <DetailText problems={true} />
        <div className="mb-[25px] md:mb-[35px]">
          <p className="mb-2.5 text-xs md:text-sm lg:text-base">2개의 댓글</p>
          <CommentEdit />
          <CommentItem />
          <CommentItem />
        </div>
      </div>
    </>
  );
}
