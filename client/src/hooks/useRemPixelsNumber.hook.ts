import * as React from 'react';

const getPixelsInRem = () =>
  parseInt(getComputedStyle(document.documentElement).fontSize);

export const useRemPixelsNumber = (): number => {
  const [pixelsNumber, setPixelsNumber] = React.useState(getPixelsInRem());

  React.useEffect(() => {
    const setPixelsInRem = () => setPixelsNumber(getPixelsInRem());
    window.addEventListener('resize', setPixelsInRem);
    return () => window.removeEventListener('resize', setPixelsInRem);
  });

  return pixelsNumber;
};
