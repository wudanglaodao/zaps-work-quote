"use client";

import { useEffect, useRef, useState } from "react";
import { adsensePublisherId, adsenseSlotId } from "@/lib/adsense";


declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
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
      const element = slot.current;
      if (!element) return;
      const explicitlyUnfilled = element.getAttribute("data-ad-status") === "unfilled";
      const finishedWithoutCreative = element.getAttribute("data-adsbygoogle-status") === "done" && !element.querySelector("iframe");
      if (explicitlyUnfilled || finishedWithoutCreative) setUnfilled(true);
    };
    const observer = new MutationObserver(checkStatus);
    if (slot.current) observer.observe(slot.current, { attributes: true, attributeFilter: ["data-ad-status"] });
    const timeout = window.setTimeout(checkStatus, 10000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section className={`adsense-slot${unfilled ? " is-unfilled" : ""}`} aria-label="Advertisement">
      <p>Advertisement</p>
      <ins ref={slot} className="adsbygoogle" style={{ display: "block" }} data-ad-client={adsensePublisherId} data-ad-slot={adsenseSlotId} data-ad-format="auto" data-full-width-responsive="true" />
    </section>
  );
}
