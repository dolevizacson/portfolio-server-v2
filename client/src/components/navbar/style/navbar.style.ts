import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LeftSide = styled.div`
  display: flex;
  align-items: center;

  height: var(--size-navbar-height);

  padding-left: 1rem;

  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
`;

export const rightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: var(--size-navbar-height);
  width: min-content;

  padding-right: 1rem;

  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
`;

interface MenuIconContainerProps {
  $showBackground: boolean;
}

export const MenuIconContainer = styled(motion.div).attrs((props) => ({
  initial: { x: '120%' },
  animate: { x: 0 },
  exit: { x: '120%' },
  key: 'menuIcon',
}))<MenuIconContainerProps>`
  ${(props) => props.$showBackground && 'width:100vw;'}
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 100%;

  background-color: var(--color-main-1);
`;

export const LinksList = styled(motion.div).attrs((props) => ({
  initial: { y: '-120%' },
  animate: { y: 0 },
  exit: { y: '-120%' },
  key: 'linksList',
  transition: { delay: 0.2 },
}))`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100vw;
  height: 100%;

  background-color: var(--color-main-1);
`;

const item = {
  open: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
};

export const NavbarLink = styled(motion(NavLink)).attrs((props) => ({
  variants: item,
}))`
  color: var(--color-font-1);
  text-decoration: none;
  text-transform: capitalize;
  font-family: 'Noto Sans Display', sans-serif;
  font-size: 1.7rem;
  font-weight: 400;

  width: min-content;

  padding: 1rem;

  outline: none;

  position: relative;
`;

const linkVariants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const LinkText = styled.div`
  position: relative;
  z-index: 1;
`;

export const LinkFocus = styled(motion.div).attrs((props) => ({
  layoutId: 'linkFocus',
  variants: linkVariants,
  initial: 'hide',
  animate: 'show',
  exit: 'hide',
}))`
  position: absolute;
  bottom: 12%;
  right: 8%;
  width: 84%;
  height: 70%;
  z-index: 0;

  border-radius: var(--size-focus-radius-1);
  background-color: var(--color-main-11);
`;

export const LinkSelect = styled(motion.div).attrs((props) => ({
  layoutId: 'linkSelect',
  variants: linkVariants,
  initial: false,
  animate: 'show',
  exit: 'hide',
}))`
  position: absolute;
  bottom: 0%;
  right: 12%;
  width: 76%;
  height: 100%;
  z-index: 0;

  border-bottom: 2px solid var(--color-main-2);
`;

const variants = {
  open: {
    scaleY: '1',
    opacity: 1,
    padding: '1.4rem 0',
    paddingBottom: 0,
    transition: {
      when: 'beforeChildren',
      type: 'spring',
      bounce: 0,
    },
    transitionEnd: {
      display: 'flex',
    },
  },
  close: {
    scaleY: '0',
    opacity: 0,
    padding: 0,
    paddingBottom: 0,
    transition: {
      when: 'afterChildren',
      type: 'spring',
      bounce: 0,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

export const NavbarCollapse = styled(motion.div).attrs((props) => ({
  variants,
  initial: 'close',
}))`
  ${(props) => props.theme.mixins.listSeparatorTop}
  ${(props) => props.theme.mixins.listSeparatorBottom}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 10;
  top: var(--size-navbar-height);
  right: 0;

  width: 100%;
  height: max-content;

  background-color: var(--color-main-1);

  padding: 1.4rem 0;
  padding-bottom: 0;

  & ${NavbarLink} {
    font-size: 3rem;
    font-weight: 500;

    padding: 0 1rem;
    padding-bottom: 1.4rem;
  }

  & ${LinkFocus} {
    bottom: 25%;
    width: 90%;
    right: 5%;
  }

  & ${LinkSelect} {
    bottom: 5%;
  }
`;
