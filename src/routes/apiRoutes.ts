import express from 'express';
import passport from 'passport';
import apiController from '../controllers/apiController';

const router = express.Router();
const authenticate = passport.authenticate('local', {session: true});
const mustAuthenticated = apiController.auth.mustAuthenticated;

router.get('/check', apiController.check);

router.get('/books', apiController.books.getAllBooks);
router.get('/books/:id', apiController.books.getBookById);

router.get('/authors', mustAuthenticated, apiController.authors.getAllAuthors);
router.get('/authors/:id', apiController.authors.getAuthorById);
router.get('/authors/initial/:id', apiController.authors.getAuthorByInitialId);
router.post('/authors/', apiController.authors.postAuthor);

router.get('/logout', mustAuthenticated, apiController.auth.logout);
router.post('/login', authenticate, apiController.auth.login);
router.post('/signup', apiController.auth.signup);

export default router;
