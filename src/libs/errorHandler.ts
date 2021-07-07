import {NextFunction, Request, Response} from 'express';
import appLogger from './appLogger';
import {ErrorFieldValidation, JsonError, JsonErrorItem} from '../types/server';
import { ERRORS } from '../constants';

const log = appLogger(module);

export const createJsonError = (code: number, message: string): JsonError => ({
  error: { code, message }
});

export const createValidationError = (code: number, message: string, errors: ErrorFieldValidation[] | null) => ({
    error: { code, message, errors }
});

export const createJsonErrorItem = (code: number, message: string): JsonErrorItem => ({ code, message });

const errorHandler = (err: JsonErrorItem, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent || !err) {
        return next(err);
    }
    const errorCode = err.code || 500;
    const errorMessage = err.message || ERRORS.SERVER;
    log.error(errorMessage);
    res.status(errorCode).json(createJsonError(errorCode, errorMessage));
};

export default errorHandler;
