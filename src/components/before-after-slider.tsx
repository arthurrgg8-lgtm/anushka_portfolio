"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // SVG for Blueprint (Technical CAD drawing)
  const renderBlueprint = () => (
    <svg className="w-full h-full bg-[#1b2230] text-[#4f9bfd]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gridlines */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#25354e" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Axis grids & Labels */}
      <line x1="80" y1="50" x2="80" y2="450" stroke="#ff4f4f" strokeWidth="0.75" strokeDasharray="5,5" />
      <line x1="720" y1="50" x2="720" y2="450" stroke="#ff4f4f" strokeWidth="0.75" strokeDasharray="5,5" />
      <line x1="50" y1="400" x2="750" y2="400" stroke="#ff4f4f" strokeWidth="0.75" strokeDasharray="5,5" />
      
      <circle cx="80" cy="30" r="12" fill="#25354e" stroke="#4f9bfd" strokeWidth="1" />
      <text x="80" y="34" textAnchor="middle" fill="#4f9bfd" fontSize="11" fontFamily="monospace">A</text>
      
      <circle cx="720" cy="30" r="12" fill="#25354e" stroke="#4f9bfd" strokeWidth="1" />
      <text x="720" y="34" textAnchor="middle" fill="#4f9bfd" fontSize="11" fontFamily="monospace">B</text>

      {/* Ground/Foundation Line */}
      <line x1="50" y1="400" x2="750" y2="400" stroke="#4f9bfd" strokeWidth="2.5" />

      {/* Building Structure Columns */}
      <rect x="120" y="150" width="40" height="250" fill="none" stroke="#4f9bfd" strokeWidth="1.5" />
      <line x1="120" y1="150" x2="160" y2="400" stroke="#4f9bfd" strokeWidth="0.75" strokeDasharray="3,3" />
      <line x1="160" y1="150" x2="120" y2="400" stroke="#4f9bfd" strokeWidth="0.75" strokeDasharray="3,3" />

      <rect x="640" y="150" width="40" height="250" fill="none" stroke="#4f9bfd" strokeWidth="1.5" />
      <line x1="640" y1="150" x2="680" y2="400" stroke="#4f9bfd" strokeWidth="0.75" strokeDasharray="3,3" />
      <line x1="680" y1="150" x2="640" y2="400" stroke="#4f9bfd" strokeWidth="0.75" strokeDasharray="3,3" />

      {/* Floor Slabs */}
      <rect x="120" y="150" width="560" height="20" fill="none" stroke="#4f9bfd" strokeWidth="2" />
      <rect x="120" y="270" width="560" height="15" fill="none" stroke="#4f9bfd" strokeWidth="1.5" />

      {/* Ramp & Circulation (Universal Design Focus) */}
      <path d="M 120 400 L 0 400 L 120 340 Z" fill="none" stroke="#4f9bfd" strokeWidth="1.5" strokeDasharray="4,2" />
      <path d="M 40 400 C 60 380, 80 370, 120 370" stroke="#4f9bfd" strokeWidth="1.5" />
      <text x="35" y="360" fill="#4f9bfd" fontSize="10" fontFamily="monospace" transform="rotate(-15 35 360)">RAMP SLOPE 1:12</text>

      {/* Glass facade framing details */}
      <rect x="200" y="170" width="400" height="230" fill="none" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="300" y1="170" x2="300" y2="400" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="400" y1="170" x2="400" y2="400" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="500" y1="170" x2="500" y2="400" stroke="#4f9bfd" strokeWidth="1" />

      {/* Elevation dimensions */}
      <line x1="750" y1="150" x2="750" y2="400" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="745" y1="150" x2="755" y2="150" stroke="#4f9bfd" strokeWidth="1" />
      <line x1="745" y1="400" x2="755" y2="400" stroke="#4f9bfd" strokeWidth="1" />
      <text x="765" y="280" fill="#4f9bfd" fontSize="11" fontFamily="monospace" transform="rotate(90 765 280)">H = 6250 mm</text>
      
      {/* Title block in bottom right */}
      <rect x="520" y="420" width="260" height="70" fill="#1b2230" stroke="#4f9bfd" strokeWidth="1" />
      <text x="535" y="440" fill="#4f9bfd" fontSize="12" fontWeight="bold" fontFamily="sans-serif">ANUSHKA KHATRI ARCHITECTS</text>
      <text x="535" y="458" fill="#4f9bfd" fontSize="9" fontFamily="monospace">DWG NO: A-01 | PHASE: DD</text>
      <text x="535" y="474" fill="#4f9bfd" fontSize="9" fontFamily="monospace">SCALE: 1:50 | UNIT: MM</text>
      <text x="535" y="484" fill="#ff4f4f" fontSize="8" fontWeight="bold" fontFamily="monospace">UNIVERSAL DESIGN STANDARD</text>
    </svg>
  );

  // SVG for Render (Realistic architecture design)
  const renderFinished = () => (
    <svg className="w-full h-full bg-gradient-to-tr from-[#eadfd4] via-[#f7ebd9] to-[#d6cbd1]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft Sky and Sun reflection */}
      <circle cx="680" cy="120" r="160" fill="#ffffff" opacity="0.15" />
      
      {/* Landscape background - Himalayan silhouette (Nepali vernacular vibe) */}
      <path d="M 0 350 L 100 280 L 250 320 L 400 230 L 600 300 L 800 250 L 800 500 L 0 500 Z" fill="#b9ab9f" opacity="0.3" />
      <path d="M 0 380 L 180 340 L 320 370 L 500 290 L 720 350 L 800 320 L 800 500 L 0 500 Z" fill="#9c8c7f" opacity="0.5" />

      {/* Main Ground Concrete Slab */}
      <rect x="0" y="400" width="800" height="100" fill="#a59a91" />
      <rect x="0" y="400" width="800" height="5" fill="#ebe0d6" opacity="0.7" />

      {/* Wooden Deck Ramp (Vernacular texture) */}
      <polygon points="120,400 0,400 120,350" fill="#7a553c" />
      {/* Wood plank lines */}
      <line x1="20" y1="400" x2="20" y2="390" stroke="#523927" strokeWidth="1" />
      <line x1="45" y1="400" x2="45" y2="380" stroke="#523927" strokeWidth="1" />
      <line x1="70" y1="400" x2="70" y2="370" stroke="#523927" strokeWidth="1" />
      <line x1="95" y1="400" x2="95" y2="360" stroke="#523927" strokeWidth="1" />
      
      {/* Left and Right Concrete Structural Columns (Raw Concrete look) */}
      <rect x="120" y="150" width="40" height="250" fill="#eae3db" />
      <rect x="120" y="150" width="10" height="250" fill="#ffffff" opacity="0.3" />
      <rect x="150" y="150" width="10" height="250" fill="#000000" opacity="0.1" />

      <rect x="640" y="150" width="40" height="250" fill="#eae3db" />
      <rect x="640" y="150" width="10" height="250" fill="#ffffff" opacity="0.3" />
      <rect x="670" y="150" width="10" height="250" fill="#000000" opacity="0.1" />

      {/* Heavy Terracotta Vernacular Roof (Traditional Nepali theme) */}
      <polygon points="100,150 720,150 670,120 150,120" fill="#bd5838" />
      {/* Brick/Tile ridges */}
      <line x1="180" y1="150" x2="215" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="260" y1="150" x2="285" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="340" y1="150" x2="355" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="420" y1="150" x2="425" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="500" y1="150" x2="495" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="580" y1="150" x2="565" y2="120" stroke="#944023" strokeWidth="1.5" />
      <line x1="660" y1="150" x2="635" y2="120" stroke="#944023" strokeWidth="1.5" />
      <rect x="100" y="145" width="620" height="5" fill="#944023" />

      {/* Concrete Roof Rim */}
      <rect x="120" y="150" width="560" height="20" fill="#eae3db" />

      {/* Modern Glass Facade Panels with reflections */}
      <rect x="160" y="170" width="480" height="230" fill="#cbe3f0" opacity="0.45" />
      
      {/* Glass Pane Divisions */}
      <line x1="280" y1="170" x2="280" y2="400" stroke="#eae3db" strokeWidth="2" />
      <line x1="400" y1="170" x2="400" y2="400" stroke="#eae3db" strokeWidth="2" />
      <line x1="520" y1="170" x2="520" y2="400" stroke="#eae3db" strokeWidth="2" />

      {/* Reflective shine stripes on glass */}
      <polygon points="200,170 240,170 170,400 130,400" fill="#ffffff" opacity="0.3" />
      <polygon points="320,170 350,170 300,400 270,400" fill="#ffffff" opacity="0.3" />
      <polygon points="440,170 470,170 420,400 390,400" fill="#ffffff" opacity="0.3" />
      <polygon points="560,170 590,170 540,400 510,400" fill="#ffffff" opacity="0.3" />

      {/* Interior Warm Illumination glow (Emotion focus) */}
      <rect x="290" y="200" width="100" height="150" fill="#ffda9e" opacity="0.25" filter="blur(8px)" />
      <rect x="410" y="180" width="90" height="180" fill="#ffcb70" opacity="0.25" filter="blur(10px)" />
      
      {/* Warm modern minimalist lighting inside */}
      <circle cx="340" cy="220" r="6" fill="#ffd793" />
      <line x1="340" y1="170" x2="340" y2="214" stroke="#4a3e2a" strokeWidth="1" />
      
      <circle cx="460" cy="210" r="6" fill="#ffd793" />
      <line x1="460" y1="170" x2="460" y2="204" stroke="#4a3e2a" strokeWidth="1" />

      {/* Fine Wooden Louver Screens (Modern detailing + Vernacular heat shading) */}
      <g opacity="0.85">
        <rect x="180" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="190" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="200" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="210" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="220" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="230" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="240" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="250" y="170" width="4" height="230" fill="#7a553c" />
        <rect x="260" y="170" width="4" height="230" fill="#7a553c" />
      </g>
      
      {/* Ambient shadow in structural corners */}
      <rect x="120" y="170" width="40" height="230" fill="#000000" opacity="0.05" />

      {/* Human silhouette scaled elegantly (Universal / Inclusive Design showcase) */}
      {/* Person pushing a wheelchair (inclusive spaces tag) */}
      <g fill="#43362d" opacity="0.9" transform="translate(480, 290) scale(0.6)">
        {/* Standing person */}
        <circle cx="60" cy="30" r="8" />
        <path d="M 60 38 L 52 75 L 56 120 M 60 38 L 68 75 L 64 120" stroke="#43362d" strokeWidth="6" strokeLinecap="round" />
        <path d="M 60 40 L 40 70 L 20 85" stroke="#43362d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 60 42 C 55 50, 55 65, 60 80" stroke="#43362d" strokeWidth="12" strokeLinecap="round" />
        
        {/* Wheelchair person */}
        <circle cx="15" cy="55" r="7" />
        <path d="M 15 62 Q 22 75, 12 90 Q 25 105, 35 105" stroke="#43362d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="15" cy="95" r="16" stroke="#43362d" strokeWidth="4" fill="none" />
        <path d="M 15 65 C 10 75, 5 80, 10 90" stroke="#43362d" strokeWidth="10" strokeLinecap="round" />
        
        {/* Push handle connection */}
        <line x1="28" y1="75" x2="38" y2="70" stroke="#43362d" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Interactive Slider Box */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-[8/5] rounded-xl overflow-hidden border border-border/60 bg-card select-none shadow-md group cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Bottom layer: Render / Finished structure */}
        <div className="absolute inset-0 w-full h-full">
          {renderFinished()}
        </div>

        {/* Top layer: Blueprint (clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-primary/90"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || 800 }}>
            {renderBlueprint()}
          </div>
        </div>

        {/* Labels for Blueprint vs Render */}
        <div className="absolute top-4 left-4 pointer-events-none bg-[#1b2230]/80 backdrop-blur-sm text-[#4f9bfd] px-3 py-1 rounded text-xs font-mono border border-[#4f9bfd]/30 transition-opacity duration-300 opacity-80 group-hover:opacity-100 shadow-sm">
          TECHNICAL BLUEPRINT
        </div>
        <div className="absolute top-4 right-4 pointer-events-none bg-card/85 backdrop-blur-sm text-foreground px-3 py-1 rounded text-xs font-sans border border-border/40 transition-opacity duration-300 opacity-80 group-hover:opacity-100 shadow-sm">
          COMPLETED RENDER
        </div>

        {/* Drag Handle Bar & Circle Toggle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center border border-primary-foreground/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-grab">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground/80 font-sans italic flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Drag or swipe the center handle to reveal the spatial conversion from CAD details to warm vernacular realities.
      </p>
    </div>
  );
}
