import styled from 'styled-components';
import { ScreenSizes } from '../../../style/MainTheme.style';
import { motion } from 'framer-motion';

export const NewProject = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const NewProjectContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const NewProjectHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const NewProjectAddImageContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
  padding:2rem 0;
`;

export const NewProjectAddImageContainerHeader = styled.h2``;

export const NewProjectImageFormContainer = styled.div`
  display: grid;
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 5rem;
  `}
`;

export const NewProjectButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const NewProjectAddImageButton = styled(motion.button).attrs(
  (props) => ({
    ...props.theme.animations.button2TapAnimation,
  })
)`
  ${(props) => props.theme.mixins.button}
  justify-self: flex-end;

  width: var(--size-button-width-1);
  margin: 1rem 0;
  margin-top: 1.8rem;
`;

export const buttonsContainer = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;
