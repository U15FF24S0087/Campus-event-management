# Campus Event Management System

A beginner-to-intermediate MERN Stack project designed for BCA freshers and campus event management.

## Project Summary

This project is a full-stack web application for managing college events. It includes:

- Student login and registration
- Event listing, search, and filtering
- Event detail view
- Event registration and cancellation
- Admin login
- Event CRUD operations
- Registered student viewing
- Basic event statistics
- JWT-based authentication and role-based authorization

## Tech Stack

- Frontend: ReactJS + Bootstrap
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- APIs: REST APIs
- Authentication: JWT

## Features

### Student

- Register with name, email, password, student ID, and phone
- Login securely with JWT
- Browse all events
- Search by title, description, or venue
- Filter by category
- View detailed event information
- Register for available events
- View and cancel registrations

### Admin

- Login with admin credentials
- Create new events
- Update event details
- Delete events
- View registrations for all students
- View event statistics using MongoDB aggregation

## Project Structure

```bash
Campus-event-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── seed.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── eventController.js
│   │   │   └── registrationController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validateRequest.js
│   │   ├── models/
│   │   │   ├── Event.js
│   │   │   ├── Registration.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventRoutes.js
│   │   │   └── registrationRoutes.js
│   │   ├── app.js
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## MongoDB Collections

### Users
- name
- email
- password
- role
- studentId
- phone

### Events
- title
- description
- category
- venue
- date
- startTime
- endTime
- maxParticipants
- organizer
- status

### Registrations
- event
- student
- status

## API Overview

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Events
- GET /api/events
- GET /api/events/:id
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id
- GET /api/events/stats

### Registrations
- POST /api/registrations/event/:eventId
- GET /api/registrations/my
- PUT /api/registrations/cancel/:id
- GET /api/registrations/admin/all

## Authentication & Authorization

- JWT is used to authenticate users.
- User role is checked for protected endpoints.
- Students and admins have different access rights.

## Setup Instructions

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure backend environment

Copy the example file:

```bash
copy .env.example .env
```

Then update `.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campus-event-management
JWT_SECRET=your_super_secret_key_here
```

### 3. Start backend

```bash
npm run dev
```

### 4. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 5. Configure frontend environment

```bash
copy .env.example .env
```

Update `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Start frontend

```bash
npm run dev
```

Open the app in the browser:

```bash
http://localhost:3000
```

## Default Admin Credentials

```text
Email: admin@campus.com
Password: Admin@123
```

## Why this project is useful

This project is simple enough for beginners to understand but realistic enough for a MERN interview project because it demonstrates:

- Frontend + backend integration
- Authentication and authorization
- CRUD APIs
- MongoDB relationships
- Search and filtering
- Role-based access control
- Real-world project structure

## Interview Explanation

This Campus Event Management System is a full-stack application where students can register, log in, browse events, and sign up for activities. Admins manage events and view registrations. The project uses React with Bootstrap on the frontend, Express and Node on the backend, and MongoDB for data storage. JWT ensures secure login, while Mongoose relationships and aggregation help manage event and registration data efficiently.
