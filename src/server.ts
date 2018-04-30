import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'express-flash-2';
import fs from 'fs';
import path from 'path';
import ini from 'ini';
import * as http from 'http';
import mockMiddleWare from './middleware';

const config = require('../.mock.json');
const app: Express  = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(mockMiddleWare);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  console.error(err);
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
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log('Listening on ' + bind);
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof config.port === 'string'
    ? 'Pipe ' + config.port
    : 'Port ' + config.port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
