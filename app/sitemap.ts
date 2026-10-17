import type { MetadataRoute } from "next";
import { projectHref, projects } from "@/data/projects";
import { FLAGSHIP_HREF } from "@/data/research";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/research", priority: 0.9 },
    { path: FLAGSHIP_HREF, priority: 0.9 },
    { path: "/cv", priority: 0.9 },
    { path: "/projects", priority: 0.7 },
    ...projects.map((project) => ({ path: projectHref(project.slug), priority: 0.6 })),
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
