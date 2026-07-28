"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const publisherId = "ca-pub-2115668195727576";
const slotId = "9060437642";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdsenseScript() {
  return <Script id="adsense-script" strategy="afterInteractive" async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`} />;
}

export function AdsenseSlot() {
  const initialized = useRef(false);
  const slot = useRef<HTMLModElement>(null);
  const [unfilled, setUnfilled] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and unapproved domains can prevent a fill without affecting the guide.
    }

    const checkStatus = () => {
      if (slot.current?.getAttribute("data-ad-status") === "unfilled") setUnfilled(true);
    };
    const observer = new MutationObserver(checkStatus);
    if (slot.current) observer.observe(slot.current, { attributes: true, attributeFilter: ["data-ad-status"] });
    const timeout = window.setTimeout(checkStatus, 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section className={`adsense-slot${unfilled ? " is-unfilled" : ""}`} aria-label="Advertisement">
      <p>Advertisement</p>
      <ins ref={slot} className="adsbygoogle" style={{ display: "block" }} data-ad-client={publisherId} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" />
    </section>
  );
}
