import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DeleteButton = styled.div`
  width: min-content;
  height: min-content;
`;

export const ModalButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const DeleteModalContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex-direction: column;
  row-gap: 1.5rem;

  margin: 3rem;
  padding: 3rem;
  border-radius: 10px;

  background-color: var(--color-main-12);
  box-shadow: 0 0 7px 0px var(--color-main-2);
  backdrop-filter: blur(10px);
`;

export const DeleteModalButtonContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex-wrap: wrap;
`;

export const DeleteModalText = styled.div`
  color: var(--color-main-2);
  font-size: 2.4rem;
`;
