import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET, POST } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';

// ✅ Create action
export const createCheckoutSession = createAsyncThunk(
  'auth/checkoutSession',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.PRIVATE.CREATE_CHECKOUT_SESSION, data, { signal });
      return response.data;
    }, rejectWithValue)
);

// ✅ Subscribe actions
export const subscribePlan = createAsyncThunk(
  'subscription/subscribePlan',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.PRIVATE.SUBSCRIBE_PLAN, data, { signal });
      return response.data;
    }, rejectWithValue)
);

// ✅ My subscription action
export const fetchMySubscription = createAsyncThunk(
  'subscription/fetchMySubscription',
  async (_, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await GET(ENDPOINT.PRIVATE.MY_SUBSCRIPTION, {}, { signal });
      return response.data;
    }, rejectWithValue)
);

// ✅ Cancel subscription action
export const cancelSubscription = createAsyncThunk(
  'subscription/cancelSubscription',
  async (_, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.PRIVATE.CANCEL_SUBSCRIPTION, {}, { signal });
      return response.data;
    }, rejectWithValue)
);
