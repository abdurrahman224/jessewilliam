import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subscribePlan } from '../../../../features/subscrip/subscriptionAPI';

const StripeSuccessView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Optionally, you can dispatch an action to refresh subscription status here
    // dispatch(fetchMySubscription());
    const planId = new URLSearchParams(window.location.search).get('planId');
    if (planId) {
      dispatch(subscribePlan({ planId })); // This will trigger the subscription refresh in the backend
    }
  }, [dispatch]);

  return (
    <div className="mx-auto flex h-[90vh] w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-900">Payment Successful</h2>

        <p className="mb-6 text-gray-600">You're all set. Your subscription is now active.</p>

        <div className="space-y-3">
          <Link
            to="/dash/gpt"
            className="block w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-gray-800"
          >
            Start New Chat
          </Link>

          <Link
            to="/dash/settings/subscription"
            className="block w-full rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            View Billing Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StripeSuccessView;
