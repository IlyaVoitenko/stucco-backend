# Stucco Shop API

Backend API for managing a stucco items shop.  
Built with NestJS, Prisma, PostgreSQL, JWT cookie auth, and S3 image storage.

## Overview

This service powers:

- catalog management for `categories` and `products`
- file uploads for category/product images to AWS S3
- admin/user authentication with JWT stored in HTTP-only cookies
- role-based access control for protected operations

All API routes are exposed under the global prefix: `api`.

Example base URL in local development: `http://localhost:3007/api`.

## Tech Stack

- `NestJS` (modular Node.js framework)
- `TypeScript` (ESM mode)
- `Prisma` + PostgreSQL
- `@aws-sdk/client-s3` for media storage
- `class-validator` / `class-transformer` for request validation
- `Jest` for unit/e2e tests

## Project Structure

```text
src/
  auth/          # login/logout, guards, role decorators
  users/         # admin-managed users
  categories/    # categories CRUD + image upload
  products/      # products CRUD + sizes + image upload
  shared/        # shared services (S3)
  common/        # shared pipes/constants
  prisma.service.ts
  app.module.ts
  main.ts
prisma/
  schema.prisma
  migrations/
```

## Prerequisites

- Node.js 20+
- Yarn 1.x (lockfile is Yarn-based)
- PostgreSQL database
- AWS S3 bucket and IAM credentials with `PutObject`/`DeleteObject` permissions

## Environment Variables

Create `app/.env` (or update existing values) with the following keys:

```env
NODE_ENV=development
PORT=3007

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public
SECRET_KEY=replace-with-long-random-jwt-secret

AWS_ACCESS_KEY_ID=replace-me
AWS_SECRET_ACCESS_KEY=replace-me
AWS_REGION=eu-central-1
AWS_BUCKET_NAME=your-bucket-name

DEV_STORE_WEBSITE_URL=http://localhost:5173
DEV_ADMIN_PANEL_URL=http://localhost:3000
ADMIN_PANEL_URL=https://your-admin-domain
PRODUCTION_STORE_WEBSITE_URL=https://your-store-domain
```

Important:

- never commit real secrets to git
- rotate secrets immediately if they were exposed
- use separate credentials for development and production

## Installation

```bash
yarn install
```

## Database Setup (Prisma)

Run migrations against your configured `DATABASE_URL`:

```bash
npx prisma migrate deploy
```

For local iterative development, you can use:

```bash
npx prisma migrate dev
```

## Run the API

```bash
# development
yarn start

# watch mode (recommended locally)
yarn start:dev

# production build and start
yarn build
yarn start:prod
```

## API Modules and Routes

All endpoints below are prefixed with `/api`.

### Auth

- `POST /auth/login` - login and set `jwtToken` + `csrfToken` cookies
- `PATCH /auth/logout` - clear auth cookies (guarded)
- `GET /auth/is-logged-in` - auth health check (guarded)

### Users (Admin)

- `GET /auth/user` - list users
- `POST /auth/user` - create user
- `GET /auth/user/:id` - get user by id
- `PATCH /auth/user/:id` - update user
- `DELETE /auth/user/:id` - delete user

### Categories

- `GET /categories`
- `GET /categories/:id`
- `POST /categories` (guarded, multipart image upload)
- `PATCH /categories/:id` (guarded, optional image upload)
- `DELETE /categories/:id` (guarded)

### Products

- `GET /products`
- `GET /products/:id`
- `GET /products/all/:categoryId`
- `POST /products` (guarded, multipart image upload)
- `PATCH /products/:id` (guarded, optional image upload)
- `DELETE /products/:id` (guarded)

## Request Notes

- upload endpoints expect multipart form-data with `image` field
- image MIME types are restricted (png/jpeg/jpg/webp/avif/svg+xml)
- `sizes` on product create/update can be sent as JSON string array
- role checks are enforced via `AuthGuard` + `RolesGuard`

## Scripts

```bash
yarn start
yarn start:dev
yarn start:debug
yarn build
yarn start:prod
yarn lint
yarn format
yarn test
yarn test:watch
yarn test:cov
yarn test:e2e
```

## License

Private internal project (`UNLICENSED`).
