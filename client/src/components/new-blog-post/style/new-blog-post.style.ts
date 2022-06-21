import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const NewBlogPost = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const NewBlogPostHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const NewBlogPostContainer = styled.form`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const NewBlogPostFormContainer = styled.div``;

export const NewBlogPostAddImageContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  padding: 2rem 0;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const NewBlogPostAddImageHeader = styled.h2``;

export const NewBlogPostAddImageFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
  ${(props) => props.theme.media(ScreenSizes.phone, true)`
    padding: 0 5rem;
  `}
`;

export const NewBlogPostButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
`;

export const NewBlogPostAddImageButton = styled(motion.button).attrs(
  (props) => ({
    ...props.theme.animations.button2TapAnimation,
  })
)`
  ${(props) => props.theme.mixins.button}
  width: var(--size-button-width-1);
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
