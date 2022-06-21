import { ImageFit } from '../enums/image-fit.enum';

export type ImageGallerySizing = {
  imageSize: number;
  gapSize?: number;
  imageFit?: ImageFit;
};
