import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

// Same-origin proxy for the chat SSE stream. The backend gates /marriott/* on x-api-key; keeping
// the key here (a Worker secret, never a VITE_ build constant) is the only way it stays off the client.
export const Route = createFileRoute("/api/marriott/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = (env as unknown as { MARRIOTT_API_KEY?: string }).MARRIOTT_API_KEY;
        const headers: Record<string, string> = {
          "Content-Type": request.headers.get("content-type") ?? "application/json",
          Accept: "text/event-stream",
        };
        if (apiKey) headers["x-api-key"] = apiKey;

        const upstream = await fetch(`${import.meta.env.VITE_SERVER_URL}/marriott/chat`, {
          method: "POST",
          headers,
          body: await request.text(),
        });

        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type": upstream.headers.get("content-type") ?? "text/event-stream",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
