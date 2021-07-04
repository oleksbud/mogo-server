import express from 'express';
import apiController from '../controllers/apiController';

const router = express.Router();

router.get('/check', apiController.check);

router.get('/books', apiController.books.getAllBooks);
router.get('/books/:id', apiController.books.getBookById);

router.get('/authors', apiController.authors.getAllAuthors);
router.get('/authors/:id', apiController.authors.getAuthorById);
router.get('/authors/initial/:id', apiController.authors.getAuthorByInitialId);
router.post('/authors/', apiController.authors.postAuthor);

export default router;
