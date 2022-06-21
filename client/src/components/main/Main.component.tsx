import * as React from 'react';

import * as style from './style/main.style';

export interface MainProps {
  children: React.ReactNode;
}

const Main = (props: MainProps): JSX.Element => {
  return (
    <style.Main>
      <style.MainContainer>{props.children}</style.MainContainer>
    </style.Main>
  );
};

export default Main;
