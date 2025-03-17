# 📖 Book Tracker Backend 

This is a backend service for tracking books and reading progress. Built with [NestJS](https://nestjs.com/) and [Prisma ORM](https://www.prisma.io/) for PostgreSQL.

## Features

- User authentication via Google OAuth2 and JWT
- CRUD operations for books
- Tracking reading records (pages read per day)
- Statistics: weekly and monthly reading progress
- Automatic addition of a record when changing book pages (SQL Trigger)
- Sorting and limiting book queries
- Swagger API documentation

## Technologies

- Node.js
- NestJS
- PostgreSQL
- Prisma ORM
- Passport.js (Google & JWT strategies)
- Swagger (OpenAPI)

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database

### Installation

```bash
git clone https://github.com/artemhula/book_tracker_backend.git
cd book_tracker_backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/booktracker
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Database Migration

```bash
npx prisma migrate dev
```

### Running the Server

```bash
npm run start:dev
```

### API Documentation

Swagger UI is available at [http://localhost:3000/api](http://localhost:3000/api).

- All endpoints and query parameters are documented.

## Project Structure

```
src/
  auth/         # Authentication (Google, JWT)
  book/         # Book CRUD and queries
  record/       # Reading records
  stats/        # Statistics endpoints
  prisma/       # Prisma service
  utils/        # Utility functions
  decorators    # Self-made decorators
  
prisma/
  schema.prisma # Database schema
```

## Example API Usage

- **Create a book:** `POST /book`
- **Get books:** `GET /book?limit=10&orderBy=title&order=asc`
- **Add reading record:** `POST /record`
- **Get stats:** `GET /stats?dayCount=7`
- **Get stats for a book:** `GET /stats/:bookId?dayCount=30`
