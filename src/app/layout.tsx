import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AR. ANUSHKA KHATRI | Architectural Portfolio",
  description: "Architectural & Engineering Portfolio of Ar. Anushka Khatri. Designing meaningful, inclusive, and human-centric spaces that connect people, emotion, and experience.",
  keywords: ["Anushka Khatri", "Architecture Portfolio", "Inclusive Design", "Universal Design", "Vernacular Architecture", "Nepal Architect", "Bela Prefab Panels"],
  authors: [{ name: "Ar. Anushka Khatri" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={true}
        >
          {/* High-end architectural watermark drafting sheet theme background */}
          <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-opacity duration-300">
            {/* 1. Fine dot grid pattern in background */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--grid-dot)_1.2px,transparent_1.2px)] bg-[size:24px_24px] bg-center opacity-[1.0] dark:opacity-[0.95]" />
            
            {/* 2. Major grid lines pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_0.75px,transparent_0.75px),linear-gradient(to_bottom,var(--grid-line)_0.75px,transparent_0.75px)] bg-[size:120px_120px] bg-center opacity-[0.95] dark:opacity-[0.88]" />

            {/* 3. Inset Technical Border / Drafting Sheet Margins */}
            <div className="absolute inset-6 border border-primary/[0.55] dark:border-primary/[0.60] transition-colors duration-300">
              {/* Corner crosshairs */}
              <div className="absolute -top-3 -left-3 w-6 h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-6 h-[0.5px] bg-current" />
                <span className="absolute h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -top-3 -right-3 w-6 h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-6 h-[0.5px] bg-current" />
                <span className="absolute h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-6 h-[0.5px] bg-current" />
                <span className="absolute h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-6 h-[0.5px] bg-current" />
                <span className="absolute h-6 w-[0.5px] bg-current" />
              </div>

              {/* Technical annotations running along the borders (faded but readable monospace details) */}
              <div className="absolute top-2 left-4 text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none">
                PROJECT: PORTFOLIO // AR. ANUSHKA KHATRI // KATHMANDU, NEPAL
              </div>
              <div className="absolute top-2 right-4 text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none">
                SHEET REF: A-001 // REG: NEC-94879 // 27°42'N 85°19'E
              </div>
              <div className="absolute bottom-2 left-4 text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none">
                SYSTEMS: EARTH + CONCRETE // VER. PREFAB TIMBER
              </div>
              <div className="absolute bottom-2 right-4 text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none">
                STATUS: SCHEMATIC DESIGN // R-2026.05
              </div>

              {/* Centered ruler markings along the frame */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-10 text-[7px] font-mono text-primary/88 dark:text-primary/82 select-none">
                <span>-500</span><span>-400</span><span>-300</span><span>-200</span><span>-100</span><span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-10 text-[7px] font-mono text-primary/88 dark:text-primary/82 select-none">
                <span>-500</span><span>-400</span><span>-300</span><span>-200</span><span>-100</span><span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span>
              </div>
            </div>

            {/* 4. Large rotating compass/drafting element (increased opacity, refined color) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.45] dark:opacity-[0.42] text-primary transition-opacity duration-300">
              <svg 
                className="w-[120vh] h-[120vh] max-w-none animate-[spin_360s_linear_infinite]" 
                viewBox="0 0 1000 1000" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.75" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer compass lines */}
                <circle cx="500" cy="500" r="450" strokeDasharray="2,6" />
                <circle cx="500" cy="500" r="400" />
                <circle cx="500" cy="500" r="300" strokeDasharray="8,8" />
                <circle cx="500" cy="500" r="200" />
                <circle cx="500" cy="500" r="100" strokeDasharray="3,3" />
                <circle cx="500" cy="500" r="6" fill="currentColor" />
                
                {/* Axis crosshairs */}
                <line x1="50" y1="500" x2="950" y2="500" />
                <line x1="500" y1="50" x2="500" y2="950" />
                
                {/* Diagonal drafting dividers */}
                <line x1="182" y1="182" x2="818" y2="818" strokeDasharray="4,4" />
                <line x1="818" y1="182" x2="182" y2="818" strokeDasharray="4,4" />
                
                {/* Abstract floor plans / layout grids */}
                <rect x="180" y="180" width="120" height="120" />
                <line x1="180" y1="240" x2="300" y2="240" />
                <line x1="240" y1="180" x2="240" y2="300" />
                <circle cx="240" cy="240" r="30" strokeDasharray="2,2" />
                
                <rect x="700" y="180" width="120" height="120" />
                <circle cx="760" cy="240" r="45" />
                <line x1="700" y1="180" x2="820" y2="300" />
                
                {/* Traditional Nepalese pagoda roof outline */}
                <path d="M 320 800 L 500 660 L 680 800 Z" strokeWidth="1.5" />
                <path d="M 350 780 L 500 680 L 650 780 Z" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="320" y1="800" x2="680" y2="800" strokeWidth="1.5" />
                
                {/* Dynamic measuring curves */}
                <path d="M 250 500 A 250 250 0 0 1 500 250" strokeDasharray="1,5" />
                <path d="M 750 500 A 250 250 0 0 1 500 750" strokeDasharray="1,5" />
              </svg>
            </div>
            
            {/* 5. Additional static watermark blueprint detail in lower left */}
            <div className="absolute bottom-20 left-20 w-64 h-64 opacity-[0.38] dark:opacity-[0.34] text-primary select-none hidden lg:block transition-opacity duration-300">
              {/* Custom Blueprint Drawing of a Newari Window Timber Frame */}
              <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75" xmlns="http://www.w3.org/2000/svg">
                {/* Traditional Window Outlines */}
                <rect x="30" y="30" width="140" height="140" />
                <rect x="40" y="40" width="120" height="120" />
                <rect x="55" y="55" width="90" height="90" />
                
                {/* Diagonal timber braces */}
                <line x1="30" y1="30" x2="170" y2="170" strokeDasharray="1,3" />
                <line x1="170" y1="30" x2="30" y2="170" strokeDasharray="1,3" />
                
                {/* Circular central carving guide */}
                <circle cx="100" cy="100" r="30" />
                <circle cx="100" cy="100" r="10" strokeDasharray="2,2" />
                
                {/* Lattice lines */}
                <line x1="100" y1="40" x2="100" y2="160" />
                <line x1="40" y1="100" x2="160" y2="100" />
                
                {/* Structural joint details */}
                <circle cx="40" cy="40" r="3" fill="currentColor" />
                <circle cx="160" cy="40" r="3" fill="currentColor" />
                <circle cx="40" cy="160" r="3" fill="currentColor" />
                <circle cx="160" cy="160" r="3" fill="currentColor" />
                
                <text x="35" y="24" className="text-[6.5px] font-mono fill-current font-semibold tracking-wider uppercase">DWG: DETAIL-04 (NEWARI LATTICE)</text>
              </svg>
            </div>

            {/* 6. Additional static watermark structural detail in lower right */}
            <div className="absolute top-32 right-20 w-64 h-64 opacity-[0.36] dark:opacity-[0.30] text-primary select-none hidden xl:block transition-opacity duration-300">
              {/* Custom Structural Detail (Tension Joint) */}
              <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.75" xmlns="http://www.w3.org/2000/svg">
                {/* Rafter and column connection */}
                <rect x="80" y="20" width="40" height="160" strokeDasharray="2,2" />
                <path d="M 20 80 L 180 80 L 180 120 L 20 120 Z" />
                <line x1="80" y1="80" x2="120" y2="120" />
                <line x1="120" y1="80" x2="80" y2="120" />
                
                {/* Dimensions */}
                <line x1="20" y1="70" x2="180" y2="70" strokeWidth="0.5" />
                <line x1="20" y1="65" x2="20" y2="75" strokeWidth="0.5" />
                <line x1="180" y1="65" x2="180" y2="75" strokeWidth="0.5" />
                <text x="88" y="61" className="text-[6.5px] font-mono fill-current font-semibold">1600mm [TYP]</text>
                
                <line x1="70" y1="20" x2="70" y2="180" strokeWidth="0.5" />
                <line x1="65" y1="20" x2="75" y2="20" strokeWidth="0.5" />
                <line x1="65" y1="180" x2="75" y2="180" strokeWidth="0.5" />
                <text x="36" y="105" className="text-[6.5px] font-mono fill-current font-semibold" transform="rotate(-90 36 105)">2000mm [VAR]</text>
                
                <text x="110" y="145" className="text-[6.5px] font-mono fill-current font-semibold tracking-wider uppercase">DWG: PANEL JOINT DETAILS</text>
              </svg>
            </div>
          </div>

          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

