/**
 * useChatStreaming Hook
 * Manages streaming state and operations for chat responses
 */

import { useState, useCallback, useRef } from 'react';

export const useChatStreaming = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const abortControllerRef = useRef(null);
  const streamingBufferRef = useRef('');
  const streamingUpdateRef = useRef(null);

  /**
   * Start streaming
   */
  const startStreaming = useCallback(() => {
    setIsStreaming(true);
    abortControllerRef.current = new AbortController();
  }, []);

  /**
   * Stop streaming
   */
  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    streamingBufferRef.current = '';

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    if (streamingUpdateRef.current) {
      cancelAnimationFrame(streamingUpdateRef.current);
      streamingUpdateRef.current = null;
    }
  }, []);

  /**
   * Add chunk to buffer
   */
  const addToBuffer = useCallback((chunk) => {
    streamingBufferRef.current += chunk;
  }, []);

  /**
   * Get buffer content
   */
  const getBufferContent = useCallback(() => {
    return streamingBufferRef.current;
  }, []);

  /**
   * Clear buffer
   */
  const clearBuffer = useCallback(() => {
    streamingBufferRef.current = '';
  }, []);

  /**
   * Set animation frame ref
   */
  const setUpdateRef = useCallback((ref) => {
    streamingUpdateRef.current = ref;
  }, []);

  /**
   * Get abort signal
   */
  const getAbortSignal = useCallback(() => {
    return abortControllerRef.current?.signal;
  }, []);

  /**
   * Check if streaming
   */
  const checkIsStreaming = useCallback(() => {
    return isStreaming;
  }, [isStreaming]);

  return {
    isStreaming,
    setIsStreaming,
    isThinking,
    setIsThinking,
    startStreaming,
    stopStreaming,
    addToBuffer,
    getBufferContent,
    clearBuffer,
    setUpdateRef,
    getAbortSignal,
    checkIsStreaming,
    abortControllerRef,
    streamingBufferRef,
    streamingUpdateRef,
  };
};
