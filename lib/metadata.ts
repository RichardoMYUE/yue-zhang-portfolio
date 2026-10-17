import type { Metadata } from "next";
import { profile } from "@/data/profile";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata with canonical URL and matching OpenGraph fields. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: `${title} | ${profile.name}`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.name}`,
      description,
    },
  };
}
