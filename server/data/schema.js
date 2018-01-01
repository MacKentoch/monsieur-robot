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
  }

  type Blog {
    id: ID!
    title: String!
    subTitle: String
    date_publication: DateTime!
  }
`;
// #endregion

// #region resolvers
const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    async getBlogs(obj, args, { loaders }) {
      try {
        const blogs = await loaders.blog.load();
        return blogs;
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
