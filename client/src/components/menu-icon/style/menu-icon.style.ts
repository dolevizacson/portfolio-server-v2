import styled from 'styled-components';

export const MenuIconBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--color-main-1);

  height: calc(var(--size-navbar-height) - 2.6rem);
  aspect-ratio: 1/1;

  cursor: pointer;
`;

export const MenuIconBar = styled.div`
  background-color: var(--color-main-2);

  width: 80%;
  height: 15%;

  border-radius: 5px;
`;
