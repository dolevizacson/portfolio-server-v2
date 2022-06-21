import styled from 'styled-components';

interface ImageContainerLoadingProps {
  show: boolean;
}

export const ImageContainerLoading = styled.div<ImageContainerLoadingProps>`
  ${(props) => props.show && 'display:none;'}
  width: 100%;
  height: 100%;
`;

interface ImageContainerProps {
  show: boolean;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  ${(props) => !props.show && 'display:none;'}
  width: 100%;
  height: 100%;
`;

export const ImageContainerImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;
