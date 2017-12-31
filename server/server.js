// @flow
/* eslint-disable no-process-env */

// #region imports
const next = require('next');
const nextExpress = require('./lib/nextExpress');
const config = require('./config');
// #endregion

// #region variables/constants initialization
const dev = config.get('env') !== 'production';
const app = next({ dev });
// #endregion

// #region start next application
try {
  nextExpress(app);
} catch (error) {
  /* eslint-disable no-console */
  console.log('prepareNextApplication FAILED: ', error);
  /* eslint-enable no-console */
}
// #endregion
