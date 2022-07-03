import * as React from 'react';
import { createPortal } from 'react-dom';

import * as style from './style/app-modal.style';

type AppModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  onClose?: () => void;
};

const AppModal = ({ children, showModal, onClose }: AppModalProps) => {
  const el = React.useRef(document.createElement('div'));
  const modalRoot = document.getElementById('app');

  const [isOpen, setIsOpen] = React.useState(showModal);

  React.useEffect(() => {
    const current = el.current;

    if (modalRoot) {
      modalRoot!.appendChild(current);
    }
    return () => void modalRoot!.removeChild(current);
  }, [modalRoot]);

  return isOpen || showModal
    ? createPortal(
        <style.AppModal onClick={(e) => e.stopPropagation()}>
          <style.AppModalBackGroundStyle
            onClick={() => {
              if (onClose) {
                onClose();
              }
              setIsOpen(false);
            }}
          >
            <style.AppModalContainerStyle onClick={(e) => e.stopPropagation()}>
              {children}
            </style.AppModalContainerStyle>
          </style.AppModalBackGroundStyle>
        </style.AppModal>,
        el.current
      )
    : null;
};

export default AppModal;
