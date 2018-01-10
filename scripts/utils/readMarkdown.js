// @flow
/* eslint-disable consistent-return */

const util = require('util');
const readFile = util.promisify(require('fs').readFile);

// #region read
async function readMarkdown(filePath = null) {
  if (!filePath) {
    throw new Error('readMarkDown needs a filePath');
  }
  try {
    const data = await readFile(filePath);
    return data;
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
// #endregion

module.exports = readMarkdown;
