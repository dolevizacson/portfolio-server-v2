import styled from 'styled-components';

export const AppModal = styled.article`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
`;

export const AppModalBackGroundStyle = styled.div`
  ${(props) => props.theme.mixins.centerContent}

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);

  height: 100%;
  width: 100%;
`;

export const AppModalContainerStyle = styled.div`
  ${(props) => props.theme.mixins.centerContent}

  height: 100%;
  width: 100%;
`;
