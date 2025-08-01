# Fastify User Profile Service

## 📌 Objective
A simple user profile API built with **Fastify, Postgres, and Docker** following best practices:

- **Functionality**
  - Model: `firstName`, `lastName`, `dateOfBirth`
  - Endpoints:
    - `GET /profiles` → Retrieve all profiles
    - `GET /profiles/:id` → Retrieve a single profile
    - `POST /profiles` → Create a profile
    - `PUT /profiles/:id` → Update a profile
  - No DELETE endpoint (not required by the challenge)
  - RESTful path and method design

- **Observability**
  - Structured logging using **Pino**
  - Request/response logs with correlation IDs

- **Code Quality**
  - ESLint + Prettier for linting and formatting
  - Vitest tests included
  - Dockerized environment

---

## 🚀 Features

✔ CRUD (except delete, per requirements)  
✔ Structured logging  
✔ Docker Compose setup  
✔ Automated DB migrations (table creation on startup)  
✔ Tests (Vitest + Supertest)  
✔ Linting & formatting  

---

## 🛠 Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/AsifShabir786/Fastify_User_Crud.git
cd fastify-user-service
npm install

Run with Docker:
docker-compose up -d --build
Fastify API basic route → http://localhost:3001

Postgres DB PORT → localhost:5434

CURL for Create a profile:(tested in postman)
curl -X POST http://localhost:3001/profiles \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Asif","lastName":"Shabbir","dateOfBirth":"1990-05-20"}'


Get all profiles:(tested in postman)
curl -X GET http://localhost:3001/profiles
Update a profile:(tested in postman)
curl -X PUT http://localhost:3001/profiles/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Caron","lastName":"Conway","dateOfBirth":"1991-01-01"}'
Tests:
$env:DATABASE_URL="postgres://admin:admin123@localhost:5434/user_profiles"
npm run test
Code Quality
Run lint:
npm run lint
Format code:

npm run format
 Folder Structure

fastify-user-service/
│── docker-compose.yml
│── Dockerfile
│── package.json
│── .eslintrc.js
│── .prettierrc
│── src/
│   ├── app.js
│   ├── db.js
│   ├── routes/profileRoutes.js
│   ├── controllers/profileController.js
│   └── models/profileModel.js
└── tests/
    └── profile.test.js




