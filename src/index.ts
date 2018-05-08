export { Entity } from './Entity';
export { Column } from './decorators/Column';
export { OneToMany, ManyToOne, OneToOne } from './decorators/Relation';
export { mockMiddleware } from './middleware';
import { app, config } from './server';
import log from '../src/utils/log';
import * as http from 'http';

export const run = () => {
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
}
