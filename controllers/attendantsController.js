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
