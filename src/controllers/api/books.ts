import {Request, Response} from 'express';
import BookModel from '../../models/book';
import {Book} from '../../types/models';

const getAllBooks = async (req: Request, res: Response) => {
    const books: Book[] = await BookModel.find({});
    res.send(books);
};

const getBookById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const book: Book = await BookModel.findById(id);
    res.send(book);
};

export default {
    getAllBooks,
    getBookById,
};
