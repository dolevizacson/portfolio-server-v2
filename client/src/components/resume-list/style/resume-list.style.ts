import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FileDownload } from '@styled-icons/fa-solid';

export const ResumeList = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const ResumeListHeader = styled.h2`
  font-size: 2.8rem;

  padding-bottom: 3rem;
`;

export const ResumeListAndFormContainer = styled.div`
  flex: 1;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 8rem;
`;

export const ResumeListContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 1.5rem;
`;

export const ResumeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Resume = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

export const ResumeFileName = styled.span`
  min-width: max-content;
`;

export const ResumeDownLoad = styled.a`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

export const ResumeDownLoadIcon = styled(FileDownload)`
  color: var(--color-main-2);
  height: 2rem;
  width: 2rem;

  margin-right: 0.8rem;
`;

export const ResumeButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width:12rem;
  padding: 0.8rem 1.5rem;
`;

const variants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const ButtonText = styled(motion.span).attrs((props) => ({
  variants,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
}))``;
