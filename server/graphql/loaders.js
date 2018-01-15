// @flow

// #region imports
const DataLoader = require('dataloader');
const db = require('../db');
// #endregion

// #region create loaders factory
const createLoaders = () => ({
  author: new DataLoader(async ids => {
    const result = ids.map(async id => {
      const { rows: authors } = await db.query(
        `SELECT authors.*
          FROM authors
          WHERE id = $1::integer`,
        [id],
      );
      return authors[0];
    });
    return Promise.resolve(result);
  }),
});
// #endregion

module.exports = createLoaders;
