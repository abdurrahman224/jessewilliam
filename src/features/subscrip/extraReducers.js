import { cancelSubscription, createCheckoutSession, fetchMySubscription } from './subscriptionAPI';

export const extraReducers = (builder) => {
  builder
    // ✅ Create Checkout Session cases
    .addCase(createCheckoutSession.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(createCheckoutSession.fulfilled, (state, action) => {
      const { sessionUrl } = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
      state.sessionUrl = sessionUrl;
    })
    .addCase(createCheckoutSession.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 'Failed to create checkout session';
    });

  // ✅ Fetch My Subscription cases
  builder
    .addCase(fetchMySubscription.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(fetchMySubscription.fulfilled, (state, action) => {
      const data = action.payload;
      console.log('action data:', data?.plan?.name);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.activePlan = data;
      state.currentPlan = data?.plan?.name; // Store current plan for comparison during cancellation
    })
    .addCase(fetchMySubscription.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 'Failed to fetch subscription';
    });

  // ✅ Cancel Subscription cases
  builder
    .addCase(cancelSubscription.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(cancelSubscription.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      // Clear immediately so UI stops showing the old paid plan.
      // fetchMySubscription will repopulate with the Free plan.
      state.activePlan = null;
      state.currentPlan = null;
    })
    .addCase(cancelSubscription.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 'Failed to cancel subscription';
    });
};
