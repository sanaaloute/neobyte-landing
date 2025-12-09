# Neobyte Technology - Backend

Express.js REST API backend for Neobyte Technology website.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** (optional) - Type safety
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@neobyte.tech
```

### Development

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Production

```bash
npm start
```

## API Endpoints

### Contact

- `POST /api/contact` - Submit contact form

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID

### Blog

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug

### Health Check

- `GET /health` - Server health status

## Project Structure

```
src/
├── routes/         # API route handlers
│   ├── contact.js
│   ├── services.js
│   ├── products.js
│   ├── projects.js
│   └── blog.js
└── server.js       # Express app setup
```

## CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `FRONTEND_URL` environment variable.

## License

ISC
