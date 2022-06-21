import * as React from 'react';
import {
  useFormContext,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from 'react-hook-form';

import { CreateProject } from '../../common/interfaces/create-project.interface';
import { Skill } from '../../common/interfaces/skill.interface';
import FormInput from '../form-input/FormInput.component';
import FormMultiSelect from '../form-multi-select/FormMultiSelect.component';
import FormTextArea from '../form-text-area/FormTextArea.component';

import * as style from './style/project-form.style';

type ProjectFormProps = {
  links: FieldArrayWithId<CreateProject, 'links', 'id'>[];
  removeLink: UseFieldArrayRemove;
  skills: Record<string, Skill> | undefined;
};

const ProjectForm = ({
  links,
  removeLink,
  skills,
}: ProjectFormProps): JSX.Element => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <style.ProjectForm>
      <style.ProjectFormContainer>
        <FormInput fieldName="header" />
        <FormTextArea fieldName="summery" rows={4} />
        <FormTextArea fieldName="description" />
      </style.ProjectFormContainer>
      {links.length > 0 && (
        <style.ProjectFormLinksListContainer>
          <style.ProjectFormSubHeader>links</style.ProjectFormSubHeader>
          {links.map((field, index) => (
            <style.ProjectFormLinkContainer key={field.id}>
              <FormInput
                labelName="name"
                fieldName={`links.${index}.name`}
                error={errors.links?.[index]?.name?.message}
              />
              <FormInput
                labelName="url"
                fieldName={`links.${index}.url`}
                error={errors.links?.[index]?.url?.message}
              />
              <style.ProjectFormButton
                type="button"
                onClick={() => removeLink(index)}
              >
                remove link
              </style.ProjectFormButton>
            </style.ProjectFormLinkContainer>
          ))}
        </style.ProjectFormLinksListContainer>
      )}
      {skills && (
        <style.ProjectFormTechnologiesContainer>
          <FormMultiSelect
            fieldName="technologies"
            options={Object.values(skills).map((skill) => {
              return {
                key: skill._id,
                value: skill._id,
                optionName: skill.name,
              };
            })}
          />
        </style.ProjectFormTechnologiesContainer>
      )}
    </style.ProjectForm>
  );
};

export default ProjectForm;
