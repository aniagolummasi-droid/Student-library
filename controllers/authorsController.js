const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).json(author);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    return res.json(authors);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    return res.json(author);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    return res.json(author);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    return res.json({ message: 'Author deleted' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};