import * as http from 'http';
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'express-flash-2';
import fs from 'fs';
import { resolve, join } from 'path';
import ini from 'ini';
import { mockMiddleware } from './middleware';
export { Entity } from './Entity';
export { Column } from './decorators/Column';
export { OneToMany, ManyToOne, OneToOne } from './decorators/Relation';
export { mockMiddleware } from './middleware';
import log from './utils/log';

export class Server {
  app: Express;
  config: any;

  constructor(option: { config: string, quite: boolean }) {

    const config: any = {
      port: 7001,
      include: ['./models'],
      quite: false,
    };
    if (fs.existsSync(resolve('.', option.config))) {
      Object.assign(config, JSON.parse(fs.readFileSync(resolve('.', option.config), 'utf-8')));
    }
    this.config = config;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.app.use(mockMiddleware(this.config));

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      let status = 500;
      if (!Number.isNaN(Number.parseInt(err.message))) {
        status = Number.parseInt(err.message, 10);
      }
      res.status(status).end();
    });

    this.app.set('port', this.config.port);
  }

  run() {
    const server = http.createServer(this.app);
    server.listen(this.config.port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onListening() {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

      log.info('Listening on ' + bind);
    }

    function onError(error: any) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof this.config.port === 'string'
        ? 'Pipe ' + this.config.port
        : 'Port ' + this.config.port

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          log.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          log.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
  }
}
