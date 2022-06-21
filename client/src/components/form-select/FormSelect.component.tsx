import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import * as style from './style/form-select.style';

type Option = {
  key: React.Key | null | undefined;
  value: string | number | readonly string[] | undefined;
  optionName: string | number;
};

type FormSelectProps = {
  fieldName: string;
  labelName?: string;
  defaultOption?: string;
  error?: string;
  options: Option[];
};

const FormSelect = ({
  fieldName,
  labelName,
  defaultOption,
  error,
  options,
}: FormSelectProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = error || errors[fieldName]?.message;

  return (
    <style.FormSelect>
      <style.FormSelectTextContainer>
        <style.FormSelectText>{labelName || fieldName}</style.FormSelectText>
        <style.FormSelectError>
          {errorMessage && <style.ErrorIcon />}
          {errorMessage}
        </style.FormSelectError>
      </style.FormSelectTextContainer>
      <style.FormSelectLabel>
        <style.FormSelectSelectInput {...register(fieldName)}>
          <style.FormSelectSelectOption value="">
            {defaultOption || 'Select...'}
          </style.FormSelectSelectOption>
          {options.map((option) => {
            return (
              <style.FormSelectSelectOption
                key={option.key}
                value={option.value}
              >
                {option.optionName}
              </style.FormSelectSelectOption>
            );
          })}
        </style.FormSelectSelectInput>
      </style.FormSelectLabel>
    </style.FormSelect>
  );
};

export default FormSelect;
