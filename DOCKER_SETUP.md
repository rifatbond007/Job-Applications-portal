# Docker Setup Guide

## Quick Start

### Run Frontend with Docker Compose

```bash
docker compose up
```

The frontend will be available at **http://localhost:3000**

### Build Only

```bash
docker compose build
```

### Stop Services

```bash
docker compose down
```

### View Logs

```bash
docker compose logs -f client
```

---

## Frontend Setup Details

### Dockerfile Structure

The `app/client/Dockerfile` uses a multi-stage build approach:

**Build Stage:**
- Node 20 Alpine image
- Installs dependencies with `npm ci`
- Builds the Vite project with `npm run build`
- Creates optimized `dist` folder

**Production Stage:**
- Minimal Node 20 Alpine image
- Uses `serve` package to serve static files
- Listens on port 3000
- Includes health check

### Docker Compose Configuration

**Service: `client`**
- Builds from `./app/client/Dockerfile`
- Exposes port `3000`
- Sets `NODE_ENV=production`
- Auto-restart on failure
- Health checks every 30 seconds
- Connected to `jobtracker-network`

### Port Mapping

- **Container Port:** 3000
- **Host Port:** 3000
- Access at: http://localhost:3000

---

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, modify the `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Access at http://localhost:3001
```

### Clear Docker Cache

```bash
docker compose build --no-cache
```

### Container Won't Start

Check logs:
```bash
docker compose logs client
```

### Force Rebuild

```bash
docker compose down
docker compose up --build
```

---

## Environment Variables

Currently using:
- `NODE_ENV=production`

To add more variables, update `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - API_URL=http://api:5000
  - DEBUG=false
```

---

## Next Steps

- For backend services, add them to `docker-compose.yml` with proper networking
- Implement multi-container setup with frontend, backend, and database
- Use environment files (`.env`) for configuration management
