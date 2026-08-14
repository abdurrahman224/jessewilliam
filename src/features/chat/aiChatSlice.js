import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionsList: [],
  loading: false,
  historyLoading: false,
  selectedChatId: null,

  // UI state only
  copiedMessageId: null,
  messageRatings: {},
};

const aiChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // ===================================================
    // LOADING STATES
    // ===================================================

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setHistoryLoading: (state, action) => {
      state.historyLoading = action.payload;
    },

    // ===================================================
    // UI FEATURES
    // ===================================================

    setCopiedMessage: (state, action) => {
      state.copiedMessageId = action.payload;
    },

    clearCopiedMessage: (state) => {
      state.copiedMessageId = null;
    },

    setMessageRating: (state, action) => {
      const { messageId, rating } = action.payload;
      state.messageRatings[messageId] = rating;
    },

    // ===================================================
    // SESSION MANAGEMENT
    // ===================================================

    setSessionsList: (state, action) => {
      state.sessionsList = action.payload;
    },

    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },

    clearSelectedChatId: (state) => {
      state.selectedChatId = null;
    },
  },
});

export const {
  setLoading,
  setHistoryLoading,
  setCopiedMessage,
  clearCopiedMessage,
  setMessageRating,
  setSessionsList,
  setSelectedChatId,
  clearSelectedChatId,
} = aiChatSlice.actions;

export default aiChatSlice.reducer;
