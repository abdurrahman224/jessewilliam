import { EyeIcon, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authLogin } from '../../features/auth/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../components/ui/TextInput';
import { resetAuthError } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginView = () => {
  const { loading, error, success } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [error, success, dispatch]);

  const handleChange = (field) => (e) => {
    const value = field === 'email' ? e.target.value.toLowerCase() : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter your email and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    dispatch(authLogin({ ...formData, email: formData.email.trim() }));
  };

  return (
    <section className="bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Left: form */}
        <div className="px-6 py-10 md:p-24 lg:px-32">
          <div className="mb-10 flex items-center gap-2 text-[#3b82f6]">
            <Link to="/">
              <img src="/img/addvanced-ai-logo.png" alt="" className="h-11 w-full object-cover" />
            </Link>
          </div>

          <h1 className="mb-2 text-[2rem] leading-tight font-semibold text-[#111b2b]">Login</h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">Login to access your travelwise account</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              type="email"
              placeholder="john.doe@gmail.com"
              value={formData.email}
              onChange={handleChange('email')}
            />

            <TextInput
              label="Password"
              type={show ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange('password')}
              right={
                <button
                  type="button"
                  aria-label={show ? 'Hide password' : 'Show password'}
                  onClick={() => setShow((s) => !s)}
                  className="text-gray-500 hover:text-[#2f66ff]"
                >
                  {show ? <EyeOff /> : <EyeIcon />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[14px] text-[#111b2b]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#2f66ff] focus:ring-[#2f66ff]"
                />
                Remember me
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-[14px] text-rose-400 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0]"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

          <p className="mt-6 text-center text-[14px] text-[#6b7280]">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-rose-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right: image */}
        <div className="">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default LoginView;
