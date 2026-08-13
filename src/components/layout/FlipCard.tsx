import { useState, useLayoutEffect, useRef, ReactNode } from 'react';
import { Box } from '@mui/material';

interface FlipCardProps {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
}

export function FlipCard({ flipped, front, back }: FlipCardProps) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [hoehe, setHoehe] = useState(0);

  useLayoutEffect(() => {
    const aktivesElement = flipped ? backRef.current : frontRef.current;
    if (aktivesElement === null) return;

    const messen = () => setHoehe(aktivesElement.offsetHeight);
    messen();

    const beobachter = new ResizeObserver(messen);
    beobachter.observe(aktivesElement);

    return () => beobachter.disconnect();
  }, [flipped]);

  const seitenStil = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    backfaceVisibility: 'hidden' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
  };

  return (
    <Box sx={{ perspective: '2200px', width: '100%', maxWidth: 440 }}>
      <Box
        sx={{
          position: 'relative',
          height: hoehe,
          transformStyle: 'preserve-3d',
          transition: 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms ease',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Box ref={frontRef} sx={seitenStil} aria-hidden={flipped}>
          {front}
        </Box>
        <Box
          ref={backRef}
          sx={{ ...seitenStil, transform: 'rotateY(180deg)' }}
          aria-hidden={!flipped}
        >
          {back}
        </Box>
      </Box>
    </Box>
  );
}