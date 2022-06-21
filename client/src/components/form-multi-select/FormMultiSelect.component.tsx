import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import * as style from './style/form-multi-select.style';

type FormMultiSelectProps = {
  fieldName: string;
  labelName?: string;
  defaultOption?: string;
  error?: string;
  options: {
    key: React.Key | null | undefined;
    value: string | number;
    optionName: string | number;
  }[];
};

const FormMultiSelect = ({
  fieldName,
  labelName,
  defaultOption,
  error,
  options,
}: FormMultiSelectProps): JSX.Element => {
  const {
    setValue,
    getValues,
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  const errorMessage = error || errors[fieldName]?.message;

  return (
    <style.FormMultiSelect>
      <style.FormMultiSelectTextContainer>
        <style.FormMultiSelectText>
          {labelName || fieldName}
        </style.FormMultiSelectText>
        <style.FormMultiSelectError>
          {errorMessage && <style.ErrorIcon />}
          {errorMessage}
        </style.FormMultiSelectError>
      </style.FormMultiSelectTextContainer>
      <style.FormMultiSelectSelectInput multiple {...register(fieldName)}>
        {options.map((option) => {
          return (
            <style.FormMultiSelectSelectOption
              key={option.key}
              value={option.value}
            >
              {option.optionName}
            </style.FormMultiSelectSelectOption>
          );
        })}
      </style.FormMultiSelectSelectInput>
      <style.FormMultiSelectOptionsContainer>
        {options.map((option, index) => {
          return (
            <style.FormMultiSelectOption
              key={option.key}
              onClick={() => {
                if (getValues(fieldName).includes(option.value)) {
                  setValue(
                    fieldName,
                    [
                      ...getValues(fieldName).filter(
                        (value: string) => value !== option.value
                      ),
                    ],
                    { shouldValidate: isSubmitted, shouldDirty: true }
                  );
                } else {
                  setValue(fieldName, [...getValues(fieldName), option.value], {
                    shouldValidate: isSubmitted,
                    shouldDirty: true,
                  });
                }
              }}
              isSelected={getValues(fieldName).includes(option.value)}
            >
              {option.optionName}
            </style.FormMultiSelectOption>
          );
        })}
      </style.FormMultiSelectOptionsContainer>
    </style.FormMultiSelect>
  );
};

export default FormMultiSelect;
