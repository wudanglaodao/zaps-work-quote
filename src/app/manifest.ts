import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "LOEME Quote", short_name: "LOEME Quote", description: "Free cost calculators and customer-ready quote tools from LOEME.", start_url: "/", display: "standalone", background_color: "#f7f9f7", theme_color: "#16a34a", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
