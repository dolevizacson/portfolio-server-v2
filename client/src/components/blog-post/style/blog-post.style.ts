import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const BlogPost = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const BlogPostContainer = styled.div`
  display: grid;
  grid-gap: 4rem;
`;

export const BlogPostDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  padding-bottom: 1rem;
`;

export const BlogPostDate = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const BlogPostHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;

  padding-bottom: 4rem;
`;

export const BlogPostParagraphsList = styled.div``;

export const BlogPostParagraph = styled.section`
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 3rem;
    padding-top: 4rem;
  `}

  display: grid;
  grid-gap: 1.5rem;

  padding-top: 4rem;
  margin-bottom: 4rem;

  ${(props) => props.theme.mixins.listSeparatorTop}
`;

export const BlogPostParagraphHeader = styled.h2`
  letter-spacing: -0.2rem;
  font-size: 2.8rem;
`;

export const BlogPostParagraphBody = styled.p``;

export const ButtonsContainer = styled.div`
  justify-self: center;
`;
