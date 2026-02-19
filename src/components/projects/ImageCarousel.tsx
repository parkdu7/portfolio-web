'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  projectId: string;
}

export function ImageCarousel({ images, projectId }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  // Get container width for pixel-based animation
  const getContainerWidth = useCallback(() => {
    return containerRef.current?.clientWidth ?? 400;
  }, []);

  // Animate to a specific slide index
  const snapToIndex = useCallback(
    (index: number, immediate = false) => {
      const width = getContainerWidth();
      const targetX = -(index * width);
      if (immediate) {
        x.set(targetX);
      } else {
        animate(x, targetX, {
          type: 'spring',
          stiffness: 320,
          damping: 32,
          mass: 0.8,
        });
      }
    },
    [x, getContainerWidth]
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      setCurrent(clamped);
      snapToIndex(clamped);
    },
    [images.length, snapToIndex]
  );

  // Re-snap when container resizes (e.g., window resize)
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      snapToIndex(current, true);
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [current, snapToIndex]);

  // Keyboard navigation
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
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Track: all images side by side */}
        <motion.div
          className="flex h-full"
          style={{ x }}
          drag="x"
          dragDirectionLock
          dragConstraints={{
            left: -(images.length - 1) * getContainerWidth(),
            right: 0,
          }}
          dragElastic={0.05}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={(_, info) => {
            isDragging.current = false;
            const width = getContainerWidth();
            const threshold = width * 0.25;
            const offsetX = info.offset.x;

            if (offsetX < -threshold && current < images.length - 1) {
              goTo(current + 1);
            } else if (offsetX > threshold && current > 0) {
              goTo(current - 1);
            } else {
              // Snap back to current
              snapToIndex(current);
            }
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="w-full h-full shrink-0"
              style={{ minWidth: '100%' }}
            >
              {/* First image shares layoutId with ProjectCard thumbnail */}
              {i === 0 ? (
                <motion.img
                  layoutId={`project-image-${projectId}`}
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                  onError={(e) => {
                    // Fallback placeholder
                    (e.currentTarget as HTMLImageElement).src =
                      `https://placehold.co/800x600/1e40af/white?text=Image+${i + 1}`;
                  }}
                />
              ) : (
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
              )}
            </div>
          ))}
        </motion.div>

        {/* Left arrow */}
        {current > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 glass rounded-full
                       flex items-center justify-center hover:bg-primary-500/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </motion.button>
        )}

        {/* Right arrow */}
        {current < images.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 glass rounded-full
                       flex items-center justify-center hover:bg-primary-500/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </motion.button>
        )}

        {/* Slide counter */}
        <div className="absolute bottom-3 right-3 glass rounded-full px-2.5 py-1 text-xs font-mono">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1.5 py-3">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            animate={{
              width: i === current ? 22 : 6,
              backgroundColor: i === current ? '#3b82f6' : 'rgba(107, 114, 128, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="h-1.5 rounded-full"
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-thin">
          {images.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
