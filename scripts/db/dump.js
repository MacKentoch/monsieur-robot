const executeCmd = require('../utils/executeCmd');
const config = require('server/config');

// #region should only  be launched in development
if (config.get('env') !== 'development') {
  throw new Error('You should only dump in development');
}
// #endregion

const command = `docker-compose exec postgres pg_dump --schema-only --username postgres ${config.get(
  'env',
)} > db/dump.sql`;
const commandName = 'dumpDB';
const shouldLog = true;

executeCmd(command, commandName, shouldLog);
