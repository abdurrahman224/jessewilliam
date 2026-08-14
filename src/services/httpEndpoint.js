// httpEndpoint.js

// Route Paths
export const ENDPOINT = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PRODUCTS: '/api/products?limit=5',
    CONTACT: '/api/contact',
  },

  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    VERIFY_OTP: '/api/auth/verify-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    MULTI_STEP_PLAN: '/api/ai/onboarding',
    INVESTMENT_PLAN: '/api/ai/onboarding',

    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },

  PRIVATE: {
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',

    // ✅ Session Management - Matches backend
    GET_SESSION_LIST: '/api/chat/sessions', // GET with ?limit=50
    CREATE_SESSION: '/api/chat/sessions', // POST (create or continue)
    GET_SESSION_MESSAGES: '/api/chat/sessions/:sessionId/messages', // GET
    SAVE_AI_RESPONSE: '/api/chat/sessions/:sessionId/response', // POST
    PIN_SESSION: '/api/chat/sessions/:sessionId/pin', // PATCH
    DELETE_SESSION: '/api/chat/sessions/:sessionId', // DELETE
    UPDATE_SESSION_TITLE: '/api/chat/sessions/:sessionId/title', // PATCH

    // ✅ AI Chat - Matches backend
    SEND_AI_MESSAGE: '/api/ai/chat', // POST (streaming or file)
    FEEDBACK: '/api/ai/feedback', // POST

    // ✅ Payment & Subscription
    CREATE_CHECKOUT_SESSION: '/api/payments/create-checkout-session',
    MY_SUBSCRIPTION: '/api/subscriptions/my-subscription',
    SUBSCRIBE_PLAN: '/api/subscriptions/subscribe',
    CANCEL_SUBSCRIPTION: '/api/subscriptions/cancel',
  },
};
