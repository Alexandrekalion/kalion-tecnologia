import type { MetadataRoute } from "next";

const routes = ["", "/sobre-nos", "/servicos", "/projetos", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://kaliontecnologia.com.br${route}`,
    lastModified: new Date(),
  }));
}
