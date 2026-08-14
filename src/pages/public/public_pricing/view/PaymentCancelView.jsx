import { XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelView = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/pricing');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f0f5ff] to-white p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
        <div className="mb-6">
          <XCircle className="mx-auto h-20 w-20 text-yellow-500" />
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-[#111b2b]">Payment Cancelled</h2>

        <p className="mb-6 text-[#4c5370]">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div className="mb-6 rounded-xl bg-[#eef3ff] p-4 text-left">
          <h3 className="mb-2 font-semibold text-[#111b2b]">Why was this cancelled?</h3>
          <p className="text-sm text-[#4c5370]">Common reasons include:</p>
          <ul className="mt-2 space-y-2 text-sm text-[#4c5370]">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-yellow-500">•</span>
              You closed the payment window
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-yellow-500">•</span>
              Payment was declined by your bank
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-yellow-500">•</span>
              You decided not to proceed with the subscription
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full rounded-xl bg-[#2f66ff] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1f4fe0]"
          >
            Try Again
          </button>
          <button
            onClick={handleGoToHome}
            className="w-full rounded-xl bg-[#dce6ff] px-6 py-3 font-semibold text-[#111b2b] transition-colors hover:bg-[#d4e0ff]"
          >
            Return to Home
          </button>
        </div>

        <p className="mt-6 text-sm text-[#4c5370]">
          Need help?{' '}
          <a
            href="mailto:support@dealhunter.ai"
            className="font-medium text-[#2f66ff] hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelView;
