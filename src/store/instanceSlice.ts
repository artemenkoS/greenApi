import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInstanceData } from '../utils';
import { InstanceData } from '../types';

interface InstanceState {
  instanceData: InstanceData | null;
}

const initialState: InstanceState = {
  instanceData: getInstanceData(),
};

const instanceSlice = createSlice({
  name: 'instance',
  initialState,
  reducers: {
    setInstanceData(state, action: PayloadAction<InstanceData>) {
      state.instanceData = action.payload;
    },
  },
  selectors: {
    selectInstanceData: (state) => state.instanceData,
  },
});

export const { setInstanceData } = instanceSlice.actions;
export const { selectInstanceData } = instanceSlice.selectors;

export default instanceSlice.reducer;
