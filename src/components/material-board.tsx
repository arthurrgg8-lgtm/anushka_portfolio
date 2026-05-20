"use client";

import { useState } from "react";
import { Layers, Flame, Trees, Sparkles, Box, FileText, ChevronRight } from "lucide-react";

interface MaterialItem {
  id: string;
  name: string;
  subtitle: string;
  nepaliName: string;
  category: "Earth" | "Concrete" | "Vernacular" | "Modern";
  colorClass: string;
  bgHex: string;
  description: string;
  philosophy: string;
  details: string[];
  icon: any;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "clay",
    name: "Terracotta Brick",
    nepaliName: "माटोको इँटा (Mato ko Ita)",
    subtitle: "Clay / Earth Sourced",
    category: "Earth",
    colorClass: "bg-[#c85a32] text-[#fdfbf7]",
    bgHex: "#c85a32",
    description: "Hand-pressed brick made from Kathmandu valley clay. It represents thermal efficiency, organic texture, and a carbon-negative construction logic.",
    philosophy: "Architecture should breathe. Terracotta connects the built space with the ground it stands on, providing natural temperature moderation while reflecting the warm reddish hue of traditional Nepalese architecture.",
    details: ["High thermal mass", "Locally sourced", "Porosity allows breathability", "Traditional firing methods"],
    icon: Flame
  },
  {
    id: "wood",
    name: "Carved Sal Wood",
    nepaliName: "सालको काठ (Sal ko Kath)",
    subtitle: "Organic / Structural",
    category: "Vernacular",
    colorClass: "bg-[#7a553c] text-[#fdfbf7]",
    bgHex: "#7a553c",
    description: "Shorea robusta (Sal), an indigenous Nepalese hardwood known for its dense structural resilience and spiritual heritage in ancient woodwork.",
    philosophy: "Traditional details are not decorative ornaments; they are standard systems of structural joinery. Wood introduces a living, organic touch that responds gracefully to aging.",
    details: ["Extremely high durability", "Resistant to termites", "Traditional load-bearing framing", "Tactile surface texture"],
    icon: Trees
  },
  {
    id: "concrete",
    name: "Raw Cast Concrete",
    nepaliName: "ढलाइ कंक्रिट (Dhalai Concrete)",
    subtitle: "Industrial / Monolithic",
    category: "Concrete",
    colorClass: "bg-[#8a9199] text-[#22252a]",
    bgHex: "#8a9199",
    description: "Raw, unpolished exposed concrete cast on-site. Embodying structural honesty, functional strength, and modern architectural lines.",
    philosophy: "Concrete is the modern stone. Leaving it raw reveals the process of its creation — showing the wood-grain texture of the formwork and the structural truth of the building.",
    details: ["High load capacity", "Low maintenance", "Thermal buffer", "Sleek sculptural lines"],
    icon: Box
  },
  {
    id: "slate",
    name: "Raw Slate Stone",
    nepaliName: "ढुङ्गाको पाङ्गो (Dhunga ko Pango)",
    subtitle: "Metamorphic Slate",
    category: "Earth",
    colorClass: "bg-[#3e444f] text-[#fdfbf7]",
    bgHex: "#3e444f",
    description: "Foliated slate sourced from regional quarries. It stands for natural weather protection, rich layered textures, and deep charcoal aesthetics.",
    philosophy: "A direct reference to the indigenous slate roofs of mountain settlements. Slate layers capture light dynamically and shield spaces from severe monsoon rains.",
    details: ["Waterproof naturally", "Monsoon resistant", "Rich gray/blue layers", "Sourced from rural Nepalese quarries"],
    icon: Layers
  },
  {
    id: "brass",
    name: "Hammered Brass",
    nepaliName: "पिटेको पित्तल (Piteko Pittal)",
    subtitle: "Detail / Metallic Accents",
    category: "Modern",
    colorClass: "bg-[#d4af37] text-[#22252a]",
    bgHex: "#d4af37",
    description: "Hand-beaten brass details. Crafted locally by artisans in Patan, reflecting metallic details, durability, and reflective highlights.",
    philosophy: "The joint is the starting point of architectural dialogue. Small brass details, pins, and hinges elevate ordinary materials, celebrating manual craft within modern frameworks.",
    details: ["Artisanal fabrication", "Warm golden luster", "Naturally antibacterial", "Perfect for door pulls, lighting, and joints"],
    icon: Sparkles
  },
  {
    id: "lokta",
    name: "Lokta Paper",
    nepaliName: "लोक्ता कागज (Lokta Kagaj)",
    subtitle: "Textile / Screen Screens",
    category: "Vernacular",
    colorClass: "bg-[#f5ebd6] text-[#22252a]",
    bgHex: "#f5ebd6",
    description: "Handmade paper derived from the bark of the wild Daphne shrub. Lightweight, fibrous, and used as diffusers and screen filters.",
    philosophy: "Light is a building material. Using Lokta paper in screen partitions allows light to filter in a soft, non-glaring way, casting natural textures and creating sensory serenity.",
    details: ["100% biodegradable", "Fibrous rich texture", "Filters UV glare", "Hand-pulled using mountain water"],
    icon: FileText
  }
];

export function MaterialBoard() {
  const [selectedId, setSelectedId] = useState("clay");
  
  const activeMaterial = MATERIALS.find(m => m.id === selectedId) || MATERIALS[0];
  const IconComponent = activeMaterial.icon;

  return (
    <div className="w-full max-w-5xl px-2">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
          Easter Egg & Material Philosophy
        </span>
        <h3 className="text-3xl font-heading font-bold mt-1">
          Interactive Material Board
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-2 font-sans">
          Click any material block in this architectural flat-lay to reveal its vernacular roots, technical properties, and placement in Anushka's spatial layouts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">
        {/* Left Side: Flat-Lay Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 min-h-[300px] select-none">
          {MATERIALS.map((material) => {
            const MaterialIcon = material.icon;
            const isSelected = material.id === selectedId;
            return (
              <button
                key={material.id}
                onClick={() => setSelectedId(material.id)}
                className={`relative rounded-xl p-5 border text-left flex flex-col justify-between transition-all duration-500 cursor-pointer group hover:-translate-y-1.5 ${
                  isSelected 
                    ? "border-primary/80 shadow-md ring-2 ring-primary/20 scale-[1.02]" 
                    : "border-border/60 bg-card/40 hover:bg-card/90 hover:border-border hover:shadow-sm"
                }`}
                style={{
                  boxShadow: isSelected ? `0 10px 25px -5px ${material.bgHex}25` : undefined
                }}
              >
                {/* Visual texture representation block */}
                <div className={`w-full aspect-[4/3] rounded-lg mb-4 ${material.colorClass} opacity-90 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-inner group-hover:scale-105`}>
                  {/* Subtle vector lines for abstract material texture */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`pat-${material.id}`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pat-${material.id})`} />
                    </svg>
                  </div>
                  <MaterialIcon className="w-8 h-8 opacity-85" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary font-sans">
                    {material.category}
                  </span>
                  <h4 className="text-sm font-semibold font-sans mt-0.5 text-foreground flex items-center justify-between">
                    {material.name}
                  </h4>
                  <span className="block text-[10px] text-muted-foreground mt-0.5 font-mono truncate">
                    {material.nepaliName.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Philosophy & Specs Detail Panel */}
        <div className="lg:col-span-5 bg-card/60 backdrop-blur-md rounded-2xl border border-border/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          {/* Subtle watermarked background icon */}
          <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-foreground pointer-events-none">
            <IconComponent className="w-48 h-48" />
          </div>

          <div>
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${activeMaterial.colorClass}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-sans">
                  {activeMaterial.category} Material System
                </span>
                <h4 className="text-xl font-heading font-bold text-foreground">
                  {activeMaterial.name}
                </h4>
              </div>
            </div>

            <p className="text-[11px] font-mono text-muted-foreground mt-2 border-b border-border/40 pb-3 flex justify-between items-center">
              <span>{activeMaterial.nepaliName}</span>
              <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px]">
                {activeMaterial.subtitle}
              </span>
            </p>

            {/* Core Description */}
            <div className="mt-4">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 font-sans">
                Material Description
              </span>
              <p className="text-sm text-foreground/90 leading-relaxed mt-1 font-sans">
                {activeMaterial.description}
              </p>
            </div>

            {/* Philosophy quote */}
            <div className="mt-5 bg-background/50 border-l-2 border-primary rounded-r-lg p-3 italic">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-primary/80 font-sans not-italic">
                Anushka's Design Thinking:
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1 font-sans">
                "{activeMaterial.philosophy}"
              </p>
            </div>
          </div>

          {/* Technical properties */}
          <div className="mt-6 border-t border-border/40 pt-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 font-sans mb-2">
              Technical Specification
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeMaterial.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-1.5 text-xs text-foreground font-sans">
                  <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
