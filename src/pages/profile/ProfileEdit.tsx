import { Settings } from 'lucide-react';

export default function ProfileEdit({ close }: { close: () => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-dvh w-dvw items-center justify-center bg-black/50 px-4">
        <div className="h-[590px] max-h-11/12 w-full max-w-[400px] overflow-hidden rounded-sm bg-white md:h-[630px] lg:h-[730px] lg:max-w-[500px]">
          <div className="relative h-full overflow-auto">
            {/* 이미지 */}
            <div className="relative h-[200px] w-full overflow-hidden lg:h-[250px]">
              <img
                className="h-full w-full object-cover"
                src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMjQz/MDAxNjE1MTg3MDkyNTMz.9HxxVEDmqYcHWsCxo_3Ip69Dx0nEuQHdTS2kc1qMIbIg.HyqjQKn8iWhpUI5befdguscJhXZ-s34e1qGp-Rr7254g.JPEG.aksen244/%F0%9D%98%B6%F0%9D%98%B8%F0%9D%98%B6%F0%9D%98%A9%F0%9D%98%B0%F0%9D%98%A3%F0%9D%98%AA_%F0%9F%92%8C.jpg?type=w800"
              />
              <span className="absolute right-2 bottom-2 flex items-center justify-center rounded-full bg-[var(--color-gray1)] p-1">
                <Settings className="h-4 w-4 text-[var(--color-gray3)]" />
              </span>
            </div>
            {/* 내용수정 */}
            <div className="h-[calc(100%-200px)] overflow-auto px-4 py-[25px] md:px-6 lg:h-[calc(100%-250px)] lg:px-8 lg:py-[35px]">
              <div className="mb-8 flex flex-col gap-5 md:gap-5.5 lg:gap-6">
                <div className="relative w-fit">
                  <div className="h-[52px] w-[52px] overflow-hidden rounded-full border border-[#ccc] md:h-[60px] md:w-[60px] lg:h-[68px] lg:w-[68px]">
                    <img
                      className="h-full w-full object-cover"
                      src="https://i.pinimg.com/236x/0e/9c/af/0e9caf05bb22d9ace603c60c15d6fa4b.jpg"
                    />
                  </div>
                  <span className="absolute -right-1 bottom-0 flex items-center justify-center rounded-full bg-[var(--color-gray1)] p-1">
                    <Settings className="h-3.5 w-3.5 text-[var(--color-gray3)]" />
                  </span>
                </div>
                <input
                  className="edit-input"
                  type="text"
                  value="사용자 닉네임"
                />
                <input
                  className="edit-input"
                  type="text"
                  value="user@gmail.com"
                  disabled
                />
                <div className="relative">
                  <input
                    className="edit-input"
                    type="password"
                    placeholder="비밀번호 변경"
                  />
                  <span className="absolute -bottom-4 left-1 float-left text-[10px] text-[var(--color-red-caution)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                    비밀번호 조건
                  </span>
                </div>
                <div className="relative">
                  <input
                    className="edit-input"
                    type="password"
                    placeholder="비밀번호 확인"
                  />
                  <span className="absolute -bottom-4 left-1 float-left text-[10px] text-[var(--color-red-caution)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                    비밀번호가 일치하지 않습니다.
                  </span>
                </div>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={close}
                  className="button-lg gray bg-[var(--color-gray1)]!"
                >
                  닫기
                </button>
                <button className="button-lg">저장</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
