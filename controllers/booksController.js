const Book = require('../models/Book');
const Student = require('../models/Student');
const LibraryAttendant = require('../models/LibraryAttendant');

exports.createBook = async (req, res) => {
  try {
    const { title, isbn, authors } = req.body;
    if (!title || !isbn || !authors || !Array.isArray(authors) || authors.length === 0) {
      return res.status(400).json({ error: 'title, isbn and authors are required' });
    }
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({ page, limit, total, count: books.length, books });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    if (!book) return res.status(404).json({ error: 'Book not found' });
    return res.json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('authors')
      .populate('borrowedBy')
      .populate('issuedBy');

    if (!book) return res.status(404).json({ error: 'Book not found' });
    return res.json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    return res.json({ message: 'Book deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;
    if (!studentId || !attendantId || !returnDate) {
      return res.status(400).json({ error: 'studentId, attendantId and returnDate are required' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.status !== 'IN') return res.status(400).json({ error: 'Book is currently not available (must be IN)' });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const attendant = await LibraryAttendant.findById(attendantId);
    if (!attendant) return res.status(404).json({ error: 'Library attendant not found' });

    book.status = 'OUT';
    book.borrowedBy = student._id;
    book.issuedBy = attendant._id;
    book.returnDate = new Date(returnDate);

    await book.save();
    await book.populate('authors borrowedBy issuedBy');

    return res.json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.status !== 'OUT') return res.status(400).json({ error: 'Book is already IN' });

    book.status = 'IN';
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();
    await book.populate('authors');

    return res.json(book);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};