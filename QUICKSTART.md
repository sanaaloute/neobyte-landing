# Quick Start Guide

## Prerequisites

- Node.js 18.18+ installed
- npm installed

## Setup Steps

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Run this at the **repository root** (one level above `frontend/`). Edit `.env`
and add your email configuration for the contact form (`RESEND_API_KEY` or the
`SMTP_*` variables). This single `.env` file configures the whole site — UI
and API routes.

### 3. Start the Development Server

```bash
cd frontend
npm run dev
```

The site will run on `http://localhost:3000`

## Access the Website

Open your browser and navigate to: `http://localhost:3000`

## Troubleshooting

- **Port already in use**: run on another port with `npm run dev -- -p 3001`
- **Email not sending**: check `RESEND_API_KEY` / `SMTP_*` values in `frontend/.env`
- **Contact form errors**: check the terminal running `npm run dev` for API route logs

## Build for Production

```bash
cd frontend
npm run build
npm run start
```

## Deploy to Vercel

1. Import the repository in Vercel and set the **Root Directory** to `frontend`.
2. Add the environment variables from `.env.example` in the Vercel project settings.
3. Deploy. The contact form API (`/api/contact`) runs as a Node.js serverless function.
