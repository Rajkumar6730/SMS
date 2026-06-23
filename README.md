# Student Management System

A full-stack Student Management System built using React.js, Node.js, Express.js, MongoDB Atlas, and Tailwind CSS. The application allows administrators to manage student admissions, store student records, and perform CRUD operations through a modern web interface.

##  Features

### Student Management

* Add New Student
* View Student Details
* Update Student Information
* Delete Student Records
* Search Students
* Filter Students

### Admission Form

* First Name
* Last Name
* Email Address
* Phone Number
* Gender
* Date of Birth
* Course
* Hall Ticket Number
* College Name
* College Code
* Course Duration
* Address
* Student Photo Upload

### Authentication

* Secure Login System
* Protected Routes
* Role-Based Access

### Dashboard

* Student Statistics
* Total Students Count
* Recent Admissions
* Search and Filter Options

### UI Features

* Responsive Design
* Dark/Light Theme Support
* Modern Tailwind CSS Interface
* Mobile Friendly Layout

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* CORS
* Dotenv

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---



---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Student_Management_System.git
```

### Frontend Setup

```bash
cd student-management-system

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

### Backend Setup

```bash
cd backend

npm install

node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Students

#### Get All Students

```http
GET /api/students
```

#### Get Student By ID

```http
GET /api/students/:id
```

#### Add Student

```http
POST /api/students
```

#### Update Student

```http
PUT /api/students/:id
```

#### Delete Student

```http
DELETE /api/students/:id
```

---

## Deployment

### Frontend Deployment

Deploy using Vercel:

```text
https://vercel.com
```

### Backend Deployment

Deploy using Render:

```text
https://render.com
```

### Database

MongoDB Atlas:

```text
https://www.mongodb.com/atlas
```

---

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Student Admission Form
* Student List Page
* Student Profile Page

---

## Future Enhancements

* Attendance Management
* Fee Management System
* Student Result Management
* PDF Report Generation
* Email Notifications
* Admin Analytics Dashboard
* Multi-User Role Management

---

## project development

Student Management System developed as a Full Stack Web Development Project using React, Node.js, Express, and MongoDB.

---

## 📄 License

This project is developed for educational and learning purposes.
