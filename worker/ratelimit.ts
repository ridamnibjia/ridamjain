/**
 * Fixed-window per-IP rate limiter.
 *
 * ponytail: in-memory per-isolate window — state isn't shared across Cloudflare
 * isolates, so the real global limit is looser than the configured number. Good
 * enough to stop casual hammering and to emit honest X-RateLimit-* headers. If
 * this ever needs a true global limit, move the counter to a Durable Object or
 * KV keyed by IP.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 60; // per IP per window

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(ip: string, now = Date.now()): RateResult {
  let bucket = buckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(ip, bucket);
  }

  bucket.count += 1;

  const remaining = Math.max(0, MAX_REQUESTS - bucket.count);
  const resetSeconds = Math.ceil((bucket.resetAt - now) / 1000);

  // Opportunistic cleanup so the Map can't grow unbounded within an isolate.
  if (buckets.size > 5000) {
    for (const [key, b] of buckets) {
      if (now >= b.resetAt) buckets.delete(key);
    }
  }

  return {
    allowed: bucket.count <= MAX_REQUESTS,
    limit: MAX_REQUESTS,
    remaining,
    resetSeconds,
  };
}
