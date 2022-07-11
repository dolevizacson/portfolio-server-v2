import * as React from 'react';
import { UseFormReset } from 'react-hook-form';

import DeleteButton, {
  DeleteButtonProps,
} from '../delete-button/DeleteButton.component';

import * as style from './style/form-item-buttons.style';

interface FormItemButtonsProps<U, UR, R, D, DR>
  extends DeleteButtonProps<D, DR> {
  children?: React.ReactNode;
  itemName?: string;
  updateFunction: (arg: U) => UR;
  updateItem: U;
  resetFunction: UseFormReset<R>;
}

const FormItemButtons = <U, UR, R, D, DR>({
  children,
  itemName,
  updateFunction,
  updateItem,
  resetFunction,
  modalButtonText,
  ...deleteButtonProps
}: FormItemButtonsProps<U, UR, R, D, DR>): JSX.Element => {
  return (
    <style.FormItemButtons>
      {children}
      <style.FormItemButton type="button" onClick={() => resetFunction()}>
        undo changes
      </style.FormItemButton>
      <DeleteButton
        {...deleteButtonProps}
        modalButtonText={
          modalButtonText || itemName ? `delete ${itemName}` : 'delete'
        }
      >
        <style.FormItemButton type="button">
          {itemName ? `delete ${itemName}` : 'delete'}
        </style.FormItemButton>
      </DeleteButton>
      <style.FormItemButton
        type="button"
        onClick={() => updateFunction(updateItem)}
      >
        save progress
      </style.FormItemButton>
      <style.FormItemButton type="submit">
        {itemName ? `add ${itemName}` : 'add'}
      </style.FormItemButton>
    </style.FormItemButtons>
  );
};

export default FormItemButtons;
