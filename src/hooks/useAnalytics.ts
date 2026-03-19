import { useEffect } from "react";
import { useAnalyticsStore } from "@/stores/analytics-store";

function getEmailFromCfCookie(): string | undefined {
  const match = document.cookie.match(/CF_Authorization=([^;]+)/);
  if (!match) return undefined;
  try {
    const payload = match[1].split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.email;
  } catch {
    return undefined;
  }
}

async function sendAnalytics(analytic: { page: string; duration: number }) {
  const payload = JSON.stringify({
    sessionId: getEmailFromCfCookie() || "anonymous",
    timestamp: new Date().toISOString(),
    pathname: analytic.page,
    duration: analytic.duration,
    referrer: document.referrer || undefined,
    locale: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: navigator.userAgent,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
      scale: window.devicePixelRatio,
    },
  });

  const blob = new Blob([payload], { type: "application/json" });
  navigator.sendBeacon("/api/analytics", blob);
}

export const useAnalytics = (page: string) => {
  useEffect(() => {
    const { startPageVisit, endPageVisit } = useAnalyticsStore.getState();
    startPageVisit(page);

    return () => {
      const visit = endPageVisit();
      if (visit) {
        sendAnalytics(visit).catch(console.error);
      }
    };
  }, [page]);
};
