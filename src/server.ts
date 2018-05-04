import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'express-flash-2';
import fs from 'fs';
import { resolve, join } from 'path';
import ini from 'ini';
import * as http from 'http';
import { mockMiddleware } from './middleware';
import log from './utils/log';

export const config: any = {
  port: 7001,
  mockPath: './test/models',
};
if (fs.existsSync(resolve('.', './.mock.json'))) {
  Object.assign(config, JSON.parse(fs.readFileSync(resolve('.', './.mock.json'), 'utf-8')));
}

export const app: Express  = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(mockMiddleware(config));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  if (!Number.isNaN(Number.parseInt(err.message))) {
    status = Number.parseInt(err.message, 10);
  }
  res.status(status).end();
});

app.set('port', config.port);
