// MessageActions.jsx
// Uses /api/ai/feedback endpoint (matches backend)

import React, { useState } from 'react';
import { Copy, Edit, RotateCcw, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { API_CONFIG } from '../../../../config/constants';
import { getCookie } from '../../../../utils/cookies';

const MessageActions = ({ message, messageIndex, onEdit, onRetry }) => {
  const { selectedChatId } = useSelector((state) => state.chat);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [localRating, setLocalRating] = useState(message.rating || null);

  const isCopied = copiedMessageId === messageIndex;

  // ===================================================
  // COPY TO CLIPBOARD
  // ===================================================
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(messageIndex);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy text');
    }
  };

  // ===================================================
  // HANDLE RATING (THUMBS UP/DOWN)
  // Backend: POST /api/ai/feedback
  // ===================================================
  const handleRating = async (rating) => {
    try {
      setLocalRating(rating); // Optimistic update

      const token = getCookie('app_token') || localStorage.getItem('token');

      // ✅ CORRECT: Backend route is /api/ai/feedback
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/ai/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: selectedChatId,
          messageIndex,
          rating,
          userMessage: message.userMessage || message.content,
          aiResponse: message.role === 'assistant' ? message.content : '',
          agentType: 'deal-hunter',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Failed to save feedback:', error);
      setLocalRating(null); // Revert on error
    }
  };

  return (
    <div
      className={`flex items-center gap-1 ${
        message.role === 'user' ? 'justify-end' : 'ml-0 justify-start md:ml-4'
      }`}
    >
      {/* USER MESSAGE ACTIONS */}
      {message.role === 'user' && (
        <>
          <button
            onClick={() => onEdit(message.content)}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Edit message"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            onClick={() => onRetry(message.content)}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Retry message"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={handleCopy}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Copy message"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </>
      )}

      {/* AI MESSAGE ACTIONS */}
      {message.role === 'assistant' && (
        <>
          <button
            onClick={handleCopy}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Copy response"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            onClick={() => handleRating('GOOD')}
            className={`rounded-lg p-2 transition-colors ${
              localRating === 'GOOD'
                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                : 'text-gray-500 hover:bg-gray-100 hover:text-green-600'
            }`}
            title="Good response"
          >
            <ThumbsUp className="h-4 w-4" fill={localRating === 'GOOD' ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={() => handleRating('BAD')}
            className={`rounded-lg p-2 transition-colors ${
              localRating === 'BAD'
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'
            }`}
            title="Bad response"
          >
            <ThumbsDown
              className="h-4 w-4"
              fill={localRating === 'BAD' ? 'currentColor' : 'none'}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default MessageActions;
