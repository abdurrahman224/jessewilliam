import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import NotFound from '../pages/error/NotFound';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

// Public Layout and Pages
import RootLayout from '../layout/public/RootLayout';
// Views
import HomeView from '../pages/public/public_Home/HomeView';
import AboutView from '../pages/public/public_about/AboutView';
import ContactView from '../pages/public/public_contact/ContactView';
import PricingView from '../pages/public/public_pricing/PricingView';
import PlatformView from '../pages/public/public_platform/PlatformView';
import InnovationView from '../pages/public/public_innovation/InnovationView';

// Auth Layout and Pages
import AuthLayout from '../layout/auth/AuthLayout';
// Views
import RegisterView from '../pages/auth/RegisterView';
import LoginView from '../pages/auth/LoginView';
import ResetPasswordView from '../pages/auth/ResetPasswordView';
import SetPasswordView from '../pages/auth/SetPasswordView';
import StepView from '../pages/auth/StepView';

// Dashboard Layout and Pages
import DashLayout from '../layout/dash/DashLayout';
// Views
// import DashboardView from '../pages/dash/dash_home/DashboardView';
import AIChatView from '../pages/dash/dash_chats/AIChatView';
import AccountView from '../pages/dash/dash_settings/view/AccountView';
import SubscriptionView from '../pages/dash/dash_settings/view/SubscriptionView';
import SettingLayout from '../layout/dash/SettingLayout';
import DealHunterView from '../pages/dash/dash_settings/view/DealHunterView';
import SecurityView from '../pages/dash/dash_settings/view/SecurityView';
import StripeSuccessView from '../pages/public/public_pricing/view/StripeSuccessView';
import StripeCancelView from '../pages/public/public_pricing/view/StripeCancelView';
import Help_and_Support from '../pages/dash/dash_settings/view/Help_and_Support';
import Public_HelpSupport from '../layout/public/Public_HelpSupport';
import ForgotPasswordView from '../pages/auth/ForgotPasswordView';
import ShowOtpView from '../pages/auth/ShowOtpView';
// import PaymentCancelView from '../pages/dash/dash_settings/view/PaymentCancelView';
// import PaymentSuccessView from '../pages/dash/dash_settings/view/PaymentSuccessView';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes */}
      <Route element={<GuestRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeView />} />
          <Route path="about" element={<AboutView />} />
          <Route path="platform" element={<PlatformView />} />
          <Route path="ai-innovation" element={<InnovationView />} />
          <Route path="contact" element={<ContactView />} />
          <Route path="pricing" element={<PricingView />} />

          <Route path="help-and-support" element={<Public_HelpSupport />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          {/* OTP page */}
          <Route path="verify-otp" element={<ShowOtpView />} />
          <Route path="forgot-password" element={<ForgotPasswordView />} />
          <Route path="reset-password" element={<ResetPasswordView />} />
          <Route path="set-password" element={<SetPasswordView />} />
          <Route path="multi-step" element={<StepView />} />
          <Route path="stripe">
            <Route path="success" element={<StripeSuccessView />} />
            <Route path="cancel" element={<StripeCancelView />} />
          </Route>
        </Route>
      </Route>

      {/* Dashboard routes for logged in users */}
      <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
        <Route path="dash" element={<DashLayout />}>
          <Route path="gpt" element={<AIChatView />} />
          <Route path="gpt/:chatId" element={<AIChatView />} />
          <Route path="settings" element={<SettingLayout />}>
            <Route index element={<AccountView />} /> {/* default */}
            <Route path="subscription">
              <Route index element={<SubscriptionView />} />
              <Route path="success" element={<StripeSuccessView />} />
              <Route path="cancel" element={<StripeCancelView />} />
            </Route>
            <Route path="deal-hunter" element={<DealHunterView />} />
            <Route path="security" element={<SecurityView />} />
          </Route>

          <Route path="help-and-support" element={<Help_and_Support />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
