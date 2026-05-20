"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, FilterCategory } from "@/components/navigation";
import { ProjectSheet } from "@/components/project-sheet";
import {
  ArrowUpRight,
  Compass,
  MapPin,
  Layers,
  Flame,
  Trees,
  Sparkles,
  Mail,
  Phone,
  MoveHorizontal,
  BookOpen,
  Award,
  Wrench,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA – every card that populates the grid                          */
/* ------------------------------------------------------------------ */
interface GridItem {
  id: string;
  title: string;
  tag: string;
  category: FilterCategory;
  excerpt?: string;
  location?: string;
  year?: string;
  phase?: string;
  role?: string;
  content?: string[];
  colSpan?: string;     // tailwind col span class
  rowSpan?: string;     // tailwind row span class
  bgClass?: string;     // card visual bg
  accentColor?: string; // hex color
}

const GRID_ITEMS: GridItem[] = [
  {
    id: "accessibility-pavilion",
    title: "Universal Accessibility Pavilion",
    tag: "Inclusive / Experiential Design",
    category: "PROJECTS",
    excerpt: "Designing spaces that welcome all human bodies equally — optimizing ramps, door clearances, level thresholds, and tactile path circulations.",
    location: "Kathmandu, Nepal",
    year: "2025",
    phase: "Design Development",
    role: "Lead Architect",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    bgClass: "bg-[#1b2230]",
    accentColor: "#4f9bfd",
  },
  {
    id: "thesis-chowk",
    title: "Inclusive Chowk Retrofit",
    tag: "Academic Thesis",
    category: "RESEARCH",
    excerpt: "Restructuring Historic Civic Spaces in Kathmandu for universal accessibility without degrading rich cultural heritage.",
    location: "Kathmandu Valley",
    year: "2025",
    phase: "Thesis Prototype",
    role: "Primary Researcher",
    colSpan: "md:col-span-2",
    bgClass: "bg-[#1b2230]",
    accentColor: "#ffb076",
  },
  {
    id: "nec-license",
    title: "Registered Architect",
    tag: "NEC Accreditation",
    category: "CAPABILITIES",
    excerpt: "Official Registered Architect license certified by the Nepal Engineering Council (NEC) — Reg No: 94879.",
    location: "Nepal",
    year: "2025",
    phase: "Active",
    role: "Principal",
    bgClass: "bg-card",
  },
  {
    id: "material-board",
    title: "Interactive Material Board",
    tag: "Material Philosophy",
    category: "PROJECTS",
    excerpt: "Explore vernacular Nepalese construction materials — from terracotta brick and Sal hardwood to hammered brass and Lokta paper screens.",
    location: "Kathmandu",
    year: "2025",
    phase: "Schematic Design",
    role: "Material Specialist",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    bgClass: "bg-gradient-to-br from-[#c85a32]/10 via-background to-[#7a553c]/10",
  },
  {
    id: "bela-panels",
    title: "Prefabricated Panel Systems",
    tag: "Construction Tech",
    category: "RESEARCH",
    excerpt: "Exploring the transition from traditional brick masonry to eco-friendly, fast, and thermally regulated panel infill wall systems.",
    location: "Kathmandu Valley",
    year: "2026",
    phase: "Published",
    role: "Author",
    content: [
      "Traditional construction in the Kathmandu Valley has long relied on brick masonry. While culturally rich, traditional brick construction is slow, carries high material waste, and exhibits poor thermal performance. During my time working with Bela Nepal Industries, I saw a practical solution: semi-prefabricated lightweight wall panels.",
      "Instead of building walls brick-by-brick on-site, prefabricated infill wall panels are manufactured in controlled factory settings, brought to the building site, aligned, fixed to the concrete columns and beams, and finished with clean detailing. This method reduces structural dead weight and slashes material waste by up to 40%.",
      "But most importantly, this system addresses a fundamental humanitarian belief: everyone deserves a sustainable, safe, and affordable home. Lightweight panels offer superior seismic flexibility and built-in insulation pockets, making modern green home construction affordable for rapidly urbanizing centers in Nepal."
    ],
    bgClass: "bg-muted/40",
  },
  {
    id: "pragmatic-utopianism",
    title: "Pragmatic Utopianism",
    tag: "Design Philosophy",
    category: "RESEARCH",
    excerpt: "Applying Bjarke Ingels' 'Yes is More' in asymmetric spaces — turning structural limitations into spatial advantages.",
    location: "Global",
    year: "2026",
    phase: "Published",
    role: "Author",
    content: [
      "Bjarke Ingels Group (BIG) popularized the concept of 'Pragmatic Utopianism'—the idea that buildings can blend imaginative utopian ideals with highly practical, buildable solutions. At its core is the motto: 'Yes is More'—turning architectural barriers (like strict accessibility rules or irregular site shapes) into the design's biggest highlights.",
      "As an architect focused on Universal and Inclusive Design, I apply this philosophy constantly. Universal design guidelines (like standard 1:12 ramp slopes or wide door clearances) are often treated by developers as annoying compliance boxes that ruin clean layouts. But by saying 'Yes' to these constraints, we can design dramatic sloped circulations that shape the building's entire form, creating beautiful, flowing paths for everyone.",
      "By welcoming limitations rather than resisting them, architecture moves away from dry aesthetic copycats and becomes a living, functional environment that tells a meaningful story of inclusivity."
    ],
    bgClass: "bg-muted/40",
  },
  {
    id: "capabilities-toolbox",
    title: "Technical Capabilities & Toolbox",
    tag: "Core Specializations",
    category: "CAPABILITIES",
    excerpt: "Universal design auditing, urban circulation planning, experiential interior design — and mastery of AutoCAD, SketchUp, Lumion, V-Ray, Enscape, Photoshop, and InDesign.",
    location: "Nepal",
    year: "Active",
    phase: "Ongoing",
    role: "Principal Architect",
    colSpan: "md:col-span-2",
    bgClass: "bg-muted/20",
  },
  {
    id: "contact-form",
    title: "Initiate a Spatial Project",
    tag: "Collaboration Hub",
    category: "CONTACT",
    excerpt: "Seeking design consults, professional collaboration, universal accessibility audits, or prefabricated panel implementation details? Reach out directly.",
    location: "Kathmandu, Nepal",
    year: "2025+",
    phase: "Open",
    role: "Principal",
    colSpan: "md:col-span-2",
    bgClass: "bg-primary/5",
  },
];

/* ------------------------------------------------------------------ */
/*  MINI SVG PREVIEWS for grid cards                                   */
/* ------------------------------------------------------------------ */
function BlueprintMiniPreview() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#1b2230" />
      <defs>
        <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mini-grid)" />
      <rect x="60" y="40" width="280" height="10" fill="none" stroke="#4f9bfd" strokeWidth="1.5" />
      <rect x="60" y="40" width="20" height="120" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <rect x="320" y="40" width="20" height="120" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="60" y1="160" x2="340" y2="160" stroke="#4f9bfd" strokeWidth="2" />
      <rect x="100" y="50" width="200" height="110" fill="none" stroke="#4f9bfd" strokeWidth="0.75" />
      <line x1="160" y1="50" x2="160" y2="160" stroke="#4f9bfd" strokeWidth="0.75" />
      <line x1="220" y1="50" x2="220" y2="160" stroke="#4f9bfd" strokeWidth="0.75" />
      <line x1="280" y1="50" x2="280" y2="160" stroke="#4f9bfd" strokeWidth="0.75" />
      <path d="M 60 160 L 20 160 L 60 130 Z" fill="none" stroke="#4f9bfd" strokeWidth="1" strokeDasharray="3,2" />
      <text x="25" y="145" fill="#4f9bfd" fontSize="6" fontFamily="monospace">RAMP 1:12</text>
      <circle cx="200" cy="100" r="3" fill="#ff4f4f" opacity="0.8" />
    </svg>
  );
}

function ThesisMiniPreview() {
  return (
    <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#1b2230" />
      <defs>
        <pattern id="thesis-grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#thesis-grid)" />
      <rect x="80" y="30" width="240" height="140" fill="none" stroke="#ffb076" strokeWidth="1" strokeDasharray="4,2" />
      <circle cx="200" cy="100" r="40" fill="none" stroke="#ffb076" strokeWidth="1.5" />
      <circle cx="200" cy="100" r="25" fill="none" stroke="#ffb076" strokeWidth="0.75" strokeDasharray="3,3" />
      <circle cx="200" cy="100" r="3" fill="#ff4f4f" />
      <path d="M 80 100 L 160 100 M 240 100 L 320 100" stroke="#ff4f4f" strokeWidth="1" strokeDasharray="2,2" />
      <path d="M 200 30 L 200 60 M 200 140 L 200 170" stroke="#ff4f4f" strokeWidth="1" strokeDasharray="2,2" />
      <text x="200" y="25" textAnchor="middle" fill="#ffb076" fontSize="7" fontFamily="sans-serif" fontWeight="bold">HISTORIC CHOWK — INCLUSIVE RETROFIT</text>
    </svg>
  );
}

function MaterialMiniPreview() {
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-1 p-2">
      <div className="bg-[#c85a32] rounded-md flex items-center justify-center"><Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" /></div>
      <div className="bg-[#7a553c] rounded-md flex items-center justify-center"><Trees className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" /></div>
      <div className="bg-[#8a9199] rounded-md flex items-center justify-center"><Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" /></div>
      <div className="bg-[#3e444f] rounded-md flex items-center justify-center"><Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" /></div>
      <div className="bg-[#d4af37] rounded-md flex items-center justify-center"><Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black/60" /></div>
      <div className="bg-[#f5ebd6] rounded-md flex items-center justify-center"><BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-black/40" /></div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COURTYARD DIAGRAM (for the thesis sheet)                           */
/* ------------------------------------------------------------------ */
function renderCourtyardDiagram() {
  return (
    <svg className="w-full h-full bg-[#1b2230] text-[#ffb076]" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diag-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag-grid)" />
      <rect x="150" y="50" width="500" height="300" fill="none" stroke="#ffb076" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="400" y="30" textAnchor="middle" fill="#ffb076" fontSize="13" fontWeight="bold" fontFamily="sans-serif">HISTORIC NEPALESE CHOWK — INCLUSIVE UPGRADE PLAN</text>
      <rect x="170" y="70" width="460" height="260" fill="none" stroke="#ffb076" strokeWidth="1" />
      <circle cx="400" cy="200" r="70" fill="none" stroke="#ffb076" strokeWidth="2" />
      <circle cx="400" cy="200" r="50" fill="none" stroke="#ffb076" strokeWidth="1" strokeDasharray="3,3" />
      <circle cx="400" cy="200" r="5" fill="#ff4f4f" />
      <text x="400" y="190" textAnchor="middle" fill="#ffb076" fontSize="9" fontFamily="monospace">CENTRAL MEETING PLAZA</text>
      <path d="M 170 200 L 330 200 M 470 200 L 630 200" stroke="#ff4f4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
      <path d="M 400 70 L 400 130 M 400 270 L 400 330" stroke="#ff4f4f" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2,2" />
      <text x="250" y="215" textAnchor="middle" fill="#ff4f4f" fontSize="8" fontFamily="monospace">TACTILE WATER-DRAIN GUIDE PATHS</text>
      <polygon points="120,70 170,70 170,110" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <text x="100" y="90" fill="#4f9bfd" fontSize="8" fontFamily="monospace" transform="rotate(15 100 90)">RAMP 1:12</text>
      <polygon points="120,330 170,330 170,290" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <text x="100" y="320" fill="#4f9bfd" fontSize="8" fontFamily="monospace" transform="rotate(-15 100 320)">RAMP 1:12</text>
      {[
        { x: 170, y: 70 }, { x: 262, y: 70 }, { x: 354, y: 70 }, { x: 446, y: 70 }, { x: 538, y: 70 }, { x: 630, y: 70 },
        { x: 170, y: 330 }, { x: 262, y: 330 }, { x: 354, y: 330 }, { x: 446, y: 330 }, { x: 538, y: 330 }, { x: 630, y: 330 },
        { x: 170, y: 156 }, { x: 170, y: 244 }, { x: 630, y: 156 }, { x: 630, y: 244 }
      ].map((p, idx) => (
        <circle key={idx} cx={p.x} cy={p.y} r="4" fill="#ffb076" stroke="#1b2230" strokeWidth="1.5" />
      ))}
      <rect x="520" y="240" width="250" height="180" fill="#1b2230" stroke="#ffb076" strokeWidth="1" />
      <text x="535" y="260" fill="#ffb076" fontSize="11" fontWeight="bold" fontFamily="sans-serif">DESIGN REFERENCE LEGEND</text>
      <circle cx="545" cy="285" r="4" fill="#ffb076" />
      <text x="560" y="289" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Retrofit Composite Wooden Pillars</text>
      <line x1="540" y1="315" x2="550" y2="315" stroke="#ff4f4f" strokeWidth="2" strokeDasharray="2,2" />
      <text x="560" y="319" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Integrated Tactile Paving</text>
      <line x1="540" y1="345" x2="550" y2="345" stroke="#4f9bfd" strokeWidth="2" />
      <text x="560" y="349" fill="#ffb076" fontSize="9" fontFamily="sans-serif">Zero-Threshold Ramp Access</text>
      <text x="160" y="420" fill="#ffb076" fontSize="9" fontFamily="monospace">AR. ANUSHKA KHATRI | ACCESSIBILITY THESIS | DEPT. OF ARCHITECTURE</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  GRID CARD                                                          */
/* ------------------------------------------------------------------ */
function GridCard({ item, index, onClick }: { item: GridItem; index: number; onClick: () => void }) {
  const hasVisual = ["accessibility-pavilion", "thesis-chowk", "material-board"].includes(item.id);
  const isContact = item.id === "contact-form";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-none border border-border/30 cursor-pointer transition-all duration-400 hover:border-primary/40 hover:shadow-lg ${item.colSpan || ""} ${item.rowSpan || ""} ${item.bgClass || "bg-card/50"} flex flex-col`}
    >
      {/* Visual preview (top section) for visual cards */}
      {hasVisual && (
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden relative">
          {item.id === "accessibility-pavilion" && <BlueprintMiniPreview />}
          {item.id === "thesis-chowk" && <ThesisMiniPreview />}
          {item.id === "material-board" && <MaterialMiniPreview />}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-400 flex items-center justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-75 group-hover:scale-100 shadow-md">
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Card text body */}
      <div className={`p-4 sm:p-5 md:p-6 flex-grow flex flex-col justify-between ${hasVisual ? "" : "min-h-[160px] sm:min-h-[200px]"}`}>
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary font-bold font-mono block mb-1.5 sm:mb-2">
            {item.tag}
          </span>
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-heading font-bold text-foreground uppercase leading-tight group-hover:text-primary transition-colors duration-300">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2 leading-relaxed font-sans line-clamp-2 sm:line-clamp-3">
              {item.excerpt}
            </p>
          )}
        </div>

        {/* Bottom meta row */}
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-border/30 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">
          <span>{item.location || ""}</span>
          <span className="flex items-center gap-1">
            {isContact ? (
              <>
                <Mail className="w-3 h-3 text-primary" />
                <span className="text-primary font-bold">Open Brief</span>
              </>
            ) : (
              <>
                <span>{item.year || ""}</span>
                <ArrowUpRight className="w-3 h-3 ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", sector: "universal" });

  // Deep-link support: read hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const found = GRID_ITEMS.find((i) => i.id === hash);
      if (found) setOpenItemId(hash);
    }
  }, []);

  // Sync hash to URL
  useEffect(() => {
    if (openItemId) {
      window.history.replaceState(null, "", `#${openItemId}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [openItemId]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "", sector: "universal" });
      }, 5000);
    }
  }, [formData]);

  const filteredItems = activeFilter === "ALL"
    ? GRID_ITEMS
    : GRID_ITEMS.filter((i) => i.category === activeFilter);

  const openItem = GRID_ITEMS.find((i) => i.id === openItemId) || null;

  return (
    <>
      <Navigation activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="pt-[52px] sm:pt-[60px] min-h-screen">
        {/* Hero Banner */}
        <section className="w-full bg-background relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center text-center">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest bg-primary/10 text-primary font-bold px-2.5 sm:px-3 py-1 rounded-full mb-4 sm:mb-6 font-sans">
              Vernacular Modernism & Universal Design
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-foreground tracking-tight leading-[0.9] uppercase select-all">
              AR. ANUSHKA
              <br />
              KHATRI
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-sans max-w-lg sm:max-w-xl mt-4 sm:mt-6 leading-relaxed px-4">
              Architect passionate about creating meaningful, human-centric, and inclusive spaces through intuitive storytelling, construction technologies, and vernacular sustainability.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0">
              <button
                onClick={() => setActiveFilter("PROJECTS")}
                className="text-[10px] sm:text-xs uppercase tracking-wider bg-primary hover:bg-primary/95 text-primary-foreground font-sans font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full cursor-pointer hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                Explore Works
              </button>
              <button
                onClick={() => {
                  setOpenItemId("contact-form");
                }}
                className="text-[10px] sm:text-xs uppercase tracking-wider border border-border bg-card/50 hover:bg-muted text-foreground font-sans font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* Filter Indicator */}
        {activeFilter !== "ALL" && (
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                FILTERING:
              </span>
              <span className="text-[10px] sm:text-xs font-sans font-bold text-primary uppercase">
                {activeFilter}
              </span>
              <button
                onClick={() => setActiveFilter("ALL")}
                className="ml-1 sm:ml-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono"
              >
                [CLEAR]
              </button>
            </div>
          </div>
        )}

        {/* Edge-to-edge Matrix Grid */}
        <section className="max-w-[1600px] mx-auto px-0 sm:px-0 pb-6 sm:pb-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto"
            >
              {filteredItems.map((item, idx) => (
                <GridCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onClick={() => setOpenItemId(item.id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-6 sm:py-8">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-mono text-muted-foreground/65">
            <span className="text-center sm:text-left">© {new Date().getFullYear()} AR. ANUSHKA KHATRI. ALL RIGHTS REGISTERED (NEC).</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="mailto:Anushkakhatri004@gmail.com" className="hover:text-primary transition-colors flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </a>
              <a href="tel:+9779861288860" className="hover:text-primary transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone
              </a>
              <span>
                Developed by{" "}
                <a href="https://anuditk.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">
                  Anudit Khatri
                </a>
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* Slide-out Sheet Overlay */}
      <ProjectSheet
        isOpen={!!openItemId}
        onClose={() => setOpenItemId(null)}
        item={openItem}
        renderCourtyardDiagram={renderCourtyardDiagram}
        formData={formData}
        setFormData={setFormData}
        formSubmitted={formSubmitted}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}
