/**
 * useChat Hook
 * Manages chat messages state and operations
 */

import { useState, useCallback, useRef } from 'react';
import { transformMessageList } from '../utils/messageUtils';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messageIdRef = useRef(0);

  /**
   * Initialize messages from session data
   */
  const initializeMessages = useCallback((sessionMessages) => {
    messageIdRef.current = 0;
    const transformed = transformMessageList(sessionMessages, messageIdRef);
    setMessages(transformed);
  }, []);

  /**
   * Add a new message
   */
  const addMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  /**
   * Remove message by id
   */
  const removeMessage = useCallback((messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  }, []);

  /**
   * Update message content
   */
  const updateMessage = useCallback((messageId, updates) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg)));
  }, []);

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setInput('');
    messageIdRef.current = 0;
  }, []);

  /**
   * Get last message
   */
  const getLastMessage = useCallback(() => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  }, [messages]);

  /**
   * Get message count
   */
  const getMessageCount = useCallback(() => {
    return messages.length;
  }, [messages]);

  /**
   * Check if has messages
   */
  const hasMessages = useCallback(() => {
    return messages.length > 0;
  }, [messages]);

  return {
    messages,
    setMessages,
    input,
    setInput,
    initializeMessages,
    addMessage,
    removeMessage,
    updateMessage,
    clearMessages,
    getLastMessage,
    getMessageCount,
    hasMessages,
    messageIdRef,
  };
};
