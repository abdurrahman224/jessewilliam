import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ input, setInput, isThinking, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(e);
    }
  };

  return (
    <div className="sticky bottom-0 mb-2 bg-linear-to-t from-white via-white to-transparent">
      <div className="mx-auto max-w-4xl px-2 sm:px-4 md:px-0">
        <form onSubmit={onSend} className="relative">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-6 py-4 pr-24 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-200 focus:outline-none"
              rows="3"
              onKeyDown={handleKeyDown}
            />

            <div className="absolute right-4 bottom-6 flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {input.length}/{5000}
              </span>
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                  input.trim() && !isThinking
                    ? 'bg-blue-500 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isThinking ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-3 hidden items-center justify-between px-2 md:flex">
            <p className="text-xs text-gray-500">
              AI can make mistakes. Consider checking important information.
            </p>
            <div className="hidden items-center gap-4 md:flex">
              <button type="button" className="text-xs text-gray-500 hover:text-gray-700">
                ↻ Regenerate
              </button>
              <button type="button" className="text-xs text-gray-500 hover:text-gray-700">
                ⏎ Enter to send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
