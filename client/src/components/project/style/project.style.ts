import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DotFill } from '@styled-icons/octicons';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const Project = styled(motion.article).attrs((props) => ({
  ...props.theme.animations.afterChangeColorComponentAnimation,
}))`
  flex: 1;
`;

export const ProjectContainer = styled.div`
  display: grid;
  grid-gap: 3.5rem;
`;

export const ProjectHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  column-gap: 2rem;

  padding-bottom: 2.5rem;
`;

export const ProjectSecondaryHeader = styled.h2`
  letter-spacing: -0.2rem;
  font-size: 2.8rem;
`;

export const ProjectCenterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  row-gap: 3.5rem;
`;

export const ProjectCenterSubContainer = styled.div`
  flex: 1 1 25rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const ProjectDescription = styled.p`
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 3rem;
  `}
`;

export const ProjectLinksListContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ProjectLink = styled.a`
  ${(props) => props.theme.mixins.link}

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const ProjectSkillsContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 2rem auto;
`;

export const ProjectSkillLink = styled(Link)`
  ${(props) => props.theme.mixins.link}

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const ProjectSkill = styled.div`
  ${(props) => props.theme.mixins.link}

  text-decoration:none;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const ListItemIcon = styled(DotFill)`
  color: var(--color-main-2);
  height: 2rem;
  width: 2rem;
  margin: 0.7rem 0.8rem;
  margin-left: 0.5rem;
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  margin-top: 1.5rem;
  justify-self: center;
`;
