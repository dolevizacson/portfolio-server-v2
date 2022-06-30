import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProjectsList = styled(motion.div).attrs((props) => ({
  ...props.theme.animations.transitionComponentAnimation,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProjectListContainer = styled.div`
  display: grid;
  grid-gap: 5rem;
`;

export const ProjectListHeader = styled.h1`
  padding-bottom: var(--size-header-padding-down);
`;

export const ProjectContainer = styled.article`
  display: grid;

  grid-gap: 1.5rem;

  padding: 2.5rem;

  border-radius: 10px;

  box-shadow: 0rem 0rem 1.1rem 0.3rem var(--color-main-9),
    inset 0rem 0rem 1.5rem 0.2rem var(--color-main-9);
`;

export const ProjectContainerRow = styled.section`
  display: flex;
  flex-wrap: wrap;
  column-gap: 3rem;
  flex: 1;
  z-index: 2;
`;

export const ProjectHeader = styled.h2`
  flex: 0 0 min(30rem, 100%);

  font-size: 2.2rem;
  line-height: 1.8;

  padding-bottom: 1.5rem;
`;

export const ProjectTechnologiesHeader = styled.h3`
  flex: 0 0 min(30rem, 100%);

  font-family: 'Rubik Mono One', sans-serif;
  font-weight: 400;
  font-size: 2.2rem;
  line-height: 1.8;

  padding-bottom: 1.5rem;
`;

export const ProjectSummery = styled.p`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  font-size: 2rem;

  padding-bottom: 1.5rem;

  ${(props) => props.theme.mixins.listSeparator}
`;

export const ProjectSkillsList = styled.div`
  flex: 1 1 auto;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  grid-gap: 0.7rem;
`;

export const ProjectSkill = styled.p`
  font-weight: 600;
  font-size: 2rem;
  padding: 0.5rem 0.9rem;
`;

export const ProjectButton = styled(Link)`
  ${(props) => props.theme.mixins.showMoreButton}
  ${(props) => props.theme.mixins.centerContent}
  

  padding: 0.5rem 0.9rem;
`;
