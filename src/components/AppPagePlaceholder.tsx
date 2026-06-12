import AppLayout from './AppLayout';
import styles from './AppLayout.module.css';

type AppPagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function AppPagePlaceholder({
  eyebrow,
  title,
  description,
}: AppPagePlaceholderProps) {
  return (
    <AppLayout>
      <section className={styles.pageHeader}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </section>

      <section className={styles.placeholderGrid} aria-label={`${title} layout preview`}>
        {[1, 2, 3].map((item) => (
          <div className={styles.placeholderCard} key={item}>
            <div className={styles.placeholderCardTitle} />
            <div className={styles.placeholderLine} />
            <div className={styles.placeholderLine} />
            <div className={`${styles.placeholderLine} ${styles.placeholderLineShort}`} />
          </div>
        ))}
      </section>
    </AppLayout>
  );
}
