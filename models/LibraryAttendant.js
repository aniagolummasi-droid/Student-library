const mongoose = require('mongoose');

const attendantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  staffId: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LibraryAttendant', attendantSchema);
