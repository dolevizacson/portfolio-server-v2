import styled from 'styled-components';
import { Asterisk } from '@styled-icons/bootstrap';

export const FormSelect = styled.div`
  flex: 1;
`;

export const FormSelectLabel = styled.div`
  display: grid;
`;

export const FormSelectTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  margin-bottom: 0.5rem;
`;

export const FormSelectText = styled.p`
  margin-right: 1.5rem;
`;

export const FormSelectError = styled.span`
  align-self: flex;
  display: flex;
  align-items: center;

  font-size: 1.3rem;

  margin-left: auto;
  margin-right: 0.3rem;
`;

export const FormSelectSelectInput = styled.select`
  justify-self: center;

  appearance: none;

  font-size: 1.9rem;
  font-weight: 500;

  width: min(100%, 50rem);
`;

export const FormSelectSelectOption = styled.option`
  font-size: 1.9rem;
  font-weight: 500;
`;

export const ErrorIcon = styled(Asterisk)`
  color: var(--color-main-2);

  height: 1rem;
  width: 1rem;

  margin-right: 0.5rem;
`;
