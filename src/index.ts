import express, { Request, Response } from 'express';
import config from 'config';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import {ERRORS} from './constants';
import {ServerConfig, SessionConfig} from './types/server';
import appLogger from './libs/appLogger';
import httpLogger from './libs/httpLogger';
import errorHandler, {createJsonError} from './libs/errorHandler';
import apiRoutes from './routes/apiRoutes';
import passportInitialize from './libs/passport';
import {mongoStore} from './libs/mongo';

// configure modules
const serverConfig: ServerConfig = config.get('server');
const sessionConfig: SessionConfig = config.get('session');
const log = appLogger(module);
const app = express();
passportInitialize();
log.debug('DEBUG MODE IS ON');

// server middleware
app.use(cookieParser());
app.use(expressSession({
    secret: sessionConfig.secret,
    cookie: sessionConfig.cookie,
    name: sessionConfig.name,
    resave: false,
    saveUninitialized: true,
    store: mongoStore
}));
app.use(express.json());
app.use(httpLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

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
