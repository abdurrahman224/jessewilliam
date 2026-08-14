import React from 'react';
import { useSelector } from 'react-redux';

const StatusIndicator = () => {
  const { statusMessage } = useSelector((state) => state.chat);

  if (!statusMessage) return null;

  return (
    <div className="flex justify-center py-2">
      <div className="rounded-lg bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
        {statusMessage}
      </div>
    </div>
  );
};

export default StatusIndicator;