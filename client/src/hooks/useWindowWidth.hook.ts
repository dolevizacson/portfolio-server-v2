import * as React from 'react';

export const useWindowWidth = (): number => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const getWindowWidth = () => setWidth(window.innerWidth);
    window.addEventListener('resize', getWindowWidth);
    return () => window.removeEventListener('resize', getWindowWidth);
  });

  return width;
};
