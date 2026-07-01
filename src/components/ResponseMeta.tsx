import type { Meta } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * The little live pill next to each endpoint label: `200 · 18ms · HIT`.
 * Reads real values from the fetch. When the API is unreachable it says
 * `snapshot` instead of inventing numbers.
 */
export function ResponseMeta({ meta, className }: { meta: Meta; className?: string }) {
  if (meta.source === "loading") {
    return <span className={cn("font-mono text-xs text-mute", className)}>connecting…</span>;
  }

  if (meta.source === "fallback") {
    return (
      <span className={cn("font-mono text-xs text-warn/90", className)} title="Served from the built-in snapshot (API not reachable here).">
        snapshot
      </span>
    );
  }

  const cache = meta.cache?.toUpperCase();
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs", className)}>
      <span className="text-signal">{meta.status ?? 200}</span>
      <span className="text-line">·</span>
      <span className="text-mute">{meta.latencyMs}ms</span>
      {cache && (
        <>
          <span className="text-line">·</span>
          <span className={cache === "HIT" ? "text-signal" : "text-warn"}>{cache}</span>
        </>
      )}
    </span>
  );
}
