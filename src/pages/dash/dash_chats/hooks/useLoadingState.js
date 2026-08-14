/**
 * useLoadingState Hook
 * Manages loading states for different chat operations
 */

import { useState, useCallback } from 'react';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Set loading state with optional callback
   */
  const setLoading = useCallback((value, callback) => {
    setIsLoading(value);
    if (callback) callback();
  }, []);

  /**
   * Set sending state
   */
  const setSending = useCallback((value) => {
    setIsSending(value);
  }, []);

  /**
   * Set error state
   */
  const setErrorState = useCallback((errorMessage) => {
    setError(errorMessage);
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check any loading state
   */
  const isAnyLoading = useCallback(() => {
    return isLoading || isSending;
  }, [isLoading, isSending]);

  return {
    isLoading,
    setLoading,
    isSending,
    setSending,
    error,
    setErrorState,
    clearError,
    isAnyLoading,
  };
};
