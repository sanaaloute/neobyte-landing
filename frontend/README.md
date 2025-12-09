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

## License

ISC
