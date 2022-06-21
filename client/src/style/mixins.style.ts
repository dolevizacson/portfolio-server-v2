import { css, FlattenSimpleInterpolation } from 'styled-components';

export const centerContent = (): FlattenSimpleInterpolation => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  `;
};

export const listSeparator = (): FlattenSimpleInterpolation => {
  return css`
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      height: 0.3rem;
      width: 100%;
      background-color: var(--color-main-2);
      border-radius: 25px;
    }
  `;
};

export const listSeparatorTop = (): FlattenSimpleInterpolation => {
  return css`
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      height: 0.5rem;
      width: 100%;
      background-color: var(--color-main-2);
      border-radius: 25px;
    }
  `;
};

export const listSeparatorBottom = (): FlattenSimpleInterpolation => {
  return css`
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      height: 0.5rem;
      width: 100%;
      background-color: var(--color-main-2);
      border-radius: 25px;
    }
  `;
};

export const listSeparator1 = (): FlattenSimpleInterpolation => {
  return css`
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      height: 0.2rem;
      width: 100%;
      background: radial-gradient(
          farthest-corner,
          var(--color-main-8),
          transparent
        ),
        radial-gradient(closest-corner, var(--color-main-8), transparent),
        radial-gradient(farthest-corner, var(--color-main-1), transparent),
        radial-gradient(closest-corner, var(--color-main-1), transparent);
      border-radius: 25px;
    }
  `;
};

export const showMoreButton = (): FlattenSimpleInterpolation => {
  return css`
    justify-self: flex-end;

    font-family: 'Noto Sans Display', sans-serif;
    font-size: 1.8rem;
    text-transform: capitalize;
    color: var(--color-font-1);
    text-decoration: none;
    font-weight: 500;
  `;
};

export const link = (): FlattenSimpleInterpolation => {
  return css`
    color: var(--color-font-1);
    text-transform: capitalize;
    font-family: 'Noto Sans Display', sans-serif;
    font-size: 2.1rem;
    font-weight: 600;
    text-decoration: underline;

    width: max-content;
  `;
};

export const button = (): FlattenSimpleInterpolation => {
  return css`
    width: max-content;

    font-family: 'Noto Sans Display', sans-serif;
    font-size: 1.7rem;
    text-transform: capitalize;
    color: var(--color-font-1);
    text-decoration: none;
    font-weight: 500;
    text-align: center;

    background-color: var(--color-main-5);

    border: none;
    border-radius: 10px;

    box-shadow: -0.3rem -0.3rem 1.5rem var(--color-main-4),
      0.3rem 0.3rem 1.5rem var(--color-main-3),
      inset 0.5rem 0.5rem 1rem var(--color-main-4),
      inset -0.5rem -0.5rem 1rem var(--color-main-3);

    margin: 1rem;
    padding: 1.5rem 2.2rem;

    cursor: pointer;
  `;
};
