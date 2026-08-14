import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
      <div className="flex-1">
        <p className="text-sm font-medium text-green-800">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-green-600 transition hover:text-green-800"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SuccessAlert;
