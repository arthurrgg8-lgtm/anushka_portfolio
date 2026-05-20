"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, BookOpen, Layers, Compass, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Thesis() {
  // Custom SVG representing her thesis courtyard design layout
  const renderCourtyardDiagram = () => (
    <svg className="w-full h-full bg-[#1b2230] text-[#ffb076]" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid background */}
      <defs>
        <pattern id="diag-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag-grid)" />

      {/* Historic Courtyard (Chowk) boundary walls */}
      <rect x="150" y="50" width="500" height="300" fill="none" stroke="#ffb076" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="400" y="30" textAnchor="middle" fill="#ffb076" fontSize="13" fontWeight="bold" fontFamily="sans-serif">HISTORIC NEPALESE CHOWK - INCLUSIVE UPGRADE PLAN</text>

      {/* Outer arcade corridors (Wood pillars) */}
      <rect x="170" y="70" width="460" height="260" fill="none" stroke="#ffb076" strokeWidth="1" />
      
      {/* Circular central seating plaza (inclusive focus) */}
      <circle cx="400" cy="200" r="70" fill="none" stroke="#ffb076" strokeWidth="2" />
      <circle cx="400" cy="200" r="50" fill="none" stroke="#ffb076" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx="400" cy="200" r="5" fill="#ff4f4f" />
      <text x="400" y="190" textAnchor="middle" fill="#ffb076" fontSize="9" fontFamily="monospace">CENTRAL MEETING PLAZA</text>

      {/* Accessible level thresholds & Tactile Guide Paths */}
      {/* Visual path from A to B */}
      <path d="M 170 200 L 330 200 M 470 200 L 630 200" stroke="#ff4f4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
      <path d="M 400 70 L 400 130 M 400 270 L 400 330" stroke="#ff4f4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
      <text x="250" y="215" textAnchor="middle" fill="#ff4f4f" fontSize="8" fontFamily="monospace">TACTILE WATER-DRAIN GUIDE PATHS</text>

      {/* Wheelchair Ramp sloped connections (1:12 slope standard) */}
      <polygon points="120,70 170,70 170,110" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="120" y1="70" x2="170" y2="90" stroke="#4f9bfd" strokeWidth="1" />
      <text x="100" y="90" fill="#4f9bfd" fontSize="8" fontFamily="monospace" transform="rotate(15 100 90)">RAMP 1:12</text>

      <polygon points="120,330 170,330 170,290" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="120" y1="330" x2="170" y2="310" stroke="#4f9bfd" strokeWidth="1" />
      <text x="100" y="320" fill="#4f9bfd" fontSize="8" fontFamily="monospace" transform="rotate(-15 100 320)">RAMP 1:12</text>

      {/* Pillar locations (traditional wooden pillars converted to steel/wood composite cores) */}
      {[
        { x: 170, y: 70 }, { x: 262, y: 70 }, { x: 354, y: 70 }, { x: 446, y: 70 }, { x: 538, y: 70 }, { x: 630, y: 70 },
        { x: 170, y: 330 }, { x: 262, y: 330 }, { x: 354, y: 330 }, { x: 446, y: 330 }, { x: 538, y: 330 }, { x: 630, y: 330 },
        { x: 170, y: 156 }, { x: 170, y: 244 }, { x: 630, y: 156 }, { x: 630, y: 244 }
      ].map((p, idx) => (
        <circle key={idx} cx={p.x} cy={p.y} r="4" fill="#ffb076" stroke="#1b2230" strokeWidth="1.5" />
      ))}

      {/* Legend Block */}
      <rect x="520" y="240" width="250" height="180" fill="#1b2230" stroke="#ffb076" strokeWidth="1" />
      <text x="535" y="260" fill="#ffb076" fontSize="11" fontWeight="bold" fontFamily="sans-serif">DESIGN REFERENCE LEGEND</text>
      
      <circle cx="545" cy="285" r="4" fill="#ffb076" />
      <text x="560" y="289" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Retrofit Composite Wooden Pillars</text>

      <line x1="540" y1="315" x2="550" y2="315" stroke="#ff4f4f" strokeWidth="2" strokeDasharray="2,2" />
      <text x="560" y="319" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Integrated Tactile Paving Guidelines</text>

      <line x1="540" y1="345" x2="550" y2="345" stroke="#4f9bfd" strokeWidth="2" />
      <text x="560" y="349" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Zero-Threshold Ramp Access Points</text>

      <rect x="540" y="375" width="10" height="10" fill="none" stroke="#ffb076" strokeWidth="1" strokeDasharray="3,2" />
      <text x="560" y="379" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Acoustic Lokta Ceiling Filters (A-09)</text>

      {/* Document details */}
      <text x="160" y="420" fill="#ffb076" fontSize="9" fontFamily="monospace">AR. ANUSHKA KHATRI | ACCESSIBILITY THESIS PROTOTYPE | DEPT. OF ARCHITECTURE</text>
    </svg>
  );

  return (
    <>
      {/* Minimal standalone header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-xs sm:text-sm">AR.</div>
            <span className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">Anushka Khatri</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold font-sans hover:translate-x-[-4px] transition-transform duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          {/* Thesis Header */}
          <div className="border-b border-border/40 pb-8 mb-10">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest font-sans">
              <Award className="w-4 h-4" />
              <span>Academic Thesis Showcase</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-4 leading-tight">
              Universal Design & Inclusive Spatial Systems: Restructuring Historic Civic Spaces in Kathmandu
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl font-sans leading-relaxed">
              An architectural research and design prototype detailing how traditional, historical Nepalese public squares (Chowks) can be structurally retrofitted to guarantee complete physical, sensory, and universal accessibility without degrading their rich cultural heritage.
            </p>
          </div>

          {/* Abstract block */}
          <div className="bg-card/40 border border-border/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-inner">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono block mb-2">
              THESIS ABSTRACT
            </span>
            <p className="text-sm text-foreground/90 leading-relaxed font-sans italic">
              "Traditional architectural typologies in South Asia, particularly Nepalese civic squares (Chowks), were constructed in response to dense communities, security, and local materials. However, their structural configurations feature heavy stairs, high door thresholds, and uneven stone flagging that lock out persons with disabilities, elderly citizens, and individuals with sensory limitations. This thesis outlines a spatial retrofit methodology. By inserting low-profile steel-and-wood composite ramps, integrated sub-surface tactile water guides, and acoustic ceiling baffles made of locally sourced Lokta paper, we can establish an environment of seamless, dignified universal access that preserves the historic vernacular envelope."
            </p>
          </div>

          {/* Interactive Court Yard CAD Diagram */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border/60 shadow-md mb-10 bg-card select-none">
            {renderCourtyardDiagram()}
          </div>

          {/* Core Chapters */}
          <div className="space-y-8">
            <div className="border-l-2 border-primary pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Chapter 1: The Barrier of Heritage
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                Historic preservation codes often conflict with access laws. Traditional Newari brick courtyards rely on elevated plinths (dabhos) to shield spaces from flooding, but these create 45cm vertical blocks. We study how steel structural joints can suspend thin floor plates to span plinths, guaranteeing a zero-threshold entrance for wheelchairs while leaving original brickwork completely untouched below.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Chapter 2: Multi-Sensory Spatial Paving
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                Accessibility is not just physical; it is sensory. For visually impaired users, historic stone flags are dangerous. Instead of generic plastic tactile bumps that clash with heritage sites, we design sub-surface stone grooves. These grooves serve dual purposes: acting as storm-water drainage channels during monsoons and providing clear, audible, and tactile physical guide paths for cane users.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Chapter 3: Prefabricated panel infills
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                To execute interior inclusive restructuring, we leverage prefabricated lightweight panel wall systems. Pre-milled panel connections slide into original wood beam joints seamlessly, allowing historic courtyards to adapt their internal spaces into modern, fully accessible information clinics, clinics, and restrooms without invasive drilling or brick-and-mortar masonry work.
              </p>
            </div>
          </div>

          {/* Footer credentials */}
          <div className="border-t border-border/40 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground font-mono">
            <span>DEFENDED AT: DEPARTMENT OF ARCHITECTURE</span>
            <span className="mt-2 sm:mt-0">NEC LICENCE: REGISTERED STATUS</span>
          </div>

        </div>
      </main>
    </>
  );
}
