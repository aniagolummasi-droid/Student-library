const LibraryAttendant = require('../models/LibraryAttendant');

exports.createAttendant = async (req, res) => {
  try {
    const attendant = await LibraryAttendant.create(req.body);
    return res.status(201).json(attendant);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAttendants = async (req, res) => {
  try {
    const attendants = await LibraryAttendant.find();
    return res.json(attendants);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateAttendant = async (req, res) => {
  try {
    const attendant = await LibraryAttendant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!attendant) return res.status(404).json({ error: 'Attendant not found' });
    return res.json(attendant);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteAttendant = async (req, res) => {
  try {
    const attendant = await LibraryAttendant.findByIdAndDelete(req.params.id);
    if (!attendant) return res.status(404).json({ error: 'Attendant not found' });
    return res.json({ message: 'Attendant deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
