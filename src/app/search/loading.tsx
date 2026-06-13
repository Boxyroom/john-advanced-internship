import AppLoadingLayout from '@/components/AppLoadingLayout';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import styles from './Search.module.css';

const resultSkeletons = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SearchLoading() {
  return (
    <AppLoadingLayout>
      <div className={styles.page} aria-label="Loading search results">
        <section className={styles.header}>
          <p className={styles.eyebrow}>Discover</p>
          <h1 className={styles.title}>Search</h1>
          <p className={styles.description}>Loading search results...</p>
        </section>

        <section className={styles.results} aria-label="Search results loading">
          {resultSkeletons.map((item) => (
            <BookCardSkeleton key={item} />
          ))}
        </section>
      </div>
    </AppLoadingLayout>
  );
}
