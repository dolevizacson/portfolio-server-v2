import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContactForm = styled.article`
  display: grid;
  flex: 1;
`;

export const ContactFormHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const ContactFormContainer = styled.form`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const ContactFormFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const ContactFormButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width:var(--size-button-width-2);
`;

export const ButtonContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent};
  justify-self: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;
