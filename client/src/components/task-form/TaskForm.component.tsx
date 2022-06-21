import * as React from 'react';

import FormInput from '../form-input/FormInput.component';
import FormTextArea from '../form-text-area/FormTextArea.component';

import * as style from './style/task-form.style';

const TaskForm = (): JSX.Element => {
  return (
    <style.TaskForm>
      <FormInput fieldName="header" />
      <FormTextArea fieldName="description" rows={4} />
    </style.TaskForm>
  );
};

export default TaskForm;
