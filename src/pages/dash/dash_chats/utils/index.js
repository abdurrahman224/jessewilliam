/**
 * Utilities Index
 * Central export point for all utility functions
 */

// Message utilities
export {
  transformMessage,
  transformMessageList,
  buildMessageObject,
  createUserMessage,
  createAssistantMessage,
  formatMessageForDisplay,
  isMessageComplete,
  getMessageByIndex,
  filterMessagesByRole,
} from './messageUtils';

// Session utilities
export {
  createSessionObject,
  parseSessionFromResponse,
  getSessionDisplayName,
  isSessionValid,
  areSessionsEqual,
  sortSessionsByDate,
} from './sessionUtils';

// File utilities
export {
  handleFileDownload,
  copyToClipboard,
  encodeFileToBase64,
  validateFile,
  getFileExtension,
  getFileTypeIcon,
} from './fileUtils';

// UI utilities
export {
  debounce,
  throttle,
  scrollIntoView,
  scrollToBottom,
  focusElement,
  closeAllPopovers,
  getScrollPosition,
  isAtBottom,
  nextFrame,
  showNotification,
  formatRelativeTime,
} from './uiUtils';
