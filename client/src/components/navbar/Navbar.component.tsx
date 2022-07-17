import * as React from 'react';
import { NavLink, matchPath, resolvePath, useLocation } from 'react-router-dom';

import { useWindowWidth } from '../../hooks/useWindowWidth.hook';
import { useIsLoggedInQuery } from '../../services/auth/auth.service';
import HomeIcon from '../home-icon/HomeIcon.component';
import MenuIcon from '../menu-icon/MenuIcon.component';
import { AnimatePresence } from 'framer-motion';

import * as style from './style/navbar.style';

const linksInfo: { name: string; route: string; isProtected: boolean }[] = [
  { name: 'projects', route: 'projects', isProtected: false },
  { name: 'skills', route: 'skills', isProtected: false },
  { name: 'tasks', route: 'tasks', isProtected: false },
  { name: 'blog', route: 'blog', isProtected: false },
  { name: 'contact', route: 'contact', isProtected: false },
  { name: 'admin', route: 'admin', isProtected: true },
];

const Navbar = (): JSX.Element => {
  const { data: isLoggedInData } = useIsLoggedInQuery();
  const [isCollapse, setIsCollapse] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const [showMenuIcon, setShowMenuIcon] = React.useState(false);
  const [focused, setFocused] = React.useState(-1);
  const [selected, setSelected] = React.useState(-1);

  const location = useLocation();

  const width = useWindowWidth();

  React.useEffect(() => {
    if (width <= 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  }, [width]);

  React.useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset === 0) {
        setShowMenuIcon(false);
      } else {
        setShowMenuIcon(true);
      }
      setIsCollapse(true);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linksList = React.useMemo(() => {
    return (
      <>
        {linksInfo
          .filter((linkInfo) => !linkInfo.isProtected || isLoggedInData)
          .map((linkInfo, linkIndex) => {
            const currentPath = resolvePath(linkInfo.route).pathname;
            if (
              matchPath({ path: currentPath, end: false }, location.pathname)
            ) {
              setSelected(linkIndex);
            }
            return (
              <style.NavbarLink
                key={linkInfo.name}
                to={linkInfo.route}
                onClick={() => {
                  setIsCollapse(true);
                }}
                onFocus={() => setFocused(linkIndex)}
                onMouseEnter={() => setFocused(linkIndex)}
              >
                <style.LinkText>{linkInfo.name}</style.LinkText>
                <AnimatePresence initial={false}>
                  {focused === linkIndex ? (
                    <style.LinkFocus key={`focus${linkIndex}`} />
                  ) : null}
                  {selected === linkIndex ? (
                    <style.LinkSelect key={`select${linkIndex}`} />
                  ) : null}
                </AnimatePresence>
              </style.NavbarLink>
            );
          })}
      </>
    );
  }, [isLoggedInData, focused, selected, location]);

  return (
    <>
      <style.LeftSide>
        <NavLink
          to="/"
          onClick={() => {
            setSelected(-1);
            setIsCollapse(true);
          }}
        >
          <HomeIcon />
        </NavLink>
      </style.LeftSide>
      <style.rightSide>
        <AnimatePresence exitBeforeEnter initial={false}>
          {isSmallScreen || showMenuIcon ? (
            <style.MenuIconContainer
              $showBackground={isSmallScreen}
              key="menuIcon"
            >
              <MenuIcon
                onClick={() => {
                  isSmallScreen
                    ? setIsCollapse(!isCollapse)
                    : setShowMenuIcon(false);
                }}
                onKeyDown={(event: { key: string }) => {
                  if (event.key === 'Enter') {
                    isSmallScreen
                      ? setIsCollapse(!isCollapse)
                      : setShowMenuIcon(false);
                  }
                }}
              />
            </style.MenuIconContainer>
          ) : (
            <style.LinksList
              onMouseLeave={() => setFocused(-1)}
              onBlur={() => setFocused(-1)}
            >
              {linksList}
            </style.LinksList>
          )}
        </AnimatePresence>
      </style.rightSide>
      {isSmallScreen && (
        <style.NavbarCollapse
          animate={isCollapse ? 'close' : 'open'}
          onMouseLeave={() => setFocused(-1)}
          onBlur={() => setFocused(-1)}
        >
          {linksList}
        </style.NavbarCollapse>
      )}
    </>
  );
};

export default Navbar;
