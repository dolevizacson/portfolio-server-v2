import styled from 'styled-components';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const Main = styled.main`
  display: grid;
  grid-template-columns:
    minmax(1.5rem, 1fr) [main-start] minmax(min-content, 110rem)
    [main-end] minmax(1.5rem, 1fr);

  min-height: calc(100vh - var(--size-navbar-height));
  padding-top: var(--size-navbar-height);

  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding-left: 6.5rem;
    padding-right: 6.5rem;
  `}
`;

export const MainContainer = styled.section`
  grid-column: main-start/main-end;

  display: flex;
  justify-content: center;

  padding: 3rem;
`;
