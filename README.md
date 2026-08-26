# Neobyte Technology

Website for Neobyte Technology - AI Software Development & Solutions.

## Project Structure

```
Neobyte/
├── frontend/       # Next.js app: UI + API routes (contact form)
├── scripts/
├── .gitignore
└── README.md
```

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- TailwindCSS
- react-i18next (EN/FR)
- Lucide React
- Nodemailer (contact form API route, with Resend or SMTP)

## Quick Start

```bash
cp .env.example .env   # at the repository root
# Edit .env with your email configuration
cd frontend
npm install
npm run dev
```

The site runs on `http://localhost:3000`. The contact form posts to the
same-origin API route `/api/contact` — there is no separate backend server,
and a single `.env` file at the repository root configures everything.

## Deployment (Vercel)

1. Import the repository in Vercel and set the **Root Directory** to `frontend`.
2. Add the environment variables from `.env.example` (repository root) in
   **Project Settings → Environment Variables** (at minimum, one email
   provider: `RESEND_API_KEY`, or the `SMTP_*` set).
3. Deploy — Vercel builds the Next.js app and serves `/api/contact` as a
   Node.js serverless function.

## Features

- ✅ Modern, responsive design
- ✅ Dark/Light theme toggle
- ✅ Smooth animations
- ✅ Contact form with email integration
- ✅ SEO-friendly
- ✅ Type-safe codebase

## License

ISC
