import { useMemo } from 'react';

export const useAccountData = (user, activePlan) => {
  return useMemo(() => {
    if (!user || !activePlan) {
      return {
        displayName: 'Unnamed User',
        avatarLetter: '',
        planStart: null,
        planEnd: null,
        daysRemaining: null,
        tokensUsed: 0,
        totalTokens: 25000,
        tokenPercentage: 0,
        planFeatures: {},
        planName: 'No Active Plan',
        planPrice: 'N/A',
      };
    }

    const displayName = user.fullName || 'Unnamed User';
    const avatarLetter = (displayName[0] || user.email[0]).toUpperCase();

    // Plan calculations
    const planStart = activePlan.startDate ? new Date(activePlan.startDate) : null;
    const planEnd = activePlan.endDate ? new Date(activePlan.endDate) : null;
    const today = new Date();
    const daysRemaining = planEnd
      ? Math.max(0, Math.ceil((planEnd - today) / (1000 * 60 * 60 * 24)))
      : null;

    const tokensUsed = activePlan.requestsUsed || 0;
    const totalTokens = activePlan.plan?.maxRequests || 25000;
    const tokenPercentage = Math.min(100, Math.round((tokensUsed / totalTokens) * 100));
    const planFeatures = activePlan.plan?.features || {};
    const planName = activePlan.plan?.name || 'No Active Plan';
    const planPrice = activePlan.plan?.price || 'N/A';

    return {
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
    };
  }, [user, activePlan]);
};
