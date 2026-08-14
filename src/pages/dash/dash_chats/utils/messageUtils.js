/**
 * Message Utilities
 * Functions for processing, transforming, and handling chat messages
 */

import { MESSAGE_ROLES } from './constants';

/**
 * Transform API message to UI format
 */
export const transformMessage = (msg, index, messageIdRef) => {
  const fileData = msg.fileData?.data;
  const fileName = msg.fileData?.name;
  const mimeType = msg.fileData?.mimeType;
  const hasFileData = !!(fileData && fileName);

  return {
    id: `msg-${msg._id || index}-${messageIdRef.current++}`,
    role: msg.role,
    content: msg.content,
    userMessage: undefined, // Will be populated separately
    messageIndex: msg.messageIndex || index,
    hasFile: msg.hasFile || hasFileData,
    fileData: fileData,
    fileName: fileName,
    mimeType: mimeType,
    isFile: msg.hasFile || hasFileData,
    timestamp: msg.timestamp || new Date().toISOString(),
  };
};

/**
 * Transform messages list with user message associations
 */
export const transformMessageList = (messages, messageIdRef) => {
  const transformed = messages.map((msg, idx) => transformMessage(msg, idx, messageIdRef));

  // Associate user messages with assistant messages
  return transformed.map((msg) => {
    if (msg.role === MESSAGE_ROLES.ASSISTANT) {
      const userMsg = messages.find(
        (m) => m.messageIndex === msg.messageIndex - 1 && m.role === MESSAGE_ROLES.USER
      );
      msg.userMessage = userMsg?.content;
    }
    return msg;
  });
};

/**
 * Build message object for API
 */
export const buildMessageObject = (role, content, fileData = null) => {
  return {
    role,
    content,
    timestamp: new Date().toISOString(),
    ...(fileData && { fileData }),
  };
};

/**
 * Create user message object
 */
export const createUserMessage = (content, fileData = null) => {
  return buildMessageObject(MESSAGE_ROLES.USER, content, fileData);
};

/**
 * Create assistant message object
 */
export const createAssistantMessage = (content, fileData = null) => {
  return buildMessageObject(MESSAGE_ROLES.ASSISTANT, content, fileData);
};

/**
 * Format message for display
 */
export const formatMessageForDisplay = (message) => {
  return {
    ...message,
    content: message.content?.trim() || '',
  };
};

/**
 * Check if message is complete
 */
export const isMessageComplete = (message) => {
  return message && message.content && typeof message.content === 'string';
};

/**
 * Get message by index
 */
export const getMessageByIndex = (messages, index) => {
  return messages.find((msg) => msg.messageIndex === index);
};

/**
 * Filter messages by role
 */
export const filterMessagesByRole = (messages, role) => {
  return messages.filter((msg) => msg.role === role);
};
