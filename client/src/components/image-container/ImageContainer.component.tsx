import * as React from 'react';

import {
  CropOptions,
  addWidthToImageUrl,
} from '../../common/functions/helpers.function';
import ImageContainerLoading from '../image-container-loading/ImageContainerLoading.component';

import * as style from './style/image-container.style';

type ImageContainerProps = {
  src: string;
  alt: string;
  srcset?: string;
  sizes?: string;
  imageFit?: CropOptions;
  showDescription?: boolean;
};

const ImageContainer = ({
  src,
  alt,
  srcset,
  sizes,
  imageFit = 'scale',
  showDescription,
}: ImageContainerProps): JSX.Element => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [localShowDescription, setLocalShowDescription] = React.useState(true);

  const defaultSrcset = React.useMemo(() => {
    return `${addWidthToImageUrl(src, {
      width: 200,
      height: imageFit === 'fill' ? 200 : undefined,
      crop: imageFit,
    })} ${200}w, ${addWidthToImageUrl(src, {
      width: 400,
      height: imageFit === 'fill' ? 400 : undefined,
      crop: imageFit,
    })} ${400}w, ${addWidthToImageUrl(src, {
      width: 800,
      height: imageFit === 'fill' ? 800 : undefined,
      crop: imageFit,
    })} ${800}w, ${addWidthToImageUrl(src, {
      width: 1200,
      height: imageFit === 'fill' ? 1200 : undefined,
      crop: imageFit,
    })} ${1200}w, ${addWidthToImageUrl(src, {
      width: 1600,
      height: imageFit === 'fill' ? 1600 : undefined,
      crop: imageFit,
    })} ${1600}w`;
  }, [imageFit, src]);

  return (
    <>
      <style.ImageContainerLoading show={isLoaded}>
        <ImageContainerLoading />
      </style.ImageContainerLoading>
      <style.ImageContainer show={isLoaded}>
        <style.ImageContainerImage
          src={src}
          alt={alt}
          sizes={sizes}
          srcSet={srcset ?? defaultSrcset}
          onLoad={() => setIsLoaded(true)}
          title={alt}
          onClick={() => setLocalShowDescription(!localShowDescription)}
        />
        {showDescription && (
          <style.ImageContainerDescription
            animate={localShowDescription ? 'open' : 'close'}
          >
            {alt}
          </style.ImageContainerDescription>
        )}
      </style.ImageContainer>
    </>
  );
};

export default ImageContainer;
