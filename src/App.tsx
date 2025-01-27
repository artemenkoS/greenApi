import React from 'react';
import { useSelector } from 'react-redux';
import { Auth } from './features/Auth/Auth';
import { Chats } from './features/Chats/Chats';
import { selectInstanceData } from './store/instanceSlice';

export function App() {
  const instanceData = useSelector(selectInstanceData);

  return instanceData ? <Chats instanceData={instanceData} /> : <Auth />;
}
