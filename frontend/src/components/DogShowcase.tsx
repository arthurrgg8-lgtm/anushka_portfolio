"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import HeroSlideshow from "./HeroSlideshow";

interface Dog {
  name: string;
  title: string;
  description: string;
  image: string;
  achievements: string[];
}

interface TopDogsData {
  title: string;
  subtitle: string;
  slideshowImages?: string[];
  dogs: Dog[];
}

export default function DogShowcase({ data }: { data: TopDogsData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.05 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section
      id="champions"
      ref={sectionRef}
      className="relative py-28 sm:py-36 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Sticky Background Container — prevents stretching by staying at viewport height */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Slideshow background */}
          {data.slideshowImages && data.slideshowImages.length > 0 && (
            <div className="absolute inset-0">
              <HeroSlideshow images={data.slideshowImages} cover noOverlays />
            </div>
          )}

          {/* Paw print pattern layer */}
          <div className="absolute inset-0 bg-paw-pattern opacity-10 sm:opacity-20" />

          {/* Primary overlay — cinematic depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,60,0.08)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(107,63,42,0.12)_0%,transparent_60%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-20">
          <p className="mb-4 text-[10px] sm:text-xs font-bold tracking-[0.4em] text-secondary uppercase">
            Nepal&apos;s Finest Lineage
          </p>
          <h2 className="text-3xl xs:text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl leading-[1.2] px-4">
            {data.title}
          </h2>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          <p className="mt-6 text-sm sm:text-lg leading-relaxed text-text-secondary px-6">
            {data.subtitle}
          </p>
        </div>

        {/* Dogs Grid */}
        <div className="grid gap-16 md:gap-24">
          {data.dogs.map((dog, i) => (
            <div
              key={dog.name}
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-10 lg:gap-20 items-center text-center lg:text-left`}
              style={{
                animation: `fade-up 0.8s ease-out ${i * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              {/* Image Container */}
              <div className="relative w-full lg:w-1/2 max-w-lg group/image px-4 sm:px-0">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-b from-secondary/10 to-transparent rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover/image:from-secondary/20 group-hover/image:blur-3xl" />
                
                {/* Main Image Card */}
                <div className="relative rounded-[2rem] border border-secondary/20 overflow-hidden gold-glow shadow-2xl shadow-black/40 transition-all duration-700 group-hover/image:border-secondary/40 group-hover/image:-translate-y-2">
                  <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] relative">
                    <Image
                      src={dog.image}
                      alt={dog.name}
                      fill
                      className="object-cover transition-all duration-1000 group-hover/image:scale-110 group-hover/image:brightness-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  </div>
                  
                  {/* Subtle Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  
                  {/* Floating Label for mobile (on image) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 pt-12 text-left">
                    <h3 className="text-3xl font-bold text-text-primary sm:text-4xl drop-shadow-lg">
                      {dog.name}
                    </h3>
                    <p className="text-xs font-bold tracking-[0.3em] text-secondary uppercase mt-2 drop-shadow-md">
                      {dog.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-0">
                <p className="text-sm sm:text-lg leading-relaxed text-text-secondary mb-10 lg:max-w-xl">
                  {dog.description}
                </p>

                {/* Achievements Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                    <div className="h-px w-6 bg-secondary/30" />
                    <p className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase">
                      Championship Record
                    </p>
                    <div className="h-px w-6 bg-secondary/30" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 text-left">
                    {dog.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="group/ach flex items-center gap-3 rounded-xl bg-primary-light/30 border border-border/50 p-3 transition-all duration-300 hover:border-secondary/30 hover:bg-primary-light/50"
                      >
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center transition-all duration-300 group-hover/ach:scale-110 group-hover/ach:bg-secondary/20 group-hover/ach:border-secondary/50">
                          <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-text-primary transition-colors duration-300 group-hover/ach:text-secondary leading-tight">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
