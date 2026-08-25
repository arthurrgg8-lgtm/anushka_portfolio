import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School for Visually Impaired — Multi-Sensory Design Thesis | Ar. Anushka Khatri",
  description: "Award-winning B.Arch thesis project presenting an architectural framework for visually impaired users using tactile, acoustic, and olfactory spatial wayfinding.",
  alternates: {
    canonical: "https://anushkakhatri.com.np/thesis",
  },
  openGraph: {
    title: "School for Visually Impaired — Multi-Sensory Design Thesis | Ar. Anushka Khatri",
    description: "Tri-sensory architecture replacing visual wayfinding with acoustic echolocation, tactile paving, and olfactory zoning.",
    url: "https://anushkakhatri.com.np/thesis",
  },
};

export default function ThesisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
