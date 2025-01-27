import React from 'react';

import { ChatMessage } from '../../types';
import { formatMessageDate } from '../../utils';
import { ReactComponent as Forwarded } from './assets/forwarded.svg';
import { ReactComponent as Error } from './assets/error.svg';

import styles from './Chat.module.css';
import clsx from 'clsx';

interface Props {
  chat?: ChatMessage[];
}

export const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <div className={styles.chatMessages}>
      {chat?.map((message, index) => (
        <div
          className={clsx(styles.chatMessage, {
            [styles.outgoing]: message.send,
            [styles.incoming]: !message.send,
          })}
          key={index}
        >
          {message.isForwarded && (
            <div className={styles.forwarded}>
              <Forwarded className={styles.icon} /> Forwarded message
            </div>
          )}

          {message.quotedMessageText && <div className={styles.quoted}>{message.quotedMessageText}</div>}
          <div className={styles.messageText}>{message.text}</div>
          <div className={styles.date}>{formatMessageDate(message.date)}</div>
          {message.reaction && <div className={styles.reaction}>{message.reaction}</div>}
          {!message.success && (
            <div className={styles.forwarded}>
              <Error className={styles.icon} /> Error
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
