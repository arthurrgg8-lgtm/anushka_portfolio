"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export type FilterCategory = "ALL" | "PROJECTS" | "RESEARCH" | "CAPABILITIES" | "CONTACT";

interface NavigationProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const FILTER_OPTIONS: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "ALL" },
  { label: "Projects", value: "PROJECTS" },
  { label: "Research", value: "RESEARCH" },
  { label: "Capabilities", value: "CAPABILITIES" },
  { label: "Contact", value: "CONTACT" },
];

export function Navigation({ activeFilter, onFilterChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterClick = (filter: FilterCategory) => {
    onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => onFilterChange("ALL")}
          className="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all duration-300">
            AR.
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground leading-none group-hover:text-primary transition-colors duration-300">
              Anushka Khatri
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground leading-none mt-0.5">
              Architect / Designer
            </span>
          </div>
        </Link>

        {/* Desktop Filter Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleFilterClick(opt.value)}
                className={`px-3 lg:px-4 py-1.5 rounded-full text-[10px] lg:text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/65 hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/thesis"
            className="text-[10px] lg:text-xs uppercase tracking-widest font-sans font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Thesis
          </Link>
          <Link
            href="/journal"
            className="text-[10px] lg:text-xs uppercase tracking-widest font-sans font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Journal
          </Link>
          <div className="border-l border-border/50 pl-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg border border-border/80 bg-card/60 text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[52px] z-40 bg-background/95 backdrop-blur-md md:hidden transition-all duration-400 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full flex flex-col justify-between px-6 py-8">
          <ul className="flex flex-col gap-3">
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.value;
              return (
                <li key={opt.value}>
                  <button
                    onClick={() => handleFilterClick(opt.value)}
                    className={`w-full text-left text-base uppercase tracking-widest font-heading font-semibold py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-primary bg-primary/10 border-l-2 border-primary"
                        : "text-foreground/80 hover:bg-muted/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
            <li className="mt-4 border-t border-border/40 pt-4">
              <Link
                href="/thesis"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left text-base uppercase tracking-widest font-heading font-semibold py-2 px-3 rounded-lg text-foreground/80 hover:bg-muted/40 transition-all duration-300"
              >
                Thesis
              </Link>
            </li>
            <li>
              <Link
                href="/journal"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left text-base uppercase tracking-widest font-heading font-semibold py-2 px-3 rounded-lg text-foreground/80 hover:bg-muted/40 transition-all duration-300"
              >
                Journal
              </Link>
            </li>
          </ul>

          <div className="border-t border-border/60 pt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>NEC LICENSE</span>
              <span className="text-foreground font-semibold">REG NO: 94879</span>
            </div>
            <button
              onClick={() => { onFilterChange("CONTACT"); setIsOpen(false); }}
              className="text-center text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold py-3 rounded-xl cursor-pointer transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
