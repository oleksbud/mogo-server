import {NextFunction, Request, Response} from 'express';
import {Error} from 'mongoose';
import {ERRORS} from '../../constants';
import {Author} from '../../types/models';
import {ValidationResult} from '../../types/server';
import AuthorModel from '../../models/author';
import {createJsonError, createValidationError} from '../../libs/errorHandler';
import validators from '../validators/authorValidators';

const createAuthor = (data: Author): Promise<Author> => {
    return new Promise((resolve, reject) => {
        AuthorModel.create(data)
            .then((author:Author) => resolve(author))
            .catch((e: Error) => reject({ data, statusCode: 500, errors: [{ field: '', reason: e.message }] }));
    });
};

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

const getAuthorByInitialId = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = req.params.id;
    return AuthorModel.findOne({ id })
        .then((author: Author) => {
            if (!author) {
                res.status(404).json(createJsonError(404, 'Author not found'));
            } else {
                res.send(author);
            }
        })
        .catch((e: Error) => { next(e); });
};

const postAuthor = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    return validators.validateParams(data)
        .then( () => validators.isExist(data))
        .then( (valResult) => {
            if (valResult.errors) { throw(valResult); }
            return createAuthor(data);
        })
        .then((author: Author) => { res.send(author) })
        .catch((e: ValidationResult) => {
            res.status(e.statusCode).json(createValidationError(e.statusCode, ERRORS.VALIDATION, e.errors));
        });
}

export default {
    getAllAuthors,
    getAuthorById,
    getAuthorByInitialId,
    postAuthor,
};
