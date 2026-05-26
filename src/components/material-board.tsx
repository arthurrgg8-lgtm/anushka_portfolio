"use client";

import { useState } from "react";
import { Flame, Trees, Box, ChevronRight, Construction } from "lucide-react";

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
  image?: string;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "clay",
    name: "Terracotta Brick",
    nepaliName: "माटोको इँटा (Mato ko Ita)",
    subtitle: "Clay / Earth Sourced",
    image: "/projects/materials/terracota_brick.jpeg",
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
    image: "/projects/materials/karsalwood.jpeg",
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
    image: "/projects/materials/conrete.jpeg",
    category: "Concrete",
    colorClass: "bg-[#8a9199] text-[#22252a]",
    bgHex: "#8a9199",
    description: "Raw, unpolished exposed concrete cast on-site. Embodying structural honesty, functional strength, and modern architectural lines.",
    philosophy: "Concrete is the modern stone. Leaving it raw reveals the process of its creation — showing the wood-grain texture of the formwork and the structural truth of the building.",
    details: ["High load capacity", "Low maintenance", "Thermal buffer", "Sleek sculptural lines"],
    icon: Box
  },
  {
    id: "eps",
    name: "EPS Sandwich Panel",
    nepaliName: "ईपीएस स्यान्डविच प्यानल (EPS Sandwich Panel)",
    subtitle: "Insulated / Prefabricated",
    category: "Modern",
    colorClass: "bg-[#4a90d9] text-[#fdfbf7]",
    bgHex: "#4a90d9",
    image: "/projects/materials/EPS_sandwichpanel.jpeg",
    description: "A lightweight, insulated building panel comprising two structural facings bonded to an expanded polystyrene (EPS) core. Ideal for rapid construction with superior thermal performance and minimal site disruption.",
    philosophy: "Speed and efficiency should never compromise quality. EPS panels demonstrate how modern prefabrication can achieve high thermal performance, structural integrity, and rapid on-site assembly — a pragmatic solution for Nepal's growing housing needs.",
    details: ["Superior thermal insulation (R-18)", "Lightweight, rapid assembly", "Fire-resistant EPS core", "Sound attenuation properties", "Cost-effective construction"],
    icon: Box
  },
  {
    id: "steel",
    name: "Structural Steel",
    nepaliName: "संरचनात्मक स्टिल (Sanrachanatmak Steel)",
    subtitle: "Structural / Framework",
    category: "Modern",
    colorClass: "bg-[#6b7280] text-[#fdfbf7]",
    bgHex: "#6b7280",
    image: "/projects/materials/steel.jpeg",
    description: "High-strength structural steel sections used for long-span frames, seismic-resistant skeletons, and modern architectural expressions. The backbone of contemporary Nepalese construction.",
    philosophy: "Steel allows architecture to defy gravity. Its strength-to-weight ratio enables column-free spaces, cantilevered forms, and earthquake resilience — essential for Nepal's seismic context while enabling bold architectural expression.",
    details: ["High strength-to-weight ratio", "Seismic-resistant frames", "100% recyclable material", "Long-span capability", "Prefabricated connections"],
    icon: Construction
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mt-6">
        {/* Left Side: Flat-Lay Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 min-h-[300px] select-none">
          {MATERIALS.map((material) => {
            const MaterialIcon = material.icon;
            const isSelected = material.id === selectedId;
            return (
              <button
                key={material.id}
                onClick={() => setSelectedId(material.id)}
                className={`relative rounded-xl p-3 sm:p-5 border text-left flex flex-col justify-between transition-all duration-500 cursor-pointer group hover:-translate-y-1.5 ${
                  isSelected 
                    ? "border-primary/80 shadow-md ring-2 ring-primary/20 scale-[1.02]" 
                    : "border-border/60 bg-card/40 hover:bg-card/90 hover:border-border hover:shadow-sm"
                }`}
                style={{
                  boxShadow: isSelected ? `0 10px 25px -5px ${material.bgHex}25` : undefined
                }}
              >
                {/* Visual texture representation block */}
                <div className={`w-full aspect-[4/3] rounded-lg mb-2 sm:mb-4 ${material.colorClass} opacity-90 flex items-center justify-center relative overflow-hidden transition-all duration-500 shadow-inner group-hover:scale-105`}>
                  {/* Material image or abstract texture */}
                  {material.image ? (
                    <img
                      src={material.image}
                      alt={material.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </div>

                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-primary font-sans">
                    {material.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold font-sans mt-0.5 text-foreground flex items-center justify-between">
                    {material.name}
                  </h4>
                  <span className="block text-[8px] sm:text-[10px] text-muted-foreground mt-0.5 font-mono truncate">
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
