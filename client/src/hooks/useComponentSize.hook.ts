import * as React from 'react';

export const useComponentSize = (
  myRef: React.MutableRefObject<HTMLElement>
) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      if (myRef.current) {
        setWidth(myRef.current.offsetWidth);
        setHeight(myRef.current.offsetHeight);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return { width, height };
};
