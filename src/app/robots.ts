import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Amazonbot",
          "cohere-ai",
          "OAI-SearchBot",
          "Bytespider",
          "CCBot"
        ],
        allow: "/",
      }
    ],
    sitemap: "https://anushkakhatri.com.np/sitemap.xml",
    host: "https://anushkakhatri.com.np",
  };
}
