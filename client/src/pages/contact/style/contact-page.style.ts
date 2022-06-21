import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContactPage = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;

  gap: 4rem;
`;
