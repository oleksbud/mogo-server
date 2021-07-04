import {NextFunction, Request, Response} from 'express';
import {Error} from 'mongoose';
import {Author} from '../../types/models';
import AuthorModel from '../../models/author';
import {createJsonError} from '../../libs/errorHandler';

const getAllAuthors = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    return AuthorModel.find({})
        .then((authors: Author[]) => { res.send(authors || []); })
        .catch((e: Error) => { next(e); })
};

const getAuthorById = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    return AuthorModel.findById(id)
        .then((author: Author) => {
            if (!author) {
                res.status(404).json(createJsonError(404, 'Author not found'));
            } else {
                res.send(author);
            }
        })
        .catch((e: Error) => { next(e); });
};

// example of the method 'getAuthorById' implemented with async/await
const getAuthorById_asyncAwait = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const author: Author = await AuthorModel.findById(id);
        res.send(author);
    } catch (e: any) {
        next(e);
    }
};

export default {
    getAllAuthors,
    getAuthorById,
};
