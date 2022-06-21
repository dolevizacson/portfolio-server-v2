import * as React from 'react';

import * as style from './style/text-block.style';

type TextBlockProps = {
  children: React.ReactNode;
};

const TextBlock = ({ children }: TextBlockProps): JSX.Element => {
  return <style.TextBlock>{children}</style.TextBlock>;
};

export default TextBlock;
