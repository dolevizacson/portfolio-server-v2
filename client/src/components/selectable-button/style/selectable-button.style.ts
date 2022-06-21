import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SelectableButton = styled.div`
  width: max-content;
  background-color: var(--color-main-7);
`;

const variants = {
  hover: {
    y: '-0.6rem',
    x: '-0.4rem',
    color: 'var(--color-main-1)',
    backgroundColor: 'var(--color-main-2)',
  },
  hoverPress: {
    y: 0,
    x: 0,
    color: 'var(--color-main-1)',
    backgroundColor: 'var(--color-main-2)',
  },
  start: { y: '-0.4rem', x: '-0.4rem' },
  press: {
    y: 0,
    x: 0,
  },
};

export const SelectableButtonText = styled(motion.div).attrs((props) => ({
  variants,
  initial: false,
}))`
  text-align: center;

  width: 100%;
  height: 100%;

  color: var(--color-font-1);
  text-decoration: none;
  text-transform: capitalize;
  font-family: 'Noto Sans Display', sans-serif;
  font-size: 1.7rem;
  font-weight: 500;

  border: solid 0.5rem var(--color-main-2);
  border-radius: var(--size-input-radius-1);
  background-color: var(--color-main-1);

  padding: 1rem;
`;
