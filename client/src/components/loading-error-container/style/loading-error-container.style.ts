import styled from 'styled-components';
import { motion } from 'framer-motion';

export const LoadingErrorContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const LoadingErrorContainerAnimationContainer = styled(motion.div).attrs(
  (props) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  })
)`
  flex: 1;
  display: flex;
`;
