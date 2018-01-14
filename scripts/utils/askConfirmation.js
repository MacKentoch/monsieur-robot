// @flow

// #region
const defaultQuestion = 'Are you sure [Y: to confirm, n: to cancel]: ';
// #endregion

function askConfirmation(callback, warningMessage = '') {
  if (!callback) {
    throw new Error('askConfirmation callback is not defined');
  }
  if (typeof callback !== 'function') {
    throw new Error('askConfirmation callback must me a function');
  }

  process.stdout.write(`${warningMessage}
  `);
  process.stdout.write(`${defaultQuestion}`);
  process.stdin.setEncoding('utf8');

  process.stdin
    .once('data', async response => {
      const cleanedResponse = response.trim().toLowerCase();
      if (cleanedResponse === 'y') {
        return callback(true);
      }
      return callback(false);
    })
    .resume();
}

module.exports = askConfirmation;
