import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { UserForm } from '../../common/interfaces/user-form.interface';
import {
  useIsLoggedInQuery,
  useLogInMutation,
} from '../../services/auth/auth.service';
import { userFormDefaultValue } from '../../common/constants/forms-default-values';
import FormInput from '../form-input/FormInput.component';
import LoadingErrorContainer from '../loading-error-container/LoadingErrorContainer.component';
import Loading from '../loading/Loading.component';
import OnScreenNotification from '../on-screen-notification/OnScreenNotification.component';
import DisableForm from '../disable-form/DisableForm.component';
import CenterContent from '../center-content/CenterContent.component';

import * as style from './style/login-form-style';

interface LocationState {
  from: { pathname: string };
}

const LoginForm = (): JSX.Element => {
  const location = useLocation();
  const [logIn, logInResponse] = useLogInMutation();
  const { data: isLoggedInData, isLoading: isLoggedInIsLoading } =
    useIsLoggedInQuery();

  const userValidationSchema = yup
    .object({
      username: yup.string().required(),
      password: yup.string().required(),
    })
    .required();

  const formMethods = useForm<UserForm>({
    defaultValues: userFormDefaultValue,
    resolver: yupResolver(userValidationSchema),
  });

  const { handleSubmit } = React.useMemo(() => formMethods, [formMethods]);

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    logIn(data);
  };
  const state = location.state as LocationState;

  if (isLoggedInData) {
    const to = state?.from?.pathname || '/';
    return <Navigate to={to} replace />;
  }

  return (
    <LoadingErrorContainer
      loadingObject={{ isTrue: isLoggedInIsLoading, component: <Loading /> }}
    >
      <style.LoginForm>
        <OnScreenNotification
          messages={[
            {
              isShow: logInResponse.isLoading,
              messageText: 'logging in',
            },
          ]}
        />
        <style.LoginFormHeader>login</style.LoginFormHeader>
        <CenterContent size={75}>
          <style.LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
            <DisableForm disabled={logInResponse.isLoading}>
              <FormProvider {...formMethods}>
                <style.LoginFormFormContainer>
                  <FormInput fieldName="username" />
                  <FormInput fieldName="password" password />
                </style.LoginFormFormContainer>
              </FormProvider>
            </DisableForm>
            <style.ButtonContainer>
              <style.LoginFormError>
                {logInResponse.isError && <style.ErrorIcon />}
                {logInResponse.isError && 'wrong user name or password'}
              </style.LoginFormError>
              <style.LoginFormButton type="submit">login</style.LoginFormButton>
            </style.ButtonContainer>
          </style.LoginFormContainer>
        </CenterContent>
      </style.LoginForm>
    </LoadingErrorContainer>
  );
};

export default LoginForm;
