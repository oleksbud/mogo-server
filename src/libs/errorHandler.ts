import {NextFunction, Request, Response} from 'express';
import appLogger from './appLogger';
import {DbError, JsonError} from '../types/server';
import { ERRORS } from '../constants';

const log = appLogger(module);

export const createJsonError  = (code: number, message: string): JsonError => ({
  error: { code, message }
});

export const createObjectError = (obj: Object): DbError => ({
    error: { code: 500, ...obj }
});

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent || !err) {
        return next(err);
    }
    if (err.message) {
        log.error(err.message);
        res.status(500).json(createObjectError(err));
    } else {
        log.error(ERRORS.SERVER)
        res.status(500).json(createJsonError(500, ERRORS.SERVER));
    }
};

export default errorHandler;
