import Script from "next/script";

// Keep the production property explicit so an obsolete environment value cannot
// silently send traffic to another Analytics property.
const measurementId = "G-JN80QC8FHB";

export function GoogleAnalytics() {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `}
    </Script>
  </>;
}
