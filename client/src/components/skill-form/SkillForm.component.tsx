import * as React from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form';

import { SkillsCategory } from '../../common/interfaces/skills-category.interface';
import { SkillForm as ISkillForm } from '../../common/interfaces/skill-form.interface';
import FormInput from '../form-input/FormInput.component';
import FormTextArea from '../form-text-area/FormTextArea.component';
import FormSelect from '../form-select/FormSelect.component';

import * as style from './style/skill-form.style';

type skillFormProps = {
  skillsCategories: Record<string, SkillsCategory> | undefined;
  attributes: FieldArrayWithId<ISkillForm, 'attributes', 'id'>[];
  removeAttribute: UseFieldArrayRemove;
};

const SkillForm = ({
  skillsCategories,
  attributes,
  removeAttribute,
}: skillFormProps): JSX.Element => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <style.SkillForm>
      <style.SkillFormContainer>
        <FormInput fieldName="name" />
      </style.SkillFormContainer>
      {attributes.length > 0 && (
        <style.SkillAttributesListContainer>
          <style.SkillAttributesListContainerHeader>
            attributes
          </style.SkillAttributesListContainerHeader>
          {attributes.map((field, index) => (
            <style.SkillAttributeContainer key={field.id}>
              <FormTextArea
                labelName={`attribute text`}
                fieldName={`attributes.${index}.name`}
                error={errors.attributes?.[index]?.name?.message}
                rows={3}
              />
              <style.SkillFormButton
                type="button"
                onClick={() => removeAttribute(index)}
              >
                remove attribute
              </style.SkillFormButton>
            </style.SkillAttributeContainer>
          ))}
        </style.SkillAttributesListContainer>
      )}
      {skillsCategories && (
        <style.SkillSkillsCategoryListContainer>
          <FormSelect
            labelName="skills category"
            fieldName="skillsCategory"
            options={Object.values(skillsCategories).map((skillsCategory) => {
              return {
                key: skillsCategory._id,
                value: skillsCategory._id,
                optionName: skillsCategory.name,
              };
            })}
          />
        </style.SkillSkillsCategoryListContainer>
      )}
    </style.SkillForm>
  );
};

export default SkillForm;
