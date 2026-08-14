import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authResetPassword } from '../../features/auth/authAPI';
import SuccessAlert from '../../components/common/SuccessAlert';

const Logo = () => (
  <div className="mb-10 flex items-center gap-2">
    <Link to="/">
      <img src="/img/logo-white.png" alt="" />
    </Link>
  </div>
);

const TextInput = ({ label, type = 'text', placeholder, value, onChange, right }) => (
  <label className="block">
    <span className="mb-1 block text-sm text-[#111b2b]">{label}</span>
    <div className="relative">
      <input
        type={type}
        className="w-full rounded-md border border-gray-300 px-3 py-3 text-[15px] transition outline-none focus:border-[#2f66ff] focus:ring-2 focus:ring-[#2f66ff]/20"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {right ? <div className="absolute inset-y-0 right-3 flex items-center">{right}</div> : null}
    </div>
  </label>
);

const ResetPasswordView = () => {
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const dispatch = useDispatch();

  const token = searchParams.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!newPassword) {
      setValidationError('Password is required');
      return;
    }

    if (newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (!token) {
      setValidationError('Invalid or missing reset token');
      return;
    }

    dispatch(authResetPassword({ token, newPassword }));
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section className="bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Left: form */}
        <div className="px-6 py-10 md:p-24 lg:px-32">
          <Logo />
          <button
            onClick={() => navigate(-1)}
            className="text-md mb-4 flex items-center text-[#2f66ff] hover:underline"
          >
            <ChevronLeft /> Back
          </button>

          <h1 className="mb-2 text-[2rem] leading-tight font-semibold text-[#111b2b]">
            Reset your password
          </h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Enter your new password below to reset your account password.
          </p>

          {success ? (
            <div className="space-y-4">
              <SuccessAlert message="Password reset successfully! You can now login with your new password." />
              <button
                onClick={handleLoginRedirect}
                className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <TextInput
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              <TextInput
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                right={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              {(validationError || error) && (
                <p className="text-sm text-red-500">{validationError || error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>

        {/* Right: image */}
        <div className="">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordView;
