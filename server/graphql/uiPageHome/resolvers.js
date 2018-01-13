// @flow
/* eslint-disable camelcase */

// #region imports
const { GraphqlError } = require('../../lib/graphqlErrors');
const db = require('../../db');
// #endregion

const resolvers = {
  async getUIPageHome() {
    try {
      const { rows } = await db.query(
        `SELECT ui_part_key, title, md_content, edit_date
        FROM page_home;`,
      );
      if (!Array.isArray(rows)) {
        const code = '-1';
        const message = 'uiPageHome query failed';
        throw new GraphqlError(code, message);
      }
      return rows;
    } catch (error) {
      const code = error.code ? error.code : '-1';
      const message = error.message ? error.message : '-1';
      throw new GraphqlError(code, message);
    }
  },
};

module.exports = resolvers;
