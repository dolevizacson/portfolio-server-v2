import * as React from 'react';

import * as style from './style/center-content.style';

type CenterContentProps = {
  children: React.ReactNode;
  size: number;
};

const CenterContent = ({ children, size }: CenterContentProps): JSX.Element => {
  return (
    <style.CenterContent size={size}>
      <style.CenterContentContainer>{children}</style.CenterContentContainer>
    </style.CenterContent>
  );
};

export default CenterContent;
