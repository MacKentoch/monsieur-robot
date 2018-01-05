const executeCmd = require('../utils/executeCmd');
const config = require('server/config');

const command =
  config.get('env') === 'production'
    ? `createdb --username postgres ${config.get('env')}`
    : `docker-compose run postgres createdb --host postgres --username postgres ${config.get(
        'env',
      )}`;
const commandName = 'createDB';
const shouldLog = true;

executeCmd(command, commandName, shouldLog);
