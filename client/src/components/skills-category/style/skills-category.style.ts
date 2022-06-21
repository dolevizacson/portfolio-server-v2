import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DotFill } from '@styled-icons/octicons';
import { motion } from 'framer-motion';

export const SkillsCategories = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  flex: 1;
`;

export const SkillsCategoriesContainer = styled.div``;

export const SkillsCategoryContainer = styled.section`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;

    ${(props) => props.theme.mixins.listSeparatorBottom}
  }
`;

export const SkillsCategoryHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  padding-bottom: 3rem;
`;

export const SkillsCategoryHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;
`;

export const SkillHeader = styled.h2`
  font-size: 2.8rem;

  padding-bottom: 1.5rem;
`;

export const SkillAttributesList = styled.div`
  padding-bottom: 1.5rem;
`;

export const SkillAttribute = styled.p``;

export const SkillProjectsHeader = styled.h3`
  font-family: 'Rubik Mono One', sans-serif;
  font-weight: 400;
  font-size: 2.2rem;

  padding-bottom: 1.5rem;
`;

export const skillProjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  padding-bottom: 1.5rem;
`;

export const SkillProject = styled(Link)`
  ${(props) => props.theme.mixins.link}

  align-self: center;
`;

export const ButtonsContainer = styled.div`
  align-self: center;
`;

export const ListItemIcon = styled(DotFill)`
  color: var(--color-main-2);
  height: 2rem;
  width: 2rem;
  margin: 0.7rem 0.8rem;
  margin-left: 0.5rem;
`;

export const ListItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content, 1fr;
  justify-content: start;
`;
