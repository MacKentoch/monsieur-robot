const chalk = require('chalk');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// #region loadDB command async function
async function executeCmd(
  command = '',
  commandName = 'command not defined',
  shouldLog = true,
) {
  try {
    const { stdout, stderr } = await exec(command);
    if (shouldLog) {
      /* eslint-disable no-console */
      console.log(`${commandName} command stdout: ${chalk.green(stdout)}`);
      console.log(`${commandName} command stderr: ${chalk.blue(stderr)}`);
      /* eslint-enable no-console */
    }
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
// #endregion

module.exports = executeCmd;
