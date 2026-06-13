import AppLoadingLayout from '@/components/AppLoadingLayout';
import BookCardSkeleton from '@/components/BookCardSkeleton';
import styles from './ForYou.module.css';
import skeletonStyles from './ForYouSkeleton.module.css';

const bookSkeletons = [1, 2, 3, 4, 5];

export default function ForYouLoading() {
  return (
    <AppLoadingLayout>
      <div className={styles.page} aria-label="Loading For You page">
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Selected just for you</h2>
          </div>

          <div className={styles.selectedCard}>
            <div className={styles.selectedCopy}>
              <div className={skeletonStyles.selectedIntroStack}>
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.introLine}`} />
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.introLineShort}`} />
              </div>
              <div className={styles.selectedDivider} />
              <div className={styles.selectedMeta}>
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.selectedTitle}`} />
                <div className={`${skeletonStyles.skeleton} ${skeletonStyles.selectedAuthor}`} />
              </div>
            </div>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.selectedImage}`} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended For You</h2>
            <p className={styles.sectionSubtitle}>We think you&apos;ll like these</p>
          </div>
          <div className={styles.bookGrid}>
            {bookSkeletons.map((item) => (
              <BookCardSkeleton key={item} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Suggested Books</h2>
            <p className={styles.sectionSubtitle}>Browse more books</p>
          </div>
          <div className={`${styles.bookGrid} ${styles.suggestedGrid}`}>
            {bookSkeletons.map((item) => (
              <BookCardSkeleton key={item} />
            ))}
          </div>
        </section>
      </div>
    </AppLoadingLayout>
  );
}
