'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(images.length - 1, index)));
    },
    [images.length]
  );

  // Pointer-based drag (no framer-motion drag overhead)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const diff = e.clientX - startXRef.current;
      const threshold = 60;
      if (diff < -threshold) goTo(current + 1);
      else if (diff > threshold) goTo(current - 1);
    },
    [current, goTo]
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goTo]);

  return (
    <div className="flex flex-col h-full select-none">
      {/* Viewport */}
      <div className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Track: CSS transform + transition, no JS animation library */}
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { isDragging.current = false; }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="w-full h-full shrink-0"
              style={{ minWidth: '100%' }}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://placehold.co/800x600/1e40af/white?text=Image+${i + 1}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 overlay-btn rounded-full
                       flex items-center justify-center hover:bg-primary-500/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right arrow */}
        {current < images.length - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 overlay-btn rounded-full
                       flex items-center justify-center hover:bg-primary-500/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Slide counter */}
        <div className="absolute bottom-3 right-3 overlay-btn rounded-full px-2.5 py-1 text-xs font-mono">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 py-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-200',
              i === current
                ? 'w-5 bg-primary-500'
                : 'w-1.5 bg-gray-400/50'
            )}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-thin">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'shrink-0 w-16 h-12 rounded-lg overflow-hidden ring-2 transition-all duration-200',
                i === current
                  ? 'ring-primary-500 opacity-100'
                  : 'ring-transparent opacity-50 hover:opacity-75'
              )}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://placehold.co/64x48/1e40af/white?text=${i + 1}`;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
