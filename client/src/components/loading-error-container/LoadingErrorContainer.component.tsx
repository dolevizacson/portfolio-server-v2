import * as React from 'react';
import { AnimatePresence } from 'framer-motion';

import * as style from './style/loading-error-container.style';

type BooleanWithComponentObject = {
  isTrue: boolean;
  component: JSX.Element;
};

type LoadingErrorContainerProps = {
  children: React.ReactNode;
  loadingObject?: BooleanWithComponentObject;
  errorObject?: BooleanWithComponentObject;
};

const LoadingErrorContainer = ({
  children,
  loadingObject,
  errorObject,
}: LoadingErrorContainerProps): JSX.Element => {
  return (
    <style.LoadingErrorContainer>
      <AnimatePresence exitBeforeEnter>
        {loadingObject?.isTrue && (
          <style.LoadingErrorContainerAnimationContainer key="loading">
            {loadingObject.component}
          </style.LoadingErrorContainerAnimationContainer>
        )}
        {errorObject?.isTrue && (
          <style.LoadingErrorContainerAnimationContainer key="error">
            {errorObject.component}
          </style.LoadingErrorContainerAnimationContainer>
        )}
        {!loadingObject?.isTrue && !errorObject?.isTrue && (
          <style.LoadingErrorContainerAnimationContainer key="children">
            {children}
          </style.LoadingErrorContainerAnimationContainer>
        )}
      </AnimatePresence>
    </style.LoadingErrorContainer>
  );
};

export default LoadingErrorContainer;
