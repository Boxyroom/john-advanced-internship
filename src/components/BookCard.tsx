import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { FaCrown } from 'react-icons/fa';
import type { Book } from '@/lib/booksApi';
import styles from './BookCard.module.css';

export type BookCardData = Pick<
  Book,
  | 'id'
  | 'title'
  | 'author'
  | 'subTitle'
  | 'imageLink'
  | 'averageRating'
  | 'subscriptionRequired'
>;

type BookCardProps = {
  book: BookCardData;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link className={styles.card} href={`/book/${book.id}`}>
      <div className={styles.coverWrap}>
        {book.subscriptionRequired ? (
          <span className={styles.premiumPill}>
            <FaCrown size={10} />
            Premium
          </span>
        ) : null}
        <Image
          className={styles.cover}
          src={book.imageLink}
          alt={`${book.title} cover`}
          width={341}
          height={512}
          sizes="(max-width: 576px) 44vw, (max-width: 900px) 148px, 172px"
        />
      </div>

      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.subtitle}>{book.subTitle}</p>
      <div className={styles.metadata}>
        <span className={styles.metadataItem}>
          <AiFillStar className={styles.star} size={16} />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}
