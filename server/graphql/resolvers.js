// @flow

// #region imports
const { GraphqlError } = require('../lib/graphqlErrors');
const db = require('../db');
const { GraphQLDateTime } = require('graphql-iso-date');
// #endregion

const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
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
  },
};

module.exports = resolvers;
