const LoadingIndicator = ({ message }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400">
        <span className="text-sm" role="img" aria-label="robot">
          🤖
        </span>
      </div>

      {/* Message with Bobbing Dots */}
      <div className="animated-pulse flex gap-2 rounded-lg bg-blue-50 px-3 py-2">
        <p className="animate-pulse text-sm text-gray-500">{message || 'Thinking'}</p>
        <div className="flex items-center space-x-1">
          <div className="mt-2 flex space-x-1">
            <div className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
            <div className="h-1 w-1 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
            <div className="h-1 w-1 animate-bounce rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
