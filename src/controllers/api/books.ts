import {NextFunction, Request, Response} from 'express';
import {Error} from 'mongoose';
import BookModel from '../../models/book';
import {Book} from '../../types/models';
import {createJsonError} from '../../libs/errorHandler';

const getAllBooks = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return BookModel.find({})
        .then((books: Book[]) => {
            res.send(books || []);
        })
        .catch((e: Error) => { next(e); })
};

const getBookById = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    return BookModel.findById(id)
        .then((book: Book) => {
            if (!book) {
                res.status(404).json(createJsonError(404, 'Book not found'));
            } else {
                 res.send(book);
            }
        })
        .catch((e: Error) => { next(e); });
};

export default {
    getAllBooks,
    getBookById,
};
