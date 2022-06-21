import * as React from 'react';

import * as style from './style/loading-error.style';

type FixButtonObject = {
  buttonText?: string;
  onClick: () => void;
};

type LoadingErrorProps = {
  message?: string;
  fixButton?: FixButtonObject;
};

const LoadingError = ({
  message,
  fixButton,
}: LoadingErrorProps): JSX.Element => {
  return (
    <style.LoadingError>
      <style.LoadingErrorText>
        {message || fixButton
          ? 'something went wrong try to fix it'
          : 'something went wrong'}
      </style.LoadingErrorText>
      {fixButton && (
        <style.LoadingErrorFixButton onClick={fixButton.onClick}>
          {fixButton.buttonText || 'fix it'}
        </style.LoadingErrorFixButton>
      )}
    </style.LoadingError>
  );
};

export default LoadingError;
