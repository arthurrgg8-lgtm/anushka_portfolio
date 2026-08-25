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
  metadataBase: new URL("https://anushkakhatri.com.np"),
  title: {
    default: "Ar. Anushka Khatri | Best Architect in Nepal | Residential, Commercial & Prefab Design",
    template: "%s | Ar. Anushka Khatri — Architect in Nepal",
  },
  description: "Ar. Anushka Khatri is a leading licensed architect (NEC Registered) in Kathmandu, Nepal. Specializing in contemporary residential design, sustainable prefabricated BELA Eco Panels, universal inclusive accessibility, commercial resorts, and interior architecture.",
  keywords: [
    "Best Architect in Nepal",
    "Best Architect in Kathmandu",
    "Top Architects Nepal",
    "Ar. Anushka Khatri",
    "Architect Anushka Khatri",
    "Licensed Architect Nepal NEC",
    "Residential Architect Kathmandu",
    "Commercial Architect Nepal",
    "Villa Design Chitwan",
    "Prefabricated Panel Construction Nepal",
    "BELA Eco Panels",
    "Modular Unit Architecture Nepal",
    "Universal Inclusive Design Nepal",
    "Accessible Architecture Nepal",
    "School for Visually Impaired Architecture",
    "Kathmandu Municipal Building Drawing Approval",
    "Contemporary House Design Nepal",
    "3 BHK Residential House Design",
    "Interior Architect Kathmandu"
  ],
  authors: [{ name: "Ar. Anushka Khatri", url: "https://anushkakhatri.com.np" }],
  creator: "Ar. Anushka Khatri",
  publisher: "Ar. Anushka Khatri",
  alternates: {
    canonical: "https://anushkakhatri.com.np",
  },
  openGraph: {
    title: "Ar. Anushka Khatri | Best Architect in Nepal — Contemporary & Prefab Design",
    description: "Designing human-centric, seismically resilient, and universally inclusive spaces in Nepal. View residential, commercial, prefab, and institutional portfolios.",
    url: "https://anushkakhatri.com.np",
    siteName: "Ar. Anushka Khatri Architectural Portfolio",
    images: [
      {
        url: "/projects/commercial/villa%20design%20at%20chitwan1.jpeg",
        width: 1600,
        height: 900,
        alt: "Architectural Portfolio of Ar. Anushka Khatri",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ar. Anushka Khatri | Leading Architect in Nepal",
    description: "Contemporary residential architecture, sustainable BELA Eco Panels, and universal inclusive design across Nepal.",
    images: ["/projects/commercial/villa%20design%20at%20chitwan1.jpeg"],
    creator: "@anushkakhatri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "NP-BA",
    "geo.placename": "Kathmandu, Nepal",
    "geo.position": "27.7172;85.3240",
    "ICBM": "27.7172, 85.3240",
    "DC.title": "Ar. Anushka Khatri — Leading Architect in Nepal",
    "DC.creator": "Ar. Anushka Khatri",
    "DC.coverage": "Nepal",
    "DC.subject": "Architectural Design, Residential Houses, Prefabricated Panels, Universal Design, Nepal Architecture",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://anushkakhatri.com.np/#person",
      "name": "Ar. Anushka Khatri",
      "alternateName": ["Anushka Khatri", "Architect Anushka Khatri"],
      "jobTitle": "Lead Architect & Spatial Designer",
      "description": "Licensed Architect (Nepal Engineering Council) in Kathmandu, Nepal, specializing in contemporary residential architecture, universal inclusive design, and prefabricated BELA Eco Panel systems.",
      "url": "https://anushkakhatri.com.np",
      "image": "https://anushkakhatri.com.np/projects/commercial/villa%20design%20at%20chitwan1.jpeg",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Purbanchal University",
        "sameAs": "https://puexam.edu.np"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Architecture (B.Arch)"
      },
      "knowsAbout": [
        "Architectural Design",
        "Contemporary Residential Architecture",
        "Universal & Inclusive Design",
        "Prefabricated Panel Construction",
        "BELA Eco Panels",
        "Commercial & Resort Architecture",
        "Seismic Resilient Design",
        "Kathmandu Municipal Building Code & Approvals",
        "3D Elevation Modeling & V-Ray",
        "Interior Architecture"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "addressCountry": "NP"
      }
    },
    {
      "@type": ["ProfessionalService", "Architect"],
      "@id": "https://anushkakhatri.com.np/#organization",
      "name": "Ar. Anushka Khatri — Architectural & Engineering Design",
      "url": "https://anushkakhatri.com.np",
      "logo": "https://anushkakhatri.com.np/icon.jpeg",
      "image": "https://anushkakhatri.com.np/projects/commercial/villa%20design%20at%20chitwan1.jpeg",
      "telephone": "+977-9861288860",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kathmandu Valley",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "postalCode": "44600",
        "addressCountry": "NP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.7172,
        "longitude": 85.3240
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "areaServed": [
        { "@type": "City", "name": "Kathmandu" },
        { "@type": "City", "name": "Lalitpur" },
        { "@type": "City", "name": "Bhaktapur" },
        { "@type": "City", "name": "Pokhara" },
        { "@type": "City", "name": "Chitwan" },
        { "@type": "City", "name": "Dhulikhel" },
        { "@type": "City", "name": "Dhanusha" },
        { "@type": "Country", "name": "Nepal" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Architectural & Interior Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Residential House Design & Municipal Approvals",
              "description": "Tailored architectural planning, 3D elevation renders, structural coordination, and municipal permit documentation across Kathmandu and Nepal."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Prefabricated Panel & Steel Modular Construction (BELA Eco Panels)",
              "description": "Fast-track, lightweight, seismic-resistant prefabricated modular units and infill wall panel architecture."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Universal & Inclusive Accessibility Spatial Architecture",
              "description": "Multi-sensory wayfinding, zero-threshold transitions, and ergonomic spatial environments designed for universal human dignity."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Resort & Villa Masterplanning",
              "description": "Landscape-integrated hospitality villas, portable eco-resort cabins, and mixed-use commercial developments."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Complete Interior Architecture & 3D Spatial Renders",
              "description": "Systematic ACD drawings, lighting design, custom cabinetry, and tactile material composition."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://anushkakhatri.com.np/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is the best architect for residential and prefabricated house design in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ar. Anushka Khatri is a licensed architect (NEC Registered) recognized for contemporary residential architecture, innovative BELA Eco Panel prefabricated systems, and human-centric universal inclusive design in Kathmandu and across Nepal."
          }
        },
        {
          "@type": "Question",
          "name": "What services does Ar. Anushka Khatri provide in Nepal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Services include full architectural concept design, 3D visualization (SketchUp & V-Ray), structural drafting, municipal drawing approvals, prefabricated panel system detailing, commercial resort planning, and comprehensive interior architecture."
          }
        },
        {
          "@type": "Question",
          "name": "What are the advantages of BELA Eco Panels in modern Nepalese construction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BELA Eco Panels (75mm x 610mm x 2700mm) reduce structural dead weight, speed up construction to under 3 weeks, provide superior seismic safety, enhance thermal insulation, and cut material waste by up to 40% compared to traditional brick masonry."
          }
        },
        {
          "@type": "Question",
          "name": "How do I consult with Ar. Anushka Khatri for a design project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Ar. Anushka Khatri directly through the official portfolio website at https://anushkakhatri.com.np using the integrated Architectural Brief Generator or via WhatsApp at +977 9861288860."
          }
        }
      ]
    }
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground relative overflow-x-hidden">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={true}
        >
          {/* High-end architectural watermark drafting sheet theme background */}
          <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden transition-opacity duration-300">
            {/* Major grid lines pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_0.75px,transparent_0.75px),linear-gradient(to_bottom,var(--grid-line)_0.75px,transparent_0.75px)] bg-[size:120px_120px] bg-center opacity-[0.95] dark:opacity-[0.88]" />

            {/* Inset Technical Border / Drafting Sheet Margins */}
            <div className="absolute inset-2 md:inset-5 border border-primary/[0.55] dark:border-primary/[0.60] transition-colors duration-300">
              {/* Corner crosshairs */}
              <div className="absolute -top-2 md:-top-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-4 md:w-6 h-[0.5px] bg-current" />
                <span className="absolute h-4 md:h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-4 md:w-6 h-[0.5px] bg-current" />
                <span className="absolute h-4 md:h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-4 md:w-6 h-[0.5px] bg-current" />
                <span className="absolute h-4 md:h-6 w-[0.5px] bg-current" />
              </div>
              <div className="absolute -bottom-2 md:-bottom-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 flex items-center justify-center text-primary/[0.72] dark:text-primary/[0.80]">
                <span className="absolute w-4 md:w-6 h-[0.5px] bg-current" />
                <span className="absolute h-4 md:h-6 w-[0.5px] bg-current" />
              </div>

              {/* Technical annotations running along the borders */}
              <div className="absolute top-1 md:top-2 left-2 md:left-4 text-[5px] sm:text-[6px] md:text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none truncate max-w-[48vw] md:max-w-none">
                PROJECT: PORTFOLIO // AR. ANUSHKA KHATRI
              </div>
              <div className="absolute top-1 md:top-2 right-2 md:right-4 text-[5px] sm:text-[6px] md:text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none truncate max-w-[42vw] md:max-w-none text-right">
                SHEET REF: A-001 // NEC-94879
              </div>
              <div className="absolute bottom-1 md:bottom-2 left-2 md:left-4 text-[5px] sm:text-[6px] md:text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none truncate max-w-[48vw] md:max-w-none">
                SYSTEMS: EARTH + CONCRETE // VER. PREFAB TIMBER
              </div>
              <div className="absolute bottom-1 md:bottom-2 right-2 md:right-4 text-[5px] sm:text-[6px] md:text-[8px] font-mono tracking-widest text-primary/95 dark:text-primary/90 uppercase select-none truncate max-w-[42vw] md:max-w-none text-right">
                STATUS: SCHEMATIC DESIGN // R-2026.05
              </div>

              {/* Centered ruler markings along the frame */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 gap-3 sm:gap-6 md:gap-10 text-[4px] sm:text-[5px] md:text-[7px] font-mono text-primary/88 dark:text-primary/82 select-none flex">
                <span className="hidden sm:inline">-400</span><span>-200</span><span>0</span><span>200</span><span className="hidden sm:inline">400</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 gap-3 sm:gap-6 md:gap-10 text-[4px] sm:text-[5px] md:text-[7px] font-mono text-primary/88 dark:text-primary/82 select-none flex">
                <span className="hidden sm:inline">-400</span><span>-200</span><span>0</span><span>200</span><span className="hidden sm:inline">400</span>
              </div>
            </div>

            {/* Large rotating compass/drafting element */}
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
            
            {/* Additional static watermark blueprint detail in lower left */}
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

            {/* Additional static watermark structural detail in lower right */}
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

