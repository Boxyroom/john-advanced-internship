import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import {
  FiBookOpen,
  FiBookmark,
  FiFileText,
  FiHeadphones,
  FiKey,
} from 'react-icons/fi';
import AppLayout from '@/components/AppLayout';
import { getBookById } from '@/data/books';
import styles from './BookDetails.module.css';

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = getBookById(id);
  const hasCoverImage = Boolean(book.coverImage);

  return (
    <AppLayout>
      <article className={styles.page}>
        <div className={`${styles.hero} ${hasCoverImage ? styles.heroWithCover : ''}`}>
          {hasCoverImage ? (
            <div className={styles.coverPanel}>
              <Image
                className={styles.cover}
                src={book.coverImage}
                alt={`${book.title} cover`}
                width={341}
                height={512}
                sizes="(max-width: 700px) 300px, (max-width: 900px) 240px, 300px"
                priority
              />
            </div>
          ) : null}

          <div className={styles.content}>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.subtitle}>{book.subtitle}</p>

            <div className={styles.metadata}>
              <div className={styles.metadataItem}>
                <AiFillStar className={styles.star} size={20} />
                <span>{book.rating}</span>
              </div>
              <div className={styles.metadataItem}>
                <BiTimeFive size={20} />
                <span>{book.duration}</span>
              </div>
              <div className={styles.metadataItem}>
                <FiFileText size={20} />
                <span>Audio &amp; Text</span>
              </div>
              <div className={styles.metadataItem}>
                <FiKey size={20} />
                <span>8 Key Ideas</span>
              </div>
            </div>

            <div className={styles.tags} aria-label="Book categories">
              {book.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryAction} type="button">
                <FiBookOpen size={18} />
                Read
              </button>
              <button className={styles.primaryAction} type="button">
                <FiHeadphones size={18} />
                Listen
              </button>
              <button className={styles.secondaryAction} type="button">
                <FiBookmark size={18} />
                Add to Library
              </button>
            </div>

            <section className={styles.summary}>
              <div className={styles.summaryBlock}>
                <h2 className={styles.summaryTitle}>What&apos;s it about?</h2>
                <p className={styles.summaryText}>{book.description}</p>
              </div>

              <div className={styles.summaryBlock}>
                <h2 className={styles.summaryTitle}>About the author</h2>
                <p className={styles.summaryText}>{book.authorBio}</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </AppLayout>
  );
}
