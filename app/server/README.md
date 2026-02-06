# Job Application Portal - Server

Java Spring Boot REST API for the Job Application Portal.

## Tech Stack

- Java 17+
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway (migrations)

## Setup

```bash
cp .env.example .env
# Edit .env with database URL and secrets
./mvnw spring-boot:run
```

Or run with profiles:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## Build

```bash
./mvnw clean package
```

## Test

```bash
./mvnw test
```

## Configuration

- `application.yml` – Base config
- `application-dev.yml` – Development overrides
- `application-prod.yml` – Production overrides

Environment variables override YAML values. See `.env.example` for required vars.

## API

- Base path: `/api`
- OpenAPI spec: `/api/docs` or `app/shared/openapi/`
