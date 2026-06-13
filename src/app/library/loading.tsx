import AppLoadingLayout from '@/components/AppLoadingLayout';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import styles from './Library.module.css';

const savedBookSkeletons = [1, 2, 3, 4];
const finishedBookSkeletons = [1, 2, 3, 4];

export default function LibraryLoading() {
  return (
    <AppLoadingLayout>
      <div className={styles.page} aria-label="Loading library">
        <section className={styles.header}>
          <p className={styles.eyebrow}>Saved</p>
          <h1 className={styles.title}>Library</h1>
          <p className={styles.description}>
            Keep track of saved books and summaries you have finished.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Saved Books</h2>
          </div>
          <div className={styles.bookGrid}>
            {savedBookSkeletons.map((item) => (
              <BookCardSkeleton key={item} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Finished Books</h2>
          </div>
          <div className={styles.bookGrid}>
            {finishedBookSkeletons.map((item) => (
              <BookCardSkeleton key={item} />
            ))}
          </div>
        </section>
      </div>
    </AppLoadingLayout>
  );
}
