import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import * as style from './style/form-text-area.style';

type FormTextAreaProps = {
  labelName?: string;
  fieldName: string;
  rows?: number;
  error?: string;
};

const FormTextArea = ({
  labelName,
  fieldName,
  rows,
  error,
}: FormTextAreaProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = error || errors[fieldName]?.message;

  return (
    <style.FormTextArea>
      <style.FormTextAreaLabel>
        <style.FormTextAreaTextContainer>
          <style.FormTextAreaText>
            {labelName || fieldName}
          </style.FormTextAreaText>
          <style.FormTextAreaError>
            {errorMessage && <style.ErrorIcon />}
            {errorMessage}
          </style.FormTextAreaError>
        </style.FormTextAreaTextContainer>
        <style.FormTextAreaInputField
          {...register(fieldName)}
          rows={rows || 7}
        />
      </style.FormTextAreaLabel>
    </style.FormTextArea>
  );
};

export default FormTextArea;
