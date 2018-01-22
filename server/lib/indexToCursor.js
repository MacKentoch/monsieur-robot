// @flow

// #region imports
const config = require('../config');
// #endregion

const CURSOR_SECRET = config.get('graphqlCursorSecret');
const btoa = str => Buffer.from(str).toString('base64');
const atob = str => Buffer.from(str, 'base64').toString('utf-8');

module.exports = {
  indexToCursor: index => btoa(`${CURSOR_SECRET}${index}`),
  cursorToIndex: cursor => Number(atob(cursor).replace(CURSOR_SECRET, '')),
};
