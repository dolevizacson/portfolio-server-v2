import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppModal = styled.article`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const AppModalBackGroundStyle = styled(motion.div).attrs((props) => ({
  variants: container,
  initial: 'hidden',
  animate: 'show',
}))`
  ${(props) => props.theme.mixins.centerContent}

  backdrop-filter: blur(4px);

  height: 100%;
  width: 100%;
`;

const child = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const AppModalContainerStyle = styled(motion.div).attrs((props) => ({
  variants: child,
  initial: 'hidden',
  animate: 'show',
}))`
  ${(props) => props.theme.mixins.centerContent}

  height: max-content;
  width: max-content;
`;
