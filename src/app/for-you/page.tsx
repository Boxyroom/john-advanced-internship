import Image from 'next/image';
import AppLayout from '@/components/AppLayout';
import BookCard from '@/components/BookCard';
import {
  getRecommendedBooks,
  getSelectedBook,
  getSuggestedBooks,
} from '@/lib/booksApi';
import styles from './ForYou.module.css';

export const dynamic = 'force-dynamic';

export default async function ForYouPage() {
  const [selectedBook, recommendedBooks, suggestedBooks] = await Promise.all([
    getSelectedBook(),
    getRecommendedBooks(),
    getSuggestedBooks(),
  ]);

  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Selected just for you</h2>
          </div>

          <div className={styles.selectedCard}>
            <div className={styles.selectedCopy}>
              <p className={styles.selectedIntro}>{selectedBook.subTitle}</p>
              <div className={styles.selectedDivider} />
              <div className={styles.selectedMeta}>
                <div className={styles.selectedTitleRow}>
                  <h3 className={styles.selectedTitle}>{selectedBook.title}</h3>
                </div>
                <p className={styles.selectedAuthor}>{selectedBook.author}</p>
              </div>
            </div>
            <Image
              className={styles.selectedImage}
              src={selectedBook.imageLink}
              alt={`${selectedBook.title} cover`}
              width={341}
              height={512}
              sizes="(max-width: 576px) 104px, 140px"
              priority
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended For You</h2>
            <p className={styles.sectionSubtitle}>We think you&apos;ll like these</p>
          </div>
          <div className={styles.bookGrid}>
            {recommendedBooks.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Suggested Books</h2>
            <p className={styles.sectionSubtitle}>Browse more books</p>
          </div>
          <div className={`${styles.bookGrid} ${styles.suggestedGrid}`}>
            {suggestedBooks.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
