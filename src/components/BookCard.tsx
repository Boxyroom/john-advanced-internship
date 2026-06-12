import Image from 'next/image';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import styles from './BookCard.module.css';

export type BookCardData = {
  id: string;
  title: string;
  author: string;
  subtitle: string;
  duration: string;
  rating: string;
  isPremium?: boolean;
  coverImage: string;
};

type BookCardProps = {
  book: BookCardData;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link className={styles.card} href={`/book/${book.id}`}>
      <div className={styles.coverWrap}>
        {book.isPremium ? (
          <span className={styles.premiumPill}>
            <FaCrown size={10} />
            Premium
          </span>
        ) : null}
        <Image
          className={styles.cover}
          src={book.coverImage}
          alt={`${book.title} cover`}
          width={341}
          height={512}
          sizes="(max-width: 576px) 44vw, (max-width: 900px) 148px, 172px"
        />
      </div>

      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
      <p className={styles.subtitle}>{book.subtitle}</p>
      <div className={styles.metadata}>
        <span className={styles.metadataItem}>
          <BiTimeFive size={16} />
          {book.duration}
        </span>
        <span className={styles.metadataItem}>
          <AiFillStar className={styles.star} size={16} />
          {book.rating}
        </span>
      </div>
    </Link>
  );
}
