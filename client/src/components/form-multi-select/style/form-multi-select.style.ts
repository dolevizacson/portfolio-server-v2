import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';

import SelectableButton from '../../selectable-button/SelectableButton.component';

export const FormMultiSelect = styled.div`
  flex: 1;
`;

export const FormMultiSelectLabel = styled.div`
  display: grid;
`;

export const FormMultiSelectTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-bottom: 0.5rem;
`;

export const FormMultiSelectText = styled.h2`
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  line-height: normal;
  text-transform: capitalize;
`;

export const FormMultiSelectError = styled.span`
  align-self: flex;
  display: flex;
  align-items: center;

  font-size: 1.3rem;

  margin-left: auto;
  margin-right: 0.3rem;
`;

export const FormMultiSelectSelectInput = styled.select`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;

export const FormMultiSelectSelectOption = styled.option`
  font-size: 2.2rem;
  font-weight: 500;
`;

export const FormMultiSelectOptionsContainer = styled.div`
  ${(props) => props.theme.mixins.centerContent};
  flex-wrap: wrap;
  gap: 2rem;
`;

export const FormMultiSelectOption = styled(SelectableButton)`
  width: var(--size-button-width-1);
  text-align: center;
`;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
