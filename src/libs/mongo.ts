import config from 'config';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import appLogger from './appLogger';
import {MongoConfig} from '../types/mongo';

const log = appLogger(module);
const mongoConf: MongoConfig = config.get('mongo');
const connectionString = `mongodb://${mongoConf.host}:${mongoConf.port}/${mongoConf.dbName}`;
log.info(`connecting to ${connectionString}`);

const connectedMongo = mongoose;

connectedMongo.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connectedMongo.connection.on('open', () => {
    log.info('DB is connected');
});

connectedMongo.connection.on('error', (error) => {
    log.info('DB Error occurred' + error.message);
})

connectedMongo.connection.on('disconnected', () => {
    log.info('DB is disconnected');
})

export const mongoStore = MongoStore.create({
    mongoUrl: connectionString,
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
})

export default connectedMongo;
