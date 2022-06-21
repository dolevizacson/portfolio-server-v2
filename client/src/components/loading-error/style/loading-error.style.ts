import styled from 'styled-components';

export const LoadingError = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex:1;
  flex-wrap: wrap;
  gap: 3rem;
  flex-direction: column;
`;

export const LoadingErrorText = styled.p`
  font-size: 2.2rem;
  text-align: center;
`;

export const LoadingErrorFixButton = styled.button`
  ${(props) => props.theme.mixins.button}
  font-size: 2.2rem;

  padding: 1rem 2.5rem;
`;
