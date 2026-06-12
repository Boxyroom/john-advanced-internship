'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiBookmark,
  FiEdit3,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiSearch,
  FiSettings,
} from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import styles from './AppLayout.module.css';

const primaryLinks = [
  { href: '/for-you', label: 'For you', icon: FiHome },
  { href: '/library', label: 'My Library', icon: FiBookmark },
  { label: 'Highlights', icon: FiEdit3 },
  { href: '/search', label: 'Search', icon: FiSearch },
];

const secondaryLinks = [
  { href: '/settings', label: 'Settings', icon: FiSettings },
  { label: 'Help & Support', icon: FiHelpCircle },
  { label: 'Logout', icon: FiLogOut },
  { href: '/choose-plan', label: 'Upgrade to Premium', icon: FaCrown, upgrade: true },
];

function isActive(pathname: string, href: string) {
  if (href.includes('/preview')) {
    const basePath = href.split('/preview')[0];
    return pathname.startsWith(basePath);
  }

  return pathname === href;
}

type SidebarProps = {
  onNavigate?: () => void;
};

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    onNavigate?.();
    router.push('/');
  }

  return (
    <aside className={styles.sidebar}>
      <Link
        className={styles.brand}
        href="/for-you"
        aria-label="Summarist home"
        onClick={onNavigate}
      >
        <Image
          className={styles.logo}
          src="/assets/logo.png"
          alt="Summarist"
          width={200}
          height={80}
          priority
        />
      </Link>

      <nav className={styles.nav} aria-label="App navigation">
        <div className={styles.navGroup}>
          {primaryLinks.map((link) => {
            const Icon = link.icon;
            const active = link.href ? isActive(pathname, link.href) : false;

            if (link.label === 'Logout') {
              return (
                <button
                  key={link.label}
                  className={`${styles.navLink} ${styles.navButton}`}
                  type="button"
                  onClick={handleLogout}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  {link.label}
                </button>
              );
            }

            if (!link.href) {
              return (
                <span
                  key={link.label}
                  className={`${styles.navLink} ${styles.navLinkInactive}`}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  {link.label}
                </span>
              );
            }

            return (
              <Link
                key={link.label}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                href={link.href}
                onClick={onNavigate}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.navGroup}>
          {secondaryLinks.map((link) => {
            const Icon = link.icon;
            const active = link.href ? isActive(pathname, link.href) : false;

            if (link.label === 'Logout') {
              return (
                <button
                  key={link.label}
                  className={`${styles.navLink} ${styles.navButton}`}
                  type="button"
                  onClick={handleLogout}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  {link.label}
                </button>
              );
            }

            if (!link.href) {
              return (
                <span
                  key={link.label}
                  className={`${styles.navLink} ${styles.navLinkInactive}`}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  {link.label}
                </span>
              );
            }

            return (
              <Link
                key={link.label}
                className={`${styles.navLink} ${link.upgrade ? styles.upgradeLink : ''} ${
                  active ? styles.navLinkActive : ''
                }`}
                href={link.href}
                onClick={onNavigate}
              >
                <span className={styles.navIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
