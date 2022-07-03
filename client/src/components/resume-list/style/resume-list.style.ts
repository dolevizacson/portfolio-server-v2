import styled from 'styled-components';
import { motion } from 'framer-motion';

import { FileDownload } from '@styled-icons/fa-solid';

export const ResumeList = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  gap: 3rem;
`;

export const ResumeListHeader = styled.h2`
  font-size: 2.8rem;

  padding-bottom: 3rem;
`;

export const ResumeListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ResumeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
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

export const DeleteModalContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex-direction: column;
  row-gap: 1.5rem;

  margin: 3rem;
  padding: 3rem;
  border-radius: 10px;

  background-color: var(--color-main-12);
  box-shadow: 0 0 7px 0px var(--color-main-2);
  backdrop-filter: blur(10px);
`;

export const DeleteModalButtonContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex-wrap: wrap;
`;

export const DeleteModalText = styled.div`
  color: var(--color-main-2);
  font-size: 2.4rem;
`;

export const ModalButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;
