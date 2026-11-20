# DCS Research Repository System

A React and Express application for managing student research records, manuscript PDFs, status, and project links.

## Requirements

- Node.js 20 or newer
- MySQL 8 or compatible

## Database setup

Create the database and table before starting the API:

```sql
CREATE DATABASE dcs_research CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dcs_research;

CREATE TABLE research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type ENUM('Capstone', 'Thesis') NOT NULL DEFAULT 'Capstone',
  authors TEXT NOT NULL,
  abstract TEXT NOT NULL,
  pdf_url VARCHAR(500),
  adviser VARCHAR(255) NOT NULL,
  critic VARCHAR(255) NOT NULL,
  status ENUM('MOR', 'Part A', 'Part B', 'Finished') NOT NULL DEFAULT 'MOR',
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If you already have the table from an earlier version, add its missing classification column:

```sql
ALTER TABLE research
  ADD COLUMN type ENUM('Capstone', 'Thesis') NOT NULL DEFAULT 'Capstone';
```

## Run locally

In `dcs-rt-api`, install dependencies and configure the database environment variables:

```powershell
cd dcs-rt-api
npm install
$env:DB_HOST = 'localhost'
$env:DB_USER = 'root'
$env:DB_PASSWORD = 'your-password'
$env:DB_NAME = 'dcs_research'
$env:CLIENT_ORIGINS = 'http://localhost:5173'
npm start
```

In a second terminal, run the client:

```powershell
cd dcs-rt-client
npm install
$env:VITE_API_URL = 'http://localhost:5000'
npm run dev
```

The API listens on port `5000` by default. Set `PORT` to change it. Set `VITE_API_URL` for the client to use a different API base URL; the deployed API URL is used if it is not set.

For deployment, set `CLIENT_ORIGINS` on the API to a comma-separated list of exact client origins, including the production site origin. The API accepts PDFs up to 10 MB and stores them under `dcs-rt-api/uploads`; use persistent storage or object storage in production so uploads survive redeployments.

## API routes

- `GET /api/research` — list records
- `POST /api/research` — create a record (multipart form; optional `pdf_file`)
- `PUT /api/research/:id` — update a record (multipart form; optional replacement `pdf_file`)
- `DELETE /api/research/:id` — delete a record
