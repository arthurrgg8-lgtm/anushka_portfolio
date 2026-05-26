"use client";

import { useEffect, useState } from "react";
// ─── Static SVG map arrays (pre-computed for performance) ───
const compassTicks = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  const r1 = 240;
  const r2 = 250;
  return { angle, r1, r2, isMajor: i % 6 === 0, i };
});

const badgeTicks = Array.from({ length: 36 }, (_, i) => {
  const angle = (i * 10 * Math.PI) / 180;
  return { angle, isMajor: i % 3 === 0, i };
});
import { Navigation } from "@/components/navigation";
import { ProjectGallery } from "@/components/project-gallery";
import { MaterialBoard } from "@/components/material-board";
import { ThankotSlider } from "@/components/thankot-slider";
import { 
  ArrowDown, 
  MapPin, 
  Layers, 
  Compass, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  CheckCircle,
  FileDown,
  MessageCircle
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero-sec");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", sector: "residential" });

  // ─── Scroll-based Section Tracking ───
  useEffect(() => {
    const handleScroll = () => {
      const main = document.querySelector("main.snap-container");
      if (!main) return;
      const scrollPos = main.scrollTop + main.clientHeight / 2;
      const sections = ["hero-sec", "projects-sec", "about-sec", "capabilities-sec", "materials-sec", "contact-sec"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    const main = document.querySelector("main.snap-container");
    main?.addEventListener("scroll", handleScroll);
    return () => main?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const main = document.querySelector("main.snap-container");
      if (main) {
        main.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "", sector: "residential" });
      }, 5000);
    }
  };

  return (
    <>
      <Navigation />
      
      {/* Scroll Indicator dots on right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {[
          { id: "hero-sec", label: "Home" },
          { id: "projects-sec", label: "Projects" },
          { id: "about-sec", label: "About" },
          { id: "capabilities-sec", label: "Capabilities" },
          { id: "materials-sec", label: "Materials" },
          { id: "contact-sec", label: "Contact" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className="group flex items-center justify-end gap-3 cursor-pointer"
            aria-label={`Scroll to ${item.label}`}
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-widest text-primary font-bold font-mono transition-opacity duration-300">
              {item.label}
            </span>
            <span className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              activeSection === item.id 
                ? "bg-primary border-primary scale-125" 
                : "bg-background border-border/80 group-hover:border-primary"
            }`} />
          </button>
        ))}
      </div>

      <main className="snap-container">
        
        {/* SECTION 1: HERO/LANDING — Immersive Architectural Observatory */}
        <section 
          id="hero-sec" 
          className="snap-section flex flex-col lg:justify-start justify-center items-center relative px-6 pt-12 sm:pt-14 lg:pt-20 xl:pt-24 2xl:pt-28 overflow-x-hidden"
        >
          {/* ─── Drafting Grid Overlay ─── */}
          <div
            className="absolute inset-0 pointer-events-none select-none opacity-[0.04] dark:opacity-[0.06]"
          >
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" strokeWidth="0.3" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" />
                </pattern>
              </defs>
              <rect width="1200" height="800" fill="url(#grid)" />
            </svg>
          </div>

          {/* ─── Static Architectural Compass Background ─── */}
          <div 
            className="absolute inset-0 pointer-events-none select-none opacity-[0.15]"
          >
            <svg className="w-full h-full text-primary" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              {/* Outer celestial rings */}
              <g>
                <circle 
                  cx="600" cy="400" r="420" 
                  strokeWidth="0.3" strokeDasharray="2 14"
                />
                <circle 
                  cx="600" cy="400" r="380" 
                  strokeWidth="0.3" opacity="0.5"
                />
                <circle 
                  cx="600" cy="400" r="340" 
                  strokeWidth="0.4" strokeDasharray="3 6"
                />
                <circle 
                  cx="600" cy="400" r="280" 
                  strokeWidth="0.2" strokeDasharray="1 20"
                />
              </g>
              {/* Drafting crosshairs & section marks */}
              <line x1="180" y1="400" x2="1020" y2="400" strokeWidth="0.15" strokeDasharray="4 8" opacity="0.6" />
              <line x1="600" y1="10" x2="600" y2="790" strokeWidth="0.15" strokeDasharray="4 8" opacity="0.6" />
              {/* Diagonal section cut marks */}
              <path d="M 320 80 A 480 480 0 0 1 880 80" strokeWidth="0.2" opacity="0.4" strokeDasharray="2 6" />
              <path d="M 320 720 A 480 480 0 0 1 880 720" strokeWidth="0.2" opacity="0.4" strokeDasharray="2 6" />
              {/* Section markers (triangles) */}
              <polygon points="180,393 180,407 192,400" strokeWidth="0.3" opacity="0.5" />
              <polygon points="1020,393 1020,407 1008,400" strokeWidth="0.3" opacity="0.5" />
              <polygon points="593,10 607,10 600,22" strokeWidth="0.3" opacity="0.5" />
              <polygon points="593,790 607,790 600,778" strokeWidth="0.3" opacity="0.5" />
              {/* Compass rose detail */}
              <g opacity="0.4">
                <polygon points="600,140 615,390 600,400 585,390" strokeWidth="0.4" />
                <polygon points="600,660 615,410 600,400 585,410" strokeWidth="0.4" />
                <polygon points="360,400 585,390 600,400 585,410" strokeWidth="0.4" />
                <polygon points="840,400 615,390 600,400 615,410" strokeWidth="0.4" />
                {/* intercardinal */}
                <polygon points="430,230 570,390 600,400 585,385" strokeWidth="0.2" opacity="0.5" />
                <polygon points="770,570 630,410 600,400 615,415" strokeWidth="0.2" opacity="0.5" />
                <polygon points="430,570 570,410 600,400 585,415" strokeWidth="0.2" opacity="0.5" />
                <polygon points="770,230 630,390 600,400 615,385" strokeWidth="0.2" opacity="0.5" />
              </g>
              {/* Abstract floor plan fragments */}
              <g opacity="0.35">
                <rect x="440" y="250" width="60" height="60" strokeWidth="0.3" rx="1" />
                <rect x="520" y="250" width="40" height="60" strokeWidth="0.3" rx="1" />
                <rect x="700" y="480" width="50" height="50" strokeWidth="0.3" rx="1" />
                <rect x="760" y="480" width="30" height="50" strokeWidth="0.3" rx="1" />
                <circle cx="470" cy="280" r="8" strokeWidth="0.2" />
                <circle cx="725" cy="505" r="6" strokeWidth="0.2" />
                {/* Connection lines */}
                <line x1="500" y1="280" x2="520" y2="280" strokeWidth="0.2" strokeDasharray="2 2" />
                <line x1="600" y1="310" x2="700" y2="480" strokeWidth="0.15" strokeDasharray="3 4" />
              </g>
              {/* Radial measurement ticks */}
              {compassTicks.map(({ angle, r1, r2, isMajor, i }) => (
                <line 
                  key={i}
                  x1={600 + r1 * Math.cos(angle)}
                  y1={400 + r1 * Math.sin(angle)}
                  x2={600 + r2 * Math.cos(angle)}
                  y2={400 + r2 * Math.sin(angle)}
                  strokeWidth={isMajor ? 0.5 : 0.2}
                  opacity={isMajor ? 0.6 : 0.3}
                />
              ))}
            </svg>
          </div>

          {/* ─── Large Orbital Badge Behind Name ─── */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[420px] md:h-[420px]"
          >
            <svg width="100%" height="100%" viewBox="0 0 520 520" fill="none" stroke="currentColor" className="text-primary/8 dark:text-primary/10">
              {/* Outermost seal ring */}
              <circle 
                cx="260" cy="260" r="250"
                strokeWidth="0.5" strokeDasharray="6 8"
              />
              {/* Dashed intermediate ring */}
              <circle 
                cx="260" cy="260" r="220"
                strokeWidth="0.4" strokeDasharray="2 10"
              />
              {/* Solid inner ring */}
              <circle cx="260" cy="260" r="190" strokeWidth="0.3" opacity="0.5" />
              {/* Concentric graduation ticks */}
              {badgeTicks.map(({ angle, isMajor, i }) => (
                <line
                  key={i}
                  x1={260 + 185 * Math.cos(angle)}
                  y1={260 + 185 * Math.sin(angle)}
                  x2={260 + 195 * Math.cos(angle)}
                  y2={260 + 195 * Math.sin(angle)}
                  strokeWidth={isMajor ? 0.6 : 0.2}
                  opacity={isMajor ? 0.8 : 0.3}
                />
              ))}
              {/* Interlocking ellipses */}
              <ellipse
                cx="260" cy="260" rx="140" ry="80"
                strokeWidth="0.3" strokeDasharray="3 5"
              />
              <ellipse
                cx="260" cy="260" rx="80" ry="140"
                strokeWidth="0.3" strokeDasharray="2 6"
              />
            </svg>
          </div>

          {/* ─── Floating Architectural Elements ─── */}
          {/* Element 1: Section elevation fragment */}
          <div 
            className="absolute top-12 md:top-16 left-4 sm:left-12 md:left-32 opacity-[0.08] dark:opacity-[0.1] pointer-events-none select-none hidden lg:block"
          >
            <svg width="80" height="130" viewBox="0 0 80 130" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
              <polygon 
                points="40,10 10,45 70,45" 
              />
              <rect 
                x="18" y="45" width="44" height="70" rx="1"
              />
              <rect x="30" y="65" width="20" height="50" strokeWidth="0.5" />
              <circle cx="40" cy="75" r="4" strokeWidth="0.3" />
              {/* Window opening */}
              <rect x="26" y="52" width="12" height="10" strokeWidth="0.3" strokeDasharray="1 1" />
              {/* Foundation line */}
              <line x1="10" y1="115" x2="70" y2="115" strokeWidth="0.4" />
              {/* Hatching */}
              <line x1="10" y1="120" x2="70" y2="120" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.5" />
            </svg>
          </div>

          {/* Element 2: Multi-story facade */}
          <div 
            className="absolute top-20 md:top-24 right-4 sm:right-12 md:right-36 opacity-[0.07] dark:opacity-[0.09] pointer-events-none select-none hidden lg:block"
          >
            <svg width="100" height="90" viewBox="0 0 100 90" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
              <rect 
                x="5" y="5" width="90" height="75" rx="1"
              />
              {/* Floor lines */}
              <line x1="5" y1="30" x2="95" y2="30" strokeWidth="0.4" />
              <line x1="5" y1="55" x2="95" y2="55" strokeWidth="0.4" />
              {/* Windows */}
              <rect x="15" y="10" width="12" height="16" strokeWidth="0.3" />
              <rect x="33" y="10" width="12" height="16" strokeWidth="0.3" />
              <rect x="55" y="10" width="12" height="16" strokeWidth="0.3" />
              <rect x="73" y="10" width="12" height="16" strokeWidth="0.3" />
              <rect x="15" y="35" width="12" height="16" strokeWidth="0.3" />
              <rect x="33" y="35" width="12" height="16" strokeWidth="0.3" />
              <rect x="55" y="35" width="12" height="16" strokeWidth="0.3" />
              <rect x="73" y="35" width="12" height="16" strokeWidth="0.3" />
              {/* Door */}
              <rect x="40" y="60" width="20" height="20" strokeWidth="0.4" rx="1" />
              {/* Roof detail */}
              <line x1="0" y1="5" x2="100" y2="5" strokeWidth="0.2" strokeDasharray="2 3" />
            </svg>
          </div>

          {/* Element 3: Column detail / structural */}
          <div 
            className="absolute bottom-20 md:bottom-28 left-4 sm:left-16 md:left-48 opacity-[0.07] dark:opacity-[0.09] pointer-events-none select-none hidden lg:block"
          >
            <svg width="70" height="100" viewBox="0 0 70 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
              <circle 
                cx="35" cy="35" r="30"
              />
              <circle cx="35" cy="35" r="22" strokeWidth="0.4" strokeDasharray="3 3" />
              <circle cx="35" cy="35" r="14" strokeWidth="0.2" />
              <line x1="35" y1="5" x2="35" y2="65" strokeWidth="0.3" />
              <line x1="5" y1="35" x2="65" y2="35" strokeWidth="0.3" />
              {/* Column base */}
              <rect x="22" y="65" width="26" height="30" strokeWidth="0.4" rx="1" />
              <line x1="18" y1="68" x2="52" y2="68" strokeWidth="0.2" />
              {/* Fluting lines */}
              <line x1="27" y1="70" x2="27" y2="92" strokeWidth="0.15" opacity="0.5" />
              <line x1="35" y1="70" x2="35" y2="92" strokeWidth="0.15" opacity="0.5" />
              <line x1="43" y1="70" x2="43" y2="92" strokeWidth="0.15" opacity="0.5" />
            </svg>
          </div>

          {/* Element 4: Gable roof elevation */}
          <div 
            className="absolute bottom-24 md:bottom-32 right-4 sm:right-16 md:right-56 opacity-[0.06] dark:opacity-[0.08] pointer-events-none select-none hidden lg:block"
          >
            <svg width="70" height="110" viewBox="0 0 70 110" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary">
              <g>
                {/* Gable roof */}
                <polyline points="5,55 35,10 65,55" />
                <line x1="35" y1="10" x2="35" y2="25" strokeWidth="0.3" strokeDasharray="2 2" />
                {/* Walls */}
                <line x1="15" y1="55" x2="15" y2="100" strokeWidth="0.4" />
                <line x1="55" y1="55" x2="55" y2="100" strokeWidth="0.4" />
                {/* Floor */}
                <line x1="5" y1="100" x2="65" y2="100" strokeWidth="0.5" />
                {/* Window */}
                <rect x="24" y="65" width="22" height="20" strokeWidth="0.3" rx="1" />
                <line x1="35" y1="65" x2="35" y2="85" strokeWidth="0.15" />
                <line x1="24" y1="75" x2="46" y2="75" strokeWidth="0.15" />
                {/* Ground line */}
                <line x1="0" y1="105" x2="70" y2="105" strokeWidth="0.2" strokeDasharray="2 4" />
              </g>
            </svg>
          </div>

          {/* ─── Main Content ─── */}
          <div 
            className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center"
          >
            {/* Tagline Badge */}
            <span 
              className="text-[10px] sm:text-xs uppercase tracking-[0.15em] bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full mb-6 sm:mb-8 font-sans inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Vernacular Modernism & Universal Design
            </span>
            
            {/* Name */}
            <h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold tracking-tight leading-tight select-all relative"
            >
              {/* Glow layer behind text */}
              <div
                className="absolute inset-0 pointer-events-none select-none"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                }}
              />

              <span className="inline-flex flex-wrap justify-center items-center gap-x-[0.24em] relative z-10 text-foreground">
                {/* Small circular logo inline with name */}
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden border border-primary/20 shadow-sm flex items-center justify-center bg-card/50 backdrop-blur-sm group hover:scale-105 hover:border-primary/50 transition-all duration-500 mr-2 shrink-0">
                  <img
                    src="/logo.jpeg"
                    alt="Ar. Anushka Khatri Logo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {"AR. ANUSHKA KHATRI".split(" ").map((word, wordIdx, words) => {
                  const baseOffset = words.slice(0, wordIdx).reduce((sum, w) => sum + w.length, 0) + wordIdx;
                  return (
                    <span key={wordIdx} className="inline-flex items-baseline">
                      {word.split("").map((char, charIdx) => {
                        return (
                          <span
                            key={charIdx}
                            className="inline-block relative"
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-sm sm:text-base md:text-xl font-heading font-medium text-foreground mt-2 sm:mt-3 italic max-w-2xl"
            >
              <span className="relative inline-block">
                &ldquo;Designing spaces that speak through emotion, experience &amp; purpose.&rdquo;
                <span 
                  className="absolute -bottom-1 left-0 h-[1px] bg-primary/40 w-full"
                />
              </span>
            </p>
            
            {/* Short Bio Snippet */}
            <p 
              className="text-xs sm:text-sm md:text-base text-muted-foreground font-sans max-w-xl mt-2 sm:mt-3 leading-relaxed"
            >
              Architect passionate about creating meaningful, human-centric, and inclusive spaces through intuitive storytelling, construction technologies, and vernacular sustainability.
            </p>

            {/* Quick CTAs */}
            <div 
              className="flex gap-3 mt-3 sm:mt-4 flex-col sm:flex-row"
            >
              <button 
                onClick={() => handleScrollTo("projects-sec")}
                className="group relative text-xs sm:text-sm uppercase tracking-wider bg-primary hover:bg-primary/95 text-primary-foreground font-sans font-bold px-6 py-2.5 sm:py-3 rounded-full cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Explore Works</span>
                <div
                  className="relative z-10"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
              </button>
              <button 
                onClick={() => handleScrollTo("about-sec")}
                className="group relative text-xs sm:text-sm uppercase tracking-wider border border-border bg-card/50 hover:bg-muted text-foreground font-sans font-semibold px-6 py-2.5 sm:py-3 rounded-full cursor-pointer flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Read Profile</span>
              </button>
            </div>

            {/* Thankot House Before-After Minimal Slider */}
            <ThankotSlider />
          </div>

          {/* ─── Scroll Indicator ─── */}            <button 
            onClick={() => handleScrollTo("projects-sec")}
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer group"
            aria-label="Scroll down"
          >
            {/* Circular ring */}
            <div className="relative w-8 h-8 flex items-center justify-center mb-1">
              <svg 
                width="32" height="32" viewBox="0 0 32 32"
                fill="none" 
                stroke="currentColor"
                className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-500"
              >
                <circle cx="16" cy="16" r="14" strokeWidth="0.8" strokeDasharray="2 4" />
              </svg>
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/60 top-1 left-1"
              />
            </div>
            <span 
              className="text-[8px] uppercase tracking-[0.2em] font-mono text-muted-foreground/50 group-hover:text-primary transition-colors duration-500"
            >
              Scroll
            </span>
          </button>
        </section>

        {/* SECTION 2: PROJECTS ZONE (CATEGORY GALLERY) */}
        <section id="projects-sec" className="snap-section flex flex-col justify-center items-center relative px-4 sm:px-6 bg-muted/20 overflow-y-auto">
          <div className="w-full max-w-5xl my-auto pt-8 sm:pt-12 pb-16 sm:pb-12">
            <ProjectGallery />
          </div>
          
          <button 
            onClick={() => handleScrollTo("about-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 3: ABOUT & CREDENTIALS */}
        <section id="about-sec" className="snap-section flex flex-col justify-center items-center relative px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto my-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center pt-8 sm:pt-12 pb-20 sm:pb-12">
            
            {/* Left Side: Text Details */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                Identity & Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-1 mb-4">
                Designing Narratives & Spatial Experiences
              </h2>
              
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  As a working architect, I believe architecture should go far beyond plain aesthetics. Built forms are stories waiting to be told — they shape the way people feel, move, and connect within a space.
                </p>
                <p>
                  My professional journey spans three distinct roles: as an <strong>Architectural Draftsman at Ajira Engineering Pvt. Ltd.</strong> (2024–2025) where I honed precision in AutoCAD structural drawings and 3D modeling; as an <strong>Architecture Intern at Line Work Architects</strong> (2023–2024) where I engaged in full-cycle design from client concepts to site supervision; and currently as a <strong>Design & Site Coordinator at Bela Nepal Industries</strong> (2025–present), where I translate complex architectural details into rapid, sustainable prefab wall panel systems with hands-on site coordination.
                </p>
                <p>
                  Inspired by Bjarke Ingels&apos; pragmatic utopianism, I value strong conceptual imagination grounded in site feasibility, universal accessibility, and rich sensory interaction.
                </p>
              </div>

              {/* CV Download Trigger */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">                  <a
                    href="/portfolio/Latest CV as of bela.pdf"
                    download="Anushka_s_CV.pdf"
                    className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground font-sans font-semibold px-5 py-3 rounded-full cursor-pointer hover:scale-102 active:scale-98 transition-all duration-300 shadow-sm"
                  >
                    <FileDown className="w-4 h-4 text-primary" />
                    <span>Download Curriculum Vitae</span>
                  </a>
              </div>

              {/* Portfolio Downloads */}
              <div className="mt-8 border-t border-border/40 pt-6">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary font-sans mb-4">
                  Portfolio &amp; Report Downloads
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="/portfolio/01 Undergrad portfolio.pdf"
                    download="Ar_Anushka_Khatri_Undergrad_Portfolio.pdf"
                    className="flex items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-muted transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-sans font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                          Undergrad Portfolio
                        </span>
                        <span className="block text-[10px] font-mono text-muted-foreground">
                          5.7 MB &middot; B.Arch Projects
                        </span>
                      </div>
                    </div>
                    <FileDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors duration-300" />
                  </a>

                  <a
                    href="/portfolio/02 architecture internship report.pdf"
                    download="Ar_Anushka_Khatri_Internship_Report.pdf"
                    className="flex items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-muted transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-sans font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                          Internship Report
                        </span>
                        <span className="block text-[10px] font-mono text-muted-foreground">
                          9.4 MB &middot; Line Work Architects
                        </span>
                      </div>
                    </div>
                    <FileDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors duration-300" />
                  </a>

                  <a
                    href="/portfolio/03 Thesis project report.pdf"
                    download="Ar_Anushka_Khatri_Thesis_Report.pdf"
                    className="flex items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-muted transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-sans font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                          Thesis Project Report
                        </span>
                        <span className="block text-[10px] font-mono text-muted-foreground">
                          25 MB &middot; School for Visually Impaired
                        </span>
                      </div>
                    </div>
                    <FileDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors duration-300" />
                  </a>

                  <a
                    href="/portfolio/Latest CV as of bela.pdf"
                    download="Anushka_s_CV.pdf"
                    className="flex items-center justify-between gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-muted transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileDown className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-sans font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                          Curriculum Vitae
                        </span>
                        <span className="block text-[10px] font-mono text-muted-foreground">
                          56 KB &middot; Latest Version
                        </span>
                      </div>
                    </div>
                    <FileDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Digital License Seal and Info Box */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              {/* Custom SVG NEC License Digital Badge */}
              <div className="relative w-full max-w-[260px] sm:w-64 sm:h-64 bg-card rounded-2xl border border-border/80 shadow-md p-4 sm:p-6 flex flex-col items-center justify-between text-center select-none group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary/20 flex items-center justify-center relative bg-muted/30">
                  {/* Rotating seal border */}
                  <svg className="absolute inset-0 w-full h-full text-primary opacity-60 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                    <path d="M 50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                  <Compass className="w-8 h-8 text-primary" />
                </div>

                <div className="mt-3 sm:mt-4">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-primary font-bold font-mono">
                    Official Certification
                  </span>
                  <h4 className="text-sm sm:text-base font-heading font-bold text-foreground mt-1 leading-tight">
                    REGISTERED ARCHITECT
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">
                    Nepal Engineering Council (NEC)
                  </p>
                </div>

                <div className="w-full bg-background border border-border/60 py-2 sm:py-2.5 rounded-lg text-[9px] sm:text-xs font-mono font-semibold text-primary mt-2 flex flex-col gap-0.5">
                  <div className="text-[9px] sm:text-xs">STATUS: REGISTERED ARCHITECT</div>
                  <div className="text-[7px] sm:text-[9px] opacity-75">NEC REG NO: 94879</div>
                </div>
              </div>
            </div>
            
          </div>

          <button 
            onClick={() => handleScrollTo("capabilities-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 4: CAPABILITIES & TOOLBOX */}
        <section id="capabilities-sec" className="snap-section flex flex-col justify-center items-center relative px-6 bg-muted/10 overflow-y-auto">
          <div className="max-w-4xl mx-auto my-auto w-full pt-8 sm:pt-12 pb-16 sm:pb-12">
            
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                Core Specializations
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-1">
                Technical Strengths & Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Sector 1 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Universal / Inclusive Design
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Core design focus. Shaping spatial boundaries that welcome all human bodies equally — optimizing ramps, door clearances, level thresholds, and tactile path circulations.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: ACCESSIBILITY
                </div>
              </div>

              {/* Sector 2 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Urban Design & Circulation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Detailed site analysis, user movement mapping, and public plaza structures. Synthesizing urban infrastructure with community storytelling.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: SPATIAL FLOW
                </div>
              </div>

              {/* Sector 3 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Experiential Interiors
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Crafting volumetric depth and tactile details using wood, brass accents, and Lokta paper. Manipulating lighting filters for soothing ambient atmospheres.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: SENSORY DEPTH
                </div>
              </div>

            </div>

            {/* Interactive Toolbox Grid */}
            <div className="mt-10 bg-card/35 rounded-xl border border-border/40 p-6">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-center mb-4 font-sans">
                Professional Toolkit & Software Systems
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "AutoCAD", usage: "Drafting" },
                  { name: "Revit", usage: "BIM Modeling" },
                  { name: "SketchUp", usage: "3D Modeling" },
                  { name: "Lumion", usage: "Visualization" },
                  { name: "V-Ray", usage: "Renders" },
                  { name: "Enscape", usage: "Real-time" },
                  { name: "Photoshop", usage: "Post-prod" },
                  { name: "Illustrator", usage: "Graphics" },
                  { name: "InDesign", usage: "Editorial Layout" }
                ].map((tool, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-background border border-border/60 rounded-lg text-xs font-semibold text-foreground font-sans shadow-sm flex items-center gap-2 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{tool.name}</span>
                    <span className="text-[9px] text-muted-foreground/75 font-mono ml-1 font-normal bg-muted px-1.5 py-0.5 rounded">
                      {tool.usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button 
            onClick={() => handleScrollTo("materials-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 5: MATERIAL BOARD (EASTER EGG) */}
        <section id="materials-sec" className="snap-section flex flex-col justify-center items-center relative px-6 overflow-y-auto">
          <div className="w-full max-w-5xl my-auto pt-8 sm:pt-12 pb-16 sm:pb-12">
            <MaterialBoard />
          </div>
          
          <button 
            onClick={() => handleScrollTo("contact-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 6: CONTACT & INQUIRY FORM */}
        <section id="contact-sec" className="snap-section flex flex-col justify-center items-center relative px-6 bg-muted/20 overflow-y-auto">
          
          <div className="max-w-4xl mx-auto my-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 py-8 sm:py-12 items-stretch">
            
            {/* Left side info channels */}
            <div className="md:col-span-5 flex flex-col justify-between bg-card/50 rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                  Collaboration Hub
                </span>
                <h3 className="text-2xl font-heading font-bold text-foreground mt-1 mb-4">
                  Initiate a Spatial Project
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6">
                  Seeking design consults, professional collaboration, universal accessibility audits, or prefabricated panel implementation details? Reach out directly.
                </p>

                <div className="space-y-4">
                  <a 
                    href="mailto:Anushkakhatri004@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 text-xs font-sans font-medium text-foreground hover:border-primary/40 transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Anushkakhatri004@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+9779861288860"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 text-xs font-sans font-medium text-foreground hover:border-primary/40 transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+977 9861288860</span>
                  </a>
                  <a 
                    href="https://wa.me/9779861288860"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 text-xs font-sans font-medium text-foreground hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span>WhatsApp: +977 986-1288860</span>
                  </a>
                </div>
              </div>

              {/* Social Link grids */}
              <div className="border-t border-border/40 pt-6 mt-6">
                <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 font-sans">
                  Professional Networks
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Facebook", href: "https://www.facebook.com/Anushka.khatri6" },
                    { name: "LinkedIn", href: "https://www.linkedin.com/in/anushka-khatri-82398a1b9" },
                    { name: "Pinterest", href: "https://pin.it/2Rwum7yNQ" },
                    { name: "Instagram", href: "https://www.instagram.com/aee_k47/" }
                  ].map((network, index) => (
                    <a
                      key={index}
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-background/40 hover:bg-background border border-border/50 text-[11px] font-sans text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      <span>{network.name}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground/65" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right side contact form */}
            <div className="md:col-span-7 bg-card/75 backdrop-blur-md rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-8 flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-foreground">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mt-2 font-sans">
                    Thank you, Ar. Anushka Khatri will review your parameters and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                        Full Name / Studio
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Cengage / AIA Studio"
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email-input"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. partner@studio.com"
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sector-select" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                      Specialization Interest
                    </label>
                    <select
                      id="sector-select"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial &amp; Hospitality</option>
                      <option value="institutional">Institutional</option>
                      <option value="interior">Interior</option>
                      <option value="prefab-steel">Prefab Panel &amp; Steel Structure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="msg-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                      Inquiry Narrative / Brief
                    </label>
                    <textarea
                      id="msg-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your project dimensions, site limitations, or collaboration goals..."
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold py-3.5 rounded-xl cursor-pointer hover:shadow-sm hover:scale-101 active:scale-99 transition-all duration-300"
                  >
                    Submit Design Brief
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Footer baseline */}
          <div className="text-center text-[10px] font-mono text-muted-foreground/65 flex flex-col items-center justify-center gap-1 pt-8 pb-4">
            <span>© {new Date().getFullYear()} AR. ANUSHKA KHATRI. ALL RIGHTS REGISTERED (NEC).</span>
            <span>
              Developed by <span className="text-primary font-semibold tracking-wide">LazZy</span>
            </span>
          </div>
        </section>

      </main>
    </>
  );
}
