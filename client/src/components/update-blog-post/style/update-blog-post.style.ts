import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const UpdateBlogPost = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const UpdateBlogPostHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;

  padding-bottom: 3rem;
`;

export const UpdateBlogPostContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const UpdateBlogPostFormContainer = styled.div``;

export const UpdateBlogPostAddImageContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  padding: 2rem 0;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const UpdateBlogPostAddImageHeader = styled.h2``;

export const UpdateBlogPostAddImageFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 5rem;
  `}
`;

export const UpdateBlogPostButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const UpdateBlogPostAddImageButton = styled(motion.button).attrs(
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
