import { StringArray } from '../interfaces/string-array.interface';

export type CropOptions = 'fill' | 'scale';

type CloudinarySizingObject = {
  width: number;
  height?: number;
  crop?: CropOptions;
};

export const stringArrayToStringObject = (
  stringArray: string[]
): StringArray[] => {
  return stringArray.map((string) => {
    return { name: string };
  });
};

export const stringObjectToStringArray = (
  stringObject: StringArray[]
): string[] => {
  return stringObject.map((object) => {
    return object.name;
  });
};

export const addWidthToImageUrl = (
  imageUrl: string,
  cloudinarySizingObject: CloudinarySizingObject
): string => {
  const { width, height, crop } = cloudinarySizingObject;

  const sizesArray: string[] = [];
  sizesArray.push(`w_${width}`);
  if (height !== undefined) {
    sizesArray.push(`,h_${height}`);
  }

  if (height !== undefined) {
    sizesArray.push(`,c_${crop}`);
  }

  const tempUrl = imageUrl.split('/');
  const imageName = tempUrl.pop();
  tempUrl.pop();

  tempUrl.push(sizesArray.join(''));

  if (imageName) {
    tempUrl.push(imageName);
  }
  return tempUrl.join('/');
};

export const formatDate = (date: string): string => {
  const tempDate = new Date(date);

  return [
    tempDate.getDate(),
    tempDate.getMonth() + 1,
    tempDate.getFullYear(),
  ].join('/');
};
