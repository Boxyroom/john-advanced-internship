import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FiFileText, FiKey } from 'react-icons/fi';
import AudioDuration from '@/components/AudioDuration';
import AppLayout from '@/components/AppLayout';
import { getBook } from '@/lib/booksApi';
import BookActions from './BookActions';
import styles from './BookDetails.module.css';

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBook(id).catch(() => null);
  const hasBook = Boolean(book?.id);

  if (!book || !hasBook) {
    return (
      <AppLayout>
        <article className={styles.page}>
          <div className={styles.errorState}>
            <h1 className={styles.title}>Book not found</h1>
            <p className={styles.summaryText}>
              We couldn&apos;t load this book right now. Please go back and try
              another title.
            </p>
          </div>
        </article>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <article className={styles.page}>
        <div className={`${styles.hero} ${styles.heroWithCover}`}>
          <div className={styles.coverPanel}>
            <Image
              className={styles.cover}
              src={book.imageLink}
              alt={`${book.title} cover`}
              width={341}
              height={512}
              sizes="(max-width: 700px) 300px, (max-width: 900px) 240px, 300px"
              priority
            />
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.subtitle}>{book.subTitle}</p>

            <div className={styles.metadata}>
              <div className={styles.metadataItem}>
                <AiFillStar className={styles.star} size={20} />
                <span>
                  {book.averageRating} ({book.totalRating} ratings)
                </span>
              </div>
              <div className={styles.metadataItem}>
                <BiTimeFive size={20} />
                <AudioDuration audioLink={book.audioLink} />
              </div>
              <div className={styles.metadataItem}>
                <FiFileText size={20} />
                <span>{book.type}</span>
              </div>
              <div className={styles.metadataItem}>
                <FiKey size={20} />
                <span>{book.keyIdeas} Key Ideas</span>
              </div>
            </div>

            <div className={styles.tags} aria-label="Book categories">
              {book.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <BookActions
              book={{
                id: book.id,
                title: book.title,
                author: book.author,
                subTitle: book.subTitle,
                imageLink: book.imageLink,
              }}
            />

            <section className={styles.summary}>
              <div className={styles.summaryBlock}>
                <h2 className={styles.summaryTitle}>What&apos;s it about?</h2>
                <p className={styles.summaryText}>{book.bookDescription}</p>
              </div>

              <div className={styles.summaryBlock}>
                <h2 className={styles.summaryTitle}>About the author</h2>
                <p className={styles.summaryText}>{book.authorDescription}</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </AppLayout>
  );
}
