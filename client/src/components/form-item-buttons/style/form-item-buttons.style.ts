import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FormItemButtons = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;

export const FormItemButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;
