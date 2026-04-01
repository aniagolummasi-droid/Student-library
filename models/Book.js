const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }],
  status: { type: String, enum: ['IN', 'OUT'], default: 'IN' },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'LibraryAttendant', default: null },
  returnDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
