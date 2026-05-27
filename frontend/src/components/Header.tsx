"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { text: "Champions", link: "#champions" },
  { text: "Lineage", link: "#lineage" },
  { text: "Puppies", link: "#tiers" },
  { text: "Testimonials", link: "#testimonials" },
  { text: "Contact", link: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/20 backdrop-blur-md border-b border-secondary/10 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full border-2 border-secondary/70 bg-cream ring-2 ring-secondary/30 shadow-lg shadow-secondary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-secondary/30">
            <div className="absolute inset-[3px] overflow-hidden rounded-full">
              <Image
                src="/images/logo_favicon.png"
                alt="Bhotey Kukur"
                fill
                className="object-cover"
                sizes="34px"
                priority
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-widest text-secondary-light uppercase group-hover:text-secondary transition-colors duration-300">
              Bhotey Kukur
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-secondary uppercase">
              Himalayan Mastiff
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="group/nav relative text-sm text-secondary-light hover:text-secondary transition-colors duration-300 tracking-wide"
            >
              {link.text}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-secondary transition-all duration-300 group-hover/nav:w-full" />
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted hover:text-secondary hover:border-secondary/50 transition-all duration-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link
            href="#contact"
            className="group/inq relative overflow-hidden rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:bg-secondary-light hover:scale-105 hover:shadow-xl hover:shadow-secondary/30 shadow-lg shadow-secondary/20"
          >
            <span className="relative z-10">Inquire Now</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer opacity-0 group-hover/inq:opacity-100" />
          </Link>
        </nav>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted hover:text-secondary hover:border-secondary/50 transition-all duration-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-primary transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-primary/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center justify-center gap-8 ${
          mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/5 to-transparent" />
        
        {/* Decorative pattern in background */}
        <div className="absolute inset-0 bg-paw-pattern opacity-5" />

        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-secondary/20 bg-primary/40 text-text-primary backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-6 z-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.link}
              href={link.link}
              onClick={() => setMobileOpen(false)}
              className="group relative overflow-hidden px-4 py-2 text-3xl font-bold tracking-tight text-text-secondary transition-all duration-300 hover:text-secondary"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="relative z-10">{link.text}</span>
              <span className="absolute bottom-1 left-0 h-2 w-0 bg-secondary/20 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-8 group relative flex items-center gap-3 overflow-hidden rounded-full bg-secondary px-10 py-4 text-lg font-bold text-primary shadow-2xl shadow-secondary/20 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Inquire Now</span>
          <svg className="relative z-10 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer group-hover:opacity-100" />
        </Link>

        {/* Branding in mobile menu */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-secondary/30" />
          <p className="text-[10px] font-bold tracking-[0.4em] text-secondary uppercase">
            Bhotey Kukur
          </p>
          <p className="text-[8px] tracking-[0.2em] text-text-muted uppercase">
            Est. 1990 — Himalayan Mastiff
          </p>
        </div>
      </div>
    </header>
  );
}
