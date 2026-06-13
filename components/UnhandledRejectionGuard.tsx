"use client";

import { useEffect } from "react";

function isBenignEventRejection(reason: unknown) {
  if (typeof Event !== "undefined" && reason instanceof Event) {
    return true;
  }
  return reason != null && String(reason) === "[object Event]";
}

/**
 * Prevents Next.js dev overlay spam when webpack/HMR rejects with a DOM Event
 * (e.g. stale chunk or script load failure) instead of a real Error.
 */
export default function UnhandledRejectionGuard() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      if (!isBenignEventRejection(event.reason)) return;
      event.preventDefault();
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[UnhandledRejectionGuard] Suppressed benign Event rejection. If styles or scripts fail to load, run: npm run dev"
        );
      }
    };

    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  return null;
}
