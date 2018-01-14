// @flow

/* eslint-disable no-console */

// #region imports
const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');
const askConfirmation = require('../utils/askConfirmation');
// #endregion

const warningMessage = 'You are about to drop the database.';

askConfirmation(async confirmed => {
  if (confirmed) {
    console.log('database will be dropped...');
    const command =
      config.get('env') === 'production'
        ? `dropdb --username postgres ${config.get('env')} --if-exists`
        : `dropdb --username postgres ${config.get('env')} --if-exists`;
    const commandName = 'dropDB';
    const shouldLog = true;
    await executeCmd(command, commandName, shouldLog);
    console.log('...database is now dropped');
    process.exit();
    return;
  }
  console.log('database drop cancelled');
  process.exit();
}, warningMessage);
