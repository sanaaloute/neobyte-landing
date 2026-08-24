# Neobyte Technology

Full-stack website for Neobyte Technology - AI Software Development & Solutions.

## Project Structure

```
Neobyte/
├── frontend/       # Next.js (App Router) frontend
├── backend/        # Express.js backend API
├── .gitignore
└── README.md
```

## Tech Stack

### Frontend
- Next.js 15 (App Router) + React 19
- TypeScript
- TailwindCSS
- react-i18next (EN/FR)
- Lucide React

### Backend
- Node.js + Express
- Nodemailer (for contact form)
- CORS, Helmet, Morgan

## Quick Start

### Backend

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default BACKEND_URL: http://localhost:5000)
npm run dev
```

Frontend runs on `http://localhost:3000` and proxies `/api/*` to the backend.

## Features

- ✅ Modern, responsive design
- ✅ Dark/Light theme toggle
- ✅ Smooth animations
- ✅ Contact form with email integration
- ✅ SEO-friendly
- ✅ Type-safe codebase

## Development

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open `http://localhost:3000` in your browser

## License

ISC
