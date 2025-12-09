# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm installed

## Setup Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Backend Environment

```bash
cp env.example .env
```

Edit `.env` and add your email configuration for the contact form.

### 3. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 5. Configure Frontend Environment (Optional)

```bash
cp .env.example .env
```

Default API URL is `http://localhost:5000/api` - only change if your backend runs on a different port.

### 6. Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Access the Website

Open your browser and navigate to: `http://localhost:3000`

## Troubleshooting

- **Port already in use**: Change the port in `vite.config.ts` (frontend) or `.env` (backend)
- **API connection errors**: Make sure backend is running and `VITE_API_URL` in frontend `.env` matches backend URL
- **Email not sending**: Check SMTP configuration in backend `.env`

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

### Backend

```bash
cd backend
npm start
```

Make sure `NODE_ENV=production` in `.env`
