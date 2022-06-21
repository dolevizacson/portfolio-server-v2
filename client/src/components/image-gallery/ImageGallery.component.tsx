import * as React from 'react';
import { ArrowIosForward, ArrowIosBack } from '@styled-icons/evaicons-solid';

import { Image } from '../../common/interfaces/image.interface';
import { ImageGallerySizing } from '../../common/types/image-gallery-sizing.type';
import { useComponentSize } from '../../hooks/useComponentSize.hook';
import ImageContainer from '../image-container/ImageContainer.component';
import { ImageFit } from '../../common/enums/image-fit.enum';
import { AnimatePresence } from 'framer-motion';

import * as style from './style/image-gallery.style';

type ImageGalleryProps<T, R> = {
  images: Image[];
  imageGallerySizing: ImageGallerySizing;
  largeView?: boolean;
  deleteButtonObject?: {
    deleteFunction: (arg: T) => R;
    deleteData: T[];
  };
};

const ImageGallery = <T, R>({
  images,
  imageGallerySizing,
  deleteButtonObject,
  largeView,
}: ImageGalleryProps<T, R>): JSX.Element => {
  const [smallGalleryIndex, setSmallGalleryIndex] = React.useState(0);
  const [bigGalleryIndex, setBigGalleryIndex] = React.useState(0);
  const [showBigGallery, setShowBigGallery] = React.useState(false);
  const containerRef = React.useRef<HTMLElement>(null!);
  const { width } = useComponentSize(containerRef);

  const [bigGalleryDirection, setBigGalleryDirection] = React.useState(1);

  const gap = React.useMemo(
    () => imageGallerySizing.gapSize || 0,
    [imageGallerySizing]
  );

  const imagesToShow = React.useMemo(() => {
    const maxImages = Math.floor(width / (imageGallerySizing.imageSize + gap));
    return Math.max(Math.min(maxImages, images.length), 1);
  }, [width, imageGallerySizing, gap, images]);

  const showButtons = React.useMemo(() => {
    return imagesToShow < images.length;
  }, [imagesToShow, images]);

  React.useEffect(() => {
    if (!showButtons) {
      setSmallGalleryIndex(0);
    }
  }, [showButtons]);

  const renderedSmallGalleryImages = React.useMemo(() => {
    return images.map((image, imageIndex) => {
      return (
        <style.ImageGalleryImageContainer
          key={image.id}
          $showImage={
            (imageIndex + smallGalleryIndex) % images.length < imagesToShow
          }
          $index={(imageIndex + smallGalleryIndex) % images.length}
          onClick={() => {
            setBigGalleryIndex(imageIndex);
            setShowBigGallery(true);
          }}
        >
          <ImageContainer
            src={image.url}
            alt={image.description}
            sizes={`${imageGallerySizing.imageSize}px`}
            imageFit={ImageFit.Fill}
          />
          {deleteButtonObject && (
            <style.ImageGalleryImageContainerDeleteButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (deleteButtonObject) {
                  deleteButtonObject.deleteFunction(
                    deleteButtonObject.deleteData[imageIndex]
                  );
                }
              }}
            />
          )}
        </style.ImageGalleryImageContainer>
      );
    });
  }, [
    images,
    imageGallerySizing,
    imagesToShow,
    smallGalleryIndex,
    deleteButtonObject,
  ]);

  const renderedGigGalleryImages = React.useMemo(() => {
    return images
      .filter((image, imageIndex) => imageIndex === bigGalleryIndex)
      .map((image, imageIndex) => {
        return (
          <style.ImageGalleryBigGalleryImageContainer
            key={image.id}
            custom={bigGalleryDirection}
          >
            <ImageContainer
              src={image.url}
              alt={image.description}
              sizes={'100vw'}
              imageFit={ImageFit.Scale}
            />
          </style.ImageGalleryBigGalleryImageContainer>
        );
      });
  }, [images, bigGalleryIndex, bigGalleryDirection]);

  return (
    <AnimatePresence>
      <style.ImageGallery
        key="gallery"
        imageSize={imageGallerySizing.imageSize}
        gapSize={gap}
        ref={containerRef}
      >
        <style.ImageGalleryButton
          type="button"
          showButtons={showButtons}
          onClick={() =>
            setSmallGalleryIndex((smallGalleryIndex + 1) % images.length)
          }
        >
          <ArrowIosBack />
        </style.ImageGalleryButton>
        <style.ImageGalleryContainer isWithLargeView={largeView}>
          {renderedSmallGalleryImages}
        </style.ImageGalleryContainer>
        <style.ImageGalleryButton
          type="button"
          showButtons={showButtons}
          onClick={() =>
            setSmallGalleryIndex(
              (smallGalleryIndex - 1 + images.length) % images.length
            )
          }
        >
          <ArrowIosForward />
        </style.ImageGalleryButton>
      </style.ImageGallery>

      {largeView && showBigGallery && (
        <style.ImageGalleryBigGallery>
          <style.ImageGalleryBigGalleryCloseButton
            onClick={() => setShowBigGallery(false)}
          />
          <style.ImageGalleryBigGalleryContainer>
            {images.length > 1 && (
              <style.ImageGalleryButton
                type="button"
                showButtons={true}
                onClick={() => {
                  setBigGalleryIndex(
                    (bigGalleryIndex - 1 + images.length) % images.length
                  );
                  setBigGalleryDirection(-1);
                }}
              >
                <ArrowIosBack />
              </style.ImageGalleryButton>
            )}
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              custom={bigGalleryDirection}
            >
              {renderedGigGalleryImages}
            </AnimatePresence>
            {images.length > 1 && (
              <style.ImageGalleryButton
                type="button"
                showButtons={true}
                onClick={() => {
                  setBigGalleryIndex((bigGalleryIndex + 1) % images.length);
                  setBigGalleryDirection(1);
                }}
              >
                <ArrowIosForward />
              </style.ImageGalleryButton>
            )}
          </style.ImageGalleryBigGalleryContainer>
        </style.ImageGalleryBigGallery>
      )}
    </AnimatePresence>
  );
};

export default ImageGallery;
