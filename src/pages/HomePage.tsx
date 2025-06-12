import { ReactTyped } from 'react-typed';

export default function HomePage() {
  return (
    <>
      <div className="h3 md:h1 px-4 py-[25px] md:px-8 md:py-[35px] lg:px-14 lg:py-[45px] xl:mx-auto xl:max-w-6xl xl:px-0">
        <ReactTyped
          className="text-center"
          strings={['데일리코테에 온 것을 환영해요!', '문제를 풀러오셨나요?']}
          typeSpeed={50} //타이핑 속도
          backSpeed={25} //타이핑 지우는 속도
          loop={true} //반복할건지
        />
      </div>
    </>
  );
}
