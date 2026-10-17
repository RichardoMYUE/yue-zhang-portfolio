import type { NextConfig } from "next";

/*
 * Fully static site: every route is prerendered at build time.
 *
 * `cacheComponents` is intentionally left off. Its route-level <Activity>
 * keeps previously visited pages mounted (hidden) in the DOM, which would
 * duplicate element ids and interfere with in-page anchors such as
 * /cv#cv-education. Nothing on this site reads request-time data, so the
 * feature brings no benefit here.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
