import * as React from 'react';

import AppModal from '../app-modal/AppModal.component';

import * as style from './style/delete-button.style';

export interface DeleteButtonProps<T, R> {
  deleteFunction: (arg: T) => R;
  deleteItem: T;
  modalButtonText?: string;
  successErrorObject?: {
    success: boolean;
    error: boolean;
  };
}

interface DeleteButtonPropsWithChildren<T, R> extends DeleteButtonProps<T, R> {
  children: React.ReactNode;
}

const DeleteButton = <T, R>({
  children,
  deleteFunction,
  deleteItem,
  modalButtonText,
  successErrorObject,
}: DeleteButtonPropsWithChildren<T, R>): JSX.Element => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  React.useEffect(() => {
    if (successErrorObject?.success) {
      setShowDeleteModal(false);
    }
  }, [successErrorObject]);

  return (
    <style.DeleteButton onClick={() => setShowDeleteModal(true)}>
      {children}
      <AppModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <style.DeleteModalContainer>
          <style.DeleteModalText>are you sure ?</style.DeleteModalText>
          <style.DeleteModalButtonContainer>
            <style.ModalButton onClick={() => setShowDeleteModal(false)}>
              cancel
            </style.ModalButton>
            <style.ModalButton
              onClick={() => {
                deleteFunction(deleteItem);
              }}
            >
              {modalButtonText || 'delete'}
            </style.ModalButton>
          </style.DeleteModalButtonContainer>
        </style.DeleteModalContainer>
      </AppModal>
    </style.DeleteButton>
  );
};

export default DeleteButton;
