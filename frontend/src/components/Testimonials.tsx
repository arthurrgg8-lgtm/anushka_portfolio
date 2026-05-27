"use client";

import { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  videoUrl: string;
}

export default function Testimonials({ data }: { data: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  const current = data[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/30 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,60,0.06)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(107,63,42,0.05)_0%,transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-secondary uppercase">
            Happy Families
          </p>
          <h2 className="text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl">
            What Our Families Say
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-secondary/50" />
        </div>          {/* Testimonial Card */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-primary/40 p-8 sm:p-12 md:p-16 gold-glow group/testimonial hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10">
            {/* Floating quote mark */}
            <div className="absolute -top-6 -left-6 text-8xl font-serif text-secondary/10 leading-none select-none animate-float-slow" style={{ animationDuration: '8s' }}>
              &ldquo;
            </div>

            {/* Rating stars — animate on hover */}
            <div className="mb-6 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 transition-all duration-300 ${
                    i < current.rating ? "text-secondary animate-stars" : "text-text-muted/30"
                  } group-hover/testimonial:scale-110`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Text with slide transition */}
            <div className="relative" key={activeIndex}>
              <p className="mb-8 text-lg leading-relaxed text-text-primary sm:text-xl md:text-2xl italic animate-slide-left" style={{ animationDuration: '0.5s' }}>
                &ldquo;{current.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 animate-slide-left" style={{ animationDelay: '0.15s', animationDuration: '0.5s' }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-secondary font-semibold text-lg transition-all duration-300 group-hover/testimonial:bg-secondary/30 group-hover/testimonial:scale-110">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-text-primary transition-colors duration-300 group-hover/testimonial:text-secondary">{current.name}</p>
                  <p className="text-sm text-text-muted">{current.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-8 bg-secondary"
                    : "w-2 bg-border hover:bg-secondary/50 hover:w-4"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid of smaller testimonials below */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.filter((_, i) => i !== activeIndex).slice(0, 3).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(data.findIndex((d) => d.id === t.id))}
              className="group rounded-2xl border border-border bg-primary/30 p-6 text-left transition-all duration-300 hover:border-secondary/30 hover:bg-primary/60 hover:gold-glow"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-3 w-3 ${i < t.rating ? "text-secondary" : "text-text-muted/30"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-text-secondary line-clamp-3 group-hover:text-text-primary transition-colors">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-3 text-xs font-medium text-text-muted group-hover:text-secondary transition-colors">
                — {t.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
