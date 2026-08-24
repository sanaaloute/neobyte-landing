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
- **express-rate-limit** - Rate limiting (100 req/15min globally, 5 req/hour on `POST /api/contact`)

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
# Optional: force TLS on/off. Defaults to true when SMTP_PORT=465, false otherwise.
# SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
# Sender address (defaults to SMTP_USER)
SMTP_FROM=noreply@neobyte.tech
# Recipient of contact form notifications (defaults to SMTP_USER)
CONTACT_EMAIL=contact@neobyte.tech
```

In production (`NODE_ENV=production`) the server refuses to boot unless
`FRONTEND_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` are set.
Contact form submissions are always persisted to `data/submissions.jsonl`
(JSON Lines, git-ignored) before any email is attempted.

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

All other content (services, products, projects, blog) is served by the
frontend and no longer exposed by this API.

### Health Check

- `GET /health` - Server health status

## Tests

```bash
npm test
```

Runs the vitest + supertest suite in `test/`. Tests are hermetic: each test
file uses a fresh temp `DATA_DIR` (cleaned up afterwards) and SMTP is
blanked out so submissions follow the development `email-not-configured`
path.

## Project Structure

```
src/
├── routes/         # API route handlers
│   └── contact.js
├── app.js          # Express app setup (no listener; exports validateEnv)
└── server.js       # Entry point: env validation + listen + shutdown
test/
├── setup.js        # vitest setup: temp DATA_DIR, env isolation
├── contact.test.js
└── rate-limit.test.js
```

## CORS Configuration

The backend is configured to accept requests from the frontend URL specified in `FRONTEND_URL` environment variable.

## License

ISC
