import Hero from "@/components/Hero";
import VideoGallery from "@/components/VideoGallery";
import DogShowcase from "@/components/DogShowcase";
import LineageOverview from "@/components/LineageOverview";
import TierPreview from "@/components/TierPreview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import siteData from "@/data/site-data.json";

export default function Home() {
  const d = siteData;

  return (
    <>
      <Hero data={d.hero} />
      <div className="section-divider mx-auto max-w-5xl" />
      <VideoGallery data={d.videoGallery} />
      <div className="section-divider mx-auto max-w-5xl" />
      <DogShowcase data={d.topDogs} />
      <div className="section-divider mx-auto max-w-5xl" />
      <LineageOverview data={d.lineage} />
      <div className="section-divider mx-auto max-w-5xl" />
      <TierPreview data={d.tiers} />
      <div className="section-divider mx-auto max-w-5xl" />
      <Testimonials data={d.testimonials} />
      <div className="section-divider mx-auto max-w-5xl" />
      <FAQ data={d.faq} />
      <Contact data={{
        name: d.site.name,
        tagline: d.site.tagline,
        location: d.site.location,
        contact: d.site.contact,
        social: d.site.social,
      }} />
      <Footer
        data={d.footer}
        social={d.site.social}
        location={d.site.location}
      />
    </>
  );
}
