# Chat Module Architecture

A refactored, scalable, and maintainable chat module with proper separation of concerns.

## 📁 Directory Structure

```
dash_chats/
├── components/          # React UI components
│   ├── AIMessage.jsx
│   ├── ChatHeader.jsx
│   ├── ChatInput.jsx
│   ├── EmptyState.jsx
│   ├── FileDownloadCard.jsx
│   ├── LoadingIndicator.jsx
│   ├── MessageActions.jsx
│   ├── MessageList.jsx
│   ├── StatusIndicator.jsx
│   ├── UpgradeModal.jsx
│   └── UserMessage.jsx
│
├── hooks/               # Custom React hooks
│   ├── index.js
│   ├── useChat.js          # Message management
│   ├── useChatSession.js   # Session operations
│   ├── useChatStreaming.js # Streaming state
│   └── useLoadingState.js  # Loading states
│
├── services/            # API service layer
│   └── chatService.js      # Centralized API calls
│
├── utils/               # Utility functions
│   ├── fileUtils.js        # File operations
│   ├── messageUtils.js     # Message transformations
│   ├── sessionUtils.js     # Session helpers
│   └── uiUtils.js          # UI helpers
│
├── constants.js         # Constants & config
├── AIChatView.jsx      # Main AI Chat container
├── NewChat.jsx         # New Chat view
└── markdown.css        # Markdown styles
```

## 🎯 Key Principles

### 1. **Separation of Concerns**

- **Components**: Pure UI rendering
- **Hooks**: State management and side effects
- **Services**: API communication
- **Utils**: Pure functions and helpers
- **Constants**: Configuration and strings

### 2. **Scalability**

- Each hook is single-responsibility
- Services abstract API complexity
- Utilities are reusable across components
- Constants centralize configuration

### 3. **Maintainability**

- Clear file organization
- Consistent naming conventions
- Self-documenting code structure
- Centralized error handling

### 4. **Testability**

- Pure utility functions are easy to test
- Hooks can be tested independently
- Services mock API calls easily
- Components receive props, not singletons

## 🔧 Custom Hooks

### `useChat()`

Manages chat messages and operations.

```javascript
const {
  messages,
  input,
  setInput,
  initializeMessages,
  addMessage,
  updateMessage,
  clearMessages,
  hasMessages,
} = useChat();
```

**Methods:**

- `addMessage(message)` - Add new message to chat
- `updateMessage(messageId, updates)` - Update message content
- `removeMessage(messageId)` - Remove a message
- `clearMessages()` - Clear all messages
- `getLastMessage()` - Get last message
- `getMessageCount()` - Get total messages

### `useChatSession()`

Manages session state and pending operations.

```javascript
const {
  sessionId,
  sessionLoading,
  setSessionLoading,
  createSession,
  clearSession,
  hasSession,
  isSessionPending,
} = useChatSession();
```

### `useChatStreaming()`

Manages streaming state for real-time responses.

```javascript
const {
  isStreaming,
  isThinking,
  startStreaming,
  stopStreaming,
  addToBuffer,
  getBufferContent,
  clearBuffer,
  getAbortSignal,
} = useChatStreaming();
```

### `useLoadingState()`

Manages various loading states.

```javascript
const { isLoading, isHistoryLoading, isSending, error, setErrorState, clearError, isAnyLoading } =
  useLoadingState();
```

## 🚀 Services

### `chatService.js`

All API calls are centralized here.

**Key Functions:**

```javascript
// Load session messages
await loadSessionMessages(sessionId, signal);

// Create or continue session
await createOrContinueSession(message, sessionId, agentType);

// Save assistant response
await saveAssistantResponse(sessionId, response, fileData);

// Submit rating
await submitMessageRating(messageIndex, rating, userMessage, aiResponse);

// Stream response
await streamChatResponse(sessionId, message, onChunk, onError, abortSignal);

// Delete session
await deleteSession(sessionId);

// Get all sessions
await getAllSessions(signal);

// Update session
await updateSession(sessionId, data);
```

## 📦 Utilities

### `messageUtils.js`

- `transformMessage()` - Convert API message to UI format
- `transformMessageList()` - Transform multiple messages
- `createUserMessage()` - Create user message object
- `createAssistantMessage()` - Create assistant message
- `isMessageComplete()` - Validate message completeness

### `sessionUtils.js`

- `createSessionObject()` - Build session payload
- `isSessionValid()` - Validate session ID
- `getSessionDisplayName()` - Get session name
- `sortSessionsByDate()` - Sort sessions

### `fileUtils.js`

- `handleFileDownload()` - Download file
- `copyToClipboard()` - Copy text
- `encodeFileToBase64()` - Encode file
- `validateFile()` - Validate file size/type

### `uiUtils.js`

- `debounce()` - Debounce function
- `throttle()` - Throttle function
- `scrollToBottom()` - Auto-scroll
- `formatRelativeTime()` - Format timestamps

## ⚙️ Constants

All hardcoded values are in `constants.js`:

```javascript
// API endpoints
CHAT_API_ENDPOINTS;

// Status values
CHAT_STATUS;

// Message roles
MESSAGE_ROLES;

// Agent types
AGENT_TYPES;

// UI messages
UI_MESSAGES;

// UI strings
UI_STRINGS;

// Storage keys
STORAGE_KEYS;
```

## 🔄 Typical Component Usage

```javascript
import { useChat, useChatSession, useChatStreaming, useLoadingState } from '../hooks';
import { loadSessionMessages, createOrContinueSession } from '../services/chatService';
import { MESSAGE_ROLES } from '../constants';

function ChatComponent() {
  const { messages, addMessage, updateMessage } = useChat();
  const { sessionId, createSession } = useChatSession();
  const { isStreaming, startStreaming, stopStreaming } = useChatStreaming();
  const { isLoading, setLoading, error } = useLoadingState();

  const handleSend = async (text) => {
    // Add user message
    addMessage({ role: MESSAGE_ROLES.USER, content: text });

    // Create session if needed
    const response = await createOrContinueSession(text, sessionId);
    if (!sessionId && response.session?.id) {
      createSession(response.session.id);
    }

    // Start streaming
    startStreaming();
    // ... handle streaming ...
    stopStreaming();
  };

  return <div>{/* Components use state from hooks */}</div>;
}
```

## ✅ Benefits

1. **Readability**: Clear structure, easy to understand
2. **Scalability**: Add new features without breaking existing code
3. **Maintainability**: Changes are localized to appropriate files
4. **Testability**: Each layer can be tested independently
5. **Reusability**: Hooks and utilities used across components
6. **Performance**: Optimized re-renders with proper state management
7. **Error Handling**: Centralized error management

## 🎓 Best Practices

1. **Always use hooks** for state management
2. **Centralize API calls** in services
3. **Extract pure functions** to utils
4. **Keep constants** in one place
5. **Components focus on UI** rendering only
6. **Use proper error handling** with try-catch
7. **Clean up resources** in useEffect return
8. **Memoize callbacks** with useCallback
9. **Debounce heavy operations** with debounce utility
10. **Handle loading and error states** consistently

## 📝 Migration Guide

To migrate existing components:

1. Extract state management → Custom hooks
2. Extract API calls → Service layer
3. Extract pure logic → Utils
4. Extract configuration → Constants
5. Keep only rendering logic in components
6. Import from centralized hooks/services

## 🐛 Debugging

Enable detailed logging by setting in your component:

```javascript
const DEBUG = true;

if (DEBUG) {
  console.log('Chat state:', { messages, sessionId, isStreaming });
}
```

## 📚 Additional Resources

- React Hooks Documentation: https://react.dev/reference/react/hooks
- Custom Hooks Guide: https://react.dev/learn/reusing-logic-with-custom-hooks
- Testing Library: https://testing-library.com/
