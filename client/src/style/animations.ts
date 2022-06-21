import { appColorAnimation1, appColorAnimation2 } from './app-colors';

const appColorVariants = {
  color1: appColorAnimation1 as any,
  color2: appColorAnimation2 as any,
};

export const appColorAnimation = {
  variants: appColorVariants,
  initial: 'color1',
};

const afterChangeColorComponentAnimationVariants = {
  hide: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
  show: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.2 },
  },
};

export const afterChangeColorComponentAnimation = {
  variants: afterChangeColorComponentAnimationVariants,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
};

const transitionComponentAnimationVariants = {
  hide: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const transitionComponentAnimation = {
  variants: transitionComponentAnimationVariants,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
};

export const button2TapAnimation = {
  whileTap: {
    boxShadow: `-0.3rem -0.3rem 1.5rem var(--color-main-4),
       0.3rem 0.3rem 1.5rem var(--color-main-3),
       inset 0.5rem 0.5rem 1rem var(--color-main-3),
       inset -0.5rem -0.5rem 1rem var(--color-main-4)`,
  },
};
