import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

/**
 * Web app manifest, served at /manifest.webmanifest.
 *
 * Icons are pre-composited on ink-900 (see scripts/logo-assets.py) because
 * Android launchers and iOS both crop and re-background app icons, and the
 * mark's circuit strokes need a known backdrop to stay legible.
 *
 * `maskable` carries extra padding so launchers can crop it to a circle,
 * squircle, or rounded square without clipping the cloud.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.legalName,
    short_name: company.name,
    description:
      "AI and IT consulting — cloud infrastructure, applied AI, cybersecurity, software, and managed IT.",
    start_url: "/",
    display: "standalone",
    background_color: "#060F20",
    theme_color: "#0B1E3D",
    icons: [
      {
        src: "/assets/logo/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/logo/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/logo/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
