# School Library Management API


- Node.js
- Express.js
- MongoDB with Mongoose

## Setup

1. Install dependencies:


npm install 
```

2. Start MongoDB locally, or set `MONGO_URI` in `.env`.

3. Run server:

```bash
npm run dev
```

4. API base URL: `http://localhost:3000`

## Endpoints

### Authors
- POST `/authors`
- GET `/authors`
- GET `/authors/:id`
- PUT `/authors/:id`
- DELETE `/authors/:id`

### Books
- POST `/books` (requires `title`, `isbn`, `authors`)
- GET `/books` (query: `page`, `limit`, `search`)
- GET `/books/:id`
- PUT `/books/:id`
- DELETE `/books/:id`
- POST `/books/:id/borrow` (body: `studentId`, `attendantId`, `returnDate`)
- POST `/books/:id/return`

### Students
- POST `/students`
- GET `/students`
- GET `/students/:id`

### Library Attendants
- POST `/attendants`
- GET `/attendants`

## Notes
- Borrowing sets book `status` to `OUT` with `borrowedBy`, `issuedBy`, `returnDate`.
- Returning resets status to `IN` and clears borrower/attendant/returnDate.
- GET `/books/:id` returns populated author, student, attendant for `OUT` books.
