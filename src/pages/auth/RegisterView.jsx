import { Eye, EyeOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/ui/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '../../features/auth/authAPI';
import { toast } from 'react-toastify';
import { resetAuthError } from '../../features/auth/authSlice';

const Logo = () => (
  <div className="mb-10 flex items-center gap-2 text-[#3b82f6]">
    <Link to="/">
      <img src="/img/addvanced-ai-logo.png" alt="" className="h-11 w-full object-cover" />
    </Link>
  </div>
);

const EyeIcon = ({ show, onClick }) => (
  <button
    type="button"
    aria-label={show ? 'Hide password' : 'Show password'}
    onClick={onClick}
    className="text-gray-500 hover:text-[#2f66ff]"
  >
    {show ? <EyeOff /> : <Eye />}
  </button>
);

const RegisterView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === 'email' ? e.target.value.toLowerCase() : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error('First and last name are required.');
      return;
    }

    if (formData.firstName.trim().length < 2 || formData.lastName.trim().length < 2) {
      toast.error('First and last name must be at least 2 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      toast.error('You must agree to the terms.');
      return;
    }

    const userData = {
      ...formData,
      email: formData.email.toLowerCase().trim(),
      fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
    };
    const result = await dispatch(authRegister(userData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/auth/verify-otp');
    }
  };

  return (
    <section className="min-h-screen bg-[#f9fafb]">
      <div className="grid grid-cols-1 items-center md:grid-cols-2">
        {/* Right: image */}
        <div className="order-2 md:order-1">
          <img src="/img/login.png" alt="City skyline" className="h-screen w-full object-cover" />
        </div>
        {/* Left: form */}
        <div className="order-1 px-6 py-10 md:order-2 md:p-24 lg:px-32">
          <Logo />

          <h1 className="mb-2 text-[2rem] leading-tight font-semibold text-[#111b2b]">
            Sign up for an account
          </h1>
          <p className="mb-8 text-[15px] text-[#6b7280]">
            Let's get you all set up so you can access your personal account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                label="First Name"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange('firstName')}
              />
              <TextInput
                label="Last Name"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                label="Email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={formData.email}
                onChange={handleChange('email')}
              />
              <TextInput
                label="Phone Number"
                type="tel"
                placeholder="+1 234 567 890"
                value={formData.phoneNumber}
                onChange={handleChange('phoneNumber')}
              />
            </div>

            {/* Password */}
            <TextInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.password}
              onChange={handleChange('password')}
              right={<EyeIcon show={showPassword} onClick={() => setShowPassword(!showPassword)} />}
            />

            {/* Confirm Password */}
            <TextInput
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              right={
                <EyeIcon
                  show={showConfirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-[#2f66ff] focus:ring-[#2f66ff]"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-[14px] text-[#111b2b]">
                I agree to all the Terms and Privacy Policies
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#2f66ff] py-3 font-medium text-white transition hover:bg-[#1f4fe0] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Create account'}
            </button>
          </form>

          {/* Already have an account link */}
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

export default RegisterView;
