import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const UpdateProject = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const UpdateProjectContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const UpdateProjectHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;

  padding-bottom: 3rem;
`;

export const UpdateProjectAddImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 0.5rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
  padding:2rem 0;
`;

export const UpdateProjectAddImageContainerHeader = styled.h2``;

export const UpdateProjectImagesListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(27rem, 100%), 27rem));
`;

export const UpdateProjectImageFormContainer = styled.div`
  display: grid;
  ${(props) => props.theme.media(ScreenSizes.phone, true)`
    padding: 0 5rem;
  `}
`;

export const UpdateProjectAddImageButton = styled(motion.button).attrs(
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

export const UpdateProjectButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const buttonsContainer = styled.div`
  justify-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 2rem;
`;
