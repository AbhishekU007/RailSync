# Railway Reservation System

A full-stack Railway Reservation System built with **Java Spring Boot** (Backend) and **React** (Frontend).

## Features

### User Features
- ✅ User Registration & Login
- ✅ Search trains by source and destination
- ✅ Book train tickets
- ✅ View booking history
- ✅ Cancel bookings

### Admin Features
- ✅ Add new trains
- ✅ View all trains
- ✅ Delete trains
- ✅ View all bookings

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Database
- Maven
- Lombok

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS

## Project Structure

```
railway-reservation/
├── backend/
│   ├── src/main/java/com/railway/reservation/
│   │   ├── controllers/
│   │   │   ├── UserController.java
│   │   │   ├── TrainController.java
│   │   │   └── BookingController.java
│   │   ├── models/
│   │   │   ├── User.java
│   │   │   ├── Train.java
│   │   │   └── Booking.java
│   │   ├── repositories/
│   │   │   ├── UserRepository.java
│   │   │   ├── TrainRepository.java
│   │   │   └── BookingRepository.java
│   │   ├── services/
│   │   │   ├── UserService.java
│   │   │   ├── TrainService.java
│   │   │   └── BookingService.java
│   │   └── RailwayReservationApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── TrainList.jsx
    │   │   ├── BookTicket.jsx
    │   │   ├── MyBookings.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── tailwind.config.js
```

## Prerequisites

### Backend
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

### Frontend
- Node.js 16+
- npm or yarn

## Setup Instructions

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE railway_db;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Update application.properties with your MySQL credentials
# Default: username=root, password=root

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### User APIs
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get user by ID

### Train APIs
- `GET /api/trains` - Get all trains
- `GET /api/trains/{id}` - Get train by ID
- `GET /api/trains/search?source={source}&destination={destination}` - Search trains
- `POST /api/trains` - Add new train (Admin)
- `PUT /api/trains/{id}` - Update train (Admin)
- `DELETE /api/trains/{id}` - Delete train (Admin)

### Booking APIs
- `POST /api/bookings?userId={userId}&trainId={trainId}` - Create booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}/cancel` - Cancel booking
- `GET /api/bookings` - Get all bookings (Admin)

## Default Test Data

### Create Admin User
```json
{
  "name": "Admin User",
  "email": "admin@railway.com",
  "password": "admin123",
  "phone": "9876543210",
  "role": "ADMIN"
}
```

### Create Regular User
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543211",
  "role": "USER"
}
```

### Sample Trains (Add via Admin Dashboard)
```json
{
  "trainName": "Rajdhani Express",
  "trainNumber": "12001",
  "source": "Delhi",
  "destination": "Mumbai",
  "departureTime": "16:00",
  "arrivalTime": "08:30",
  "totalSeats": 500,
  "price": 1500.00
}
```

```json
{
  "trainName": "Shatabdi Express",
  "trainNumber": "12002",
  "source": "Chennai",
  "destination": "Bangalore",
  "departureTime": "06:00",
  "arrivalTime": "11:30",
  "totalSeats": 300,
  "price": 800.00
}
```

## Usage Flow

1. **Register**: Create a new user account at `/register`
2. **Login**: Login with your credentials at `/login`
3. **Search**: Search for trains by entering source and destination on home page
4. **Book**: Select a train and fill passenger details to book tickets
5. **View Bookings**: Check your bookings at `/my-bookings`
6. **Cancel**: Cancel bookings if needed
7. **Admin**: Login with admin credentials to access admin dashboard at `/admin`

## Features to Note

- **No JWT**: Simple login system using localStorage
- **Real-time Seat Updates**: Available seats decrease on booking
- **Booking Management**: Users can view and cancel their bookings
- **Admin Controls**: Admins can manage trains
- **Responsive Design**: Works on all screen sizes

## Troubleshooting

### Backend Issues
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify port 8080 is not in use

### Frontend Issues
- Clear browser cache
- Check if backend is running on port 8080
- Verify CORS configuration

### Common Errors
- **Connection refused**: Backend not running
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: Check API endpoint URLs

## Future Enhancements
- JWT authentication
- Payment gateway integration
- Email notifications
- Train schedule management
- Seat selection feature
- Multiple passenger booking
- PDF ticket generation

## License
MIT License

## Contact
For issues or questions, please open an issue on GitHub.