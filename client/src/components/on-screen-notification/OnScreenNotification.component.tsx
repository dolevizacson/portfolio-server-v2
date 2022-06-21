import * as React from 'react';
import { AnimatePresence } from 'framer-motion';

import * as style from './style/on-screen-notification.style';

type MessageOptions = {
  messageText: string;
  isShow: boolean;
  closeAfter?: number;
  component?: JSX.Element;
};

type OnScreenNotificationProps = {
  messages: MessageOptions[];
};

const OnScreenNotification = ({
  messages,
}: OnScreenNotificationProps): JSX.Element => {
  const [state, setState] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    setState({});
  }, [messages]);

  React.useEffect(() => {
    const intervalsIds: NodeJS.Timer[] = [];

    messages.forEach((message, index) => {
      if (message.closeAfter && message.isShow) {
        const id = setTimeout(() => {
          setState({ ...state, [index]: false });
        }, message.closeAfter * 1000);
        intervalsIds.push(id);
      }
    });
    return () => {
      for (const id of intervalsIds) {
        clearTimeout(id);
      }
    };
  }, [messages, state]);

  const messagesList = React.useMemo((): JSX.Element => {
    return (
      <>
        {messages.map((message, index) => {
          return (
            <AnimatePresence key={index}>
              {message.isShow && state[index] !== false && (
                <style.OnScreenNotificationMessage>
                  {message.messageText}
                  {message.component}
                </style.OnScreenNotificationMessage>
              )}
            </AnimatePresence>
          );
        })}
      </>
    );
  }, [messages, state]);

  return (
    <style.OnScreenNotification>{messagesList}</style.OnScreenNotification>
  );
};

export default OnScreenNotification;
