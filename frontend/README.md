# Neobyte Technology - Frontend

Company landing page built with Next.js 15 (App Router), React 19, TypeScript, and TailwindCSS.

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

Create a `.env` file from `.env.example`:

```env
BACKEND_URL=http://localhost:5000
```

`BACKEND_URL` is the Express backend URL. The Next.js server proxies all
`/api/*` requests to it via a rewrite in `next.config.ts`, so the browser only
ever calls relative paths (no CORS involved).

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
`src/lib/api.ts`). Make sure the backend server is running on port 5000 (or set
`BACKEND_URL`).

## License

ISC
