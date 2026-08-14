import React, { useState, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * DeleteConfirmationToast - A reusable toast confirmation component
 *
 * Features:
 * - Promise-based API: returns Promise<boolean>
 * - ChatGPT-like modal design
 * - Red "Yes" button, Gray "No" button
 * - No auto-close, no outside click dismiss
 * - TailwindCSS styling
 * - Accessible with proper ARIA attributes
 *
 * @example
 * const confirmed = await deleteConfirmationToast({
 *   title: 'Delete chat?',
 *   message: 'This will delete CSS Tailwind Conversion.',
 *   yesText: 'Delete',
 *   noText: 'Cancel'
 * });
 *
 * if (confirmed) {
 *   // Proceed with deletion
 * }
 */

// Store reference to the toast component instance
let toastInstance = null;

/**
 * Show a confirmation toast and return a Promise
 * @param {Object} options - Configuration options
 * @param {string} options.title - Toast title (default: 'Delete chat?')
 * @param {string} options.message - Toast message
 * @param {string} options.yesText - Yes button text (default: 'Yes')
 * @param {string} options.noText - No button text (default: 'No')
 * @param {string} options.icon - Icon type: 'alert' | 'delete' | 'none' (default: 'alert')
 * @returns {Promise<boolean>} - Resolves to true if user clicks Yes, false if No
 */
export const showDeleteConfirmation = (options = {}) => {
  const {
    title = 'Delete chat?',
    message = 'This action cannot be undone.',
    yesText = 'Yes',
    noText = 'No',
    icon = 'alert'
  } = options;

  return new Promise((resolve) => {
    if (toastInstance) {
      toastInstance.show({
        title,
        message,
        yesText,
        noText,
        icon,
        onResolve: resolve
      });
    }
  });
};

/**
 * DeleteConfirmationToastProvider - Mount this at app root
 * Provides the toast container and manages toast state
 */
export const DeleteConfirmationToastProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const resolveRef = React.useRef(null);

  const show = useCallback(({ title, message, yesText, noText, icon, onResolve }) => {
    setConfig({ title, message, yesText, noText, icon });
    resolveRef.current = onResolve;
    setIsOpen(true);
  }, []);

  const handleYes = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  };

  const handleNo = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  };

  // Register this instance globally
  React.useEffect(() => {
    toastInstance = { show };
    return () => {
      toastInstance = null;
    };
  }, [show]);

  if (!isOpen || !config) return null;

  return (
    <>
      {/* Backdrop - prevents outside interaction */}
      <div
        className="fixed inset-0 bg-black/10 z-40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleNo}
      />

      {/* Modal Container - clicking empty area closes the toast */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleNo}
      >
        {/* Toast Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            bg-white rounded-xl shadow-2xl max-w-md w-full
            animate-in fade-in zoom-in-95 duration-200
            overflow-hidden
          "
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="toast-title"
          aria-describedby="toast-message"
        >
          {/* Content Container */}
          <div className="p-6">
            {/* Header with Icon */}
            <div className="flex items-start gap-4 mb-3">
              {config.icon === 'alert' && (
                <div className="flex-shrink-0 mt-0.5">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
              )}
              {config.icon === 'delete' && (
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-red-600 rounded-full" />
                  </div>
                </div>
              )}

              {/* Title and Message */}
              <div className="flex-1 min-w-0">
                <h2
                  id="toast-title"
                  className="text-base font-semibold text-gray-900 mb-1"
                >
                  {config.title}
                </h2>
                <p
                  id="toast-message"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {config.message}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={handleNo}
                className="
                  px-4 py-2.5 text-sm font-medium
                  text-gray-700 bg-gray-100
                  hover:bg-gray-200 active:bg-gray-300
                  rounded-full transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                  touch-manipulation
                "
                type="button"
              >
                {config.noText}
              </button>

              <button
                onClick={handleYes}
                className="
                  px-4 py-2.5 text-sm font-medium
                  text-white bg-red-600
                  hover:bg-red-700 active:bg-red-800
      transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  touch-manipulation
                  shadow-sm rounded-full
                "
                type="button"
              >
                {config.yesText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};  