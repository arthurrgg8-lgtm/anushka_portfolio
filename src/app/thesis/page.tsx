"use client";

import { Navigation } from "@/components/navigation";
import { ArrowLeft, FileDown, BookOpen, Layers, Compass, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Scroll-reveal animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const chapterItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export default function Thesis() {
  // Multi-sensory design diagram — Braille, acoustic, and olfactory spatial zones
  const renderMultiSensoryDiagram = () => (
    <svg className="w-full h-full bg-[#1b2230] text-[#67e8f9]" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sensory-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#67e8f9" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#sensory-grid)" />

      {/* Title */}
      <text x="400" y="30" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="bold" fontFamily="sans-serif">SCHOOL FOR VISUALLY IMPAIRED — MULTI-SENSORY DESIGN FRAMEWORK</text>

      {/* Main building footprint */}
      <rect x="180" y="60" width="440" height="280" fill="none" stroke="#67e8f9" strokeWidth="1.5" />
      
      {/* Zone 1: Tactile Zone — Braille & texture paths */}
      <rect x="200" y="80" width="180" height="120" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
      <text x="290" y="100" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">ZONE 1: TACTILE</text>
      <text x="290" y="115" textAnchor="middle" fill="#f59e0b" fontSize="8">Braille Wayfinding Paths</text>
      {/* Braille dot patterns */}
      {[[240,140],[240,155],[240,170],[280,140],[280,155],[280,170],[320,140],[320,155],[320,170]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="2" fill="#f59e0b" opacity="0.7" />
      ))}
      {/* Tactile ground surface indicators */}
      <rect x="220" y="185" width="140" height="4" rx="2" fill="#f59e0b" opacity="0.5" />
      <text x="290" y="210" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">▬ TACTILE PAVING STRIPS ▬</text>

      {/* Zone 2: Acoustic Zone — Echo/Sound wayfinding */}
      <rect x="200" y="220" width="180" height="100" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4,3" />
      <text x="290" y="238" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">ZONE 2: ACOUSTIC</text>
      {/* Concentric sound wave rings */}
      <circle cx="290" cy="275" r="12" fill="none" stroke="#a78bfa" strokeWidth="0.6" />
      <circle cx="290" cy="275" r="20" fill="none" stroke="#a78bfa" strokeWidth="0.4" opacity="0.6" />
      <circle cx="290" cy="275" r="28" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.4" />
      <text x="290" y="300" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">ECHOLOCATION CUES</text>

      {/* Zone 3: Olfactory Zone — Scent-based navigation */}
      <rect x="420" y="80" width="180" height="240" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" />
      <text x="510" y="100" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">ZONE 3: OLFACTORY</text>
      {/* Scent plume particles */}
      {Array.from({length:8}).map((_,i)=>(
        <circle key={i} cx={460+i*14} cy={140+Math.sin(i*1.2)*15} r="3" fill="#10b981" opacity={0.3+Math.sin(i)*0.2} />
      ))}
      <text x="510" y="165" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace">SCENT DIFFUSERS</text>
      <text x="510" y="180" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace">ODOR ORDERING SYSTEM</text>

      {/* Central connecting corridor */}
      <rect x="380" y="80" width="40" height="240" fill="none" stroke="#67e8f9" strokeWidth="0.6" strokeDasharray="2,4" />
      
      {/* Outdoor sensory garden area */}
      <rect x="420" y="230" width="180" height="90" fill="none" stroke="#34d399" strokeWidth="0.8" rx="4" />
      <text x="510" y="250" textAnchor="middle" fill="#34d399" fontSize="9">🌿 SENSORY GARDEN</text>
      {/* Plant symbols */}
      {[[450,275],[480,280],[520,278],[560,272]].map(([x,y],i)=>(
        <path key={i} d={`M ${x} ${y} L ${x-4} ${y-10} M ${x} ${y} L ${x+4} ${y-10} M ${x} ${y} L ${x} ${y-12}`} stroke="#34d399" strokeWidth="0.5" fill="none" />
      ))}

      {/* Access routes */}
      <line x1="110" y1="200" x2="200" y2="200" stroke="#67e8f9" strokeWidth="0.6" strokeDasharray="3,3" markerEnd="url(#arrowhead)" />
      <text x="155" y="195" textAnchor="middle" fill="#67e8f9" fontSize="7" fontFamily="monospace">ENTRY</text>

      {/* Legend */}
      <rect x="30" y="330" width="740" height="100" fill="#1b2230" stroke="#67e8f9" strokeWidth="0.8" />
      <text x="50" y="350" fill="#67e8f9" fontSize="11" fontWeight="bold">LEGEND — SENSORY DESIGN STRATEGIES</text>
      
      <circle cx="60" cy="375" r="5" fill="#f59e0b" />
      <text x="75" y="379" fill="#67e8f9" fontSize="9">Touch: Braille script, tactile paving, textured wall surfaces, temperature gradients</text>
      
      <circle cx="60" cy="395" r="5" fill="#a78bfa" />
      <text x="75" y="399" fill="#67e8f9" fontSize="9">Acoustic: Sound-reflecting soffits, echolocation wayfinding, acoustic baffle ceilings (Lokta paper)</text>
      
      <circle cx="410" cy="375" r="5" fill="#10b981" />
      <text x="425" y="379" fill="#67e8f9" fontSize="9">Smell: Odor zoning for spatial orientation, aromatic garden species, scented air currents</text>

      <circle cx="410" cy="395" r="5" fill="#34d399" />
      <text x="425" y="399" fill="#67e8f9" fontSize="9">Sensory Garden: Therapeutic horticulture, tactile plant beds, water features, wind chimes</text>

      {/* Footer */}
      <text x="400" y="440" textAnchor="middle" fill="#67e8f9" fontSize="8" fontFamily="monospace">AR. ANUSHKA KHATRI | THESIS 2025 | PURBANCHAL UNIVERSITY — SCHOOL FOR VISUALLY IMPAIRED</text>
    </svg>
  );

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold font-sans hover:translate-x-[-4px] transition-transform duration-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Portfolio</span>
            </Link>
          </motion.div>

          {/* Thesis Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="border-b border-border/40 pb-8 mb-10"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest font-sans">
              <Award className="w-4 h-4" />
              <span>Academic Thesis Showcase — 2025</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mt-4 leading-tight">
              School for Visually Impaired: A Multi-Sensory Approach to Universal Design
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl font-sans leading-relaxed">
              A thesis research and design prototype for a specialized educational facility in Nepal that leverages touch (Braille), acoustic echolocation, and olfactory scent-zoning as primary spatial navigation tools — empowering visually impaired students to learn, move, and thrive with confidence and dignity.
            </p>
          </motion.div>

          {/* Abstract block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-card/40 border border-border/50 rounded-2xl p-6 sm:p-8 mb-10 shadow-inner"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono block mb-2">
              THESIS ABSTRACT
            </span>
            <p className="text-sm text-foreground/90 leading-relaxed font-sans italic">
              &ldquo;Visually impaired students in Nepal face significant barriers to quality education, not just through curriculum limitations but through the very architecture of their schools. Staircases without tactile cues, uniform corridors with no acoustic differentiation, and classrooms that ignore sensory needs create environments of dependency rather than empowerment. This thesis proposes a purpose-built School for Visually Impaired that replaces vision-dependent wayfinding with a multi-sensory spatial framework: textured tactile paths and Braille signage for touch, echolocation-reflective soffits and acoustic zoning for hearing, and aromatic planting corridors for olfactory orientation. The architecture itself becomes the aid — transforming every corridor, courtyard, and classroom into an intuitive, empowering educational tool.&rdquo;
            </p>
          </motion.div>

          {/* Multi-Sensory Design Diagram */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border/60 shadow-md mb-10 bg-card select-none"
          >
            {renderMultiSensoryDiagram()}
          </motion.div>

          {/* Core Chapters */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            <motion.div variants={chapterItem} className="border-l-2 border-amber-500 pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Touch: Tactile Wayfinding & Braille Integration
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                The sense of touch is the primary spatial interface for visually impaired users. This thesis develops a comprehensive tactile language across the campus: textured ground surface indicators (TGSIs) with varying patterns for corridors, junctions, and hazard warnings; continuous Braille handrails along all primary circulation routes; and temperature-differentiated materials (warm wood vs. cool stone) to denote programmatic transitions. Every material junction is designed to be felt, not just seen.
              </p>
            </motion.div>

            <motion.div variants={chapterItem} className="border-l-2 border-violet-500 pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Sound: Acoustic Zoning & Echolocation Architecture
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                Sound is a powerful navigational tool. The design uses ceiling geometry — varying soffit heights, Lokta paper acoustic baffles, and reflecting surfaces — to create distinct acoustic signatures for each functional zone. Corridors are tuned with specific reverberation profiles so students can audibly identify whether they are in a hallway, a classroom, or an open gathering space. Water features at key decision points provide natural sound markers, while quiet zones ensure undistracted learning.
              </p>
            </motion.div>

            <motion.div variants={chapterItem} className="border-l-2 border-emerald-500 pl-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Smell: Olfactory Zoning & Scent-Based Navigation
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                The most innovative layer of the thesis — using scent as an ordering principle. Aromatic plant species are strategically placed around the campus: lavender near administrative zones for calm, rosemary along learning corridors for alertness, and jasmine near social spaces for warmth. A controlled HVAC scent-diffusion system reinforces these olfactory zones during indoor navigation. Combined with the tactile and acoustic systems, this creates a foolproof tri-sensory spatial language that requires no vision whatsoever.
              </p>
            </motion.div>
          </motion.div>

          {/* Download thesis */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="border-t border-border/40 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="text-xs text-muted-foreground font-mono text-center sm:text-left">
              <span className="block">DEFENDED AT: PURBANCHAL UNIVERSITY — KANTIPUR INTERNATIONAL COLLEGE</span>
              <span className="block mt-1">NEC LICENCE: REGISTERED ARCHITECT (NO. 94879)</span>
            </div>
            <a
              href="/portfolio/03 Thesis project report.pdf"
              download
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-102 active:scale-98"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Full Thesis (PDF)</span>
            </a>
          </motion.div>

        </div>
      </main>
    </>
  );
}
