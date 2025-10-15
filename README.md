# StayWise - Property Booking Platform

StayWise is a full-stack web application for listing properties and managing bookings, simulating the core functionality of a villas/hotels booking platform.

## 🚀 Live Demo

- **Frontend**: [https://stay-wise-umber.vercel.app/]

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Security**: bcryptjs, CORS, express-validator

## 📋 Core Features

### ✅ Authentication & Authorization
- Email/password registration and login
- Password hashing with bcryptjs
- JWT-based authentication with HTTP-only cookies
- Protected routes and API endpoints

### ✅ Property Management
- Browse property listings with pagination
- View property details with images
- Search properties by location
- Property images hosted on Cloudinary

### ✅ Booking System
- Create property bookings with date selection
- Users can view their own bookings
- Admin can view all bookings
- Booking validation and conflict detection

### ✅ User Experience Pages
- **Login/Signup** - Authentication flows
- **Property List** - Browse all available properties
- **Property Details** - Detailed property view with booking form
- **My Bookings** - User's booking history

## Folder Structure
```
staywise/
├─ backend/
│ ├─ src/
│ │ ├─ models/ # Mongoose models
│ │ ├─ routes/ # Express routes
│ │ ├─ middleware/ # Auth and other middlewares
│ │ ├─ utils/ # Utility functions
│ │ └─ app.ts # Entry point of backend
| | |_ index.ts
│ ├─ package.json
│ └─ tsconfig.json
├─ frontend/
│ ├─ app/ # Next.js pages and layouts
│ ├─ components/ # React components
│ ├─ hooks/ # Custom React hooks
│ ├─ lib/ # Axios instances, API helpers
│ ├─ types/ # TypeScript types
│ ├─ public/ # Static files like images
│ ├─ styles/ # Global CSS or Tailwind config
│ ├─ package.json
│ └─ tsconfig.json
├─ .env # Environment variables
├─ README.md
└─ package.json
```
## Running Locally

### 1. Clone the repository
```bash
git clone <repo-url>
cd staywise
```
Backend

Folder: /backend

Runs on port 4000 (as per your axios base URL)

Responsible for:

MongoDB connection

Property & Booking APIs

File uploads via Cloudinary

Authentication (JWT)

Run with:
```
cd backend
npm install
npm run dev
```

Base URL: http://localhost:4000

Frontend

Folder: /frontend

Built with Next.js (App Router / Client Components)

Responsible for:

UI pages: Home, Property List, Add Property, Bookings, Login, Signup

React Query for data fetching

Axios instance to call backend

Image previews using next/image

Run with:
```
cd frontend
npm install
```

Add environment variables

Create a .env file in the root folder with the following content:
```
MONGO_URI=<your_mongo_url>
JWT_SECRET=<secret>
CLIENT_URL=http://localhost:3000
NODE_ENV=development
CLOUD_NAME=<your_cloudinary_name>
CLOUD_KEY=<your_cloudinary_key>
CLOUD_SECRET=<your_cloudinary_secret>
```
Run the backend
```
npm run dev

```
Open in browser: http://localhost:4000


Frontend

Folder: frontend/ (or the root if combined)

Built with Next.js (App Router / Client Components)

Responsible for:

UI pages: Home, Property List, Add Property, Bookings, Login, Signup

React Query for data fetching

Axios instance to call backend

Image previews using next/image

```
cd frontend
npm install
```
Add .env file in the root folder with the following content:

```
NEXT_PUBLIC_API_URL=<http://localhost:4000>
```
Run the frontend
```
npm run dev
```

Open in browser: http://localhost:3000
