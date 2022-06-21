import styled from 'styled-components';
import { motion } from 'framer-motion';

export const NewResumeForm = styled.article`
  display: flex;
  flex-direction: column;
`;

export const NewResumeFormHeader = styled.h2`
  font-size: 2.2rem;
  letter-spacing: 0;
  padding-bottom: 1.5rem;
`;

export const NewResumeFormContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const NewResumeFormFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const NewResumeFormButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width:var(--size-button-width-1);
`;

export const ButtonContainer = styled.div`
  justify-self: center;

  ${(props) => props.theme.mixins.centerContent}
  flex-wrap:wrap;

  margin-top: 2rem;
`;
