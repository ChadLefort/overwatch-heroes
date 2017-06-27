import * as fs from 'fs';
import * as pm2 from 'pm2';
import * as winston from 'winston';

export default class Config {
    private static instance: Config;
    private logDir: string;
    public prefix: string;
    public token: string;
    public logger: winston.LoggerInstance;

    private constructor() {
        this.logger = this.getLogger();
        this.mkDir(this.logDir);
    }

    public static getInstance(): Config {
        return this.instance || (this.instance = new Config());
    }

    public getLogger(): winston.LoggerInstance {
        const env = process.env.NODE_ENV || 'development';
        const logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: env === 'development' ? 'debug' : 'info',
                    timestamp: () => (new Date()).toLocaleTimeString(),
                }),
                new (winston.transports.File)({
                    filename: `${this.logDir}/winston.log`,
                    handleExceptions: true,
                    humanReadableUnhandledException: true,
                    json: false,
                    level: env === 'development' ? 'debug' : 'info',
                    timestamp: 'YYYY-MM-DD HH:mm Z',
                }),
            ],
        });

        return logger;
    }

    public startPM2(): void {
        const maxMemory = process.env.WEB_MEMORY || 256;

        pm2.connect(() => {
            pm2.start({
                env: { NODE_ENV: process.env.NODE_ENV },
                exec_mode: 'cluster',
                log_date_fomrat: 'YYYY-MM-DD HH:mm Z',
                log_file: `${this.logDir}/pm2.log`,
                max_memory_restart: maxMemory + 'M',
                merge_logs: true,
                name: 'web',
                script: 'lib/server/index.js',
            });

            pm2.interact(process.env.KEYMETRICS_PRIVATE, process.env.KEYMETRICS_PUBLIC, 'dokku');
        });
    }

    private mkDir(dir: string): void {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}
