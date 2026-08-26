# Neobyte Technology

Website for Neobyte Technology - AI Software Development & Solutions.
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

- `/` - Homepage
- `/about` - About Us
- `/services` - Services
- `/products` - Products
- `/industries` - Industries
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

## Deployment (Vercel)

1. Import the repository in Vercel — Next.js is auto-detected from the root,
   no Root Directory override needed.
2. Add the environment variables from `.env.example` in
   **Project Settings → Environment Variables** (at minimum `RESEND_API_KEY`,
   `SMTP_FROM`, `CONTACT_EMAIL`).
3. Deploy — `/api/contact` runs as a Node.js serverless function.

## Features

- ✅ Modern, responsive design
- ✅ Dark/Light theme toggle
- ✅ Smooth animations
- ✅ Contact form with email integration (notification + visitor confirmation)
- ✅ SEO-friendly
- ✅ Type-safe codebase

## License

ISC
