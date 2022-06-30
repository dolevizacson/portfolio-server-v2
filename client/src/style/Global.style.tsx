import { createGlobalStyle } from 'styled-components';

// fonts
import RubikMonoOneWoff2 from '../assets/fonts/RubikMonoOne-Regular.woff2';

import NotoSansDisplayBlackWoff2 from '../assets/fonts/NotoSansDisplay-Black.woff2';
import NotoSansDisplayExtraBoldWoff2 from '../assets/fonts/NotoSansDisplay-ExtraBold.woff2';
import NotoSansDisplayBoldWoff2 from '../assets/fonts/NotoSansDisplay-Bold.woff2';
import NotoSansDisplaySemiBoldWoff2 from '../assets/fonts/NotoSansDisplay-SemiBold.woff2';
import NotoSansDisplayMediumWoff2 from '../assets/fonts/NotoSansDisplay-Medium.woff2';
import NotoSansDisplayRegularWoff2 from '../assets/fonts/NotoSansDisplay-Regular.woff2';
import NotoSansDisplayLightWoff2 from '../assets/fonts/NotoSansDisplay-Light.woff2';
import NotoSansDisplayExtraLightWoff2 from '../assets/fonts/NotoSansDisplay-ExtraLight.woff2';
import NotoSansDisplayThinWoff2 from '../assets/fonts/NotoSansDisplay-Thin.woff2';

import SairaBlackWoff2 from '../assets/fonts/Saira-Black.woff2';
import SairaExtraBoldWoff2 from '../assets/fonts/Saira-ExtraBold.woff2';
import SairaBoldWoff2 from '../assets/fonts/Saira-Bold.woff2';
import SairaSemiBoldWoff2 from '../assets/fonts/Saira-SemiBold.woff2';
import SairaMediumWoff2 from '../assets/fonts/Saira-Medium.woff2';
import SairaRegularWoff2 from '../assets/fonts/Saira-Regular.woff2';
import SairaLightWoff2 from '../assets/fonts/Saira-Light.woff2';
import SairaExtraLightWoff2 from '../assets/fonts/Saira-ExtraLight.woff2';
import SairaThinWoff2 from '../assets/fonts/Saira-Thin.woff2';

import ZCOOLQingKeHuangYouRegularWoff2 from '../assets/fonts/ZCOOLQingKeHuangYou-Regular.woff2';

import CaveatBoldWoff2 from '../assets/fonts/Caveat-Bold.woff2';
import CaveatSemiBoldWoff2 from '../assets/fonts/Caveat-SemiBold.woff2';
import CaveatMediumWoff2 from '../assets/fonts/Caveat-Medium.woff2';
import CaveatRegularWoff2 from '../assets/fonts/Caveat-Regular.woff2';

import RubikMonoOneTtf from '../assets/fonts/RubikMonoOne-Regular.ttf';

import NotoSansDisplayBlackTtf from '../assets/fonts/NotoSansDisplay-Black.ttf';
import NotoSansDisplayExtraBoldTtf from '../assets/fonts/NotoSansDisplay-ExtraBold.ttf';
import NotoSansDisplayBoldTtf from '../assets/fonts/NotoSansDisplay-Bold.ttf';
import NotoSansDisplaySemiBoldTtf from '../assets/fonts/NotoSansDisplay-SemiBold.ttf';
import NotoSansDisplayMediumTtf from '../assets/fonts/NotoSansDisplay-Medium.ttf';
import NotoSansDisplayRegularTtf from '../assets/fonts/NotoSansDisplay-Regular.ttf';
import NotoSansDisplayLightTtf from '../assets/fonts/NotoSansDisplay-Light.ttf';
import NotoSansDisplayExtraLightTtf from '../assets/fonts/NotoSansDisplay-ExtraLight.ttf';
import NotoSansDisplayThinTtf from '../assets/fonts/NotoSansDisplay-Thin.ttf';

import SairaBlackTtf from '../assets/fonts/Saira-Black.ttf';
import SairaExtraBoldTtf from '../assets/fonts/Saira-ExtraBold.ttf';
import SairaBoldTtf from '../assets/fonts/Saira-Bold.ttf';
import SairaSemiBoldTtf from '../assets/fonts/Saira-SemiBold.ttf';
import SairaMediumTtf from '../assets/fonts/Saira-Medium.ttf';
import SairaRegularTtf from '../assets/fonts/Saira-Regular.ttf';
import SairaLightTtf from '../assets/fonts/Saira-Light.ttf';
import SairaExtraLightTtf from '../assets/fonts/Saira-ExtraLight.ttf';
import SairaThinTtf from '../assets/fonts/Saira-Thin.ttf';

import ZCOOLQingKeHuangYouRegularTtf from '../assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf';

import CaveatBoldTtf from '../assets/fonts/Caveat-Bold.ttf';
import CaveatSemiBoldTtf from '../assets/fonts/Caveat-SemiBold.ttf';
import CaveatMediumTtf from '../assets/fonts/Caveat-Medium.ttf';
import CaveatRegularTtf from '../assets/fonts/Caveat-Regular.ttf';

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
    --color-main-9: rgba(38, 38, 38, 1);
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
    --size-header-padding-down: 5rem;
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
    src: url(${RubikMonoOneWoff2}) format('woff2'), url(${RubikMonoOneTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 900;
    src: url(${NotoSansDisplayBlackWoff2}) format('woff2'), url(${NotoSansDisplayBlackTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 800;
    src: url(${NotoSansDisplayExtraBoldWoff2}) format('woff2'), url(${NotoSansDisplayExtraBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 700;
    src: url(${NotoSansDisplayBoldWoff2}) format('woff2'), url(${NotoSansDisplayBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 600;
    src: url(${NotoSansDisplaySemiBoldWoff2}) format('woff2'), url(${NotoSansDisplaySemiBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 500;
    src: url(${NotoSansDisplayMediumWoff2}) format('woff2'), url(${NotoSansDisplayMediumTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 400;
    src: url(${NotoSansDisplayRegularWoff2}) format('woff2'), url(${NotoSansDisplayRegularTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 300;
    src: url(${NotoSansDisplayLightWoff2}) format('woff2'), url(${NotoSansDisplayLightTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 200;
    src: url(${NotoSansDisplayExtraLightWoff2}) format('woff2'), url(${NotoSansDisplayExtraLightTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Noto Sans Display';
    font-weight: 100;
    src: url(${NotoSansDisplayThinWoff2}) format('woff2'), url(${NotoSansDisplayThinTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 900;
    src: url(${SairaBlackWoff2}) format('woff2'), url(${SairaBlackTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 800;
    src: url(${SairaExtraBoldWoff2}) format('woff2'), url(${SairaExtraBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 700;
    src: url(${SairaBoldWoff2}) format('woff2'), url(${SairaBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 600;
    src: url(${SairaSemiBoldWoff2}) format('woff2'), url(${SairaSemiBoldTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 500;
    src: url(${SairaMediumWoff2}) format('woff2'),url(${SairaMediumTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 400;
    src: url(${SairaRegularWoff2}) format('woff2'),url(${SairaRegularTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 300;
    src: url(${SairaLightWoff2}) format('woff2'),url(${SairaLightTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 200;
    src: url(${SairaExtraLightWoff2}) format('woff2'),url(${SairaExtraLightTtf}) format('ttf');
  }
  @font-face {
    font-family: 'Saira';
    font-weight: 100;
    src: url(${SairaThinWoff2}) format('woff2'),url(${SairaThinTtf}) format('ttf');
  }
  @font-face {
    font-family: 'ZCOOL QingKe HuangYou';
    font-weight: 400;
    src: url(${ZCOOLQingKeHuangYouRegularWoff2}) format('woff2'),url(${ZCOOLQingKeHuangYouRegularTtf}) format('ttf');
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 700;
    src: url(${CaveatBoldWoff2}) format('woff2'),url(${CaveatBoldTtf}) format('ttf');
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 600;
    src: url(${CaveatSemiBoldWoff2}) format('woff2'),url(${CaveatSemiBoldTtf}) format('ttf');
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 500;
    src: url(${CaveatMediumWoff2}) format('woff2'),url(${CaveatMediumTtf}) format('ttf');
  }
    @font-face {
    font-family: 'Caveat';
    font-weight: 400;
    src: url(${CaveatRegularWoff2}) format('woff2'),url(${CaveatRegularTtf}) format('ttf');
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
