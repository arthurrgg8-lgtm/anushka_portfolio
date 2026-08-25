import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architectural Journal & Practice Logs | Ar. Anushka Khatri",
  description: "Read research essays, construction site logs on BELA Eco Panels, universal accessibility guidelines, and architectural practice by Ar. Anushka Khatri in Kathmandu, Nepal.",
  alternates: {
    canonical: "https://anushkakhatri.com.np/journal",
  },
  openGraph: {
    title: "Architectural Journal & Practice Logs | Ar. Anushka Khatri",
    description: "Research essays on prefabricated panel systems, inclusive architecture, and design theory by Ar. Anushka Khatri.",
    url: "https://anushkakhatri.com.np/journal",
  },
};

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
