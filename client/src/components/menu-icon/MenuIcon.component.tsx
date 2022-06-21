import * as React from 'react';
import * as style from './style/menu-icon.style';

const MenuIcon: React.FC<{
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}> = ({ onClick, onKeyDown }): JSX.Element => {
  return (
    <style.MenuIconBackground
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <style.MenuIconBar />
      <style.MenuIconBar />
      <style.MenuIconBar />
    </style.MenuIconBackground>
  );
};

export default MenuIcon;
