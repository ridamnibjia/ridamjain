/**
 * Single source of truth for every fact on the site.
 *
 * Imported by BOTH the Cloudflare Worker (to serve /api/*) and the React app
 * (as an offline/error fallback snapshot). Everything here is confirmed true by
 * Ridam. Plain, human copy: short sentences, no filler, no em-dashes.
 */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  yearsExperience: string;
  summary: string;
  education: { degree: string; school: string; years: string; note: string };
  openToWork: boolean;
}

export interface Role {
  company: string;
  role: string;
  period: string;
  stack: string[];
  summary: string;
  highlights: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  image?: string;
  logo?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Contact {
  email: string;
  linkedin: string;
  x: string;
  github: string;
}

export const profile: Profile = {
  name: "Ridam Jain",
  title: "Backend Engineer",
  tagline: "I build APIs, payment systems, and the parts that have to keep working.",
  location: "Jodhpur, India",
  yearsExperience: "3.5+ years",
  summary:
    "I have spent three and a half years building backends that people use every day. I ran payments for a restaurant network in Ireland and built a visa platform from scratch. I like clean systems and I own what I ship.",
  education: {
    degree: "B.C.A.",
    school: "GLS University",
    years: "2018 to 2021",
    note: "CGPA 8.8 / 10",
  },
  openToWork: true,
};

export const experience: Role[] = [
  {
    company: "Viszapp",
    role: "Backend Engineer",
    period: "2024 to 2026",
    stack: ["Spring Boot", "Node.js", "PostgreSQL", "TypeORM", "Docker", "React", "Cloudflare"],
    summary: "A visa consultancy platform. I built it end to end, mostly the backend.",
    highlights: [
      "Grew it from nothing to 3,000+ users and 1,100+ paid orders.",
      "Backend in Spring Boot and Node.js with PostgreSQL and TypeORM, running in Docker.",
      "Hosted the backend on Render and Neon, with the React frontend on Cloudflare.",
      "Integrated Razorpay and Cashfree for checkout and refunds. Used webhooks and idempotent retries so nobody gets charged twice.",
      "Built LLM document generation for itineraries and cover letters, with prompt caching to cut cost and latency.",
      "Automated consultant and client scheduling through Google Calendar, and added rate limiting.",
    ],
  },
  {
    company: "Abmiro Solutions",
    role: "Software Engineer, Postree POS",
    period: "2023 to 2024",
    stack: ["Java", "JavaFX", "Java Swing", "MySQL", "Viva Payments"],
    summary: "A desktop point-of-sale app that restaurants in Ireland used every day.",
    highlights: [
      "Supported 160+ restaurants running the software live, including production issues and customer tickets.",
      "Integrated the Viva Payments terminal API for collection, refunds, daily settlement, and reconciliation.",
      "Made the slowest reports over 50% faster by fixing indexes and N+1 queries.",
      "Built an offline voucher system with partial redemption, expiry, and a full audit trail.",
      "Shipped GreenTil QR invoicing to replace paper receipts.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Lotus Voice Agent",
    tagline: "A voice receptionist that answers the phone and books appointments.",
    description:
      "You call, it picks up, talks you through booking a spa appointment, and hangs up like a person would. It runs on LiveKit with Deepgram for speech-to-text, Google Gemini for the conversation, and Deepgram Aura for the voice. The booking logic is pure and unit-tested, so it will not double-book a slot or make one up. It is live and you can call it in the browser.",
    tech: ["TypeScript", "LiveKit", "Deepgram", "Gemini", "Express", "React", "Zod"],
    links: [{ label: "Live", href: "https://lotusvoice.ridamjain.com/" }],
    image: "/lotus-live.png",
  },
  {
    name: "Just Lecture",
    tagline: "A distraction-free study app for focusing on lectures.",
    description:
      "A distraction-free learning app. It curates short YouTube lectures into clean, ad-free playlists, with no recommended videos or algorithm pulling students off track. Browse by search and category, sign in, and focus. The app is native Android written in Java, backed by a TypeScript API with PostgreSQL and Prisma that serves the playlists and handles auth. Published and live on the Google Play Store, with more features on the way.",
    tech: ["Android", "Java", "TypeScript", "PostgreSQL", "Prisma"],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.ridamnibjia.studious",
      },
    ],
    image: "/just-lecture-hero.png",
    logo: "/just-lecture-icon.png",
  },
];

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Java", "JavaScript", "TypeScript", "Node.js", "SQL"] },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Spring Security",
      "Hibernate",
      "Express.js",
      "TypeORM",
      "REST",
      "Microservices",
      "WebSockets",
    ],
  },
  { label: "Desktop", items: ["JavaFX", "Java Swing"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  {
    label: "Cloud and DevOps",
    items: ["AWS", "Docker", "Cloudflare", "Render", "Neon", "Firebase", "Git", "Linux"],
  },
  { label: "Observability", items: ["Elasticsearch", "Logstash", "Kibana"] },
  { label: "Frontend", items: ["React", "TailwindCSS"] },
  { label: "Payments", items: ["Razorpay", "Cashfree", "Viva Payments"] },
];

export const about = {
  paragraphs: [
    "I like owning what I build, from the first empty file to the thing running in production. I work fine on my own or in a team.",
    "I keep up with new tech because I enjoy it, not because I have to.",
    "Outside work, I follow markets and manage my own investments.",
  ],
};

export const contact: Contact = {
  email: "work@ridamjain.com",
  linkedin: "https://linkedin.com/in/ridam-jain-backend",
  x: "https://x.com/rhythmnibjia",
  github: "https://github.com/ridamnibjia",
};
