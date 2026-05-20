# ServiceHive Smart Leads Dashboard

A full-stack MERN application built for the ServiceHive Full Stack Development Internship Assignment.

## Live Demo

Frontend:
https://your-frontend-url.vercel.app

Backend:
https://your-backend-url.onrender.com

---

## Features

- User Authentication
- JWT Login System
- Leads CRUD Operations
- Search Leads
- Filter Leads
- Sorting
- Pagination
- Responsive Dashboard UI
- MongoDB Integration
- REST APIs

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Folder Structure

smart-leads-dashboard/

frontend/
backend/

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Leads

GET /api/leads

POST /api/leads

PUT /api/leads/:id

DELETE /api/leads/:id

---

## Deployment

Frontend deployed on Vercel

Backend deployed on Render

Database hosted on MongoDB Atlas

---

## Author

Darshan Desale

GitHub:
https://github.com/Darshannn007

---

## Notes

This project was built as part of the ServiceHive Full Stack Development Internship Assignment.