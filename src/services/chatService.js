// chatService.js

import { POST, DELETE, PATCH, GET } from './httpMethods';
import { ENDPOINT } from './httpEndpoint';

/**
 * Create or continue a chat session with user message
 * Backend: POST /api/chat/sessions
 */
export const createOrContinueSession = async (sessionId, message, agentType = 'deal-hunter') => {
  try {
    const response = await POST(ENDPOINT.PRIVATE.CREATE_SESSION, {
      sessionId,
      message,
      agentType,
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to create/continue session:', error);
    throw error;
  }
};

/**
 * Save AI response to existing session
 * Backend: POST /api/chat/sessions/:sessionId/response
 */
export const saveAIResponse = async (sessionId, response, fileData = null) => {
  try {
    const endpoint = ENDPOINT.PRIVATE.SAVE_AI_RESPONSE.replace(':sessionId', sessionId);
    
    const result = await POST(endpoint, {
      response,
      hasFile: !!fileData,
      fileData,
    });
    
    return result.data;
  } catch (error) {
    console.error('Failed to save AI response:', error);
    throw error;
  }
};

/**
 * Get session messages
 * Backend: GET /api/chat/sessions/:sessionId/messages
 */
export const getSessionMessages = async (sessionId) => {
  try {
    const endpoint = ENDPOINT.PRIVATE.GET_SESSION_MESSAGES.replace(':sessionId', sessionId);
    const response = await GET(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to get session messages:', error);
    throw error;
  }
};

/**
 * Get all user sessions
 * Backend: GET /api/chat/sessions?limit=50
 */
export const getSessions = async (limit = 50) => {
  try {
    const response = await GET(ENDPOINT.PRIVATE.GET_SESSION_LIST, { limit });
    return response.data;
  } catch (error) {
    console.error('Failed to get sessions:', error);
    throw error;
  }
};

/**
 * Save feedback rating (thumbs up/down)
 * Backend: POST /api/ai/feedback
 */
export const saveFeedback = async (sessionId, messageIndex, rating, userMessage, aiResponse) => {
  try {
    const response = await POST(ENDPOINT.PRIVATE.FEEDBACK, {
      sessionId,
      messageIndex,
      rating,
      userMessage,
      aiResponse,
      agentType: 'deal-hunter',
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to save feedback:', error);
    throw error;
  }
};

/**
 * Pin/unpin a chat session
 * Backend: PATCH /api/chat/sessions/:sessionId/pin
 */
export const togglePinSession = async (sessionId) => {
  try {
    const endpoint = ENDPOINT.PRIVATE.PIN_SESSION.replace(':sessionId', sessionId);
    const response = await PATCH(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to toggle pin:', error);
    throw error;
  }
};

/**
 * Update session title
 * Backend: PATCH /api/chat/sessions/:sessionId/title
 */
export const updateSessionTitle = async (sessionId, title) => {
  try {
    const endpoint = ENDPOINT.PRIVATE.UPDATE_SESSION_TITLE.replace(':sessionId', sessionId);
    const response = await PATCH(endpoint, { title });
    return response.data;
  } catch (error) {
    console.error('Failed to update session title:', error);
    throw error;
  }
};

/**
 * Delete a chat session
 * Backend: DELETE /api/chat/sessions/:sessionId
 */
export const deleteSession = async (sessionId) => {
  try {
    const endpoint = ENDPOINT.PRIVATE.DELETE_SESSION.replace(':sessionId', sessionId);
    const response = await DELETE(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to delete session:', error);
    throw error;
  }
};

/**
 * Send message to AI (streaming or file response)
 * Backend: POST /api/ai/chat
 */
export const sendAIMessage = async (message, sessionId, useWebSearch = true, agentType = 'deal-hunter') => {
  try {
    const response = await POST(ENDPOINT.PRIVATE.SEND_AI_MESSAGE, {
      message,
      sessionId,
      useWebSearch,
      agentType,
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to send AI message:', error);
    throw error;
  }
};