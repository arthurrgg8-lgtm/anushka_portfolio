"use client";

import { useEffect, useRef, useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ data }: { data: FAQItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      id="faq"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/10 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,63,42,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-secondary uppercase">
            Got Questions?
          </p>
          <h2 className="text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-secondary/50" />
        </div>

        <div className="space-y-3">
          {data.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-primary/40 overflow-hidden transition-all duration-300 hover:border-secondary/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="group/faq flex w-full items-center justify-between p-6 text-left transition-all duration-300 hover:bg-secondary/5"
              >
                <span className="text-base font-medium text-text-primary pr-4 transition-colors duration-300 group-hover/faq:text-secondary">
                  {item.q}
                </span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-secondary transition-all duration-300 ${
                    openIndex === i ? "rotate-180" : "group-hover/faq:scale-125"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-0 animate-fade-up" style={{ animationDuration: '0.4s' }}>
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
