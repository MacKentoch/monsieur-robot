const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);
const config = require('server/config');

// #region should only  be launched in development
if (config.get('env') !== 'development') {
  throw new Error('You should only dump in development');
}
// #endregion

// #region execute dump db command
dumpExecCMD();
// #endregion

async function dumpExecCMD() {
  const command = `docker-compose exec postgres pg_dump --schema-only --username postgres ${config.get(
    'env',
  )} > db/dump.sql`;
  try {
    const { stdout, stderr } = await exec(command);
    /* eslint-disable no-console */
    console.log(`dump db command stdout: ${chalk.green(stdout)}`);
    console.log(`dump db command stderr: ${chalk.blue(stderr)}`);
    /* eslint-enable no-console */
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
