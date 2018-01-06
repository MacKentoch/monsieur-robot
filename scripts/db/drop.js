const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');

const command =
  config.get('env') === 'production'
    ? `dropdb --username postgres ${config.get('env')} --if-exists`
    : `dropdb --username postgres ${config.get('env')} --if-exists`;
const commandName = 'dropDB';
const shouldLog = true;

executeCmd(command, commandName, shouldLog);
