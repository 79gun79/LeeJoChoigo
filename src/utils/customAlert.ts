import {
  Flip,
  toast,
  type ToastPosition,
  type ToastTransitionProps,
} from 'react-toastify';

type ToastType = 'info' | 'success' | 'warning' | 'error';

const getResponsivePosition = (): ToastPosition => {
  const width = window.innerWidth;
  if (width < 768) {
    return 'top-center';
  }
  return 'top-right';
};

export const notify = (message: string, type: ToastType) => {
  const notifyStyle = {
    position: getResponsivePosition(),
    autoClose: 1800,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Flip,
  };
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
