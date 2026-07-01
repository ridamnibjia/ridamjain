import { ArrowUpRight } from "lucide-react";
import { useEndpoint } from "@/lib/api";
import { Section } from "../Section";
import { Card, CardBody } from "../ui/card";
import { Badge } from "../ui/badge";
import { projects } from "@shared/content";
import type { Project } from "@shared/content";

export function Projects() {
  const { data, meta } = useEndpoint<{ count: number; projects: Project[] }>("/api/projects", {
    count: projects.length,
    projects,
  });

  return (
    <Section id="projects" path="/api/projects" title="Projects" meta={meta}>
      <div className="grid gap-4 md:grid-cols-2">
        {data.projects.map((p) => (
          <Card key={p.name} className="flex flex-col overflow-hidden">
            {p.image && (
              <img
                src={p.image}
                alt={`${p.name} screenshot`}
                loading="lazy"
                className="aspect-video w-full border-b border-line object-cover object-top"
              />
            )}
            <CardBody className="flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                {p.logo && (
                  <img src={p.logo} alt="" className="size-7 rounded-md" />
                )}
                <h3 className="font-mono text-lg text-text">{p.name}</h3>
              </div>
              <p className="mt-1 text-sm text-signal">{p.tagline}</p>
              <p className="mt-4 flex-1 leading-relaxed text-soft">{p.description}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-1.5 font-mono text-xs text-soft transition-colors hover:border-signal hover:text-signal"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
