// SuccessModal.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message, actionText, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Icon */}
        <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold">{title || 'Success!'}</h2>

        {/* Message */}
        <p className="mb-6 text-gray-600">{message || 'Your action was successful.'}</p>

        {/* Action Button */}
        {actionText && (
          <button
            onClick={onAction}
            className="rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessModal;
