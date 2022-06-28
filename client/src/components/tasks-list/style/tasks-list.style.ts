import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const TasksList = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  flex: 1;
`;

export const TasksListHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const TasksListContainer = styled.div`
  display: grid;

  grid-gap: 3rem;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 2rem;
  `}
`;

export const Task = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  &:not(:last-child) {
    padding-bottom: 3rem;
    margin-bottom: 2.5rem;

    ${(props) => props.theme.mixins.listSeparatorBottom}
  }
`;

export const TaskHeader = styled.h2``;

export const TaskDescription = styled.p``;

export const TaskDoneIconFrame = styled.div`
  align-self: flex-end;

  cursor: pointer;

  margin: 1rem;

  ${(props) => props.theme.mixins.centerContent}

  height: 6rem;
  width: 6rem;

  background-color: var(--color-main-1);

  position: relative;

  transform-style: preserve-3d;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: var(--color-main-2);
    transform: skew(5deg, 5deg) scale(1.05) translateZ(-10px);
  }
`;

export const TaskDoneIcon = styled.div`
  height: 125%;
  width: 125%;

  position: absolute;
  bottom: 6px;
  left: 0;

  background-color: var(--color-main-2);
  clip-path: polygon(42% 79%, 90% 10%, 86% 28%, 44% 98%, 12% 64%, 8% 47%);
`;

export const ButtonsContainer = styled.div`
  align-self: center;
`;
