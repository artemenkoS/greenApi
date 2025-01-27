export interface SendMessageResult {
  idMessage: string;
}

export type MessageData = TextMessage | ExtendedMessage | QuotedMessage | ReactionMessage;

export type MessageTypes = 'extendedTextMessage' | 'quotedMessage' | 'reactionMessage' | 'textMessage';

export interface Reaction {
  messageId: string;
  chatId: string;
  value: string;
}

export interface ChatMessage {
  idMessage: string;
  text: string;
  date: string;
  isForwarded?: boolean;
  quotedMessageText?: string;
  reaction?: string;
  send: boolean;
  success: boolean;
  typeMessage?: MessageTypes;
}

export interface QuotedMessage {
  extendedTextMessageData: {
    participant: string;
    stanzaId: string;
    text: string;
  };
  quotedMessage: {
    stanzaId: string; // id цитируемого сообщения
    participant: string; // id отправителя цитируемого сообщения
    typeMessage: string; // Тип цитируемого сообщения
    textMessage: string; // Текст цитируемого сообщения
  };
  typeMessage: 'quotedMessage';
}

export interface ReactionMessage {
  extendedTextMessageData: {
    text: string;
  };
  quotedMessage: {
    stanzaId: string; // id цитируемого сообщения
    participant: string; // id отправителя цитируемого сообщения
  };
  typeMessage: 'reactionMessage';
}

export interface ExtendedMessage {
  extendedTextMessageData: {
    description: string;
    isForwarded: boolean;
    jpegThumbnail: string;
    previewType: string;
    text: string;
    title: string;
  };
  typeMessage: 'extendedTextMessage';
}

export interface TextMessage {
  textMessageData: {
    textMessage: string;
  };
  typeMessage: 'textMessage';
}

export interface ReceivedNotification {
  body: {
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    idMessage: string;
    messageData: MessageData;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderContactName: string;
      senderName: string;
    };
    timestamp: number;
    typeWebhook: string; // 'outgoingAPIMessageReceived' | 'incomingMessageReceived';
  };
  receiptId: number;
}
