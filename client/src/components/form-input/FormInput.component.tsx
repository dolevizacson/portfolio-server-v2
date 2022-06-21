import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import * as style from './style/form-input.style';

type FormInputProps = {
  fieldName: string;
  labelName?: string;
  password?: boolean;
  error?: string;
};

const FormInput = ({
  labelName,
  fieldName,
  password,
  error,
}: FormInputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = error || errors[fieldName]?.message;

  return (
    <style.FormInput>
      <style.FormInputLabel>
        <style.FormInputTextContainer>
          <style.FormInputText>{labelName || fieldName}</style.FormInputText>
          <style.FormInputError>
            {errorMessage && <style.ErrorIcon />}
            {errorMessage}
          </style.FormInputError>
        </style.FormInputTextContainer>
        <style.FormInputInputField
          {...register(fieldName)}
          type={password ? 'password' : 'text'}
        />
      </style.FormInputLabel>
    </style.FormInput>
  );
};

export default FormInput;
