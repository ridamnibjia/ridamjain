# ridamjain.com

The backend-engineer portfolio for **Ridam Jain** — and it runs on its own real
REST API. Every section on the page is rendered from a public endpoint on the
same domain, so anyone can verify it from a terminal:

```bash
curl https://ridamjain.com/api/experience
```

The site is a single Cloudflare Worker that serves both the static React app and
the API. No database — the content is typed data in the Worker, cached at the
edge and rate-limited per IP.

## Stack

- **Frontend:** Vite + React + TypeScript, TailwindCSS, shadcn-style components.
- **Backend / hosting:** one Cloudflare Worker (`worker/index.ts`) serving the
  API and the static assets (Workers Assets binding).
- **Data:** `shared/content.ts` — the single source of truth, imported by both
  the Worker (to serve `/api/*`) and the React app (as an offline fallback).

## The API

| Endpoint | Description |
| --- | --- |
| `GET /api` | Self-documenting index of every endpoint |
| `GET /api/profile` | Name, title, summary, location, education |
| `GET /api/experience` | Work history |
| `GET /api/projects` | Projects |
| `GET /api/skills` | Grouped skills |
| `GET /api/contact` | Email and social links |
| `GET /api/health` | Liveness check |

Every JSON response carries honest operational headers:

- `X-Cache: HIT | MISS` — Cloudflare edge cache state.
- `Server-Timing: app;dur=<ms>` — handler latency.
- `X-RateLimit-Limit` / `X-RateLimit-Remaining` / `X-RateLimit-Reset` — request
  budget; the API returns `429` when the per-IP window is exceeded.
- `Access-Control-Allow-Origin: *` — so any client (including curl) can read it.

## Run it locally

```bash
npm install

# Pure UI dev (fast HMR). /api isn't running, so the page renders from the
# built-in snapshot and shows a "snapshot" pill instead of live latency.
npm run dev            # http://localhost:5173

# Full stack: builds the site and runs the real Worker + API together.
npm run cf-dev         # http://localhost:8787
curl http://localhost:8787/api/experience
```

## Deploy (Cloudflare Workers)

```bash
# One-time: authenticate wrangler with your Cloudflare account.
npx wrangler login

# Build the site and deploy the Worker + assets.
npm run deploy
```

Then, in the Cloudflare dashboard:

1. **Domain** — add `ridamjain.com` as a custom domain / route for the Worker
   (Workers & Pages → this Worker → Settings → Domains & Routes).
2. **Contact email** — set up Cloudflare Email Routing so `work@ridamjain.com`
   forwards to a personal inbox (the site's contact button uses that address).

## Project layout

```
shared/content.ts        Single source of truth for all content
worker/
  index.ts               API routing, caching, rate-limit headers, static assets
  ratelimit.ts           Per-IP fixed-window limiter
src/
  lib/api.ts             Typed fetch with latency measurement + snapshot fallback
  components/            Hero, ApiConsole, Section, StatusBar, ui/, sections/
  index.css              Design tokens (dark, monochrome + emerald) & base styles
wrangler.jsonc           Worker + assets config
```

## Editing content

Everything shown on the site lives in `shared/content.ts`. Change it there and
both the API and the page update — there's nowhere else to keep in sync.
