import { createFileRoute } from "@tanstack/react-router";

const GenericStatus = {
  status: 200,
  headers: { "Content-Type": "application/json" },
};

export const Route = createFileRoute("/api/analytics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          // CUSTOM headers
          const forwardHeaders: Record<string, string> = {
            "Content-Type": "application/json",
          };

          // Get original client data from Cloudflare
          const cfConnectingIp = request.headers.get("cf-connecting-ip");
          const cfIpCountry = request.headers.get("cf-ipcountry");
          const cfIpCity = request.headers.get("cf-ipcity");
          const cfIpLatitude = request.headers.get("cf-iplatitude");
          const cfIpLongitude = request.headers.get("cf-iplongitude");
          const xRealIp = request.headers.get("x-real-ip");

          // Forward using CUSTOM header
          if (cfConnectingIp) forwardHeaders["x-original-ip"] = cfConnectingIp;
          if (xRealIp) forwardHeaders["x-original-ip"] = xRealIp; // fallback
          if (cfIpCountry) forwardHeaders["x-original-country"] = cfIpCountry;
          if (cfIpCity) forwardHeaders["x-original-city"] = cfIpCity;
          if (cfIpLatitude) forwardHeaders["x-original-latitude"] = cfIpLatitude;
          if (cfIpLongitude) forwardHeaders["x-original-longitude"] = cfIpLongitude;

          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/analytics`, {
            method: "POST",
            headers: forwardHeaders,
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            console.error("Analytics backend error:", response.status);
          }

          return new Response(JSON.stringify({}), GenericStatus);
        } catch (error) {
          console.error("Analytics error:", error);
          return new Response(JSON.stringify({}), GenericStatus);
        }
      },
    },
  },
});
