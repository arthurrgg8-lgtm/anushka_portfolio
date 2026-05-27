"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface SiteData {
  name: string;
  tagline: string;
  contact: {
    whatsapp: string;
    email: string;
    phone: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
    googleMaps: string;
  };
  location: string;
}

export default function Contact({ data }: { data: SiteData }) {
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

  const whatsappUrl = `https://wa.me/${data.contact.whatsapp.replace(/[^0-9]/g, "")}`;
  const emailUrl = `mailto:${data.contact.email}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-paw-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/40 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,149,60,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(107,63,42,0.06)_0%,transparent_50%)]" />

      {/* Decorative elements — floating */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-secondary/5 blur-3xl animate-float-slow" style={{ animationDuration: '10s' }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-primary/60 to-primary/30 p-8 sm:p-12 md:p-16 gold-glow">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-secondary uppercase">
              Get In Touch
            </p>
            <h2 className="text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl mb-6">
              Ready to Find Your <span className="gradient-gold">Companion</span>?
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary mb-10 max-w-2xl mx-auto">
              We&apos;re here to help you find the perfect Himalayan Mastiff for your family. 
              Reach out via WhatsApp or email and we&apos;ll guide you through every step.
            </p>

            {/* Contact buttons — side-by-side on mobile */}
            <div className="flex flex-row items-center justify-center gap-3 mb-10 px-2 sm:px-0">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa relative flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-4 py-3.5 text-xs sm:text-base font-bold text-white transition-all duration-300 hover:bg-[#20BD5C] shadow-lg shadow-[#25D366]/20"
              >
                <svg className="h-5 w-5 transition-transform duration-300 group-hover/wa:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Link>
              <Link
                href={emailUrl}
                className="group/email relative flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-secondary px-4 py-3.5 text-xs sm:text-base font-bold text-primary transition-all duration-300 hover:bg-secondary-light shadow-lg shadow-secondary/20"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/email:opacity-100 animate-shimmer" />
                <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/email:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </Link>
            </div>

            {/* Contact info cards — 2 columns on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-sm text-text-muted">
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary-light/30 border border-border/50 p-4 sm:p-6 transition-all duration-300 hover:border-secondary/30 hover:bg-primary-light/50">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-sm font-bold text-text-primary tracking-wide">{data.contact.phone}</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] opacity-60">Phone Support</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary-light/30 border border-border/50 p-4 sm:p-6 transition-all duration-300 hover:border-secondary/30 hover:bg-primary-light/50">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-sm font-bold text-text-primary tracking-wide truncate max-w-full px-2">{data.contact.email.split('@')[0]}</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] opacity-60">Official Email</span>
              </div>

              <a 
                href={data.social.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="col-span-2 sm:col-span-1 group/loc flex flex-col items-center gap-2 rounded-2xl bg-primary-light/30 border border-border/50 p-4 sm:p-6 transition-all duration-300 hover:border-secondary/30 hover:bg-primary-light/50"
              >
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-transform duration-300 group-hover/loc:scale-110">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-sm font-bold text-text-primary tracking-wide text-center">{data.location}</span>
                <span className="text-[7px] sm:text-[9px] uppercase tracking-[0.2em] opacity-60">Our Location</span>
              </a>
            </div>

            {/* Google Maps embed */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-border gold-glow shadow-xl shadow-black/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14138.638133134323!2d85.312!3d27.617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb100000000001%3A0x0!2sLele%2C%20Lalitpur%2044700%2C%20Nepal!5e0!3m2!1sen!2s!4v1"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhotey Kukur Location — Lele, Lalitpur"
                className="w-full"
              />
              {/* Map overlay link */}
              <a
                href={data.social.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary-light/50 backdrop-blur-sm px-4 py-3 text-xs text-text-muted hover:text-secondary transition-colors duration-300 border-t border-border/50"
              >
                <svg className="h-4 w-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Open in Google Maps — {data.location}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
