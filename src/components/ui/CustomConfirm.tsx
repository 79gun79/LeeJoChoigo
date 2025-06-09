import {
  Flip,
  toast,
  type ToastPosition,
  type ToastTransitionProps,
} from 'react-toastify';
import Button from './Button';

const confirmStyle: {
  position: ToastPosition;
  autoClose: boolean;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  theme: string;
  transition: ({
    children,
    position,
    preventExitTransition,
    done,
    nodeRef,
    isIn,
    playToast,
  }: ToastTransitionProps) => React.JSX.Element;
} = {
  position: 'top-center',
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  transition: Flip,
};

export const customConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div
          className="flex w-full flex-col gap-4 p-2 text-white"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <p>{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                resolve(true);
                closeToast();
              }}
              variant='sub'
              className={'rounded-xl text-white hover:bg-green-500'}
            >
              확인
            </Button>
            <Button
              onClick={() => {
                resolve(false);
                closeToast();
              }}
              className={'rounded-xl text-white hover:bg-blue-500'}
            >
              취소
            </Button>
          </div>
        </div>
      ),
      { ...confirmStyle, autoClose: false },
    );
  });
};
