import * as React from 'react';
import {
  css,
  FlattenSimpleInterpolation,
  ThemeProvider,
} from 'styled-components';

import * as mixins from './mixins.style';
import * as animations from './animations';

export interface MainThemeProps {
  children: React.ReactNode;
}

export enum ScreenSizes {
  smallPhone = 'smallPhone',
  phone = 'phone',
  tabPort = 'tabPort',
  tabLand = 'tabLand',
  bigDesktop = 'bigDesktop',
}

type ConstSizes = {
  [key: ScreenSizes | string]: { size: string; isMin: boolean };
};

const createMediaQuery = (
  size: ScreenSizes | string,
  isMin?: boolean
): ((
  literals: TemplateStringsArray,
  ...placeholders: any[]
) => FlattenSimpleInterpolation) => {
  const constSizes: ConstSizes = {
    smallPhone: { size: '21.875em', isMin: false },
    phone: { size: '37.5em', isMin: false },
    tabPort: { size: '56.25em', isMin: false },
    tabLand: { size: '75em', isMin: false },
    bigDesktop: { size: '112.5em', isMin: true },
  };

  let finalSize = size;
  let finalIsMin = false;

  if (constSizes[size]) {
    finalIsMin = constSizes[size].isMin;
    finalSize = constSizes[size].size;
  }

  if (isMin) {
    finalIsMin = isMin;
  }

  return (
    literals: TemplateStringsArray,
    ...placeholders: any[]
  ): FlattenSimpleInterpolation => css`
    @media screen and (${finalIsMin
        ? 'min-width'
        : 'max-width'}: ${finalSize}) {
      ${css(literals, ...placeholders)}
    }
  `;
};

const MainTheme = ({ children }: MainThemeProps): JSX.Element => {
  return (
    <>
      <ThemeProvider
        theme={{
          // app css mixins
          mixins,

          // media quires
          media: createMediaQuery,

          // //animations
          animations,
        }}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default MainTheme;
