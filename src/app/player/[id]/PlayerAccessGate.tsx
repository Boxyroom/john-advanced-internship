'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { getSubscription, hasPremiumAccess } from '@/lib/subscription';

type PlayerAccessGateProps = {
  children: ReactNode;
  subscriptionRequired: boolean;
};

export default function PlayerAccessGate({
  children,
  subscriptionRequired,
}: PlayerAccessGateProps) {
  const router = useRouter();
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const subscription = getSubscription(user?.email, isAuthenticated);
  const shouldGatePremiumContent =
    subscriptionRequired && (!isAuthenticated || !hasPremiumAccess(subscription));

  useEffect(() => {
    if (!subscriptionRequired) {
      return;
    }

    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (!hasPremiumAccess(subscription)) {
      router.replace('/choose-plan');
    }
  }, [
    isAuthenticated,
    openAuthModal,
    router,
    subscription,
    subscriptionRequired,
  ]);

  if (shouldGatePremiumContent) {
    return null;
  }

  return children;
}
