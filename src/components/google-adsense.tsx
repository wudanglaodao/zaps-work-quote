"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { adsensePublisherId, adsenseSlotId } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function GoogleAdsenseScript() {
  if (!adsensePublisherId) return null;
  return (
    <Script
      id="google-adsense"
      async
      crossOrigin="anonymous"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
    />
  );
}

export function GoogleAdSlot({ className = "" }: { className?: string }) {
  const initialized = useRef(false);
  const slot = useRef<HTMLModElement>(null);
  const [unfilled, setUnfilled] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Gracefully handle ad-blockers or connection issues
    }

    const checkStatus = () => {
      const element = slot.current;
      if (!element) return;
      const explicitlyUnfilled = element.getAttribute("data-ad-status") === "unfilled";
      const finishedWithoutCreative =
        element.getAttribute("data-adsbygoogle-status") === "done" &&
        !element.querySelector("iframe");
      if (explicitlyUnfilled || finishedWithoutCreative) {
        setUnfilled(true);
      }
    };

    const observer = new MutationObserver(checkStatus);
    if (slot.current) {
      observer.observe(slot.current, {
        attributes: true,
        attributeFilter: ["data-ad-status", "data-adsbygoogle-status"],
      });
    }
    const timer = window.setTimeout(checkStatus, 8000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  if (unfilled) return null;

  return (
    <aside className={`google-ad-slot-shell ${className}`.trim()} aria-label="Advertisement">
      <div className="google-ad-slot-container">
        <span className="google-ad-slot-label">ADVERTISEMENT</span>
        <ins
          ref={slot}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsensePublisherId}
          data-ad-slot={adsenseSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
