# Acente Yönetim Sistemi

Otel ve misafir yönetimi için bir web uygulaması.

- **Backend**: Spring Boot 3 + PostgreSQL (REST API on `http://localhost:8080`)
- **Frontend**: Next.js 14 (App Router) on `http://localhost:3000`

---

## Prerequisites

- **Java 21**
- **Docker Desktop** (for PostgreSQL)
- **Node.js** 18 or later (for the frontend)

---

## Running the project

### 1. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL container on `localhost:5432`.

### 2. Run the backend

```bash
./mvnw spring-boot:run
```

Or open the project in any IDE and run `AcenteYonetimApplication`.

The Spring Boot application runs **directly on the host machine** (not containerised). It connects to the Dockerised PostgreSQL instance via the settings in `src/main/resources/application.properties`.

API is available at `http://localhost:8080`.

### 3. Run the frontend

```bash
cd frontend
npm install        # first time only
npm run dev
```

Frontend is available at `http://localhost:3000`.

---

## Notes

- The Spring Boot application is **not containerised** in this phase — only PostgreSQL runs in Docker.
- The frontend reads `NEXT_PUBLIC_API_URL` from `frontend/.env.local` (defaults to `http://localhost:8080`). Edit that file to point at a different backend if needed.
- No authentication is required — all endpoints are open.
