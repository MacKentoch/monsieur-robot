// @flow

// #region imports
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphqlError } = require('../lib/graphqlErrors');
const db = require('../db');
// #endregion

// #region types definition
const typeDefs = /* GraphQL */ `
  schema {
    query: Query
  }

  scalar DateTime

  type Query {
    getBlogs: [Blog]!
    getAuthor(id: ID!): Author!
  }

  type Blog {
    id: ID!
    title: String!
    subTitle: String
    md_content: String!
    date_publication: DateTime!
    author: String!
  }

  type Author {
    id: ID!
    nickname: String!
    twitterId: String,
    date_creation: DateTime!
  }

  type NewsLetter {
    id: ID!
    md_content: String!
    submission_date: DateTime,
    creation_date: DateTime!
  }
`;
// #endregion

// #region resolvers
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
  },
};
// #endregion

// #region create excutable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
// #endregion

module.exports = schema;
