"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BeforeAfterSlider } from "./before-after-slider";
import {
  Home,
  Building2,
  Armchair,
  Landmark,
  LayoutPanelTop,
  Construction,
  ArrowLeft,
  MapPin,
  Calendar,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
  Layers,
  MoveHorizontal,
  Play
} from "lucide-react";

/* ─── Animation Variants ─── */
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 20, mass: 0.8 }
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 70, damping: 20, mass: 0.9 }
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.2, ease: "easeIn" as const }
  }
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 22, mass: 1 }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.2, ease: "easeIn" as const }
  }
};

/* ─── Helper: encode filename for URL ─── */
function imgUrl(category: string, filename: string): string {
  return `/projects/${category}/${encodeURIComponent(filename)}`;
}

/* ─── Types ─── */
interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  description: string;
  details: string[];
  gradient: string;
  images: string[];
  categoryId: string;
  showSlider?: boolean;
  videoUrl?: string;
  embedUrl?: string;
}

/* ─── Image Lightbox Component ─── */
function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center select-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 z-10 text-white/60 text-xs font-mono tracking-wider">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Project image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {}}  // controlled by parent via keyboard
              className={`shrink-0 w-10 sm:w-14 h-8 sm:h-10 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? "border-white opacity-100 scale-110"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Project Video Player (direct file) ─── */
function ProjectVideo({ videoUrl, categoryId }: { videoUrl: string; categoryId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const fullUrl = `/projects/${categoryId}/${encodeURIComponent(videoUrl)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 18 }}
      className="space-y-3"
    >
      <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-mono block">
        Walkthrough Video
      </span>

      <div className="relative rounded-xl overflow-hidden border border-border/50 bg-black/5 group">
        {!isPlaying ? (
          <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-sky-800/10">
            {/* Play button overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 hover:bg-primary shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Play walkthrough video"
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1" />
            </button>
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-primary/5" />
            </div>
            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-xs text-foreground/60 font-mono">
                Architectural Walkthrough &middot; ~2 min
              </p>
            </div>
          </div>
        ) : (
          <video
            controls
            autoPlay
            className="w-full aspect-video bg-black"
            onEnded={() => setIsPlaying(false)}
          >
            <source src={fullUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Project YouTube Embed ─── */
function ProjectYouTubeEmbed({ embedId }: { embedId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 18 }}
      className="space-y-3"
    >
      <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-mono block">
        Walkthrough Video
      </span>

      <div className="relative rounded-xl overflow-hidden border border-border/50 bg-black/5 group aspect-video">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-sky-800/10 cursor-pointer group"
            aria-label="Play walkthrough video"
          >
            {/* YouTube thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            {/* Play button */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1" />
            </div>
            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 text-center z-10">
              <p className="text-xs text-white/80 font-mono">
                Architectural Walkthrough &middot; ~2 min
              </p>
            </div>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`}
            title="Architectural Walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Project Image Gallery (in detail view) ─── */
function ProjectImageGallery({
  images,
  categoryId
}: {
  images: string[];
  categoryId: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const resolvedImages = images.map((filename) => imgUrl(categoryId, filename));

  const onPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? resolvedImages.length - 1 : prev - 1));
  }, [resolvedImages.length]);

  const onNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === resolvedImages.length - 1 ? 0 : prev + 1));
  }, [resolvedImages.length]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Image strip carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 18 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-mono">
            Project Gallery
          </span>
          <button
            onClick={() => { setLightboxOpen(true); setCurrentIndex(0); }}
            className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary bg-background/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 px-2.5 py-1 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <Expand className="w-3 h-3" />
            <span>View All</span>
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {resolvedImages.map((src, idx) => (
            <motion.button
              key={idx}
              onClick={() => { setLightboxOpen(true); setCurrentIndex(idx); }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="snap-start shrink-0 w-40 sm:w-56 md:w-64 aspect-[4/3] rounded-xl overflow-hidden border border-border/40 bg-muted/30 relative group cursor-pointer"
            >
              <img
                src={src}
                alt={`Project view ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 text-foreground text-[10px] font-mono px-2.5 py-1 rounded-full">
                  View {idx + 1}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={resolvedImages}
            currentIndex={currentIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={onPrev}
            onNext={onNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Data ─── */

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  projects: Project[];
}

const CATEGORIES: Category[] = [
  {
    id: "residential",
    title: "Residential",
    icon: <Home className="w-6 h-6" />,
    description: "Custom homes and residences blending vernacular Nepalese warmth with modern spatial planning and universal accessibility.",
    gradient: "from-amber-600/20 to-orange-600/10",
    projects: [
      {
        id: "res-01",
        title: "Gaushala Box Design Architecture",
        location: "Kathmandu, Nepal",
        year: "2025",
        description: "A modular box-design residence featuring contemporary architectural forms with traditional Nepalese spatial sensibilities. The design integrates open courtyards, green rooftop spaces, and responsive facade treatment that negotiates privacy with natural ventilation.",
        details: [
          "5 distinct spatial volumes",
          "Green roof with greenhouse top",
          "Courtyard-centric layout",
          "Passive solar orientation",
          "Terracotta + concrete material palette"
        ],
        gradient: "from-amber-900/30 to-orange-800/20",
        images: [
          "gaushala-1.jpeg",
          "gaushala-2.jpeg",
          "gaushala-3.jpeg"
        ],
        categoryId: "residential",
      },
      {
        id: "res-02",
        title: "Rabibhawan Residence",
        location: "Rabibhawan, Lalitpur",
        year: "2024",
        description: "A thoughtfully planned multi-unit residence in Rabibhawan featuring five distinct living spaces arranged across multiple levels. Each unit benefits from careful cross-ventilation, abundant natural light, and private outdoor connections.",
        details: [
          "5 residential units",
          "Multi-level configuration",
          "Cross-ventilated layouts",
          "Private terrace per unit",
          "Universal access corridors"
        ],
        gradient: "from-amber-800/25 to-yellow-700/15",
        images: [
          "rabibhawanresidential1.jpeg",
          "rabibhawanresidential2.jpeg",
          "rabibhawanresidential3.jpeg",
          "rabibhawanresidential4.jpeg",
          "rabibhawanresidential5.jpeg"
        ],
        categoryId: "residential"
      },
      {
        id: "res-03",
        title: "Goldhunga Triangle Residence",
        location: "Nepal",
        year: "2025",
        description: "A distinctive triangular-plan residence at Goldhunga featuring bold geometric forms and panoramic views. The design leverages its unique site geometry to create dramatic interior volumes, with expansive glazing framing the surrounding landscape and a material palette that balances raw concrete with warm timber accents.",
        details: [
          "Triangular-plan site geometry",
          "Expansive glazing with landscape views",
          "Raw concrete + warm timber palette",
          "Dramatic interior volumes",
          "Contextual hillside response"
        ],
        gradient: "from-amber-900/30 to-yellow-800/20",
        images: [
          "goldhunga-1.png",
          "goldhunga-4.png",
          "goldhunga-5.png",
          "goldhunga-6.png",
          "goldhunga-8.png",
          "goldhunga-9.png",
          "goldhunga-10.png",
          "goldhunga-11.png",
          "goldhunga-d.png",
          "goldhunga-dd.png",
          "goldhunga-ddd.png",
          "goldhunga-og.png",
          "goldhunga-og1.png"
        ],
        categoryId: "residential"
      },
      {
        id: "res-04",
        title: "Ramesh Dangol Residence",
        location: "Nepal",
        year: "2025",
        description: "A considered residential design for Ramesh Dangol featuring a refined composition of forms and volumes. The design works with its site contours to create layered living spaces, with careful attention to indoor-outdoor connectivity, natural ventilation, and a restrained material expression rooted in Nepalese architectural traditions.",
        details: [
          "Site-responsive layered volumes",
          "Indoor-outdoor connectivity",
          "Natural cross-ventilation",
          "Restrained material expression",
          "Contemporary Nepalese detailing"
        ],
        gradient: "from-amber-800/25 to-orange-700/15",
        images: [
          "ramesh-dangol-a.jpg",
          "ramesh-dangol-aa.jpg",
          "ramesh-dangol-b.jpg",
          "ramesh-dangol-bb.jpg",
          "ramesh-dangol-bw.jpg",
          "ramesh-dangol-c.jpg",
          "ramesh-dangol-cc.jpg",
          "ramesh-dangol-d.jpg",
          "ramesh-dangol-dd.jpg"
        ],
        categoryId: "residential"
      }
    ]
  },
  {
    id: "commercial",
    title: "Commercial & Hospitality",
    icon: <Building2 className="w-6 h-6" />,
    description: "Retail, hospitality, and mixed-use spaces designed for functionality, brand identity, and seamless user experience in the Nepalese context.",
    gradient: "from-blue-600/20 to-indigo-600/10",
    projects: [
      {
        id: "com-01",
        title: "Portable Units for Resort",
        location: "Nepal",
        year: "2025",
        description: "Prefabricated portable resort units designed for quick deployment in scenic natural locations. Each unit balances lightweight construction with premium finishes, offering guests a comfortable retreat that minimizes site disturbance.",
        details: [
          "Modular prefabricated system",
          "Quick on-site assembly",
          "Integrated bathroom module",
          "Large glazed openings",
          "Minimal foundation footprint"
        ],
        gradient: "from-blue-800/25 to-sky-700/15",
        images: [
          "portable units for Resort1.jpeg",
          "portable units for Resort2.jpeg",
          "portable units for Resort3.jpeg",
          "portable units for Resort4.jpeg"
        ],
        categoryId: "commercial"
      },
      {
        id: "com-02",
        title: "Villa Design at Chitwan",
        location: "Chitwan, Nepal",
        year: "2024",
        description: "A luxurious villa design in Chitwan that harmonizes modern amenities with the natural landscape. Expansive glass facades dissolve indoor-outdoor boundaries, while local stone and timber anchor the design to its site.",
        details: [
          "Panoramic landscape views",
          "Indoor-outdoor living concept",
          "Local stone + timber finishes",
          "Infinity pool integration",
          "Rainwater harvesting system"
        ],
        gradient: "from-indigo-800/25 to-sky-700/15",
        images: [
          "villa design at chitwan1.jpeg",
          "villa design at chitwan2.jpeg",
          "villa design at chitwan3.jpeg",
          "villa design at chitwan4.jpeg",
          "villa design at chitwan5.jpeg",
          "villa design at chitwan6.jpeg"
        ],
        categoryId: "commercial",
        embedUrl: "dteAxMTUInI"
      }
    ]
  },
  {
    id: "institutional",
    title: "Institutional",
    icon: <Landmark className="w-6 h-6" />,
    description: "Educational and public-interest buildings designed for community impact, universal accessibility, and long-term resilience in Nepal.",
    gradient: "from-cyan-600/20 to-sky-600/10",
    projects: [
      {
        id: "inst-01",
        title: "School for Visually Impaired",
        location: "Nepal",
        year: "2025",
        description: "A thesis-designed specialized educational facility where architecture itself becomes the assistive technology. The design replaces vision-dependent wayfinding with a tri-sensory spatial framework: tactile Braille paths and textured ground surfaces for touch, echolocation-reflective soffits and acoustic zoning for hearing, and aromatic planting corridors with HVAC scent-diffusion for olfactory orientation. Every corridor, courtyard, and classroom is designed to be intuitively navigable without sight.",
        details: [
          "Tri-sensory wayfinding: touch + sound + smell",
          "Braille tactile paths & textured ground indicators",
          "Acoustic echolocation soffits & Lokta paper baffles",
          "Olfactory scent-zoning with aromatic gardens",
          "Sensory garden with therapeutic horticulture",
          "Zero-threshold universal access throughout"
        ],
        gradient: "from-cyan-900/30 to-sky-800/20",
        images: [
          "school for visually impaired1.jpeg",
          "school for visually impaired3.jpeg",
          "school for visually impaired4.jpeg",
          "school for visually impaired5.jpeg",
          "school for visually impaired6.jpeg",
          "school for visually impaired7.jpeg",
          "school for visually impaired.jpeg",
          "vis1.jpeg"
        ],
        categoryId: "institutional",
        embedUrl: "YPEmVOK_m28"
      }
    ]
  },
  {
    id: "interior",
    title: "Interior",
    icon: <Armchair className="w-6 h-6" />,
    description: "Experiential interiors that balance tactile warmth, sensory depth, and functional elegance across residential and commercial typologies.",
    gradient: "from-emerald-600/20 to-teal-600/10",
    projects: [
      {
        id: "int-01",
        title: "Foreign Quarters Interior",
        location: "Nepal",
        year: "2025",
        description: "Complete interior design of foreign quarters featuring a coherent spatial language across living, kitchen, study, bedroom, and corridor spaces. The design includes a fully documented floor plan (ACD), demonstrating systematic space planning and material coordination throughout the quarters.",
        details: [
          "Complete ACD with full floor plan",
          "Living, kitchen, study, and bedroom zones",
          "Coherent material palette throughout",
          "Laundry and corridor integration",
          "Space-efficient layout planning"
        ],
        gradient: "from-emerald-900/30 to-teal-800/20",
        images: [
          "foreign-quarters-0--full-plan-jpg.jpg",
          "foreign-quarters-1--living-room-jpg.jpg",
          "foreign-quarters-2--living-room-jpg.jpg",
          "foreign-quarters-3--living-room-jpg.jpg",
          "foreign-quarters-4--kitchen-jpg.jpg",
          "foreign-quarters-5--kitchen-jpg.jpg",
          "foreign-quarters-6--kitchen-jpg.jpg",
          "foreign-quarters-7--laundary-room-jpg.jpg",
          "foreign-quarters-8--study-room-jpg.jpg",
          "foreign-quarters-9--study-room-jpg.jpg",
          "foreign-quarters-10--study-room-jpg.jpg",
          "foreign-quarters-11--study-room-jpg.jpg",
          "foreign-quarters-12--bedroom-jpg.jpg",
          "foreign-quarters-13--bedroom-jpg.jpg",
          "foreign-quarters-14--master-bedroom-jpg.jpg",
          "foreign-quarters-15--master-bedroom-jpg.jpg",
          "foreign-quarters-16--master-bedroom-jpg.jpg",
          "foreign-quarters-16-1--master-bedroom-jpg.jpg",
          "foreign-quarters-17--corridor-jpg.jpg",
          "foreign-quarters-18--corridor-jpg.jpg"
        ],
        categoryId: "interior"
      },
      {
        id: "int-02",
        title: "Interior at Dhungedhara",
        location: "Dhungedhara, Nepal",
        year: "2025",
        description: "A refined residential interior project in Dhungedhara featuring carefully composed living, lounge, and spatial volumes with a restrained material palette. The design prioritises natural light, spatial flow, and a calm, lived-in atmosphere rooted in contemporary Nepalese sensibilities.",
        details: [
          "Multiple lounge and living configurations",
          "Natural light optimisation",
          "Restrained material palette",
          "Seamless spatial flow",
          "Contemporary Nepalese aesthetic"
        ],
        gradient: "from-emerald-800/25 to-teal-700/15",
        images: [
          "dhungedhara-1.png",
          "dhungedhara-2.png",
          "dhungedhara-3.png",
          "dhungedhara-4.png",
          "dhungedhara-11.png",
          "dhungedhara-22.png",
          "dhungedhara-33.png",
          "dhungedhara-44.png",
          "dhungedhara-april-30.png",
          "dhungedhara-LR1.png",
          "dhungedhara-LR2.png",
          "dhungedhara-LR3.png",
          "dhungedhara-LR4.png"
        ],
        categoryId: "interior"
      },
      {
        id: "int-03",
        title: "Rudra Kitchen Interior",
        location: "Nepal",
        year: "2025",
        description: "A focused kitchen interior design featuring a functional yet warm culinary space. The layout integrates efficient storage, ergonomic work zones, and a seamless dining connection, combining practicality with refined detailing.",
        details: [
          "Custom cabinetry and storage",
          "Ergonomic kitchen work triangle",
          "Integrated dining space",
          "Warm material finishes",
          "Efficient space utilisation"
        ],
        gradient: "from-emerald-800/25 to-green-700/15",
        images: [
          "rudra-kitchen-cupboard-view-2.png",
          "rudra-kitchen-dining-view.png",
          "rudra-kitchen-stove-counter-view-1.png"
        ],
        categoryId: "interior"
      },
      {
        id: "int-04",
        title: "Sabitri Pandey Residence Interior",
        location: "Nepal",
        year: "2025",
        description: "A comprehensive ground-floor residence interior comprising living, kitchen, bedroom, and bathroom spaces. The design establishes a cohesive interior language across all rooms, balancing comfort with clean architectural lines.",
        details: [
          "Ground-floor living and kitchen",
          "Master bedroom and additional bedrooms",
          "Bathroom design",
          "Cohesive interior language",
          "Comfort-driven spatial planning"
        ],
        gradient: "from-emerald-800/25 to-teal-700/15",
        images: [
          "sabitri-gf-b1.png",
          "sabitri-gf-b2.png",
          "sabitri-gf-b3.png",
          "sabitri-gf-k1.png",
          "sabitri-gf-k2.png",
          "sabitri-gf-k3.png",
          "sabitri-gf-lr-1.png",
          "sabitri-gf-lr-2.png",
          "sabitri-gf-lr-3.png",
          "sabitri-gf-lr-4.png",
          "sabitri-gf-mb1.png",
          "sabitri-gf-mb2.png"
        ],
        categoryId: "interior"
      }
    ]
  },
  {
    id: "prefab-steel",
    title: "Prefab Panel & Steel Structure",
    icon: (
      <span className="flex items-center gap-0.5 -ml-0.5">
        <LayoutPanelTop className="w-5 h-5" />
        <Construction className="w-5 h-5" />
      </span>
    ),
    description: "Panelized rapid-assembly construction and structural steel solutions for long-span, fast-track, and high-seismic-resistance projects across Nepal.",
    gradient: "from-violet-600/20 to-rose-600/10",
    projects: [
      {
        id: "ps-01",
        title: "Affordable Housing — Dhanusha 3BHK Unit",
        location: "Dhanusha, Nepal",
        year: "2025",
        description: "An affordable housing prototype in Dhanusha demonstrating how prefabricated panel systems can deliver high-quality, seismically resilient 3-bedroom homes at a fraction of traditional construction time and cost.",
        details: [
          "3-bedroom layout (1,200 sq.ft.)",
          "Prefab panel construction",
          "Assembly in under 3 weeks",
          "Integrated insulation (R-18)",
          "40% cost saving vs. brick masonry"
        ],
        gradient: "from-violet-900/30 to-purple-800/20",
        images: [
          "affordable housing design at Dhanusha 3Bhk unit1.jpeg",
          "affordable housing design at Dhanusha 3Bhk unit2.jpeg",
          "affordable housing design at Dhanusha 3Bhk unit3.jpeg"
        ],
        categoryId: "prefab-steel",
        embedUrl: "FJSrLmjnHC8"
      },
      {
        id: "ps-02",
        title: "Residence at Dhulikhel",
        location: "Dhulikhel, Nepal",
        year: "2024",
        description: "A hillside residence in Dhulikhel designed with a hybrid steel-and-prefab-panel structural system, maximizing panoramic Himalayan views while achieving rapid construction timelines and minimal site disruption.",
        details: [
          "Steel frame + prefab panel infill",
          "Panoramic Himalayan views",
          "Cantilevered deck terraces",
          "Rainwater + solar integration",
          "Seismic-rated connections"
        ],
        gradient: "from-purple-800/25 to-rose-700/15",
        images: [
          "residence at Dhulikhel1.jpeg",
          "residence at Dhulikhel2.jpeg",
          "residence at Dhulikhel3.jpeg",
          "residence at Dhulikhel4.jpeg"
        ],
        categoryId: "prefab-steel",
        embedUrl: "_Sxpne-WsJU"
      }
    ]
  }
];

/* ─── Architectural Line Art Backgrounds ─── */
function CategoryArt({ categoryId }: { categoryId: string }) {
  const cn = "absolute inset-0 w-full h-full text-muted-foreground/35 dark:text-muted-foreground/45 pointer-events-none";
  switch (categoryId) {
    case "residential":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <polygon points="70,190 250,40 430,190" strokeWidth="1.5" />
          <rect x="70" y="190" width="360" height="180" strokeWidth="1.5" />
          <rect x="215" y="260" width="70" height="110" strokeWidth="0.8" rx="2" />
          <rect x="100" y="215" width="55" height="55" strokeWidth="0.8" rx="1" />
          <rect x="345" y="215" width="55" height="55" strokeWidth="0.8" rx="1" />
          <rect x="345" y="105" width="55" height="55" strokeWidth="0.8" rx="1" />
          <rect x="370" y="55" width="30" height="50" strokeWidth="0.8" />
          <line x1="30" y1="370" x2="470" y2="370" strokeWidth="0.5" strokeDasharray="6 4" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <rect x="80" y="30" width="340" height="330" strokeWidth="1.5" />
          <line x1="80" y1="130" x2="420" y2="130" strokeWidth="0.6" />
          <line x1="80" y1="230" x2="420" y2="230" strokeWidth="0.6" />
          <rect x="110" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="195" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="280" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="365" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="220" y="270" width="60" height="90" strokeWidth="0.8" rx="2" />
          <polygon points="200,260 300,260 310,270 190,270" strokeWidth="0.5" opacity="0.5" />
        </svg>
      );
    case "interior":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <polygon points="40,370 460,370 410,80 90,80" strokeWidth="1.2" />
          <rect x="80" y="280" width="130" height="60" rx="6" strokeWidth="0.8" />
          <rect x="60" y="250" width="170" height="30" rx="4" strokeWidth="0.5" />
          <rect x="210" y="290" width="80" height="30" rx="2" strokeWidth="0.6" />
          <rect x="320" y="270" width="110" height="70" rx="3" strokeWidth="0.8" />
          <rect x="80" y="100" width="60" height="150" strokeWidth="0.8" />
          <rect x="340" y="100" width="50" height="80" strokeWidth="0.6" rx="1" />
        </svg>
      );
    case "institutional":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <polygon points="60,110 250,30 440,110" strokeWidth="1.2" />
          <rect x="60" y="110" width="380" height="240" strokeWidth="1.2" />
          <line x1="100" y1="110" x2="100" y2="330" strokeWidth="0.8" />
          <line x1="210" y1="110" x2="210" y2="330" strokeWidth="0.8" />
          <line x1="290" y1="110" x2="290" y2="330" strokeWidth="0.8" />
          <line x1="400" y1="110" x2="400" y2="330" strokeWidth="0.8" />
          <rect x="225" y="180" width="50" height="100" strokeWidth="0.8" rx="2" />
        </svg>
      );
    case "prefab-steel":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          <rect x="20" y="40" width="210" height="150" strokeWidth="1" rx="2" />
          <rect x="20" y="210" width="210" height="150" strokeWidth="1" rx="2" />
          <polyline points="270,80 320,110 370,80 420,110 470,80" strokeWidth="1.2" />
          <line x1="270" y1="80" x2="270" y2="160" strokeWidth="0.6" />
          <line x1="270" y1="160" x2="470" y2="160" strokeWidth="1.2" />
          <rect x="262" y="160" width="12" height="150" strokeWidth="0.6" rx="1" />
          <rect x="462" y="160" width="12" height="150" strokeWidth="0.6" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Category accent colors ─── */
const CATEGORY_COLORS: Record<string, string> = {
  residential: "#d97706",
  commercial:  "#2563eb",
  institutional: "#0891b2",
  interior:     "#059669",
  "prefab-steel": "#7c3aed"
};

/* ─── Orbital drift keyframes ─── */
const orbitalPaths = [
  { x: [0, 10, 0, -10, 0], y: [10, 0, -10, 0, 10] },
  { x: [0, -8, 0, 8, 0], y: [12, 0, -12, 0, 12] },
  { x: [0, 12, 0, -12, 0], y: [8, 0, -8, 0, 8] },
  { x: [0, 14, 0, -14, 0], y: [6, 0, -6, 0, 6] },
  { x: [0, 6, 0, -6, 0], y: [14, 0, -14, 0, 14] },
];

/* ─── Category Card ─── */
function CategoryCard({ category, index, onHover }: { category: Category; index: number; onHover: () => void }) {
  const accent = CATEGORY_COLORS[category.id] || CATEGORY_COLORS.residential;
  const isMain = index === 0;
  const orbit = orbitalPaths[index % orbitalPaths.length];

  return (
    <motion.div
      variants={fadeInUp}
      className="inline-flex flex-col items-center"
      animate={{ x: orbit.x, y: orbit.y }}
      transition={{
        repeat: Infinity,
        duration: 10 + index * 1.5,
        ease: "easeInOut",
        delay: index * 1.2,
      }}
      onMouseEnter={onHover}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        className={`group relative rounded-full cursor-pointer ${
          isMain ? "w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60" : "w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52"
        }`}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px solid ${accent}25`,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            border: `1.5px solid ${accent}60`,
            boxShadow: `0 0 24px -4px ${accent}20, inset 0 0 24px -8px ${accent}10`,
          }}
        />
        <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.5]">
            <CategoryArt categoryId={category.id} />
          </div>
          <div className="absolute inset-3 rounded-full border border-foreground/[0.12]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-foreground/[0.07]" />
          <div
            className={`relative z-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-400 ${
              isMain ? "scale-125" : "scale-110"
            }`}
            style={{ color: accent }}
          >
            {category.icon}
          </div>
          <h3 className={`relative z-10 font-heading font-semibold text-foreground/80 group-hover:text-foreground text-center leading-tight transition-colors duration-400 ${
            isMain ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
          }`}>
            {category.title}
          </h3>
          <span className="relative z-10 text-[8px] font-mono text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors duration-400">
            {category.projects.length} {category.projects.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card (preview thumbnails) ─── */
function ProjectCard({
  project,
  onSelect,
  isSelected
}: {
  project: Project;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const hasImages = project.images.length > 0;
  const previewSrc = hasImages ? imgUrl(project.categoryId, project.images[0]) : null;

  return (
    <motion.button
      variants={fadeInScale}
      onClick={onSelect}
      whileHover={{ y: -5, scale: 1.015, transition: { type: "spring", stiffness: 250, damping: 15 } }}
      whileTap={{ scale: 0.97 }}
      className={`group relative w-full text-left rounded-xl border overflow-hidden cursor-pointer ${
        isSelected
          ? "border-primary shadow-md bg-card/80"
          : "border-border/60 bg-card/30 hover:border-border/80"
      }`}
    >
      {/* Project image or gradient fallback */}
      <motion.div
        className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        {previewSrc ? (
          <>
            <img
              src={previewSrc}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {project.images.length > 1 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute bottom-2 right-2 z-10 text-[9px] uppercase tracking-widest bg-background/80 text-foreground font-bold px-2 py-0.5 rounded-full font-mono flex items-center gap-1"
              >
                <Layers className="w-2.5 h-2.5" />
                {project.images.length}
              </motion.span>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-foreground/10" />
          </div>
        )}
        {project.showSlider && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-2 right-2 z-10 text-[9px] uppercase tracking-widest bg-background/80 text-primary font-bold px-3 py-1 rounded-full font-mono flex items-center gap-1"
          >
            <MoveHorizontal className="w-2.5 h-2.5" />
            Interactive
          </motion.span>
        )}
      </motion.div>

      <div className="p-4">
        <h4 className="text-sm font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
          {project.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1.5 font-sans line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ─── Project Detail Panel ─── */
function ProjectDetail({ project }: {
  project: Project;
}) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="rounded-2xl overflow-hidden border border-border/60 bg-card/40"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 70, damping: 20, mass: 0.9 }}
      >
        {/* Header banner with first image as hero */}
        <motion.div
          className={`h-32 sm:h-48 bg-gradient-to-br ${project.gradient} flex items-end p-3 sm:p-6 relative overflow-hidden`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.images.length > 0 && (
            <img
              src={imgUrl(project.categoryId, project.images[0])}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              loading="lazy"
            />
          )}
          {/* Subtle shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 3 }}
          />
          <div className="relative z-10">
            <motion.h3
              className="text-lg sm:text-2xl font-heading font-bold text-foreground drop-shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="flex items-center gap-4 mt-2 text-xs font-mono text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-4 sm:p-6 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <p className="text-sm text-foreground/90 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Detail specs */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-mono block mb-3">
              Project Specifications
            </span>
            <ul className="space-y-2">
              {project.details.map((detail, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-xs text-muted-foreground font-sans"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06, type: "spring", stiffness: 120, damping: 18 }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.45 + i * 0.06, type: "spring", stiffness: 300 }}
                  />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Video walkthrough */}
          {project.embedUrl && (
            <ProjectYouTubeEmbed
              embedId={project.embedUrl}
            />
          )}
          {project.videoUrl && !project.embedUrl && (
            <ProjectVideo
              videoUrl={project.videoUrl}
              categoryId={project.categoryId}
            />
          )}

          {/* Interactive image gallery */}
          <ProjectImageGallery
            images={project.images}
            categoryId={project.categoryId}
          />
        </motion.div>
      </motion.div>

      {/* If this project features the interactive slider */}
      {project.showSlider && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 60, damping: 20 }}
        >
          <BeforeAfterSlider />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─── */
export function ProjectGallery() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const hoveredCat = CATEGORIES.find((c) => c.id === hoveredCategory);
  const project = CATEGORIES.flatMap(c => c.projects).find((p) => p.id === selectedProject);
  const projectCategory = CATEGORIES.find(c => c.projects.some(p => p.id === selectedProject));

  const handleBackToCategories = () => {
    setHoveredCategory(null);
    setSelectedProject(null);
  };

  // Project detail view
  if (project && selectedProject) {
    return (
      <>
        {/* Back button — outside AnimatePresence so fixed positioning isn't broken by CSS transforms */}            <motion.button
          onClick={handleBackToCategories}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[70] w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 16 }}
          aria-label="Back to all categories"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key="project-detail"
            className="w-full max-w-4xl mx-auto"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ProjectDetail
              project={project}
            />
          </motion.div>
        </AnimatePresence>
      </>
    );
  }

  // Category grid + hover panel
  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          className="text-xs uppercase tracking-widest text-primary font-semibold font-sans inline-block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
        >
          Portfolio Archive
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-1">
          Explore by Category
        </h2>
        <motion.p
          className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto font-sans leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Hover a discipline to preview projects, then click any project to explore its full details and gallery.
        </motion.p>
      </motion.div>

      {/* Orbital gallery */}
      <div className="relative">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none text-foreground"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse cx="500" cy="250" rx="400" ry="180" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.6" strokeDasharray="8 10" />
          <ellipse cx="500" cy="250" rx="300" ry="140" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" strokeDasharray="5 12" />
          <ellipse cx="500" cy="250" rx="200" ry="90" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.4" strokeDasharray="4 14" />
          <circle cx="500" cy="250" r="3" fill="currentColor" fillOpacity="0.25" />
          <circle cx="500" cy="250" r="14" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="0.5" />
          <line x1="500" y1="250" x2="500" y2="70" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="3 8" />
          <line x1="500" y1="250" x2="500" y2="430" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="3 8" />
          <line x1="100" y1="250" x2="900" y2="250" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="3 8" />
        </svg>

        <div
          onMouseLeave={() => setHoveredCategory(null)}
          className="relative min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            {hoveredCategory && hoveredCat ? (
              <motion.div
                key="hover-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex flex-col items-center gap-4 sm:gap-8 lg:flex-row lg:items-start lg:gap-12 py-4"
              >
                {/* Expanded circle */}
                <div
                  onMouseEnter={() => setHoveredCategory(hoveredCat.id)}
                  className="shrink-0"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.15, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full relative flex items-center justify-center"
                style={{
                  border: `1.5px solid ${CATEGORY_COLORS[hoveredCat.id] || CATEGORY_COLORS.residential}35`,
                  boxShadow: `0 0 40px -8px ${CATEGORY_COLORS[hoveredCat.id] || CATEGORY_COLORS.residential}25`,
                }}
                  >
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.5]">
                        <CategoryArt categoryId={hoveredCat.id} />
                      </div>
                      <div className="absolute inset-3 rounded-full border border-foreground/[0.12]" />
                      <div className="absolute inset-6 rounded-full border border-dashed border-foreground/[0.07]" />
                      <div
                        className="relative z-10 flex items-center justify-center scale-125"
                        style={{ color: CATEGORY_COLORS[hoveredCat.id] || CATEGORY_COLORS.residential }}
                      >
                        {hoveredCat.icon}
                      </div>
                      <h3 className="relative z-10 font-heading font-semibold text-foreground text-center text-[10px] sm:text-sm md:text-base leading-tight max-w-[80px] sm:max-w-[120px]">
                        {hoveredCat.title}
                      </h3>
                      <span className="relative z-10 text-[7px] sm:text-[9px] font-mono text-muted-foreground/60">
                        {hoveredCat.projects.length} {hoveredCat.projects.length === 1 ? "project" : "projects"}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Project preview panel */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.08 }}
                  className="flex-1 w-full"
                  onMouseEnter={() => setHoveredCategory(hoveredCat.id)}
                >
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {hoveredCat.projects.map((proj) => (
                      <ProjectCard
                        key={proj.id}
                        project={proj}
                        isSelected={false}
                        onSelect={() => setSelectedProject(proj.id)}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="grid-layout"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="relative flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-14 py-4"
              >
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    index={i}
                    onHover={() => setHoveredCategory(cat.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
