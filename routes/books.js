const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController');

router.post('/', controller.createBook);
router.get('/', controller.getBooks);
router.get('/:id', controller.getBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

router.post('/:id/borrow', controller.borrowBook);
router.post('/:id/return', controller.returnBook);

module.exports = router;
