import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';

export const FormInput = styled.div`
  flex: 1;
`;

export const FormInputLabel = styled.label`
  display: grid;
`;

export const FormInputTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-bottom: 0.5rem;
`;

export const FormInputText = styled.p`
  margin-right: 1.5rem;
  line-height: normal;
  text-transform: capitalize;
`;

export const FormInputError = styled.span`
  align-self: flex;
  display: flex;
  align-items: center;

  font-size: 1.3rem;

  margin-left: auto;
  margin-right: 0.3rem;
`;

export const FormInputInputField = styled.input``;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
