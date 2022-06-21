import * as React from 'react';

import * as style from './style/disable-form.style';

type DisabledFormProps = {
  children: React.ReactNode;
  disabled?: boolean;
};

const DisabledForm = ({
  children,
  disabled,
}: DisabledFormProps): JSX.Element => {
  return <style.DisableForm disabled={disabled}>{children}</style.DisableForm>;
};

export default DisabledForm;
