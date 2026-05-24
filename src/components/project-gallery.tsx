"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { BeforeAfterSlider } from "./before-after-slider";
import {
  Home,
  Building2,
  ArmchairIcon,
  Landmark,
  LayoutPanelTop,
  Construction,
  ArrowLeft,
  MapPin,
  Calendar,
  Image
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

/* ─── Types ─── */
interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  description: string;
  details: string[];
  gradient: string;
  image?: string;
  showSlider?: boolean;
}

/* ─── Placeholder image generator ─── */
function projectPlaceholder(title: string, gradient: string): string {
  const colors = gradient.split(" ");
  const fromColor = colors[0]?.replace("from-", "") || "#c85a32";
  const toColor = colors[1]?.replace("to-", "") || "#8a3a1f";
  // Map Tailwind color names to hex values for the SVG
  const colorMap: Record<string, string> = {
    "amber-900": "#78350f", "orange-800": "#9a3412",
    "amber-800": "#92400e", "yellow-700": "#a16207",
    "stone-700": "#44403c",
    "blue-900": "#1e3a5f", "indigo-800": "#3730a3",
    "blue-800": "#1e40af", "sky-700": "#0369a1",
    "emerald-900": "#064e3b", "teal-800": "#115e59",
    "emerald-800": "#065f46", "green-700": "#15803d",
    "violet-900": "#4c1d95", "purple-800": "#6b21a8",
    "violet-800": "#5b21b6", "indigo-700": "#4338ca",
    "rose-900": "#881337", "red-800": "#991b1b",
    "rose-800": "#9f1239", "rose-700": "#be123c",
    "orange-700": "#c2410c",
    "cyan-900": "#164e63", "cyan-800": "#155e75",
    "sky-800": "#075985"
  };
  const hexFrom = colorMap[fromColor] || "#c85a32";
  const hexTo = colorMap[toColor] || "#78350f";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${hexFrom};stop-opacity:0.3" /><stop offset="100%" style="stop-color:${hexTo};stop-opacity:0.15" /></linearGradient></defs>
    <rect width="800" height="500" fill="url(#g)" />
    <rect x="0" y="0" width="800" height="500" fill="none" stroke="currentColor" stroke-opacity="0.06" stroke-width="1" />
    <line x1="40" y1="0" x2="40" y2="500" stroke="currentColor" stroke-opacity="0.04" stroke-width="1" />
    <line x1="0" y1="40" x2="800" y2="40" stroke="currentColor" stroke-opacity="0.04" stroke-width="1" />
    <g transform="translate(400,250)" text-anchor="middle" fill="currentColor" opacity="0.15">
      <rect x="-120" y="-60" width="240" height="120" rx="8" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3" />
      <line x1="-80" y1="-20" x2="80" y2="-20" stroke="currentColor" stroke-width="1" opacity="0.3" />
      <line x1="-100" y1="10" x2="100" y2="10" stroke="currentColor" stroke-width="1" opacity="0.3" />
      <line x1="-60" y1="40" x2="60" y2="40" stroke="currentColor" stroke-width="1" opacity="0.3" />
    </g>
    <text x="400" y="420" text-anchor="middle" fill="currentColor" font-size="12" font-family="monospace" opacity="0.2">${title.replace(/[&<>]/g,'')}</text>
  </svg>`;
  const bytes = new TextEncoder().encode(svg);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/svg+xml;base64,${btoa(binary)}`;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  projects: Project[];
}

/* ─── Data ─── */
const CATEGORIES: Category[] = [
  {
    id: "residential",
    title: "Residential",
    icon: <Home className="w-6 h-6" />,
    description: "Custom homes, villas, and multi-family dwellings blending vernacular warmth with modern spatial planning.",
    gradient: "from-amber-600/20 to-orange-600/10",
    projects: [
      {
        id: "res-01",
        title: "Courtyard Villa — Budhanilkantha",
        location: "Budhanilkantha, Kathmandu",
        year: "2025",
        description: "A 3-storey residence organized around a central Nepalese chowk, integrating passive solar strategies with locally sourced brick and timber finishes.",
        details: [
          "Plot Area: 6.5 Ropani",
          "Built-up: 4,200 sq.ft.",
          "3 bedrooms + study + rooftop garden",
          "Inclusive ramp access at entry",
          "Double-height living space with Lokta paper light diffusers"
        ],
        gradient: "from-amber-900/30 to-orange-800/20",
        image: projectPlaceholder("Courtyard Villa — Budhanilkantha", "from-amber-900 to-orange-800"),
        showSlider: true
      },
      {
        id: "res-02",
        title: "Townhouse Cluster — Bhaktapur",
        location: "Bhaktapur, Nepal",
        year: "2024",
        description: "Four attached townhouses with private courtyards, designed for extended families with shared community spaces and universal accessibility.",
        details: [
          "4 units × 1,800 sq.ft. each",
          "Shared central courtyard + playground",
          "Zero-threshold entries throughout",
          "Rainwater harvesting integrated",
          "Prefab panel partition walls"
        ],
        gradient: "from-amber-800/25 to-yellow-700/15",
        image: projectPlaceholder("Townhouse Cluster — Bhaktapur", "from-amber-800 to-yellow-700")
      }
    ]
  },
  {
    id: "commercial",
    title: "Commercial",
    icon: <Building2 className="w-6 h-6" />,
    description: "Retail, office, and mixed-use spaces designed for functionality, brand identity, and seamless user experience.",
    gradient: "from-blue-600/20 to-indigo-600/10",
    projects: [
      {
        id: "com-01",
        title: "Retail Arcade — Thamel",
        location: "Thamel, Kathmandu",
        year: "2023",
        description: "A contemporary retail arcade with adaptable storefront modules, designed to accommodate shifting tenant needs in Kathmandu's tourist district.",
        details: [
          "5 retail units + 1 café",
          "Modular facade system",
          "Covered arcade walkway",
          "Tactile paving throughout",
          "Evening illumination design"
        ],
        gradient: "from-blue-800/25 to-sky-700/15",
        image: projectPlaceholder("Retail Arcade — Thamel", "from-blue-800 to-sky-700")
      }
    ]
  },
  {
    id: "institutional",
    title: "Institutional",
    icon: <Landmark className="w-6 h-6" />,
    description: "Educational, healthcare, and public buildings designed for community impact, accessibility, and long-term resilience.",
    gradient: "from-cyan-600/20 to-sky-600/10",
    projects: [
      {
        id: "inst-01",
        title: "School Building — Kavre",
        location: "Kavre, Nepal",
        year: "2025",
        description: "A 4-classroom school built using prefab lightweight panel systems, demonstrating speed of assembly and seismic resilience in a post-earthquake context.",
        details: [
          "4 classrooms + library + office",
          "Assembled in 21 days",
          "Integrated insulation (R-18)",
          "Seismic-rated connections",
          "42% cost saving vs. brick masonry"
        ],
        gradient: "from-cyan-900/30 to-sky-800/20",
        image: projectPlaceholder("School Building — Kavre", "from-cyan-900 to-sky-800")
      },
      {
        id: "inst-02",
        title: "Health Post — Sindhupalchok",
        location: "Sindhupalchok, Nepal",
        year: "2024",
        description: "A prefabricated rural health post designed for rapid deployment in remote areas, with self-contained water and solar power systems.",
        details: [
          "600 sq.ft. clinic",
          "Off-grid solar + rainwater",
          "Modular expandable design",
          "Ventilated passive cooling",
          "Accessible ramp + wide corridors"
        ],
        gradient: "from-cyan-800/25 to-sky-700/15",
        image: projectPlaceholder("Health Post — Sindhupalchok", "from-cyan-800 to-sky-700")
      },
      {
        id: "inst-03",
        title: "Community Hall — Lalitpur",
        location: "Lalitpur, Nepal",
        year: "2025",
        description: "A 200-seat steel-framed community hall with clear-span interior, designed for multi-purpose events and disaster shelter use.",
        details: [
          "Clear span: 18m × 24m",
          "Steel portal frame + metal roofing",
          "Demountable partition system",
          "Natural cross-ventilation",
          "Seismic base isolation"
        ],
        gradient: "from-cyan-900/30 to-teal-800/20",
        image: projectPlaceholder("Community Hall — Lalitpur", "from-cyan-900 to-teal-800")
      }
    ]
  },
  {
    id: "interior",
    title: "Interior",
    icon: <ArmchairIcon className="w-6 h-6" />,
    description: "Experiential interiors that balance tactile warmth, sensory depth, and functional elegance across residential and commercial typologies.",
    gradient: "from-emerald-600/20 to-teal-600/10",
    projects: [
      {
        id: "int-01",
        title: "Restaurant Interior — Bhojan Griha",
        location: "Durbar Square, Kathmandu",
        year: "2025",
        description: "Interior redesign of a traditional Newari restaurant, blending exposed brick, brass accents, and Lokta paper lighting for an immersive dining atmosphere.",
        details: [
          "60-cover dining + private rooms",
          "Custom brass lattice partitions",
          "Handmade paper pendant lights",
          "Acoustic ceiling baffles",
          "Universal access washroom"
        ],
        gradient: "from-emerald-900/30 to-teal-800/20",
        image: projectPlaceholder("Restaurant Interior — Bhojan Griha", "from-emerald-900 to-teal-800")
      },
      {
        id: "int-02",
        title: "Apartment Interior — Lazimpat",
        location: "Lazimpat, Kathmandu",
        year: "2024",
        description: "Full interior fit-out of a 3-BHK apartment with minimalist detailing, warm wood joinery, and smart storage solutions.",
        details: [
          "1,500 sq.ft. apartment",
          "Walnut veneer + matte lacquer finishes",
          "Built-in modular storage",
          "Integrated LED lighting design",
          "Barrier-free bathroom design"
        ],
        gradient: "from-emerald-800/25 to-green-700/15",
        image: projectPlaceholder("Apartment Interior — Lazimpat", "from-emerald-800 to-green-700")
      }
    ]
  },
  {
    id: "prefab-steel",
    title: "Prefab Panel & Steel Structure Design",
    icon: (
      <span className="flex items-center gap-0.5 -ml-0.5">
        <LayoutPanelTop className="w-5 h-5" />
        <Construction className="w-5 h-5" />
      </span>
    ),
    description: "Panelized rapid-assembly construction and structural steel solutions for long-span, fast-track, and high-seismic-resistance projects.",
    gradient: "from-violet-600/20 to-rose-600/10",
    projects: [
      {
        id: "ps-01",
        title: "Showroom & Office — Bela Panels",
        location: "Bhaktapur, Nepal",
        year: "2025",
        description: "A prefabricated panel showroom and corporate office demonstrating the versatility of rapid-assembly construction systems in a commercial context.",
        details: [
          "2-storey, 3,500 sq.ft.",
          "Full-height glazed facade",
          "Open-plan office with flex meeting rooms",
          "On-site prefab panel assembly demo area",
          "Net-zero ready with solar roof"
        ],
        gradient: "from-violet-900/30 to-purple-800/20",
        image: projectPlaceholder("Showroom & Office — Bela Panels", "from-violet-900 to-purple-800")
      },
      {
        id: "ps-02",
        title: "Hill-Edge Retreat — Nagarkot",
        location: "Nagarkot, Nepal",
        year: "2024",
        description: "A weekend home perched on a steep slope with cantilevered decks, maximizing Himalayan views while minimizing site disturbance.",
        details: [
          "Site: 45° slope, 12 Ropani",
          "Steel structural frame + stone cladding",
          "Large glazing facing north-east",
          "Rainwater + solar hot water systems",
          "Accessible pathway with 1:12 ramps"
        ],
        gradient: "from-purple-800/25 to-rose-700/15",
        image: projectPlaceholder("Hill-Edge Retreat — Nagarkot", "from-purple-800 to-rose-700")
      },
      {
        id: "ps-03",
        title: "Footbridge — Banepa",
        location: "Banepa, Nepal",
        year: "2024",
        description: "A pedestrian steel truss bridge connecting two hillside communities, replacing a dangerous seasonal river crossing.",
        details: [
          "Span: 45m",
          "Warren truss configuration",
          "Galvanized steel + timber deck",
          "Designed for 250 kg/m² live load",
          "Community-led maintenance plan"
        ],
        gradient: "from-rose-800/25 to-orange-700/15",
        image: projectPlaceholder("Footbridge — Banepa", "from-rose-800 to-orange-700")
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
          {/* House elevation */}
          <polygon points="70,190 250,40 430,190" strokeWidth="1.5" />
          <rect x="70" y="190" width="360" height="180" strokeWidth="1.5" />
          {/* Door */}
          <rect x="215" y="260" width="70" height="110" strokeWidth="0.8" rx="2" />
          <circle cx="275" cy="315" r="2.5" fill="currentColor" />
          {/* Windows */}
          <rect x="100" y="215" width="55" height="55" strokeWidth="0.8" rx="1" />
          <line x1="127.5" y1="215" x2="127.5" y2="270" strokeWidth="0.4" />
          <line x1="100" y1="242.5" x2="155" y2="242.5" strokeWidth="0.4" />
          <rect x="345" y="215" width="55" height="55" strokeWidth="0.8" rx="1" />
          <line x1="372.5" y1="215" x2="372.5" y2="270" strokeWidth="0.4" />
          <line x1="345" y1="242.5" x2="400" y2="242.5" strokeWidth="0.4" />
          {/* Second floor window */}
          <rect x="345" y="105" width="55" height="55" strokeWidth="0.8" rx="1" />
          <line x1="372.5" y1="105" x2="372.5" y2="160" strokeWidth="0.4" />
          <line x1="345" y1="132.5" x2="400" y2="132.5" strokeWidth="0.4" />
          {/* Roof chimney */}
          <rect x="370" y="55" width="30" height="50" strokeWidth="0.8" />
          {/* Ground line */}
          <line x1="30" y1="370" x2="470" y2="370" strokeWidth="0.5" strokeDasharray="6 4" />
          {/* Landscape */}
          <polyline points="50,370 70,350 90,370 110,355 130,370 150,345 170,370" strokeWidth="0.4" opacity="0.6" />
        </svg>
      );
    case "commercial":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          {/* Building mass */}
          <rect x="80" y="30" width="340" height="330" strokeWidth="1.5" />
          {/* Floor plates */}
          <line x1="80" y1="130" x2="420" y2="130" strokeWidth="0.6" />
          <line x1="80" y1="230" x2="420" y2="230" strokeWidth="0.6" />
          {/* Windows row 1 */}
          <rect x="110" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="195" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="280" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="365" y="50" width="35" height="55" strokeWidth="0.8" rx="1" />
          {/* Windows row 2 */}
          <rect x="110" y="150" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="195" y="150" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="280" y="150" width="35" height="55" strokeWidth="0.8" rx="1" />
          <rect x="365" y="150" width="35" height="55" strokeWidth="0.8" rx="1" />
          {/* Entrance */}
          <rect x="220" y="270" width="60" height="90" strokeWidth="0.8" rx="2" />
          <rect x="215" y="265" width="70" height="8" strokeWidth="0.5" rx="2" />
          {/* Awning */}
          <polygon points="200,260 300,260 310,270 190,270" strokeWidth="0.5" opacity="0.5" />
          {/* Sidewalk */}
          <line x1="50" y1="360" x2="450" y2="360" strokeWidth="0.8" />
          <line x1="70" y1="365" x2="70" y2="380" strokeWidth="0.3" />
          <line x1="140" y1="365" x2="140" y2="380" strokeWidth="0.3" />
          <line x1="210" y1="365" x2="210" y2="380" strokeWidth="0.3" />
          <line x1="280" y1="365" x2="280" y2="380" strokeWidth="0.3" />
          <line x1="350" y1="365" x2="350" y2="380" strokeWidth="0.3" />
          <line x1="420" y1="365" x2="420" y2="380" strokeWidth="0.3" />
        </svg>
      );
    case "interior":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          {/* Room perspective */}
          <polygon points="40,370 460,370 410,80 90,80" strokeWidth="1.2" />
          {/* Floor */}
          <line x1="40" y1="370" x2="460" y2="370" strokeWidth="0.8" />
          {/* Side walls */}
          <line x1="40" y1="370" x2="90" y2="80" strokeWidth="0.4" opacity="0.4" />
          <line x1="460" y1="370" x2="410" y2="80" strokeWidth="0.4" opacity="0.4" />
          {/* Sofa */}
          <rect x="80" y="280" width="130" height="60" rx="6" strokeWidth="0.8" />
          <line x1="145" y1="280" x2="145" y2="250" strokeWidth="0.5" />
          <rect x="60" y="250" width="170" height="30" rx="4" strokeWidth="0.5" />
          {/* Coffee table */}
          <rect x="210" y="290" width="80" height="30" rx="2" strokeWidth="0.6" />
          {/* Dining set */}
          <rect x="320" y="270" width="110" height="70" rx="3" strokeWidth="0.8" />
          {/* Chairs */}
          <rect x="325" y="245" width="30" height="20" rx="3" strokeWidth="0.5" />
          <rect x="395" y="245" width="30" height="20" rx="3" strokeWidth="0.5" />
          <rect x="325" y="345" width="30" height="20" rx="3" strokeWidth="0.5" />
          <rect x="395" y="345" width="30" height="20" rx="3" strokeWidth="0.5" />
          {/* Bookshelf */}
          <rect x="80" y="100" width="60" height="150" strokeWidth="0.8" />
          <line x1="80" y1="135" x2="140" y2="135" strokeWidth="0.3" />
          <line x1="80" y1="170" x2="140" y2="170" strokeWidth="0.3" />
          <line x1="80" y1="205" x2="140" y2="205" strokeWidth="0.3" />
          {/* Pendant light */}
          <line x1="250" y1="80" x2="250" y2="130" strokeWidth="0.4" />
          <polygon points="230,130 270,130 275,145 225,145" strokeWidth="0.5" />
          {/* Window */}
          <rect x="340" y="100" width="50" height="80" strokeWidth="0.6" rx="1" />
          <line x1="365" y1="100" x2="365" y2="180" strokeWidth="0.3" />
        </svg>
      );
    case "institutional":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          {/* Classical institutional building with columns */}
          {/* Pediment */}
          <polygon points="60,110 250,30 440,110" strokeWidth="1.2" />
          {/* Building body */}
          <rect x="60" y="110" width="380" height="240" strokeWidth="1.2" />
          {/* Columns */}
          <line x1="100" y1="110" x2="100" y2="330" strokeWidth="0.8" />
          <line x1="155" y1="110" x2="155" y2="330" strokeWidth="0.8" />
          <line x1="210" y1="110" x2="210" y2="330" strokeWidth="0.8" />
          <line x1="290" y1="110" x2="290" y2="330" strokeWidth="0.8" />
          <line x1="345" y1="110" x2="345" y2="330" strokeWidth="0.8" />
          <line x1="400" y1="110" x2="400" y2="330" strokeWidth="0.8" />
          {/* Column capitals */}
          <line x1="88" y1="108" x2="112" y2="108" strokeWidth="0.5" />
          <line x1="143" y1="108" x2="167" y2="108" strokeWidth="0.5" />
          <line x1="198" y1="108" x2="222" y2="108" strokeWidth="0.5" />
          <line x1="278" y1="108" x2="302" y2="108" strokeWidth="0.5" />
          <line x1="333" y1="108" x2="357" y2="108" strokeWidth="0.5" />
          <line x1="388" y1="108" x2="412" y2="108" strokeWidth="0.5" />
          {/* Steps */}
          <line x1="60" y1="330" x2="440" y2="330" strokeWidth="0.5" />
          <line x1="75" y1="340" x2="425" y2="340" strokeWidth="0.5" />
          <line x1="90" y1="350" x2="410" y2="350" strokeWidth="0.5" />
          {/* Central door */}
          <rect x="225" y="180" width="50" height="100" strokeWidth="0.8" rx="2" />
          <circle cx="265" cy="230" r="2.5" fill="currentColor" />
          {/* Pediment detail - tympanum */}
          <polygon points="100,110 250,50 400,110" strokeWidth="0.3" opacity="0.5" />
          {/* Pathway */}
          <line x1="250" y1="350" x2="250" y2="380" strokeWidth="0.4" strokeDasharray="3 3" />
          <line x1="200" y1="355" x2="200" y2="380" strokeWidth="0.3" strokeDasharray="2 4" />
          <line x1="300" y1="355" x2="300" y2="380" strokeWidth="0.3" strokeDasharray="2 4" />
        </svg>
      );
    case "prefab-steel":
      return (
        <svg className={cn} viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor">
          {/* Left side: Panel construction */}
          <rect x="20" y="40" width="210" height="150" strokeWidth="1" rx="2" />
          <rect x="20" y="210" width="210" height="150" strokeWidth="1" rx="2" />
          <line x1="70" y1="40" x2="70" y2="190" strokeWidth="0.3" strokeDasharray="3 3" />
          <line x1="125" y1="40" x2="125" y2="190" strokeWidth="0.3" strokeDasharray="3 3" />
          <line x1="70" y1="210" x2="70" y2="360" strokeWidth="0.3" strokeDasharray="3 3" />
          <line x1="125" y1="210" x2="125" y2="360" strokeWidth="0.3" strokeDasharray="3 3" />
          {/* Panel connection circles */}
          <circle cx="230" cy="80" r="6" strokeWidth="0.6" />
          <circle cx="230" cy="140" r="6" strokeWidth="0.6" />
          <circle cx="230" cy="250" r="6" strokeWidth="0.6" />
          <circle cx="230" cy="310" r="6" strokeWidth="0.6" />
          {/* Right side: Steel truss */}
          <polyline points="270,80 320,110 370,80 420,110 470,80" strokeWidth="1.2" />
          <line x1="270" y1="80" x2="270" y2="160" strokeWidth="0.6" />
          <line x1="270" y1="160" x2="470" y2="160" strokeWidth="1.2" />
          <line x1="470" y1="160" x2="470" y2="110" strokeWidth="0.6" />
          {/* Truss verticals */}
          <line x1="310" y1="95" x2="310" y2="160" strokeWidth="0.5" />
          <line x1="355" y1="95" x2="355" y2="160" strokeWidth="0.5" />
          <line x1="400" y1="95" x2="400" y2="160" strokeWidth="0.5" />
          {/* Truss diagonals */}
          <line x1="310" y1="95" x2="355" y2="160" strokeWidth="0.4" opacity="0.5" />
          <line x1="355" y1="95" x2="400" y2="160" strokeWidth="0.4" opacity="0.5" />
          {/* Steel columns */}
          <rect x="262" y="160" width="12" height="150" strokeWidth="0.6" rx="1" />
          <rect x="462" y="160" width="12" height="150" strokeWidth="0.6" rx="1" />
          <rect x="256" y="305" width="24" height="8" strokeWidth="0.4" rx="1" />
          <rect x="456" y="305" width="24" height="8" strokeWidth="0.4" rx="1" />
          {/* Ground */}
          <line x1="20" y1="320" x2="480" y2="320" strokeWidth="0.8" />
          {/* Hatching */}
          <line x1="15" y1="335" x2="485" y2="335" strokeWidth="0.3" strokeDasharray="3 6" />
          <line x1="15" y1="348" x2="485" y2="348" strokeWidth="0.3" strokeDasharray="3 6" />
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

/* ─── Orbital drift keyframes — true circular/elliptical paths ─── */
const orbitalPaths = [
  { x: [0, 10, 0, -10, 0], y: [10, 0, -10, 0, 10] },    // circle
  { x: [0, -8, 0, 8, 0], y: [12, 0, -12, 0, 12] },        // tall ellipse
  { x: [0, 12, 0, -12, 0], y: [8, 0, -8, 0, 8] },         // wide ellipse
  { x: [0, 14, 0, -14, 0], y: [6, 0, -6, 0, 6] },         // very wide ellipse
  { x: [0, 6, 0, -6, 0], y: [14, 0, -14, 0, 14] },        // very tall ellipse
];

/* ─── Category Card — refined architectural circles ─── */
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
          isMain ? "w-48 h-48 sm:w-60 sm:h-60" : "w-44 h-44 sm:w-52 sm:h-52"
        }`}
      >
        {/* Thin colored ring — always visible */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px solid ${accent}25`,
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        />

        {/* Hover state: ring becomes solid + subtle glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            border: `1.5px solid ${accent}60`,
            boxShadow: `0 0 24px -4px ${accent}20, inset 0 0 24px -8px ${accent}10`,
          }}
        />

        {/* Inner fill — transparent so orbital background shows through */}
        <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden">
          {/* Architectural line art — visible watermark */}
          <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.5]">
            <CategoryArt categoryId={category.id} />
          </div>

          {/* Inner orbital ring decoration */}
          <div className="absolute inset-3 rounded-full border border-foreground/[0.12]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-foreground/[0.07]" />

          {/* Icon */}
          <div
            className={`relative z-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-400 ${
              isMain ? "scale-125" : "scale-110"
            }`}
            style={{ color: accent }}
          >
            {category.icon}
          </div>

          {/* Title */}
          <h3 className={`relative z-10 font-heading font-semibold text-foreground/80 group-hover:text-foreground text-center leading-tight transition-colors duration-400 ${
            isMain ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
          }`}>
            {category.title}
          </h3>

          {/* Hover: project count appears */}
          <span className="relative z-10 text-[8px] font-mono text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors duration-400">
            {category.projects.length} {category.projects.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card (within a category) ─── */
function ProjectCard({ 
  project, 
  onSelect, 
  isSelected 
}: { 
  project: Project; 
  onSelect: () => void; 
  isSelected: boolean;
}) {
  return (
    <motion.button
      variants={fadeInScale}
      onClick={onSelect}
      whileHover={{ y: -5, scale: 1.015, transition: { type: "spring", stiffness: 250, damping: 15 } }}
      whileTap={{ scale: 0.97 }}
      className={`group relative w-full text-left rounded-xl border overflow-hidden cursor-pointer ${
        isSelected 
          ? "border-primary shadow-md bg-card/80" 
          : "border-border/60 bg-card/30"
      }`}
    >
      {/* Project image or gradient fallback */}
      <motion.div 
        className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image className="w-8 h-8 text-foreground/10" />
          </div>
        )}
        {project.showSlider && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-2 right-2 z-10 text-[9px] uppercase tracking-widest bg-background/80 text-primary font-bold px-3 py-1 rounded-full font-mono"
          >
            Featured — Interactive
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
function ProjectDetail({ project, categoryTitle, onBack, onBackToCategories }: { 
  project: Project; 
  categoryTitle: string;
  onBack: () => void; 
  onBackToCategories: () => void;
}) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Breadcrumb navigation — two-level back */}
      <motion.div 
        className="flex items-center gap-2.5 mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.button
          onClick={onBackToCategories}
          whileHover={{ x: -2 }}
          className="group inline-flex items-center gap-1.5 text-xs font-sans font-bold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 px-3 py-1.5 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span>All Categories</span>
        </motion.button>
        <span className="text-muted-foreground/25 text-xs">/</span>
        <motion.button
          onClick={onBack}
          whileHover={{ x: -1 }}
          className="text-xs font-sans text-muted-foreground/60 hover:text-primary bg-transparent hover:bg-primary/5 border border-transparent hover:border-primary/20 px-2.5 py-1.5 rounded-lg transition-all duration-300"
        >
          {categoryTitle}
        </motion.button>
      </motion.div>

      <motion.div 
        className={`rounded-2xl overflow-hidden border border-border/60 bg-card/40`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 70, damping: 20, mass: 0.9 }}
      >
        {/* Header banner */}
        <motion.div 
          className={`h-48 bg-gradient-to-br ${project.gradient} flex items-end p-6 relative overflow-hidden`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Project image backdrop if available */}
          {project.image && (
            <img 
              src={project.image} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              loading="lazy"
            />
          )}
          {/* Subtle shimmer overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 3 }}
          />
          <div>
            <motion.h3 
              className="text-2xl font-heading font-bold text-foreground drop-shadow-sm"
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
          className="p-6 space-y-5"
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

          {/* Project image gallery section */}
          {project.image && (
            <motion.div 
              className="rounded-xl overflow-hidden border border-border/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 18 }}
            >
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-mono block mb-2 px-1">
                Project Imagery
              </span>
              <div className="relative aspect-[16/9] bg-muted/30 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
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

  // Project detail view (only when a specific project is selected)
  if (project && selectedProject) {
    return (
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
            categoryTitle={projectCategory?.title || ""}
            onBack={handleBackToCategories}
            onBackToCategories={handleBackToCategories}
          />
        </motion.div>
      </AnimatePresence>
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
          Hover a discipline to preview projects, then click any project to explore its full details.
        </motion.p>
      </motion.div>

      {/* Orbital gallery — circles drift in space */}
      <div className="relative">
        {/* Orbital path rings visible behind the circles */}
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

        {/* Hover-aware container */}
        <div
          onMouseLeave={() => setHoveredCategory(null)}
          className="relative min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            {hoveredCategory && hoveredCat ? (
              /* ─── HOVER LAYOUT: expanded circle + project previews ─── */
              <motion.div
                key="hover-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 py-4"
              >
                {/* Expanded circle — left side */}
                <div
                  onMouseEnter={() => setHoveredCategory(hoveredCat.id)}
                  className="shrink-0"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.15, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="w-48 h-48 sm:w-60 sm:h-60 rounded-full relative flex items-center justify-center"
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
                        <h3 className="relative z-10 font-heading font-semibold text-foreground text-center text-sm sm:text-base leading-tight max-w-[100px] sm:max-w-[120px]">
                          {hoveredCat.title}
                        </h3>
                        <span className="relative z-10 text-[9px] font-mono text-muted-foreground/60">
                          {hoveredCat.projects.length} {hoveredCat.projects.length === 1 ? "project" : "projects"}
                        </span>
                      </div>
                  </motion.div>
                </div>

                {/* Project preview panel — right side */}
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
              /* ─── NORMAL GRID: all category circles drifting ─── */
              <motion.div
                key="grid-layout"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="relative flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14 py-4"
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
