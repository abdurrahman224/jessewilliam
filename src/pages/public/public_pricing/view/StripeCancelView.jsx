import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const StripeCancelView = () => {
  return (
    <div className="mx-auto flex h-[90vh] w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <X className="h-6 w-6 text-red-600" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-900">Payment Cancelled</h2>
        <p className="mb-6 text-gray-600">No worries! You can try again whenever you're ready.</p>

        <div className="space-y-3">
          <Link
            to="/dash/settings/subscription"
            className="block w-full rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-gray-800"
          >
            View Plans
          </Link>

          <Link
            to="/"
            className="block w-full rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StripeCancelView;
