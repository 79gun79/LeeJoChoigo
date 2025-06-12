import { ReactTyped } from 'react-typed';

export default function HomePage() {
  return (
    <>
      <div className="h3 md:h1 mx-10 mt-10">
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
