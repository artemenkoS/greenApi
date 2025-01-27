import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReceiveMessageQuery, useDeleteMessageMutation } from '../../api/api';
import { REQUEST_TIMEOUT_MS } from '../../constants';
import { InstanceData } from '../../types';
import { Chat } from './components/Chat/Chat';
import { ChatHeader } from './components/ChatHeader/ChatHeader';
import { MessageForm } from './components/MessageForm/MessageForm';
import { PhoneNumberInput } from './components/PhoneNumberInput/PhoneNumberInput';
import { PhoneNumberList } from './components/PhoneNumberList/PhoneNumberList';
import { addChatMessage, selectSelectedChat, selectChats, updateMessage } from '../../store/chatSlice';
import { ChatMessage } from './types';
import { getMessageDataText, getQuotedMessageText, getReactionMessage, isForwarded } from './utils';
import styles from './Chats.module.css';

interface Props {
  instanceData: InstanceData;
}

export const Chats: React.FC<Props> = ({ instanceData }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(selectSelectedChat);
  const chats = useSelector(selectChats);

  const { data: receivedMessageData, refetch: refetchMessages } = useReceiveMessageQuery(instanceData, {
    pollingInterval: REQUEST_TIMEOUT_MS,
  });
  const [deleteMessage] = useDeleteMessageMutation();

  useEffect(() => {
    if (receivedMessageData) {
      const { idMessage, typeWebhook, messageData, timestamp, senderData } = receivedMessageData.body;

      if (typeWebhook === 'incomingMessageReceived' && messageData) {
        const text = getMessageDataText(messageData);
        const phoneNumber = senderData.chatId.split('@')[0];

        const reaction = getReactionMessage(messageData);
        if (reaction) {
          dispatch(
            updateMessage({
              chatId: reaction.chatId,
              messageId: reaction.messageId,
              newValues: {
                reaction: reaction.value,
              },
            })
          );
        } else if (text) {
          const message: ChatMessage = {
            idMessage,
            text,
            date: new Date(timestamp * 1000).toISOString(),
            isForwarded: isForwarded(messageData),
            quotedMessageText: getQuotedMessageText(messageData),
            send: false,
            success: true,
            typeMessage: messageData.typeMessage,
          };

          dispatch(addChatMessage({ message, chatId: phoneNumber }));
        }
      }

      deleteMessage({ instanceData, receiptId: receivedMessageData.receiptId });
      // refetchMessages();
    }
  }, [receivedMessageData, instanceData, deleteMessage, refetchMessages, dispatch]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.contacts}>
        <PhoneNumberInput />
        <PhoneNumberList />
      </div>
      <div className={styles.chat}>
        <ChatHeader chatTitle={selectedChat} />
        <Chat chat={chats[selectedChat]} />
        <MessageForm instanceData={instanceData} />
      </div>
    </div>
  );
};
