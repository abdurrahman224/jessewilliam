/**
 * Chat Service
 * Centralized API service for all chat-related operations
 */

import { getCookie } from '../../../utils/cookies';
import { API_CONFIG } from '../../../config/constants';
import { CHAT_API_ENDPOINTS, AGENT_TYPES } from '../utils/constants';
import { createSessionObject } from '../utils/sessionUtils';

const BASE_URL = API_CONFIG.BASE_URL || '';

/**
 * Get authentication token
 */
const getToken = () => {
  return getCookie('app_token') || localStorage.getItem('token');
};

/**
 * Build request headers with authentication
 */
const buildHeaders = (isJson = true) => {
  const headers = {
    'Content-Type': isJson ? 'application/json' : 'application/octet-stream',
    Authorization: `Bearer ${getToken()}`,
  };

  return headers;
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Load chat session messages
 */
export const loadSessionMessages = async (sessionId, signal) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.MESSAGES(sessionId)}`;

    const response = await fetch(url, {
      headers: buildHeaders(),
      signal,
    });

    return await handleResponse(response);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw error;
  }
};

/**
 * Create or continue session with user message
 */
export const createOrContinueSession = async (
  message,
  sessionId = null,
  agentType = AGENT_TYPES.DEFAULT
) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.SESSIONS}`;
    const payload = createSessionObject(sessionId, message, agentType);

    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to create/continue session: ${error.message}`);
  }
};

/**
 * Save assistant response
 */
export const saveAssistantResponse = async (sessionId, response, fileData = null) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.RESPONSE(sessionId)}`;
    const payload = {
      response,
      hasFile: !!fileData,
      ...(fileData && { fileData }),
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    return await handleResponse(apiResponse);
  } catch (error) {
    throw new Error(`Failed to save response: ${error.message}`);
  }
};

/**
 * Submit message rating
 */
export const submitMessageRating = async (messageIndex, rating, userMessage, aiResponse) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.RATING(messageIndex)}`;
    const payload = {
      rating,
      userMessage,
      aiResponse,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to submit rating: ${error.message}`);
  }
};

/**
 * Stream chat response
 */
export const streamChatResponse = async (sessionId, message, onChunk, onError, abortSignal) => {
  const url = `${BASE_URL}/api/chat/stream`;
  const payload = {
    sessionId,
    message,
    stream: true,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(payload),
      signal: abortSignal,
    });

    if (!response.ok) {
      throw new Error(`Stream error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }

    // Final chunk
    const finalChunk = decoder.decode();
    if (finalChunk) {
      onChunk(finalChunk);
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      onError(error);
    }
  }
};

/**
 * Delete session
 */
export const deleteSession = async (sessionId) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.SESSIONS}/${sessionId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: buildHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to delete session: ${error.message}`);
  }
};

/**
 * Get all sessions
 */
export const getAllSessions = async (signal) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.SESSIONS}`;

    const response = await fetch(url, {
      headers: buildHeaders(),
      signal,
    });

    return await handleResponse(response);
  } catch (error) {
    if (error.name === 'AbortError') {
      return null;
    }
    throw new Error(`Failed to fetch sessions: ${error.message}`);
  }
};

/**
 * Update session
 */
export const updateSession = async (sessionId, data) => {
  try {
    const url = `${BASE_URL}${CHAT_API_ENDPOINTS.SESSIONS}/${sessionId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: buildHeaders(),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to update session: ${error.message}`);
  }
};
