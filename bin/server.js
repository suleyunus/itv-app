const http = require('http');
const winston = require('winston');
const app = require('../app');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      winston.log('info', (`${bind} requires elevated privileges.`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.log('info', (`${bind} is already in use.`));
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  winston.log('info', (`Listening on ${bind}`));
});

server.listen(port);
