import type { ReactNode } from "react";
import type { Meta } from "@/lib/api";
import { ResponseMeta } from "./ResponseMeta";
import { useReveal } from "@/lib/useReveal";

/**
 * A page section headed by its real endpoint. The eyebrow (`GET /api/experience`)
 * is honest structure: that endpoint genuinely serves this section's data, and
 * the pill shows the live latency/cache of the fetch that populated it.
 */
export function Section({
  id,
  path,
  title,
  meta,
  children,
}: {
  id: string;
  path: string;
  title: string;
  meta: Meta;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} className="reveal scroll-mt-20 border-t border-line/60 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-mute">
              <span className="text-signal/80">GET</span> {path}
            </span>
          </div>
          <ResponseMeta meta={meta} />
        </div>
        <h2 className="mb-10 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
