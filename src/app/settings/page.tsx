'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCrown } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/components/AuthContext';
import {
  getSubscription,
  getSubscriptionLabel,
} from '@/lib/subscription';
import styles from './Settings.module.css';

export default function SettingsPage() {
  const { isAuthenticated, openAuthModal, user } = useAuth();
  const subscription = getSubscription(user?.email, isAuthenticated);
  const subscriptionLabel = getSubscriptionLabel(subscription);
  const shouldShowUpgrade = subscription === 'basic';

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.header}>
          <p className={styles.eyebrow}>Account</p>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.description}>
            Manage your account details and subscription status.
          </p>
        </section>

        {!isAuthenticated ? (
          <section className={styles.loggedOutPanel}>
            <div className={styles.illustrationWrap}>
              <Image
                className={styles.illustration}
                src="/assets/login.png"
                alt="Login to Summarist"
                width={280}
                height={280}
                priority
              />
            </div>
            <div className={styles.loggedOutContent}>
              <h2 className={styles.panelTitle}>Log in to view your account</h2>
              <p className={styles.panelDescription}>
                Sign in to see your email, subscription status, and account settings.
              </p>
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => openAuthModal('login')}
              >
                Login
              </button>
            </div>
          </section>
        ) : (
          <section className={styles.settingsGrid}>
            <article className={styles.accountCard}>
              <div>
                <p className={styles.cardLabel}>Subscription Status</p>
                <div className={styles.statusRow}>
                  <span
                    className={`${styles.statusBadge} ${
                      subscription === 'basic' ? styles.statusBadgeBasic : ''
                    }`}
                  >
                    {subscription !== 'basic' ? <FaCrown size={14} /> : null}
                    {subscriptionLabel}
                  </span>
                </div>
              </div>

              {shouldShowUpgrade ? (
                <Link className={styles.primaryButton} href="/choose-plan">
                  Upgrade to Premium
                </Link>
              ) : null}
            </article>

            <article className={styles.accountCard}>
              <div>
                <p className={styles.cardLabel}>Email</p>
                <p className={styles.email}>{user?.email}</p>
              </div>
            </article>
          </section>
        )}
      </div>
    </AppLayout>
  );
}
