import { createGlobalStyle } from 'styled-components';

// fonts
import RubikMonoOne from '../assets/fonts/RubikMonoOne-Regular.ttf';

import NotoSansDisplayBlack from '../assets/fonts/NotoSansDisplay-Black.ttf';
import NotoSansDisplayExtraBold from '../assets/fonts/NotoSansDisplay-ExtraBold.ttf';
import NotoSansDisplayBold from '../assets/fonts/NotoSansDisplay-Bold.ttf';
import NotoSansDisplaySemiBold from '../assets/fonts/NotoSansDisplay-SemiBold.ttf';
import NotoSansDisplayMedium from '../assets/fonts/NotoSansDisplay-Medium.ttf';
import NotoSansDisplayRegular from '../assets/fonts/NotoSansDisplay-Regular.ttf';
import NotoSansDisplayLight from '../assets/fonts/NotoSansDisplay-Light.ttf';
import NotoSansDisplayExtraLight from '../assets/fonts/NotoSansDisplay-ExtraLight.ttf';
import NotoSansDisplayThin from '../assets/fonts/NotoSansDisplay-Thin.ttf';

import SairaBlack from '../assets/fonts/Saira-Black.ttf';
import SairaExtraBold from '../assets/fonts/Saira-ExtraBold.ttf';
import SairaBold from '../assets/fonts/Saira-Bold.ttf';
import SairaSemiBold from '../assets/fonts/Saira-SemiBold.ttf';
import SairaMedium from '../assets/fonts/Saira-Medium.ttf';
import SairaRegular from '../assets/fonts/Saira-Regular.ttf';
import SairaLight from '../assets/fonts/Saira-Light.ttf';
import SairaExtraLight from '../assets/fonts/Saira-ExtraLight.ttf';
import SairaThin from '../assets/fonts/Saira-Thin.ttf';

import ZCOOLQingKeHuangYouRegular from '../assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf';

import CaveatBold from '../assets/fonts/Caveat-Bold.ttf';
import CaveatSemiBold from '../assets/fonts/Caveat-SemiBold.ttf';
import CaveatMedium from '../assets/fonts/Caveat-Medium.ttf';
import CaveatRegular from '../assets/fonts/Caveat-Regular.ttf';

const GlobalStyle = createGlobalStyle`

  :root {
    /* colors */

    /* main colors */
    --color-main-1: rgba(17,17,17,1);
    --color-main-2: rgba(255,255,255,1);
    --color-main-3: rgba(5, 5, 5, 1);
    --color-main-4: rgba(45, 45, 45, 1);
    --color-main-5: rgba(25,25,25,1);
    --color-main-6: rgb(55, 55, 55);
    --color-main-7: rgba(92, 92, 92, 1);
    --color-main-8: rgba(42, 42, 42, 1);
    --color-main-9: rgba(28, 28, 28, 1);
    --color-main-10: rgba(255, 255, 255, 0.3);
    --color-main-11: rgba(115, 115, 115, 0.2);

    /* fonts colors */
    --color-font-1:rgba(255,255,255,1); /* main font color */
    --color-font-2:rgba(17,17,17,1); /* main font color */

    /* sizes / spacing */
    --size-navbar-height: 7rem;
    --size-button-width-1: 22rem;
    --size-button-width-2: 15rem;
    --size-input-radius-1: 2.5px;
    --size-focus-radius-1: 7.5px;
    --size-input-padding-1: 0.6rem 0.9rem;
  }

  /* base css settings */
  * {
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
    font-family: inherit;
  }

  html {
    box-sizing: border-box;
    
    /* 1rem = 10px => 10px/16px = 62.5% */
    font-size: 62.5%; 
    /* 75em 1200px tab land 56.25%  9px*/
    ${(props) => props.theme.media('tabLand')`font-size: 56.25%`}
    /* 56.25em 900px tab port 50%  8px*/
    ${(props) => props.theme.media('tabPort')`font-size: 50%`}
    /* 37.5em 600px phone 43.75% 7px */
    ${(props) => props.theme.media('bigPhone')`font-size: 43.75%`}
    /* 18.75em 300px phone 37.5% 6px */
    ${(props) => props.theme.media('phone')`font-size: 37.5%`}
    /* 15.625em 250px phone 31.25% 5px */
    ${(props) => props.theme.media('smallPhone')`font-size: 31.25%`}
    /* 112.5em 1800px big desktop (min-width) 75% 12px*/
    ${(props) => props.theme.media('bigDesktop')`font-size:  75%`}
  }

   /* fonts imports */
  @font-face {
    font-family: 'Rubik Mono One';
    src: url(${RubikMonoOne});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 900;
    src: url(${NotoSansDisplayBlack});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 800;
    src: url(${NotoSansDisplayExtraBold});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 700;
    src: url(${NotoSansDisplayBold});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 600;
    src: url(${NotoSansDisplaySemiBold});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 500;
    src: url(${NotoSansDisplayMedium});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 400;
    src: url(${NotoSansDisplayRegular});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 300;
    src: url(${NotoSansDisplayLight});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 200;
    src: url(${NotoSansDisplayExtraLight});
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 100;
    src: url(${NotoSansDisplayThin});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 900;
    src: url(${SairaBlack});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 800;
    src: url(${SairaExtraBold});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 700;
    src: url(${SairaBold});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 600;
    src: url(${SairaSemiBold});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 500;
    src: url(${SairaMedium});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 400;
    src: url(${SairaRegular});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 300;
    src: url(${SairaLight});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 200;
    src: url(${SairaExtraLight});
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 100;
    src: url(${SairaThin});
  }
  @font-face {
    font-family: 'ZCOOL QingKe HuangYou';
    font-weight: 400;
    src: url(${ZCOOLQingKeHuangYouRegular});
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 700;
    src: url(${CaveatBold});
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 600;
    src: url(${CaveatSemiBold});
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 500;
    src: url(${CaveatMedium});
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 400;
    src: url(${CaveatRegular});
  }

  body {
   font-size: 1.9rem;
   font-family: 'Saira', sans-serif;
  }

  /* typography */
  h1 {
    font-family: 'Rubik Mono One', sans-serif;
    font-weight: 400;
    letter-spacing: -0.2rem;
    font-size: 4.3rem;
    ${(props) => props.theme.media('smallPhone')`hyphens: auto;`}
  }

  h2 {
    font-family: 'Rubik Mono One', sans-serif;
    font-weight: 400;
    font-size: 2.4rem;
    ${(props) => props.theme.media('smallPhone')`hyphens: auto;`}
  }

  p {
    line-height: 3.3rem ;
  }

  input {
    font-size: 1.9rem;
    font-weight: 500;

    border-radius: var(--size-input-radius-1);
    border:none;

    padding: var(--size-input-padding-1);
  }

  textarea {
    font-size: 1.9rem;
    font-weight: 500;

    border-radius: var(--size-input-radius-1);
    border:none;

    padding: var(--size-input-padding-1);

    resize: none;
  }

  a {
    font-size: 1.9rem;
    text-decoration: none;
    color:var(--color-font-1);
    font-family: 'Saira', sans-serif;
  }

  select {
    border-radius: var(--size-input-radius-1);
    border:none;

    padding: var(--size-input-padding-1);
  }

  option {
    border-radius: var(--size-input-radius-1);
    border:none;

    padding: var(--size-input-padding-1);
  }
`;

export default GlobalStyle;
