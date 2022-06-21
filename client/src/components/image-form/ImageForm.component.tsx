import * as React from 'react';

import FormInput from '../form-input/FormInput.component';
import FormFileInput from '../form-file-input/FormFileInput.component';

import * as style from './style/image-form.style';

const ImageForm = (): JSX.Element => {
  return (
    <style.ImageForm>
      <FormFileInput fieldName="file" labelName="image file" />
      <FormInput fieldName="description" labelName="image description" />
    </style.ImageForm>
  );
};

export default ImageForm;
