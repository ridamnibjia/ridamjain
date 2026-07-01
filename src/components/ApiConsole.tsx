import { useState } from "react";
import { Play, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ENDPOINTS = [
  "/api",
  "/api/profile",
  "/api/experience",
  "/api/projects",
  "/api/skills",
  "/api/contact",
  "/api/health",
] as const;

interface RunResult {
  status: number;
  latencyMs: number;
  cache: string | null;
  remaining: string | null;
  timing: string | null;
  body: string;
  ok: boolean;
}

/**
 * The "run it yourself" console. Fires the site's real API and shows the actual
 * status, headers, and JSON — no mock. This is the whole thesis of the page made
 * pressable: the portfolio is a working backend.
 */
export function ApiConsole() {
  const [path, setPath] = useState<string>("/api/experience");
  const [result, setResult] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  async function run() {
    setRunning(true);
    const t0 = performance.now();
    try {
      const res = await fetch(path, { headers: { accept: "application/json" } });
      const body = await res.text();
      setResult({
        status: res.status,
        latencyMs: Math.round(performance.now() - t0),
        cache: res.headers.get("x-cache"),
        remaining: res.headers.get("x-ratelimit-remaining"),
        timing: res.headers.get("server-timing"),
        body,
        ok: res.ok,
      });
    } catch {
      setResult({
        status: 0,
        latencyMs: Math.round(performance.now() - t0),
        cache: null,
        remaining: null,
        timing: null,
        body: "// API not reachable from here.\n// Run `npm run cf-dev` locally, or try it on ridamjain.com.",
        ok: false,
      });
    } finally {
      setRunning(false);
    }
  }

  function copyCurl() {
    navigator.clipboard?.writeText(`curl https://ridamjain.com${path}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <section id="api" className="scroll-mt-20 border-t border-line/60 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <span className="font-mono text-xs text-mute">
          <span className="text-signal/80">GET</span> /api
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          This site runs on its own API
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-mute">
          Every section on this page is loaded from a real endpoint, served by a Cloudflare Worker
          with caching and rate limiting. Pick one and run it, or copy the curl and hit it from your
          own terminal.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface/60">
          {/* endpoint picker */}
          <div className="flex flex-wrap gap-1.5 border-b border-line p-3">
            {ENDPOINTS.map((e) => (
              <button
                key={e}
                onClick={() => setPath(e)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                  e === path ? "bg-signal/15 text-signal" : "text-mute hover:bg-raised hover:text-text",
                )}
              >
                {e}
              </button>
            ))}
          </div>

          {/* request line */}
          <div className="flex flex-col gap-3 border-b border-line p-4 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
            <code className="truncate text-soft">
              <span className="text-signal">GET</span> https://ridamjain.com{path}
            </code>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" onClick={copyCurl} aria-label="Copy curl command">
                {copied ? <Check className="text-signal" /> : <Copy />}
                {copied ? "copied" : "curl"}
              </Button>
              <Button variant="solid" size="sm" onClick={run} disabled={running}>
                <Play />
                {running ? "running…" : "Run"}
              </Button>
            </div>
          </div>

          {/* response */}
          <div className="p-4">
            {result ? (
              <>
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
                  <span className={result.ok ? "text-signal" : "text-err"}>
                    {result.status || "ERR"} {statusText(result.status)}
                  </span>
                  <span className="text-mute">{result.latencyMs}ms</span>
                  {result.cache && (
                    <span className={result.cache === "HIT" ? "text-signal" : "text-warn"}>
                      cache {result.cache}
                    </span>
                  )}
                  {result.remaining && <span className="text-mute">ratelimit {result.remaining} left</span>}
                </div>
                <pre className="max-h-80 overflow-auto rounded-lg bg-ink/70 p-4 font-mono text-xs leading-relaxed text-soft">
                  {result.body}
                </pre>
              </>
            ) : (
              <p className="py-6 text-center font-mono text-xs text-mute">
                press <span className="text-signal">Run</span> to call the endpoint
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function statusText(status: number): string {
  const map: Record<number, string> = { 200: "OK", 404: "Not Found", 429: "Too Many Requests" };
  return map[status] ?? "";
}
