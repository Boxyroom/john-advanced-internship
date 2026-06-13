export type SubscriptionPlan =
  | 'basic'
  | 'premium'
  | 'premium-plus';

const SUBSCRIPTION_KEY = 'summarist-subscription-plan';
export const SUBSCRIPTION_CHANGE_EVENT = 'summarist-subscription-change';

const subscriptionPlans: SubscriptionPlan[] = ['basic', 'premium', 'premium-plus'];
type StoredSubscriptions = Record<string, SubscriptionPlan>;

function canUseStorage() {
  return typeof window !== 'undefined';
}

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? '';
}

export function isSubscriptionPlan(plan: string | null): plan is SubscriptionPlan {
  return Boolean(plan && subscriptionPlans.includes(plan as SubscriptionPlan));
}

function getStoredSubscriptions(): StoredSubscriptions {
  if (!canUseStorage()) {
    return {};
  }

  const storedSubscriptions = window.localStorage.getItem(SUBSCRIPTION_KEY);

  if (!storedSubscriptions) {
    return {};
  }

  try {
    const parsedSubscriptions = JSON.parse(storedSubscriptions) as Record<string, string>;

    return Object.entries(parsedSubscriptions).reduce<StoredSubscriptions>(
      (subscriptions, [email, plan]) => {
        const normalizedEmail = normalizeEmail(email);

        if (normalizedEmail && isSubscriptionPlan(plan)) {
          subscriptions[normalizedEmail] = plan;
        }

        return subscriptions;
      },
      {},
    );
  } catch {
    return {};
  }
}

export function getStoredSubscription(email: string | null | undefined) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  return getStoredSubscriptions()[normalizedEmail] ?? null;
}

export function getSubscription(
  email: string | null | undefined,
  isAuthenticated = false,
) {
  return getStoredSubscription(email) ?? (isAuthenticated ? 'basic' : null);
}

export function hasPremiumAccess(plan: SubscriptionPlan | null) {
  return plan === 'premium' || plan === 'premium-plus';
}

export function setSubscription(email: string | null | undefined, plan: SubscriptionPlan) {
  if (!canUseStorage()) {
    return;
  }

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return;
  }

  const subscriptions = getStoredSubscriptions();
  subscriptions[normalizedEmail] = plan;
  window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptions));
  window.dispatchEvent(new Event(SUBSCRIPTION_CHANGE_EVENT));
}

export function clearSubscription(email?: string | null) {
  if (!canUseStorage()) {
    return;
  }

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    window.localStorage.removeItem(SUBSCRIPTION_KEY);
    window.dispatchEvent(new Event(SUBSCRIPTION_CHANGE_EVENT));
    return;
  }

  const subscriptions = getStoredSubscriptions();
  delete subscriptions[normalizedEmail];
  window.localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptions));
  window.dispatchEvent(new Event(SUBSCRIPTION_CHANGE_EVENT));
}

export function getSubscriptionLabel(plan: SubscriptionPlan | null) {
  if (plan === 'premium-plus') {
    return 'Premium Plus';
  }

  if (plan === 'premium') {
    return 'Premium';
  }

  if (plan === 'basic') {
    return 'Basic';
  }

  return 'No plan';
}
