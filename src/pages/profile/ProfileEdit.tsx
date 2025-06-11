import { Settings } from 'lucide-react';
import { startTransition, useEffect, useRef, useState } from 'react';
import type { User } from './Profile';
import supabase from '../../utils/supabase';
import { notify } from '../../utils/customAlert';

export default function ProfileEdit({
  closeProfile,
  user,
  saveProfile,
}: {
  closeProfile: () => void;
  user: User;
  saveProfile: () => void;
}) {
  const defaultProfile =
    'https://www.studiopeople.kr/common/img/default_profile.png';
  const defaultBanner =
    'https://mblogthumb-phinf.pstatic.net/MjAxODAzMTVfMTcg/MDAxNTIxMDc4ODQxOTcz.xwMJjV-EQADbMRb4KkT6D5j5L5cZWbZFzYi1aJeoDiAg.hZBcdzAIOEgFzDqKsaHBx_QLZEoRIpCPL5uh0aWqeOYg.PNG.osy2201/53.png?type=w800';
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [bannerModal, setBannerModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const bannerRef = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLUListElement>(null);

  const [bannerImg, setBannerImg] = useState(user.cover_image || defaultBanner);
  const [profileImg, setProfileImg] = useState(user.image || defaultProfile);
  // const [bannerImgFile, setBannerImgFile] = useState<File>();
  // const [profileImgFile, setProfileImgFile] = useState<File>();
  const [userName, setUserName] = useState(user.fullname || '');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  // 배너이미지 수정 미리보기
  const bannerImgEidtHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file, setBannerImg);
      setBannerModal(false);
      // setBannerImgFile(file);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   if (typeof reader.result === 'string') setBannerImg(reader.result);
      // };
    }
  };
  // 프로필이미지 수정 미리보기
  const profileImgEidtHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      uploadImage(file, setProfileImg);
      setProfileModal(false);
      // setProfileImgFile(file);

      // if (file) {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = () => {
      //     if (typeof reader.result === 'string') setProfileImg(reader.result);
      //   };
      // }
    }
  };

  // 이미지 수파베이스 스토리지에 업로드
  const uploadImage = async (
    file: File | undefined,
    setImgFunction: (url: string) => void,
  ) => {
    if (!file) return;
    try {
      const newFileName = Date.now();
      const { data, error } = await supabase.storage
        .from('profile-image')
        .upload(`${user.id}/${newFileName}`, file);

      if (error) {
        console.log('파일이 업로드 되지 않습니다.', error);
        return;
      }
      const res = supabase.storage
        .from('profile-image')
        .getPublicUrl(data.path);
      setImgFunction(res.data.publicUrl);
    } catch (error) {
      console.error('다시 시도해 주세요', error);
    }
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const isValidName = (name: string) => {
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,16}$/;
    return nameRegex.test(name);
  };
  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    return passwordRegex.test(password);
  };
  const isValidPasswordCheck = () => {
    if (!password && !passwordCheck) {
      return true;
    } else {
      return password === passwordCheck;
    }
  };

  // 저장
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      if (isValidName(userName)) {
        const { data, error } = await supabase
          .from('user')
          .update({
            fullname: userName,
            image: profileImg,
            cover_image: bannerImg,
          })
          .eq('id', user.id)
          .select();
        if (data) {
          if (passwordEdit) {
            pwSubmit();
          } else {
            notify('변경되었습니다.', 'success');
            saveProfile();
          }
        }
        if (error) {
          notify('에러가 발생했습니다.', 'error');
        }
      }
    });
  };

  const pwSubmit = async () => {
    // 비밀번호변경을 눌렀을 때만
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (data) {
      notify('변경되었습니다.', 'success');
      saveProfile();
    }
    if (error) {
      notify('에러가 발생했습니다.', 'error');
    }
  };

  // 이미지 변경 모달 외부 클릭시 닫힘
  useEffect(() => {
    const clickBannerOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (bannerRef.current && !bannerRef.current.contains(e.target)) {
        setBannerModal(false);
      }
    };

    const clickProfileOutside = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileModal(false);
      }
    };

    document.addEventListener('mousedown', clickBannerOutside);
    document.addEventListener('mousedown', clickProfileOutside);

    return () => {
      document.removeEventListener('mousedown', clickBannerOutside);
      document.removeEventListener('mousedown', clickProfileOutside);
    };
  }, [bannerModal, profileModal]);

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-dvh w-dvw items-center justify-center bg-black/50 px-4">
        <div className="h-[600px] max-h-11/12 w-full max-w-[400px] overflow-hidden rounded-sm bg-white md:h-[630px] lg:h-[730px] lg:max-w-[500px]">
          <form onSubmit={handleSubmit} className="relative h-full">
            {/* 이미지 */}
            <div className="relative h-[200px] w-full overflow-hidden lg:h-[250px]">
              <img className="h-full w-full object-cover" src={bannerImg} />
              <div className="absolute right-2 bottom-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBannerModal(!bannerModal);
                  }}
                  className="flex cursor-pointer items-center justify-center rounded-full bg-[var(--color-gray1)] p-1"
                >
                  <Settings className="h-3.5 w-3.5 text-[var(--color-gray3)]" />
                </button>
                {bannerModal && (
                  <ul
                    ref={bannerRef}
                    className="absolute right-full bottom-1/2 z-10 flex w-fit flex-col gap-1 rounded-sm border border-[#ccc] bg-white p-2 px-3 text-left text-xs text-nowrap md:text-sm lg:text-base"
                  >
                    <li>
                      <label htmlFor="bannerImgEdit" className="cursor-pointer">
                        <input
                          id="bannerImgEdit"
                          type="file"
                          className="hidden"
                          accept="image/jpg,image/png,image/jpeg"
                          onChange={bannerImgEidtHandler}
                        />
                        사진변경
                      </label>
                    </li>
                    <li>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setBannerImg(defaultBanner);
                        }}
                        className="text-red-caution"
                      >
                        삭제
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* 내용수정 */}
            <div className="h-[calc(100%-286px)] overflow-auto px-4 py-[25px] md:px-6 lg:h-[calc(100%-336px)] lg:px-8 lg:py-[35px]">
              <div className="mb-8 flex flex-col gap-5 md:gap-5.5 lg:gap-6">
                <div className="relative w-fit">
                  <div className="h-[52px] w-[52px] overflow-hidden rounded-full border border-[#ccc] md:h-[60px] md:w-[60px] lg:h-[68px] lg:w-[68px]">
                    <img
                      className="h-full w-full object-cover"
                      src={profileImg}
                    />
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setProfileModal(!profileModal);
                      }}
                      className="absolute -right-1 bottom-0 flex items-center justify-center rounded-full bg-[var(--color-gray1)] p-1"
                    >
                      <Settings className="h-3.5 w-3.5 text-[var(--color-gray3)]" />
                    </button>
                    {profileModal && (
                      <ul
                        ref={profileRef}
                        className="absolute top-7/10 left-11/10 z-10 flex w-fit flex-col gap-1 rounded-sm border border-[#ccc] bg-white p-2 px-3 text-left text-xs text-nowrap md:text-sm lg:text-base"
                      >
                        <li>
                          <label
                            htmlFor="profileImgEdit"
                            className="cursor-pointer"
                          >
                            <input
                              id="profileImgEdit"
                              type="file"
                              className="hidden"
                              accept="image/jpg,image/png,image/jpeg"
                              onChange={profileImgEidtHandler}
                            />
                            사진변경
                          </label>
                        </li>
                        <li>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setProfileImg(defaultProfile);
                            }}
                            className="text-red-caution"
                          >
                            삭제
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    className="edit-input"
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      handleNameInput(e);
                    }}
                  />
                  {!isValidName(userName) && (
                    <div className="absolute -bottom-4 left-1 float-left text-[10px] text-[var(--color-red-caution)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                      이름은 공백과 특수문자를 제외한 2자 이상 16자 이하로
                      작성해주세요.
                    </div>
                  )}
                </div>
                <input
                  className="edit-input"
                  type="text"
                  value={user.email}
                  disabled
                />
                {user.auth_type === 'email' && (
                  <>
                    {passwordEdit && (
                      <div className="flex flex-col gap-5 md:gap-5.5 lg:gap-6">
                        <div className="relative">
                          <input
                            className="edit-input"
                            type="password"
                            placeholder="비밀번호 변경"
                            onChange={handlePasswordInput}
                          />
                          {!password && !passwordCheck ? (
                            ''
                          ) : !isValidPassword(password) ? (
                            <span className="float-left text-[10px] text-[var(--color-red-caution)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                              비밀번호는 8자 이상 20자 이하로 영문 대소문자,
                              숫자, 특수문자가 모두 들어가도록 작성해주세요.
                            </span>
                          ) : (
                            <span className="float-left text-[10px] text-[var(--color-green-info)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                              올바른 형식입니다.
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <input
                            className="edit-input"
                            type="password"
                            placeholder="비밀번호 확인"
                            onChange={handlePasswordCheckInput}
                          />
                          {!passwordCheck ? (
                            ''
                          ) : !isValidPasswordCheck() ? (
                            <span className="absolute top-full left-1 float-left text-[10px] text-[var(--color-red-caution)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                              비밀번호가 일치하지 않습니다
                            </span>
                          ) : (
                            <span className="absolute -bottom-4 left-1 float-left text-[10px] text-[var(--color-green-info)] md:-bottom-4.5 md:text-xs lg:-bottom-5 lg:text-sm">
                              올바른 형식입니다.
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setPasswordEdit(false)}
                          className="button-sm gray ml-auto w-fit"
                        >
                          비밀번호 변경 취소
                        </button>
                      </div>
                    )}
                    {!passwordEdit && (
                      <button
                        className="button-sm bg-main! ml-auto w-fit"
                        onClick={() => setPasswordEdit(true)}
                      >
                        비밀번호 변경
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* 버튼 */}
            <div className="flex gap-2.5 px-4 py-[25px] md:px-6 lg:px-8 lg:py-[35px]">
              <button
                onClick={closeProfile}
                className="button-lg gray bg-[var(--color-gray1)]!"
              >
                닫기
              </button>
              <button type="submit" className="button-lg">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
