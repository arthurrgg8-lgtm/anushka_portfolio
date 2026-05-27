"use client";

import { useEffect, useRef } from "react";

interface LineageData {
  title: string;
  subtitle: string;
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const iconMap: Record<string, React.ReactNode> = {
  trophy: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12l2 2 4-4M7.5 21h9M7.5 21a4.5 4.5 0 01-4.5-4.5v-10.5a1.5 1.5 0 011.5-1.5h13.5a1.5 1.5 0 011.5 1.5v2.25m0 0a3 3 0 01-3 3h-.378m1.378-3h-.378a3 3 0 00-3 3m0 0a4.5 4.5 0 01-4.5 4.5m6-4.5a1.5 1.5 0 011.5 1.5v2.25" />
    </svg>
  ),
  heart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  home: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  award: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721A46.983 46.983 0 0112 2.25c2.291 0 4.5.231 6.566.665m0 0c.96.17 1.92.34 2.875.518A6.004 6.004 0 0116.27 9.728m3.17-6.965V4.5c0 2.108-.966 3.99-2.48 5.228" />
    </svg>
  ),
};

export default function LineageOverview({ data }: { data: LineageData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(".fade-in-card");
    cards?.forEach((card, i) => {
      observer.observe(card);
      (card as HTMLElement).style.transitionDelay = `${i * 150}ms`;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="lineage"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/30 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,149,60,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(107,63,42,0.06)_0%,transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-secondary uppercase">
            Our Legacy
          </p>
          <h2 className="text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl">
            {data.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-secondary/50" />
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {data.subtitle}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.highlights.map((item, i) => (
            <div
              key={item.title}
              className={`fade-in-card group relative overflow-hidden rounded-2xl border border-border bg-primary/40 p-8 opacity-0 translate-y-8 transition-all duration-700 ease-out hover:border-secondary/30 hover:bg-primary/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10 hover:gold-glow`}
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-110 group-hover:animate-wiggle">
                {iconMap[item.icon] || iconMap.trophy}
              </div>

              <h3 className="mb-3 text-lg font-semibold text-text-primary group-hover:text-secondary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>

              {/* Corner accent */}
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-secondary/5 blur-xl transition-all duration-500 group-hover:bg-secondary/10 group-hover:scale-150 animate-float-slow" style={{ animationDuration: '6s' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
