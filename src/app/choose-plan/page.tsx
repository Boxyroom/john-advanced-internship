'use client';

import { useState } from 'react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/components/AuthContext';
import {
  getSubscription,
  getSubscriptionLabel,
  type SubscriptionPlan,
} from '@/lib/subscription';
import styles from './ChoosePlan.module.css';

type BillingCycle = 'monthly' | 'yearly';

type PaidPlan = {
  id: Exclude<SubscriptionPlan, 'basic'>;
  name: string;
  eyebrow: string;
  monthlyPrice: string;
  yearlyPrice: string;
  monthlyCaption: string;
  yearlyCaption: string;
  features: string[];
  highlighted?: boolean;
};

const plans: PaidPlan[] = [
  {
    id: 'premium',
    name: 'Premium',
    eyebrow: 'Essential access',
    monthlyPrice: '$9.99',
    yearlyPrice: '$99.99',
    monthlyCaption: 'per month',
    yearlyCaption: 'per year after trial',
    features: [
      'Unlimited book summaries',
      'Audio summaries for every title',
      'Save titles to your library',
      'Personal reading progress',
    ],
  },
  {
    id: 'premium-plus',
    name: 'Premium Plus',
    eyebrow: 'Best value',
    monthlyPrice: '$19.99',
    yearlyPrice: '$179.99',
    monthlyCaption: 'per month',
    yearlyCaption: 'per year after trial',
    features: [
      'Everything in Premium',
      'Priority access to new releases',
      'Advanced learning collections',
      'Premium Plus member support',
    ],
    highlighted: true,
  },
];

const faqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'The yearly option includes a 7-day free trial. This local demo records the selected plan without starting a real payment.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. Choose a different plan from this page and the app will update your saved subscription selection.',
  },
  {
    question: 'Will I be charged today?',
    answer:
      'No. This implementation does not include Stripe, checkout, or real billing.',
  },
  {
    question: 'What happens after upgrading?',
    answer:
      'Your selected plan is saved locally and you are redirected to Settings, where the app can display account status next.',
  },
];

export default function ChoosePlanPage() {
  const { isAuthenticated, isGuest, openAuthModal, user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlan | null>(null);
  const subscription = getSubscription(user?.email, isAuthenticated);
  const subscriptionLabel = getSubscriptionLabel(subscription);

  async function handleUpgrade(plan: SubscriptionPlan) {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (isGuest) {
      openAuthModal('register');
      return;
    }

    if (
      subscription === plan ||
      (subscription === 'premium-plus' && plan === 'premium')
    ) {
      return;
    }

    setCheckoutError('');
    setCheckoutPlan(plan);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          billingCycle,
          email: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to start checkout. Please try again.');
      }

      const data = await response.json() as { url?: string };

      if (!data.url) {
        throw new Error('Checkout URL was not returned. Please try again.');
      }

      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : 'Unable to start checkout. Please try again.',
      );
      setCheckoutPlan(null);
    }
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Subscription</p>
            <h1 className={styles.title}>Choose the plan that fits your reading</h1>
            <p className={styles.description}>
              Unlock more summaries, audio, and guided learning with Premium or
              Premium Plus.
            </p>
          </div>

          <div className={styles.billingToggle} aria-label="Billing cycle">
            <button
              className={`${styles.billingButton} ${
                billingCycle === 'monthly' ? styles.billingButtonActive : ''
              }`}
              type="button"
              aria-pressed={billingCycle === 'monthly'}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`${styles.billingButton} ${
                billingCycle === 'yearly' ? styles.billingButtonActive : ''
              }`}
              type="button"
              aria-pressed={billingCycle === 'yearly'}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
        </section>

        {billingCycle === 'yearly' ? (
          <div className={styles.trialBanner}>
            Start with a 7-day free trial when you choose annual billing.
          </div>
        ) : null}

        {checkoutError ? (
          <div className={styles.trialBanner} role="alert">
            {checkoutError}
          </div>
        ) : null}

        {subscription && subscription !== 'basic' ? (
          <div className={styles.currentPlanBanner}>
            <FaCrown size={14} />
            Your current plan: {subscriptionLabel}
          </div>
        ) : null}

        <section className={styles.planGrid} aria-label="Subscription plans">
          {plans.map((plan) => {
            const price =
              billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const caption =
              billingCycle === 'monthly' ? plan.monthlyCaption : plan.yearlyCaption;
            const isCurrentPlan = subscription === plan.id;
            const isIncludedInPremiumPlus =
              subscription === 'premium-plus' && plan.id === 'premium';
            const isPlanUnavailable = isCurrentPlan || isIncludedInPremiumPlus;
            const buttonText = checkoutPlan === plan.id
              ? 'Redirecting...'
              : isCurrentPlan
                ? 'Current plan'
                : isIncludedInPremiumPlus
                  ? 'Included in Premium Plus'
                  : `Upgrade to ${plan.name}`;

            return (
              <article
                className={`${styles.planCard} ${
                  plan.highlighted ? styles.planCardFeatured : ''
                }`}
                key={plan.id}
              >
                {plan.highlighted ? (
                  <div className={styles.featuredPill}>
                    <FaCrown size={12} />
                    Most popular
                  </div>
                ) : null}

                <p className={styles.planEyebrow}>{plan.eyebrow}</p>
                <h2 className={styles.planName}>{plan.name}</h2>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{price}</span>
                  <span className={styles.priceCaption}>{caption}</span>
                </div>

                {billingCycle === 'yearly' ? (
                  <p className={styles.trialNote}>Includes 7-day free trial</p>
                ) : null}

                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li className={styles.featureItem} key={feature}>
                      <FiCheck size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`${styles.upgradeButton} ${
                    plan.highlighted ? styles.upgradeButtonFeatured : ''
                  } ${isPlanUnavailable ? styles.upgradeButtonDisabled : ''}`}
                  type="button"
                  disabled={checkoutPlan === plan.id || isPlanUnavailable}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {buttonText}
                </button>
                {isPlanUnavailable ? (
                  <p className={styles.planStatus}>
                    {isCurrentPlan
                      ? `You already have ${plan.name}.`
                      : 'Premium is included with your Premium Plus plan.'}
                  </p>
                ) : null}
              </article>
            );
          })}
        </section>

        <section className={styles.faqSection} aria-label="Frequently asked questions">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Questions</p>
            <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
          </div>

          <div className={styles.accordion}>
            {faqs.map((item) => (
              <details className={styles.accordionItem} key={item.question}>
                <summary className={styles.accordionSummary}>
                  <span>{item.question}</span>
                  <FiChevronDown className={styles.accordionIcon} size={20} />
                </summary>
                <p className={styles.accordionBody}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
