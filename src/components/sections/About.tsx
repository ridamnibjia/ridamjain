import { useEndpoint } from "@/lib/api";
import { Section } from "../Section";
import { about } from "@shared/content";

export function About() {
  const { data, meta } = useEndpoint<{ paragraphs: string[] }>("/api/about", about);

  return (
    <Section id="about" path="/api/about" title="About" meta={meta}>
      <div className="max-w-2xl space-y-4">
        {data.paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-soft">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
