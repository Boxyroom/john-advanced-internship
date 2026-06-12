'use client';

import { ReactNode, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import styles from './AppLayout.module.css';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <SearchBar />
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
