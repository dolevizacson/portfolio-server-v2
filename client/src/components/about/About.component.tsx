import * as React from 'react';
import {
  DoubleQuoteSansLeft,
  DoubleQuoteSansRight,
} from '@styled-icons/open-iconic';

import ImageContainer from '../image-container/ImageContainer.component';

import * as style from './style/about.style';

const About = (): JSX.Element => {
  return (
    <style.About>
      <style.AboutContainer>
        <style.ImageContainer>
          <ImageContainer
            src="https://res.cloudinary.com/d-i-portfolio-images/image/upload/v1656352924/profile-pictures/ProfilePicBig_vlg33f.jpg"
            alt="profile picture"
            imageFit="fill"
          />
        </style.ImageContainer>
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
