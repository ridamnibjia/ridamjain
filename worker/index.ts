/**
 * ridamjain.com — the Worker that IS the backend.
 *
 * Serves a real public REST API at /api/* (the same data the React site renders
 * from) and hands everything else to the static-asset binding. Every API
 * response carries honest operational headers: cache state, latency, and
 * rate-limit budget — so an employer can `curl ridamjain.com/api/experience`
 * and see a real backend answer.
 */

import { profile, experience, projects, skills, about, contact } from "@shared/content";
import { checkRateLimit } from "./ratelimit";

interface Env {
  ASSETS: Fetcher;
}

const CACHE_TTL_SECONDS = 300;

/** Endpoint -> payload. Adding a route here also lists it in GET /api. */
const routes: Record<string, () => unknown> = {
  "/api/profile": () => profile,
  "/api/experience": () => ({ count: experience.length, roles: experience }),
  "/api/projects": () => ({ count: projects.length, projects }),
  "/api/skills": () => ({ groups: skills }),
  "/api/about": () => about,
  "/api/contact": () => contact,
  "/api/health": () => ({ status: "ok", time: new Date().toISOString() }),
};

function apiIndex(origin: string) {
  const endpoints = ["/api", ...Object.keys(routes)].sort();
  return {
    service: "ridamjain.com",
    description:
      "This portfolio runs on its own API. Every section on the site is rendered from these endpoints — curl them yourself.",
    endpoints: endpoints.map((path) => `${origin}${path}`),
    hint: `Try: curl ${origin}/api/experience`,
  };
}

const baseHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "x-powered-by": "Cloudflare Workers · hand-rolled by Ridam Jain",
};

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: { ...baseHeaders, ...(init.headers ?? {}) },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Anything that isn't the API is a static asset (SPA).
    if (!url.pathname.startsWith("/api")) {
      return env.ASSETS.fetch(request);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: baseHeaders });
    }
    if (request.method !== "GET") {
      return json({ error: "method_not_allowed", allow: "GET" }, { status: 405 });
    }

    const start = Date.now();
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const rate = checkRateLimit(ip);

    const rateHeaders: Record<string, string> = {
      "x-ratelimit-limit": String(rate.limit),
      "x-ratelimit-remaining": String(rate.remaining),
      "x-ratelimit-reset": String(rate.resetSeconds),
    };

    if (!rate.allowed) {
      return json(
        { error: "rate_limited", message: "Too many requests — try again shortly.", retryAfter: rate.resetSeconds },
        { status: 429, headers: { ...rateHeaders, "retry-after": String(rate.resetSeconds) } },
      );
    }

    const path = url.pathname.replace(/\/$/, "") || "/api";

    // Build the payload (or 404). GET /api is the self-documenting index.
    let payload: unknown;
    if (path === "/api") {
      payload = apiIndex(url.origin);
    } else if (routes[path]) {
      payload = routes[path]();
    } else {
      return json(
        { error: "not_found", message: `No endpoint at ${path}.`, see: `${url.origin}/api` },
        { status: 404, headers: rateHeaders },
      );
    }

    // Edge cache: first request MISSes and populates; later ones HIT.
    const cache = caches.default;
    const cacheKey = new Request(`${url.origin}${path}`, { method: "GET" });
    const cached = await cache.match(cacheKey);
    if (cached) {
      const dur = Date.now() - start;
      const headers = new Headers(cached.headers);
      headers.set("x-cache", "HIT");
      headers.set("server-timing", `app;dur=${dur}`);
      for (const [k, v] of Object.entries(rateHeaders)) headers.set(k, v);
      return new Response(cached.body, { status: cached.status, headers });
    }

    const dur = Date.now() - start;
    const response = json(payload, {
      headers: {
        ...rateHeaders,
        "cache-control": `public, max-age=${CACHE_TTL_SECONDS}`,
        "x-cache": "MISS",
        "server-timing": `app;dur=${dur}`,
      },
    });

    // Store a copy without the per-request headers so the next HIT is honest.
    const toCache = json(payload, { headers: { "cache-control": `public, max-age=${CACHE_TTL_SECONDS}` } });
    ctx.waitUntil(cache.put(cacheKey, toCache));

    return response;
  },
} satisfies ExportedHandler<Env>;
