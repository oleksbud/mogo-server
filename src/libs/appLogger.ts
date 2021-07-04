import winston from 'winston';

const getLogger = (module: NodeModule) => {
    const { timestamp, combine, colorize, label, printf  } = winston.format;
    //get last 2 part of module path, as label of log messages
    const pathArray = module.filename.split('\\');
    const pathSlice = pathArray[pathArray.length-2] === 'src' ? -1 : -2;
    const path = pathArray.slice(pathSlice).join('\\');

    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    });

    // Levels: { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
    return winston.createLogger({
        level: 'http',
        format: combine(
            label({ label: path }),
            colorize(),
            timestamp(),
            myFormat
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
}

export default getLogger;
