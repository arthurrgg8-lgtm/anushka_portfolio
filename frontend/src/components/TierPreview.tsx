"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Tier {
  id: string;
  name: string;
  price: string;
  priceUsd: string;
  description: string;
  features: string[];
  highlight: boolean;
}

interface TiersData {
  title: string;
  subtitle: string;
  tiers: Tier[];
}

export default function TierPreview({ data }: { data: TiersData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [qrOpen, setQrOpen] = useState(false);

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

    const cards = sectionRef.current?.querySelectorAll(".tier-card");
    cards?.forEach((card, i) => {
      observer.observe(card);
      (card as HTMLElement).style.transitionDelay = `${i * 150}ms`;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tiers"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/20 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(107,63,42,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,149,60,0.04)_0%,transparent_50%)]" />

      {/* Decorative elements — floating */}
      <div className="absolute top-1/4 left-0 h-64 w-64 rounded-full bg-secondary/3 blur-3xl animate-float-slow" style={{ animationDuration: '12s', animationDelay: '0s' }} />
      <div className="absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-accent/3 blur-3xl animate-float" style={{ animationDuration: '14s', animationDelay: '3s' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-20">
          <p className="mb-4 text-[10px] sm:text-xs font-bold tracking-[0.4em] text-secondary uppercase">
            Our Breeding Program
          </p>
          <h2 className="text-3xl xs:text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl leading-[1.2] px-4">
            {data.title}
          </h2>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
          <p className="mt-6 text-sm sm:text-lg leading-relaxed text-text-secondary px-6">
            {data.subtitle}
          </p>
        </div>

        {/* Tier Cards — side-by-side on mobile (grid-cols-2) */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-3 sm:px-0">
          {data.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`tier-card group relative flex flex-col rounded-[1.5rem] sm:rounded-[2rem] border p-4 sm:p-8 opacity-0 translate-y-8 transition-all duration-700 ease-out ${
                tier.highlight
                  ? "border-secondary/40 bg-gradient-to-b from-secondary/10 to-primary/40 shadow-2xl shadow-secondary/10 hover:-translate-y-2"
                  : "border-border bg-primary/40 hover:border-secondary/20 hover:bg-primary/60 hover:-translate-y-1 shadow-lg shadow-black/10"
              }`}
            >
              {/* Highlight badge */}
              {tier.highlight && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-2 sm:px-4 py-0.5 sm:py-1 text-[7px] sm:text-[10px] font-bold tracking-wider text-primary uppercase whitespace-nowrap">
                  Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className={`text-sm sm:text-lg font-bold mb-1 sm:mb-2 ${tier.highlight ? "text-secondary" : "text-text-primary"}`}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-2 sm:mb-4">
                <p className={`text-xl sm:text-3xl font-bold ${tier.highlight ? "text-secondary" : "text-text-primary"}`}>
                  {tier.price.replace("NPR ", "")}
                  <span className="text-[8px] sm:text-sm ml-1 opacity-60">NPR</span>
                </p>
                {tier.priceUsd && (
                  <p className="text-[8px] sm:text-sm text-text-muted">~{tier.priceUsd}</p>
                )}
              </div>

              {/* Description — hidden on very small screens to save space if needed, or kept brief */}
              <p className="text-[10px] sm:text-sm leading-relaxed text-text-secondary mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                {tier.description}
              </p>

              {/* Features — simplified icons on mobile */}
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                {tier.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-1.5 sm:gap-3 text-[9px] sm:text-sm text-text-secondary">
                    <svg className="mt-0.5 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
                {tier.features.length > 4 && (
                  <li className="text-[8px] sm:text-xs text-secondary/60 font-medium pl-4.5 sm:pl-7">
                    +{tier.features.length - 4} more features
                  </li>
                )}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-auto">
                <Link
                  href="#contact"
                  className={`group inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 sm:py-3 text-[10px] sm:text-sm font-bold transition-all duration-300 ${
                    tier.highlight
                      ? "bg-secondary text-primary hover:bg-secondary-light shadow-lg shadow-secondary/20"
                      : "border border-border text-text-primary hover:border-secondary/50 hover:text-secondary"
                  }`}
                >
                  {tier.id === "top" ? "Contact" : "Inquire"}
                  <svg className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <button
                  onClick={() => setQrOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-[#60B246]/30 bg-[#60B246]/5 px-4 py-2 text-[9px] sm:text-xs font-bold text-[#60B246] transition-all duration-300 hover:bg-[#60B246]/10"
                >
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h3m5-2.12V5a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1h2m7 2h2a1 1 0 001-1V9a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 001 1z" />
                  </svg>
                  eSewa
                </button>
              </div>

              {/* Corner glow for highlight */}
              {tier.highlight && (
                <div className="absolute -inset-px rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-b from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* eSewa QR Code Modal */}
      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pay via eSewa"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative max-w-sm w-full rounded-3xl border border-secondary/30 bg-gradient-to-b from-primary-light to-primary p-8 shadow-2xl shadow-secondary/10 gold-glow animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setQrOpen(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary shadow-lg hover:bg-secondary-light transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#60B246]/20">
                <svg className="h-6 w-6 text-[#60B246]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h3m5-2.12V5a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1h2m7 2h2a1 1 0 001-1V9a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Pay via eSewa</h3>
              <p className="mt-1 text-sm text-text-secondary">Scan the QR code to book your puppy</p>
            </div>

            {/* QR Code Image */}
            <div className="relative mx-auto aspect-[790/494] w-full max-w-xs rounded-xl overflow-hidden border-2 border-secondary/20 bg-white p-2 shadow-inner">
              <Image
                src="/images/qrcode.jpeg"
                alt="eSewa QR Code"
                fill
                className="object-contain"
                sizes="(max-width: 400px) 100vw, 320px"
                priority
              />
            </div>

            {/* Instructions */}
            <div className="mt-6 space-y-2 text-center">
              <p className="text-xs text-text-muted">
                1. Open eSewa app and scan this QR
              </p>
              <p className="text-xs text-text-muted">
                2. Enter the amount for your chosen tier
              </p>
              <p className="text-xs text-text-muted">
                3. Send us the payment screenshot via{' '}
                <a
                  href="#contact"
                  className="text-secondary hover:underline"
                  onClick={() => setQrOpen(false)}
                >
                  WhatsApp
                </a>
              </p>
            </div>

            {/* Close button at bottom */}
            <button
              onClick={() => setQrOpen(false)}
              className="mt-6 w-full rounded-full border border-border px-6 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-secondary/30 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
