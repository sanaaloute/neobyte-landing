# NeoByte Technology

Website for NeoByte Technology - AI Software Development & Solutions.
Next.js 15 (App Router) app with the contact-form API included as a route
handler — no separate backend, a single `.env` at the repository root.

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript (strict)
- TailwindCSS
- react-i18next (EN/FR)
- Lucide React
- Nodemailer (contact form API route, with Resend or SMTP)

## Project Structure

```
├── src/
│   ├── app/            # App Router routes + API route (/api/contact)
│   ├── components/     # Reusable UI components
│   ├── data/           # Shared static data (products, services, contact info)
│   ├── i18n/           # i18next setup + en/fr locale files
│   └── lib/            # Utilities (api client, icon map, cn)
├── public/             # Static assets
├── content/            # Content assets
├── scripts/            # Utility scripts (logo processing, screenshots)
├── .env.example        # Template for the single, root-level .env
└── next.config.ts
```

## Pages

- `/` - Homepage (includes the Industries section, `/#industries`)
- `/about` - About Us
- `/services` - Services
- `/products` - Products
- `/contact` - Contact form
- `/policy` - Privacy Policy, Terms of Service & Cookie Policy

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your email configuration (RESEND_API_KEY or SMTP_*)
npm run dev
```

The site runs on `http://localhost:3000`. The contact form posts to the
same-origin API route `/api/contact` (see `src/app/api/contact/route.ts`).

## Environment Variables

Single `.env` at the repository root (see `.env.example`). Key variables:

- `RESEND_API_KEY` — Resend API key (recommended provider).
- `SMTP_FROM` — sender address; must be on a domain verified in Resend
  (a verified subdomain works, e.g. `contact@auth.barkosem.com`).
- `CONTACT_EMAIL` — recipient of contact form notifications.
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` — optional SMTP fallback.

## Deployment (Cloudflare Workers)

The app is configured for Cloudflare Workers via `@opennextjs/cloudflare`
(config in `wrangler.jsonc` and `open-next.config.ts`).

1. Authenticate Wrangler: `npx wrangler login`.
2. Set the production secrets (at minimum these three):
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put SMTP_FROM
   npx wrangler secret put CONTACT_EMAIL
   ```
3. Deploy: `npm run deploy` — builds with OpenNext, then deploys the Worker.

Useful scripts:

- `npm run preview` — builds the app and serves it locally in the Workers
  runtime for a production-like check. Copy `.env` to `.dev.vars` first so
  secrets are available locally.
- `npm run upload` — builds and uploads a new version without promoting it.
- `npm run cf-typegen` — regenerates `cloudflare-env.d.ts` binding types.

Notes:

- The Worker uses the `nodejs_compat` compatibility flag (set in
  `wrangler.jsonc`), required for the nodemailer SMTP fallback. The primary
  Resend provider calls the HTTPS API via `fetch`, which works natively on
  Workers.
- Contact-form JSONL persistence is skipped on Workers (no filesystem); the
  notification email remains the durable channel, as documented in
  `src/app/api/contact/route.ts`.
- You can also connect the repository in the Cloudflare dashboard (Workers
  Builds) so every push to the production branch deploys automatically.

## Features

- ✅ Modern, responsive design
- ✅ Dark/Light theme toggle
- ✅ Smooth animations
- ✅ Contact form with email integration (notification + visitor confirmation)
- ✅ SEO-friendly
- ✅ Type-safe codebase

## License

ISC
