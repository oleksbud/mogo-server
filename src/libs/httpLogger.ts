import morgan, { StreamOptions } from 'morgan';
import appLogger from './appLogger';

const log = appLogger(module);

const stream: StreamOptions = {
    write: (message) => {
        return log.http(message);
    },
};

const httpLogger = morgan('combined', {
     stream,
});

export default httpLogger;
