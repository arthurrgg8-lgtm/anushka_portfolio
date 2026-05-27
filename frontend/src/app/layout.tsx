import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhotey Kukur — Premium Himalayan Mastiff Breeder",
  description:
    "Preserving the legacy of Nepal's royal guardian. Champion-lineage Himalayan Mastiffs bred for excellence in Kathmandu, Nepal.",
  keywords: [
    "Himalayan Mastiff",
    "Bhotey Kukur",
    "Nepal dog breeder",
    "Tibetan Mastiff Nepal",
    "premium puppies",
    "champion lineage dogs",
  ],
  metadataBase: new URL("https://bhoteykukur.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo_favicon.png",
    apple: "/images/logo_favicon.png",
    shortcut: "/images/logo_favicon.png",
  },
  openGraph: {
    title: "Bhotey Kukur — Premium Himalayan Mastiff Breeder",
    description:
      "Preserving the legacy of Nepal's royal guardian. Champion-lineage Himalayan Mastiffs bred for excellence.",
    url: "https://bhoteykukur.com",
    siteName: "Bhotey Kukur",
    images: [
      {
        url: "/images/Gemini_Generated_Image_9x1otc9x1otc9x1o.png",
        width: 1200,
        height: 630,
        alt: "Himalayan Mastiff — Bhotey Kukur",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhotey Kukur — Premium Himalayan Mastiff Breeder",
    description: "Preserving the legacy of Nepal's royal guardian. Champion-lineage Himalayan Mastiffs.",
    images: ["/images/Gemini_Generated_Image_9x1otc9x1otc9x1o.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash — inline script sets class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('bhotey-theme');
                  if (!t) {
                    t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  }
                  if (t === 'light') document.documentElement.classList.add('light');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col bg-primary text-text-primary antialiased transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
