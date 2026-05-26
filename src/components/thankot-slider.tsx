"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export function ThankotSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(420);
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateWidth = () => {
      setContainerWidth(el.getBoundingClientRect().width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="w-full max-w-[280px] sm:max-w-[340px] flex flex-col items-center mt-3 sm:mt-4 z-20">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-primary/20 bg-card select-none shadow-sm group cursor-ew-resize hover:shadow-md hover:border-primary/40 transition-all duration-300"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Right side / After image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/projects/residential/thankot-house-2.jpeg"
            alt="Thankot House After"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Left side / Before image (clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-primary/80"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full" style={{ width: containerWidth }}>
            <img
              src="/projects/residential/thankot-house-1.jpeg"
              alt="Thankot House Before"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Dynamic labels */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none bg-background/80 backdrop-blur-sm text-foreground px-2 py-0.5 rounded text-[8px] font-mono border border-border/40 transition-opacity duration-300 opacity-80 group-hover:opacity-100 shadow-sm">
          REALITY
        </div>
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none bg-background/80 backdrop-blur-sm text-foreground px-2 py-0.5 rounded text-[8px] font-mono border border-border/40 transition-opacity duration-300 opacity-80 group-hover:opacity-100 shadow-sm">
          3D DESIGN
        </div>

        {/* Drag Handle line & circle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-md flex items-center justify-center border border-primary-foreground/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-grab">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
      <span className="text-[8px] text-muted-foreground mt-1.5 italic font-sans flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
        Thankot House: Reality vs 3D Design
      </span>
    </div>
  );
}
