import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "zaps.work", short_name: "zaps.work", description: "Free cost calculators and quote tools.", start_url: "/en", display: "standalone", background_color: "#f7f9f7", theme_color: "#12a150", icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }] };
}
