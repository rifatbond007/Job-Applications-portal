# Job Application Portal - Client

React frontend for the Job Application Portal.

## Tech Stack

- React 18+
- TypeScript
- Vite
- Tailwind CSS (or your chosen styling)

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your API URL and other config
```

## Development

```bash
npm run dev
```

Runs at `http://localhost:5173` (or port from Vite config).

## Build

```bash
npm run build
```

Output in `dist/`.

## Test

```bash
npm run test
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |
| `VITE_APP_NAME` | Application display name | `JAT Tracker` |

See `.env.example` for the full list.
