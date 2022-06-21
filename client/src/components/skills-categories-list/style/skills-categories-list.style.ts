import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SkillsCategoriesList = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SkillsCategoriesListHeader = styled.h1`
  padding-bottom: 3rem;
`;

export const SkillsCategoriesListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(37rem, 100%), 1fr));
  grid-gap: 5rem;
`;

export const SkillCategory = styled.article`
  display: grid;
  grid-template-rows: max-content 1fr max-content;

  position: relative;

  padding: 1rem;

  background-color: var(--color-main-1);

  transform-style: preserve-3d;

  &:after {
    content: '';
    position: absolute;
    height: calc(100% + 4px);
    width: calc(100% + 4px);
    top: -2px;
    left: -2px;
    z-index: -1;
    background-color: var(--color-main-2);
    transform: skew(2deg, 2deg) translateZ(-10px);
  }
`;

export const SkillCategoryHeader = styled.h2`
  padding: 0.3rem 0;
`;

export const SkillsNamesList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkillNames = styled.h3`
  font-weight: 700;

  padding: 0.1rem 0;
`;

export const SkillCategoryButton = styled(Link)`
  ${(props) => props.theme.mixins.showMoreButton}

  justify-self: flex-end;
  align-self: flex-end;
`;
