import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { confirmPayment } from '../../features/subscrip/subscriptionAPI';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        // Confirm the payment with your backend
        // await dispatch(confirmPayment({ sessionId })).unwrap();
        setStatus('success');

        // Optional: Redirect to dashboard after 5 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      } catch (error) {
        console.error('Payment confirmation failed:', error);
        setStatus('error');
      }
    };

    confirmSubscription();
  }, [sessionId, dispatch, navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f0f5ff] to-white p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {status === 'processing' && (
          <div className="py-12">
            <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-[#2f66ff] border-t-transparent"></div>
            <h2 className="mb-2 text-2xl font-semibold text-[#111b2b]">Processing Your Payment</h2>
            <p className="text-[#4c5370]">Please wait while we confirm your subscription...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-6">
            <div className="mb-6">
              <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#111b2b]">Payment Successful! 🎉</h2>
            <p className="mb-6 text-[#4c5370]">
              Thank you for your subscription. Your account has been upgraded and you now have
              access to all premium features.
            </p>

            <div className="mb-6 rounded-xl bg-[#eef3ff] p-4 text-left">
              <h3 className="mb-2 font-semibold text-[#111b2b]">What's next?</h3>
              <ul className="space-y-2 text-sm text-[#4c5370]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✓</span>
                  Start analyzing deals with Addvanced tools
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✓</span>
                  Access bulk analysis and CSV exports
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-green-500">✓</span>
                  Use scenario modeling and sensitivity analysis
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoToDashboard}
                className="w-full rounded-xl bg-[#2f66ff] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1f4fe0]"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleGoToHome}
                className="w-full rounded-xl bg-[#dce6ff] px-6 py-3 font-semibold text-[#111b2b] transition-colors hover:bg-[#d4e0ff]"
              >
                Return to Home
              </button>
            </div>

            <p className="mt-6 text-sm text-[#4c5370]">
              You will be redirected to dashboard in 5 seconds...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-6">
            <div className="mb-6">
              <svg
                className="mx-auto h-20 w-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#111b2b]">Something Went Wrong</h2>
            <p className="mb-6 text-[#4c5370]">
              We couldn't confirm your payment. Please check your email for confirmation or contact
              support.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full rounded-xl bg-[#2f66ff] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1f4fe0]"
              >
                Return to Pricing
              </button>
              <button
                onClick={() => (window.location.href = 'mailto:support@dealhunter.ai')}
                className="w-full rounded-xl bg-[#dce6ff] px-6 py-3 font-semibold text-[#111b2b] transition-colors hover:bg-[#d4e0ff]"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessView;
