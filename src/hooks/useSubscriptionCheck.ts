"use client";

// This hook is a no-op for the static frontend showcase.
export function useSubscriptionCheck() {
  return {
    isLoading: false,
    isExpired: false,
    isPastDue: false,
    isTrialing: false,
    isActive: true,
    subscriptionStatus: "ACTIVE",
    trialEndsAt: null,
    gracePeriodEndsAt: null,
  };
}
