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
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

