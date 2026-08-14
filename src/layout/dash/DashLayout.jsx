import { Outlet } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';

import DealHunterModal from './components/DealHunterModal';
import UpgradeModal from './components/UpgradeModal';

import { getOnboarding, removeEmailVerified, removeOnboarding } from '../../utils/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { investmentPlan } from '../../features/auth/authAPI';
import { fetchMySubscription } from '../../features/subscrip/subscriptionAPI';

const DashLayout = () => {
  const dispatch = useDispatch();
  const { currentPlan } = useSelector((state) => state.subscription);

  // Show setup modal only for users who haven't completed onboarding
  const [showSetupModal, setShowSetupModal] = useState(() => Boolean(getOnboarding()));
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // True once setup modal is no longer blocking (either never needed or user closed it)
  const [setupDone, setSetupDone] = useState(() => !getOnboarding());

  // Prevents re-triggering the upgrade modal more than once per login session
  const upgradeTriggeredRef = useRef(false);

  useEffect(() => {
    dispatch(investmentPlan());
    dispatch(fetchMySubscription());
  }, [dispatch]);

  // Show upgrade modal on every login for free-plan users.
  // Waits until: (1) setup modal is no longer blocking, and (2) subscription data has loaded.
  useEffect(() => {
    if (!setupDone) return;
    if (currentPlan === null) return; // still loading
    if (upgradeTriggeredRef.current) return; // already handled this session

    const isFree = !currentPlan || currentPlan.toLowerCase() === 'free';
    if (!isFree) return;

    upgradeTriggeredRef.current = true;
    const timer = setTimeout(() => setShowUpgradeModal(true), 400);
    return () => clearTimeout(timer);
  }, [setupDone, currentPlan]);

  // Shared handler — fires whether user completes or dismisses the setup modal
  const handleSetupClose = () => {
    removeOnboarding();
    removeEmailVerified();
    setShowSetupModal(false);
    setSetupDone(true); // unblocks the upgrade modal effect above
  };

  return (
    <main className="flex min-h-screen bg-slate-200">
      <SidebarLayout />
      <DealHunterModal
        isOpen={showSetupModal}
        onConfirm={handleSetupClose}
        onClose={handleSetupClose}
      />
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan || 'Free'}
      />
      <Outlet />
    </main>
  );
};

export default DashLayout;
