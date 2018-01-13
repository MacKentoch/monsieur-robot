// @flow
/* eslint-disable camelcase */

// #region imports
const { GraphqlError } = require('../../lib/graphqlErrors');
const db = require('../../db');
// #endregion

const authorResolvers = {
  async getAuthor(obj, { id } /* { loaders } */) {
    try {
      const { rows: authors } = await db.query(
        `SELECT authors.*
        FROM authors
        WHERE id = $1`,
        [id],
      );
      if (!Array.isArray(authors) || authors.length !== 1) {
        const code = '-1';
        const message = 'author query failed';
        throw new GraphqlError(code, message);
      }
      return authors[0];
    } catch (error) {
      const code = error.code ? error.code : '-1';
      const message = error.message ? error.message : '-1';
      throw new GraphqlError(code, message);
    }
  },
};

module.exports = authorResolvers;
