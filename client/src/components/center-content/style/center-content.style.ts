import styled from 'styled-components';

interface CenterContentProps {
  size: number;
}

export const CenterContent = styled.div<CenterContentProps>`
  flex: 1;
  display: grid;
  grid-template-columns:
    1fr [start] minmax(min-content, ${(props) => props.size}rem)
    [end] 1fr;
`;

export const CenterContentContainer = styled.div`
  grid-column: start/end;

  display: flex;
  justify-content: center;
`;
