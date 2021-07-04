import {Request, Response} from 'express';

const getAllBooks = (req: Request, res: Response) => {
    const response = { result: 'books'};
    res.send(response)
};

const getBookById = (req: Request, res: Response) => {
    const response = { result: 'bookById'};
    res.send(response)
};

export default {
    getAllBooks,
    getBookById,
};
