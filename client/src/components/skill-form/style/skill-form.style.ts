import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ScreenSizes } from '../../../style/MainTheme.style';
import { FormSelectText } from '../../form-select/style/form-select.style';

export const SkillForm = styled.div`
  flex: 1;

  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 0.5rem;
`;

export const SkillFormContainer = styled.div`
  padding-bottom: 2rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const SkillAttributesListContainer = styled.div`
  margin-top: 2rem;
  padding-bottom: 2.5rem;

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const SkillAttributesListContainerHeader = styled.h2``;

export const SkillAttributeContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.media(ScreenSizes.bigPhone, true)`
    padding: 0 5rem;
  `}
`;

export const SkillSkillsCategoryListContainer = styled.div`
  margin-top: 2rem;
  padding-bottom: 2.5rem;

  & ${FormSelectText} {
    font-family: 'Rubik Mono One', sans-serif;
    font-weight: 400;
    font-size: 2.4rem;
    margin-right: 1.5rem;
    line-height: normal;
    text-transform: capitalize;
    padding-bottom: 1rem;
  }

  ${(props) => props.theme.mixins.listSeparatorBottom}
`;

export const SkillFormButton = styled(motion.button).attrs((props) => ({
  ...props.theme.animations.button2TapAnimation,
}))`
  ${(props) => props.theme.mixins.button}

  align-self: flex-end;
  width: var(--size-button-width-1);
  margin: 1rem 0;
  margin-top: 1.8rem;
`;
