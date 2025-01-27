import { ChatMessage, MessageData, Reaction, ReactionMessage } from './types';

export const formatMessageDate = (timestamp: string) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();

  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    return messageDate.toLocaleString('en-US', options);
  }
};

export const isForwarded = (messageData: MessageData): boolean => {
  if (!('extendedTextMessageData' in messageData) || !('isForwarded' in messageData.extendedTextMessageData)) {
    return false;
  }

  return messageData.extendedTextMessageData.isForwarded;
};

export const getReactionMessage = (messageData: MessageData): Reaction | undefined => {
  if (messageData.typeMessage !== 'reactionMessage') {
    return;
  }

  return {
    messageId: messageData.quotedMessage.stanzaId,
    chatId: messageData.quotedMessage.participant.replace(/\D/g, ''),
    value: messageData.extendedTextMessageData.text,
  };
};

export const getQuotedMessageText = (messageData: MessageData): string => {
  if (!('quotedMessage' in messageData)) {
    return '';
  }

  if (messageData.typeMessage === 'reactionMessage') {
    return messageData.extendedTextMessageData.text;
  }

  return messageData.quotedMessage.textMessage;
};

export const getMessageDataText = (messageData: MessageData): string => {
  if ('extendedTextMessageData' in messageData) {
    return messageData.extendedTextMessageData.text;
  }

  return messageData.textMessageData.textMessage;
};
