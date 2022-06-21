import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const BlogPostList = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const BlogPostListHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const BlogPostListContainer = styled.div`
  display: grid;

  grid-gap: 3.5rem;
`;

export const BlogPost = styled.section`
  display: grid;
  flex: 1;
  row-gap: 1.5rem;

  &:not(:last-child) {
    padding-bottom: 3.5rem;

    ${(props) => props.theme.mixins.listSeparatorBottom}
  }

  ${(props) => props.theme.media(ScreenSizes.phone, true)`
    padding: 0 3rem;
  `}
`;

export const BlogPostDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  padding-bottom: 1rem;

  ${(props) => props.theme.mixins.listSeparator1}
`;

export const BlogPostDate = styled.div`
  font-size: 1.5rem;
`;

export const BlogPostHeader = styled.h2``;

export const BlogPostSummery = styled.p``;

export const BlogPostButton = styled(Link)`
  ${(props) => props.theme.mixins.showMoreButton}

  justify-self: flex-end;

  padding: 1rem 0.7rem;
`;
