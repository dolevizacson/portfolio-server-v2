import styled from 'styled-components';

export const NotFoundRoute = styled.div`
  ${(props) => props.theme.mixins.centerContent}
  flex: 1;
  flex-direction: column;
`;

export const NotFoundRouteHeader = styled.h1`
  font-size: 14rem;
`;

export const NotFoundRouteBody = styled.p`
  font-size: 4rem;
  font-weight: 500;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.5;
`;
