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
