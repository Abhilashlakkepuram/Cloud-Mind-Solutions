import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev-only. Next blocks cross-origin requests for /_next dev resources by
   * default, so opening the dev server from a LAN address serves the HTML but
   * not the client chunks — the page renders unhydrated and anything with an
   * `initial` animation state stays stuck at opacity 0.
   *
   * Listed here so the site can be viewed from another device on the network
   * (phone/tablet QA). Has no effect on production builds.
   */
  allowedDevOrigins: ["192.168.1.124"],
};

export default nextConfig;
