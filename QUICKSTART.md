# Quick Start Guide

## Prerequisites

- Node.js 18.18+ installed
- npm installed

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` (repository root) and add your email configuration for the
contact form (`RESEND_API_KEY`, `SMTP_FROM`, `CONTACT_EMAIL`, or the `SMTP_*`
fallback). This single `.env` file configures the whole site — UI and API
routes.

### 3. Start the Development Server

```bash
npm run dev
```

The site will run on `http://localhost:3000`

## Access the Website

Open your browser and navigate to: `http://localhost:3000`

## Troubleshooting

- **Port already in use**: run on another port with `npm run dev -- -p 3001`
- **Email not sending**: check `RESEND_API_KEY` and `SMTP_FROM` in `.env` —
  the sender must be on a domain verified in your Resend account
  (a verified subdomain like `auth.barkosem.com` works)
- **Contact form errors**: check the terminal running `npm run dev` for API route logs

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Import the repository in Vercel — Next.js is auto-detected from the root.
2. Add the environment variables from `.env.example` in the Vercel project settings.
3. Deploy. The contact form API (`/api/contact`) runs as a Node.js serverless function.
