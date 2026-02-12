import type { MetadataRoute } from "next";
import { TOOL_INDEX } from "@/lib/toolIndex";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/tools",
    "/about",
    "/contact",
  ];

  const toolRoutes = TOOL_INDEX.map((tool) => `/tools/${tool.slug}`);

  const allRoutes = [...staticRoutes, ...toolRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
