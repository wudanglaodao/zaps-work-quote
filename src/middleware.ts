import { NextRequest, NextResponse } from "next/server";

const canonicalHost = "zaps.work";
const redirectHosts = new Set(["www.zaps.work", "quote.loeme.com", "www.quote.loeme.com"]);

const localizedToolsPath = /^\/(en|zh-hant|zh-hans|de|ja|es|fr|pt-br|ko)\/tools(?:(\/.*))?$/;

function calculatorPath(pathname: string) {
  if (pathname === "/tools-sitemap.xml") return "/calculators-sitemap.xml";
  if (pathname === "/tools" || pathname.startsWith("/tools/")) return pathname.replace(/^\/tools/, "/calculators");

  const match = pathname.match(localizedToolsPath);
  if (!match) return null;

  const [, locale, suffix = ""] = match;
  return locale === "en" ? `/calculators${suffix}` : `/${locale}/calculators${suffix}`;
}

export function middleware(request: NextRequest) {
  const destinationPath = calculatorPath(request.nextUrl.pathname);

  if (redirectHosts.has(request.nextUrl.hostname.toLowerCase())) {
    const destination = new URL(`${destinationPath || request.nextUrl.pathname}${request.nextUrl.search}`, `https://${canonicalHost}`);
    return NextResponse.redirect(destination, 301);
  }

  if (!destinationPath) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = destinationPath;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
