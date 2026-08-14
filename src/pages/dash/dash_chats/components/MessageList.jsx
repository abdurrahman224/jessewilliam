import React from 'react';
import UserMessage from './UserMessage';
import AIMessage from './AIMessage';

const MessageList = ({ messages, isThinking, onCopy, onFeedback, messagesEndRef }) => {
  return (
    <div className="mx-auto max-w-4xl pt-6">
      {messages.map((message) =>
        message.type === 'ai' ? (
          <AIMessage key={message.id} message={message} onCopy={onCopy} onFeedback={onFeedback} />
        ) : (
          <UserMessage key={message.id} message={message} />
        )
      )}

      {isThinking && (
        <div className="flex gap-1">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
