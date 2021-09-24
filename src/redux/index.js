import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setDataChannels(state, action) {
      const { channels, currentChannelId, messages } = action.payload;
      return {
        channels: [...state.channels, ...channels],
        currentChannelId,
        messages: [...state.messages, ...messages],
      };
    },
    addChannels(state, action) {
      const { channels, currentChannelId, messages } = state;
      return {
        channels: [...channels, ...action.payload],
        currentChannelId,
        messages,
      };
    },
    setCurrentChannelId(state, action) {
      const { channels, messages } = state;
      return {
        channels,
        currentChannelId: action.payload,
        messages,
      };
    },
    addMessages(state, action) {
      const { channels, currentChannelId, messages } = state;
      return {
        channels,
        currentChannelId,
        messages: [...messages, ...action.payload],
      };
    },
  },
});

export const {
  setDataChannels,
  addChannels,
  setCurrentChannelId,
  addMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
