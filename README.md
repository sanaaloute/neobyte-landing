# Neobyte Technology

Full-stack website for Neobyte Technology - AI Software Development & Solutions.

## Project Structure

```
Neobyte/
├── frontend/       # React + Vite frontend
├── backend/        # Express.js backend API
├── .gitignore
└── README.md
```

## Tech Stack

### Frontend
- React 18 + Vite
- TypeScript
- TailwindCSS
- Framer Motion
- React Router

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
# Edit .env if needed (default: http://localhost:5000/api)
npm run dev
```

Frontend runs on `http://localhost:3000`

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
