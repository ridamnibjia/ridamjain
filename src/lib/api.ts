import { useEffect, useState } from "react";

/**
 * Talks to the site's own /api/* backend.
 *
 * The page renders from these live calls so the API isn't a gimmick — it's the
 * real data path. When the API is unreachable (e.g. `vite dev` with no Worker),
 * we fall back to the baked-in snapshot from shared/content so the page never
 * shows a blank section.
 */

export type Source = "api" | "fallback" | "loading";

export interface Meta {
  source: Source;
  /** Client-observed round-trip in ms. */
  latencyMs: number | null;
  /** X-Cache header from the Worker: HIT | MISS. */
  cache: string | null;
  status: number | null;
}

export interface Endpoint<T> {
  data: T;
  meta: Meta;
}

async function fetchEndpoint<T>(path: string, fallback: T): Promise<Endpoint<T>> {
  const t0 = performance.now();
  try {
    const res = await fetch(path, { headers: { accept: "application/json" } });
    const latencyMs = Math.round(performance.now() - t0);
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = (await res.json()) as T;
    return {
      data,
      meta: {
        source: "api",
        latencyMs,
        cache: res.headers.get("x-cache"),
        status: res.status,
      },
    };
  } catch {
    return {
      data: fallback,
      meta: { source: "fallback", latencyMs: null, cache: null, status: null },
    };
  }
}

/** Fetch an endpoint on mount; start from the snapshot, then swap in live data. */
export function useEndpoint<T>(path: string, fallback: T): Endpoint<T> {
  const [state, setState] = useState<Endpoint<T>>({
    data: fallback,
    meta: { source: "loading", latencyMs: null, cache: null, status: null },
  });

  useEffect(() => {
    let alive = true;
    fetchEndpoint(path, fallback).then((result) => {
      if (alive) setState(result);
    });
    return () => {
      alive = false;
    };
    // fallback is a stable module import; path is constant per usage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}
