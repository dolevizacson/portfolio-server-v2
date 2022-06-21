import styled from 'styled-components';
import { motion } from 'framer-motion';

export const UpdateTask = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const UpdateTaskContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const UpdateTaskHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;

  padding-bottom: 3rem;
`;

export const UpdateTaskButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: 25rem;
`;

export const buttonsContainer = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;
