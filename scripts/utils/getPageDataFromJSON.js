// @flow
/* eslint-disable consistent-return */

const util = require('util');
const readFile = util.promisify(require('fs').readFile);

// #region read
async function getPageDataFromJSON(jsonPath = null, pageName = null) {
  if (!jsonPath) {
    throw new Error('getPageDataFromJSON needs a jsonPath');
  }
  if (!pageName) {
    throw new Error('getPageDataFromJSON needs a pageName');
  }

  try {
    const data = await readFile(jsonPath);
    const allContent = JSON.parse(data);
    const pageContent = allContent[pageName];
    if (!pageContent) {
      throw new Error(`no content for pageName: ${pageName}`);
    }
    return pageContent;
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
}
// #endregion

module.exports = getPageDataFromJSON;
