"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  targetId: string;
  href?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", targetId: "hero-sec" },
  { label: "Projects", targetId: "projects-sec" },
  { label: "About", targetId: "about-sec" },
  { label: "Capabilities", targetId: "capabilities-sec" },
  { label: "Materials", targetId: "materials-sec" },
  { label: "Thesis", targetId: "thesis", href: "/thesis" },
  { label: "Journal", targetId: "journal", href: "/journal" },
  { label: "Contact", targetId: "contact-sec" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-sec");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const main = document.querySelector("main.snap-container");
      const scrollTop = main ? main.scrollTop : window.scrollY;

      if (scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!main) return;

      // Determine active section based on main container scroll position
      const scrollPos = main.scrollTop + 200;
      for (const link of NAV_LINKS) {
        if (link.href) continue;
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
    main?.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      main?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    setIsOpen(false);
    if (pathname !== "/") {
      // Allow default navigation to /#targetId when on /thesis or /journal
      return;
    }
    e.preventDefault();
    setActiveSection(targetId);
    const el = document.getElementById(targetId);
    if (el) {
      const main = document.querySelector("main.snap-container");
      if (main) {
        main.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "py-3 bg-background/90 backdrop-blur-md border-b border-border/40 shadow-sm" 
            : "py-4 sm:py-5 bg-background/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo block */}
          <Link 
            href="/#hero-sec" 
            onClick={(e) => handleLinkClick(e, "hero-sec")}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shrink-0">
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

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <ul className="flex items-center gap-5 xl:gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = link.href
                  ? pathname === link.href
                  : pathname === "/" && activeSection === link.targetId;

                if (link.href) {
                  return (
                    <li key={link.targetId}>
                      <Link
                        href={link.href}
                        className={`text-xs uppercase tracking-widest font-sans font-medium transition-all duration-300 relative py-1 hover:text-primary ${
                          isActive ? "text-primary" : "text-foreground/75"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.targetId}>
                    <Link
                      href={`/#${link.targetId}`}
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
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="border-l border-border/50 pl-5 flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/#contact-sec"
                onClick={(e) => handleLinkClick(e, "contact-sec")}
                className="text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold px-4 py-2 rounded-full cursor-pointer hover:shadow-sm hover:scale-102 active:scale-98 transition-all duration-300"
              >
                Inquire
              </Link>
            </div>
          </nav>

          {/* Mobile controls bar */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-border/80 bg-card/80 text-foreground cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay — rendered outside <header> so backdrop-filter never clips fixed positioning */}
      <div 
        className={`fixed inset-x-0 top-[56px] bottom-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden transition-all duration-300 overflow-y-auto ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="min-h-full flex flex-col justify-between px-6 py-8">
          <ul className="flex flex-col gap-4 sm:gap-5">
            {NAV_LINKS.map((link) => {
              const isActive = link.href
                ? pathname === link.href
                : pathname === "/" && activeSection === link.targetId;

              if (link.href) {
                return (
                  <li key={link.targetId}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base sm:text-lg uppercase tracking-widest font-heading font-semibold block py-1 transition-colors duration-300 ${
                        isActive ? "text-primary pl-3 border-l-2 border-primary" : "text-foreground/85"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.targetId}>
                  <Link
                    href={`/#${link.targetId}`}
                    onClick={(e) => handleLinkClick(e, link.targetId)}
                    className={`text-base sm:text-lg uppercase tracking-widest font-heading font-semibold block py-1 transition-colors duration-300 ${
                      isActive ? "text-primary pl-3 border-l-2 border-primary" : "text-foreground/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-border/60 pt-6 mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground font-mono">
              <span>NEC LICENSE #94879</span>
              <span className="text-foreground font-semibold">REGISTERED ARCHITECT</span>
            </div>
            <Link
              href="/#contact-sec"
              onClick={(e) => handleLinkClick(e, "contact-sec")}
              className="text-center text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold py-3.5 rounded-xl cursor-pointer transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
