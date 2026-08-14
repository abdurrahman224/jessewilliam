import { createSlice } from '@reduxjs/toolkit';
import {
  authForgotPassword,
  authLogin,
  authMultiStepPlan,
  authRegister,
  authResendOTP,
  authResetPassword,
  authVerifyOTP,
  investmentPlan,
} from './authAPI';
import { getCookie, removeCookie } from '../../utils/cookies';
import { setEmailVerified, setOnboarding } from '../../utils/storage';

const token = getCookie('app_token');
const user = getCookie('app_user') ? JSON.parse(getCookie('app_user')) : null;

const initialState = {
  isAuthenticated: !!token,
  role: user?.role || null,
  user: user || null,
  onboarding: null,
  success: token ? true : null,
  error: null,
  loading: false,
  isResend: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    resetAuth: () => initialState,
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
      state.success = null;
      state.error = null;
      state.loading = false;

      // Clear cookies
      removeCookie('app_token');
      removeCookie('app_user');
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login cases
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = user;
        state.role = user?.role || null;
        state.isAuthenticated = true;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to login';
      })

      // ✅ REGISTER, cases can be added here similarly
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(authRegister.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;

        state.user = user;
        state.role = user?.role || null;
        state.isAuthenticated = user.emailVerified || false;
        setEmailVerified(user.emailVerified || false);
      })

      .addCase(authRegister.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to register';
      })

      // ✅ Verify OTP cases
      .addCase(authVerifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(authVerifyOTP.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = user;
        state.isAuthenticated = true;
        setEmailVerified(user.emailVerified || false);
        setOnboarding(user.emailVerified || false);
      })

      .addCase(authVerifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to verify OTP';
      })

      // ✅ Additional cases (e.g., resend OTP) can be added here
      .addCase(authResendOTP.pending, (state) => {
        state.error = null;
        state.success = null;
        state.isResend = true;
      })
      .addCase(authResendOTP.fulfilled, (state) => {
        state.success = true;
        state.error = null;
        state.isResend = false;
      })
      .addCase(authResendOTP.rejected, (state, action) => {
        state.isResend = false;
        state.success = false;
        state.error = action.payload || 'Failed to resend OTP';
      })

      // ✅ Additional cases can be added here
      .addCase(authMultiStepPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(authMultiStepPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const onBoard = {
          completed: false,
          step: 2,
        };
        setOnboarding(onBoard.completed || false);
      })
      .addCase(authMultiStepPlan.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to complete multi-step plan';
      })

      // ✅ Additional cases can be added here
      .addCase(investmentPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(investmentPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.onboarding = action.payload.profile;
      })
      .addCase(investmentPlan.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to complete investment plan';
      })

      // ✅ Forgot password cases can be added here similarly
      .addCase(authForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(authForgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(authForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to send password reset email';
      })

      // ✅ Reset password cases
      .addCase(authResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(authResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(authResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to reset password';
      });
  },
});

export const { resetAuthError, resetAuth, logout } = authSlice.actions;
// Selectors
export const selectAllAuth = (state) => state.auth.list;
export default authSlice.reducer;
