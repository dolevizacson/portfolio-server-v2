import styled from 'styled-components';
import { StyledIconBase } from '@styled-icons/styled-icon';
import { CloseCircle } from '@styled-icons/remix-fill';
import { Delete } from '@styled-icons/typicons';
import { motion } from 'framer-motion';
import { ScreenSizes } from '../../../style/MainTheme.style';

interface ImageGalleryButtonProps {
  showButtons: boolean;
}

export const ImageGalleryButton = styled.button<ImageGalleryButtonProps>`
  ${(props) => props.theme.mixins.centerContent}
  ${(props) => !props.showButtons && `display:none;`}


  ${StyledIconBase} {
    height: min(100%, 6rem);
    width: min(100%, 6rem);
    color: var(--color-main-2);
  }

  height: 100%;
  width: 100%;

  border: none;
  background-color: transparent;

  cursor: pointer;
`;
interface ImageGalleryProps {
  imageSize: number;
  gapSize: number;
}

export const ImageGallery = styled.article<ImageGalleryProps>`
  --image-size: ${(props) => `${props.imageSize}px;`}
  --gap-size: ${(props) => `${props.gapSize}px;`}
  
  flex: 1;
  margin: var(--gap-size);

  display:flex ;
  align-items:center;
  justify-content:space-between ;
  & ${ImageGalleryButton} {
    width: 9%;
  }

  ${(props) => props.theme.media(ScreenSizes.phone, false)`
    margin: var(--gap-size) 0;
  `}
`;

interface ImageGalleryContainerProps {
  isWithLargeView?: boolean;
}

export const ImageGalleryContainer = styled.div<ImageGalleryContainerProps>`
  grid-column: 2/3;
  ${(props) => props.theme.mixins.centerContent}
  gap: var(--gap-size);
  max-height: var(--image-size);
  overflow: hidden;

  ${(props) =>
    props.isWithLargeView &&
    `& img {
      filter: grayscale(100%) brightness(130%);

      cursor: pointer;

      &:hover {
        filter:none;
        transition: filter 0.5s
      }
  }`}
`;

interface ImageGalleryImageContainerProps {
  $showImage: boolean;
  $index: number;
}

export const ImageGalleryImageContainer = styled(motion.div).attrs((props) => ({
  layout: true,
}))<ImageGalleryImageContainerProps>`
  ${(props) => !props.$showImage && 'display:none;'}
  width: min(100%, var(--image-size));
  aspect-ratio: 1/1;
  order: ${(props) => props.$index};
  position: relative;
`;

export const ImageGalleryImageContainerDeleteButton = styled(Delete)`
  height: 17%;
  aspect-ratio: 1/1;

  color: var(--color-main-2);

  cursor: pointer;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  background-color: var(--color-main-1);
  border-radius: 250px;
  border: none;

  margin: 0.5rem;
`;

export const ImageGalleryBigGallery = styled(motion.div).attrs((props) => ({
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: {
    scale: 0,
  },
  key: 'bigGallery',
}))`
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 100;

  background-color: var(--color-main-10);
  backdrop-filter: blur(10px);
`;

export const ImageGalleryBigGalleryWithCloseButtonContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 74% 1fr;
  grid-template-rows: min-content;
  align-content: center;
  align-items: center;
  justify-items: center;
`;

export const ImageGalleryBigGalleryContainer = styled.div`
  grid-column: 2/3;
`;

const bigGalleryVariants = {
  before: (direction: number) => ({
    x: `calc(100% * ${direction})`,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      opacity: {
        delay: 0.2,
      },
    },
  },
  after: (direction: number) => ({
    x: `calc(-100% * ${direction})`,
    opacity: 0,
  }),
};

export const ImageGalleryBigGalleryImageContainer = styled(motion.div).attrs(
  (props) => ({
    variants: bigGalleryVariants,
    initial: 'before',
    animate: 'center',
    exit: 'after',
    transition: {
      x: {
        type: 'spring',
        stiffness: 500,
        damping: 50,
        duration: 0.3,
        velocity: 3,
      },
      opacity: { duration: 0.3 },
    },
  })
)`
  width: 100%;
`;

export const ImageGalleryBigGalleryCloseButton = styled(CloseCircle)`
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 100;
  height: 6rem;
  width: 6rem;
  padding: 1rem;

  cursor: pointer;
`;
