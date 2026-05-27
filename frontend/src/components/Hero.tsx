"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TikTokEmbed from "./TikTokEmbed";
import HeroSlideshow from "./HeroSlideshow";

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  stats: Array<{ value: string; label: string }>;
  slideshowImages?: string[];
}

export default function Hero({ data }: { data: HeroData }) {
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
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-start pt-20 pb-20 lg:pt-24 lg:pb-32 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Background slideshow — visible fully */}
      {data.slideshowImages && data.slideshowImages.length > 0 ? (
        <>
          <HeroSlideshow images={data.slideshowImages} interval={6000} cover noOverlays />
          {/* Light vignette overlays — keeps bg visible while ensuring text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/15 via-40% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 via-30% to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,149,60,0.06)_0%,transparent_60%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-paw-pattern" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/98 via-60% to-primary-light/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,149,60,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(107,63,42,0.15)_0%,transparent_50%)]" />
        </>
      )}

      {/* Decorative elements — floating */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: '0s', animationDuration: '7s' }} />
      <div className="absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s', animationDuration: '9s' }} />
      <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-secondary/3 blur-2xl animate-float-drift" style={{ animationDelay: '1s', animationDuration: '11s' }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-0 pb-12 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-primary/40 backdrop-blur-md px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.2em] text-secondary uppercase w-fit animate-scale-up" style={{ animationDelay: '0.1s' }}>
              <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-secondary animate-pulse-glow" />
              Champion Bloodline — Lalitpur, Nepal
            </div>

            {/* Subtitle */}
            <p className="mb-3 text-[10px] sm:text-sm font-medium tracking-[0.3em] text-secondary uppercase animate-slide-left" style={{ animationDelay: '0.2s' }}>
              {data.subtitle}
            </p>

            {/* Main Title */}
            <h1 className="mb-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold leading-[1.15] tracking-tight text-balance">
              {data.title.split("\n").map((line, i) => (
                <span key={i} className="block animate-slide-left" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                  {i === 0 ? (
                    <span className="gradient-gold">{line}</span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-xs sm:text-sm leading-relaxed text-secondary-light/90 lg:text-lg lg:mb-10 animate-slide-left" style={{ animationDelay: '0.5s' }}>
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 lg:mb-4 animate-fade-up" style={{ animationDelay: '0.7s' }}>
              <Link
                href={data.cta.primary.link}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-secondary px-8 py-3 sm:py-4 text-sm font-bold text-primary transition-all duration-300 hover:bg-secondary-light hover:scale-105 shadow-2xl shadow-secondary/25"
              >
                <span className="relative z-10">{data.cta.primary.text}</span>
                <svg className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100" />
              </Link>
              <Link
                href={data.cta.secondary.link}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 rounded-full border border-secondary/30 bg-primary/20 backdrop-blur-sm px-8 py-3 sm:py-4 text-sm font-semibold text-secondary-light transition-all duration-300 hover:border-secondary hover:text-secondary hover:scale-105"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {data.cta.secondary.text}
              </Link>
            </div>

            {/* Stats — Mobile Optimized */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full mt-4 lg:mt-0 animate-fade-up" style={{ animationDelay: '0.9s' }}>
              {data.stats.map((stat, i) => (
                <div 
                  key={stat.label} 
                  className="group/stat relative flex flex-col items-center justify-center rounded-2xl border border-secondary/10 bg-primary/30 backdrop-blur-md p-3 sm:p-5 transition-all duration-300 hover:border-secondary/30 hover:bg-primary/50"
                >
                  <span className="text-lg sm:text-2xl font-bold text-secondary whitespace-nowrap group-hover/stat:scale-110 transition-transform duration-300">
                    {stat.value}
                  </span>
                  <span className="text-[7px] sm:text-[9px] font-bold tracking-[0.2em] text-secondary/60 uppercase whitespace-nowrap">
                    {stat.label}
                  </span>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-secondary/5 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: TikTok Video — larger and more prominent */}
          <div className="hidden lg:flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[360px] animate-scale-up" style={{ animationDelay: '0.6s' }}>
              <div className="absolute -inset-12 bg-secondary/10 rounded-[4rem] blur-[80px] animate-pulse-glow" />
              <div className="relative rounded-[2rem] border-2 border-secondary/30 bg-primary/40 backdrop-blur-xl p-4 gold-glow shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] transition-all duration-700 hover:border-secondary/60 hover:shadow-secondary/20 hover:-translate-y-2">
                <div className="rounded-[1.5rem] overflow-hidden bg-primary/80 aspect-[9/16]">
                  <TikTokEmbed videoId="7464196315681967367" muted={false} />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center gap-3 text-sm font-medium text-secondary/60">
                <div className="h-px w-8 bg-secondary/30" />
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.84.11v-3.5a6.37 6.37 0 00-.84-.05A6.33 6.33 0 004.58 15.2a6.33 6.33 0 006.33 6.33 6.33 6.33 0 006.33-6.33V9.77a8.03 8.03 0 004.67 1.52v-3.5a4.6 4.6 0 01-3.32-1.1z" />
                </svg>
                @himalayanmastiffnepal
                <div className="h-px w-8 bg-secondary/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain silhouette */}
      <div className="mountain-divider z-10">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9953c" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#c9953c" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M0,180 L0,130 Q60,100 120,110 Q180,120 240,90 Q300,60 360,75 Q420,90 480,55 Q540,20 600,40 Q660,60 720,25 Q780,-10 840,15 Q900,40 960,30 Q1020,20 1080,35 Q1140,50 1200,40 Q1260,30 1320,50 Q1380,70 1440,55 L1440,180 Z"
            fill="url(#mountain-grad)"
          />
          <path
            d="M0,180 L0,150 Q50,130 100,140 Q150,150 200,130 Q250,110 300,120 Q350,130 400,105 Q450,80 500,95 Q550,110 600,85 Q650,60 700,75 Q750,90 800,65 Q850,40 900,55 Q950,70 1000,60 Q1050,50 1100,65 Q1150,80 1200,70 Q1250,60 1300,75 Q1350,90 1400,80 Q1450,70 1500,80 L1500,180 Z"
            fill="url(#mountain-grad)"
            transform="scale(0.96) translate(30, 0)"
          />
          <path
            d="M0,180 L0,165 Q40,150 80,155 Q120,160 160,145 Q200,130 240,140 Q280,150 320,135 Q360,120 400,130 Q440,140 480,120 Q520,100 560,115 Q600,130 640,110 Q680,90 720,100 Q760,110 800,95 Q840,80 880,90 Q920,100 960,90 Q1000,80 1040,95 Q1080,110 1120,100 Q1160,90 1200,100 Q1240,110 1280,100 Q1320,90 1360,100 Q1400,110 1440,100 L1440,180 Z"
            fill="url(#mountain-grad)"
            transform="scale(0.92) translate(60, 0)"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-20">
        <span className="text-[9px] tracking-[0.2em] text-text-muted uppercase">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
