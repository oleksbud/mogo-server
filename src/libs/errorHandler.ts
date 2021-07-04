import { Request, Response } from 'express';
import appLogger from './appLogger';
import { JsonError } from '../types/server';
import { ERRORS } from '../constants';

const log = appLogger(module);

export const createJsonError  = (code: number, message: string): JsonError => ({
  error: { code, message }
});

const errorHandler = (err: Error, req: Request, res: Response) => {
    console.log(err);
    if (err.hasOwnProperty('message')) {
        log.error(err.message);

        res.status(400).json(createJsonError(400, err.message));
    } else {
        res.status(400).json(createJsonError(400, ERRORS.BAD_REQUEST));
    }
};

export default errorHandler;
