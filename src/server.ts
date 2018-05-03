import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'express-flash-2';
import fs from 'fs';
import { resolve, join } from 'path';
import ini from 'ini';
import * as http from 'http';
import mockMiddleWare from './middleware';
import log from './utils/log';

const config: any = {
  port: 7001,
  mockPath: './test/models',
};
if (fs.existsSync(resolve('.', './.mock.json'))) {
  Object.assign(config, JSON.parse(fs.readFileSync(resolve('.', './.mock.json'), 'utf-8')));
}

const app: Express  = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(mockMiddleWare(config));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  if (!Number.isNaN(Number.parseInt(err.message))) {
    status = Number.parseInt(err.message, 10);
  }
  res.status(status).end();
});

app.set('port', config.port);

const server = http.createServer(app);
server.listen(config.port);
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

  const bind = typeof config.port === 'string'
    ? 'Pipe ' + config.port
    : 'Port ' + config.port

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
