import styled from 'styled-components';

import { motion } from 'framer-motion';

export const ImageContainerLoading = styled(motion.div).attrs((props) => ({
  animate: {
    boxShadow: [
      'inset 0 0 0 0 var(--color-main-2)',
      'inset 0 0 5em 3rem var(--color-main-2)',
    ],
  },
  transition: {
    repeat: Infinity,
    duration: 2,
    repeatType: 'reverse',
    times: [0, 1],
  },
}))`
  height: 100%;
  width: 100%;
`;
