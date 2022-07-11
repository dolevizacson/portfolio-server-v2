import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ImageContainerLoadingProps {
  show: boolean;
}

export const ImageContainerLoading = styled.div<ImageContainerLoadingProps>`
  ${(props) => props.show && 'display:none;'}
  width: 100%;
  height: 100%;
`;

interface ImageContainerProps {
  show: boolean;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  ${(props) => props.theme.mixins.centerContent}
  ${(props) => !props.show && 'display:none;'}
  width:100%;
  height: 100%;

  position: relative;

  overflow: hidden;
`;

export const ImageContainerImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
  cursor: pointer;
`;

const variants = {
  open: {
    y: 0,
  },
  close: { y: '100%' },
};

export const ImageContainerDescription = styled(motion.div).attrs((props) => ({
  variants,
  initial: 'open',
  transition: { type: 'spring', bounce: 0 },
}))`
  ${(props) => props.theme.mixins.centerContent}
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: min-content;
  padding: 1.1rem 0;
  margin: 0 auto;

  border-radius: 10px;

  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: 1px;
  word-spacing: 5px;
  -webkit-text-stroke: 0.3rem var(--color-main-2);
  color: var(--color-main-1);
  backdrop-filter: blur(5px);
`;
