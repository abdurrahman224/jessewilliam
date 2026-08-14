import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET, POST } from '../../services/httpMethods';
import { ENDPOINT } from '../../services/httpEndpoint';
import { apiExecutor } from '../../services/apiExecutor';
import { setCookie } from '../../utils/cookies';

// ✅ Register action
export const authRegister = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.REGISTER, data, { signal });

      if (response?.data?.data?.token) {
        setCookie('app_token', response.data.data.token, { expires: 7 });
      }
      if (response?.data?.data?.user) {
        setCookie('app_user', JSON.stringify(response.data.data.user), { expires: 7 });
      }

      localStorage.setItem('user_email', data.email);

      return response.data;
    }, rejectWithValue)
);

// ✅ Login action
export const authLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue, signal }) =>
  apiExecutor(async () => {
    const response = await POST(ENDPOINT.AUTH.LOGIN, data, { signal });

    if (response?.data?.data?.token) {
      setCookie('app_token', response.data.data.token, { expires: 7 });
    }
    if (response?.data?.data?.user) {
      setCookie('app_user', JSON.stringify(response.data.data.user), { expires: 7 });
    }

    return response.data;
  }, rejectWithValue)
);

// ✅ Verify OTP action
export const authVerifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.VERIFY_OTP, { email, otp }, { signal });
      if (response?.data?.data?.token) {
        setCookie('app_token', response.data.data.token, { expires: 7 });
      }
      if (response?.data?.data?.user) {
        setCookie('app_user', JSON.stringify(response.data.data.user), { expires: 7 });
      }
      return response.data;
    }, rejectWithValue)
);

// ✅ Resend OTP action
export const authResendOTP = createAsyncThunk(
  'auth/resendOTP',
  async ({ email }, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.RESEND_OTP, { email }, { signal });
      return response.data;
    }, rejectWithValue)
);

export const investmentPlan = createAsyncThunk(
  'auth/investmentPlan',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await GET(ENDPOINT.AUTH.INVESTMENT_PLAN, data, { signal });
      return response.data;
    }, rejectWithValue)
);

// ✅ Multi Step plan
export const authMultiStepPlan = createAsyncThunk(
  'auth/multiStepPlan',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.MULTI_STEP_PLAN, data, { signal });
      return response.data;
    }, rejectWithValue)
);

// ✅ Forgot password
export const authForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.FORGOT_PASSWORD, data, { signal });
      return response.data;
    }, rejectWithValue)
);

//  ✅ Reset password
export const authResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue, signal }) =>
    apiExecutor(async () => {
      const response = await POST(ENDPOINT.AUTH.RESET_PASSWORD, data, { signal });
      return response.data;
    }, rejectWithValue)
);
