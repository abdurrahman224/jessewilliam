// UpgradeModal.jsx - Simplified & User-Friendly

import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Zap, Crown, Rocket, Loader2, CheckCheck } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createCheckoutSession } from '../../../features/subscrip/subscriptionAPI';

const UpgradeModal = ({ isOpen, onClose, currentPlan = 'Free' }) => {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const plans = {
    free: {
      name: 'Free',
      price: '0',
      id: '709f651e-b0fc-41e1-a0ca-6a61cddb55e7',
      messages: '50 msgs/mo',
      icon: Zap,
      color: 'gray',
    },
    pro: {
      name: 'Pro',
      price: '29',
      id: '0a76455b-e66e-49a6-8d08-87e17ece385d',
      messages: '500 msgs/mo',
      badge: 'Popular',
      icon: Rocket,
      color: 'blue',
    },
    business: {
      name: 'Business',
      price: '59',
      id: '4eeb02ce-9a2b-4121-ab3f-befce96531e8',
      messages: 'Unlimited',
      badge: 'Best Value',
      icon: Crown,
      color: 'purple',
    },
  };

  const handleUpgrade = async () => {
    if (isCheckingOut) return;
    const plan = plans[selectedPlan];
    if (selectedPlan === currentPlan?.toLowerCase()) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const { sessionUrl } = await dispatch(
        createCheckoutSession({
          planId: plan.id,
          successUrl: `${window.location.origin}/dash/settings/subscription/success`,
          cancelUrl: `${window.location.origin}/dash/settings/subscription/cancel`,
        })
      ).unwrap();

      if (sessionUrl) {
        window.location.assign(sessionUrl);
      }
    } catch (err) {
      setCheckoutError('Unable to start checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const currentPlanKey = currentPlan?.toLowerCase() || 'free';
  const isCurrentPlanFree = currentPlanKey === 'free';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleModalClick}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:top-4 sm:right-4 sm:p-1"
        >
          <X className="h-5 w-5 sm:h-5 sm:w-5" />
        </button>

        {/* Header */}
        <div className="rounded-t-2xl border-b border-gray-100 bg-amber-50 px-4 py-5 text-center sm:px-6 sm:py-6">
          <h2 className="pr-8 text-xl font-bold text-gray-900 sm:pr-0 sm:text-2xl">
            {isCurrentPlanFree ? 'Select & Customize Your Plan' : 'Upgrade for More Power'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            {isCurrentPlanFree
              ? 'Get more messages and unlock premium features'
              : `You've used all ${plans[currentPlanKey].messages} messages`}
          </p>
        </div>

        {/* Plan Cards */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            {Object.entries(plans).map(([key, plan]) => {
              const Icon = plan.icon;
              const isCurrent = key === currentPlanKey;
              const isSelected = selectedPlan === key && !isCurrent;
              const canSelect = !isCurrent;

              return (
                <button
                  key={key}
                  onClick={() => canSelect && setSelectedPlan(key)}
                  disabled={!canSelect}
                  className={`relative rounded-xl p-3 text-left transition-all sm:p-4 ${
                    isCurrent
                      ? 'cursor-default bg-slate-50 ring ring-gray-200'
                      : isSelected
                        ? 'transform shadow-lg ring-2 ring-blue-200 sm:scale-[1.02]'
                        : 'ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300'
                  } `}
                >
                  {/* Current plan green check — top right */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 shadow-sm sm:top-3 sm:right-3 sm:h-6 sm:w-6">
                      <Check className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" />
                    </div>
                  )}

                  {/* Upgrade badge */}
                  {plan.badge && !isCurrent && (
                    <span className="absolute -top-2 right-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white sm:right-3 sm:text-xs">
                      {plan.badge}
                    </span>
                  )}

                  {/* Plan Icon */}
                  <div
                    className={`mb-2 inline-flex rounded-lg p-1.5 sm:mb-3 sm:p-2 ${
                      isCurrent ? 'bg-gray-200' : `bg-${plan.color}-100`
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isCurrent ? 'text-gray-600' : `text-${plan.color}-600`
                      }`}
                    />
                  </div>

                  {/* Plan Name & Price */}
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">{plan.name}</h3>
                    <div className="mt-1">
                      <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                        ${plan.price}
                      </span>
                      <span className="text-sm text-gray-500 sm:text-base">/mo</span>
                    </div>
                  </div>

                  {/* Key Feature */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-green-500 sm:h-4 sm:w-4" />
                    <span className="text-gray-700">{plan.messages}</span>
                  </div>

                  {/* Status Badge */}
                  {isCurrent && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600 sm:mt-3 sm:text-sm">
                      <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Current Plan
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {checkoutError && (
            <div className="mt-3 rounded-lg bg-red-50 p-2.5 text-center text-xs text-red-600 sm:mt-4 sm:p-3 sm:text-sm">
              {checkoutError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <button
              onClick={onClose}
              disabled={isCheckingOut}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Maybe Later
            </button>
            <button
              onClick={handleUpgrade}
              disabled={isCheckingOut || selectedPlan === currentPlanKey}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="xs:inline hidden">Processing...</span>
                  <span className="xs:hidden">Processing...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="xs:inline hidden">Upgrade to {plans[selectedPlan].name}</span>
                  <span className="xs:hidden">Upgrade Now</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </div>

          {/* Trust Badge */}
          <div className="mt-4 px-2 text-center sm:mt-6">
            <p className="text-[10px] leading-relaxed text-gray-500 sm:text-xs">
              🔒 Secure payment • 14-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
