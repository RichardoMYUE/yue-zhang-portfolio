/**
 * Canonical site URL, used for metadata, the sitemap and printed links.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL  — set this once a custom domain exists.
 * 2. VERCEL_PROJECT_PRODUCTION_URL — provided automatically by Vercel.
 * 3. http://localhost:3000 — local development.
 *
 * Server-only usage: VERCEL_* variables are not exposed to client code.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/** URL without protocol, for compact printed references. */
export function displayUrl(path = "/"): string {
  return absoluteUrl(path)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}
