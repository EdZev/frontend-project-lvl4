import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

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
        channels: [...channels],
        currentChannelId,
        messages: [...messages],
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
    addChannel(state, action) {
      const { channels, messages, currentChannelId } = state;
      return {
        channels: [...channels, action.payload],
        currentChannelId,
        messages,
      };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      const { channels, currentChannelId, messages } = state;
      const newCurrentChannel = (currentChannelId === id) ? DEFAULT_CHANNEL_ID : currentChannelId;
      return {
        currentChannelId: newCurrentChannel,
        channels: channels.filter((channel) => channel.id !== id),
        messages: messages.filter((message) => message.channelId !== id),
      };
    },
    addMessage(state, action) {
      const { channels, currentChannelId, messages } = state;
      return {
        channels,
        currentChannelId,
        messages: [...messages, action.payload],
      };
    },
  },
});

export const {
  setDataChannels,
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannelId,
  addMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
