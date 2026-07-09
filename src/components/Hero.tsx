import { useEndpoint } from "@/lib/api";
import { ResponseMeta } from "./ResponseMeta";
import { Button } from "./ui/button";
import { profile } from "@shared/content";
import type { Profile } from "@shared/content";

export function Hero() {
  const { data, meta } = useEndpoint<Profile>("/api/profile", profile);

  return (
    <section id="top" className="ambient relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
        {data.openToWork && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-xs text-signal">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden />
            open to backend roles
          </div>
        )}

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{data.name}</h1>
        <p className="mt-2 font-mono text-lg text-signal sm:text-xl">{data.title}</p>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft sm:text-xl">{data.tagline}</p>

        <p className="mt-4 max-w-2xl leading-relaxed text-mute">{data.summary}</p>

        {/* The honest hook: the line above was fetched from this exact endpoint. */}
        <div className="mt-9 flex flex-col gap-3 rounded-lg border border-line bg-surface/60 p-4 font-mono text-sm sm:flex-row sm:items-center sm:justify-between">
          <code className="text-soft">
            <span className="text-mute">$ </span>curl ridamjain.com/api/profile
          </code>
          <ResponseMeta meta={meta} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="solid" size="lg" onClick={() => scrollTo("api")}>
            Try the API
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollTo("contact")}>
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
