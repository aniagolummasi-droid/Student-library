require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authorRoutes = require('./routes/authors');
const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const attendantRoutes = require('./routes/attendants');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/students', studentRoutes);
app.use('/attendants', attendantRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'School Library Management API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library-system';
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });