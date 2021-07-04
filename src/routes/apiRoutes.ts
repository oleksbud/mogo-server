import express from 'express';
import apiController from '../controllers/apiController';

const router = express.Router();

router.get('/check', apiController.check);
router.get('/books', apiController.books.getAllBooks);
router.get('/books/:id', apiController.books.getBookById);

export default router;
