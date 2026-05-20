"use client";

import { Navigation } from "@/components/navigation";
import { ArrowLeft, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  tag: string;
  category: string;
}

const ARTICLES: Article[] = [
  {
    id: "bela-panels",
    title: "Prefabrication & Sustainability: Prefabricated Panel Systems in Modern Nepal",
    excerpt: "Exploring the real-world transition from traditional heavy brick masonry to eco-friendly, fast, and thermally regulated panel infill wall systems, inspired by practical site coordination at Bela Nepal Industries.",
    date: "May 12, 2026",
    readTime: "6 min read",
    tag: "Construction Tech",
    category: "Sustainable Detailing",
    content: [
      "Traditional construction in the Kathmandu Valley has long relied on brick masonry. While culturally rich, traditional brick construction is slow, carries high material waste, and exhibits poor thermal performance. During my time working with Bela Nepal Industries, I saw a practical solution: semi-prefabricated lightweight wall panels.",
      "Instead of building walls brick-by-brick on-site, prefabricated infill wall panels are manufactured in controlled factory settings, brought to the building site, aligned, fixed to the concrete columns and beams, and finished with clean detailing. This method reduces structural dead weight and slashes material waste by up to 40%.",
      "But most importantly, this system addresses a fundamental humanitarian belief: everyone deserves a sustainable, safe, and affordable home. Lightweight panels offer superior seismic flexibility and built-in insulation pockets, making modern green home construction affordable for rapidly urbanizing centers in Nepal."
    ]
  },
  {
    id: "yes-is-more",
    title: "Pragmatic Utopianism: Applying Bjarke Ingels' 'Yes is More' in Asymmetric Spaces",
    excerpt: "How turning structural, ecological, and universal access limitations into spatial advantages redefines conceptual design thinking, rather than fighting code compliance.",
    date: "April 28, 2026",
    readTime: "4 min read",
    tag: "Design Philosophy",
    category: "Conceptual Spatial Planning",
    content: [
      "Bjarke Ingels Group (BIG) popularized the concept of 'Pragmatic Utopianism'—the idea that buildings can blend imaginative utopian ideals with highly practical, buildable solutions. At its core is the motto: 'Yes is More'—turning architectural barriers (like strict accessibility rules or irregular site shapes) into the design's biggest highlights.",
      "As an architect focused on Universal and Inclusive Design, I apply this philosophy constantly. Universal design guidelines (like standard 1:12 ramp slopes or wide door clearances) are often treated by developers as annoying compliance boxes that ruin clean layouts. But by saying 'Yes' to these constraints, we can design dramatic sloped circulations that shape the building's entire form, creating beautiful, flowing paths for everyone.",
      "By welcoming limitations rather than resisting them, architecture moves away from dry aesthetic copycats and becomes a living, functional environment that tells a meaningful story of inclusivity."
    ]
  }
];

export default function Journal() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold font-sans hover:translate-x-[-4px] transition-transform duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>

          {/* Header section */}
          <div className="border-b border-border/40 pb-8 mb-12">
            <span className="text-xs uppercase tracking-widest bg-primary/10 text-primary font-bold px-3 py-1 rounded-full font-sans">
              Insights & Editorial
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-4">
              Architectural Journal
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl font-sans leading-relaxed">
              Research essays and site logs investigating construction prefabrication, spatial accessibility standards, and modern vernacular aesthetics in the built environment.
            </p>
          </div>

          {/* Articles list */}
          <div className="space-y-12">
            {ARTICLES.map((article) => (
              <article 
                key={article.id}
                className="bg-card/40 border border-border/60 rounded-2xl p-6 sm:p-8 hover:border-primary/40 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span>{article.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    <Tag className="w-3 h-3" />
                    <span>{article.tag}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>
                
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed font-sans border-l-2 border-border/40 pl-4 italic">
                  {article.excerpt}
                </p>

                <div className="mt-6 space-y-4 text-sm text-foreground/95 leading-relaxed font-sans">
                  {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Footer notes */}
                <div className="mt-8 border-t border-border/30 pt-4 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                  <span>CATEGORY: {article.category.toUpperCase()}</span>
                  <span>BY AR. ANUSHKA KHATRI</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
