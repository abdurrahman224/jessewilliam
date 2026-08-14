import { useState } from 'react';
import CheckItem from './CheckItem';
import { createCheckoutSession } from '../../../../features/subscrip/subscriptionAPI';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle } from 'lucide-react';

const PlanCard = ({ plan }) => {
  const { title, price, period, subtitle, items, button, highlight } = plan;
  const { activePlan } = useSelector((state) => state.subscription);
  const [upgradingPlanId, setUpgradingPlanId] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const VISIBLE_COUNT = 8;
  const visibleItems = items.slice(0, VISIBLE_COUNT);
  const hiddenItems = items.slice(VISIBLE_COUNT);
  const hasHidden = hiddenItems.length > 0;

  // Check if this plan is the active one
  const isActivePlan = activePlan?.plan?.name === title;

  // Check if this plan is currently being upgraded
  const isUpgradingThisPlan = upgradingPlanId === plan.id;

  const handleCheckout = async () => {
    if (upgradingPlanId) return; // prevent double trigger

    try {
      setUpgradingPlanId(plan.id);

      const { sessionUrl } = await dispatch(
        createCheckoutSession({
          planId: plan.id,
          successUrl: `${window.location.origin}/dash/settings/subscription/success?planId=${plan.id}`,
          cancelUrl: `${window.location.origin}/dash/settings/subscription/cancel`,
        })
      ).unwrap();

      if (sessionUrl) {
        window.location.assign(sessionUrl);
      } else {
        throw new Error('No session URL returned');
      }
    } catch (err) {
      console.error('Stripe checkout failed', err);
    } finally {
      setUpgradingPlanId(null);
    }
  };

  const isFreePlan = title?.toLowerCase() === 'free';

  // Determine button text and state
  const getButtonContent = () => {
    if (isActivePlan)
      return (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="h-5 w-5" /> Current Plan
        </div>
      );
    if (isUpgradingThisPlan) return 'Loading...';
    return button;
  };

  // Determine if button should be disabled
  const isButtonDisabled = () => {
    return isActivePlan || isUpgradingThisPlan || (isFreePlan && !isActivePlan);
  };

  // Determine button styling
  const getButtonClasses = () => {
    if (isActivePlan) {
      return 'cursor-not-allowed bg-[#dce6ff] text-gray-400';
    }

    if (isUpgradingThisPlan) {
      return highlight
        ? 'bg-[#dce6ff] text-[#111b2b] opacity-50 cursor-not-allowed'
        : 'bg-[#2f66ff] text-white opacity-50 cursor-not-allowed';
    }

    if (highlight) {
      return 'bg-[#dce6ff] text-[#111b2b] hover:bg-[#d4e0ff]';
    }

    return 'bg-[#2f66ff] text-white hover:bg-[#1f4fe0]';
  };

  return (
    <div
      className={`flex flex-col rounded-3xl border p-4 shadow-sm md:p-6 ${
        isActivePlan ? 'border-[#9fb8ff] bg-[#eef3ff]' : 'border-[#CFE0FF] bg-white'
      }`}
    >
      <div className="mb-4">
        <h3 className="text-[1.75rem] font-semibold text-[#111b2b]">{title}</h3>
        <p className="text-[1.5rem] text-[#091220]">
          {price} / <span className="text-[1rem]"> {period}</span>
        </p>
        <p className="mt-2 text-[15px] leading-7 text-[#4c5370]">{subtitle}</p>
      </div>

      {/* Always visible: first 8 items */}
      <ul className="space-y-2">
        {visibleItems.map((it, idx) => (
          <CheckItem key={idx} text={it.text} extra={it.extra} />
        ))}
      </ul>

      {/* Collapsible extra items - Fixed */}
      {hasHidden && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
          aria-hidden={!open}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2">
              {hiddenItems.map((it, idx) => (
                <CheckItem key={idx + visibleItems.length} text={it.text} extra={it.extra} />
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Toggle button — only if there are hidden items */}
      {hasHidden && (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-[#2f66ff] focus:underline focus:outline-none"
        >
          {open
            ? 'Show less'
            : `Show ${hiddenItems.length} more feature${hiddenItems.length === 1 ? '' : 's'}`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* CTA Button */}
      <div className="mt-auto pt-4">
        <button
          onClick={!isActivePlan ? handleCheckout : undefined}
          disabled={isButtonDisabled()}
          className={`w-full rounded-xl px-2 py-2 font-semibold transition-colors ${getButtonClasses()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
