import { contact } from "@shared/content";

/** Compact footer that doubles as the contact section (nav's #contact target). */
export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-line/60 py-14">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Get in touch</h2>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 inline-block font-mono text-signal hover:underline"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <IconLink href={contact.linkedin} label="LinkedIn">
              <LinkedinIcon />
            </IconLink>
            <IconLink href={contact.x} label="X">
              <XIcon />
            </IconLink>
            <IconLink href={contact.github} label="GitHub">
              <GithubIcon />
            </IconLink>
            <a
              href={contact.resume}
              download
              className="ml-1 inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 font-mono text-xs text-soft transition-colors hover:border-signal hover:text-signal"
            >
              résumé <DownloadIcon />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-line/60 pt-6 font-mono text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ridam Jain</span>
          <span>
            this page <span className="text-signal">is</span> the API. try{" "}
            <code className="text-soft">curl ridamjain.com/api</code>
          </span>
        </div>
      </div>
    </footer>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="rounded-md border border-line p-2 text-mute transition-colors hover:border-signal hover:text-signal"
    >
      {children}
    </a>
  );
}

const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

function GithubIcon() {
  return (
    <svg {...svg}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg {...svg}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg {...svg}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
