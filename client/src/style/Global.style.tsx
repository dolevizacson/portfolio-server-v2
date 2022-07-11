import { createGlobalStyle } from 'styled-components';

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
    --color-main-12: rgba(17,17,17,0.8);

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
    /* 16.875em 270px phone 31.25% 5px */
    ${(props) => props.theme.media('smallPhone')`font-size: 31.25%`}
    /* 112.5em 1800px big desktop (min-width) 75% 12px*/
    ${(props) => props.theme.media('bigDesktop')`font-size:  75%`}
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
    ${(props) => props.theme.media('phone')`hyphens: auto;`}
  }

  h2 {
    font-family: 'Rubik Mono One', sans-serif;
    font-weight: 400;
    font-size: 2.4rem;
    ${(props) => props.theme.media('phone')`hyphens: auto;`}
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

  ::selection {
    color: var(--color-main-1);
    background-color: var(--color-main-2);
  }
`;

export default GlobalStyle;
