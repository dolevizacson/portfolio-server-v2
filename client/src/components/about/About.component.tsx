import * as React from 'react';
import {
  DoubleQuoteSansLeft,
  DoubleQuoteSansRight,
} from '@styled-icons/open-iconic';

import * as style from './style/about.style';

const About = (): JSX.Element => {
  return (
    <style.About>
      <style.AboutContainer>
        <style.ImageContainer></style.ImageContainer>
        <style.Info>
          <style.Header>
            dolev izacson <style.NoLineBreak>full-stack</style.NoLineBreak>{' '}
            developer
          </style.Header>
          <style.Description>
            Full Stack developer, biotechnology engineer, love to learn new
            things and understand how things work. Love to create and design my
            own projects
          </style.Description>
          <style.Quote>
            <style.FrontQuoteMark>
              <DoubleQuoteSansLeft />
            </style.FrontQuoteMark>
            Try to find moments to laugh, even at hard times
            <style.BackQuoteMark>
              <DoubleQuoteSansRight />
            </style.BackQuoteMark>
          </style.Quote>
        </style.Info>
      </style.AboutContainer>
    </style.About>
  );
};

export default About;
