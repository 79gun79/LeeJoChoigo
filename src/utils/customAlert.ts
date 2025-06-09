import {
  Flip,
  toast,
  type ToastPosition,
  type ToastTransitionProps,
} from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error';

const notifyStyle: {
  position: ToastPosition;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
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
  autoClose: 1800,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Flip,
};

export const notify = (message: string, type: ToastType) => {
  if (type === 'info') {
    toast.info(message, { ...notifyStyle });
  } else if (type === 'success') {
    toast.success(message, { ...notifyStyle });
  } else if (type === 'warning') {
    toast.warn(message, { ...notifyStyle });
  } else if (type === 'error') {
    toast.error(message, {
      ...notifyStyle,
      style: {
        padding: '20px',
      },
    });
  }
};
