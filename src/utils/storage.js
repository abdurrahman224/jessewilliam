// storage.js
import { STORAGE_KEYS } from '../config/constants';

/**
 * Base helpers
 */
const getItem = (key, parser = false) => {
  try {
    const value = localStorage.getItem(key);

    if (!value || value === 'undefined') {
      return null;
    }

    return parser ? JSON.parse(value) : value;
  } catch (error) {
    console.error(`storage error for key: ${key}`, error);
    return null;
  }
};

const setItem = (key, value, stringify = false) => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : String(value));
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

/**
 * Token helpers
 */
export const getToken = () => getItem(STORAGE_KEYS.TOKEN);
export const setToken = (token) => setItem(STORAGE_KEYS.TOKEN, token);
export const removeToken = () => removeItem(STORAGE_KEYS.TOKEN);

/**
 * User helpers
 */
export const getUser = () => getItem(STORAGE_KEYS.USER, true);
export const setUser = (user) => setItem(STORAGE_KEYS.USER, user, true);
export const removeUser = () => removeItem(STORAGE_KEYS.USER);

/**
 * Email verification helpers
 */
export const isEmailVerified = () => getItem(STORAGE_KEYS.EMAIL_VERIFIED_KEY) === 'true';
export const setEmailVerified = (value) => setItem(STORAGE_KEYS.EMAIL_VERIFIED_KEY, value);
export const removeEmailVerified = () => removeItem(STORAGE_KEYS.EMAIL_VERIFIED_KEY);

/**
 * Onboarding helpers
 */
export const getOnboarding = () => getItem(STORAGE_KEYS.ONBOARDING, true);
export const setOnboarding = (value) => setItem(STORAGE_KEYS.ONBOARDING, value);
export const removeOnboarding = () => removeItem(STORAGE_KEYS.ONBOARDING);

/**
 * investment helpers
 */

export const getInvestmentPlan = () => getItem(STORAGE_KEYS.INVESTMENT_PLAN, true);
export const setInvestmentPlan = (value) => setItem(STORAGE_KEYS.INVESTMENT_PLAN, value);
export const removeInvestmentPlan = () => removeItem(STORAGE_KEYS.INVESTMENT_PLAN);

/**
 * Upgrade prompt helpers (persists across refresh for mid-flow recovery)
 */
export const getUpgradePrompt = () => getItem(STORAGE_KEYS.UPGRADE_PROMPT) === 'true';
export const setUpgradePrompt = () => setItem(STORAGE_KEYS.UPGRADE_PROMPT, 'true');
export const removeUpgradePrompt = () => removeItem(STORAGE_KEYS.UPGRADE_PROMPT);

/**
 * Clear all auth-related storage
 */
export const clearStorage = () => {
  Object.values(STORAGE_KEYS).forEach(removeItem);
};
