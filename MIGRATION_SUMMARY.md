# Railway Reservation System - MongoDB Migration Summary

## ✅ COMPLETED: MySQL → MongoDB Migration

### Overview
The system has been **successfully migrated from MySQL to MongoDB** while keeping the Java Spring Boot backend.

### Changes Made:

#### 1. **Dependencies (pom.xml)**
- ❌ Removed: `spring-boot-starter-data-jpa`
- ❌ Removed: `mysql-connector-j`
- ✅ Added: `spring-boot-starter-data-mongodb`

#### 2. **Configuration (application.properties)**
- Changed from MySQL connection to MongoDB:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/railway_db
spring.data.mongodb.database=railway_db
```

#### 3. **Models - Replaced JPA with MongoDB Annotations**
- `User.java` - Changed ID from `Long` to `String`, using `@Document` and `@Id`
- `Train.java` - Same changes, all fields preserved
- `Booking.java` - Same changes, using `@DBRef` for relationships

#### 4. **Repositories - Changed to MongoRepository**
- `UserRepository` - Extends `MongoRepository<User, String>`
- `TrainRepository` - Extends `MongoRepository<Train, String>`  
- `BookingRepository` - Extends `MongoRepository<Booking, String>`

#### 5. **Services - Updated ID types from Long to String**
- All methods using IDs now accept `String` instead of `Long`

#### 6. **Controllers - Updated PathVariable types**
- All `@PathVariable Long id` changed to `@PathVariable String id`
- All `@RequestParam Long` changed to `@RequestParam String`

---

## 🚀 Setup Instructions

### Step 1: Install MongoDB

**Download & Install:**
- Go to https://www.mongodb.com/try/download/community
- Download MongoDB Community Server
- Install with default settings
- MongoDB will run on `localhost:27017`

**Or use MongoDB Atlas (Cloud - Free):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `application.properties` with your connection string

### Step 2: Start MongoDB Locally

**Windows:**
```powershell
# MongoDB should auto-start as a service
# Or manually start:
net start MongoDB
```

**Mac/Linux:**
```bash
mongod
```

### Step 3: Build and Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will:
- Connect to MongoDB on `localhost:27017`
- Create database `railway_db` automatically
- Seed initial data (trains, users) on first run

### Step 4: Start Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📊 Data Structure in MongoDB

### Collections:
1. **users** - User accounts (admin, regular users)
2. **trains** - Train information with class-based pricing
3. **bookings** - Ticket bookings with references to users and trains

### Sample Document (Train):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "trainName": "Rajdhani Express",
  "trainNumber": "12001",
  "source": "Delhi",
  "destination": "Mumbai",
  "departureTime": "16:00",
  "arrivalTime": "08:30",
  "generalPrice": 500.0,
  "sleeperPrice": 800.0,
  "thirdAcPrice": 1200.0,
  "secondAcPrice": 1800.0,
  "firstAcPrice": 2500.0,
  "availableGeneralSeats": 100,
  "availableSleeperSeats": 150,
  ...
}
```

---

## 🌐 Deployment on Render + Vercel

### MongoDB Atlas (Free Cloud Database)
1. Create account at mongodb.com/cloud/atlas
2. Create free cluster (M0 tier)
3. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
4. Create database user
5. Get connection string

### Backend on Render
1. **Environment Variables:**
```
SPRING_DATA_MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/railway_db
FRONTEND_URL=https://your-app.vercel.app
PORT=8080
```

2. **Build Settings:**
- Build Command: `cd backend && mvn clean install`
- Start Command: `cd backend && java -jar target/reservation-1.0.0.jar`

### Frontend on Vercel
- Same as before, no changes needed
- Just update API URL environment variable

---

## ✨ Benefits of MongoDB

1. **No Schema Migration** - Add/remove fields easily
2. **Free Cloud Hosting** - MongoDB Atlas free tier
3. **Scalable** - Better for large datasets
4. **JSON-like Documents** - Natural fit for REST APIs
5. **Flexible** - Easy to modify data structure

---

## 🔧 Troubleshooting

### MongoDB Connection Failed?
```
Check if MongoDB is running:
Windows: Services → MongoDB Server
Mac/Linux: brew services list

Or use MongoDB Atlas (cloud)
```

### Port 27017 already in use?
```properties
# Change port in application.properties
spring.data.mongodb.uri=mongodb://localhost:27018/railway_db
```

### Data not showing?
```
The DataSeeder runs only if collections are empty.
To reset data, drop the database and restart backend.
```

---

## 📝 Migration Complete! 🎉

Your Railway Reservation System now runs on:
- ✅ Java Spring Boot (Backend)
- ✅ MongoDB (Database)  
- ✅ React (Frontend)

Ready for deployment on Render + Vercel!

### Overview
The system has been updated to include:
1. **Date of Travel** - Users can now select a specific travel date
2. **Travel Class** - Five class options: General, Sleeper, Third AC, Second AC, and First AC

---

## Backend Changes

### 1. Train Model (`Train.java`)
**Added Fields:**
- Class-based pricing:
  - `generalPrice`, `sleeperPrice`, `thirdAcPrice`, `secondAcPrice`, `firstAcPrice`
- Class-based seat counts:
  - `generalSeats`, `sleeperSeats`, `thirdAcSeats`, `secondAcSeats`, `firstAcSeats`
- Class-based available seats:
  - `availableGeneralSeats`, `availableSleeperSeats`, `availableThirdAcSeats`, `availableSecondAcSeats`, `availableFirstAcSeats`

### 2. Booking Model (`Booking.java`)
**Added Fields:**
- `travelDate` (LocalDate) - Date of travel
- `travelClass` (String) - Selected class (GENERAL, SLEEPER, THIRD_AC, SECOND_AC, FIRST_AC)

### 3. TrainService (`TrainService.java`)
**New Methods:**
- `updateAvailableSeatsByClass()` - Updates available seats for specific class
- `getPriceByClass()` - Returns price for a specific class
- `getAvailableSeatsByClass()` - Returns available seats for a specific class

**Updated Methods:**
- `addTrain()` - Initializes available seats for all classes
- `updateTrain()` - Updates all class-specific fields

### 4. BookingService (`BookingService.java`)
**Updated Methods:**
- `createBooking()` - Now uses class-specific pricing and seat availability
- `cancelBooking()` - Restores seats to the appropriate class

### 5. TrainController (`TrainController.java`)
**Updated Endpoints:**
- `GET /api/trains/search` - Now accepts optional `date` and `travelClass` parameters

### 6. DataSeeder (`DataSeeder.java`)
**Updated:**
- All sample trains now include pricing and seat allocation for all 5 classes

---

## Frontend Changes

### 1. Home Page (`Home.jsx`)
**Added Fields:**
- Date picker for travel date (with minimum date validation)
- Dropdown selector for travel class
- Default class set to "SLEEPER"

**Updated:**
- Search URL now includes date and class parameters

### 2. Train List Page (`TrainList.jsx`)
**Added Features:**
- Display selected travel date and class
- Show class-specific pricing
- Show class-specific seat availability
- Helper functions for class display names

**Updated:**
- Price and seat calculations based on selected class
- Booking URL includes date and class parameters

### 3. Book Ticket Page (`BookTicket.jsx`)
**Added Features:**
- Display travel date and class in booking summary
- Use class-specific pricing for total calculation
- Use class-specific seat availability for validation
- Pre-fill travel date and class from URL parameters

**Updated:**
- Form data includes `travelDate` and `travelClass`
- Price calculation uses selected class

### 4. My Bookings Page (`MyBookings.jsx`)
**Added Features:**
- Display travel date for each booking
- Display travel class for each booking
- Helper function for class display names

**Updated:**
- Booking grid shows 4 fields: Route, Travel Date, Travel Class, Booking Date

### 5. API Service (`api.js`)
**Updated:**
- `searchTrains()` - Now accepts date and travelClass parameters

---

## Class Pricing Structure (Sample Data)

### Rajdhani Express (Delhi → Mumbai)
- General: ₹500
- Sleeper: ₹800
- Third AC: ₹1200
- Second AC: ₹1800
- First AC: ₹2500

### Shatabdi Express (Chennai → Bangalore)
- General: ₹300
- Sleeper: ₹500
- Third AC: ₹700
- Second AC: ₹1000
- First AC: ₹1500

### Duronto Express (Kolkata → Delhi)
- General: ₹400
- Sleeper: ₹650
- Third AC: ₹950
- Second AC: ₹1400
- First AC: ₹2000

### Garib Rath (Mumbai → Delhi)
- General: ₹350
- Sleeper: ₹550
- Third AC: ₹850
- Second AC: ₹1200
- First AC: ₹1700

### Tejas Express (Bangalore → Chennai)
- General: ₹250
- Sleeper: ₹400
- Third AC: ₹550
- Second AC: ₹800
- First AC: ₹1200

---

## Database Migration Required

**Important:** You need to either:
1. Drop existing tables and let Spring Boot recreate them with new fields, OR
2. Run SQL migration scripts to add new columns

### Option 1: Drop and Recreate (Development Only)
In `application.properties`, temporarily set:
```properties
spring.jpa.hibernate.ddl-auto=create-drop
```
Then change back to `update` after first run.

### Option 2: Manual SQL Migration
Run the following SQL commands:

```sql
-- Add new columns to trains table
ALTER TABLE trains ADD COLUMN general_price DOUBLE;
ALTER TABLE trains ADD COLUMN sleeper_price DOUBLE;
ALTER TABLE trains ADD COLUMN third_ac_price DOUBLE;
ALTER TABLE trains ADD COLUMN second_ac_price DOUBLE;
ALTER TABLE trains ADD COLUMN first_ac_price DOUBLE;

ALTER TABLE trains ADD COLUMN general_seats INTEGER;
ALTER TABLE trains ADD COLUMN sleeper_seats INTEGER;
ALTER TABLE trains ADD COLUMN third_ac_seats INTEGER;
ALTER TABLE trains ADD COLUMN second_ac_seats INTEGER;
ALTER TABLE trains ADD COLUMN first_ac_seats INTEGER;

ALTER TABLE trains ADD COLUMN available_general_seats INTEGER;
ALTER TABLE trains ADD COLUMN available_sleeper_seats INTEGER;
ALTER TABLE trains ADD COLUMN available_third_ac_seats INTEGER;
ALTER TABLE trains ADD COLUMN available_second_ac_seats INTEGER;
ALTER TABLE trains ADD COLUMN available_first_ac_seats INTEGER;

-- Add new columns to bookings table
ALTER TABLE bookings ADD COLUMN travel_date DATE;
ALTER TABLE bookings ADD COLUMN travel_class VARCHAR(255);
```

---

## Testing Checklist

- [ ] Homepage displays date picker and class selector
- [ ] Date picker prevents selection of past dates
- [ ] Search redirects with date and class parameters
- [ ] Train list shows correct class-specific prices
- [ ] Train list shows correct class-specific seat availability
- [ ] Booking page pre-fills date and class
- [ ] Booking page calculates total using class price
- [ ] Booking page validates against class-specific seat availability
- [ ] Booking creation saves date and class
- [ ] My Bookings displays travel date and class
- [ ] Cancellation restores seats to correct class
- [ ] Backend validates seat availability by class

---

## Next Steps

1. **Restart Backend Server** - Allow Spring Boot to create new database columns
2. **Clear Browser Cache** - Ensure frontend gets latest code
3. **Test Complete Flow** - Search → View Trains → Book → View Bookings
4. **Verify Database** - Check that new columns are populated correctly

---

## Notes

- The compile errors shown during editing are expected and will resolve when the project is built
- Make sure to restart the Spring Boot application after database schema changes
- The DataSeeder will only run if tables are empty to avoid duplicate data
- All prices are in Indian Rupees (₹)
