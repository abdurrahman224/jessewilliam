import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authResendOTP, authVerifyOTP } from '../../features/auth/authAPI';
import { resetAuthError } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import TextInput from '../../components/ui/TextInput';

const Logo = () => (
  <div className="mb-10 flex items-center gap-2 text-[#3b82f6]">
    <Link to="/">
      <img src="/img/addvanced-ai-logo.png" alt="" className="h-11 w-full object-cover" />
    </Link>
  </div>
);

const ShowOtpView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, isResend, error } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);

  // canResend is derived — no extra state needed
  const canResend = otpTimer === 0;

  // Guard: if no pending user, send back to register
  useEffect(() => {
    if (!user?.email) {
      navigate('/auth/register', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [error, dispatch]);

  // Countdown timer — one tick per second
  useEffect(() => {
    if (otpTimer === 0) return;
    const timeout = setTimeout(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearTimeout(timeout);
  }, [otpTimer]);

  const handleResend = async () => {
    if (!canResend || isResend) return;
    const result = await dispatch(authResendOTP({ email: user.email }));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('OTP resent successfully!');
      setOtp('');
      setOtpTimer(60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(authVerifyOTP({ email: user.email, otp }));
  };

  const isOtpFilled = otp.length === 6;

  return (
    <section className="min-h-screen bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Image */}
        <div className="order-2 md:order-1">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>

        {/* Form */}
        <div className="order-1 px-6 py-10 md:order-2 md:p-24 lg:px-32">
          <Logo />

          <div className="mb-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="rounded-full p-2 text-[#2f66ff] transition hover:bg-[#f0f4ff]"
              aria-label="Back to registration"
            >
              ←
            </button>
            <h1 className="text-[2rem] leading-tight font-semibold text-[#111b2b]">Verify email</h1>
          </div>

          <p className="mb-8 text-[15px] text-[#6b7280]">
            Enter the 6-digit code sent to{' '}
            <span className="font-medium text-[#111b2b]">{user?.email}</span>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextInput
              label="One-time password"
              type="number"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {/* Timer / Resend */}
            <div className="flex items-center justify-between text-sm">
              {!canResend ? (
                <span className="text-gray-500">
                  Resend in <strong>{otpTimer}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResend}
                  className="font-medium text-[#2f66ff] hover:underline disabled:opacity-60"
                >
                  {isResend ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!isOtpFilled || loading}
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <p className="mt-6 text-center text-[14px] text-[#6b7280]">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-rose-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowOtpView;
