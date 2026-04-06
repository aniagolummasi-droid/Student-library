# School Library Management API

A RESTful API for managing a school library system with support for books, authors, students, and library attendants. Built using the MVC (Model-View-Controller) architectural pattern.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Server Monitoring**: Nodemon (development)
- **HTTP Logging**: Morgan

## Project Structure (MVC Pattern)

```
├── models/                    # Data models (MongoDB schemas)
│   ├── Author.js
│   ├── Book.js
│   ├── Student.js
│   └── LibraryAttendant.js
├── controllers/               # Business logic and request handlers
│   ├── authorsController.js
│   ├── booksController.js
│   ├── studentsController.js
│   └── attendantsController.js
├── routes/                    # API routes
│   ├── authors.js
│   ├── books.js
│   ├── students.js
│   └── attendants.js
├── app.js                     # Express app configuration
├── .env                       # Environment variables
└── package.json               # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v12+)
- MongoDB (local or Atlas cloud instance)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniagolummasi-droid/Student-library.git
   cd Student-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/library-system
   PORT=3000
   ```
   - For local MongoDB: Use `mongodb://127.0.0.1:27017/library-system`
   - For MongoDB Atlas: Use your connection string

4. **Start MongoDB** (if using local instance)
   ```bash
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000
```

### Common Response Format

**Success Response (2xx):**
```json
{
  "_id": "...",
  "field": "value"
}
```

**Error Response (4xx/5xx):**
```json
{
  "error": "Error message"
}
```

---

## Endpoints

### Authors
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/authors` | Create a new author |
| GET | `/authors` | Get all authors |
| GET | `/authors/:id` | Get author by ID |
| PUT | `/authors/:id` | Update author |
| DELETE | `/authors/:id` | Delete author |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books` | Create a new book |
| GET | `/books` | Get all books (supports pagination & search) |
| GET | `/books/:id` | Get book by ID |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book |
| POST | `/books/:id/borrow` | Borrow a book |
| POST | `/books/:id/return` | Return a book |

**Book Query Parameters:**
- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Items per page
- `search` - Search by book title or ISBN

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/students` | Create a new student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

### Library Attendants
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendants` | Create a new attendant |
| GET | `/attendants` | Get all attendants |
| PUT | `/attendants/:id` | Update attendant |
| DELETE | `/attendants/:id` | Delete attendant |

---

## Testing with Postman

A Postman collection is included in the repository (`postman_collection.json`).

### Import the Collection:
1. Open Postman
2. Click **Import** → **File**
3. Select `postman_collection.json`
4. Use the imported requests to test all endpoints

---

## Business Logic

### Book Borrowing
- When a book is borrowed, its `status` is set to `OUT`
- Records include: `borrowedBy` (student ID), `issuedBy` (attendant ID), `returnDate`

### Book Returning
- When a book is returned, `status` is reset to `IN`
- Borrower info is cleared

### GET Book Details
- For books with `status = OUT`, returns populated author, student, and attendant information

---

## Error Handling

- **201**: Resource created successfully
- **200**: Request successful
- **400**: Bad request (validation error)
- **404**: Resource not found
- **500**: Server error

## License

Open source
