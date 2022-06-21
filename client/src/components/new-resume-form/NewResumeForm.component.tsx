import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { resumeFormDefaultValue } from '../../common/constants/forms-default-values';
import { CreateResume } from '../../common/interfaces/create-resume.interface';
import { useCreateResumeMutation } from '../../services/resume/resume.service';
import { documentFileType } from '../../common/constants/common.constants';
import FormInput from '../form-input/FormInput.component';
import FormFileInput from '../form-file-input/FormFileInput.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';

import * as style from './style/new-resume-form.style';

const NewResumeForm = (): JSX.Element => {
  const [createResume, createResumeResponse] = useCreateResumeMutation();

  const resumeValidationSchema = yup
    .object({
      file: yup
        .mixed()
        .test('file exist', 'file is required', (fileList: FileList) => {
          return fileList?.length > 0;
        })
        .test('file type', 'file must be a document', (fileList: FileList) => {
          return documentFileType.has(fileList[0]?.type);
        }),
      name: yup.string().required(),
    })
    .required();

  const formMethods = useForm<CreateResume>({
    defaultValues: resumeFormDefaultValue,
    resolver: yupResolver(resumeValidationSchema),
  });

  const { handleSubmit, reset } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

  const onSubmit: SubmitHandler<CreateResume> = (resume) =>
    createResume(resume);

  React.useEffect(() => {
    if (createResumeResponse.isSuccess) {
      reset();
    }
  }, [createResumeResponse, reset]);

  return (
    <style.NewResumeForm>
      <OnScreenNotification
        messages={[
          {
            isShow: createResumeResponse.isLoading,
            messageText: 'uploading resume',
          },
          {
            isShow: createResumeResponse.isError,
            messageText: 'uploading resume error',
            closeAfter: 5,
          },
        ]}
      />
      <style.NewResumeFormHeader>add resume</style.NewResumeFormHeader>
      <style.NewResumeFormContainer>
        <DisableForm disabled={createResumeResponse.isLoading}>
          <FormProvider {...formMethods}>
            <style.NewResumeFormFormContainer>
              <FormInput fieldName="name" />
              <FormFileInput fieldName="file" />
            </style.NewResumeFormFormContainer>
          </FormProvider>
        </DisableForm>
        <style.ButtonContainer>
          <style.NewResumeFormButton type="button" onClick={() => reset()}>
            clear
          </style.NewResumeFormButton>
          <style.NewResumeFormButton
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            add resume
          </style.NewResumeFormButton>
        </style.ButtonContainer>
      </style.NewResumeFormContainer>
    </style.NewResumeForm>
  );
};

export default NewResumeForm;
