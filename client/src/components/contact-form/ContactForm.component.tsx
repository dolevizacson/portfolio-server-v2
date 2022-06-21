import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { contactFormDefaultValue } from '../../common/constants/forms-default-values';

import { CreateMail } from '../../common/interfaces/create-mail.interface';
import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { useSendMailMutation } from '../../services/contact/contact.service';
import { persistContact } from '../../slices/contact.slice';
import FormInput from '../form-input/FormInput.component';
import FormTextArea from '../form-text-area/FormTextArea.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';
import CenterContent from '../center-content/CenterContent.component';

import * as style from './style/contact-form.style';

const ContactForm = (): JSX.Element => {
  const [sendMail, sendMailResponse] = useSendMailMutation();
  const contactLocalData = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

  const contactFormValidationSchema = yup
    .object({
      name: yup.string().required('Please add your name'),
      from: yup.string().email().required('Please provide a mail address'),
      subject: yup.string().required('Please provide message subject'),
      text: yup.string().required('Please provide message body'),
    })
    .required();

  const formMethods = useForm<CreateMail>({
    defaultValues: contactFormDefaultValue,
    resolver: yupResolver(contactFormValidationSchema),
  });

  const { handleSubmit, reset, watch } = React.useMemo(
    () => formMethods,
    [formMethods]
  );

  const onSubmit: SubmitHandler<CreateMail> = (mail) => sendMail(mail);

  React.useEffect(() => {
    const subscription = watch((data) => {
      dispatch(persistContact(_.cloneDeep(data) as CreateMail));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

  React.useEffect(() => {
    reset(contactLocalData, { keepDefaultValues: true });
  }, []);

  React.useEffect(() => {
    if (sendMailResponse.isSuccess) {
      dispatch(persistContact(contactFormDefaultValue));
    }
  }, [dispatch, reset, sendMailResponse]);

  return (
    <style.ContactForm>
      <OnScreenNotification
        messages={[
          {
            isShow: sendMailResponse.isLoading,
            messageText: 'sending mail',
          },
          {
            isShow: sendMailResponse.isError,
            messageText: 'mail sending error',
            closeAfter: 5,
          },
        ]}
      />
      <style.ContactFormHeader>contact</style.ContactFormHeader>
      <CenterContent size={75}>
        <style.ContactFormContainer onSubmit={handleSubmit(onSubmit)}>
          <DisableForm disabled={sendMailResponse.isLoading}>
            <FormProvider {...formMethods}>
              <style.ContactFormFormContainer>
                <FormInput fieldName="name" />
                <FormInput fieldName="from" labelName="e-mail" />
                <FormInput fieldName="subject" />
                <FormTextArea fieldName="text" labelName="message" />
              </style.ContactFormFormContainer>
            </FormProvider>
          </DisableForm>
          <style.ButtonContainer>
            <style.ContactFormButton type="button" onClick={() => reset()}>
              clear
            </style.ContactFormButton>
            <style.ContactFormButton>send</style.ContactFormButton>
          </style.ButtonContainer>
        </style.ContactFormContainer>
      </CenterContent>
    </style.ContactForm>
  );
};

export default ContactForm;
