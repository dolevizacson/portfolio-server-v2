import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import * as style from './style/form-file-input.style';

type FormInputProps = {
  labelName?: string;
  fieldName: string;
};

const FormFileInput = ({
  labelName,
  fieldName,
}: FormInputProps): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [fileName, setFileName] = React.useState('');

  return (
    <style.FormFileInput>
      <style.FormFileInputTextContainer>
        <style.FormFileInputText>
          {labelName || fieldName}
        </style.FormFileInputText>
        <style.FormFileInputError>
          {errors[fieldName]?.message && <style.ErrorIcon />}
          {errors[fieldName]?.message}
        </style.FormFileInputError>
      </style.FormFileInputTextContainer>
      <style.FormFileInputButtonContainer>
        <style.FormFileInputButtonInputField defaultValue={fileName} />
        <style.FormFileInputButton>
          select file
          <style.FormFileInputInputField
            type="file"
            {...register(fieldName)}
            onChange={(e) => {
              if (e.target.files) {
                const [file] = Array.from(e.target.files);
                setFileName(file.name);
              }
            }}
          />
        </style.FormFileInputButton>
      </style.FormFileInputButtonContainer>
    </style.FormFileInput>
  );
};

export default FormFileInput;
