# Eagle Leap Publications

A Next.js website for Eagle Leap Publications with marketing pages, publication listings, storefront flows, demo authentication, and optional backend integrations.

The repo currently supports two practical ways to run:

- Frontend-only demo mode: uses built-in Next.js route handlers for forms, login, and registration.
- Frontend + separate Node API: points the frontend at `apps/api-node` through `NEXT_PUBLIC_API_BASE_URL`.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Optional Express API in `apps/api-node`
- Optional Spring API scaffold in `apps/api-spring`

## Repo Layout

```text
.
|-- app/                 # Next.js routes and server handlers
|-- src/                 # shared UI, data, hooks, and helpers
|-- public/              # static assets
|-- apps/api-node/       # optional Express API
|-- apps/api-spring/     # optional Spring Boot API scaffold
|-- database/mysql/      # MySQL schema and seed scripts
```

## Requirements

- Node.js 18.18+ or 20+
- npm 9+

## Local Setup

### 1. Install dependencies

```bash
npm install
```

If you also want the standalone Node API:

```bash
cd apps/api-node
npm install
```

### 2. Configure environment variables

Create a local env file for the frontend:

```bash
cp .env.example .env.local
```

Frontend variables:

- `NEXT_PUBLIC_API_BASE_URL`: optional. Leave empty to use the built-in Next.js demo routes. Set it to your deployed or local backend URL, for example `http://localhost:4000`.

If you want to run the standalone Node API, create its env file too:

```bash
cd apps/api-node
cp .env.example .env
```

Important backend variables:

- `PORT`: API port, default `4000`
- `CORS_ORIGIN`: allowed frontend origins, comma-separated if needed
- `JWT_SECRET`: must be a long random string in real deployments
- `MYSQL_*`: required only when using MySQL-backed persistence
- `SMTP_*` and `EMAIL_FROM`: optional mail delivery settings
- `WHATSAPP_NUMBER`: contact number used by the API notification layer

### 3. Start the frontend

```bash
npm run dev
```

The Next.js app runs at `http://localhost:3000`.

### 4. Start the optional Node API

In a second terminal:

```bash
cd apps/api-node
npm run dev
```

The API runs at `http://localhost:4000`, and its health endpoint is:

```text
http://localhost:4000/api/v1/health
```

## Available Scripts

At the repo root:

- `npm run dev` starts the Next.js app
- `npm run build` creates a production build
- `npm run start` starts the production server
- `npm run lint` runs ESLint
- `npm run test` runs Vitest once

Inside `apps/api-node`:

- `npm run dev` starts the Express API with watch mode
- `npm run build` compiles TypeScript to `dist/`
- `npm run start` runs the compiled API

## Deployment

### Option A: Vercel frontend only

This is the fastest deployment path if you are fine with demo handlers powering the forms and auth experience.

1. Import the repo into Vercel.
2. Set the root directory to `eagle-leap-publications-main` if your Git repository includes the outer wrapper folder.
3. Build command: `npm run build`
4. Output setting: leave Vercel defaults for Next.js
5. Environment variables:
   - Leave `NEXT_PUBLIC_API_BASE_URL` empty to keep using the built-in Next handlers.
   - Or set it to your backend base URL if you are deploying the Node API separately.

### Option B: Vercel frontend + Render API

This is the best fit when you want the frontend on Vercel and the Node backend on Render.

Frontend on Vercel:

1. Deploy the root Next.js app.
2. Set `NEXT_PUBLIC_API_BASE_URL` to your Render API URL, for example `https://your-api.onrender.com`.

Node API on Render:

1. Create a new Web Service from `apps/api-node`.
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Add the environment variables from `apps/api-node/.env.example`
5. Set `CORS_ORIGIN` to your Vercel site URL

### Option C: Render for both services

You can also deploy the frontend as a Node web service on Render, but the simplest production split for this repo is:

- Vercel for the Next.js app
- Render for the standalone Node API

## Notes

- The frontend works without the standalone API because the `app/api/*` routes provide demo behavior for forms and auth.
- `NEXT_PUBLIC_API_BASE_URL` switches the frontend from demo routes to the external backend.
- MySQL is optional in the Node API. If `MYSQL_*` values are omitted, database-backed features stay unconfigured and the health check reports that status.
- A Spring Boot API scaffold also exists in `apps/api-spring`, but the Express API is the most deployment-ready backend in this repo today.

## Database

MySQL schema and seed files live in [database/mysql/README.md](./database/mysql/README.md), [database/mysql/schema.sql](./database/mysql/schema.sql), and [database/mysql/seed.sql](./database/mysql/seed.sql).
