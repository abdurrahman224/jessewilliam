import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authForgotPassword } from '../../features/auth/authAPI';
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

const ForgotPasswordView = () => {
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return;
    }

    dispatch(authForgotPassword({ email: trimmedEmail }));
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
            Forgot your password?
          </h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Don’t worry, happens to all of us. Enter your email below to recover your password.
          </p>

          {success ? (
            <div className="mt-4">
              <SuccessAlert message="Password reset email sent successfully! Please check your inbox." />
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
              >
                {loading ? 'Submitting...' : 'Submit'}
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

export default ForgotPasswordView;
