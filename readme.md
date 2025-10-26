# 🚂 RailSync - Railway Reservation System

A full-stack Railway Reservation System built with **Java Spring Boot** and **React**, featuring a modern dark-themed UI and comprehensive booking management.

## ✨ Key Features

- 🎨 **Modern UI/UX**: Dark gradient theme with glassmorphism effects and smooth animations
- 🎫 **Multi-Class Booking**: 5 travel classes (General, Sleeper, 3AC, 2AC, 1AC) with independent pricing and seat management
- 👥 **Role-Based Access**: Separate user and admin dashboards with protected routes
- 🗄️ **MongoDB Integration**: Cloud database (MongoDB Atlas) with auto-seeding of 32 real Indian trains
- ⚡ **Real-time Updates**: Dynamic seat availability tracking per date and class
- 📱 **Fully Responsive**: Mobile-first design with Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **MongoDB Atlas** (Cloud Database)
- **Maven** (Build Tool)
- **Jakarta Validation**
- **RESTful API Architecture**

### Frontend
- **React 18**
- **React Router v6** (SPA Navigation)
- **Axios** (HTTP Client)
- **Tailwind CSS** (Utility-first CSS)
- **Modern ES6+ JavaScript**
- **Responsive Design Patterns**

## 🚀 Quick Start Guide

### Prerequisites

**Backend Requirements:**
- ☕ Java 17 or higher
- 📦 Maven 3.6+
- 🍃 MongoDB Atlas account (or local MongoDB)

**Frontend Requirements:**
- 🟢 Node.js 16+ 
- 📦 npm or yarn

---

### 🔧 Installation Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AbhishekU007/Railway-Reservation-System.git
cd Railway-Reservation-System
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# The application is pre-configured with MongoDB Atlas
# Check application.properties for database connection
# Current config: MongoDB Atlas (Cloud)

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

✅ **Backend will start on:** `http://localhost:8080`

**🌱 Data Seeding:** On first run, the system automatically seeds:
- 2 users (1 admin, 1 regular user)
- 32 trains covering major Indian cities
- All seat configurations (General, Sleeper, 3AC, 2AC, 1AC)

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ **Frontend will start on:** `http://localhost:3000`

---

### 🎯 Default Test Credentials

#### Admin Access
- **Email:** `admin@railway.com`
- **Password:** `admin123`
- **Access:** Full admin dashboard, train management

#### Regular User
- **Email:** `john@example.com`
- **Password:** `password123`
- **Access:** Book tickets, view bookings

---

## 📡 API Documentation

#### **User APIs**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/register` | Register new user | None |
| POST | `/api/users/login` | Login user | None |
| GET | `/api/users/{id}` | Get user by ID | User |

#### **Train APIs**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/trains` | Get all trains | None |
| GET | `/api/trains/{id}` | Get train by ID | None |
| GET | `/api/trains/search?source={s}&destination={d}` | Search trains | None |
| GET | `/api/trains/cities` | Get all cities (autocomplete) | None |
| GET | `/api/trains/{id}/availability?date={d}&class={c}` | Check seat availability | None |
| POST | `/api/trains` | Add new train | Admin |
| PUT | `/api/trains/{id}` | Update train | Admin |
| DELETE | `/api/trains/{id}` | Delete train | Admin |

#### **Booking APIs**
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings?userId={u}&trainId={t}` | Create booking | User |
| GET | `/api/bookings/user/{userId}` | Get user bookings | User |
| GET | `/api/bookings/{id}` | Get booking by ID | User |
| PUT | `/api/bookings/{id}/cancel` | Cancel booking | User |
| GET | `/api/bookings` | Get all bookings | Admin |

---

## 🎯 Project Highlights

### Multi-Class Seat Management
Each train has **5 independent travel classes** with separate seat counts and pricing:
- General, Sleeper, 3AC, 2AC, 1AC
- Real-time availability tracking per date and class
- Dynamic pricing configuration

### Auto Data Seeding
On first run, the system automatically seeds:
- 2 users (admin + regular)
- 32 trains covering 12 major Indian cities
- Realistic routes, timings, and pricing

### Modern Architecture
- **Backend:** RESTful API with service-repository pattern
- **Frontend:** Component-based React with centralized API layer
- **Database:** MongoDB with document-based storage
- **Styling:** Utility-first Tailwind CSS with custom theming

---

## 📁 Project Structure

```
Railway Reservation System/
├── backend/
│   ├── controllers/      # REST endpoints
│   ├── models/           # MongoDB entities
│   ├── repositories/     # Data access layer
│   ├── services/         # Business logic
│   └── DataSeeder.java   # Auto-seed 32 trains
└── frontend/
    ├── components/       # Reusable UI components
    ├── pages/            # Route pages
    └── services/         # API calls
```

---

## 🛠 Troubleshooting

**Backend won't start:**
```bash
# Check port 8080 is free
netstat -ano | findstr :8080

# Verify MongoDB connection in application.properties
```

**Frontend issues:**
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📜 License
MIT License

## 👨‍💻 Developer
**Abhishek Upadhyay** - [@AbhishekU007](https://github.com/AbhishekU007)

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Built with ❤️ using Spring Boot & React

</div>