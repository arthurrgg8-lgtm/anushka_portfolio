"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface HeroSlideshowProps {
  images: string[];
  interval?: number;
  fadeDuration?: number;
  noOverlays?: boolean;
  cover?: boolean;
}

export default function HeroSlideshow({
  images,
  interval = 5000,
  fadeDuration = 1500,
  noOverlays = false,
  cover = false,
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start cycling once component is mounted and images are available
  useEffect(() => {
    if (images.length > 0) {
      setActive(true);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Loading state / Fallback */}
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      )}

      {/* Images */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: active && i === currentIndex ? 1 : 0,
            transitionDuration: `${fadeDuration}ms`,
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className={`${cover ? "object-cover" : "object-contain"}`}
            sizes="100vw"
            priority={i === 0}
            draggable={false}
          />
        </div>
      ))}

      {/* Overlays — only when used as fullscreen background */}
      {!noOverlays && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 via-50% to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 via-50% to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,60,0.08)_0%,transparent_60%)]" />
        </>
      )}

      {/* Index indicators */}
      {active && (
        <div className="absolute bottom-6 right-6 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-6 bg-secondary/80"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
