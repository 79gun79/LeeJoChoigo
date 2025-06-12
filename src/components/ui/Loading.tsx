import { FadeLoader } from 'react-spinners';

export default function Loading() {
  return (
    <>
      <div className="z-50 flex h-50 items-center justify-center">
        <FadeLoader color="var(--color-sub1)" speedMultiplier={5} />
      </div>
    </>
  );
}
