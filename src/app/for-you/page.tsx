import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import AppLayout from '@/components/AppLayout';
import BookCard, { BookCardData } from '@/components/BookCard';
import styles from './ForYou.module.css';

const recommendedBooks: BookCardData[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    subtitle: 'Tiny changes, remarkable results through better daily systems.',
    duration: '18 min',
    rating: '4.8',
    isPremium: true,
    coverImage: '/assets/book-atomic-habits.png',
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    subtitle: 'Rules for focused success in a distracted world.',
    duration: '16 min',
    rating: '4.7',
    coverImage: '/assets/book-deep-work.png',
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    subtitle: 'Timeless lessons on wealth, greed, and happiness.',
    duration: '21 min',
    rating: '4.9',
    isPremium: true,
    coverImage: '/assets/book-psychology-money.png',
  },
  {
    id: 'cant-hurt-me',
    title: "Can't Hurt Me",
    author: 'David Goggins',
    subtitle: 'Master your mind and defy the odds.',
    duration: '19 min',
    rating: '4.6',
    coverImage: '/assets/book-cant-hurt-me.png',
  },
  {
    id: 'start-with-why',
    title: 'Start With Why',
    author: 'Simon Sinek',
    subtitle: 'How great leaders inspire everyone to take action.',
    duration: '15 min',
    rating: '4.5',
    coverImage: '/assets/book-start-with-why.png',
  },
];

const suggestedBooks: BookCardData[] = [
  {
    id: 'essentialism',
    title: 'Essentialism',
    author: 'Greg McKeown',
    subtitle: 'The disciplined pursuit of less.',
    duration: '14 min',
    rating: '4.7',
    coverImage: '/assets/book-essentialism.png',
  },
  {
    id: 'mindset',
    title: 'Mindset',
    author: 'Carol S. Dweck',
    subtitle: 'The new psychology of success.',
    duration: '13 min',
    rating: '4.6',
    isPremium: true,
    coverImage: '/assets/book-mindset.png',
  },
  {
    id: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    subtitle: 'Notes on startups, monopoly, and building the future.',
    duration: '17 min',
    rating: '4.8',
    coverImage: '/assets/book-zero-to-one.png',
  },
  {
    id: 'grit',
    title: 'Grit',
    author: 'Angela Duckworth',
    subtitle: 'The power of passion and perseverance.',
    duration: '12 min',
    rating: '4.4',
    coverImage: '/assets/book-grit.png',
  },
];

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
