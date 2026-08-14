/**
 * Constants for Chat Module
 * Centralized configuration for API endpoints, UI strings, and defaults
 */

// API Endpoints
export const CHAT_API_ENDPOINTS = {
  SESSIONS: '/api/chat/sessions',
  MESSAGES: (sessionId) => `/api/chat/sessions/${sessionId}/messages`,
  RESPONSE: (sessionId) => `/api/chat/sessions/${sessionId}/response`,
  RATING: (messageIndex) => `/api/chat/messages/${messageIndex}/rating`,
};

// Chat Status
export const CHAT_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  STREAMING: 'streaming',
  ERROR: 'error',
  SUCCESS: 'success',
};

// Message Roles
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
};

// Agent Types
export const AGENT_TYPES = {
  DEAL_HUNTER: 'deal-hunter',
  DEFAULT: 'deal-hunter',
};

// Plan Types
export const PLAN_TYPES = {
  FREE: 'Free',
  PREMIUM: 'Premium',
  ENTERPRISE: 'Enterprise',
};

// UI Messages
export const UI_MESSAGES = {
  LOAD_ERROR: 'Failed to load chat history',
  SAVE_ERROR: 'Failed to save message',
  SESSION_ERROR: 'Failed to create session',
  RESPONSE_ERROR: 'Failed to save response',
  RATING_ERROR: 'Failed to submit rating',
};

// UI Strings
export const UI_STRINGS = {
  PLACEHOLDER: 'Ask anything...',
  SEND: 'Send',
  THINKING: 'Thinking...',
  LOADING: 'Loading...',
  MAX_LENGTH: 5000,
  CONVERSATION_STARTERS: [
    'Compare Plan A (TX) and Plan B (FL). Recommend optimal solution.',
    'Run Addvanced analysis with tax and survey insights.',
    'Generate plan and include sensitivity table.',
  ],
};

// Timeouts
export const TIMEOUTS = {
  DEBOUNCE_REFRESH: 3000,
  AUTO_SCROLL: 100,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  CHAT_HISTORY: 'chatHistory',
};

// Error Messages
export const ERROR_MESSAGES = {
  SESSION_NOT_FOUND: 'Chat session not found',
  NO_NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'Session expired. Please login again.',
};

// Regex Patterns
export const PATTERNS = {
  TOKEN_EXTRACT: /Bearer\s+(\S+)/,
};
