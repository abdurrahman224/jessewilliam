// AIChatView.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './markdown.css';

import { getCurrentTime } from '../../../utils/Helper';
import { setLoading, setSelectedChatId, setSessionsList } from '../../../features/chat/aiChatSlice';

import { API_CONFIG } from '../../../config/constants';
import { getCookie } from '../../../utils/cookies';

import MessageActions from './components/MessageActions';
import FileDownloadCard from './components/FileDownloadCard';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import UpgradeModal from '../../../layout/dash/components/UpgradeModal';

const AIChatView = () => {
  const { loading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const bottomRef = useRef(null);
  const abortControllerRef = useRef(null);
  const messageIdRef = useRef(0);
  const pendingSessionRef = useRef(null);
  const refreshTimeoutRef = useRef(null);
  const streamingBufferRef = useRef('');
  const streamingUpdateRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();

  const currentPlan = user?.subscription?.plan || 'Free';

  // ===================================================
  // CLEANUP ON UNMOUNT (FIX #1, #3, #10)
  // ===================================================
  useEffect(() => {
    return () => {
      // Abort any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      // Clear refresh timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      // Cancel pending animation frame
      if (streamingUpdateRef.current) {
        cancelAnimationFrame(streamingUpdateRef.current);
      }
    };
  }, []);

  // ===================================================
  // LOAD SESSION FROM DATABASE (FIX #2)
  // ===================================================
  useEffect(() => {
    const abortController = new AbortController();
    const loadSession = async () => {
      if (!chatId) {
        setMessages([]);
        setSessionId(null);
        dispatch(setSelectedChatId(null));
        return;
      }

      try {
        setSessionId(chatId);
        dispatch(setSelectedChatId(chatId));

        const token = getCookie('app_token') || localStorage.getItem('token');

        const response = await fetch(
          `${API_CONFIG.BASE_URL}/api/chat/sessions/${chatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error('Failed to load history');
        }

        const data = await response.json();

        if (data.success && data.messages) {
          const loadedMessages = data.messages.map((msg, idx) => {
            const fileData = msg.fileData?.data;
            const fileName = msg.fileData?.name;
            const mimeType = msg.fileData?.mimeType;
            const hasFileData = !!(fileData && fileName);

            return {
              id: `msg-${msg._id || idx}-${messageIdRef.current++}`,
              role: msg.role,
              content: msg.content,
              userMessage:
                msg.role === 'assistant'
                  ? data.messages.find(
                      (m) => m.messageIndex === msg.messageIndex - 1 && m.role === 'user'
                    )?.content
                  : undefined,
              messageIndex: msg.messageIndex || idx,
              hasFile: msg.hasFile || hasFileData,
              fileData: fileData,
              fileName: fileName,
              mimeType: mimeType,
              isFile: msg.hasFile || hasFileData,
            };
          });

          setMessages(loadedMessages);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        console.error('❌ Failed to load session:', error);
        setMessages([]);
      } finally {
        // Cleanup handled by abort controller
      }
    };

    loadSession();
    return () => {
      abortController.abort();
    };
  }, [chatId, dispatch]);

  // ===================================================
  // SAVE MESSAGE TO DATABASE
  // ===================================================
  const saveMessageToDB = async (message, role, fileData = null, explicitSessionId = null) => {
    try {
      const token = getCookie('app_token') || localStorage.getItem('token');

      // Use explicit sessionId if provided, otherwise use state
      const currentSessionId = explicitSessionId || sessionId;

      if (role === 'user') {
        // FIX #6: Prevent duplicate session creation
        if (!currentSessionId && pendingSessionRef.current) {
          return await pendingSessionRef.current;
        }

        if (!currentSessionId) {
          pendingSessionRef.current = (async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                sessionId: null,
                message,
                agentType: 'deal-hunter',
              }),
            });

            const data = await response.json();

            if (data.success) {
              const newSessionId = data.session.id;
              setSessionId(newSessionId);
              dispatch(setSelectedChatId(newSessionId));
              navigate(`/dash/gpt/${newSessionId}`, { replace: true });
              debouncedRefreshSessionsList();
              pendingSessionRef.current = null;
              return newSessionId;
            }

            pendingSessionRef.current = null;
            return null;
          })();

          return await pendingSessionRef.current;
        }

        // Session already exists, just save message
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId: currentSessionId,
            message,
            agentType: 'deal-hunter',
          }),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to save message');
        }
        return currentSessionId;
      } else if (role === 'assistant') {
        await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions/${currentSessionId}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            response: message,
            hasFile: !!fileData,
            fileData,
          }),
        });

        debouncedRefreshSessionsList();
      }
    } catch (error) {
      console.error('❌ Failed to save message to database:', error);
      throw error;
    }
  };

  // ===================================================
  // REFRESH SESSIONS LIST (FIX #10)
  // ===================================================
  const refreshSessionsList = async () => {
    try {
      const token = getCookie('app_token') || localStorage.getItem('token');

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat/sessions?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.sessions) {
        dispatch(setSessionsList(data.sessions));
      }
    } catch (error) {
      console.error('❌ Failed to refresh sessions list:', error);
    }
  };

  const debouncedRefreshSessionsList = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    refreshTimeoutRef.current = setTimeout(() => {
      refreshSessionsList();
    }, 2000);
  };

  // ===================================================
  // SCROLL TO BOTTOM (FIX #8)
  // ===================================================
  useEffect(() => {
    if (bottomRef.current) {
      const scrollTimer = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [messages]);

  // ===================================================
  // SEND MESSAGE - SHOW LOADING IMMEDIATELY
  // ===================================================
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const currentInput = input.trim();
    setInput('');

    // Set loading to true immediately
    dispatch(setLoading(true));

    // Create user message
    const userMessage = {
      id: `msg-user-${Date.now()}-${messageIdRef.current++}`,
      role: 'user',
      content: currentInput,
      time: getCurrentTime(),
    };

    // Create status message
    const statusMessage = {
      id: `status-${Date.now()}-${messageIdRef.current++}`,
      role: 'assistant',
      content: 'Searching the web and analyzing...',
      isStatus: true,
    };

    // Add messages to UI
    setMessages((prev) => [...prev, userMessage, statusMessage]);

    let currentSessionId = null;

    try {
      // Save user message to DB
      try {
        currentSessionId = await saveMessageToDB(currentInput, 'user');
        if (!sessionId && currentSessionId) {
          setSessionId(currentSessionId);
        }
      } catch (saveError) {
        console.error('Failed to save user message:', saveError);
        // Don't set loading false here - continue with the API call
      }

      const token = getCookie('app_token') || localStorage.getItem('token');

      // Setup abort controller
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const effectiveSessionId = currentSessionId || `temp_${Date.now()}`;

      // Make API call
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: currentInput,
          sessionId: effectiveSessionId,
          agentType: 'deal-hunter',
        }),
        signal: abortControllerRef.current.signal,
      });

      // Check for rate limit
      if (response.status === 429) {
        setMessages((prev) => [
          ...prev.filter((m) => !m.isStatus),
          {
            id: `error-${Date.now()}-${messageIdRef.current++}`,
            role: 'assistant',
            content: "Your current plan's usage limit has been reached.",
            time: getCurrentTime(),
            isRateLimitError: true,
          },
        ]);
        setShowUpgradeModal(true);
        abortControllerRef.current = null;
        dispatch(setLoading(false)); // Only set false on error
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      // Remove status message
      setMessages((prev) => prev.filter((m) => !m.isStatus));

      // Handle JSON response (file generation)
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (data.response || (data.fileGenerated && data.file)) {
          const fileData = data.file?.data;
          const fileName = data.file?.name;
          const mimeType =
            data.file?.mimeType ||
            (fileName?.endsWith('.xlsx')
              ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              : fileName?.endsWith('.docx')
                ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                : fileName?.endsWith('.pdf')
                  ? 'application/pdf'
                  : 'application/octet-stream');

          const hasFileData = !!(fileData && fileName);

          // Add assistant message
          setMessages((prev) => {
            const aiMessage = {
              id: `msg-assistant-${Date.now()}-${messageIdRef.current++}`,
              role: 'assistant',
              content: data.response || '',
              userMessage: currentInput,
              time: getCurrentTime(),
              messageIndex: prev.length,
              hasFile: data.fileGenerated || hasFileData,
              fileData: fileData,
              fileName: fileName,
              mimeType: mimeType,
              isFile: data.fileGenerated || hasFileData,
            };
            return [...prev, aiMessage];
          });

          // Save assistant response
          if (currentSessionId) {
            try {
              await saveMessageToDB(
                data.response || '',
                'assistant',
                hasFileData
                  ? {
                      data: fileData,
                      name: fileName,
                      mimeType: mimeType,
                    }
                  : null,
                currentSessionId
              );
            } catch (saveError) {
              console.error('Failed to save assistant response:', saveError);
            }
          }
        }

        abortControllerRef.current = null;
        dispatch(setLoading(false)); // Set loading false after complete
        return;
      }

      // Handle streaming response
      streamingBufferRef.current = '';

      // Add streaming message
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-assistant-streaming-${Date.now()}-${messageIdRef.current++}`,
          role: 'assistant',
          content: '',
          streaming: true,
          userMessage: currentInput,
          time: getCurrentTime(),
        },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedText += parsed.content;
                streamingBufferRef.current = accumulatedText;

                // Update UI with debounced animation frame
                if (streamingUpdateRef.current) {
                  cancelAnimationFrame(streamingUpdateRef.current);
                }

                streamingUpdateRef.current = requestAnimationFrame(() => {
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.streaming) {
                      lastMessage.content = streamingBufferRef.current;
                    }
                    return newMessages;
                  });
                });
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }

      // Final update - remove streaming flag
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.streaming) {
          delete lastMessage.streaming;
        }
        return newMessages;
      });

      // Save streaming response
      if (currentSessionId) {
        try {
          await saveMessageToDB(accumulatedText, 'assistant', null, currentSessionId);
        } catch (saveError) {
          console.error('Failed to save streaming response:', saveError);
        }
      }

      abortControllerRef.current = null;
      dispatch(setLoading(false)); // Set loading false after streaming complete
    } catch (error) {
      if (error.name === 'AbortError') {
        abortControllerRef.current = null;
        dispatch(setLoading(false)); // Set loading false on abort
        return;
      }

      console.error('Send message error:', error);

      setMessages((prev) =>
        prev
          .filter((m) => !m.isStatus)
          .concat({
            id: `error-${Date.now()}-${messageIdRef.current++}`,
            role: 'assistant',
            content: '❌ I apologize, but I encountered an error. Please try again.',
            time: getCurrentTime(),
            isError: true,
          })
      );

      abortControllerRef.current = null;
      dispatch(setLoading(false)); // Set loading false on error
    } finally {
      // Clear streaming references
      if (streamingUpdateRef.current) {
        cancelAnimationFrame(streamingUpdateRef.current);
        streamingUpdateRef.current = null;
      }
      streamingBufferRef.current = '';
    }
  };

  const handleEdit = (content) => {
    setInput(content);
    setTimeout(() => {
      document.getElementById('chat-input')?.focus();
    }, 100);
  };

  const handleRetry = (content) => {
    setInput(content);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  // ===================================================
  // RENDER
  // ===================================================
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <ChatHeader />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan}
      />

      <div
        className="w-full flex-1 overflow-y-auto py-6"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {messages.length === 0 ? (
          <EmptyState onPromptClick={handlePromptClick} />
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col space-y-3 px-2 sm:px-4 md:px-0 md:pb-8">
            {messages.map((msg, idx) => (
              <div key={msg.id || idx} className="flex flex-col">
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-2xl text-sm transition-all ${
                      msg.role === 'user'
                        ? 'max-w-[85%] bg-[#78a9f8] px-3 py-2 text-white sm:max-w-[75%] md:max-w-3xl'
                        : 'max-w-full px-2 py-2.5 sm:px-4 md:px-6'
                    }`}
                  >
                    {msg.content && (
                      <div className="chat-message-content prose prose-sm max-w-none wrap-break-word">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            table: ({ children, ...props }) => (
                              <div className="-webkit-overflow-scrolling-touch w-full max-w-full overflow-x-auto">
                                <table {...props} className="w-full">
                                  {children}
                                </table>
                              </div>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                    {msg.streaming && (
                      <span
                        className="inline-block h-4 w-0.5 animate-pulse rounded-xl bg-blue-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {!msg.streaming && !msg.isStatus && <FileDownloadCard message={msg} />}
                {!msg.streaming && !msg.isStatus && !msg.isError && !msg.isRateLimitError && (
                  <MessageActions
                    message={msg}
                    messageIndex={idx}
                    onEdit={handleEdit}
                    onRetry={handleRetry}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput input={input} setInput={setInput} isThinking={loading} onSend={sendMessage} />
    </div>
  );
};

export default AIChatView;
