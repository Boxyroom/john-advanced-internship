import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

type CheckoutRequest = {
  plan?: string;
  billingCycle?: string;
  email?: string;
};

type PaidPlan = 'premium' | 'premium-plus';
type BillingCycle = 'monthly' | 'yearly';

const priceIds: Record<PaidPlan, Record<BillingCycle, string | undefined>> = {
  premium: {
    monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID,
  },
  'premium-plus': {
    monthly: process.env.STRIPE_PREMIUM_PLUS_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_PREMIUM_PLUS_YEARLY_PRICE_ID,
  },
};

function isPaidPlan(plan: string | undefined): plan is PaidPlan {
  return plan === 'premium' || plan === 'premium-plus';
}

function isBillingCycle(billingCycle: string | undefined): billingCycle is BillingCycle {
  return billingCycle === 'monthly' || billingCycle === 'yearly';
}

export async function POST(request: Request) {
  const { plan, billingCycle, email } = await request.json() as CheckoutRequest;

  if (!isPaidPlan(plan)) {
    return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });
  }

  if (!isBillingCycle(billingCycle)) {
    return NextResponse.json({ error: 'Invalid billing cycle.' }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const priceId = priceIds[plan][billingCycle];

  if (!priceId) {
    return NextResponse.json(
      { error: 'Stripe price ID is not configured.' },
      { status: 500 },
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData =
    {
      metadata: {
        plan,
        billingCycle,
        email,
      },
    };

  if (billingCycle === 'yearly') {
    subscriptionData.trial_period_days = 7;
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      plan,
      billingCycle,
      email,
    },
    subscription_data: subscriptionData,
    success_url: `${appUrl}/choose-plan/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/choose-plan`,
  });

  return NextResponse.json({ url: session.url });
}
