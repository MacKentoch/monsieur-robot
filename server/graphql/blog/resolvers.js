// @flow
/* eslint-disable camelcase */

// #region imports
const { GraphqlError } = require('../../lib/graphqlErrors');
const db = require('../db');
// #endregion

const resolvers = {
  async getBlogs() {
    try {
      const { rows: blogs } = await db.query(
        `SELECT blogs.*, authors.nickname author
        FROM blogs INNER JOIN authors ON blogs.author = authors.id
        ORDER BY blogs.date_publication DESC`,
      );
      return blogs;
    } catch (error) {
      const code = error.code ? error.code : '-1';
      const message = error.message ? error.message : '-1';
      throw new GraphqlError(code, message);
    }
  },

  async getTopNLastestBlogs(obj, { n }) {
    try {
      const { rows: blogs } = await db.query(
        `SELECT blogs.*, authors.nickname author
        FROM blogs INNER JOIN authors ON blogs.author = authors.id
        ORDER BY blogs.date_publication DESC
        LIMIT $1`,
        [n],
      );
      return blogs;
    } catch (error) {
      const code = error.code ? error.code : '-1';
      const message = error.message ? error.message : '-1';
      throw new GraphqlError(code, message);
    }
  },
};

module.exports = resolvers;
