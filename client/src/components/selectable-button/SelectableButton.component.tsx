import * as React from 'react';

import * as style from './style/selectable-button.style';

type SelectableButtonProps = {
  isSelected: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const SelectableButton = ({
  isSelected,
  children,
  onClick,
  ...props
}: SelectableButtonProps): JSX.Element => {
  return (
    <style.SelectableButton {...props} onClick={onClick}>
      <style.SelectableButtonText
        animate={isSelected ? 'press' : 'start'}
        whileHover={isSelected ? 'hoverPress' : 'hover'}
      >
        {children}
      </style.SelectableButtonText>
    </style.SelectableButton>
  );
};

export default SelectableButton;
