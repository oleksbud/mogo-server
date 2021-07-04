import express, { Request, Response } from 'express';
import config from 'config';
import {ERRORS} from './constants';
import {ServerConfig} from './types/server';
import appLogger from './libs/appLogger';
import httpLogger from './libs/httpLogger';
import errorHandler, {createJsonError} from './libs/errorHandler';
import apiRoutes from './routes/apiRoutes';

// configure modules
const serverConfig: ServerConfig = config.get('server');
const log = appLogger(module);
const app = express();

// server middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpLogger);

// routing
app.use('/api', apiRoutes);

//error handling
app.use('*', (req: Request, res: Response) => {
    res.status(404).json(createJsonError(404, ERRORS.NOT_FOUND))
});
app.use(errorHandler);

// start server
app.listen(serverConfig.port, () => {
    log.info(`Mongo-server is listening at ${serverConfig.protocol}//${serverConfig.host}:${serverConfig.port}`);
});
