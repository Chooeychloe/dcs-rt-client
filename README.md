# DCS Research Repository System

A React and Express application for managing student research records, manuscript PDFs, academic years, status, and project links. Abstracts are collected for finished research only. Search supports all-word matching across record fields, filters, relevance sorting, and highlighted title and abstract matches.

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
  academic_year VARCHAR(9),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If you already have the table from an earlier version, add its missing classification column:

```sql
ALTER TABLE research
  ADD COLUMN type ENUM('Capstone', 'Thesis') NOT NULL DEFAULT 'Capstone';
```

For an existing database, add the academic-year field as well:

```sql
ALTER TABLE research
  ADD COLUMN academic_year VARCHAR(9) NULL AFTER website_url;
```

## Run locally

In `dcs-rt-api`, copy `.env.example` to `.env` and set `DB_PASSWORD` to your actual MySQL password. `.env` is ignored by Git. Then install dependencies and start the API:

```powershell
cd dcs-rt-api
Copy-Item .env.example .env
# Edit .env and set DB_PASSWORD before continuing.
npm install
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
