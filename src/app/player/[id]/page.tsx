import AppLayout from '@/components/AppLayout';
import { getBookById } from '@/data/books';
import PlayerClient from './PlayerClient';

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;
  const book = getBookById(id);

  return (
    <AppLayout>
      <PlayerClient book={book} />
    </AppLayout>
  );
}
