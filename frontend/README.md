# Neobyte Technology - Frontend

Company landing page built with Next.js 15 (App Router), React 19, TypeScript, and TailwindCSS.
The contact form API (`/api/contact`) is implemented as a Next.js route handler in the same app,
so the frontend and backend share a single `.env` file and deploy as one Vercel project.

## Tech Stack

- **Next.js 15** - App Router, SSR, image optimization
- **React 19** - UI library
- **TypeScript** - Type safety (strict)
- **TailwindCSS 3** - Utility-first CSS framework
- **react-i18next** - Internationalization (EN/FR)
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18.18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Start Production Build

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env` file from `.env.example` **at the repository root**
(one level above this directory):

```env
# At least one email provider is required for the contact form.
RESEND_API_KEY=re_xxxxxxxxxxxx
# or generic SMTP fallback:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=contact@barkosem.com
CONTACT_EMAIL=contact@barkosem.com
```

This is the only env file in the project — the API route handler loads it
from the repository root via `@next/env` (see `src/app/api/contact/route.ts`).
On Vercel, set the same variables in
**Project Settings → Environment Variables**.

## Project Structure

```
src/
├── app/            # App Router routes (page.tsx per route) + layout, globals
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components (Button, Card, Select, etc.)
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── ...
├── data/          # Shared static data (products, services, contact info)
├── i18n/          # i18next setup + en/fr locale files
└── lib/           # Utilities (api client, icon map, cn)
```

## Pages

- `/` - Homepage
- `/about` - About Us
- `/services` - Services
- `/products` - Products
- `/industries` - Industries
- `/contact` - Contact form
- `/policy` - Terms and Policy

## API Integration

The contact form posts to the relative path `/api/contact` (see
`src/lib/api.ts`), handled by the route handler in
`src/app/api/contact/route.ts` — same origin, no CORS involved.

## License

ISC
