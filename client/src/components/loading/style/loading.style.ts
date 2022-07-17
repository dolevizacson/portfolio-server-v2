import styled from 'styled-components';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  transition: {
    when: 'afterChildren',
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      when: 'beforeChildren',
    },
  },
};

export const Loading = styled(motion.div).attrs((props) => ({
  variants: container,
  initial: 'hidden',
  animate: 'show',
}))`
  ${(props) => props.theme.mixins.centerContent}
  flex:1;
`;

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

export const Letter = styled(motion.span).attrs((props) => ({
  variants: item,
}))`
  font-family: 'Rubik Mono One', sans-serif;
  font-size: 4rem;
`;
