import styled from 'styled-components';
import { motion } from 'framer-motion';

export const App = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.appColorAnimation,
}))`
  background-color: var(--color-main-1);
  color: var(--color-font-1);
`;
