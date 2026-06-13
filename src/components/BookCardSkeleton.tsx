import styles from './BookCardSkeleton.module.css';

export default function BookCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.skeleton} ${styles.cover}`} />
      <div className={`${styles.skeleton} ${styles.title}`} />
      <div className={`${styles.skeleton} ${styles.author}`} />
      <div className={`${styles.skeleton} ${styles.subtitle}`} />
      <div className={`${styles.skeleton} ${styles.meta}`} />
    </div>
  );
}
