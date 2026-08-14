import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FileExclamationPoint, X } from 'lucide-react';
import {
  cancelSubscription,
  fetchMySubscription,
} from '../../../../features/subscrip/subscriptionAPI';

const CancellationModal = ({ isOpen, onClose, planName, onSuccess }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    dispatch(cancelSubscription())
      .unwrap()
      .then(() => {
        // Immediately refresh subscription state — no page reload needed
        dispatch(fetchMySubscription());
        onSuccess();
        handleClose();
      })
      .catch((err) => {
        console.error('Failed to cancel subscription:', err);
        setError(
          typeof err === 'string' ? err : 'Failed to cancel subscription. Please try again.'
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="bg-opacity-50 fixed inset-0 bg-black/80 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Content */}
          <div className="p-6">
            {/* Step 1: Confirmation */}

            <div>
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-red-100 p-3">
                  <FileExclamationPoint className="h-8 w-8 text-red-600" />
                </div>
              </div>

              <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
                Cancel {planName} Plan?
              </h3>

              <p className="mb-6 text-center text-gray-600">
                We're sorry to see you go! Please confirm if you'd like to proceed with
                cancellation. You'll lose access to premium features immediately.
              </p>

              <div className="mb-6 rounded-lg bg-amber-50 p-4">
                <h4 className="mb-2 font-semibold text-amber-800">Before you go:</h4>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Your subscription will end immediately
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    Any unused credits will be forfeited
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    You can reactivate anytime with all your data intact
                  </li>
                </ul>
              </div>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Cancelling...' : 'Yes, Continue'}
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                  No, Keep Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationModal;
