export type MockBook = {
  id: string;
  title: string;
  author: string;
  subtitle: string;
  duration: string;
  rating: string;
  isPremium?: boolean;
  coverImage: string;
  audioUrl?: string;
  tags: string[];
  description: string;
  authorBio: string;
};

const placeholderAudioUrls = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
];

export const recommendedBooks: MockBook[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    subtitle: 'Tiny changes, remarkable results through better daily systems.',
    duration: '18 min',
    rating: '4.8',
    isPremium: true,
    coverImage: '/assets/book-atomic-habits.png',
    audioUrl: placeholderAudioUrls[0],
    tags: ['Self-growth', 'Productivity', 'Habits'],
    description:
      'Atomic Habits explains how small improvements compound into meaningful life changes. It focuses on practical systems for building better routines, breaking bad patterns, and making progress feel easier to repeat.',
    authorBio:
      'James Clear writes about habits, decision-making, and continuous improvement, translating behavioral science into practical steps for everyday life.',
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    subtitle: 'Rules for focused success in a distracted world.',
    duration: '16 min',
    rating: '4.7',
    coverImage: '/assets/book-deep-work.png',
    audioUrl: placeholderAudioUrls[1],
    tags: ['Focus', 'Work', 'Productivity'],
    description:
      'Deep Work argues that sustained concentration is one of the most valuable skills in modern work. The book outlines rituals and boundaries that help protect attention and produce higher-quality results.',
    authorBio:
      'Cal Newport is a computer science professor and author known for writing about technology, focus, and meaningful work.',
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
    audioUrl: placeholderAudioUrls[2],
    tags: ['Money', 'Mindset', 'Finance'],
    description:
      'The Psychology of Money explores why financial success depends as much on behavior as knowledge. It highlights patience, humility, risk, and personal values as core parts of building wealth.',
    authorBio:
      'Morgan Housel is a partner at The Collaborative Fund and a writer focused on investing, behavior, and financial decision-making.',
  },
  {
    id: 'cant-hurt-me',
    title: "Can't Hurt Me",
    author: 'David Goggins',
    subtitle: 'Master your mind and defy the odds.',
    duration: '19 min',
    rating: '4.6',
    coverImage: '/assets/book-cant-hurt-me.png',
    audioUrl: placeholderAudioUrls[0],
    tags: ['Mindset', 'Discipline', 'Motivation'],
    description:
      "Can't Hurt Me follows David Goggins' transformation through discipline, endurance, and mental toughness. Its lessons center on accountability, resilience, and pushing beyond self-imposed limits.",
    authorBio:
      'David Goggins is a retired Navy SEAL, endurance athlete, and speaker known for his intense approach to mental resilience.',
  },
  {
    id: 'start-with-why',
    title: 'Start With Why',
    author: 'Simon Sinek',
    subtitle: 'How great leaders inspire everyone to take action.',
    duration: '15 min',
    rating: '4.5',
    coverImage: '/assets/book-start-with-why.png',
    audioUrl: placeholderAudioUrls[1],
    tags: ['Leadership', 'Business', 'Purpose'],
    description:
      'Start With Why explains how clear purpose helps leaders and organizations earn trust. It frames inspiration as the result of communicating beliefs before products, tactics, or features.',
    authorBio:
      'Simon Sinek is an author and speaker best known for his work on leadership, purpose, and organizational culture.',
  },
];

export const suggestedBooks: MockBook[] = [
  {
    id: 'essentialism',
    title: 'Essentialism',
    author: 'Greg McKeown',
    subtitle: 'The disciplined pursuit of less.',
    duration: '14 min',
    rating: '4.7',
    coverImage: '/assets/book-essentialism.png',
    audioUrl: placeholderAudioUrls[2],
    tags: ['Focus', 'Priorities', 'Productivity'],
    description:
      'Essentialism makes the case for choosing fewer things with greater intention. It helps readers identify what matters, remove distractions, and invest energy where it has the most impact.',
    authorBio:
      'Greg McKeown is an author and speaker who teaches leaders and teams how to focus on the work that matters most.',
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
    audioUrl: placeholderAudioUrls[0],
    tags: ['Psychology', 'Learning', 'Growth'],
    description:
      'Mindset explains how beliefs about ability shape learning, effort, and achievement. It contrasts fixed and growth mindsets and shows how changing assumptions can unlock improvement.',
    authorBio:
      'Carol S. Dweck is a psychologist whose research focuses on motivation, learning, and the beliefs that shape achievement.',
  },
  {
    id: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    subtitle: 'Notes on startups, monopoly, and building the future.',
    duration: '17 min',
    rating: '4.8',
    coverImage: '/assets/book-zero-to-one.png',
    audioUrl: placeholderAudioUrls[1],
    tags: ['Startups', 'Business', 'Innovation'],
    description:
      'Zero to One explores how founders create new value instead of competing over what already exists. It emphasizes original thinking, durable advantages, and building for the future.',
    authorBio:
      'Peter Thiel is an entrepreneur and investor known for co-founding PayPal and backing early-stage technology companies.',
  },
  {
    id: 'grit',
    title: 'Grit',
    author: 'Angela Duckworth',
    subtitle: 'The power of passion and perseverance.',
    duration: '12 min',
    rating: '4.4',
    coverImage: '/assets/book-grit.png',
    audioUrl: placeholderAudioUrls[2],
    tags: ['Psychology', 'Success', 'Resilience'],
    description:
      'Grit examines why sustained effort and long-term passion often matter more than talent alone. It shows how perseverance can be developed through purpose, practice, and commitment.',
    authorBio:
      'Angela Duckworth is a psychologist and researcher known for her work on grit, achievement, and human performance.',
  },
];

export const allBooks = [...recommendedBooks, ...suggestedBooks];

export function getBookById(id: string) {
  return allBooks.find((book) => book.id === id) ?? recommendedBooks[0];
}
