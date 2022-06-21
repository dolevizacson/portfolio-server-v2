import * as React from 'react';
import { useNavigate, useNavigationType } from 'react-router-dom';

import * as style from './style/close-button.style';

type CloseButtonProps = {
  defaultRoute: string;
};

const CloseButton = ({ defaultRoute }: CloseButtonProps): JSX.Element => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  return (
    <style.CloseButton>
      <style.CloseButtonIcon
        onClick={() =>
          navigationType !== 'POP' ? navigate(-1) : navigate(defaultRoute)
        }
      />
    </style.CloseButton>
  );
};

export default CloseButton;
