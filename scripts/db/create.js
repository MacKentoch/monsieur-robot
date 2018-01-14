// @flow
/* eslint-disable no-console */

// #region imports
const executeCmd = require('../utils/executeCmd');
const config = require('../../server/config');
const askConfirmation = require('../utils/askConfirmation');
// #endregion

const warningMessage = 'You are about to create the database.';

askConfirmation(async confirmed => {
  if (confirmed) {
    console.log('database will be created...');
    const command =
      config.get('env') === 'production'
        ? `createdb --username ${config.get('user')} ${config.get('database')}`
        : `createdb --username postgres ${config.get('env')}`;
    const commandName = 'createDB';
    const shouldLog = true;

    executeCmd(command, commandName, shouldLog);
    console.log('...database is now created');
    process.exit();
    return;
  }
  console.log('database creation cancelled');
  process.exit();
}, warningMessage);
