import 'styled-components';

import * as mixins from './mixins.style';
import * as animations from './animations';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: (
      size: ScreenSizes | string,
      isMin?: boolean
    ) => (
      literals: TemplateStringsArray,
      ...placeholders: any[]
    ) => FlattenSimpleInterpolation;

    mixins: typeof mixins;
    animations: typeof animations;
  }
}
