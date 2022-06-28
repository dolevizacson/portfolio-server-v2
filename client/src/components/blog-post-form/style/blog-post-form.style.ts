import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const BlogPostForm = styled.div`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const BlogPostFormFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  padding-bottom: 2rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const BlogPostFormParagraphsListContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  margin-top: 2rem;
  padding-bottom: 2.5rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const BlogPostFormParagraphListContainerHeader = styled.h2`
  display: flex;
  flex-wrap: wrap;
`;

export const BlogPostFormParagraphListContainerError = styled.span`
  align-self: flex;
  display: flex;
  align-items: center;

  font-family: 'Saira', sans-serif;
  font-size: 1.3rem;

  margin-left: auto;
  margin-right: 0.3rem;
`;

export const BlogPostFormParagraphContainerAndSeparatorContainer = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    ${(props) => props.theme.mixins.listSeparator}
  }
`;

export const BlogPostFormParagraphContainer = styled.div`
  display: flex;
  grid-gap: 0.5rem;
  flex-direction: column;

  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 5rem;
  `}
`;

export const BlogPostFormConclusionContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  margin-top: 2rem;
  padding-bottom: 4rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const BlogPostFormImageGalleryContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const BlogPostFormRemoveParagraphErrorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 1.5rem;
`;

export const BlogPostFormRemoveParagraphError = styled.div`
  font-size: 1.3rem;
  padding-right: 2rem;
`;

export const BlogPostFormRemoveParagraphButton = styled(motion.button).attrs(
  (props) => ({
    ...props.theme.animations.button2TapAnimation,
  })
)`
  ${(props) => props.theme.mixins.button}

  width: var(--size-button-width-1);
  margin: 1.2rem 0;
  margin-left: auto;
`;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
