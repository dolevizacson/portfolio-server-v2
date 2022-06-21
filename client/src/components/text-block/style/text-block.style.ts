import styled from 'styled-components';

export const TextBlock = styled.div`
  flex: 1;
  ${(props) => props.theme.mixins.centerContent}

  margin: 8rem 0;

  text-transform: capitalize;
  font-size: 2.6rem;
`;
