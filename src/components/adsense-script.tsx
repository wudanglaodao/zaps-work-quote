import { adsensePublisherId } from "@/lib/adsense";

export function AdsenseScript() {
  return <script async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`} />;
}
