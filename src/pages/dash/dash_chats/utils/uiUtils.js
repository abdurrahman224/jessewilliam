/**
 * UI Utilities
 * Common UI interactions and DOM operations
 */

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;

  return (...args) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan)
      );
    }
  };
};

/**
 * Scroll element into view smoothly
 */
export const scrollIntoView = (element, options = {}) => {
  if (!element) return;

  const defaultOptions = {
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
    ...options,
  };

  if (element.scrollIntoView) {
    element.scrollIntoView(defaultOptions);
  } else {
    element.scroll({ behavior: defaultOptions.behavior });
  }
};

/**
 * Scroll to bottom of element
 */
export const scrollToBottom = (ref, smooth = true) => {
  if (!ref || !ref.current) return;

  const element = ref.current;
  const behavior = smooth ? 'smooth' : 'auto';

  if (element.scrollIntoView) {
    element.scrollIntoView({ behavior, block: 'end' });
  } else {
    element.scrollTop = element.scrollHeight;
  }
};

/**
 * Focus element
 */
export const focusElement = (element) => {
  if (element && element.focus) {
    element.focus();
  }
};

/**
 * Close all dropdowns/modals
 */
export const closeAllPopovers = () => {
  document.querySelectorAll('[role="dialog"]').forEach((el) => {
    if (el.close) el.close();
  });
};

/**
 * Get scroll position
 */
export const getScrollPosition = (element) => {
  if (!element) return { top: 0, left: 0 };

  return {
    top: element.scrollTop,
    left: element.scrollLeft,
  };
};

/**
 * Check if element is at bottom
 */
export const isAtBottom = (element, threshold = 100) => {
  if (!element) return false;

  return element.scrollHeight - element.clientHeight - element.scrollTop < threshold;
};

/**
 * Request animation frame with promise
 */
export const nextFrame = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

/**
 * Show toast notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, warning, error)
 * @param {number} duration - Duration in ms
 */
export const showNotification = (message, type = 'info', duration = 3000) => {
  console.log(`[${type.toUpperCase()}] ${message}`);
};

/**
 * Format relative time
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
