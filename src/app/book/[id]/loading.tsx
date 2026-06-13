import AppLoadingLayout from '@/components/AppLoadingLayout';
import styles from './BookDetails.module.css';
import skeletonStyles from './BookDetailsSkeleton.module.css';

const metadataSkeletons = [1, 2, 3, 4];
const summarySkeletons = [1, 2, 3, 4, 5];

export default function BookDetailsLoading() {
  return (
    <AppLoadingLayout>
      <article className={styles.page} aria-label="Loading book details">
        <div className={`${styles.hero} ${styles.heroWithCover}`}>
          <div className={styles.coverPanel}>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.cover}`} />
          </div>

          <div className={styles.content}>
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.title}`} />
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.author}`} />
            <div className={`${skeletonStyles.skeleton} ${skeletonStyles.subtitle}`} />

            <div className={styles.metadata}>
              {metadataSkeletons.map((item) => (
                <div className={styles.metadataItem} key={item}>
                  <div className={`${skeletonStyles.skeleton} ${skeletonStyles.icon}`} />
                  <div className={`${skeletonStyles.skeleton} ${skeletonStyles.metaLine}`} />
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.action}`} />
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.action}`} />
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.secondaryAction}`} />
            </div>

            <section className={styles.summary}>
              <div className={`${skeletonStyles.skeleton} ${skeletonStyles.summaryTitle}`} />
              <div className={skeletonStyles.summaryLines}>
                {summarySkeletons.map((item) => (
                  <div
                    className={`${skeletonStyles.skeleton} ${
                      item === summarySkeletons.length
                        ? skeletonStyles.summaryLineShort
                        : skeletonStyles.summaryLine
                    }`}
                    key={item}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </AppLoadingLayout>
  );
}
