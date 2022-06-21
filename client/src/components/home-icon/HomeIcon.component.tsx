import * as React from 'react';

import * as style from './style/home-icon.style';

const HomeIcon = (): JSX.Element => {
  return (
    <style.HomeIconContainer>
      <style.HomeIconContainerBackground>
        <style.FirstLetterContainer>
          <style.FirstLetterRight>
            <style.FirstLetterRightInnerLeft></style.FirstLetterRightInnerLeft>
            <style.FirstLetterRightInnerRight></style.FirstLetterRightInnerRight>
          </style.FirstLetterRight>
          <style.FirstLetterLeft></style.FirstLetterLeft>
        </style.FirstLetterContainer>
        <style.SecondLetterContainer>
          <style.SecondLetterUp></style.SecondLetterUp>
          <style.SecondLetterDown>
            <style.SecondLetterDownMiddle></style.SecondLetterDownMiddle>
          </style.SecondLetterDown>
        </style.SecondLetterContainer>
      </style.HomeIconContainerBackground>
    </style.HomeIconContainer>
  );
};

export default HomeIcon;
