import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

type VerifyCheckoutRequest = {
  session_id?: string;
};

export async function POST(request: Request) {
  const { session_id: sessionId } = await request.json() as VerifyCheckoutRequest;

  if (!sessionId) {
    return NextResponse.json(
      { error: 'session_id is required.' },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      customerEmail: session.customer_details?.email ?? session.customer_email,
      paymentStatus: session.payment_status,
      plan: session.metadata?.plan ?? null,
      billingCycle: session.metadata?.billingCycle ?? null,
      subscriptionId:
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription?.id ?? null,
    });
  } catch (error) {
    if (
      error instanceof Stripe.errors.StripeInvalidRequestError &&
      error.code === 'resource_missing'
    ) {
      return NextResponse.json(
        { error: 'Checkout session not found.' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: 'Unable to verify checkout session.' },
      { status: 500 },
    );
  }
}
