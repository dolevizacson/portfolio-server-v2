import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';
import { motion } from 'framer-motion';

export const LoginForm = styled.article`
  display: grid;
  flex: 1;
`;

export const LoginFormHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const LoginFormContainer = styled.form`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const LoginFormFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const LoginFormButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-2);

  align-self: flex-end;

  margin: 1rem 0;
  margin-left: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 1rem;

  margin-top: 1rem;
`;

export const LoginFormError = styled.p`
  width: max-content;

  text-transform: capitalize;
  font-size: 1.6rem;

  padding-right: 2rem;
`;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
