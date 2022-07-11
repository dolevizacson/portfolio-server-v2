import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ItemButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
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

export const LinkButton = styled(motion(Link)).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;
