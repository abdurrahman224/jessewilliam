/**
 * Session Utilities
 * Functions for session management and operations
 */

/**
 * Create session object
 */
export const createSessionObject = (sessionId, message, agentType) => {
  return {
    sessionId: sessionId || null,
    message,
    agentType,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Parse session from API response
 */
export const parseSessionFromResponse = (data) => {
  if (!data.success || !data.session) {
    throw new Error('Invalid session response');
  }

  return {
    id: data.session.id,
    createdAt: data.session.createdAt,
    updatedAt: data.session.updatedAt,
    messageCount: data.session.messageCount || 0,
  };
};

/**
 * Get session display name
 */
export const getSessionDisplayName = (session, messages) => {
  if (!messages || messages.length === 0) {
    return 'New Chat';
  }

  const firstUserMessage = messages.find((msg) => msg.role === 'user');
  return firstUserMessage?.content.substring(0, 50) || 'Chat Session';
};

/**
 * Check if session is valid
 */
export const isSessionValid = (sessionId) => {
  return sessionId && typeof sessionId === 'string' && sessionId.trim().length > 0;
};

/**
 * Compare sessions for equality
 */
export const areSessionsEqual = (session1, session2) => {
  return session1?.id === session2?.id;
};

/**
 * Sort sessions by date
 */
export const sortSessionsByDate = (sessions, ascending = false) => {
  return [...sessions].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt);
    const dateB = new Date(b.updatedAt || b.createdAt);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};
