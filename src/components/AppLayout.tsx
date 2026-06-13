'use client';

import { ReactNode, Suspense, useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';
import LoggedOutInfoModal from './LoggedOutInfoModal';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

type AppLayoutProps = {
  children: ReactNode;
};

const loggedOutModalSessionKey = 'summarist-logged-out-info-seen';

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dismissedModalPath, setDismissedModalPath] = useState<string | null>(null);
  const pathname = usePathname();
  const { isAuthenticated, openAuthModal } = useAuth();
  const isAppRoute =
    pathname === '/for-you' ||
    pathname === '/settings' ||
    pathname === '/library' ||
    pathname === '/choose-plan' ||
    pathname.startsWith('/book/') ||
    pathname.startsWith('/player/');
  const shouldShowLoggedOutModal =
    !isAuthenticated &&
    isAppRoute &&
    dismissedModalPath !== pathname;

  useEffect(() => {
    window.sessionStorage.removeItem(loggedOutModalSessionKey);
  }, []);

  function closeLoggedOutModal() {
    setDismissedModalPath(pathname);
  }

  function handleLoggedOutLogin() {
    closeLoggedOutModal();
    openAuthModal('login');
  }

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.sidebarFrame} ${
          isSidebarOpen ? styles.sidebarFrameOpen : ''
        }`}
      >
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>
      <button
        className={`${styles.sidebarBackdrop} ${
          isSidebarOpen ? styles.sidebarBackdropOpen : ''
        }`}
        aria-label="Close navigation"
        type="button"
        onClick={() => setIsSidebarOpen(false)}
      />
      <main className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuButton}
            aria-label={isSidebarOpen ? 'Close navigation' : 'Open navigation'}
            type="button"
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
      {shouldShowLoggedOutModal ? (
        <LoggedOutInfoModal
          onClose={closeLoggedOutModal}
          onLogin={handleLoggedOutLogin}
        />
      ) : null}
    </div>
  );
}
