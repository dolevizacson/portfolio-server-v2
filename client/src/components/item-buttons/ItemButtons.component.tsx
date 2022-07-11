import * as React from 'react';
import { AnimatePresence } from 'framer-motion';

import DeleteButton from '../delete-button/DeleteButton.component';

import * as style from './style/item-buttons.style';

type ItemButtonsProps = {
  deleteFunction: (arg: string) => void;
  toggleFunction: (arg: string) => void;
  item: { _id: string; isActive: 0 | 1 } | undefined;
  updateRoute: string;
  name?: string;
};

const ItemButtons = ({
  deleteFunction,
  toggleFunction,
  item,
  updateRoute,
  name,
}: ItemButtonsProps): JSX.Element => {
  return (
    <style.ItemButtons>
      {item && (
        <DeleteButton
          deleteFunction={deleteFunction}
          deleteItem={item._id}
          modalButtonText={name ? `delete ${name}` : 'delete'}
        >
          <style.Button>{name ? `delete ${name}` : 'delete'}</style.Button>
        </DeleteButton>
      )}
      <style.Button onClick={() => item && toggleFunction(item._id)}>
        toggle{' '}
        <AnimatePresence initial={false} exitBeforeEnter>
          {item?.isActive ? (
            <style.ButtonText key="off">off</style.ButtonText>
          ) : (
            <style.ButtonText key="on">on</style.ButtonText>
          )}
        </AnimatePresence>
      </style.Button>
      <style.LinkButton to={updateRoute}>update</style.LinkButton>
    </style.ItemButtons>
  );
};

export default ItemButtons;
