import { ReactNode } from 'react';
import styles from './AppLayout.module.css';
import loadingStyles from './AppLoadingLayout.module.css';

type AppLoadingLayoutProps = {
  children: ReactNode;
};

export default function AppLoadingLayout({ children }: AppLoadingLayoutProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebarFrame}>
        <aside className={styles.sidebar}>
          <div className={styles.brand} aria-label="Summarist home">
            <div className={loadingStyles.logo} aria-hidden="true" />
          </div>
        </aside>
      </div>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <form className={styles.searchForm} role="search" aria-hidden="true">
            <span className={loadingStyles.searchIcon} />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search books"
              disabled
              tabIndex={-1}
            />
          </form>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
