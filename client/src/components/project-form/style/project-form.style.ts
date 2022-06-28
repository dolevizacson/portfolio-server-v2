import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';

export const ProjectForm = styled.div`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const ProjectFormSubHeader = styled.h2`
  margin-bottom: 1.5rem;
`;

export const ProjectFormContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;

  padding-bottom: 2rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const ProjectFormLinksListContainer = styled.div`
  margin-top: 2rem;
  padding-bottom: 2rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const ProjectFormLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 5rem;
  `}
`;

export const ProjectFormTechnologiesContainer = styled.div`
  margin-top: 2rem;
  padding-bottom: 2.5rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const ProjectFormButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}

  align-self: flex-end;
  width: var(--size-button-width-1);
  margin: 1rem 0;
  margin-top: 1.8rem;
`;
