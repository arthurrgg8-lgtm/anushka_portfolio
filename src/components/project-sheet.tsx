"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Calendar, MapPin, Award, User, Layers, Compass, Clipboard } from "lucide-react";
import { BeforeAfterSlider } from "./before-after-slider";
import { MaterialBoard } from "./material-board";

interface ProjectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  renderCourtyardDiagram?: () => React.ReactNode;
  formData?: any;
  setFormData?: (d: any) => void;
  formSubmitted?: boolean;
  handleFormSubmit?: (e: React.FormEvent) => void;
}

export function ProjectSheet({
  isOpen,
  onClose,
  item,
  renderCourtyardDiagram,
  formData,
  setFormData,
  formSubmitted,
  handleFormSubmit
}: ProjectSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 dark:bg-background/60 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl h-full bg-background border-l border-border shadow-2xl flex flex-col z-10 overflow-y-auto no-scrollbar"
          >
            {/* Sticky header */}
            <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/60 z-30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 font-sans font-bold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Grid</span>
                <span className="sm:hidden">Back</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-all duration-300 cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-4 sm:p-6 md:p-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

              {/* Technical Specs Sidebar */}
              <div className="lg:col-span-4 bg-muted/30 border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 select-none order-2 lg:order-1">
                <div className="flex items-center gap-2 pb-3 border-b border-border/40">
                  <Compass className="w-4 h-4 text-primary" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
                    TECHNICAL MATRIX
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs font-sans">
                  {item.location && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3" /> LOCATION
                      </span>
                      <span className="font-semibold text-foreground">{item.location}</span>
                    </div>
                  )}
                  {item.year && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" /> TIMELINE
                      </span>
                      <span className="font-semibold text-foreground">{item.year}</span>
                    </div>
                  )}
                  {item.phase && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <Layers className="w-3 h-3" /> PHASE
                      </span>
                      <span className="font-semibold text-foreground">{item.phase}</span>
                    </div>
                  )}
                  {item.role && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <User className="w-3 h-3" /> ROLE
                      </span>
                      <span className="font-semibold text-foreground">{item.role}</span>
                    </div>
                  )}
                  {item.tag && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <Clipboard className="w-3 h-3" /> TYPOLOGY
                      </span>
                      <span className="font-semibold text-foreground">{item.tag}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 pt-3 sm:pt-4 border-t border-border/40">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1 font-mono">
                      <Award className="w-3 h-3" /> ACCREDITATION
                    </span>
                    <span className="font-semibold text-foreground">REGISTERED ARCHITECT</span>
                    <span className="text-[10px] text-primary font-mono font-bold mt-0.5 uppercase tracking-wide">
                      NEC REG NO: 94879
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8 space-y-5 sm:space-y-6 order-1 lg:order-2">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                    {item.tag}
                  </span>
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-heading font-bold text-foreground mt-1 mb-3 sm:mb-4 leading-tight uppercase">
                    {item.title}
                  </h1>
                  {item.excerpt && (
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-sans leading-relaxed border-l-2 border-primary pl-3 sm:pl-4 italic">
                      {item.excerpt}
                    </p>
                  )}
                </div>

                {/* Dynamic component injection */}
                <div className="pt-2 sm:pt-4">
                  {item.id === "accessibility-pavilion" && (
                    <div className="w-full"><BeforeAfterSlider /></div>
                  )}

                  {item.id === "thesis-chowk" && renderCourtyardDiagram && (
                    <div className="space-y-6 sm:space-y-8">
                      <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-border bg-card shadow-inner">
                        {renderCourtyardDiagram()}
                      </div>
                      <div className="space-y-4 sm:space-y-6 text-sm text-foreground/90 font-sans leading-relaxed">
                        <div className="border-l-2 border-primary pl-3 sm:pl-4">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">Chapter 1: The Barrier of Heritage</h3>
                          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">
                            Historic preservation codes often conflict with access laws. Traditional Newari brick courtyards rely on elevated plinths (dabhos) to shield spaces from flooding, but these create 45cm vertical blocks. We study how steel structural joints can suspend thin floor plates to span plinths, guaranteeing a zero-threshold entrance for wheelchairs while leaving original brickwork completely untouched below.
                          </p>
                        </div>
                        <div className="border-l-2 border-primary pl-3 sm:pl-4">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">Chapter 2: Multi-Sensory Spatial Paving</h3>
                          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">
                            Accessibility is not just physical; it is sensory. For visually impaired users, historic stone flags are dangerous. Instead of generic plastic tactile bumps, we design sub-surface stone grooves that act as storm-water drainage channels during monsoons and provide clear tactile physical guide paths for cane users.
                          </p>
                        </div>
                        <div className="border-l-2 border-primary pl-3 sm:pl-4">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">Chapter 3: Prefabricated Panel Infills</h3>
                          <p className="text-muted-foreground mt-1.5 text-xs sm:text-sm">
                            To execute interior inclusive restructuring, we leverage prefabricated lightweight panel wall systems. Pre-milled panel connections slide into original wood beam joints, allowing historic courtyards to adapt into fully accessible spaces without invasive masonry work.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.id === "material-board" && (
                    <div className="w-full"><MaterialBoard /></div>
                  )}

                  {item.content && Array.isArray(item.content) && (
                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed">
                      {item.content.map((paragraph: string, idx: number) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {item.id === "nec-license" && (
                    <div className="space-y-5 sm:space-y-6">
                      <div className="p-4 sm:p-6 bg-card border border-border/80 rounded-xl sm:rounded-2xl flex flex-col items-center text-center select-none">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/20 flex items-center justify-center relative bg-muted/40 mb-4">
                          <svg className="absolute inset-0 w-full h-full text-primary opacity-60 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                            <path d="M 50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                          </svg>
                          <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-primary font-bold font-mono">OFFICIAL ACCREDITATION</span>
                        <h4 className="text-base sm:text-lg font-heading font-bold text-foreground mt-1 uppercase">AR. REGISTERED LICENSE</h4>
                        <p className="text-[10px] sm:text-[11px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">Nepal Engineering Council (NEC)</p>
                        <div className="w-full max-w-sm bg-background border border-border/60 py-3 sm:py-4 rounded-xl text-[10px] sm:text-xs font-mono font-semibold text-primary mt-4 sm:mt-6 flex flex-col gap-1 shadow-sm">
                          <div>STATUS: REGISTERED ARCHITECT</div>
                          <div className="text-[9px] sm:text-[10px] opacity-80">NEC REG NO: 94879</div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed font-sans space-y-2">
                        <p>Ar. Anushka Khatri is officially certified as a Registered Architect by the Nepal Engineering Council (NEC) under registration number 94879.</p>
                        <p>Our structural specifications comply with international Universal Accessibility Design standards and seismic-resilient panel fabrication limits.</p>
                      </div>
                    </div>
                  )}

                  {item.id === "capabilities-toolbox" && (
                    <div className="space-y-5 sm:space-y-6 font-sans">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        <div className="p-3 sm:p-4 bg-muted/30 border border-border/60 rounded-xl">
                          <h4 className="font-heading font-bold text-foreground text-sm sm:text-base">Universal Design</h4>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">Spatial equality for all body types — ramps, tactile guides, acoustic filters.</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-muted/30 border border-border/60 rounded-xl">
                          <h4 className="font-heading font-bold text-foreground text-sm sm:text-base">Urban Circulation</h4>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">Site analysis, pedestrian flow mapping, and community plaza infrastructure.</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-muted/30 border border-border/60 rounded-xl">
                          <h4 className="font-heading font-bold text-foreground text-sm sm:text-base">Experiential Interiors</h4>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-relaxed">Tactile material play and warm diffusers for sensory tranquility.</p>
                        </div>
                      </div>
                      <div className="border-t border-border/40 pt-4">
                        <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                          Software & Engineering Tools
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {["AutoCAD", "SketchUp", "Lumion", "V-Ray", "Enscape", "Photoshop", "InDesign"].map((t, i) => (
                            <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-card border border-border rounded-lg text-[10px] sm:text-xs font-semibold text-foreground">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {item.id === "contact-form" && formData && setFormData && handleFormSubmit && (
                    <div className="w-full">
                      {formSubmitted ? (
                        <div className="text-center py-8 sm:py-10 flex flex-col items-center">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <h4 className="text-base sm:text-lg font-heading font-bold text-foreground">Inquiry Sent</h4>
                          <p className="text-xs text-muted-foreground max-w-sm mt-2 leading-relaxed">Ar. Anushka Khatri will review and reply within 24 hours.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <label htmlFor="sheet-name" className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Full Name / Studio</label>
                              <input type="text" id="sheet-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. AIA Studio" className="w-full bg-background border border-border/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans" />
                            </div>
                            <div>
                              <label htmlFor="sheet-email" className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Email</label>
                              <input type="email" id="sheet-email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="partner@studio.com" className="w-full bg-background border border-border/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="sheet-interest" className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Specialization</label>
                            <select id="sheet-interest" value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} className="w-full bg-background border border-border/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans">
                              <option value="universal">Universal / Inclusive Design</option>
                              <option value="prefab">Prefab Panel Construction</option>
                              <option value="urban">Urban & Spatial Planning</option>
                              <option value="interior">Experiential Interiors</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="sheet-msg" className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Brief</label>
                            <textarea id="sheet-msg" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Outline your project goals..." className="w-full bg-background border border-border/80 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans resize-none" />
                          </div>
                          <button type="submit" className="w-full text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold py-3 sm:py-3.5 rounded-xl cursor-pointer transition-all duration-300">
                            Submit Design Brief
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer attribution */}
            <div className="border-t border-border/40 px-4 sm:px-6 py-3 sm:py-4 text-center text-[9px] sm:text-[10px] font-mono text-muted-foreground/65">
              <span>© {new Date().getFullYear()} AR. ANUSHKA KHATRI — </span>
              <a href="https://anuditk.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">
                Developed by Anudit Khatri
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
