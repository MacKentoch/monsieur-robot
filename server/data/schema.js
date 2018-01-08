// @flow

// #region imports
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphqlError } = require('../lib/graphqlErrors');
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
    async getBlogs(obj, args, { loaders }) {
      try {
        const blogs = await loaders.blogs.load();
        if (!blogs.sucess) {
          console.log(`blogs select failed`);
          return;
        }
        return blogs.data;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },

    async getAuthor(obj, { id }, { loaders }) {
      try {
        const author = await loaders.author.load(id);
        return author.data;
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
