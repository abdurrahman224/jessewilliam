/**
 * useChatSession Hook
 * Manages chat session state and operations
 */

import { useState, useCallback, useRef } from 'react';
import { isSessionValid } from '../utils/sessionUtils';

export const useChatSession = () => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const pendingSessionRef = useRef(null);

  /**
   * Create new session
   */
  const createSession = useCallback((newSessionId) => {
    if (!isSessionValid(newSessionId)) {
      throw new Error('Invalid session ID');
    }
    setSessionId(newSessionId);
    pendingSessionRef.current = null;
  }, []);

  /**
   * Clear current session
   */
  const clearSession = useCallback(() => {
    setSessionId(null);
    pendingSessionRef.current = null;
  }, []);

  /**
   * Check if session exists
   */
  const hasSession = useCallback(() => {
    return isSessionValid(sessionId);
  }, [sessionId]);

  /**
   * Set pending session promise
   */
  const setPendingSession = useCallback((promise) => {
    pendingSessionRef.current = promise;
  }, []);

  /**
   * Get pending session promise
   */
  const getPendingSession = useCallback(() => {
    return pendingSessionRef.current;
  }, []);

  /**
   * Clear pending session
   */
  const clearPendingSession = useCallback(() => {
    pendingSessionRef.current = null;
  }, []);

  /**
   * Check if session creation is pending
   */
  const isSessionPending = useCallback(() => {
    return pendingSessionRef.current !== null;
  }, []);

  return {
    sessionId,
    setSessionId,
    sessionLoading,
    setSessionLoading,
    createSession,
    clearSession,
    hasSession,
    setPendingSession,
    getPendingSession,
    clearPendingSession,
    isSessionPending,
    pendingSessionRef,
  };
};
