import * as React from 'react';

import FormInput from '../form-input/FormInput.component';

import * as style from './style/skills-category-form.style';

const SkillsCategoryForm = (): JSX.Element => {
  return (
    <style.SkillsCategoryForm>
      <FormInput fieldName="name" labelName="skills category name" />
    </style.SkillsCategoryForm>
  );
};

export default SkillsCategoryForm;
