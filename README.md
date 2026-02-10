# Job Application Portal (JAT Tracker)

A full-stack job application tracking system with React frontend and Java Spring Boot backend.


## Project Structure

```
job-application-portal/
├── app/
│   ├── client/          # React frontend
│   ├── server/          # Java Spring Boot API
│   └── shared/          # OpenAPI specs, schemas, docs
├── infra/               # Database, nginx, observability
├── .github/workflows/   # CI/CD pipelines
└── docker-compose.yml   # Local development stack
```

## Features

- **Auth** – User authentication and authorization
- **Applications** – Track job applications across companies
- **Resumes** – Store and manage resume versions
- **AI** – AI-powered resume tailoring and suggestions
- **Analytics** – Dashboards and insights

## Prerequisites

- Node.js 18+
- Java 17+
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

## Quick Start

### 1. Clone and configure

```bash
git clone <repository-url>
cd job-application-portal
cp .env.example .env
# Edit .env with your settings
```

### 2. Run with Docker

```bash
docker-compose up -d
```

### 3. Run locally (development)

**Backend:**

```bash
cd app/server
./mvnw spring-boot:run
```

**Frontend:**

```bash
cd app/client
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values. See `.env.example` for descriptions.

## Documentation

- [Client Setup](app/client/README.md)
- [Server Setup](app/server/README.md)
- [Security](SECURITY.md)

## License

Proprietary - All rights reserved.
