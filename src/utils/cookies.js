import Cookies from 'js-cookie';

const DEFAULT_OPTIONS = {
  path: '/',
  sameSite: 'strict',
};

/**
 * Set cookie
 */
export const setCookie = (key, value, options = {}) => {
  Cookies.set(key, value, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
};

/**
 * Get cookie
 */
export const getCookie = (key) => {
  return Cookies.get(key);
};

/**
 * Get cookie (JSON safe)
 */
export const getCookieJSON = (key) => {
  const value = Cookies.get(key);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

/**
 * Remove cookie
 */
export const removeCookie = (key, options = {}) => {
  Cookies.remove(key, {
    path: '/',
    ...options,
  });
};
