"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", targetId: "hero-sec" },
  { label: "Projects", targetId: "projects-sec" },
  { label: "About", targetId: "about-sec" },
  { label: "Capabilities", targetId: "capabilities-sec" },
  { label: "Materials", targetId: "materials-sec" },
  { label: "Contact", targetId: "contact-sec" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-sec");

  useEffect(() => {
    const handleScroll = () => {
      const main = document.querySelector("main.snap-container");
      if (!main) return;

      if (main.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on main container scroll position
      const scrollPos = main.scrollTop + 200;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.targetId);
          }
        }
      }
    };

    const main = document.querySelector("main.snap-container");
    main?.addEventListener("scroll", handleScroll);
    return () => main?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      const main = document.querySelector("main.snap-container");
      if (main) {
        main.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo block */}
        <a 
          href="#hero-sec" 
          onClick={(e) => handleLinkClick(e, "hero-sec")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300">
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
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <li key={link.targetId}>
                  <a
                    href={`#${link.targetId}`}
                    onClick={(e) => handleLinkClick(e, link.targetId)}
                    className={`text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 relative py-1 hover:text-primary ${
                      isActive 
                        ? "text-primary" 
                        : "text-foreground/75"
                    }`}
                  >
                    {link.label}
                    {/* Sliding active line */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          
          <div className="border-l border-border/50 pl-6 flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact-sec"
              onClick={(e) => handleLinkClick(e, "contact-sec")}
              className="text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold px-4 py-2 rounded-full cursor-pointer hover:shadow-sm hover:scale-102 active:scale-98 transition-all duration-300"
            >
              Inquire
            </a>
          </div>
        </nav>

        {/* Mobile controls bar */}
        <div className="flex items-center gap-3 md:hidden">
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

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 top-[56px] sm:top-[64px] z-40 bg-background/95 backdrop-blur-md md:hidden transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="h-full flex flex-col justify-between px-6 sm:px-8 py-8 sm:py-12">
          <ul className="flex flex-col gap-5 sm:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <li key={link.targetId}>
                  <a
                    href={`#${link.targetId}`}
                    onClick={(e) => handleLinkClick(e, link.targetId)}
                    className={`text-base sm:text-lg uppercase tracking-widest font-heading font-semibold block transition-colors duration-300 ${
                      isActive ? "text-primary pl-2 border-l-2 border-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-border/60 pt-6 sm:pt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground font-mono">
              <span>NEC LICENSE</span>
              <span className="text-foreground font-semibold">AR. LICENSE REGISTERED</span>
            </div>
            <a
              href="#contact-sec"
              onClick={(e) => handleLinkClick(e, "contact-sec")}
              className="text-center text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold py-3 rounded-xl cursor-pointer transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
