'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  isSubscriptionPlan,
  setSubscription,
  type SubscriptionPlan,
} from '@/lib/subscription';

type VerificationState =
  | { status: 'loading' }
  | {
      status: 'success';
      customerEmail: string | null;
      paymentStatus: string;
      subscriptionId: string | null;
      plan: SubscriptionPlan;
      billingCycle: string | null;
    }
  | { status: 'error' };

function CheckoutVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [verification, setVerification] = useState<VerificationState>({
    status: 'loading',
  });

  useEffect(() => {
    async function verifyCheckoutSession() {
      if (!sessionId) {
        setVerification({ status: 'error' });
        return;
      }

      try {
        const response = await fetch('/api/verify-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed.');
        }

        const data = await response.json() as {
          success?: boolean;
          customerEmail?: string | null;
          paymentStatus?: string;
          subscriptionId?: string | null;
          plan?: string | null;
          billingCycle?: string | null;
        };

        const verifiedPlan = data.plan ?? null;

        if (
          !data.success ||
          !data.customerEmail ||
          !isSubscriptionPlan(verifiedPlan) ||
          verifiedPlan === 'basic'
        ) {
          throw new Error('Payment verification failed.');
        }

        setSubscription(data.customerEmail, verifiedPlan);
        setVerification({
          status: 'success',
          customerEmail: data.customerEmail,
          paymentStatus: data.paymentStatus ?? 'unknown',
          subscriptionId: data.subscriptionId ?? null,
          plan: verifiedPlan,
          billingCycle: data.billingCycle ?? null,
        });
        router.push('/settings');
      } catch {
        setVerification({ status: 'error' });
      }
    }

    verifyCheckoutSession();
  }, [router, sessionId]);

  if (verification.status === 'loading') {
    return <main>Verifying payment...</main>;
  }

  if (verification.status === 'error') {
    return <main>Payment verification failed</main>;
  }

  return (
    <main>
      <h1>Payment verified</h1>
      <p>Customer email: {verification.customerEmail ?? 'Unavailable'}</p>
      <p>Payment status: {verification.paymentStatus}</p>
      <p>Subscription ID: {verification.subscriptionId ?? 'Unavailable'}</p>
      <p>Plan: {verification.plan}</p>
      <p>Billing cycle: {verification.billingCycle ?? 'Unavailable'}</p>
    </main>
  );
}

export default function ChoosePlanSuccessPage() {
  return (
    <Suspense fallback={<main>Verifying payment...</main>}>
      <CheckoutVerification />
    </Suspense>
  );
}
