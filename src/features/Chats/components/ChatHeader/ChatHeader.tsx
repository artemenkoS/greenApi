import React from 'react';

import { DEFAULT_CHAT_TITLE } from '../../../../constants';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Search } from './assets/search.svg';
import styles from './ChatHeader.module.css';

interface Props {
  chatTitle?: string;
}

export const ChatHeader: React.FC<Props> = ({ chatTitle = DEFAULT_CHAT_TITLE }) => {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}></div>
      <div className={styles.chatTitle}>{chatTitle}</div>
      <Menu className={styles.icon} />
      <Search className={styles.icon} />
    </div>
  );
};
