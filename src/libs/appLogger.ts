import winston from 'winston';

const ENV = process.env.NODE_ENV;

const getLogger = (module: NodeModule) => {
    const { timestamp, combine, colorize, label, printf  } = winston.format;
    //get last 2 part of module path, as label of log messages
    const path = module.filename.split('\\').slice(-2).join('\\');

    const myFormat = printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    });

    // Levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    return winston.createLogger({
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
