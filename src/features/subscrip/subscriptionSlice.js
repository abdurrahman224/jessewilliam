import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './extraReducers';

const initialState = {
  activePlan: null,
  currentPlan: null,
  sessionUrl: null,
  error: null,
  loading: false,
  success: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    resetSubscriptionError: (state) => {
      state.error = null;
    },
    resetSubscription: () => initialState,
  },
  extraReducers: extraReducers,
});

export const { resetSubscriptionError, resetSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
