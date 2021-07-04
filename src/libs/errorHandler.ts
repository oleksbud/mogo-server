import {NextFunction, Request, Response} from 'express';
import appLogger from './appLogger';
import {ErrorFieldValidation, JsonError} from '../types/server';
import { ERRORS } from '../constants';

const log = appLogger(module);

export const createJsonError = (code: number, message: string): JsonError => ({
  error: { code, message }
});

export const createValidationError = (code: number, message: string, errors: ErrorFieldValidation[] | null) => ({
    error: { code, message, errors }
});

export const createObjectError = (obj: Object) => ({
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
