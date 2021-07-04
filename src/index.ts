import express, { Request, Response } from 'express';
import config from 'config';
import appLogger from './libs/appLogger';
import httpLogger from './libs/httpLogger';
import {ServerConfig} from './types/server';

// configure modules
const serverConfig: ServerConfig = config.get('server');
const log = appLogger(module);
const app = express();

// server middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpLogger);

// routing

//error handling

// start server
app.listen(serverConfig.port, () => {
    log.info(`Mongo-server is listening at ${serverConfig.protocol}//${serverConfig.host}:${serverConfig.port}`);
});
