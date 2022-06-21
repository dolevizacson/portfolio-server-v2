import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';
import { motion } from 'framer-motion';

export const FormFileInput = styled.div`
  flex: 1;
`;

export const FormFileInputTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-bottom: 0.5rem;
`;

export const FormFileInputText = styled.p`
  margin-right: 1.5rem;
  line-height: normal;
  text-transform: capitalize;
`;

export const FormFileInputError = styled.span`
  align-self: flex;
  display: flex;
  align-items: center;

  font-size: 1.3rem;

  margin-left: auto;
  margin-right: 0.3rem;
`;

export const FormFileInputButton = styled(motion.label).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  padding: 0.7rem 3rem;
  margin: 0 0.2rem;
`;

export const FormFileInputButtonContainer = styled.div`
  display: flex;
`;

export const FormFileInputButtonInputField = styled.input`
  flex: 1;
  margin-right: 0.7rem;
  max-width: 1fr;
`;

export const FormFileInputInputField = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
