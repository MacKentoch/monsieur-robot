const chalk = require('chalk');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const config = require('server/config');

// #region should not be launched in production
if (config.get('env') === 'production') {
  throw new Error('Not in production please!');
}
// #endregion

// #region execute db creation command
createDbCMD();
// #endregion

// #region createDB command async function
async function createDbCMD() {
  const command = `docker-compose run postgres createdb --host postgres --username postgres ${config.get(
    'env',
  )}`;

  try {
    const { stdout, stderr } = await exec(command);
    /* eslint-disable no-console */
    console.log(`createDB command stdout: ${chalk.green(stdout)}`);
    console.log(`createDB command stderr: ${chalk.blue(stderr)}`);
    /* eslint-enable no-console */
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
// #endregion
