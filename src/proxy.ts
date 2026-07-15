import { NextRequest, NextResponse } from "next/server";

const localizedToolsPath = /^\/(en|zh-hant|zh-hans|de|ja|es|fr|pt-br|ko)\/tools(?:(\/.*))?$/;

function calculatorPath(pathname: string) {
  if (pathname === "/tools-sitemap.xml") return "/calculators-sitemap.xml";
  if (pathname === "/tools" || pathname.startsWith("/tools/")) return pathname.replace(/^\/tools/, "/calculators");

  const match = pathname.match(localizedToolsPath);
  if (!match) return null;

  const [, locale, suffix = ""] = match;
  return locale === "en" ? `/calculators${suffix}` : `/${locale}/calculators${suffix}`;
}

export function proxy(request: NextRequest) {
  const destinationPath = calculatorPath(request.nextUrl.pathname);
  if (!destinationPath) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = destinationPath;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/tools/:path*", "/en/tools/:path*", "/zh-hant/tools/:path*", "/zh-hans/tools/:path*", "/de/tools/:path*", "/ja/tools/:path*", "/es/tools/:path*", "/fr/tools/:path*", "/pt-br/tools/:path*", "/ko/tools/:path*", "/tools-sitemap.xml"],
};
