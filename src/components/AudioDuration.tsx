'use client';

import { useState } from 'react';
import { formatPlaybackTime } from '@/lib/time';

type AudioDurationProps = {
  audioLink: string;
};

export default function AudioDuration({ audioLink }: AudioDurationProps) {
  const [duration, setDuration] = useState(0);

  return (
    <>
      <span>{formatPlaybackTime(duration)}</span>
      <audio
        src={audioLink}
        preload="metadata"
        style={{ display: 'none' }}
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration;

          if (Number.isFinite(nextDuration)) {
            setDuration(nextDuration);
          }
        }}
      />
    </>
  );
}
