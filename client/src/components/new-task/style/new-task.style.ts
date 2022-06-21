import styled from 'styled-components';
import { motion } from 'framer-motion';

export const NewTask = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const NewTaskContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const NewTaskHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const NewTaskButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const buttonsContainer = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;
