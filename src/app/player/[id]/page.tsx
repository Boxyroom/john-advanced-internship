import AppLayout from '@/components/AppLayout';
import { getBook } from '@/lib/booksApi';
import PlayerClient from './PlayerClient';
import styles from './Player.module.css';

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const book = await getBook(id).catch(() => null);

  if (!book?.id) {
    return (
      <AppLayout>
        <div className={styles.page}>
          <section className={styles.errorState}>
            <h1 className={styles.title}>Book not found</h1>
            <p className={styles.description}>
              We couldn&apos;t load this audiobook right now. Please go back and
              try another title.
            </p>
          </section>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.summarySection}>
          <h1 className={styles.summaryTitle}>{book.title}</h1>
          <p className={styles.summaryText}>{book.summary}</p>
        </section>
        <PlayerClient book={book} />
      </div>
    </AppLayout>
  );
}
