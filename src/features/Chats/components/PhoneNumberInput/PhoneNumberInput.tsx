import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button/Button';
import { addPhoneNumber, setSelectedChat, selectPhoneNumbers } from '../../../../store/chatSlice';
import styles from './PhoneNumberInput.module.css';

export const PhoneNumberInput: React.FC = () => {
  const dispatch = useDispatch();
  const phoneNumbers = useSelector(selectPhoneNumbers);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleCreateChat = () => {
    const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (!!formattedNumber && !phoneNumbers.includes(formattedNumber)) {
      dispatch(addPhoneNumber(formattedNumber));
    }
    setPhoneNumber('');
    dispatch(setSelectedChat(formattedNumber));
  };

  return (
    <>
      <input
        autoComplete="on"
        className={styles.phoneNumberInput}
        placeholder="Enter phone number"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        fullWidth
        className={styles.createChatButton}
        disabled={!phoneNumber}
        text="Create Chat"
        onClick={handleCreateChat}
      />
    </>
  );
};
