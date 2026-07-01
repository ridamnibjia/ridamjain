import { useEndpoint } from "@/lib/api";
import { contact } from "@shared/content";

const NAV = [
  ["experience", "#experience"],
  ["projects", "#projects"],
  ["skills", "#skills"],
  ["contact", "#contact"],
] as const;

/** Sticky top line styled like a request status line, with a live /api/health dot. */
export function StatusBar() {
  const health = useEndpoint<{ status: string }>("/api/health", { status: "ok" });
  const up = health.meta.source !== "loading";

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span
            className={up ? "size-2 rounded-full bg-signal" : "size-2 rounded-full bg-warn"}
            aria-hidden
          />
          <span className="text-text">ridamjain.com</span>
        </a>

        <nav className="hidden items-center gap-5 font-mono text-xs text-mute sm:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-text">
              {label}
            </a>
          ))}
          <a
            href={contact.resume}
            download
            className="rounded-md border border-line px-2.5 py-1 text-soft transition-colors hover:border-signal hover:text-signal"
          >
            résumé ↓
          </a>
        </nav>

        <a
          href="#contact"
          className="font-mono text-xs text-signal sm:hidden"
        >
          contact →
        </a>
      </div>
    </header>
  );
}
