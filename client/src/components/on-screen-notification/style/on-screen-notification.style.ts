import styled from 'styled-components';
import { motion } from 'framer-motion';

export const OnScreenNotification = styled.article`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
`;

const variants = {
  show: { x: 0 },
  hide: { x: '150%' },
};

export const OnScreenNotificationMessage = styled(motion.section).attrs(
  (props) => ({
    variants,
    initial: false,
    animate: 'show',
    exit: 'hide',
  })
)`
  background-color: var(--color-main-11);
  border: solid 1px var(--color-main-2);
  backdrop-filter: blur(7px);
  border-radius: 15px;

  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: -1px 0 var(--color-main-1), 0 1px var(--color-main-1),
    1px 0 var(--color-main-1), 0 -1px var(--color-main-1);

  margin: 2.1rem;
  padding: 0.7rem 1.1rem;
`;
