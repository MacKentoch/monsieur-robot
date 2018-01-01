// @flow

// #region imports
const DataLoader = require('dataloader');
const db = require('../db');
// #endregion

// #region create loaders factory
const createLoaders = () => ({
  blogs: new DataLoader(async () => {
    const { rows } = await db.query(
      'SELECT * FROM blogs ORDER BY date_publication',
    );
    return rows;
  }),
});
// #endregion

module.exports = createLoaders;
