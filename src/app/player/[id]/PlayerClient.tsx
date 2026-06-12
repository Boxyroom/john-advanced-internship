'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiRotateCw,
} from 'react-icons/fi';
import { MockBook } from '@/data/books';
import styles from './Player.module.css';

type PlayerClientProps = {
  book: MockBook;
};

const playbackSpeeds = [0.75, 1, 1.25, 1.5, 2];

function durationToSeconds(duration: string) {
  const minutes = Number.parseInt(duration, 10);

  return Number.isFinite(minutes) ? minutes * 60 : 0;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

type PlayerProgressProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
};

function PlayerProgress({ currentTime, duration, onSeek }: PlayerProgressProps) {
  return (
    <div className={styles.timeline}>
      <input
        className={styles.progress}
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        aria-label="Playback progress"
        onChange={(event) => onSeek(Number(event.target.value))}
      />
      <div className={styles.timeRow}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

type PlayerControlsProps = {
  isPlaying: boolean;
  playbackSpeed: number;
  onTogglePlayback: () => void;
  onSkip: (seconds: number) => void;
  onSpeedChange: (speed: number) => void;
};

function PlayerControls({
  isPlaying,
  playbackSpeed,
  onTogglePlayback,
  onSkip,
  onSpeedChange,
}: PlayerControlsProps) {
  return (
    <div className={styles.controls}>
      <button
        className={styles.iconButton}
        type="button"
        aria-label="Skip backward 15 seconds"
        onClick={() => onSkip(-15)}
      >
        <FiRotateCcw size={21} />
      </button>
      <button
        className={styles.playButton}
        type="button"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        onClick={onTogglePlayback}
      >
        {isPlaying ? <FiPause size={25} /> : <FiPlay size={25} />}
      </button>
      <button
        className={styles.iconButton}
        type="button"
        aria-label="Skip forward 15 seconds"
        onClick={() => onSkip(15)}
      >
        <FiRotateCw size={21} />
      </button>
      <select
        className={styles.speedSelect}
        value={playbackSpeed}
        aria-label="Playback speed"
        onChange={(event) => onSpeedChange(Number(event.target.value))}
      >
        {playbackSpeeds.map((speed) => (
          <option value={speed} key={speed}>
            {speed}x
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PlayerClient({ book }: PlayerClientProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fallbackDuration = useMemo(() => durationToSeconds(book.duration), [book.duration]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration)) {
      setDuration(fallbackDuration);
      return;
    }

    setDuration(audio.duration);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }

  function handleSeek(time: number) {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = Math.min(Math.max(time, 0), duration);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function skip(seconds: number) {
    handleSeek(currentTime + seconds);
  }

  function handleSpeedChange(speed: number) {
    setPlaybackSpeed(speed);
  }

  function handleSourceChange(event: ChangeEvent<HTMLAudioElement>) {
    if (event.currentTarget.error) {
      setIsPlaying(false);
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.player} aria-label={`${book.title} audiobook player`}>
        <audio
          className={styles.audioElement}
          ref={audioRef}
          src={book.audioUrl}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onError={handleSourceChange}
        />

        <div className={styles.coverPanel}>
          <Image
            className={styles.cover}
            src={book.coverImage}
            alt={`${book.title} cover`}
            width={341}
            height={512}
            sizes="(max-width: 576px) 220px, (max-width: 900px) 260px, 280px"
            priority
          />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Now playing</p>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>{book.author}</p>
          <p className={styles.description}>{book.description}</p>

          <PlayerProgress
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />

          <PlayerControls
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            onTogglePlayback={togglePlayback}
            onSkip={skip}
            onSpeedChange={handleSpeedChange}
          />
        </div>
      </section>
    </div>
  );
}
