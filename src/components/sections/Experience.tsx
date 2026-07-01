import { useEndpoint } from "@/lib/api";
import { Section } from "../Section";
import { Card, CardBody } from "../ui/card";
import { Badge } from "../ui/badge";
import { experience } from "@shared/content";
import type { Role } from "@shared/content";

export function Experience() {
  const { data, meta } = useEndpoint<{ count: number; roles: Role[] }>("/api/experience", {
    count: experience.length,
    roles: experience,
  });

  return (
    <Section id="experience" path="/api/experience" title="Experience" meta={meta}>
      <div className="space-y-6">
        {data.roles.map((role) => (
          <Card key={role.company}>
            <CardBody>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-text">{role.company}</h3>
                <span className="font-mono text-xs text-mute">{role.period}</span>
              </div>
              <p className="mt-1 text-sm text-signal">{role.role}</p>
              <p className="mt-3 text-soft">{role.summary}</p>

              <ul className="mt-4 space-y-2">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-mute">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-signal/70" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {role.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
