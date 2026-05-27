"use client";

import { useEffect, useRef } from "react";
import TikTokEmbed from "./TikTokEmbed";

interface VideoItem {
  id: string;
  title?: string;
}

interface VideoGalleryData {
  title: string;
  subtitle: string;
  videos: VideoItem[];
}

export default function VideoGallery({ data }: { data: VideoGalleryData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/20 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,60,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(107,63,42,0.06)_0%,transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <p className="mb-4 text-[10px] sm:text-xs font-bold tracking-[0.4em] text-secondary uppercase">
            From Our Kennel
          </p>
          <h2 className="text-3xl xs:text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl px-4">
            {data.title}
          </h2>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          {data.subtitle && (
            <p className="mt-6 text-sm sm:text-lg leading-relaxed text-text-secondary px-6">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Video Grid — 2 columns on mobile, 3 on md, 4 on lg+ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 px-3 sm:px-0">
          {data.videos.map((video, i) => (
            <div
              key={video.id}
              className="group flex flex-col animate-fade-up"
              style={{
                animationDelay: `${i * 100}ms`,
                animationDuration: '0.6s',
              }}
            >
              {/* Hero-style video card */}
              <div className="relative w-full">
                {/* Contained glow */}
                <div className="absolute inset-0 rounded-2xl bg-secondary/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                {/* Gold border card */}
                <div className="relative rounded-2xl border border-secondary/20 bg-primary/60 backdrop-blur-sm p-1.5 sm:p-3 gold-glow shadow-lg shadow-black/20 transition-all duration-500 group-hover:border-secondary/40 group-hover:shadow-2xl group-hover:shadow-secondary/10 group-hover:-translate-y-1">
                  <div className="rounded-xl overflow-hidden bg-primary/80 transition-transform duration-500 aspect-[9/16] relative">
                    <TikTokEmbed videoId={video.id} />
                  </div>
                </div>
              </div>

              {/* Optional title/caption */}
              {video.title && (
                <p className="mt-2 text-[10px] sm:text-xs font-medium text-text-muted text-center line-clamp-1 px-1 group-hover:text-secondary transition-colors duration-300">
                  {video.title}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* TikTok profile link at bottom */}
        <div className="mt-14 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <a
            href="https://www.tiktok.com/@himalayanmastiffnepal"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text-secondary hover:border-secondary/50 hover:text-secondary transition-all duration-300"
          >
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.84.11v-3.5a6.37 6.37 0 00-.84-.05A6.33 6.33 0 004.58 15.2a6.33 6.33 0 006.33 6.33 6.33 6.33 0 006.33-6.33V9.77a8.03 8.03 0 004.67 1.52v-3.5a4.6 4.6 0 01-3.32-1.1z" />
            </svg>
            Follow @himalayanmastiffnepal on TikTok
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
