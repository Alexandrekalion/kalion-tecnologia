import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sistema-kalion-x9", "/sistema-kalion-x9/painel"],
    },
    sitemap: "https://kaliontecnologia.com.br/sitemap.xml",
  };
}
