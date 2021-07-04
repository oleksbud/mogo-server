import {Request, Response} from 'express';
import AuthorModel from '../../models/author';
import {Author} from '../../types/models';

const getAllAuthors = async (req: Request, res: Response) => {
    const books: Author[] = await AuthorModel.find({});
    res.send(books);
};

const getAuthorById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const book: Author = await AuthorModel.findById(id);
    res.send(book);
};

export default {
    getAllAuthors,
    getAuthorById,
};
