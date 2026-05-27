import Link from "next/link";
import Image from "next/image";

interface FooterData {
  description: string;
  quickLinks: Array<{ text: string; link: string }>;
  copyright: string;
}

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  googleMaps?: string;
}

export default function Footer({
  data,
  social,
  location,
}: {
  data: FooterData;
  social?: SocialLinks;
  location?: string;
}) {
  return (
    <footer className="relative border-t border-border bg-primary/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full border-2 border-secondary/70 bg-cream ring-2 ring-secondary/30 shadow-lg shadow-secondary/20">
                <div className="absolute inset-[3px] overflow-hidden rounded-full">
                  <Image
                    src="/images/logo_favicon.png"
                    alt="Bhotey Kukur"
                    fill
                    className="object-cover"
                    sizes="34px"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-text-primary uppercase">
                  Bhotey Kukur
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">
                  Himalayan Mastiff
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary max-w-sm">
              {data.description}
            </p>
            {location && (
              <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                <svg className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {data.quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.link}
                    className="text-sm text-text-secondary hover:text-secondary transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-secondary uppercase mb-5">
              Connect
            </h4>
            <div className="flex gap-3 flex-wrap">
              {social?.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .56.04.84.11v-3.5a6.37 6.37 0 00-.84-.05A6.33 6.33 0 004.58 15.2a6.33 6.33 0 006.33 6.33 6.33 6.33 0 006.33-6.33V9.77a8.03 8.03 0 004.67 1.52v-3.5a4.6 4.6 0 01-3.32-1.1z" />
                  </svg>
                </a>
              )}
              {social?.googleMaps && (
                <a
                  href={social.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                  aria-label="Location on Google Maps"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {social?.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted hover:border-secondary/50 hover:text-secondary transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright & Attribution */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-xs text-text-muted">
            {data.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-text-muted">Developed by</span>
            <a 
              href="https://anuditk.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-2 py-1 text-secondary transition-colors duration-300 hover:text-secondary-light"
            >
              LazZy
              <span className="absolute bottom-0 left-0 h-px w-0 bg-secondary-light transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
