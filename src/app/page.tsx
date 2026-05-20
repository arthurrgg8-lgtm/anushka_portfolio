"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { MaterialBoard } from "@/components/material-board";
import { 
  ArrowDown, 
  Download, 
  MapPin, 
  Layers, 
  Compass, 
  Home as HomeIcon, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  Info,
  CheckCircle,
  FileDown
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero-sec");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", sector: "universal" });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      const sections = ["hero-sec", "projects-sec", "about-sec", "capabilities-sec", "materials-sec", "contact-sec"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "", sector: "universal" });
      }, 5000);
    }
  };

  return (
    <>
      <Navigation />
      
      {/* Scroll Indicator dots on right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {[
          { id: "hero-sec", label: "Home" },
          { id: "projects-sec", label: "Projects" },
          { id: "about-sec", label: "About" },
          { id: "capabilities-sec", label: "Capabilities" },
          { id: "materials-sec", label: "Materials" },
          { id: "contact-sec", label: "Contact" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleScrollTo(item.id)}
            className="group flex items-center justify-end gap-3 cursor-pointer"
            aria-label={`Scroll to ${item.label}`}
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-widest text-primary font-bold font-mono transition-opacity duration-300">
              {item.label}
            </span>
            <span className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              activeSection === item.id 
                ? "bg-primary border-primary scale-125" 
                : "bg-background border-border/80 group-hover:border-primary"
            }`} />
          </button>
        ))}
      </div>

      <main className="snap-container">
        
        {/* SECTION 1: HERO/LANDING */}
        <section id="hero-sec" className="snap-section flex flex-col justify-center items-center relative px-6 overflow-hidden">
          {/* Subtle architectural vector mesh background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonal-shading" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="1" />
                  <circle cx="30" cy="30" r="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonal-shading)" />
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
            {/* Tagline Badge */}
            <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary font-bold px-3 py-1 rounded-full mb-6 font-sans">
              Vernacular Modernism & Universal Design
            </span>
            
            {/* Main Name */}
            <h1 className="text-5xl md:text-8xl font-heading font-semibold text-foreground tracking-tight leading-tight select-all">
              AR. ANUSHKA KHATRI
            </h1>
            
            {/*Tagline */}
            <p className="text-lg md:text-2xl font-heading font-medium text-foreground mt-4 italic max-w-2xl">
              "Designing spaces that speak through emotion, experience & purpose."
            </p>
            
            {/* Short Bio Snippet */}
            <p className="text-sm md:text-base text-muted-foreground font-sans max-w-xl mt-6 leading-relaxed">
              Architect passionate about creating meaningful, human-centric, and inclusive spaces through intuitive storytelling, construction technologies, and vernacular sustainability.
            </p>

            {/* Quick CTAs */}
            <div className="flex gap-4 mt-8 flex-col sm:flex-row">
              <button 
                onClick={() => handleScrollTo("projects-sec")}
                className="text-xs uppercase tracking-wider bg-primary hover:bg-primary/95 text-primary-foreground font-sans font-bold px-6 py-3.5 rounded-full cursor-pointer hover:shadow-md hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Works</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleScrollTo("about-sec")}
                className="text-xs uppercase tracking-wider border border-border bg-card/50 hover:bg-muted text-foreground font-sans font-semibold px-6 py-3.5 rounded-full cursor-pointer hover:scale-103 active:scale-97 transition-all duration-300 flex items-center gap-2"
              >
                <span>Read Profile</span>
              </button>
            </div>
          </div>

          {/* Floating snap scroll hint */}
          <button 
            onClick={() => handleScrollTo("projects-sec")}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300 animate-bounce"
            aria-label="Scroll down"
          >
            <span className="text-[9px] uppercase tracking-widest font-mono">Swipe or Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 2: PROJECTS ZONE (TIKTOK SNAP FEED) */}
        <section id="projects-sec" className="snap-section flex flex-col justify-center items-center relative px-4 sm:px-6 bg-muted/20">
          <div className="w-full max-w-5xl my-auto py-12">
            <BeforeAfterSlider />
          </div>
          
          <button 
            onClick={() => handleScrollTo("about-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 3: ABOUT & CREDENTIALS */}
        <section id="about-sec" className="snap-section flex flex-col justify-center items-center relative px-6">
          <div className="max-w-4xl mx-auto my-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-12">
            
            {/* Left Side: Text Details */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                Identity & Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-1 mb-4">
                Designing Narratives & Spatial Experiences
              </h2>
              
              <div className="space-y-4 text-sm text-muted-foreground font-sans leading-relaxed">
                <p>
                  As a working architect, I believe architecture should go far beyond plain aesthetics. Built forms are stories waiting to be told — they shape the way people feel, move, and connect within a space.
                </p>
                <p>
                  My experience in the **panel construction and design industry** (specifically at Bela Nepal Industries) has given me strong site coordination exposure and a practical understanding of translating complex architectural details into rapid, sustainable, and affordable prefab wall panels.
                </p>
                <p>
                  Inspired by Bjarke Ingels' pragmatic utopianism, I value strong conceptual imagination grounded in site feasibility, universal accessibility, and rich sensory interaction.
                </p>
              </div>

              {/* CV Download Trigger */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href="/home/lazzy/Desktop/AnuditCV.pdf"
                  download="Ar_Anushka_Khatri_CV.pdf"
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground font-sans font-semibold px-5 py-3 rounded-full cursor-pointer hover:scale-102 active:scale-98 transition-all duration-300 shadow-sm"
                >
                  <FileDown className="w-4 h-4 text-primary" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </div>
            </div>

            {/* Right Side: Digital License Seal and Info Box */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              {/* Custom SVG NEC License Digital Badge */}
              <div className="relative w-64 h-64 bg-card rounded-2xl border border-border/80 shadow-md p-6 flex flex-col items-center justify-between text-center select-none group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center relative bg-muted/30">
                  {/* Rotating seal border */}
                  <svg className="absolute inset-0 w-full h-full text-primary opacity-60 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                    <path d="M 50 10 A 40 40 0 1 1 49.9 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                  </svg>
                  <Compass className="w-8 h-8 text-primary" />
                </div>

                <div className="mt-4">
                  <span className="text-[9px] uppercase tracking-widest text-primary font-bold font-mono">
                    Official Certification
                  </span>
                  <h4 className="text-base font-heading font-bold text-foreground mt-1 leading-tight">
                    AR. REGISTERED LICENSE
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">
                    Nepal Engineering Council (NEC)
                  </p>
                </div>

                <div className="w-full bg-background border border-border/60 py-2.5 rounded-lg text-[10px] sm:text-xs font-mono font-semibold text-primary mt-2 flex flex-col gap-0.5">
                  <div>STATUS: REGISTERED ARCHITECT</div>
                  <div className="text-[8px] sm:text-[9px] opacity-75">NEC REG NO: 94879</div>
                </div>
              </div>
            </div>
            
          </div>

          <button 
            onClick={() => handleScrollTo("capabilities-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 4: CAPABILITIES & TOOLBOX */}
        <section id="capabilities-sec" className="snap-section flex flex-col justify-center items-center relative px-6 bg-muted/10">
          <div className="max-w-4xl mx-auto my-auto w-full py-12">
            
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                Core Specializations
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-1">
                Technical Strengths & Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Sector 1 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Universal / Inclusive Design
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Core design focus. Shaping spatial boundaries that welcome all human bodies equally — optimizing ramps, door clearances, level thresholds, and tactile path circulations.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: ACCESSIBILITY
                </div>
              </div>

              {/* Sector 2 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Urban Design & Circulation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Detailed site analysis, user movement mapping, and public plaza structures. Synthesizing urban infrastructure with community storytelling.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: SPATIAL FLOW
                </div>
              </div>

              {/* Sector 3 */}
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/60 shadow-sm flex flex-col justify-between group hover:border-primary/50 transition-colors duration-300">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Experiential Interiors
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Crafting volumetric depth and tactile details using wood, brass accents, and Lokta paper. Manipulating lighting filters for soothing ambient atmospheres.
                  </p>
                </div>
                <div className="border-t border-border/40 pt-4 mt-6 text-[10px] font-mono text-primary font-bold">
                  FOCUS AREA: SENSORY DEPTH
                </div>
              </div>

            </div>

            {/* Interactive Toolbox Grid */}
            <div className="mt-10 bg-card/35 rounded-xl border border-border/40 p-6">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-center mb-4 font-sans">
                Professional Toolkit & Software Systems
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "AutoCAD", usage: "Drafting" },
                  { name: "SketchUp", usage: "3D Modeling" },
                  { name: "Lumion", usage: "Visualization" },
                  { name: "V-Ray", usage: "Renders" },
                  { name: "Enscape", usage: "Real-time" },
                  { name: "Photoshop", usage: "Post-prod" },
                  { name: "InDesign", usage: "Editorial Layout" }
                ].map((tool, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-background border border-border/60 rounded-lg text-xs font-semibold text-foreground font-sans shadow-sm flex items-center gap-2 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{tool.name}</span>
                    <span className="text-[9px] text-muted-foreground/75 font-mono ml-1 font-normal bg-muted px-1.5 py-0.5 rounded">
                      {tool.usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <button 
            onClick={() => handleScrollTo("materials-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 5: MATERIAL BOARD (EASTER EGG) */}
        <section id="materials-sec" className="snap-section flex flex-col justify-center items-center relative px-6">
          <div className="w-full max-w-5xl my-auto py-12">
            <MaterialBoard />
          </div>
          
          <button 
            onClick={() => handleScrollTo("contact-sec")}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* SECTION 6: CONTACT & INQUIRY FORM */}
        <section id="contact-sec" className="snap-section flex flex-col justify-center items-center relative px-6 bg-muted/20">
          
          <div className="max-w-4xl mx-auto my-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 py-12 items-stretch">
            
            {/* Left side info channels */}
            <div className="md:col-span-5 flex flex-col justify-between bg-card/50 rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold font-sans">
                  Collaboration Hub
                </span>
                <h3 className="text-2xl font-heading font-bold text-foreground mt-1 mb-4">
                  Initiate a Spatial Project
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-6">
                  Seeking design consults, professional collaboration, universal accessibility audits, or prefabricated panel implementation details? Reach out directly.
                </p>

                <div className="space-y-4">
                  <a 
                    href="mailto:Anushkakhatri004@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 text-xs font-sans font-medium text-foreground hover:border-primary/40 transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Anushkakhatri004@gmail.com</span>
                  </a>
                  <a 
                    href="tel:+9779861288860"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/60 text-xs font-sans font-medium text-foreground hover:border-primary/40 transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+977 9861288860</span>
                  </a>
                </div>
              </div>

              {/* Social Link grids */}
              <div className="border-t border-border/40 pt-6 mt-6">
                <span className="block text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3 font-sans">
                  Professional Networks
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "LinkedIn", href: "https://linkedin.com" },
                    { name: "Behance", href: "https://behance.net" },
                    { name: "Pinterest", href: "https://pinterest.com" },
                    { name: "Instagram", href: "https://instagram.com" }
                  ].map((network, index) => (
                    <a
                      key={index}
                      href={network.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-background/40 hover:bg-background border border-border/50 text-[11px] font-sans text-muted-foreground hover:text-primary transition-all duration-300"
                    >
                      <span>{network.name}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground/65" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right side contact form */}
            <div className="md:col-span-7 bg-card/75 backdrop-blur-md rounded-2xl border border-border/80 p-6 sm:p-8 shadow-sm flex flex-col justify-center">
              {formSubmitted ? (
                <div className="text-center py-8 flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-foreground">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mt-2 font-sans">
                    Thank you, Ar. Anushka Khatri will review your parameters and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                        Full Name / Studio
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Cengage / AIA Studio"
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email-input"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. partner@studio.com"
                        className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sector-select" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                      Specialization Interest
                    </label>
                    <select
                      id="sector-select"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans"
                    >
                      <option value="universal">Universal / Inclusive Design Auditing</option>
                      <option value="prefab">Prefab Panel Construction detailing</option>
                      <option value="urban">Urban & Spatial Planning</option>
                      <option value="interior">Experiential Interiors</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="msg-input" className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 font-sans">
                      Inquiry Narrative / Brief
                    </label>
                    <textarea
                      id="msg-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your project dimensions, site limitations, or collaboration goals..."
                      className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/80 transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-bold py-3.5 rounded-xl cursor-pointer hover:shadow-sm hover:scale-101 active:scale-99 transition-all duration-300"
                  >
                    Submit Design Brief
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Footer baseline */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-mono text-muted-foreground/65">
            © {new Date().getFullYear()} AR. ANUSHKA KHATRI. ALL RIGHTS REGISTERED (NEC).
          </div>
        </section>

      </main>
    </>
  );
}
