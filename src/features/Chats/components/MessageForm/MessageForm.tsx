import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../../../api/api';
import { Button } from '../../../../components/Button/Button';
import { addChatMessage, selectSelectedChat, updateMessage } from '../../../../store/chatSlice';
import { InstanceData } from '../../../../types';
import { ChatMessage } from '../../types';
import { ReactComponent as Attachment } from './assets/attach.svg';
import { ReactComponent as Emoji } from './assets/emoji.svg';
import { ReactComponent as Mic } from './assets/mic.svg';
import styles from './MessageForm.module.css';

interface Props {
  instanceData: InstanceData;
}

export const MessageForm: React.FC<Props> = ({ instanceData }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(selectSelectedChat);
  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = useCallback(() => {
    const messageId = new Date().getMilliseconds().toString();
    const sentMessage: ChatMessage = {
      idMessage: messageId,
      text: message,
      date: new Date().toISOString(),
      send: true,
      success: true,
    };
    dispatch(addChatMessage({ chatId: selectedChat, message: sentMessage }));
    setMessage('');

    sendMessage({ instanceData, message, chatId: selectedChat })
      .unwrap()
      .then(({ idMessage }) => {
        dispatch(
          updateMessage({
            messageId,
            chatId: selectedChat,
            newValues: { idMessage },
          })
        );
      })
      .catch((error) => {
        dispatch(
          updateMessage({
            messageId,
            chatId: selectedChat,
            newValues: { success: false },
          })
        );
        console.error('Ошибка отправки сообщения:', error);
      });
  }, [dispatch, selectedChat, message, instanceData, sendMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSendMessage]);

  const isMessageEmpty = message.trim() === '';

  return (
    <form
      className={styles.chatForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <Emoji className={styles.icon} />
      <Attachment className={styles.icon} />
      <textarea
        className={styles.messageField}
        cols={2}
        disabled={!selectedChat}
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className={styles.sendButton} disabled={isMessageEmpty} text="Send" onClick={handleSendMessage} />
      <Mic className={styles.icon} />
    </form>
  );
};
