# Neobyte Technology - Frontend

Modern React frontend built with Vite, TypeScript, TailwindCSS, and Framer Motion.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

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

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Base UI components (Button, Card, etc.)
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── ...
├── pages/          # Page components
├── lib/            # Utilities and helpers
│   ├── api.ts      # API client
│   ├── utils.ts    # Utility functions
│   └── icon-map.tsx
└── App.tsx         # Main app component with routing
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Dark/Light theme toggle
- ✅ Smooth animations with Framer Motion
- ✅ SEO-friendly routing
- ✅ Type-safe API client
- ✅ Modern UI components

## Pages

- `/` - Homepage
- `/about` - About Us
- `/services` - Services
- `/products` - Products
- `/contact` - Contact form
- `/policy` - Terms and Policy

## API Integration

The frontend communicates with the backend API through the `apiClient` in `src/lib/api.ts`. Make sure the backend server is running on port 5000 (or update `VITE_API_URL`).

## Deployment to Vercel

### Prerequisites
- A Vercel account ([vercel.com](https://vercel.com))
- Vercel CLI (optional, for command-line deployment)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Import your project on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Select the `frontend` folder as the root directory (or deploy from the monorepo root)

3. **Configure build settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if deploying from monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` with your production API URL (e.g., `https://your-api-domain.com/api`)

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production deployment, use `vercel --prod`

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   - Enter your production API URL when prompted
   - Select all environments (Production, Preview, Development)

### Post-Deployment

- Your app will be available at `https://your-project.vercel.app`
- Vercel automatically creates preview deployments for every push to your repository
- Production deployments are created when you push to your main branch (or merge PRs)

### Important Notes

- Make sure your backend API CORS settings allow requests from your Vercel domain
- Update `VITE_API_URL` environment variable in Vercel dashboard to point to your production API
- The `vercel.json` file is configured to handle client-side routing (React Router)

## License

ISC
