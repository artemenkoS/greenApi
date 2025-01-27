import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '../features/Chats/types';

interface ChatState {
  chats: Record<string, ChatMessage[]>;
  phoneNumbers: string[];
  selectedChat: string;
}

const initialState: ChatState = {
  chats: {},
  phoneNumbers: JSON.parse(localStorage.getItem('phoneNumbers') ?? '[]'),
  selectedChat: localStorage.getItem('selectedChat') ?? '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat(state, action: PayloadAction<string>) {
      state.selectedChat = action.payload;
      localStorage.setItem('selectedChat', action.payload);
    },
    addPhoneNumber(state, action: PayloadAction<string>) {
      if (!state.phoneNumbers.includes(action.payload)) {
        state.phoneNumbers.push(action.payload);
        localStorage.setItem('phoneNumbers', JSON.stringify(state.phoneNumbers));
      }
    },
    addChatMessage(state, action: PayloadAction<{ chatId: string; message: ChatMessage }>) {
      const { chatId, message } = action.payload;
      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }
      state.chats[chatId].push(message);
    },
    updateMessage(
      state,
      action: PayloadAction<{ chatId: string; messageId: string; newValues: Partial<ChatMessage> }>
    ) {
      const { chatId, messageId, newValues } = action.payload;
      const index = state.chats[chatId]?.findIndex(({ idMessage }) => idMessage === messageId);

      if (state.chats[chatId]?.[index]) {
        Object.assign(state.chats[chatId][index], newValues);
      }
    },
  },
  selectors: {
    selectSelectedChat: (state) => state.selectedChat,
    selectPhoneNumbers: (state) => state.phoneNumbers,
    selectChats: (state) => state.chats,
  },
});

export const { setSelectedChat, addPhoneNumber, addChatMessage, updateMessage } = chatSlice.actions;
export const { selectSelectedChat, selectPhoneNumbers, selectChats } = chatSlice.selectors;

export default chatSlice.reducer;
