import * as React from 'react';
import { useNavigate, useNavigationType } from 'react-router-dom';

import * as style from './style/close-button.style';

type CloseButtonProps = {
  defaultRoute: string;
};

const CloseButton = ({ defaultRoute }: CloseButtonProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <style.CloseButton>
      <style.CloseButtonIcon onClick={() => navigate(defaultRoute)} />
    </style.CloseButton>
  );
};

export default CloseButton;
