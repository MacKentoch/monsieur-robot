const executeCmd = require('../utils/executeCmd');
const config = require('server/config');

const command =
  config.get('env') === 'production'
    ? `psql --username postgres ${config.get('env')} < db/schema.sql`
    : `docker exec -i \`docker-compose ps -q postgres\` psql --username postgres ${config.get(
        'env',
      )} < db/schema.sql`;
const commandName = 'loadDB';
const shouldLog = true;

executeCmd(command, commandName, shouldLog);
