import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { setSelectedChat, selectSelectedChat, selectPhoneNumbers } from '../../../../store/chatSlice';
import styles from './PhoneNumberList.module.css';

export const PhoneNumberList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(selectSelectedChat);
  const phoneNumbers = useSelector(selectPhoneNumbers);

  return (
    <div className={styles.chatList}>
      {phoneNumbers.map((number) => (
        <div
          key={number}
          className={clsx(styles.chatItem, { [styles.active]: number === selectedChat })}
          onClick={() => dispatch(setSelectedChat(number))}
        >
          {number}
        </div>
      ))}
    </div>
  );
};