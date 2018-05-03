import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: 'mock-server',
});

export default log;
