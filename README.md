# Vehicle Booking — API

---

## Tech Stack

- **Framework:** NestJs
- **ORM:** Typeorm
- **Database:** PostgreSQL 17

---

## Prerequisites

- PostgreSQL installed locally

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/assessmentsshalini-hash/vehicle-booking-api.git
cd vehicle-booking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and update the values. The defaults in `.env.example` work out of the box for local development except database password in the DB_URL.

### 3. Run locally

Start the development server:

```bash
npm run start:dev
```

API will be available at `http://localhost:3000/api/`  
Swagger will be available at docs at `http://localhost:3000/api`

### 4. Deployed API URL

---
