import styled from 'styled-components';

export const HomeIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0.5rem;

  height: 3rem;
  width: 6rem;

  --letters-color: var(--color-main-2);
  --background-color: var(--color-main-1);
  --dot-color: var(--color-main-2);
`;

export const HomeIconContainerBackground = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3px;

  height: 3rem;
  width: 6rem;

  background-color: transparent;
`;

export const FirstLetterContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

export const FirstLetterRight = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: var(--letters-color);

  z-index: 10;
`;

export const FirstLetterRightInnerLeft = styled.div`
  position: absolute;
  top: calc(100% / 3);
  right: calc(100% / 2.5);

  width: calc(100% / 3);
  height: calc(100% / 3);

  border-radius: 50%;
  background-color: var(--background-color);
`;

export const FirstLetterRightInnerRight = styled.div`
  position: absolute;
  top: calc(100% / 3);
  right: calc(100% / 2.5);

  width: calc((100% / 3) / 2);
  height: calc(100% / 3);

  border-radius: 0.75px;
  background-color: var(--background-color);
`;

export const FirstLetterLeft = styled.div`
  position: absolute;
  left: 0;

  height: 100%;
  width: 50%;

  border-radius: 1.5px;

  background-color: var(--letters-color);
`;

export const SecondLetterContainer = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

export const SecondLetterUp = styled.div`
  position: absolute;
  top: 0;
  right: calc(100% / 3);

  width: calc(100% / 3);
  height: calc(100% / 3);

  border-radius: 50%;
  background-color: var(--dot-color);
`;

export const SecondLetterDown = styled.div`
  position: absolute;
  top: calc(100% / 3);
  right: 0;

  height: calc((100% / 3) * 2);
  width: 100%;

  border-radius: 1.5px;
  background-color: var(--letters-color);
`;

export const SecondLetterDownMiddle = styled.div`
  position: absolute;
  top: 0;
  right: calc(100% / 3);

  width: calc(100% / 3);
  height: 100%;

  background-color: var(--background-color);
`;
