import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchMySubscription } from '../../../../features/subscrip/subscriptionAPI';
import CancellationModal from '../components/CancellationModal';
import {
  ProfileCardSkeleton,
  QuickStatsSkeleton,
  PlanCardSkeleton,
} from './components/AccountSkeletons';
import QuickStats from './components/QuickStats';
import ProfileCard from './components/ProfileCard';
import CurrentPlanCard from './components/CurrentPlanCard';
import { useAccountData } from './hooks/useAccountData';

const AccountView = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { activePlan, loading } = useSelector((state) => state.subscription || {});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Use custom hook for account data calculations
  const {
    displayName,
    avatarLetter,
    planStart,
    planEnd,
    daysRemaining,
    tokensUsed,
    totalTokens,
    tokenPercentage,
    planFeatures,
    planName,
    planPrice,
  } = useAccountData(user, activePlan);

  useEffect(() => {
    dispatch(fetchMySubscription());
  }, [dispatch]);

  if (!user) return null;

  const handleCancelSuccess = () => {
    toast.success('Subscription cancelled successfully.');
    // State is already refreshed via fetchMySubscription dispatched in CancellationModal
  };

  // Show skeletons while loading
  if (loading) {
    return (
      <div className="p-4 lg:p-8">
        {/* Header with Breadcrumb */}
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        {/* Main Grid with Skeletons */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
          {/* Left Column - Skeletons */}
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            <ProfileCardSkeleton />
            <QuickStatsSkeleton />
          </div>

          {/* Right Column - Skeleton */}
          <div className="space-y-8">
            <PlanCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header with Breadcrumb */}
      <div className="pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Account Overview</h1>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        {/* Left Column - Profile & Account Details */}
        <div className="space-y-4 md:space-y-6 lg:col-span-2">
          <ProfileCard user={user} displayName={displayName} avatarLetter={avatarLetter} />
          <QuickStats activePlan={activePlan} tokensUsed={tokensUsed} />
        </div>

        {/* Right Column - Active Plan Details */}
        <div className="space-y-8">
          <CurrentPlanCard
            activePlan={activePlan}
            planName={planName}
            planStart={planStart}
            planEnd={planEnd}
            daysRemaining={daysRemaining}
            tokensUsed={tokensUsed}
            totalTokens={totalTokens}
            tokenPercentage={tokenPercentage}
            planPrice={planPrice}
            planFeatures={planFeatures}
            onCancelClick={() => setIsCancelModalOpen(true)}
          />
        </div>
      </div>

      {/* Cancellation Modal */}
      <CancellationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        planName={planName}
        onSuccess={handleCancelSuccess}
      />
    </div>
  );
};

export default AccountView;
