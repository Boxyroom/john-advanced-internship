import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout';
import BookCard from '@/components/BookCard';
import { recommendedBooks, suggestedBooks } from '@/data/books';
import styles from './ForYou.module.css';

const selectedBook = recommendedBooks[0];

export default function ForYouPage() {
  return (
    <AppLayout>
      <div className={styles.page}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Selected just for you</h2>
          </div>

          <div className={styles.selectedCard}>
            <div className={styles.selectedCopy}>
              <p className={styles.selectedIntro}>How to win friends and influence people</p>
              <div className={styles.selectedDivider} />
              <div className={styles.selectedMeta}>
                <div className={styles.selectedTitleRow}>
                  <h3 className={styles.selectedTitle}>{selectedBook.title}</h3>
                  <span className={styles.premiumPill}>
                    <FaCrown size={11} />
                    Premium
                  </span>
                </div>
                <p className={styles.selectedAuthor}>{selectedBook.author}</p>
                <p className={styles.selectedDescription}>
                  Tiny changes, remarkable results. Learn how small habits compound
                  into meaningful progress through better systems.
                </p>
                <div className={styles.selectedStats}>
                  <span className={styles.selectedStat}>
                    <BiTimeFive size={17} />
                    {selectedBook.duration}
                  </span>
                  <span className={styles.selectedStat}>
                    <AiFillStar size={17} />
                    {selectedBook.rating}
                  </span>
                </div>
              </div>
            </div>
            <Image
              className={styles.selectedImage}
              src={selectedBook.coverImage}
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
            <p className={styles.sectionSubtitle}>Browse more summaries to read next</p>
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
