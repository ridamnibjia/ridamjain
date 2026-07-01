import { useState } from "react";
import { useEndpoint } from "@/lib/api";
import { Section } from "../Section";
import { skills } from "@shared/content";
import type { SkillGroup } from "@shared/content";

/**
 * Maps a skill to a simple-icons CDN path. Dark brand marks get an explicit
 * light color so they stay visible on the near-black background. Skills without
 * a recognizable logo (REST, WebSockets, JavaFX, ...) render as text-only chips.
 */
const ICON: Record<string, string> = {
  Java: "openjdk",
  JavaScript: "javascript",
  TypeScript: "typescript",
  "Node.js": "nodedotjs",
  "Spring Boot": "springboot",
  "Spring Security": "springsecurity",
  Hibernate: "hibernate/e8eaed",
  "Express.js": "express/e8eaed",
  TypeORM: "typeorm",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MongoDB: "mongodb",
  Docker: "docker",
  Cloudflare: "cloudflare",
  Render: "render/e8eaed",
  Neon: "neon",
  Firebase: "firebase",
  Git: "git",
  Linux: "linux",
  React: "react",
  "React Native": "react",
  TailwindCSS: "tailwindcss",
  Razorpay: "razorpay/e8eaed",
};

function SkillChip({ name }: { name: string }) {
  const [broken, setBroken] = useState(false);
  const icon = ICON[name];
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-line bg-raised px-2.5 py-1.5 text-sm text-soft">
      {icon && !broken && (
        <img
          src={`https://cdn.simpleicons.org/${icon}`}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          onError={() => setBroken(true)}
          className="size-4"
        />
      )}
      {name}
    </span>
  );
}

export function Skills() {
  const { data, meta } = useEndpoint<{ groups: SkillGroup[] }>("/api/skills", { groups: skills });

  return (
    <Section id="skills" path="/api/skills" title="Skills" meta={meta}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {data.groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-mute">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SkillChip key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
