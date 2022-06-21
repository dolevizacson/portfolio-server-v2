import styled from 'styled-components';

export const Main = styled.main`
  display: grid;
  grid-template-columns:
    minmax(1.5rem, 1fr) [main-start] minmax(min-content, 110rem)
    [main-end] minmax(1.5rem, 1fr);

  min-height: calc(100vh - var(--size-navbar-height));
  padding-top: var(--size-navbar-height);
`;

export const MainContainer = styled.section`
  grid-column: main-start/main-end;

  display: flex;
  justify-content: center;

  padding: 3rem;
`;
